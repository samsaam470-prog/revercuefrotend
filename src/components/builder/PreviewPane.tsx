import { X } from "lucide-react";
import { BlockRenderer } from "./BlockRenderer";
import type { Block, DocContent } from "../../types";

export interface PreviewPaneProps {
  open: boolean;
  onClose: () => void;
  title: string;
  clientName: string;
  reference: string;
  blocks: Block[];
  doc: DocContent;
  brandName?: string;
  footnote?: string;
}

export function PreviewPane({
  open,
  onClose,
  title,
  clientName,
  reference,
  blocks,
  doc,
  brandName = "Acme Studio",
  footnote = "This is an offer, not a contract.",
}: PreviewPaneProps) {
  if (!open) return null;

  return (
    <aside className="split-preview" aria-label="Client preview">
      <div className="between" style={{ marginBottom: 12 }}>
        <span className="eyebrow">Preview · read-only</span>
        <button type="button" className="btn-icon" onClick={onClose} aria-label="Close preview">
          <X size={16} />
        </button>
      </div>
      <div
        className="doc-page"
        style={{
          padding: 24,
          background: doc.page_background || "#ffffff",
          borderTop: `3px solid ${doc.brand_primary || "#c9a961"}`,
        }}
      >
        <div className="doc-brand">
          <span className="mark" style={{ background: doc.brand_secondary || "#1a1a1a" }}>
            {brandName.charAt(0)}
          </span>
          {brandName}
        </div>
        <h1 style={{ fontSize: 24 }}>{title || "Untitled"}</h1>
        <div className="doc-meta">
          <span>Prepared for {clientName}</span>
          <span className="mono">ref {reference}</span>
        </div>
        <div style={{ maxWidth: doc.max_width ? doc.max_width - 60 : 660 }}>
          {blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} brandPrimary={doc.brand_primary} />
          ))}
        </div>
        <div className="doc-foot">{footnote}</div>
      </div>
    </aside>
  );
}
