import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, FileText, Loader2, RefreshCw } from "lucide-react";
import { DraftProgress, type DraftProgressState } from "../src/components/builder/DraftProgress";
import type { DraftStage } from "../src/lib/pipeline";
import type { Block, DocContent } from "../src/types";
import { DemoForm, emptyBrief, validateBrief } from "./Form";
import { Editor } from "./Editor";
import { PrintDocument } from "./PrintDocument";
import { DemoApiError, generateProposal, type DemoBrief } from "./api";

const STORAGE_KEY = "revercue_demo_proposal_v1";
const STORAGE_BRIEF = "revercue_demo_brief_v1";

interface Stored {
  title: string;
  blocks: Block[];
  brief: DemoBrief;
  warnings: string[];
}

function loadStored(): Stored | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed || !Array.isArray(parsed.blocks) || !parsed.blocks.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

function loadBrief(): DemoBrief {
  try {
    const raw = sessionStorage.getItem(STORAGE_BRIEF);
    if (raw) return { ...emptyBrief(), ...(JSON.parse(raw) as DemoBrief) };
  } catch {
    /* a fresh brief is fine */
  }
  return emptyBrief();
}

const DOC: DocContent = {
  blocks: [],
  brand_primary: "#c9a961",
  brand_secondary: "#1a1a1a",
  page_background: "#ffffff",
  max_width: 720,
};

