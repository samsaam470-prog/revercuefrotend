import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProposalRequirementForm } from "../../components/builder/ProposalRequirementForm";
import { proposalsApi } from "../../api/proposals";
import { crmApi } from "../../api/crm";
import { Canvas, blocksFromProposal } from "../../components/builder/Canvas";
import { TopBar } from "../../components/builder/TopBar";
import { TemplatePicker } from "../../components/builder/TemplatePicker";
import { PreviewPane } from "../../components/builder/PreviewPane";
import { ShareModal } from "../../components/builder/ShareModal";
import { DocumentReview } from "../../components/builder/DocumentReview";
import { analyzeDocument, type Review } from "../../lib/analysis";
import { ResearchPanel } from "../../components/builder/ResearchPanel";
import {
  markPipelineDone,
  pipelineDone,
  readResearch,
  runDraftPipeline,
  type Research,
} from "../../lib/pipeline";
import { isBuiltIn } from "../../lib/templates";
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

  if (!id) return <ProposalRequirementForm />;

  const step = params.get("step");

  return step === "template" ? (
    <TemplatePicker
      type="proposal"
      onBack={() => navigate("/proposals/new")}
      onPick={async ({ templateId, blocks }) => {
        if (templateId && !isBuiltIn(templateId)) {
          await proposalsApi.update(id, { template_id: templateId }).catch(() => undefined);
        }
        if (blocks) {
          try {
            sessionStorage.setItem(`revercue_template_${id}`, JSON.stringify(blocks));
          } catch {
            /* the picker still opens the canvas with the generated skeleton */
          }
        }
        navigate(`/proposals/${id}/edit`, { replace: true });
      }}
    />
  ) : (
    <ProposalCanvas id={id} blank={params.get("blank") === "true"} />
  );
}

/* ------------------------------------------------------------ stage 1 */

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
  const [review, setReview] = useState<Review | null>(null);
  const [pendingShare, setPendingShare] = useState<{ url: string; publicId: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [initialised, setInitialised] = useState(false);
  const [research, setResearch] = useState<Research>(() => readResearch(id));
  const [pipeline, setPipeline] = useState<{
    running: boolean;
    source?: "helper" | "backend" | "pattern";
  }>({ running: false });

  const proposal = query.data?.proposal;

  useEffect(() => {
    if (!proposal || initialised) return;
    setTitle(proposal.title);
    const content = proposal.content;
    if (content && content.blocks?.length) {
      setDoc({ ...EMPTY_DOC, ...content });
      setBlocks(content.blocks);
    } else if (!blank) {
      let templateBlocks: Block[] | null = null;
      try {
        const stored = sessionStorage.getItem(`revercue_template_${id}`);
        if (stored) templateBlocks = JSON.parse(stored) as Block[];
      } catch {
        templateBlocks = null;
      }
      setBlocks(
        templateBlocks?.length
          ? templateBlocks
          : blocksFromProposal({
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

  /* The research lands a moment after the draft is created; pick it up here. */
  useEffect(() => {
    if (research.notes.length) return;
    const timer = setInterval(() => {
      const next = readResearch(id);
      if (next.notes.length || next.images.length) {
        setResearch(next);
        clearInterval(timer);
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [id, research.notes.length]);

  useEffect(() => {
    if (!initialised || blocks.length === 0 || pipeline.running) return;
    if (pipelineDone(id)) return;
    const hasPlaceholders = blocks.some(
      (block) =>
        Boolean(block.meta?.placeholder) ||
        (block.items ?? []).some((item) => /\{\{/.test(item.label || "")) ||
        Boolean(block.text && /\{\{/.test(block.text)),
    );
    if (!hasPlaceholders && !readResearch(id).notes.length) return;

    let cancelled = false;
    setPipeline({ running: true });

    const extra = proposal as typeof proposal & {
      industry?: string;
      packages?: { name: string; price: number; deliverables?: string }[];
    };
    const sectionList = proposal?.sections?.length ? proposal.sections : ["Introduction", "Scope"];
    const client = proposal?.client_name || "the client";

    const fills: Record<string, string> = {
      introduction: proposal?.problem || `${client} needs a clear plan for this work.`,
      scope: `This covers ${sectionList.filter((section) => section !== "Pricing").join(", ").toLowerCase()}.`,
      timeline: proposal?.timeline_length || "",
      next_step: "Reply to this link and I will send the contract.",
    };

    const packages = extra.packages?.length
      ? extra.packages.map((item) => ({ label: item.name, price: item.price }))
      : undefined;

    void runDraftPipeline({
      id,
      blocks,
      sections: sectionList,
      tone: proposal?.tone || "formal",
      fills,
      packages,
      industry: extra.industry,
    })
      .then((result) => {
        if (cancelled) return;
        setBlocks(result.blocks);
        setPipeline({ running: false, source: result.source });
        markPipelineDone(id);
      })
      .catch(() => {
        if (!cancelled) setPipeline({ running: false });
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
      const nextShare = { url: response.url, publicId: response.public_id };
      const result = await analyzeDocument({
        blocks,
        hasClient: Boolean(proposal?.client_id),
      });
      setPendingShare(nextShare);
      setReview(result);
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
      <ResearchPanel research={research} source={pipeline.source} running={pipeline.running} />

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
        title="Your proposal is ready."
        url={share?.url || ""}
        defaultMessage={`Hi ${proposal.client_name || "there"}, here is the proposal we discussed. Let me know if you have any questions.`}
        password={proposal.password_protected ? "The password you set" : undefined}
        clientEmail={proposal?.client_email}
        clientPhone={proposal?.client_phone}
        onDone={async () => {
          await proposalsApi.share(id, "manual");
          setShare(null);
          navigate("/proposals");
        }}
      />
    </div>
  );
}


