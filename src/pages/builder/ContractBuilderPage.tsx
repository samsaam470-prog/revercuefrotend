import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { contractsApi } from "../../api/contracts";
import { proposalsApi } from "../../api/proposals";
import { crmApi } from "../../api/crm";
import { settingsApi } from "../../api/settings";
import { Canvas } from "../../components/builder/Canvas";
import { TopBar } from "../../components/builder/TopBar";
import { TemplatePicker } from "../../components/builder/TemplatePicker";
import { PreviewPane } from "../../components/builder/PreviewPane";
import { ShareModal } from "../../components/builder/ShareModal";
import { DocumentReview } from "../../components/builder/DocumentReview";
import { analyzeDocument, type Review } from "../../lib/analysis";
import { markPipelineDone, runDraftPipeline, type DraftStage } from "../../lib/pipeline";
import { DraftProgress, type DraftProgressState } from "../../components/builder/DraftProgress";
import { briefOf, contentOf, hasPlaceholders, skeletonForBrief, type Brief } from "../../lib/brief";
import { isBuiltIn } from "../../lib/templates";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Fieldset } from "../../components/ui/Fieldset";
import { Spinner } from "../../components/ui/Spinner";
import { SkeletonLines } from "../../components/ui/Skeleton";
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
  const [clientPhone, setClientPhone] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [scope, setScope] = useState("");
  const [amount, setAmount] = useState("");
  const [schedule, setSchedule] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [timeline, setTimeline] = useState("");
  const [revisions, setRevisions] = useState("");
  const [cancellation, setCancellation] = useState("");
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
  const profile = useQuery({ queryKey: ["settings", "profile"], queryFn: settingsApi.getProfile });

  const valid =
    (mode === "existing" ? Boolean(clientId) : Boolean(clientName.trim())) &&
    (Boolean(clientEmail.trim()) || Boolean(clientPhone.trim())) &&
    scope.trim() &&
    amount &&
    schedule.trim() &&
    revisions.trim() &&
    cancellation.trim() &&
    sections.length > 0;

  const submit = async () => {
    const next: Record<string, string> = {};
    if (mode === "existing" && !clientId) next.client = "Choose a client.";
    if (mode === "new" && !clientName.trim()) next.clientName = "Enter the client's name.";
    if (!clientEmail.trim() && !clientPhone.trim()) next.clientEmail = "Enter the client's email or phone.";
    if (!scope.trim()) next.scope = "Describe the scope.";
    if (!amount || !Number.isFinite(Number(amount)) || Number(amount) < 0) next.amount = "Enter a valid non-negative amount.";
    if (!schedule.trim()) next.schedule = "Enter the agreed payment schedule.";
    if (!revisions.trim()) next.revisions = "State the revision policy.";
    if (!cancellation.trim()) next.cancellation = "State the cancellation policy.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      const selectedClient = mode === "existing" ? clients.data?.data.find((client) => client.id === clientId) : undefined;
      const clientLabel = selectedClient?.name || clientName.trim() || "Client";
      const response = await contractsApi.draft({
        client_id: mode === "existing" ? clientId : undefined,
        client_name: mode === "new" ? clientName.trim() : undefined,
        client_email: clientEmail.trim() || undefined,
        client_phone: clientPhone.trim() || undefined,
        linked_proposal_id: proposalId || undefined,
        client_website: (selectedClient as unknown as { website_url?: string } | undefined)?.website_url,
        user_website: profile.data?.profile.website || undefined,
        business_name: profile.data?.profile.business_name || undefined,
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
                if (found) { setClientEmail(found.email); setClientPhone(found.phone || ""); }
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
          />
          <Input
            id="contract-client-phone"
            label="Client phone (optional)"
            type="tel"
            value={clientPhone}
            onChange={setClientPhone}
            helper="WhatsApp number, with country code. Used to share the document."
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
            helper="Optional. Link the accepted proposal for reference; confirm the scope and payment terms below."
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
            error={errors.schedule}
            helper="Enter the schedule agreed with this client; no default terms are assumed."
            required
          />
          <Input id="contract-timeline" label="Timeline" value={timeline} onChange={setTimeline} helper="Optional." />
          <Textarea
            id="contract-revisions"
            label="Revision policy"
            value={revisions}
            onChange={setRevisions}
            error={errors.revisions}
            rows={3}
            helper="Enter the revision allowance and any charges you have agreed."
            required
          />
          <Textarea
            id="contract-cancellation"
            label="Cancellation policy"
            value={cancellation}
            onChange={setCancellation}
            error={errors.cancellation}
            rows={3}
            helper="Enter the cancellation and notice terms agreed by both parties."
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
  const [initialised, setInitialised] = useState(false);
  const [stage, setStage] = useState<DraftStage | null>(null);
  const [stageStatuses, setStageStatuses] = useState<DraftProgressState>({});
  const briefRef = useRef<Brief | null>(null);
  const [signerName, setSignerName] = useState("");
  const [signConsent, setSignConsent] = useState(false);
  const [freelancerSigned, setFreelancerSigned] = useState(false);

  const contract = query.data?.contract;

  useEffect(() => {
    if (!contract || initialised) return;
    setTitle(contract.title);
    const content = contentOf(contract);
    const savedBlocks = Array.isArray(content.blocks) ? (content.blocks as Block[]) : [];
    const brief = briefOf(contract);
    briefRef.current = brief;
    setDoc({ ...EMPTY_DOC, ...(content as Partial<DocContent>), blocks: [] });

    let templateBlocks: Block[] | null = null;
    try {
      const stored = sessionStorage.getItem(`revercue_template_${id}`);
      if (stored) templateBlocks = JSON.parse(stored) as Block[];
    } catch {
      templateBlocks = null;
    }

    const initial = savedBlocks.length
      ? savedBlocks
      : templateBlocks?.length
        ? templateBlocks
        : skeletonForBrief(brief, "contract");
    setBlocks(initial);

    const wantsDraft = !content.drafted && (savedBlocks.length === 0 || hasPlaceholders(savedBlocks));
    setStage(wantsDraft ? "context" : null);
    setStageStatuses({});
    setInitialised(true);
  }, [contract, initialised, id]);

  const payload = useMemo(() => ({ title, content: { ...doc, blocks } }), [title, doc, blocks]);

  const autosave = useAutoSave({
    onSave: async (value) => {
      await contractsApi.update(id, value as { title: string; content: DocContent });
    },
    beaconPath: `/api/contracts/${id}/autosave`,
    enabled: initialised,
  });

  const persistDraft = async (nextBlocks: Block[]) => {
    const base = contract ? contentOf(contract) : {};
    const content = { ...base, ...doc, blocks: nextBlocks, drafted: true };
    await contractsApi.update(id, { content: content as DocContent });
  };

  /* The first draft fills the template's clauses from the contract itself. */
  useEffect(() => {
    if (!initialised || !contract || !stage || stage !== "context") return;
    if (!briefRef.current) return;
    if (blocks.length === 0) {
      setStage(null);
      return;
    }

    let cancelled = false;
    const step = (next: DraftStage, status: "pending" | "running" | "done" | "skipped", detail?: string) => {
      if (cancelled) return;
      setStage(next);
      setStageStatuses((current) => ({ ...current, [next]: { status, detail } }));
    };

    void runDraftPipeline({
      id,
      blocks,
      brief: briefRef.current,
      kind: "contract",
      withVisuals: false,
      onStage: step,
    })
      .then(async (result) => {
        if (cancelled) return;
        setBlocks(result.blocks);
        await persistDraft(result.blocks);
        markPipelineDone(id);
      })
      .catch(() => {
        if (!cancelled) toast.error("The draft could not be completed or saved. Your editable draft remains available; check your connection and try again.");
      })
      .finally(() => {
        if (!cancelled) setStage(null);
      });

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
        <SkeletonLines count={6} />
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
      const result = await analyzeDocument({ blocks, sections: briefRef.current?.sections ?? [], tone: briefRef.current?.tone, hasClient: Boolean(contract?.client_id) });
      setReview(result);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setCreating(false);
    }
  };

  const publishReviewed = async () => {
    setCreating(true);
    try {
      if (!freelancerSigned) {
        if (!signerName.trim()) {
          toast.error("Enter your name to sign the contract first.");
          return;
        }
        if (!signConsent) {
          toast.error("You must consent to sign the contract first.");
          return;
        }
        await contractsApi.signFreelancer(id, { signature: signerName, consent: signConsent, name: signerName });
        setFreelancerSigned(true);
      }
      const response = await contractsApi.publish(id);
      setShare({ url: response.url });
      setReview(null);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setCreating(false);
    }
  };

  if (stage) {
    return (
      <div className="builder">
        <DraftProgress stage={stage} clientName={contract.client_name || "your client"} statuses={stageStatuses} documentLabel="contract" />
      </div>
    );
  }

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
        onPublishAnyway={() => { void publishReviewed(); }}
      />

      <ShareModal
        open={Boolean(share)}
        onClose={() => setShare(null)}
        title="Your contract is ready."
        url={share?.url || ""}
        defaultMessage={`Hi ${contract.client_name || "there"}, here is the contract for the project. Review it and let me know if you have any questions.`}
        clientEmail={contract?.client_email}
        clientPhone={contract?.client_phone}
        onDone={async () => {
          await contractsApi.share(id, "manual");
          setShare(null);
          navigate("/contracts");
        }}
      />
    </div>
  );
}
