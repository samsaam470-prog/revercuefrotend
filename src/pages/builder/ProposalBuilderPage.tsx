import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { proposalsApi } from "../../api/proposals";
import { crmApi } from "../../api/crm";
import { Canvas, blocksFromProposal } from "../../components/builder/Canvas";
import { TopBar } from "../../components/builder/TopBar";
import { TemplatePicker } from "../../components/builder/TemplatePicker";
import { PreviewPane } from "../../components/builder/PreviewPane";
import { ShareModal } from "../../components/builder/ShareModal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Fieldset } from "../../components/ui/Fieldset";
import { Spinner } from "../../components/ui/Spinner";
import { useAutoSave } from "../../hooks/useAutoSave";
import { useToast } from "../../hooks/useToast";
import { CURRENCIES } from "../../lib/constants";
import { usePlanGate } from "../../hooks/usePlanGate";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { Block, DocContent } from "../../types";

const SECTION_OPTIONS = [
  "Introduction",
  "Scope",
  "Timeline",
  "Pricing",
  "Terms",
  "FAQs",
  "Embedded Questions",
  "About You",
  "Next Step",
];

const EMPTY_DOC: DocContent = {
  blocks: [],
  brand_primary: "#c9a961",
  brand_secondary: "#1a1a1a",
  page_background: "#ffffff",
  max_width: 720,
};

export function ProposalBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  if (!id) return <RequirementForm />;

  const step = params.get("step");

  return step === "template" ? (
    <TemplatePicker
      type="proposal"
      onBack={() => navigate("/proposals/new")}
      onPick={async (templateId) => {
        if (templateId) await proposalsApi.update(id, { template_id: templateId });
        navigate(`/proposals/${id}/edit`, { replace: true });
      }}
    />
  ) : (
    <ProposalCanvas id={id} blank={params.get("blank") === "true"} />
  );
}

/* ------------------------------------------------------------ stage 1 */

function RequirementForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { limits } = usePlanGate();
  const [mode, setMode] = useState<"existing" | "new">("new");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [sections, setSections] = useState<string[]>(["Introduction", "Scope", "Pricing"]);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [questions, setQuestions] = useState<{ text: string; type: string }[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [timeline, setTimeline] = useState("");
  const [tone, setTone] = useState("Formal");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [limitOpen, setLimitOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const clients = useQuery({ queryKey: ["crm", "clients", "picker"], queryFn: () => crmApi.list({ limit: 100 }) });

  const valid =
    (mode === "existing" ? Boolean(clientId) : clientName.trim() && clientEmail.trim()) &&
    problem.trim().length >= 10 &&
    sections.length > 0;

  const submit = async () => {
    const nextErrors: Record<string, string> = {};
    if (mode === "existing" && !clientId) nextErrors.client = "Choose a client.";
    if (mode === "new" && !clientName.trim()) nextErrors.clientName = "Enter the client's name.";
    if (mode === "new" && !clientEmail.trim()) nextErrors.clientEmail = "Enter the client's email.";
    if (problem.trim().length < 10) nextErrors.problem = "One or two sentences, at least 10 characters.";
    if (sections.length === 0) nextErrors.sections = "Pick at least one section.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await proposalsApi.draft({
        client_id: mode === "existing" ? clientId : undefined,
        client_name: mode === "new" ? clientName : undefined,
        client_email: mode === "new" ? clientEmail : undefined,
        title: `${mode === "new" ? clientName : clients.data?.data.find((c) => c.id === clientId)?.name || "Client"} — Proposal`,
        problem,
        sections,
        currency,
        timeline_length: timeline || undefined,
        tone,
        faqs: faqs.filter((faq) => faq.question && faq.answer),
        questions,
      });
      navigate(`/proposals/${response.id}/edit?step=template`);
    } catch (cause) {
      const apiError = cause as ApiError;
      if (apiError.code === "plan_limit_reached") setLimitOpen(true);
      else toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card" style={{ maxWidth: 720 }}>
        <p className="eyebrow">New proposal</p>
        <h1>Tell us about this proposal.</h1>
        <p className="muted" style={{ marginBottom: 24 }}>
          A few questions first. We'll pre-fill the rest.
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
              id="req-client"
              label="Client"
              value={clientId}
              placeholder="Choose a client"
              options={(clients.data?.data ?? []).map((client) => ({
                value: client.id,
                label: `${client.name} — ${client.email}`,
              }))}
              onChange={setClientId}
              error={errors.client}
            />
          ) : (
            <div className="two-up">
              <Input
                id="req-client-name"
                label="Client name"
                value={clientName}
                onChange={setClientName}
                error={errors.clientName}
                required
              />
              <Input
                id="req-client-email"
                label="Client email"
                type="email"
                value={clientEmail}
                onChange={setClientEmail}
                error={errors.clientEmail}
                helper="It links the client record when the document is created."
                required
              />
            </div>
          )}

          <Textarea
            id="req-problem"
            label="Problem you're solving"
            value={problem}
            onChange={setProblem}
            error={errors.problem}
            helper="What is the client's problem? One or two sentences."
            rows={4}
            required
          />

          <Fieldset legend="Which sections do you want?" error={errors.sections}>
            {SECTION_OPTIONS.map((section) => (
              <Checkbox
                key={section}
                id={`section-${section}`}
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

          {sections.includes("FAQs") && (
            <div className="card card-md stack-3">
              <strong>Add FAQs</strong>
              {faqs.map((faq, index) => (
                <div key={index} className="stack-2">
                  <Input
                    id={`req-faq-q-${index}`}
                    label={`Question ${index + 1}`}
                    value={faq.question}
                    onChange={(value) =>
                      setFaqs((current) => current.map((row, i) => (i === index ? { ...row, question: value } : row)))
                    }
                  />
                  <Textarea
                    id={`req-faq-a-${index}`}
                    label="Answer"
                    value={faq.answer}
                    rows={2}
                    onChange={(value) =>
                      setFaqs((current) => current.map((row, i) => (i === index ? { ...row, answer: value } : row)))
                    }
                  />
                </div>
              ))}
              <div>
                <Button variant="secondary" size="sm" onClick={() => setFaqs((current) => [...current, { question: "", answer: "" }])}>
                  + Add FAQ
                </Button>
              </div>
            </div>
          )}

          {sections.includes("Embedded Questions") && (
            <div className="card card-md stack-3">
              <strong>Add questions</strong>
              {questions.map((question, index) => (
                <div className="two-up" key={index}>
                  <Input
                    id={`req-q-${index}`}
                    label={`Question ${index + 1}`}
                    value={question.text}
                    onChange={(value) =>
                      setQuestions((current) => current.map((row, i) => (i === index ? { ...row, text: value } : row)))
                    }
                  />
                  <Select
                    id={`req-q-type-${index}`}
                    label="Type"
                    value={question.type}
                    options={[
                      { value: "short_text", label: "Short text" },
                      { value: "long_text", label: "Long text" },
                      { value: "single_choice", label: "Single choice" },
                      { value: "file_upload", label: "File upload" },
                    ]}
                    onChange={(value) =>
                      setQuestions((current) => current.map((row, i) => (i === index ? { ...row, type: value } : row)))
                    }
                  />
                </div>
              ))}
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setQuestions((current) => [...current, { text: "", type: "short_text" }])}
                >
                  + Add question
                </Button>
              </div>
            </div>
          )}

          <div className="two-up">
            <Select
              id="req-currency"
              label="Currency"
              value={currency}
              options={CURRENCIES.map((value) => ({ value, label: value }))}
              onChange={setCurrency}
            />
            <Input
              id="req-timeline"
              label="Timeline length"
              value={timeline}
              onChange={setTimeline}
              placeholder="4–6 weeks"
              helper="Optional."
            />
          </div>

          <div>
            <span className="field-label">Tone</span>
            <div className="segmented" style={{ marginTop: 8 }}>
              {["Formal", "Friendly", "Concise"].map((option) => (
                <button key={option} type="button" aria-pressed={tone === option} onClick={() => setTone(option)}>
                  {option}
                </button>
              ))}
            </div>
            <p className="helper">The tone affects the template's default wording.</p>
          </div>
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

      <ConfirmDialog
        open={limitOpen}
        onClose={() => setLimitOpen(false)}
        onConfirm={() => navigate("/proposals?status=published")}
        title="You reached your active-document limit"
        description={`Your plan allows ${limits.active_documents ?? "unlimited"} active documents. Archive or delete one to create a proposal.`}
        confirmLabel="Manage documents"
        destructive={false}
      />
    </div>
  );
}

/* ------------------------------------------------------------ stage 3 */

