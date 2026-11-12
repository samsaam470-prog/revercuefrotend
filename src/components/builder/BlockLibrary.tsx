import type { BlockType } from "../../types";

export interface BlockDefinition {
  type: BlockType;
  label: string;
  hint: string;
}

export const PROPOSAL_BLOCKS: BlockDefinition[] = [
  { type: "heading", label: "Heading", hint: "H1, H2 or H3" },
  { type: "paragraph", label: "Paragraph", hint: "Body text" },
  { type: "quote", label: "Quote", hint: "A styled quote" },
  { type: "list", label: "List", hint: "Bulleted or numbered" },
  { type: "image", label: "Image", hint: "Upload or URL" },
  { type: "graph", label: "Graph", hint: "Bar, line or pie" },
  { type: "pricing_table", label: "Pricing", hint: "Line items and total" },
  { type: "packages", label: "Packages", hint: "Basic / Standard / Premium" },
  { type: "timeline", label: "Timeline", hint: "Milestones with dates" },
  { type: "faq", label: "FAQ", hint: "A collapsible question" },
  { type: "question", label: "Question", hint: "Ask the client" },
  { type: "file_upload", label: "File upload", hint: "The client uploads" },
  { type: "button", label: "Button", hint: "A call to action" },
  { type: "divider", label: "Divider", hint: "A horizontal line" },
  { type: "two_column", label: "Two columns", hint: "Side by side" },
  { type: "next_step", label: "Next step", hint: "Contact and reply" },
];

export const CONTRACT_BLOCKS: BlockDefinition[] = PROPOSAL_BLOCKS.filter((block) =>
  ["heading", "paragraph", "list", "divider", "two_column", "timeline", "signature"].includes(
    block.type,
  ),
).concat([{ type: "signature", label: "Signature", hint: "Two signature lines" }]);

export function BlockLibrary({
  blocks,
  onInsert,
  sections,
  activeSection,
  onSelectSection,
  suggestions,
}: {
  blocks: BlockDefinition[];
  onInsert: (type: BlockType) => void;
  sections: string[];
  activeSection?: string;
  onSelectSection: (section: string) => void;
  suggestions?: string[];
}) {
  return (
    <>
      <div className="props-title">Sections</div>
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          className={`section-row${activeSection === section ? " active" : ""}`}
          onClick={() => onSelectSection(section)}
        >
          <span style={{ color: "var(--text-tertiary)" }}>⋮⋮</span> {section}
        </button>
      ))}

      <div className="props-title" style={{ marginTop: 20 }}>
        Blocks — click to insert
      </div>
      <div className="lib-grid">
        {blocks.map((block) => (
          <button key={block.type} type="button" className="lib-item" onClick={() => onInsert(block.type)}>
            <strong style={{ color: "var(--text-primary)", fontSize: 11 }}>{block.label}</strong>
            <span>{block.hint}</span>
          </button>
        ))}
      </div>

      {suggestions && suggestions.length > 0 && (
        <>
          <div className="props-title" style={{ marginTop: 20 }}>
            From the details you entered
          </div>
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              className="section-row"
              onClick={() => onInsert("paragraph")}
              title="Insert as a paragraph"
            >
              {item}
            </button>
          ))}
        </>
      )}
    </>
  );
}
