import { useState } from "react";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { AskHelperTextarea } from "./AskHelperTextarea";
import { imageToDataUrl } from "../../lib/images";
import { Select } from "../ui/Select";
import { Checkbox } from "../ui/Checkbox";
import type { Block, DocContent } from "../../types";

export interface PropertyPanelProps {
  block: Block | null;
  onChange: (patch: Partial<Block>) => void;
  doc: DocContent;
  onDocChange: (patch: Partial<DocContent>) => void;
  showAfterApproval?: boolean;
  afterApproval?: string;
  onAfterApprovalChange?: (value: string) => void;
}

export function PropertyPanel({
  block,
  onChange,
  doc,
  onDocChange,
  showAfterApproval,
  afterApproval,
  onAfterApprovalChange,
}: PropertyPanelProps) {
  const [uploadError, setUploadError] = useState("");

  const setItems = (items: Block["items"]) => onChange({ items });
  const setMeta = (patch: Record<string, string | number | boolean>) =>
    onChange({ meta: { ...block?.meta, ...patch } });
  const chart = block?.chart ?? null;
  const updateChart = (next: { labels?: string[]; values?: number[]; kind?: "bar" | "line"; unit?: string }) => {
    const labels = next.labels ?? chart?.labels ?? [];
    const values = next.values ?? chart?.values ?? [];
    onChange({
      chart: {
        kind: next.kind ?? chart?.kind ?? "bar",
        labels,
        values,
        unit: next.unit !== undefined ? next.unit : chart?.unit,
        title: chart?.title,
      },
    });
  };

  if (!block) {
    return (
      <div className="props-empty">
        Select a block to edit its properties.
        <div className="props-title" style={{ marginTop: 24 }}>
          Document
        </div>
        <div style={{ textAlign: "left" }} className="stack-3">
          <div className="input-group">
            <label htmlFor="doc-primary">Brand primary</label>
            <input
              id="doc-primary"
              type="color"
              value={doc.brand_primary || "#c9a961"}
              onChange={(event) => onDocChange({ brand_primary: event.target.value })}
              style={{ height: 38, padding: 4 }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="doc-secondary">Brand secondary</label>
            <input
              id="doc-secondary"
              type="color"
              value={doc.brand_secondary || "#1a1a1a"}
              onChange={(event) => onDocChange({ brand_secondary: event.target.value })}
              style={{ height: 38, padding: 4 }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="doc-width">Page max width: {doc.max_width || 720}px</label>
            <input
              id="doc-width"
              type="range"
              min={560}
              max={880}
              step={20}
              value={doc.max_width || 720}
              onChange={(event) => onDocChange({ max_width: Number(event.target.value) })}
            />
          </div>
          {showAfterApproval && onAfterApprovalChange && (
            <Select
              id="after-approval"
              label="After approval"
              value={afterApproval || "pdf_only"}
              options={[
                { value: "form", label: "Show the requirement form" },
                { value: "invoice", label: "Show the invoice" },
                { value: "pdf_only", label: "Download PDF only" },
              ]}
              onChange={onAfterApprovalChange}
              helper="The form and invoice options are Growth and Scale."
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="stack-3">
      <div className="props-title">{block.type.replace(/_/g, " ")}</div>

      {(block.type === "heading" || block.type === "paragraph" || block.type === "quote" || block.type === "button" || block.type === "card" || block.type === "next_step") && (
        <AskHelperTextarea
          id="block-text"
          label="Text"
          value={block.text || ""}
          onChange={(value) => onChange({ text: value })}
          rows={block.type === "paragraph" ? 5 : 2}
        />
      )}

      {block.type === "heading" && (
        <Select
          id="block-level"
          label="Level"
          value={block.level || "h2"}
          options={[
            { value: "h1", label: "H1" },
            { value: "h2", label: "H2" },
            { value: "h3", label: "H3" },
          ]}
          onChange={(value) => onChange({ level: value as Block["level"] })}
        />
      )}

      {(block.type === "heading" || block.type === "paragraph") && (
        <>
          <Select
            id="block-align"
            label="Alignment"
            value={block.align || "left"}
            options={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
            onChange={(value) => onChange({ align: value as Block["align"] })}
          />
          <div className="input-group">
            <label htmlFor="block-color">Colour</label>
            <input
              id="block-color"
              type="color"
              value={block.color || "#1a1a1a"}
              onChange={(event) => onChange({ color: event.target.value })}
              style={{ height: 38, padding: 4 }}
            />
          </div>
        </>
      )}

      {block.type === "image" && (
        <>
          {block.url ? (
            <img
              src={block.url}
              alt={block.alt || "Image"}
              style={{ width: "100%", borderRadius: 6, border: "1px solid var(--border)" }}
            />
          ) : null}
          <label className="btn btn-secondary btn-sm upload-device">
            {block.url ? "Replace image" : "Upload from device"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file) return;
                setUploadError("");
                void imageToDataUrl(file)
                  .then((url) => onChange({ url, alt: block.alt || file.name.replace(/\.[a-z0-9]+$/i, "") }))
                  .catch((cause) =>
                    setUploadError(cause instanceof Error ? cause.message : "That image could not be used."),
                  );
              }}
            />
          </label>
          {uploadError ? <span className="caption" style={{ color: "var(--red)" }}>{uploadError}</span> : null}
          <Input
            id="block-url"
            label="Image URL"
            value={block.url || ""}
            onChange={(value) => onChange({ url: value })}
            placeholder="https://"
          />
          <Input id="block-alt" label="Alt text" value={block.alt || ""} onChange={(value) => onChange({ alt: value })} helper="Describe what the image shows." />
          <Input id="block-caption" label="Caption" value={block.caption || ""} onChange={(value) => onChange({ caption: value })} />
          <div className="input-group">
            <label htmlFor="image-width">Width: {Number(block.meta?.width ?? 100)}%</label>
            <input
              id="image-width"
              type="range"
              min={25}
              max={100}
              step={5}
              value={Number(block.meta?.width ?? 100)}
              onChange={(event) => setMeta({ width: Number(event.target.value) })}
            />
          </div>
        </>
      )}

      {block.type === "icon" && (
        <>
          <Input
            id="icon-id"
            label="Icon id"
            value={block.icon || ""}
            onChange={(value) => {
              const icon = value.trim();
              onChange({ icon });
              setMeta({ icon });
            }}
            helper="An Iconify id, for example mdi:handshake."
          />
          <div className="input-group">
            <label htmlFor="icon-color">Colour</label>
            <input
              id="icon-color"
              type="color"
              value={block.color || "#c9a961"}
              onChange={(event) => onChange({ color: event.target.value })}
              style={{ height: 38, padding: 4 }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="icon-size">Size: {Number(block.meta?.size ?? 44)}px</label>
            <input
              id="icon-size"
              type="range"
              min={16}
              max={96}
              step={4}
              value={Number(block.meta?.size ?? 44)}
              onChange={(event) => setMeta({ size: Number(event.target.value) })}
            />
          </div>
          <Input id="icon-alt" label="Alt text" value={block.alt || ""} onChange={(value) => onChange({ alt: value })} />
          <Input id="icon-caption" label="Caption" value={block.caption || ""} onChange={(value) => onChange({ caption: value })} />
        </>
      )}

      {block.type === "graph" && (
        <>
          <Select
            id="chart-kind"
            label="Chart type"
            value={chart?.kind || "bar"}
            options={[
              { value: "bar", label: "Bar" },
              { value: "line", label: "Line" },
            ]}
            onChange={(value) => updateChart({ kind: value as "bar" | "line" })}
          />
          <Input id="chart-title" label="Chart title" value={block.text || ""} onChange={(value) => onChange({ text: value })} />
          <Input id="chart-unit" label="Unit" value={chart?.unit || ""} onChange={(value) => updateChart({ unit: value })} helper="Shown next to each value." />
          {(chart?.labels ?? []).map((label, index) => (
            <div className="two-up" key={index} style={{ gap: 8 }}>
              <Input
                id={`chart-label-${index}`}
                label={`Point ${index + 1}`}
                value={label}
                onChange={(value) => updateChart({ labels: (chart?.labels ?? []).map((entry, i) => (i === index ? value : entry)) })}
              />
              <Input
                id={`chart-value-${index}`}
                label="Value"
                type="number"
                value={String(chart?.values[index] ?? 0)}
                onChange={(value) => updateChart({ values: (chart?.values ?? []).map((entry, i) => (i === index ? Number(value) : entry)) })}
              />
            </div>
          ))}
          <div className="inline" style={{ gap: 8 }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() =>
                updateChart({
                  labels: [...(chart?.labels ?? []), `Point ${(chart?.labels?.length ?? 0) + 1}`],
                  values: [...(chart?.values ?? []), 0],
                })
              }
            >
              + Add point
            </button>
            {(chart?.labels?.length ?? 0) > 2 && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  updateChart({
                    labels: (chart?.labels ?? []).slice(0, -1),
                    values: (chart?.values ?? []).slice(0, -1),
                  })
                }
              >
                Remove last
              </button>
            )}
          </div>
          <p className="caption">A chart is drawn from these numbers only; at least two points are needed.</p>
          <Input id="chart-caption" label="Caption" value={block.caption || ""} onChange={(value) => onChange({ caption: value })} />
        </>
      )}

      {block.type === "diagram" && (
        <>
          <Textarea
            id="diagram-steps"
            label="Steps"
            value={(block.diagram?.steps ?? []).join("\n")}
            onChange={(value) =>
              onChange({ diagram: { steps: value.split("\n").map((step) => step.trim()).filter(Boolean), direction: block.diagram?.direction, source: block.diagram?.source } })
            }
            helper="One step per line, in order. At least two."
            rows={6}
          />
          <Select
            id="diagram-direction"
            label="Direction"
            value={block.diagram?.direction || "LR"}
            options={[
              { value: "LR", label: "Left to right" },
              { value: "TB", label: "Top to bottom" },
            ]}
            onChange={(value) => onChange({ diagram: { steps: block.diagram?.steps ?? [], direction: value as "LR" | "TB", source: block.diagram?.source } })}
          />
          <Input id="diagram-caption" label="Caption" value={block.text || ""} onChange={(value) => onChange({ text: value })} />
        </>
      )}

      {block.type === "svg" && (
        <>
          {block.svg ? (
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(block.svg)}`}
              alt={block.alt || "Illustration"}
              style={{ width: "100%", borderRadius: 6, border: "1px solid var(--border)" }}
            />
          ) : null}
          <Input id="svg-url" label="SVG URL" value={block.url || ""} onChange={(value) => onChange({ url: value })} placeholder="https://" />
          <Textarea
            id="svg-source"
            label="SVG source"
            value={block.svg || ""}
            onChange={(value) => onChange({ svg: value })}
            helper="Paste the <svg> element. Scripts and event handlers are removed."
            rows={5}
          />
          <Input id="svg-alt" label="Alt text" value={block.alt || ""} onChange={(value) => onChange({ alt: value })} />
          <Input id="svg-caption" label="Caption" value={block.caption || ""} onChange={(value) => onChange({ caption: value })} />
        </>
      )}

      {block.type === "faq" && (
        <>
          <Input
            id="faq-q"
            label="Question"
            value={block.faqs?.[0]?.question || ""}
            onChange={(value) => onChange({ faqs: [{ question: value, answer: block.faqs?.[0]?.answer || "" }] })}
          />
          <AskHelperTextarea
            id="faq-a"
            label="Answer"
            value={block.faqs?.[0]?.answer || ""}
            onChange={(value) => onChange({ faqs: [{ question: block.faqs?.[0]?.question || "", answer: value }] })}
            rows={4}
          />
        </>
      )}

      {block.type === "question" && (
        <>
          <Input
            id="q-text"
            label="Question"
            value={block.question?.text || ""}
            onChange={(value) =>
              onChange({
                question: {
                  id: block.question?.id || "q1",
                  type: block.question?.type || "short_text",
                  options: block.question?.options,
                  ...block.question,
                  text: value,
                },
              })
            }
          />
          <Select
            id="q-type"
            label="Type"
            value={block.question?.type || "short_text"}
            options={[
              { value: "short_text", label: "Short text" },
              { value: "long_text", label: "Long text" },
              { value: "single_choice", label: "Single choice" },
              { value: "multiple_choice", label: "Multiple choice" },
              { value: "file_upload", label: "File upload" },
            ]}
            onChange={(value) =>
              onChange({
                question: {
                  id: block.question?.id || "q1",
                  text: block.question?.text || "Untitled question",
                  ...block.question,
                  type: value as NonNullable<Block["question"]>["type"],
                },
              })
            }
          />
          <Checkbox
            id="q-required"
            label="Required"
            checked={Boolean(block.question?.required)}
            onChange={(checked) =>
              onChange({
                question: {
                  id: block.question?.id || "q1",
                  text: block.question?.text || "Untitled question",
                  type: block.question?.type || "short_text",
                  ...block.question,
                  required: checked,
                },
              })
            }
          />
          <Checkbox
            id="q-ask"
            label="Allow the client to ask a question"
            checked={Boolean(block.question?.allow_question)}
            onChange={(checked) =>
              onChange({
                question: {
                  id: block.question?.id || "q1",
                  text: block.question?.text || "Untitled question",
                  type: block.question?.type || "short_text",
                  ...block.question,
                  allow_question: checked,
                },
              })
            }
          />
        </>
      )}

      {block.type === "pricing_table" && (
        <>
          {(block.items ?? []).map((item, index) => (
            <div className="two-up" key={index} style={{ gap: 8 }}>
              <Input
                id={`item-label-${index}`}
                label={`Item ${index + 1}`}
                value={item.label}
                onChange={(value) =>
                  onChange({
                    items: (block.items ?? []).map((row, i) => (i === index ? { ...row, label: value } : row)),
                  })
                }
              />
              <Input
                id={`item-price-${index}`}
                label="Price"
                type="number"
                value={String(item.price ?? 0)}
                onChange={(value) =>
                  onChange({
                    items: (block.items ?? []).map((row, i) =>
                      i === index ? { ...row, price: Number(value) } : row,
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() =>
              onChange({ items: [...(block.items ?? []), { label: "New item", price: 0, quantity: 1 }] })
            }
          >
            + Add line item
          </button>
        </>
      )}

      {block.type === "packages" && (
        <>
          {(block.items ?? []).map((item, index) => (
            <div className="two-up" key={index} style={{ gap: 8 }}>
              <Input
                id={`package-label-${index}`}
                label={`Package ${index + 1}`}
                value={item.label}
                onChange={(value) =>
                  setItems((block.items ?? []).map((row, i) => (i === index ? { ...row, label: value } : row)))
                }
              />
              <Input
                id={`package-price-${index}`}
                label="Price"
                type="number"
                value={String(item.price ?? 0)}
                onChange={(value) =>
                  setItems((block.items ?? []).map((row, i) => (i === index ? { ...row, price: Number(value) } : row)))
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setItems([...(block.items ?? []), { label: "New package", price: 0 }])}
          >
            + Add package
          </button>
        </>
      )}

      {block.type === "list" && (
        <>
          {(block.items ?? []).map((item, index) => (
            <Input
              key={index}
              id={`list-item-${index}`}
              label={`Item ${index + 1}`}
              value={item.label}
              onChange={(value) =>
                setItems((block.items ?? []).map((row, i) => (i === index ? { ...row, label: value } : row)))
              }
            />
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setItems([...(block.items ?? []), { label: "New item" }])}
          >
            + Add item
          </button>
        </>
      )}

      {block.type === "timeline" && (
        <>
          {(block.items ?? []).map((item, index) => (
            <div className="two-up" key={index} style={{ gap: 8 }}>
              <Input
                id={`timeline-label-${index}`}
                label={`Step ${index + 1}`}
                value={item.label}
                onChange={(value) =>
                  setItems((block.items ?? []).map((row, i) => (i === index ? { ...row, label: value } : row)))
                }
              />
              <Input
                id={`timeline-value-${index}`}
                label="When"
                value={item.value || ""}
                onChange={(value) =>
                  setItems((block.items ?? []).map((row, i) => (i === index ? { ...row, value } : row)))
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setItems([...(block.items ?? []), { label: "New milestone" }])}
          >
            + Add milestone
          </button>
        </>
      )}

      {(block.type === "two_column" || block.type === "three_column") && (
        <Textarea
          id="columns-text"
          label="Column one"
          value={(block.columns?.[0] ?? []).join("\n")}
          onChange={(value) =>
            onChange({ columns: [value.split("\n"), block.columns?.[1] ?? ["Column two"]] })
          }
          helper="One line per paragraph."
          rows={4}
        />
      )}

      <p className="caption">
        Changes are held locally and sent by the 60-second auto-save, the session-end beacon, or Save.
      </p>
    </div>
  );
}
