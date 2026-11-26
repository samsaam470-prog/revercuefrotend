import { useState } from "react";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { AskHelperTextarea } from "./AskHelperTextarea";
import { imageToDataUrl } from "../../lib/images";
import { Select } from "../ui/Select";
import { Checkbox } from "../ui/Checkbox";
import type { Block, ChartSpec, DiagramSpec, DocContent } from "../../types";

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

  // Structured visual edits keep the existing data and replace one field at a
  // time, so a chart or diagram is never rebuilt from a picture.
  const chartPatch = (patch: Partial<ChartSpec>) =>
    onChange({ chart: { ...block.chart, series: block.chart?.series ?? [], ...patch } });
  const diagramPatch = (patch: Partial<DiagramSpec>) =>
    onChange({ diagram: { ...block.diagram, steps: block.diagram?.steps ?? [], ...patch } });

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
          <Input
            id="block-source"
            label="Source"
            value={block.source || String(block.meta?.source ?? "")}
            onChange={(value) => onChange({ source: value })}
            helper={block.attribution ? `Licence: ${block.attribution}` : undefined}
          />
          <div className="input-group">
            <label htmlFor="block-width">Width: {Number(block.meta?.width ?? 100)}%</label>
            <input
              id="block-width"
              type="range"
              min={25}
              max={100}
              step={5}
              value={Number(block.meta?.width ?? 100)}
              onChange={(event) => onChange({ meta: { ...block.meta, width: Number(event.target.value) } })}
            />
          </div>
        </>
      )}

      {(block.type === "chart" || block.type === "graph") && (
        <>
          <Select
            id="chart-kind"
            label="Chart type"
            value={block.chart?.kind || "bar"}
            options={[
              { value: "bar", label: "Bar" },
              { value: "line", label: "Line" },
            ]}
            onChange={(value) => chartPatch({ kind: value as "bar" | "line" })}
          />
          <Input
            id="chart-title"
            label="Chart title"
            value={block.chart?.title || ""}
            onChange={(value) => chartPatch({ title: value })}
          />
          <Input
            id="chart-unit"
            label="Unit"
            value={block.chart?.unit || ""}
            onChange={(value) => chartPatch({ unit: value })}
            helper="Shown after each value, for example days or %."
          />
          {(block.chart?.series ?? []).map((point, index) => (
            <div className="two-up" key={index} style={{ gap: 8 }}>
              <Input
                id={`chart-label-${index}`}
                label={`Label ${index + 1}`}
                value={point.label}
                onChange={(value) =>
                  chartPatch({
                    series: (block.chart?.series ?? []).map((row, i) => (i === index ? { ...row, label: value } : row)),
                  })
                }
              />
              <Input
                id={`chart-value-${index}`}
                label="Value"
                type="number"
                value={String(point.value)}
                onChange={(value) =>
                  chartPatch({
                    series: (block.chart?.series ?? []).map((row, i) =>
                      i === index ? { ...row, value: Number(value) } : row,
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => chartPatch({ series: [...(block.chart?.series ?? []), { label: "New figure", value: 0 }] })}
          >
            + Add figure
          </button>
          {(block.chart?.series ?? []).length > 0 && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => chartPatch({ series: (block.chart?.series ?? []).slice(0, -1) })}
            >
              Remove last figure
            </button>
          )}
          <p className="caption">A chart needs two or more real figures. It is stored as data, so the numbers stay editable.</p>
        </>
      )}

      {block.type === "diagram" && (
        <>
          <Input
            id="diagram-title"
            label="Diagram title"
            value={block.diagram?.title || ""}
            onChange={(value) => diagramPatch({ title: value })}
          />
          {(block.diagram?.steps ?? []).map((step, index) => (
            <div key={index} className="stack-2">
              <Input
                id={`step-title-${index}`}
                label={`Step ${index + 1}`}
                value={step.title}
                onChange={(value) =>
                  diagramPatch({
                    steps: (block.diagram?.steps ?? []).map((row, i) => (i === index ? { ...row, title: value } : row)),
                  })
                }
              />
              <Input
                id={`step-detail-${index}`}
                label="Detail"
                value={step.detail || ""}
                onChange={(value) =>
                  diagramPatch({
                    steps: (block.diagram?.steps ?? []).map((row, i) => (i === index ? { ...row, detail: value } : row)),
                  })
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => diagramPatch({ steps: [...(block.diagram?.steps ?? []), { title: "New step" }] })}
          >
            + Add step
          </button>
          <p className="caption">The flow is stored as steps, so it can be edited after saving.</p>
        </>
      )}

      {block.type === "icon" && (
        <>
          <Input
            id="icon-name"
            label="Icon name"
            value={block.icon?.name || ""}
            onChange={(value) => onChange({ icon: { name: value, ...block.icon } })}
            helper="An Iconify identifier, for example mdi:calendar-check."
          />
          <Input
            id="icon-label"
            label="Label"
            value={block.icon?.label || ""}
            onChange={(value) => onChange({ icon: { name: block.icon?.name || "custom", ...block.icon, label: value } })}
          />
          <div className="input-group">
            <label htmlFor="icon-size">Size: {Number(block.meta?.size ?? 24)}px</label>
            <input
              id="icon-size"
              type="range"
              min={16}
              max={72}
              step={4}
              value={Number(block.meta?.size ?? 24)}
              onChange={(event) => onChange({ meta: { ...block.meta, size: Number(event.target.value) } })}
            />
          </div>
          <Input
            id="icon-colour"
            label="Colour"
            value={block.icon?.color || ""}
            onChange={(value) => onChange({ icon: { name: block.icon?.name || "custom", ...block.icon, color: value } })}
            placeholder="#1a1a1a"
          />
        </>
      )}

      {block.type === "svg" && (
        <>
          <Textarea
            id="svg-markup"
            label="SVG markup"
            value={block.svg || ""}
            onChange={(value) => onChange({ svg: value })}
            rows={6}
            helper="Pasted markup is sanitised before it renders."
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
