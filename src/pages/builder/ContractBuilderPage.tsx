import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { contractsApi } from "../../api/contracts";
import { proposalsApi } from "../../api/proposals";
import { crmApi } from "../../api/crm";
import { Canvas, blocksFromProposal } from "../../components/builder/Canvas";
import { TopBar } from "../../components/builder/TopBar";
import { TemplatePicker } from "../../components/builder/TemplatePicker";
import { PreviewPane } from "../../components/builder/PreviewPane";
import { ShareModal } from "../../components/builder/ShareModal";
import { DocumentReview } from "../../components/builder/DocumentReview";
import { analyzeDocument, type Review } from "../../lib/analysis";
import { markPipelineDone, pipelineDone, runDraftPipeline } from "../../lib/pipeline";
import { isBuiltIn } from "../../lib/templates";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Fieldset } from "../../components/ui/Fieldset";
import { Spinner } from "../../components/ui/Spinner";
import { useAutoSave } from "../../hooks/useAutoSave";
import { useToast } from "../../hooks/useToast";
import { usePlanGate } from "../../hooks/usePlanGate";
import { CURRENCIES } from "../../lib/constants";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { Block, DocContent } from "../../types";

const SECTIONS = ["Parties", "Scope", "Payment", "Timeline", "Revisions", "Cancellation", "Liability", "Signatures"];

const EMPTY_DOC: DocContent = {
  blocks: [],
  brand_primary: "#c9a961",
  brand_secondary: "#1a1a1a",
  page_background: "#ffffff",
  max_width: 720,
};

export function ContractBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  if (!id) return <ContractRequirementForm />;

  return params.get("step") === "template" ? (
    <TemplatePicker
      type="contract"
      onBack={() => navigate("/contracts/new")}
      onPick={async ({ templateId, blocks }) => {
        if (templateId && isBuiltIn(templateId)) {
          try {
            sessionStorage.setItem(`revercue_template_${id}`, JSON.stringify(blocks ?? []));
          } catch {
            /* the canvas falls back to the generated skeleton */
          }
        }
        navigate(`/contracts/${id}/edit`, { replace: true });
      }}
    />
  ) : (
    <ContractCanvas id={id} />
  );
}

function ContractRequirementForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { hasFeature } = usePlanGate();
  const [mode, setMode] = useState<"existing" | "new">("new");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [scope, setScope] = useState("");
  const [amount, setAmount] = useState("");
  const [schedule, setSchedule] = useState("50% upfront, 50% on delivery");
  const [currency, setCurrency] = useState("USD");
  const [timeline, setTimeline] = useState("");
  const [revisions, setRevisions] = useState("Two rounds of revisions included. Additional rounds billed separately.");
  const [cancellation, setCancellation] = useState("Either party may cancel with 14 days' written notice.");
  const [sections, setSections] = useState<string[]>(["Parties", "Scope", "Payment", "Revisions", "Signatures"]);
  const [afterApproval, setAfterApproval] = useState<"form" | "invoice" | "pdf_only">(
    hasFeature("adaptive_forms") ? "form" : "pdf_only",
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clients = useQuery({ queryKey: ["crm", "clients", "picker"], queryFn: () => crmApi.list({ limit: 100 }) });
  const accepted = useQuery({
    queryKey: ["proposals", "accepted", "picker"],
    queryFn: () => proposalsApi.list({ status: "accepted", limit: 100 }),
  });

  const valid =
    (mode === "existing" ? Boolean(clientId) : Boolean(clientName.trim())) &&
    Boolean(clientEmail.trim()) &&
    scope.trim() &&
    amount &&
    revisions.trim() &&
    cancellation.trim() &&
    sections.length > 0;

  const submit = async () => {
    const next: Record<string, string> = {};
    if (mode === "existing" && !clientId) next.client = "Choose a client.";
    if (mode === "new" && !clientName.trim()) next.clientName = "Enter the client's name.";
    if (!clientEmail.trim()) next.clientEmail = "Enter the client's email.";
    if (!scope.trim()) next.scope = "Describe the scope.";
    if (!amount) next.amount = "Enter the amount.";
    if (!revisions.trim()) next.revisions = "State the revision policy.";
    if (!cancellation.trim()) next.cancellation = "State the cancellation policy.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      const clientLabel =
        mode === "existing"
          ? clients.data?.data.find((client) => client.id === clientId)?.name || "Client"
          : clientName.trim();
      const response = await contractsApi.draft({
        client_id: mode === "existing" ? clientId : undefined,
        client_name: mode === "new" ? clientName.trim() : undefined,
        client_email: clientEmail.trim(),
        linked_proposal_id: proposalId || undefined,
        title: `Contract — ${clientLabel}`,
        scope,
        payment_terms: `${currency} ${amount} — ${schedule}`,
        timeline: timeline || undefined,
        revisions,
        cancellation,
        after_approval: afterApproval,
        currency,
        sections,
      });
      navigate(`/contracts/${response.id}/edit?step=template`);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card" style={{ maxWidth: 720 }}>
        <p className="eyebrow">New contract</p>
        <h1>Tell us about this contract.</h1>
        <p className="muted" style={{ marginBottom: 24 }}>
          The same canvas as a proposal, with the contract's own sections and the after-approval chain.
        </p>

        <div className="stack-4">
          <div>
            <span className="field-label">Client</span>
            <div className="segmented" style={{ marginTop: 8 }}>
              <button type="button" aria-pressed={mode === "existing"} onClick={() => setMode("existing")}>
                Existing client
              </button>
              <button type="button" aria-pressed={mode === "new"} onClick={() => setMode("new")}>
                New client
              </button>
            </div>
          </div>
          {mode === "existing" ? (
            <Select
              id="contract-client"
              label="Client"
              value={clientId}
              placeholder="Choose a client"
              options={(clients.data?.data ?? []).map((client) => ({
                value: client.id,
                label: `${client.name} — ${client.email}`,
              }))}
              onChange={(value) => {
                setClientId(value);
                const found = clients.data?.data.find((client) => client.id === value);
                if (found) setClientEmail(found.email);
              }}
              error={errors.client}
              required
            />
          ) : (
            <Input
              id="contract-client-name"
              label="Client name"
              value={clientName}
              onChange={setClientName}
              error={errors.clientName}
              required
            />
          )}
          <Input
            id="contract-client-email"
            label="Client email"
            type="email"
            value={clientEmail}
            onChange={setClientEmail}
            error={errors.clientEmail}
            helper="Where the contract is sent for signature."
            required
          />
          <Select
            id="contract-proposal"
            label="Which proposal is this contract for?"
            value={proposalId}
            placeholder="None — start from scratch"
            options={(accepted.data?.data ?? []).map((proposal) => ({
              value: proposal.id,
              label: proposal.title,
            }))}
            onChange={setProposalId}
            helper="Optional. The scope and the payment terms come from it."
          />
          <Textarea
            id="contract-scope"
            label="Scope of work"
            value={scope}
            onChange={setScope}
            error={errors.scope}
            rows={4}
            required
          />
          <div className="two-up">
            <Input
              id="contract-amount"
              label="Amount"
              type="number"
              value={amount}
              onChange={setAmount}
              error={errors.amount}
              required
            />
            <Select
              id="contract-currency"
              label="Currency"
              value={currency}
              options={CURRENCIES.map((value) => ({ value, label: value }))}
              onChange={setCurrency}
            />
          </div>
          <Input
            id="contract-schedule"
            label="Payment schedule"
            value={schedule}
            onChange={setSchedule}
            helper="For example: 50% upfront, 50% on delivery."
          />
          <Input id="contract-timeline" label="Timeline" value={timeline} onChange={setTimeline} helper="Optional." />
          <Textarea
            id="contract-revisions"
            label="Revision policy"
            value={revisions}
            onChange={setRevisions}
            error={errors.revisions}
            rows={3}
            required
          />
          <Textarea
            id="contract-cancellation"
            label="Cancellation policy"
            value={cancellation}
            onChange={setCancellation}
            error={errors.cancellation}
            rows={3}
            required
          />
          <Fieldset legend="Which sections do you want?">
            {SECTIONS.map((section) => (
              <Checkbox
                key={section}
                id={`contract-section-${section}`}
                label={section}
                checked={sections.includes(section)}
                onChange={() =>
                  setSections((current) =>
                    current.includes(section) ? current.filter((item) => item !== section) : [...current, section],
                  )
                }
              />
            ))}
          </Fieldset>
          <Select
            id="contract-after"
            label="After approval, what next?"
            value={afterApproval}
            options={[
              { value: "form", label: "Show the requirement form" },
              { value: "invoice", label: "Show the invoice" },
              { value: "pdf_only", label: "Download PDF only" },
            ]}
            onChange={(value) => setAfterApproval(value as typeof afterApproval)}
            helper={
              hasFeature("adaptive_forms")
                ? "The form and invoice options are part of your plan."
                : "The form and invoice chain is available on Growth and Scale. On your plan the client sees the PDF."
            }
          />
        </div>

        <div className="between mt-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={submit} loading={loading} disabled={!valid}>
            Continue to builder
          </Button>
        </div>
      </div>
    </div>
  );
}

