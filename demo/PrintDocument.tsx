import { BlockRenderer } from "../src/components/builder/BlockRenderer";
import type { Block } from "../src/types";

/**
 * The printable document. It renders the same blocks through the same
 * BlockRenderer the editor and preview use, so the PDF matches what the
 * visitor edited rather than a second, simplified layout.
 */
export function PrintDocument({
  title,
  clientName,
  businessName,
  blocks,
}: {
  title: string;
  clientName: string;
  businessName: string;
  blocks: Block[];
}) {
  const parties = new Set<string>();
  const attributions = new Set<string>();
  for (const block of blocks) {
    if (block.type === "image" && block.caption) {
      attributions.add(`${block.caption}${block.source ? ` — ${block.source}` : ""}`);
    }
  }

  return (
    <div className="demo-print" aria-hidden="true">
      <article className="demo-print-page">
        <header className="demo-print-cover">
          <p className="demo-eyebrow">{businessName || "Proposal"}</p>
          <h1>{title || "Proposal"}</h1>
          <p>Prepared for {clientName}</p>
        </header>
        {blocks
          .filter((block) => block.type !== "heading" || block.level !== "h1")
          .map((block) => (
            <div className="demo-print-block" key={block.id}>
              <BlockRenderer block={block} documentType="proposal" />
            </div>
          ))}
        {attributions.size > 0 && (
          <footer className="demo-print-sources">
            <strong>Image credits</strong>
            {[...attributions].map((line) => (
              <p key={line}>{line}</p>
            ))}
          </footer>
        )}
        <footer className="demo-print-footer">
          Created with Revercue — the proposal generator from revercue.co.uk
        </footer>
      </article>
    </div>
  );
}
