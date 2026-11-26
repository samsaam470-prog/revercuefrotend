import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Download, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { BlockRenderer } from "../src/components/builder/BlockRenderer";
import type { Block, DocContent } from "../src/types";
import { DemoApiError, refineText, regenerateVisual, type DemoBrief, type RefineAction } from "./api";

const ACTIONS: { action: RefineAction; label: string }[] = [
  { action: "improve", label: "Improve" },
  { action: "professional", label: "More professional" },
  { action: "persuasive", label: "More persuasive" },
  { action: "simplify", label: "Simplify" },
  { action: "expand", label: "Expand" },
  { action: "shorten", label: "Shorten" },
  { action: "summary", label: "Executive summary" },
  { action: "scope", label: "Scope of work" },
  { action: "value", label: "Value proposition" },
  { action: "pricing", label: "Pricing explanation" },
];

const VISUAL_TYPES: Block["type"][] = ["image", "icon", "chart", "diagram"];
const isVisual = (block: Block) => VISUAL_TYPES.includes(block.type);

function sectionsOf(blocks: Block[]) {
  const sections: { headingId: string; title: string; indexes: number[] }[] = [];
  blocks.forEach((block, index) => {
    if (block.type === "heading" && block.level !== "h1") {
      sections.push({ headingId: block.id, title: block.text ?? "Untitled section", indexes: [index] });
    } else if (sections.length) {
      sections[sections.length - 1].indexes.push(index);
    }
  });
  return sections;
}