function ProposalCanvas({ id, blank }: { id: string; blank: boolean }) {
  const navigate = useNavigate();
  const toast = useToast();
  const query = useQuery({ queryKey: ["proposal", id], queryFn: () => proposalsApi.get(id) });
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState<DocContent>(EMPTY_DOC);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [share, setShare] = useState<{ url: string; publicId: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [initialised, setInitialised] = useState(false);

  const proposal = query.data?.proposal;

  useEffect(() => {
    if (!proposal || initialised) return;
    setTitle(proposal.title);
    const content = proposal.content;
    if (content && content.blocks?.length) {
      setDoc({ ...EMPTY_DOC, ...content });
      setBlocks(content.blocks);
    } else if (!blank) {
      setBlocks(
        blocksFromProposal({
          problem: proposal.problem,
          sections: proposal.sections,
          faqs: proposal.faqs,
          questions: proposal.questions,
        }),
      );
    }
    setDoc({
      ...EMPTY_DOC,
      brand_primary: proposal.brand_primary || "#c9a961",
      brand_secondary: proposal.brand_secondary || "#1a1a1a",
    });
    setInitialised(true);
  }, [proposal, blank, initialised]);

  const payload = useMemo(() => ({ title, content: { ...doc, blocks } }), [title, doc, blocks]);

  const autosave = useAutoSave({
    onSave: async (value) => {
      await proposalsApi.update(id, value as { title: string; content: DocContent });
    },
    beaconPath: `/api/proposals/${id}/autosave`,
    enabled: initialised,
  });

  useEffect(() => {
    if (initialised) autosave.markDirty(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, initialised]);

  const publish = async () => {
    if (!title.trim()) {
      toast.error("Give the proposal a title first.");
      return;
    }
    if (blocks.length === 0) {
      toast.error("Add at least one section before creating.");
      return;
    }
    setCreating(true);
    try {
      await autosave.save(payload);
      const response = await proposalsApi.publish(id);
      setShare({ url: response.url, publicId: response.public_id });
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setCreating(false);
    }
  };

  if (query.isLoading) {
    return (
      <div className="auth-split">
        <Spinner size={32} />
      </div>
    );
  }

  if (query.isError || !proposal) {
    return (
      <div className="page page-narrow">
        <h1 className="serif">Could not load this proposal.</h1>
        <p className="muted">{errorMessage((query.error as ApiError)?.code)}</p>
        <Button className="mt-6" onClick={() => navigate("/proposals")}>
          Back to proposals
        </Button>
      </div>
    );
  }

  const sections = proposal.sections?.length
    ? proposal.sections
    : ["Introduction", "Scope", "Timeline", "Pricing", "Next Step"];

  return (
    <div className="builder">
      <TopBar
        title={title}
        onTitleChange={setTitle}
        saveState={autosave.state}
        onBack={() => navigate("/proposals")}
        onPreview={() => setPreview(true)}
        onSave={() => void autosave.save(payload)}
        onCreate={publish}
        creating={creating}
        moreItems={[
          {
            label: "Duplicate",
            onClick: async () => {
              const response = await proposalsApi.duplicate(id);
              navigate(`/proposals/${response.id}/edit`);
            },
          },
          {
            label: "Archive",
            onClick: async () => {
              await proposalsApi.archive(id);
              toast.success("Archived.");
              navigate("/proposals");
            },
          },
          {
            label: "Delete",
            danger: true,
            onClick: async () => {
              await proposalsApi.remove(id);
              toast.success("Deleted.");
              navigate("/proposals");
            },
          },
        ]}
      />
      <Canvas
        doc={doc}
        blocks={blocks}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onBlocksChange={setBlocks}
        onDocChange={(patch) => setDoc((current) => ({ ...current, ...patch }))}
        sections={sections}
        blockDefinitions={[
          { type: "heading", label: "Heading", hint: "H1, H2, H3" },
          { type: "paragraph", label: "Paragraph", hint: "Body text" },
          { type: "pricing_table", label: "Pricing", hint: "Line items" },
          { type: "packages", label: "Packages", hint: "Basic / Standard / Premium" },
          { type: "faq", label: "FAQ", hint: "Collapsible" },
          { type: "question", label: "Question", hint: "Ask the client" },
          { type: "timeline", label: "Timeline", hint: "Milestones" },
          { type: "list", label: "List", hint: "Bulleted" },
          { type: "image", label: "Image", hint: "Upload or URL" },
          { type: "graph", label: "Graph", hint: "Bar chart" },
          { type: "button", label: "Button", hint: "Call to action" },
          { type: "divider", label: "Divider", hint: "A line" },
        ]}
        suggestions={
          blank
            ? [proposal.problem || "Problem", ...sections.map((section) => `Section: ${section}`)]
            : undefined
        }
        clientName={proposal.client_name || "the client"}
        title={title}
        reference={proposal.public_id?.slice(0, 8) || "draft"}
      />

      <PreviewPane
        open={preview}
        onClose={() => setPreview(false)}
        title={title}
        clientName={proposal.client_name || "the client"}
        reference={proposal.public_id?.slice(0, 8) || "draft"}
        blocks={blocks}
        doc={doc}
      />

      <ShareModal
        open={Boolean(share)}
        onClose={() => setShare(null)}
        title="Your proposal is ready."
        url={share?.url || ""}
        defaultMessage={`Hi ${proposal.client_name || "there"}, here is the proposal we discussed. Let me know if you have any questions.`}
        password={proposal.password_protected ? "The password you set" : undefined}
        onDone={async () => {
          await proposalsApi.share(id, "manual");
          setShare(null);
          navigate("/proposals");
        }}
      />
    </div>
  );
}


