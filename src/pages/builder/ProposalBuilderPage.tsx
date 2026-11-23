import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProposalRequirementForm } from "../../components/builder/ProposalRequirementForm";
import { proposalsApi } from "../../api/proposals";
import { Canvas } from "../../components/builder/Canvas";
import { TopBar } from "../../components/builder/TopBar";
import { TemplatePicker } from "../../components/builder/TemplatePicker";
import { PreviewPane } from "../../components/builder/PreviewPane";
import { ShareModal } from "../../components/builder/ShareModal";
import { DocumentReview } from "../../components/builder/DocumentReview";
import { DraftProgress, type DraftProgressState } from "../../components/builder/DraftProgress";
import { analyzeDocument, type Review } from "../../lib/analysis";
import { ResearchPanel } from "../../components/builder/ResearchPanel";
import { briefOf, contentOf, hasPlaceholders, skeletonForBrief, type Brief } from "../../lib/brief";
import {
  markPipelineDone,
  readResearch,
  runDraftPipeline,
  type DraftStage,
  type Research,
} from "../../lib/pipeline";
import { isBuiltIn } from "../../lib/templates";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { useAutoSave } from "../../hooks/useAutoSave";
import { useToast } from "../../hooks/useToast";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { Block, DocContent } from "../../types";

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

  return params.get("step") === "template" ? (
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
  const [stage, setStage] = useState<DraftStage | null>(null);
  const [stageStatuses, setStageStatuses] = useState<DraftProgressState>({});
  const briefRef = useRef<Brief | null>(null);

  const proposal = query.data?.proposal;

  useEffect(() => {
    if (!proposal || initialised) return;
    setTitle(proposal.title);
    const content = contentOf(proposal);
    const savedBlocks = Array.isArray(content.blocks) ? (content.blocks as Block[]) : [];
    const images = readResearch(id).images;
    const brief = briefOf(proposal, images);
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
      : blank
        ? []
        : templateBlocks?.length
          ? templateBlocks
          : skeletonForBrief(brief, "proposal");

    setBlocks(initial);

    const wantsDraft = !blank && !content.drafted && (savedBlocks.length === 0 || hasPlaceholders(savedBlocks));
    setStage(wantsDraft ? "context" : null);
    setStageStatuses({});
    setInitialised(true);
  }, [proposal, blank, id, initialised]);

  /* The research lands a moment after the draft is created; pick it up here. */
  useEffect(() => {
    if (research.notes.length || research.images.length) return;
    const timer = setInterval(() => {
      const next = readResearch(id);
      if (next.notes.length || next.images.length) {
        setResearch(next);
        clearInterval(timer);
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [id, research.notes.length, research.images.length]);

  const payload = useMemo(() => ({ title, content: { ...doc, blocks } }), [title, doc, blocks]);

  const autosave = useAutoSave({
    onSave: async (value) => {
      await proposalsApi.update(id, value as { title: string; content: DocContent });
    },
    beaconPath: `/api/proposals/${id}/autosave`,
    enabled: initialised,
  });

  const persistDraft = async (nextBlocks: Block[]) => {
    const base = proposal ? contentOf(proposal) : {};
    const content = { ...base, ...doc, blocks: nextBlocks, drafted: true };
    await proposalsApi.update(id, { content: content as DocContent }).catch(() => undefined);
  };

  /* The staged first draft. */
  useEffect(() => {
    if (!initialised || !proposal || !stage || stage !== "context") return;
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
      kind: "proposal",
      onStage: step,
    })
      .then(async (result) => {
        if (cancelled) return;
        if (cancelled) return;
        setBlocks(result.blocks);
        setResearch(readResearch(id));
        await persistDraft(result.blocks);
        markPipelineDone(id);
      })
      .catch(() => undefined)
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
        <SkeletonLines count={6} />
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

  if (stage) {
    return (
      <div className="builder">
        <DraftProgress stage={stage} clientName={proposal.client_name || "your client"} statuses={stageStatuses} documentLabel="proposal" />
      </div>
    );
  }

  const sections = briefOf(proposal).sections.length
    ? briefOf(proposal).sections
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
      <ResearchPanel research={research} source={undefined} running={false} />

      <Canvas
        doc={doc}
        documentType="proposal"
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
