import { useRef, useState } from "react";
import { ImageUp, Pencil, Trash2, ArrowUp, ArrowDown, Copy } from "lucide-react";
import { ElementToolbar } from "./ElementToolbar";
import { InlineText } from "./InlineText";
import { RichText } from "./RichText";
import { imageToDataUrl } from "../../lib/images";
import type { Block } from "../../types";

export interface BlockRendererProps {
  block: Block;
  documentType?: "proposal" | "contract" | "form" | "invoice" | "other";
  selected?: boolean;
  editable?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onPatch?: (patch: Partial<Block>) => void;
  brandPrimary?: string;
}

export function BlockRenderer({
  block,
  documentType = "other",
  selected,
  editable,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onPatch,
  brandPrimary = "#c9a961",
}: BlockRendererProps) {
  const canType = Boolean(editable && onPatch);

  /** Text that is typed in place, with the formatted view when it is not editable. */
  const typeable = (
    value: string | undefined,
    placeholder: string,
    options: { multiline?: boolean; write?: (next: string) => void } = {},
  ) => {
    const write = options.write ?? ((next: string) => onPatch?.({ text: next }));
    if (canType) {
      return (
        <InlineText
          value={value ?? ""}
          onChange={write}
          placeholder={placeholder}
          multiline={options.multiline ?? true}
        />
      );
    }
    return <RichText value={value || placeholder} />;
  };

  const typeableItem = (index: number, label: string, field: "items" | "columns") => {
    if (!canType || !onPatch) return <RichText value={label} />;
    if (field === "items") {
      return (
        <InlineText
          value={label}
          onChange={(next) =>
            onPatch({
              items: (block.items ?? []).map((row, i) => (i === index ? { ...row, label: next } : row)),
            })
          }
          placeholder="Item"
          multiline={false}
        />
      );
    }
    return <RichText value={label} />;
  };

  const content = (() => {
    switch (block.type) {
      case "heading": {
        const Tag = block.level === "h1" ? "h1" : block.level === "h3" ? "h3" : "h2";
        return (
          <Tag style={{ textAlign: block.align, color: block.color }}>
            {typeable(block.text, "Section heading", { multiline: false })}
          </Tag>
        );
      }
      case "paragraph":
        return <p style={{ textAlign: block.align, color: block.color }}>{typeable(block.text, "Write here…")}</p>;
      case "quote":
        return (
          <blockquote
            style={{
              borderLeft: `3px solid ${brandPrimary}`,
              margin: "8px 0",
              paddingLeft: 12,
              fontStyle: "italic",
              color: "#3a3a3a",
            }}
          >
            {typeable(block.text, "A quote from the client or the brief.")}
          </blockquote>
        );
      case "list":
        return (
          <ul style={{ paddingLeft: 20, listStyle: "disc", color: "#3a3a3a" }}>
            {(block.items?.length ? block.items : [{ label: "First item" }, { label: "Second item" }]).map(
              (item, index) => (
                <li key={index} style={{ marginBottom: 4 }}>
                  {block.items?.length ? typeableItem(index, item.label, "items") : <RichText value={item.label} />}
                </li>
              ),
            )}
          </ul>
        );
      case "image":
        return (
          <ImageBlock
            block={block}
            canEdit={canType}
            onChange={(patch) => onPatch?.(patch)}
          />
        );
      case "graph":
        return (
          <div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
              {[40, 65, 52, 80, 70].map((height, index) => (
                <span
                  key={index}
                  style={{ flex: 1, height: `${height}%`, background: brandPrimary, borderRadius: "2px 2px 0 0", opacity: 0.85 }}
                />
              ))}
            </div>
            <p className="caption" style={{ color: "#8a857a", marginTop: 6 }}>
              {typeable(block.text, "Chart caption", { multiline: false })}
            </p>
          </div>
        );
      case "pricing_table":
        return (
          <table className="doc-table" style={{ margin: "8px 0" }}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {(block.items?.length ? block.items : [{ label: "Design", price: 700 }, { label: "Build", price: 500 }]).map(
                (item, index) => (
                  <tr key={index}>
                    <td>
                      {block.items?.length ? typeableItem(index, item.label, "items") : <RichText value={item.label} />}
                    </td>
                    <td>{item.quantity ?? 1}</td>
                    <td style={{ textAlign: "right" }}>${item.price ?? 0}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        );
      case "packages":
        return (
          <div className="canvas-packages">
            {(block.items?.length
              ? block.items
              : [
                  { label: "Basic", price: 500 },
                  { label: "Standard", price: 1200 },
                  { label: "Premium", price: 2500 },
                ]
            ).map((item, index) => (
              <div className="canvas-package" key={index} style={index === 1 ? { borderColor: brandPrimary } : undefined}>
                <b>{block.items?.length ? typeableItem(index, item.label, "items") : <RichText value={item.label} />}</b>
                <span className="amount">${item.price ?? 0}</span>
              </div>
            ))}
          </div>
        );
      case "timeline":
        return (
          <ol style={{ paddingLeft: 0 }}>
            {(block.items?.length ? block.items : [{ label: "Kickoff" }, { label: "Delivery" }]).map((item, index) => (
              <li key={index} style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 12, color: "#3a3a3a" }}>
                <span style={{ color: brandPrimary }}>●</span>
                <span>
                  {block.items?.length ? typeableItem(index, item.label, "items") : <RichText value={item.label} />}{" "}
                  {item.value ? <span style={{ color: "#8a857a" }}>· {item.value}</span> : null}
                </span>
              </li>
            ))}
          </ol>
        );
      case "faq":
        return (
          <details className="faq-item" style={{ background: "#faf8f4", borderColor: "#e5e1d8" }}>
            <summary style={{ color: "#1a1a1a", padding: "10px 0" }}>
              <RichText value={block.faqs?.[0]?.question || block.text || "What is included?"} />
            </summary>
            <p style={{ color: "#4a4a4a", fontSize: 12 }}>
              <RichText value={block.faqs?.[0]?.answer || "The answer the client reads on the page."} />
            </p>
          </details>
        );
      case "question":
        return (
          <div style={{ border: "1px solid #e5e1d8", borderRadius: 6, padding: 12, background: "#faf8f4" }}>
            <b style={{ fontSize: 12, color: "#1a1a1a" }}>
              <RichText value={block.question?.text || "An embedded question"} />
            </b>
            {block.question?.options?.length ? (
              block.question.options.map((option) => (
                <div key={option.code} style={{ fontSize: 12, color: "#4a4a4a", marginTop: 4 }}>
                  ○ {option.label}
                </div>
              ))
            ) : (
              <div style={{ borderBottom: "1px solid #d8d2c4", height: 20, marginTop: 8 }} />
            )}
          </div>
        );
      case "file_upload":
        return (
          <div style={{ border: "1px dashed #d8d2c4", borderRadius: 6, padding: 16, fontSize: 12, color: "#8a857a" }}>
            Upload a file — {typeable(block.text, "images or PDFs", { multiline: false })}
          </div>
        );
      case "signature":
        if (documentType === "proposal") {
          return (
            <div style={{ border: "1px dashed #d8d2c4", borderRadius: 6, padding: 12, fontSize: 12, color: "#8a857a" }}>
              Signature blocks are not available in proposals.
            </div>
          );
        }
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
            {["Freelancer", "Client"].map((party) => (
              <div key={party}>
                <div style={{ borderBottom: "1px solid #1a1a1a", height: 28 }} />
                <span style={{ fontSize: 11, color: "#8a857a" }}>{party}</span>
              </div>
            ))}
          </div>
        );
      case "next_step":
        return (
          <div style={{ border: "1px solid #e5e1d8", borderRadius: 6, padding: 12, background: "#faf8f4" }}>
            <b style={{ fontSize: 12, color: "#1a1a1a" }}>{typeable(block.text, "Next step", { multiline: false })}</b>
            <p style={{ fontSize: 12, color: "#4a4a4a", marginTop: 4 }}>
              Reply to move forward. The contact details come from your profile.
            </p>
          </div>
        );
      case "divider":
        return <hr style={{ border: 0, borderTop: `1px solid ${block.color || "#e5e1d8"}`, margin: "12px 0" }} />;
      case "spacer":
        return <div style={{ height: Number(block.meta?.height ?? 24) }} />;
      case "two_column":
      case "three_column":
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: block.type === "two_column" ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: Number(block.meta?.gap ?? 16),
            }}
          >
            {(block.columns ?? [["Column one"], ["Column two"]]).map((column, index) => (
              <div key={index} style={{ fontSize: 12, color: "#3a3a3a" }}>
                {column.map((line, lineIndex) => (
                  <p key={lineIndex} style={{ marginBottom: 4 }}>
                    {canType && onPatch ? (
                      <InlineText
                        value={line}
                        onChange={(next) =>
                          onPatch({
                            columns: (block.columns ?? []).map((current, columnIndex) =>
                              columnIndex === index
                                ? current.map((entry, entryIndex) => (entryIndex === lineIndex ? next : entry))
                                : current,
                            ),
                          })
                        }
                        placeholder="Write here…"
                      />
                    ) : (
                      <RichText value={line} />
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        );
      case "card":
        return (
          <div style={{ border: "1px solid #e5e1d8", borderRadius: 6, padding: 12 }}>
            <b style={{ fontSize: 12, color: "#111" }}>{typeable(block.text, "Card title", { multiline: false })}</b>
          </div>
        );
      case "button":
        return (
          <span
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 4,
              background: brandPrimary,
              color: "#101010",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {typeable(block.text, "Continue", { multiline: false })}
          </span>
        );
      case "shape":
        return (
          <div
            style={{
              height: 24,
              width: 24,
              borderRadius: block.meta?.shape === "square" ? 2 : 999,
              background: brandPrimary,
            }}
          />
        );
      default:
        return <p>{typeable(block.text, "Write here…")}</p>;
    }
  })();

  if (!editable) return <div className="block" data-type={block.type}>{content}</div>;

  return (
    <div className={`block-wrap${selected ? " selected" : ""}`} data-type={block.type}>
      <div
        className={`block${selected ? " selected" : ""}`}
        onClick={onSelect}
        role="group"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.target === event.currentTarget) onSelect?.();
        }}
        data-type={block.type}
      >
        <div className="block-tools">
          <button type="button" aria-label="Move up" onClick={(event) => { event.stopPropagation(); onMoveUp?.(); }}>
            <ArrowUp size={11} />
          </button>
          <button type="button" aria-label="Move down" onClick={(event) => { event.stopPropagation(); onMoveDown?.(); }}>
            <ArrowDown size={11} />
          </button>
          <button type="button" aria-label="Duplicate" onClick={(event) => { event.stopPropagation(); onDuplicate?.(); }}>
            <Copy size={11} />
          </button>
          <button type="button" aria-label="Delete" onClick={(event) => { event.stopPropagation(); onDelete?.(); }}>
            <Trash2 size={11} />
          </button>
          <button type="button" aria-label="Select" onClick={(event) => { event.stopPropagation(); onSelect?.(); }}>
            <Pencil size={11} />
          </button>
        </div>
        {content}
      </div>
      {onPatch && selected && (
        <ElementToolbar block={block} onChange={onPatch} onRemove={() => onDelete?.()} />
      )}
    </div>
  );
}

function ImageBlock({
  block,
  canEdit,
  onChange,
}: {
  block: Block;
  canEdit: boolean;
  onChange: (patch: Partial<Block>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (file?: File | null) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const url = await imageToDataUrl(file);
      onChange({ url, alt: block.alt || file.name.replace(/\.[a-z0-9]+$/i, "") });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "That image could not be used.");
    } finally {
      setBusy(false);
    }
  };

  if (block.url) {
    return (
      <figure style={{ margin: "12px 0" }}>
        <img
          src={block.url}
          alt={block.alt || "Document image"}
          style={{ width: "100%", borderRadius: 6, display: "block" }}
          loading="lazy"
        />
        {block.alt ? (
          <figcaption style={{ fontSize: 11, color: "#8a857a", marginTop: 6 }}>{block.alt}</figcaption>
        ) : null}
      </figure>
    );
  }

  if (!canEdit) {
    return (
      <div style={{ border: "1px dashed #d8d2c4", borderRadius: 6, padding: 24, textAlign: "center", color: "#8a857a", fontSize: 12 }}>
        Image
      </div>
    );
  }

  return (
    <div className="doc-image-upload">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          void pick(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <button type="button" className="doc-image-drop" onClick={() => inputRef.current?.click()} disabled={busy}>
        <ImageUp size={18} />
        <b>{busy ? "Adding the image…" : "Upload an image"}</b>
        <span>PNG, JPEG, WebP or GIF. Resized in your browser, never sent anywhere.</span>
      </button>
      {error ? <span className="caption" style={{ color: "var(--red)" }}>{error}</span> : null}
    </div>
  );
}
