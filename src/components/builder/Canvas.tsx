import { useState } from "react";
import { BlockLibrary, type BlockDefinition } from "./BlockLibrary";
import { BlockRenderer } from "./BlockRenderer";
import { PropertyPanel } from "./PropertyPanel";
import type { Block, BlockType, DocContent } from "../../types";

export interface CanvasProps {
  doc: DocContent;
  documentType?: "proposal" | "contract" | "form" | "invoice" | "other";
  blocks: Block[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onBlocksChange: (blocks: Block[]) => void;
  onDocChange: (patch: Partial<DocContent>) => void;
  sections: string[];
  blockDefinitions: BlockDefinition[];
  suggestions?: string[];
  clientName: string;
  title: string;
  reference: string;
  afterApproval?: string;
  onAfterApprovalChange?: (value: string) => void;
  showAfterApproval?: boolean;
}

export function Canvas({
  doc,
  documentType = "other",
  blocks,
  selectedId,
  onSelect,
  onBlocksChange,
  onDocChange,
  sections,
  blockDefinitions,
  suggestions,
  clientName,
  title,
  reference,
  afterApproval,
  onAfterApprovalChange,
  showAfterApproval,
}: CanvasProps) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const selected = blocks.find((block) => block.id === selectedId) ?? null;

  const insert = (type: BlockType) => {
    const block: Block = {
      id: `b_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type,
      text: type === "heading" ? "Section heading" : type === "paragraph" ? "" : undefined,
      level: type === "heading" ? "h2" : undefined,
    };
    // A new visual starts empty and asks for its own data; it never ships
    // with sample figures or a placeholder picture.
    if (type === "icon") block.icon = { name: "mdi:circle" };
    if (type === "chart") block.chart = { kind: "bar", series: [] };
    if (type === "diagram") block.diagram = { steps: [] };
    const next = [...blocks, block];
    onBlocksChange(next);
    onSelect(block.id);
  };

  const update = (patch: Partial<Block>) => {
    if (!selected) return;
    onBlocksChange(blocks.map((block) => (block.id === selected.id ? { ...block, ...patch } : block)));
  };

  const remove = (id: string) => {
    onBlocksChange(blocks.filter((block) => block.id !== id));
    if (selectedId === id) onSelect(null);
  };

  const move = (id: string, direction: -1 | 1) => {
    const index = blocks.findIndex((block) => block.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onBlocksChange(next);
  };

  return (
    <div className="builder-grid">
      <div className="builder-panel">
        <BlockLibrary
          blocks={blockDefinitions}
          onInsert={insert}
          sections={sections}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          suggestions={suggestions}
        />
      </div>

      <div className="canvas-area" onClick={() => onSelect(null)}>
        <div
          className="canvas-page"
          style={{ maxWidth: doc.max_width || 720, background: doc.page_background || "#ffffff" }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="canvas-meta">
            <span className="mark">{clientName.charAt(0)}</span>
            <span>Prepared for {clientName}</span>
            <span className="mono">ref {reference}</span>
          </div>
          <h1>{title || "Untitled document"}</h1>
          <div className="canvas-hint">
            Click any line to type. Select a block for its colours, images and uploads.
          </div>
          {blocks.length === 0 && (
            <p style={{ color: "#8a857a", fontSize: 13 }}>
              The canvas is empty. Insert a block from the left panel, or start from a template.
            </p>
          )}
          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              documentType={documentType}
              block={block}
              editable
              selected={selectedId === block.id}
              onSelect={() => onSelect(block.id)}
              onDelete={() => remove(block.id)}
              onDuplicate={() =>
                onBlocksChange([
                  ...blocks,
                  { ...block, id: `b_${Date.now()}_${Math.random().toString(36).slice(2, 6)}` },
                ])
              }
              onMoveUp={() => move(block.id, -1)}
              onMoveDown={() => move(block.id, 1)}
              onPatch={(patch) =>
                onBlocksChange(
                  blocks.map((item) => (item.id === block.id ? { ...item, ...patch } : item)),
                )
              }
              brandPrimary={doc.brand_primary}
            />
          ))}
        </div>
      </div>

      <div className="builder-panel right">
        <PropertyPanel
          block={selected}
          onChange={update}
          doc={doc}
          onDocChange={onDocChange}
          showAfterApproval={showAfterApproval}
          afterApproval={afterApproval}
          onAfterApprovalChange={onAfterApprovalChange}
        />
      </div>
    </div>
  );
}

export function blocksFromProposal(input: {
  problem?: string;
  sections?: string[];
  faqs?: { question: string; answer: string }[];
  questions?: { text?: string; id?: string; type?: string }[];
}): Block[] {
  const blocks: Block[] = [];
  const sections = input.sections?.length
    ? input.sections
    : ["Introduction", "Scope", "Timeline", "Pricing", "Next Step"];

  sections.forEach((section, index) => {
    blocks.push({
      id: `sec_${index}`,
      type: "heading",
      level: "h2",
      text: section,
    });
    if (section.toLowerCase().includes("pricing")) {
      blocks.push({
        id: `pricing_${index}`,
        type: "packages",
        items: [
          { label: "Basic", price: 500 },
          { label: "Standard", price: 1200 },
          { label: "Premium", price: 2500 },
        ],
      });
    } else if (section.toLowerCase().includes("faq")) {
      input.faqs?.forEach((faq, faqIndex) => {
        blocks.push({ id: `faq_${index}_${faqIndex}`, type: "faq", faqs: [faq] });
      });
    } else {
      blocks.push({
        id: `body_${index}`,
        type: "paragraph",
        text:
          index === 0
            ? input.problem || "Summarize the client's problem and the outcome here."
            : `Write the ${section.toLowerCase()} section here.`,
      });
    }
  });

  input.questions?.forEach((question, index) => {
    blocks.push({
      id: `question_${index}`,
      type: "question",
      question: {
        id: question.id || `q${index + 1}`,
        text: question.text || "A question for the client",
        type: (question.type as NonNullable<Block["question"]>["type"]) || "short_text",
      },
    });
  });

  blocks.push({ id: "next_step", type: "next_step", text: "Next step" });
  return blocks;
}