function ContractCanvas({ id }: { id: string }) {
  const navigate = useNavigate();
  const toast = useToast();
  const query = useQuery({ queryKey: ["contract", id], queryFn: () => contractsApi.get(id) });
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState<DocContent>(EMPTY_DOC);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [share, setShare] = useState<{ url: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [review, setReview] = useState<Review | null>(null);
  const [pendingShare, setPendingShare] = useState<{ url: string } | null>(null);
  const [initialised, setInitialised] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signConsent, setSignConsent] = useState(false);
  const [freelancerSigned, setFreelancerSigned] = useState(false);

  const contract = query.data?.contract;

  useEffect(() => {
    if (!contract || initialised) return;
    setTitle(contract.title);
    if (contract.content?.blocks?.length) {
      setDoc({ ...EMPTY_DOC, ...contract.content });
      setBlocks(contract.content.blocks);
    } else {
      let templateBlocks: Block[] | null = null;
      try {
        const stored = sessionStorage.getItem(`revercue_template_${id}`);
        if (stored) templateBlocks = JSON.parse(stored) as Block[];
      } catch {
        templateBlocks = null;
      }
      if (templateBlocks?.length) {
        setBlocks(templateBlocks);
      } else {
        setBlocks(
          blocksFromProposal({
            problem: contract.scope,
            sections: ["Parties", "Scope", "Payment", "Timeline", "Revisions", "Cancellation", "Signatures"],
          }),
        );
        setBlocks((current) => [
          ...current.filter((block) => block.type !== "next_step"),
          { id: "signature", type: "signature" },
        ]);
      }
    }
    setInitialised(true);
  }, [contract, initialised]);

  const payload = useMemo(() => ({ title, content: { ...doc, blocks } }), [title, doc, blocks]);

  const autosave = useAutoSave({
    onSave: async (value) => {
      await contractsApi.update(id, value as { title: string; content: DocContent });
    },
    beaconPath: `/api/contracts/${id}/autosave`,
    enabled: initialised,
  });

  /* The first draft fills the template's clauses from the contract itself. */
  useEffect(() => {
    if (!initialised || blocks.length === 0) return;
    if (pipelineDone(id)) return;
    const hasPlaceholders = blocks.some(
      (block) =>
        Boolean(block.meta?.placeholder) ||
        Boolean(block.text && /\{\{/.test(block.text)),
    );
    if (!hasPlaceholders) return;

    let cancelled = false;
    void runDraftPipeline({
      id,
      blocks,
      sections: SECTIONS,
      tone: "formal",
      withVisuals: false,
      fills: {
        parties: `${contract?.client_name || "The client"} and the freelancer.`,
        scope: contract?.scope || "",
        payment_terms: contract?.payment_terms || "",
        timeline: contract?.timeline || "",
        revisions: contract?.revisions || "",
        cancellation: contract?.cancellation || "",
      },
    })
      .then((result) => {
        if (cancelled) return;
        setBlocks(result.blocks);
        markPipelineDone(id);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialised]);

  useEffect(() => {
    if (initialised) autosave.markDirty(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, initialised]);

  if (query.isLoading) {
    return (
      <div className="auth-split">
        <Spinner size={32} />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="page page-narrow">
        <h1 className="serif">Could not load this contract.</h1>
        <Button className="mt-6" onClick={() => navigate("/contracts")}>
          Back to contracts
        </Button>
      </div>
    );
  }

  const publish = async () => {
    setCreating(true);
    try {
      await autosave.save(payload);
      if (!freelancerSigned) {
        if (!signerName.trim()) {
          toast.error("Enter your name to sign the contract first.");
          setCreating(false);
          return;
        }
        if (!signConsent) {
          toast.error("You must consent to sign the contract first.");
          setCreating(false);
          return;
        }
        await contractsApi.signFreelancer(id, {
          signature: signerName,
          consent: signConsent,
          name: signerName,
        });
        setFreelancerSigned(true);
      }
      const response = await contractsApi.publish(id);
      const nextShare = { url: response.url };
      const result = await analyzeDocument({ blocks, hasClient: Boolean(contract?.client_id) });
      setPendingShare(nextShare);
      setReview(result);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="builder">
      <TopBar
        title={title}
        onTitleChange={setTitle}
        saveState={autosave.state}
        onBack={() => navigate("/contracts")}
        onPreview={() => setPreview(true)}
        onSave={() => void autosave.save(payload)}
        onCreate={publish}
        creating={creating}
        moreItems={[
          {
            label: "Archive",
            onClick: async () => {
              await contractsApi.archive(id);
              navigate("/contracts");
            },
          },
          {
            label: "Delete",
            danger: true,
            onClick: async () => {
              await contractsApi.remove(id);
              navigate("/contracts");
            },
          },
        ]}
      />
      <div className="settings-card" style={{ margin: "12px 20px" }}>
        <h2>Freelancer signature</h2>
        <p className="caption">
          Sign the exact contract version before publishing. Publishing is blocked until this step completes.
        </p>
        <div className="between" style={{ gap: 12, flexWrap: "wrap" }}>
          <Input
            id="signer-name"
            label="Signer name"
            value={signerName}
            onChange={(value) => setSignerName(value)}
            disabled={freelancerSigned}
          />
          <Checkbox
            label="I have reviewed this contract and consent to sign it."
            checked={signConsent}
            onChange={setSignConsent}
            disabled={freelancerSigned}
          />
          <span className="caption" style={{ color: freelancerSigned ? "var(--green)" : "var(--muted)" }}>
            {freelancerSigned ? "Signed. Ready to publish." : "Not signed yet."}
          </span>
        </div>
      </div>
      <Canvas
        doc={doc}
        blocks={blocks}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onBlocksChange={setBlocks}
        onDocChange={(patch) => setDoc((current) => ({ ...current, ...patch }))}
        sections={["Parties", "Scope", "Payment", "Timeline", "Revisions", "Cancellation", "Liability", "Signatures"]}
        blockDefinitions={[
          { type: "heading", label: "Heading", hint: "Section title" },
          { type: "paragraph", label: "Paragraph", hint: "Body text" },
          { type: "list", label: "List", hint: "Bulleted" },
          { type: "divider", label: "Divider", hint: "A line" },
          { type: "two_column", label: "Two columns", hint: "Side by side" },
          { type: "timeline", label: "Timeline", hint: "Milestones" },
          { type: "signature", label: "Signature", hint: "Two signature lines" },
        ]}
        clientName={contract.client_name || "the client"}
        title={title}
        reference={contract.public_id?.slice(0, 8) || "draft"}
        showAfterApproval
        afterApproval={contract.after_approval || "pdf_only"}
        onAfterApprovalChange={async (value) => {
          await contractsApi.update(id, { after_approval: value as "form" | "invoice" | "pdf_only" });
          toast.success("After-approval step updated.");
        }}
      />

      <PreviewPane
        open={preview}
        onClose={() => setPreview(false)}
        title={title}
        clientName={contract.client_name || "the client"}
        reference={contract.public_id?.slice(0, 8) || "draft"}
        blocks={blocks}
        doc={doc}
        footnote="Signed with a typed full name and explicit consent, recorded with the date and version. Not a certificate-based qualified signature."
      />

      <DocumentReview
        review={review}
        onClose={() => setReview(null)}
        onPublishAnyway={() => {
          setShare(pendingShare);
          setReview(null);
        }}
      />

      <ShareModal
        open={Boolean(share)}
        onClose={() => setShare(null)}
        title="Your contract is ready."
        url={share?.url || ""}
        defaultMessage={`Hi ${contract.client_name || "there"}, here is the contract for the project. Review it and let me know if you have any questions.`}
        onDone={async () => {
          await contractsApi.share(id, "manual");
          setShare(null);
          navigate("/contracts");
        }}
      />
    </div>
  );
}