export function App() {
  const stored = useMemo(loadStored, []);
  const [brief, setBrief] = useState<DemoBrief>(loadBrief);
  const [title, setTitle] = useState(stored?.title ?? "");
  const [blocks, setBlocks] = useState<Block[]>(stored?.blocks ?? []);
  const [warnings, setWarnings] = useState<string[]>(stored?.warnings ?? []);
  const [view, setView] = useState<"form" | "generating" | "editor">(stored ? "editor" : "form");
  const [error, setError] = useState<{ message: string; code: string; retryable: boolean } | null>(null);
  const [stage, setStage] = useState<DraftStage>("context");
  const [statuses, setStatuses] = useState<DraftProgressState>({});
  const [elapsed, setElapsed] = useState(0);
  const history = useRef<{ title: string; blocks: Block[] }[]>(stored ? [{ title: stored.title, blocks: stored.blocks }] : []);
  const [historyIndex, setHistoryIndex] = useState(0);
  const stageTimers = useRef<number[]>([]);
  const abortRef = useRef(false);

  const record = useCallback((nextTitle: string, nextBlocks: Block[]) => {
    const entries = history.current.slice(0, historyIndex + 1);
    const last = entries[entries.length - 1];
    if (last && last.title === nextTitle && JSON.stringify(last.blocks) === JSON.stringify(nextBlocks)) return;
    entries.push({ title: nextTitle, blocks: nextBlocks });
    history.current = entries.slice(-40);
    setHistoryIndex(history.current.length - 1);
  }, [historyIndex]);

  const mutateBlocks = useCallback(
    (updater: (current: Block[]) => Block[]) => {
      setBlocks((current) => {
        const next = updater(current);
        record(title, next);
        return next;
      });
    },
    [record, title]
  );

  useEffect(() => {
    if (blocks.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ title, blocks, brief, warnings }));
      sessionStorage.setItem(STORAGE_BRIEF, JSON.stringify(brief));
    } catch {
      /* storage full: the draft stays in memory */
    }
  }, [title, blocks, brief, warnings]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      if (!meta) return;
      if (event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex]);

  useEffect(() => {
    if (view !== "generating") return;
    const started = Date.now();
    const timer = window.setInterval(() => setElapsed(Math.round((Date.now() - started) / 1000)), 1000);
    return () => window.clearInterval(timer);
  }, [view]);

  const undo = () => {
    if (historyIndex <= 0) return;
    const next = historyIndex - 1;
    setHistoryIndex(next);
    setTitle(history.current[next].title);
    setBlocks(history.current[next].blocks);
  };

  const redo = () => {
    if (historyIndex >= history.current.length - 1) return;
    const next = historyIndex + 1;
    setHistoryIndex(next);
    setTitle(history.current[next].title);
    setBlocks(history.current[next].blocks);
  };

  const clearStageTimers = () => {
    stageTimers.current.forEach((id) => window.clearTimeout(id));
    stageTimers.current = [];
  };

  const start = async () => {
    const errors = validateBrief(brief);
    if (Object.keys(errors).length) {
      setError({ message: Object.values(errors)[0], code: "invalid_brief", retryable: true });
      return;
    }
    abortRef.current = false;
    setError(null);
    setWarnings([]);
    setView("generating");
    setStage("context");
    setStatuses({ context: { status: "running", detail: "Reading your brief and choosing sections." } });
    clearStageTimers();
    // The server does the work; these stages mirror what it reports on return.
    stageTimers.current.push(
      window.setTimeout(() => {
        setStage("research");
        setStatuses((current) => ({
          ...current,
          context: { status: "done", detail: "Brief and sections loaded." },
          research: {
            status: "skipped",
            detail: "This public demo uses only your brief — it does not browse the web.",
          },
          structure: { status: "running", detail: "Planning section order and purpose." },
        }));
      }, 1200)
    );
    stageTimers.current.push(
      window.setTimeout(() => {
        setStage("writing");
        setStatuses((current) => ({
          ...current,
          structure: { status: "done", detail: "Section order planned." },
          writing: { status: "running", detail: "Writing each section with NaraRouter." },
        }));
      }, 4500)
    );
    stageTimers.current.push(
      window.setTimeout(() => {
        setStage("visuals");
        setStatuses((current) => ({
          ...current,
          writing: { status: "done", detail: "Sections written." },
          visuals: { status: "running", detail: "Resolving icons, licensed photos and any real-data charts." },
        }));
      }, 16000)
    );

    try {
      const document = await generateProposal(brief);
      clearStageTimers();
      setStage("checks");
      setStatuses((current) => ({
        ...current,
        visuals: {
          status: document.meta.visuals > 0 ? "done" : "skipped",
          detail: document.meta.visuals > 0 ? `${document.meta.visuals} visual assets added.` : "No visual asset was available; the document stays text-first.",
        },
        checks: { status: "done", detail: `${document.blocks.length} editable blocks checked.` },
      }));
      const nextTitle = document.title;
      setTitle(nextTitle);
      setBlocks(document.blocks);
      setWarnings(document.meta.warnings ?? []);
      history.current = [{ title: nextTitle, blocks: document.blocks }];
      setHistoryIndex(0);
      window.setTimeout(() => {
        if (!abortRef.current) setView("editor");
      }, 600);
    } catch (cause) {
      clearStageTimers();
      const apiError = cause instanceof DemoApiError ? cause : new DemoApiError("failed", "The proposal could not be generated.", 500);
      setError({ message: apiError.message, code: apiError.code, retryable: apiError.retryable });
      setView("form");
    }
  };

  const addSection = (heading: string) => {
    const stamp = Date.now().toString(36);
    mutateBlocks((current) => [
      ...current,
      { id: `add_${stamp}_h`, type: "heading", text: heading, level: "h2" },
      { id: `add_${stamp}_p`, type: "paragraph", text: "" },
    ]);
  };

  const sectionIndexes = (headingId: string): number[] => {
    const start = blocks.findIndex((block) => block.id === headingId);
    if (start < 0) return [];
    const indexes = [start];
    for (let index = start + 1; index < blocks.length; index += 1) {
      const block = blocks[index];
      if (block.type === "heading" && block.level !== "h1") break;
      indexes.push(index);
    }
    return indexes;
  };

  const removeSection = (headingId: string) => {
    const remove = new Set(sectionIndexes(headingId));
    mutateBlocks((current) => current.filter((_, index) => !remove.has(index)));
  };

  const moveSection = (headingId: string, direction: -1 | 1) => {
    const indexes = sectionIndexes(headingId);
    if (!indexes.length) return;
    const section = indexes.map((index) => blocks[index]);
    const remaining = blocks.filter((_, index) => !indexes.includes(index));
    const headings = remaining
      .map((block, index) => ({ block, index }))
      .filter((item) => item.block.type === "heading" && item.block.level !== "h1");
    const position = headings.findIndex((item) => item.block.id === headingId);
    if (position < 0) return;
    const targetHeading = headings[position + direction];
    const insertAt = targetHeading
      ? direction < 0
        ? targetHeading.index
        : targetHeading.index + sectionIndexesFor(remaining, targetHeading.block.id)
      : remaining.length;
    const next = [...remaining.slice(0, insertAt), ...section, ...remaining.slice(insertAt)];
    mutateBlocks(() => next);
  };

  const sectionIndexesFor = (list: Block[], headingId: string): number => {
    const start = list.findIndex((block) => block.id === headingId);
    if (start < 0) return 0;
    let count = 1;
    for (let index = start + 1; index < list.length; index += 1) {
      const block = list[index];
      if (block.type === "heading" && block.level !== "h1") break;
      count += 1;
    }
    return count;
  };

  const patchBlock = (id: string, patch: Partial<Block>) => {
    mutateBlocks((current) => current.map((block) => (block.id === id ? { ...block, ...patch } : block)));
  };

  const deleteBlock = (id: string) => {
    mutateBlocks((current) => current.filter((block) => block.id !== id));
  };

  const moveBlock = (id: string, direction: -1 | 1) => {
    mutateBlocks((current) => {
      const index = current.findIndex((block) => block.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const replaceVisual = (id: string, block: Block) => {
    mutateBlocks((current) => current.map((item) => (item.id === id ? { ...block, id } : item)));
  };

  const startOver = () => {
    if (!window.confirm("Start a new proposal? This temporary draft will be cleared from this tab.")) return;
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_BRIEF);
    setBlocks([]);
    setTitle("");
    setWarnings([]);
    setBrief(emptyBrief());
    setError(null);
    setView("form");
    history.current = [];
    setHistoryIndex(0);
  };

  return (
    <div className="demo-app">
      <header className="demo-header">
        <a className="demo-brand" href="https://revercue.co.uk" target="_blank" rel="noreferrer noopener">
          <span className="demo-mark">R</span>
          <span>
            Revercue
            <small>Proposal generator</small>
          </span>
        </a>
        <a
          className="demo-button demo-button-sm"
          href="https://revercue.co.uk/?utm_source=huggingface&utm_medium=demo&utm_campaign=proposal_generator"
          target="_blank"
          rel="noreferrer noopener"
        >
          Revercue platform <ArrowRight size={13} />
        </a>
      </header>

      {view === "form" && (
        <main className="demo-main">
          <section className="demo-hero">
            <p className="demo-eyebrow">Free public demo · no account needed</p>
            <h1>Write a client-ready proposal in one pass.</h1>
            <p className="demo-lede">
              Give a short brief. Revercue's pipeline plans the sections, writes the copy with NaraRouter, adds licensed visuals
              where they are honest, and hands you an editable document you can export as a PDF.
            </p>
            <ul className="demo-points">
              <li><FileText size={14} /> Editable sections, pricing and clauses</li>
              <li><RefreshCw size={14} /> AI improvements to a single passage</li>
              <li><ArrowRight size={14} /> Export the final, edited document to PDF</li>
            </ul>
          </section>

          {error && (
            <div className="demo-error-panel" role="alert">
              <AlertTriangle size={16} />
              <div>
                <strong>
                  {error.code === "rate_limited"
                    ? "Demo limit reached"
                    : error.code === "ai_not_configured" || error.code === "ai_auth_failed"
                      ? "The proposal service is not ready"
                      : "That did not work"}
                </strong>
                <p>{error.message}</p>
                {error.retryable && (
                  <button type="button" className="demo-button demo-button-sm" onClick={() => void start()}>
                    Try again
                  </button>
                )}
              </div>
            </div>
          )}

          <DemoForm brief={brief} onChange={setBrief} onSubmit={() => void start()} busy={false} />
        </main>
      )}

      {view === "generating" && (
        <main className="demo-main demo-generating" aria-busy="true">
          <DraftProgress stage={stage} clientName={brief.clientName || "your client"} statuses={statuses} documentLabel="proposal" />
          <p className="demo-elapsed">
            <Loader2 size={14} className="demo-spin" /> {elapsed}s elapsed. A full proposal usually takes 20–60 seconds. Keep
            this tab open.
          </p>
          <button
            type="button"
            className="demo-button demo-button-sm"
            onClick={() => {
              abortRef.current = true;
              clearStageTimers();
              setView("form");
            }}
          >
            Cancel and edit my brief
          </button>
        </main>
      )}

      {view === "editor" && blocks.length > 0 && (
        <Editor
          title={title}
          blocks={blocks}
          doc={{ ...DOC, blocks }}
          brief={brief}
          warnings={warnings}
          onPatchBlock={patchBlock}
          onDeleteBlock={deleteBlock}
          onMoveBlock={moveBlock}
          onTitle={(value) => {
            setTitle(value);
            record(value, blocks);
          }}
          onAddSection={addSection}
          onRemoveSection={removeSection}
          onMoveSection={moveSection}
          onReplaceVisual={replaceVisual}
          onUndo={undo}
          onRedo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.current.length - 1}
          onStartOver={startOver}
        />
      )}

      <PrintDocument title={title} clientName={brief.clientName} businessName={brief.businessName} blocks={blocks} />

      <footer className="demo-footer">
        <span>Built on the existing Revercue API. Temporary drafts only.</span>
        <a href="https://revercue.co.uk" target="_blank" rel="noreferrer noopener">
          revercue.co.uk
        </a>
      </footer>
    </div>
  );
}