export function Editor({
  title,
  blocks,
  doc,
  brief,
  warnings,
  onPatchBlock,
  onDeleteBlock,
  onMoveBlock,
  onTitle,
  onAddSection,
  onRemoveSection,
  onMoveSection,
  onReplaceVisual,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onStartOver,
}: {
  title: string;
  blocks: Block[];
  doc: DocContent;
  brief: DemoBrief;
  warnings: string[];
  onPatchBlock: (id: string, patch: Partial<Block>) => void;
  onDeleteBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: -1 | 1) => void;
  onTitle: (value: string) => void;
  onAddSection: (heading: string) => void;
  onRemoveSection: (headingId: string) => void;
  onMoveSection: (headingId: string, direction: -1 | 1) => void;
  onReplaceVisual: (id: string, block: Block) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onStartOver: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newSection, setNewSection] = useState("");
  const [busyBlock, setBusyBlock] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<{ id: string; original: string; text: string; action: RefineAction } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [visualTarget, setVisualTarget] = useState<Block | null>(null);
  const [visualQuery, setVisualQuery] = useState("");
  const [chartEditor, setChartEditor] = useState<Block | null>(null);
  const sections = useMemo(() => sectionsOf(blocks), [blocks]);
  const selected = blocks.find((block) => block.id === selectedId) ?? null;
  const editableText = selected && (selected.type === "paragraph" || selected.type === "heading" || selected.type === "quote");

  const runRefine = async (action: RefineAction) => {
    if (!selected || !selected.text) return;
    setBusyBlock(selected.id);
    setNotice(null);
    try {
      const text = await refineText({ text: selected.text, action, tone: brief.tone, context: title });
      setSuggestion({ id: selected.id, original: selected.text, text, action });
    } catch (error) {
      setNotice(error instanceof DemoApiError ? error.message : "That edit could not be completed. Please retry.");
    } finally {
      setBusyBlock(null);
    }
  };

  const runVisual = async () => {
    if (!visualTarget) return;
    setBusyBlock(visualTarget.id);
    setNotice(null);
    try {
      const block = await regenerateVisual({
        type: visualTarget.type as "image" | "icon" | "chart" | "diagram",
        query: visualQuery.trim() || visualTarget.alt || visualTarget.caption || brief.service || "business",
        data: visualTarget.type === "chart" ? { series: visualTarget.chart?.series } : visualTarget.type === "diagram" ? { steps: visualTarget.diagram?.steps } : undefined,
      });
      onReplaceVisual(visualTarget.id, block);
      setVisualTarget(null);
      setNotice("Visual replaced. You can keep the original with Undo.");
    } catch (error) {
      setNotice(error instanceof DemoApiError ? error.message : "The visual service could not be reached.");
    } finally {
      setBusyBlock(null);
    }
  };

  const download = () => {
    setNotice(null);
    document.body.classList.add("demo-printing");
    const cleanup = () => {
      document.body.classList.remove("demo-printing");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.setTimeout(() => window.print(), 80);
  };

  const patchChartPoint = (index: number, patch: { label?: string; value?: number }) => {
    if (!chartEditor?.chart) return;
    const series = chartEditor.chart.series.map((point, at) => (at === index ? { ...point, ...patch } : point));
    onPatchBlock(chartEditor.id, { chart: { ...chartEditor.chart, series } });
    setChartEditor({ ...chartEditor, chart: { ...chartEditor.chart, series } });
  };

  return (
    <div className="demo-editor">
      <header className="demo-editor-top">
        <div>
          <p className="demo-eyebrow">Your proposal</p>
          <input
            className="demo-title-input"
            value={title}
            aria-label="Proposal title"
            onChange={(event) => onTitle(event.target.value)}
          />
        </div>
        <div className="demo-editor-actions">
          <button type="button" className="demo-button" onClick={onUndo} disabled={!canUndo}>
            Undo
          </button>
          <button type="button" className="demo-button" onClick={onRedo} disabled={!canRedo}>
            Redo
          </button>
          <button type="button" className="demo-button demo-button-primary" onClick={download}>
            <Download size={15} /> Download PDF
          </button>
        </div>
      </header>

      {warnings.length > 0 && (
        <div className="demo-warning">
          <strong>Before you send this</strong>
          <ul>
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {notice && (
        <div className="demo-notice" role="status">
          {notice}
        </div>
      )}

      <div className="demo-editor-grid">
        <div className="demo-doc">
          <div className="demo-sections-bar">
            <span className="demo-eyebrow">Sections</span>
            <div className="demo-section-controls">
              {sections.map((section) => (
                <span className="demo-section-pill" key={section.headingId}>
                  {section.title}
                  <button type="button" aria-label={`Move ${section.title} up`} onClick={() => onMoveSection(section.headingId, -1)}>
                    <ArrowUp size={11} />
                  </button>
                  <button type="button" aria-label={`Move ${section.title} down`} onClick={() => onMoveSection(section.headingId, 1)}>
                    <ArrowDown size={11} />
                  </button>
                  <button type="button" aria-label={`Remove ${section.title}`} onClick={() => onRemoveSection(section.headingId)}>
                    <Trash2 size={11} />
                  </button>
                </span>
              ))}
            </div>
            <form
              className="demo-add-section"
              onSubmit={(event) => {
                event.preventDefault();
                if (!newSection.trim()) return;
                onAddSection(newSection.trim());
                setNewSection("");
              }}
            >
              <input
                aria-label="New section name"
                placeholder="Add a section, e.g. Why us"
                value={newSection}
                onChange={(event) => setNewSection(event.target.value)}
              />
              <button type="submit" className="demo-button demo-button-sm">
                <Plus size={13} /> Add
              </button>
            </form>
          </div>

          <div className="demo-blocks">
            {blocks.map((block) => (
              <div
                key={block.id}
                className={
                  "demo-block" +
                  (selectedId === block.id ? " is-selected" : "") +
                  (isVisual(block) ? " is-visual" : "")
                }
                onClick={() => setSelectedId(block.id)}
              >
                <BlockRenderer
                  block={block}
                  documentType="proposal"
                  editable
                  selected={selectedId === block.id}
                  brandPrimary={doc.brand_primary}
                  onPatch={(patch) => onPatchBlock(block.id, patch)}
                  onSelect={() => setSelectedId(block.id)}
                  onDelete={() => onDeleteBlock(block.id)}
                  onMoveUp={() => onMoveBlock(block.id, -1)}
                  onMoveDown={() => onMoveBlock(block.id, 1)}
                />
                {selectedId === block.id && (
                  <div className="demo-block-actions">
                    {(editableText || block.type === "list") && (
                      <button type="button" className="demo-button demo-button-sm" onClick={() => void runRefine("improve")} disabled={busyBlock === block.id}>
                        {busyBlock === block.id ? <Loader2 size={12} className="demo-spin" /> : <Sparkles size={12} />} Improve with AI
                      </button>
                    )}
                    {isVisual(block) && (
                      <>
                        <button
                          type="button"
                          className="demo-button demo-button-sm"
                          onClick={() => {
                            setVisualTarget(block);
                            setVisualQuery(block.alt || block.meta?.fromPipeline?.toString() || brief.service || "");
                          }}
                        >
                          Replace visual
                        </button>
                        {block.type === "chart" && (
                          <button type="button" className="demo-button demo-button-sm" onClick={() => setChartEditor(block)}>
                            Edit chart data
                          </button>
                        )}
                        <button type="button" className="demo-button demo-button-sm" onClick={() => onDeleteBlock(block.id)}>
                          Remove visual
                        </button>
                      </>
                    )}
                    <button type="button" className="demo-button demo-button-sm" onClick={() => onMoveBlock(block.id, -1)}>
                      <ArrowUp size={12} />
                    </button>
                    <button type="button" className="demo-button demo-button-sm" onClick={() => onMoveBlock(block.id, 1)}>
                      <ArrowDown size={12} />
                    </button>
                    <button type="button" className="demo-button demo-button-sm" onClick={() => onDeleteBlock(block.id)}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="demo-footer-actions">
            <button type="button" className="demo-button" onClick={onStartOver}>
              Start a new proposal
            </button>
            <p className="demo-note">
              This draft is temporary and lives in this browser tab. Revercue accounts keep proposals, clients and contracts in
              one place.
            </p>
          </div>
        </div>

        <aside className="demo-side">
          <section className="demo-card">
            <h2>Rewrite this section</h2>
            {selected && (selected.text || selected.type === "list") ? (
              <>
                <p className="demo-muted">
                  Editing <strong>{selected.type}</strong>: “{(selected.text ?? selected.items?.map((item) => item.label).join(", ") ?? "").slice(0, 90)}…”
                </p>
                <div className="demo-actions-grid">
                  {ACTIONS.map((item) => (
                    <button
                      key={item.action}
                      type="button"
                      className="demo-button demo-button-sm"
                      onClick={() => void runRefine(item.action)}
                      disabled={busyBlock === selected.id}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="demo-muted">Only this passage is sent. The rest of the proposal stays exactly as it is.</p>
              </>
            ) : (
              <p className="demo-muted">Select a heading or paragraph in the document to improve it with AI.</p>
            )}
          </section>

          <section className="demo-card demo-preview-card">
            <h2>Live preview</h2>
            <div className="demo-preview-page" style={{ borderTopColor: doc.brand_primary || "#c9a961" }}>
              <p className="demo-eyebrow">{brief.businessName || "Your business"}</p>
              <h3>{title || "Untitled proposal"}</h3>
              <p className="demo-muted">Prepared for {brief.clientName}</p>
              <div className="demo-preview-body">
                {blocks.slice(0, 30).map((block) => (
                  <BlockRenderer key={block.id} block={block} brandPrimary={doc.brand_primary} documentType="proposal" />
                ))}
              </div>
            </div>
            <p className="demo-muted">Download PDF opens your browser's print dialog — choose "Save as PDF" for a file that matches this preview.</p>
          </section>

          <section className="demo-card demo-cta">
            <h2>Keep this proposal</h2>
            <p>
              Revercue saves proposals permanently, tracks when a client opens them, and turns an accepted proposal into a
              contract and invoice.
            </p>
            <a
              className="demo-button demo-button-primary"
              href="https://revercue.co.uk/?utm_source=huggingface&utm_medium=demo&utm_campaign=proposal_generator"
              target="_blank"
              rel="noreferrer noopener"
            >
              Continue with Revercue
            </a>
          </section>
        </aside>
      </div>

      {suggestion && (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label="Review AI edit">
          <div className="demo-modal-card">
            <h2>Review the AI edit</h2>
            <p className="demo-muted">Accept to replace the passage, or reject to keep your wording.</p>
            <div className="demo-compare">
              <div>
                <strong>Before</strong>
                <p>{suggestion.original}</p>
              </div>
              <div>
                <strong>After</strong>
                <p>{suggestion.text}</p>
              </div>
            </div>
            <div className="demo-modal-actions">
              <button type="button" className="demo-button" onClick={() => setSuggestion(null)}>
                Reject
              </button>
              <button
                type="button"
                className="demo-button demo-button-primary"
                onClick={() => {
                  onPatchBlock(suggestion.id, { text: suggestion.text });
                  setSuggestion(null);
                  setNotice("Section updated. Undo restores the previous wording.");
                }}
              >
                Accept change
              </button>
            </div>
          </div>
        </div>
      )}

      {visualTarget && (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label="Replace visual">
          <div className="demo-modal-card">
            <h2>Replace this {visualTarget.type}</h2>
            <label className="demo-field">
              <span>What should it show?</span>
              <input value={visualQuery} onChange={(event) => setVisualQuery(event.target.value)} />
            </label>
            <p className="demo-muted">
              Photos and icons are searched from openly licensed sources. Charts and diagrams only use the data already in this
              block — nothing is invented.
            </p>
            <div className="demo-modal-actions">
              <button type="button" className="demo-button" onClick={() => setVisualTarget(null)}>
                Cancel
              </button>
              <button type="button" className="demo-button demo-button-primary" onClick={() => void runVisual()} disabled={busyBlock === visualTarget.id}>
                {busyBlock === visualTarget.id ? "Finding a visual…" : "Replace"}
              </button>
            </div>
          </div>
        </div>
      )}

      {chartEditor?.chart && (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label="Edit chart data">
          <div className="demo-modal-card">
            <h2>Chart data</h2>
            <p className="demo-muted">These are the figures already in your brief. Edit them and the chart updates.</p>
            {chartEditor.chart.series.map((point, index) => (
              <div className="demo-package-row" key={index}>
                <input aria-label={`Point ${index + 1} label`} value={point.label} onChange={(event) => patchChartPoint(index, { label: event.target.value })} />
                <input
                  aria-label={`Point ${index + 1} value`}
                  inputMode="decimal"
                  value={point.value}
                  onChange={(event) => patchChartPoint(index, { value: Number(event.target.value.replace(/[^0-9.-]/g, "")) || 0 })}
                />
              </div>
            ))}
            <div className="demo-modal-actions">
              <button type="button" className="demo-button demo-button-primary" onClick={() => setChartEditor(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
