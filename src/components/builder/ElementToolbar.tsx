import { useRef, useState } from "react";
import { ImageUp, Sparkles, Trash2 } from "lucide-react";
import type { Block } from "../../types";
import { isAvailable, rewrite } from "../../lib/webllm";

export interface ElementToolbarProps {
  block: Block;
  onChange: (patch: Partial<Block>) => void;
  onRemove: () => void;
}

const TEXT_TYPES = new Set(["heading", "paragraph", "quote", "button", "card", "next_step"]);

/** The text an element change should be written into, and how to write it. */
function editableText(block: Block): { value: string; write: (next: string) => Partial<Block> } | null {
  if (TEXT_TYPES.has(block.type)) {
    return { value: block.text || "", write: (text) => ({ text }) };
  }
  if (block.type === "faq") {
    return {
      value: block.faqs?.[0]?.answer || "",
      write: (answer) => ({ faqs: [{ question: block.faqs?.[0]?.question || "", answer }] }),
    };
  }
  if (block.type === "image" || block.type === "graph" || block.type === "file_upload") {
    return { value: block.alt || block.text || "", write: (value) => ({ alt: value }) };
  }
  if (block.type === "next_step" || block.type === "question") {
    return block.type === "question"
      ? { value: block.question?.text || "", write: (text) => ({ question: { ...block.question, id: block.question?.id || "q1", type: block.question?.type || "short_text", text } }) }
      : null;
  }
  return null;
}

/**
 * The action strip for a selected element: Ask the helper (which writes its
 * result back through the same block update the properties panel uses), Upload
 * from device for image elements, and Remove.
 */
export function ElementToolbar({ block, onChange, onRemove }: ElementToolbarProps) {
  const available = isAvailable();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const target = editableText(block);
  const canUpload = block.type === "image" || block.type === "file_upload";

  const ask = async () => {
    if (!target || instruction.trim().length < 3) return;
    setBusy(true);
    setFailed(false);
    const result = await rewrite(target.value, instruction.trim());
    setBusy(false);
    if (!result) {
      setFailed(true);
      return;
    }
    onChange(target.write(result));
    setOpen(false);
    setInstruction("");
  };

  const upload = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ url: String(reader.result), alt: block.alt || file.name });
    reader.readAsDataURL(file);
  };

  return (
    <div className="element-tools" onClick={(event) => event.stopPropagation()}>
      {available && target && (
        <button type="button" onClick={() => setOpen((value) => !value)}>
          <Sparkles size={11} /> Ask the helper
        </button>
      )}
      {canUpload && (
        <>
          <button type="button" onClick={() => fileRef.current?.click()}>
            <ImageUp size={11} /> Upload from device
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => upload(event.target.files?.[0])}
          />
        </>
      )}
      <button type="button" onClick={onRemove}>
        <Trash2 size={11} /> Remove
      </button>

      {available && open && target && (
        <div className="element-tools-panel">
          <input
            autoFocus
            value={instruction}
            onChange={(event) => setInstruction(event.target.value)}
            placeholder="Describe the change: shorten it, make it formal, clearer alt text"
            aria-label="What should the helper change?"
          />
          <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => void ask()}>
            {busy ? "Working…" : "Apply"}
          </button>
          {failed && <span className="caption">No change came back. Try again, or edit it in the panel.</span>}
        </div>
      )}
    </div>
  );
}
