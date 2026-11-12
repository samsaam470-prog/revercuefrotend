import { Pencil, Trash2, ArrowUp, ArrowDown, Copy } from "lucide-react";
import type { Block } from "../../types";

export interface BlockRendererProps {
  block: Block;
  selected?: boolean;
  editable?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  brandPrimary?: string;
}

export function BlockRenderer({
  block,
  selected,
  editable,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  brandPrimary = "#c9a961",
}: BlockRendererProps) {
  const content = (() => {
    switch (block.type) {
      case "heading": {
        const Tag = block.level === "h1" ? "h1" : block.level === "h3" ? "h3" : "h2";
        return (
          <Tag style={{ textAlign: block.align, color: block.color }}>
            {block.text || "Untitled heading"}
          </Tag>
        );
      }
      case "paragraph":
        return <p style={{ textAlign: block.align, color: block.color }}>{block.text || "Write the paragraph in the properties panel."}</p>;
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
            {block.text || "A quote from the client or the brief."}
          </blockquote>
        );
      case "list":
        return (
          <ul style={{ paddingLeft: 20, listStyle: "disc", color: "#3a3a3a" }}>
            {(block.items?.length ? block.items : [{ label: "First item" }, { label: "Second item" }]).map(
              (item, index) => (
                <li key={index} style={{ marginBottom: 4 }}>
                  {item.label}
                </li>
              ),
            )}
          </ul>
        );
      case "image":
        return (
          <div
            style={{
              border: "1px dashed #d8d2c4",
              borderRadius: 6,
              padding: 24,
              textAlign: "center",
              color: "#8a857a",
              fontSize: 12,
            }}
          >
            {block.url ? block.alt || "Image" : "Image block — add a URL or upload in the properties"}
          </div>
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
              {block.text || "Sample chart — replace the values in the properties."}
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
                    <td>{item.label}</td>
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
                <b>{item.label}</b>
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
                  {item.label} {item.value ? <span style={{ color: "#8a857a" }}>· {item.value}</span> : null}
                </span>
              </li>
            ))}
          </ol>
        );
      case "faq":
        return (
          <details className="faq-item" style={{ background: "#faf8f4", borderColor: "#e5e1d8" }}>
            <summary style={{ color: "#1a1a1a", padding: "10px 0" }}>
              {block.faqs?.[0]?.question || block.text || "What is included?"}
            </summary>
            <p style={{ color: "#4a4a4a", fontSize: 12 }}>
              {block.faqs?.[0]?.answer || "The answer the client reads on the page."}
            </p>
          </details>
        );
      case "question":
        return (
          <div style={{ border: "1px solid #e5e1d8", borderRadius: 6, padding: 12, background: "#faf8f4" }}>
            <b style={{ fontSize: 12, color: "#1a1a1a" }}>
              {block.question?.text || "An embedded question"}
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
            Upload a file — {block.text || "images or PDFs"}
          </div>
        );
      case "signature":
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
            <b style={{ fontSize: 12, color: "#1a1a1a" }}>{block.text || "Next step"}</b>
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
                {column.map((line) => (
                  <p key={line} style={{ marginBottom: 4 }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        );
      case "card":
        return (
          <div style={{ border: "1px solid #e5e1d8", borderRadius: 6, padding: 12 }}>
            <b style={{ fontSize: 12, color: "#111" }}>{block.text || "Card title"}</b>
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
            {block.text || "Continue"}
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
        return <p>{block.text}</p>;
    }
  })();

  if (!editable) return <div className="block" data-type={block.type}>{content}</div>;

  return (
    <div
      className={`block${selected ? " selected" : ""}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") onSelect?.();
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
  );
}
