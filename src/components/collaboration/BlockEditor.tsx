import { useState } from "react";
import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-react";
import { BlockRenderer } from "../builder/BlockRenderer";
import { Button } from "../ui/Button";
import type { Block, DocContent } from "../../types";

const NEW_BLOCK_TYPES: { type: Block["type"]; label: string }[] = [
  { type: "heading", label: "Heading" },
  { type: "paragraph", label: "Paragraph" },
  { type: "list", label: "List" },
  { type: "packages", label: "Packages" },
  { type: "faq", label: "FAQ" },
];

/**
 * The editing surface used by Shareable Builder and Offline Builder for
 * proposals and contracts. It edits the same block model the builders use, so
 * a change made here looks identical to a change made by the owner.
 */
export function BlockEditor({
  content,
  documentType,
  onChange,
  disabled = false,
}: {
  content: DocContent;
  documentType: "proposal" | "contract";
  onChange: (next: DocContent) => void;
  disabled?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const blocks = content.blocks ?? [];

  const write = (next: Block[]) => onChange({ ...content, blocks: next });

  const patchBlock = (id: string, patch: Partial<Block>) =>
    write(blocks.map((block) => (block.id === id ? { ...block, ...patch } : block)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    write(next);
  };

  const add = (type: Block["type"]) => {
    const block: Block = {
      id: `blk_${crypto.randomUUID()}`,
      type,
      text: type === "heading" ? "New heading" : "New section",
      ...(type === "heading" ? { level: "h2" as const } : {}),
      ...(type === "list" ? { items: [{ label: "First point" }, { label: "Second point" }] } : {}),
      ...(type === "packages" ? { items: [{ label: "Package", price: 0 }] } : {}),
      ...(type === "faq" ? { faqs: [{ question: "Question", answer: "Answer" }] } : {}),
    };
    write([...blocks, block]);
    setSelectedId(block.id);
  };

  return (
    <div className="space-y-4">
      {blocks.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-white/60">
          This document has no sections yet. Add the first one below.
        </p>
      )}
      {blocks.map((block, index) => (
        <div
          key={block.id}
          className={`rounded-xl border p-3 transition-colors ${
            selectedId === block.id ? "border-[#c9a961]/60 bg-white/[0.04]" : "border-white/10 bg-white/[0.02]"
          }`}
        >
          <BlockRenderer
            block={block}
            documentType={documentType}
            editable={!disabled}
            selected={selectedId === block.id}
            onSelect={() => setSelectedId(block.id)}
            onPatch={(patch) => patchBlock(block.id, patch)}
            brandPrimary={content.brand_primary}
          />
          {!disabled && (
            <div className="mt-2 flex flex-wrap items-center gap-1 text-white/60">
              <button type="button" className="rounded p-1 hover:bg-white/10" title="Move up" onClick={() => move(index, -1)}>
                <ArrowUp size={14} />
              </button>
              <button type="button" className="rounded p-1 hover:bg-white/10" title="Move down" onClick={() => move(index, 1)}>
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                className="rounded p-1 hover:bg-white/10"
                title="Duplicate section"
                onClick={() => {
                  const copy = { ...block, id: `blk_${crypto.randomUUID()}` };
                  const next = [...blocks];
                  next.splice(index + 1, 0, copy);
                  write(next);
                }}
              >
                <Copy size={14} />
              </button>
              <button
                type="button"
                className="rounded p-1 hover:bg-white/10 hover:text-red-300"
                title="Remove section"
                onClick={() => write(blocks.filter((item) => item.id !== block.id))}
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      ))}

      {!disabled && (
        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
          <span className="text-xs uppercase tracking-wide text-white/40">Add section</span>
          {NEW_BLOCK_TYPES.map((item) => (
            <Button key={item.type} variant="ghost" size="sm" onClick={() => add(item.type)}>
              <Plus size={12} className="mr-1" /> {item.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
