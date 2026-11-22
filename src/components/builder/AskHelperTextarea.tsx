import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Sparkles, Trash2, Underline } from "lucide-react";
import { rewrite } from "../../lib/webllm";

const QUICK_ACTIONS = [
  "make it formal",
  "make it friendly",
  "make it concise",
  "expand",
  "fix the grammar",
  "simplify",
  "change the wording",
];

const SIZES = [12, 14, 16, 18, 22, 28];

export interface AskHelperTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  helper?: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * A textarea with a selection toolbar. Selecting text offers the helper, the
 * usual formatting (bold, italic, underline, size, colour) and delete. The
 * helper is always offered: it rewrites from local rules when the browser
 * cannot run a model, so the action never dead-ends.
 */
export function AskHelperTextarea({
  id,
  label,
  value,
  onChange,
  rows = 4,
  helper,
  placeholder,
  required,
}: AskHelperTextareaProps) {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const skipSelect = useRef(false);
  const [range, setRange] = useState<{ start: number; end: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const [failed, setFailed] = useState(false);

  const selection =
    range && range.end > range.start ? value.slice(range.start, range.end) : "";
  /** With nothing selected the helper works on the whole field. */
  const target = selection || value;

  useEffect(() => {
    const element = areaRef.current;
    if (!element) return;
    const read = () => {
      if (skipSelect.current) {
        skipSelect.current = false;
        return;
      }
      const { selectionStart, selectionEnd } = element;
      if (selectionEnd - selectionStart < 1) {
        setRange(null);
        return;
      }
      setRange({ start: selectionStart, end: selectionEnd });
    };
    element.addEventListener("select", read);
    element.addEventListener("keyup", read);
    element.addEventListener("mouseup", read);
    return () => {
      element.removeEventListener("select", read);
      element.removeEventListener("keyup", read);
      element.removeEventListener("mouseup", read);
    };
  }, []);

  const reselect = (start: number, end: number) => {
    skipSelect.current = true;
    requestAnimationFrame(() => {
      const element = areaRef.current;
      if (!element) return;
      element.focus();
      element.setSelectionRange(start, end);
      setRange({ start, end });
    });
  };

  const wrap = (token: string) => {
    if (!range) return;
    const selected = value.slice(range.start, range.end);
    const open = `{${token}|`;
    const before = value.slice(0, range.start);
    const after = value.slice(range.end);

    // Clicking the same control on an already formatted selection removes it.
    if (selected.startsWith(open) && selected.endsWith("}")) {
      const inner = selected.slice(open.length, -1);
      onChange(before + inner + after);
      reselect(range.start, range.start + inner.length);
      return;
    }
    // The selection is the inside of a token already: drop the markers around it.
    if (before.endsWith(open) && after.startsWith("}")) {
      onChange(value.slice(0, range.start - open.length) + selected + value.slice(range.end + 1));
      reselect(range.start - open.length, range.start - open.length + selected.length);
      return;
    }

    onChange(before + open + selected + "}" + after);
    reselect(range.start + open.length, range.start + open.length + selected.length);
  };

  const removeSelection = () => {
    if (!range) return;
    onChange(value.slice(0, range.start) + value.slice(range.end));
    reselect(range.start, range.start);
    setRange(null);
  };

  const ask = async (action: string) => {
    if (!target.trim()) return;
    setBusy(true);
    setFailed(false);
    setResult("");
    const rewritten = await rewrite(target, action);
    setBusy(false);
    if (!rewritten) {
      setFailed(true);
      return;
    }
    setResult(rewritten);
  };

  const close = () => {
    setOpen(false);
    setResult("");
    setFailed(false);
    setInstruction("");
  };

  const replace = () => {
    if (!result) return;
    if (!range) {
      onChange(result);
      close();
      return;
    }
    onChange(value.slice(0, range.start) + result + value.slice(range.end));
    setRange(null);
    close();
  };

  const insertBelow = () => {
    if (!result) return;
    const at = range ? range.end : value.length;
    onChange(value.slice(0, at) + "\n" + result + value.slice(at));
    setRange(null);
    close();
  };

  return (
    <div className="input-group ask-helper">
      <div className="ask-helper-head">
        <label htmlFor={id}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
        <button
          type="button"
          className="ask-helper-trigger"
          onClick={() => setOpen((current) => !current)}
          disabled={!value.trim()}
        >
          <Sparkles size={12} /> Ask the helper
        </button>
      </div>
      <textarea
        id={id}
        ref={areaRef}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={helper ? `${id}-helper` : undefined}
      />

      {range && (
        <div className="ask-helper-toolbar" role="toolbar" aria-label="Text actions">
          <button type="button" className="ask-helper-trigger" onClick={() => setOpen(true)}>
            <Sparkles size={12} /> Ask the helper
          </button>
          <button type="button" aria-label="Bold" title="Bold" onClick={() => wrap("b")}>
            <Bold size={12} />
          </button>
          <button type="button" aria-label="Italic" title="Italic" onClick={() => wrap("i")}>
            <Italic size={12} />
          </button>
          <button type="button" aria-label="Underline" title="Underline" onClick={() => wrap("u")}>
            <Underline size={12} />
          </button>
          <select
            aria-label="Font size"
            defaultValue=""
            onChange={(event) => {
              if (event.target.value) wrap(`s:${event.target.value}`);
            }}
          >
            <option value="">Size</option>
            {SIZES.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
          <label className="ask-helper-color" title="Text colour">
            <span>Colour</span>
            <input
              type="color"
              defaultValue="#c9a961"
              onChange={(event) => wrap(`c:${event.target.value}`)}
              aria-label="Text colour"
            />
          </label>
          <button type="button" aria-label="Delete selection" title="Delete" onClick={removeSelection}>
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {helper && (
        <span className="helper" id={`${id}-helper`}>
          {helper}
        </span>
      )}

      {open && target.trim() && (
        <div className="ask-helper-panel" role="dialog" aria-label="Ask the helper">
          <div className="ask-helper-actions">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                className="ask-helper-chip"
                disabled={busy}
                onClick={() => void ask(action)}
              >
                {action}
              </button>
            ))}
          </div>
          <div className="ask-helper-custom">
            <input
              value={instruction}
              onChange={(event) => setInstruction(event.target.value)}
              placeholder="Or type an instruction: make it sound more confident"
              aria-label="Custom instruction"
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              disabled={busy || instruction.trim().length < 3}
              onClick={() => void ask(instruction.trim())}
            >
              Ask
            </button>
          </div>

          <p className="ask-helper-before">
            <span className="caption">Before{selection ? " (selection)" : " (whole field)"}</span>
            {target}
          </p>

          {busy && <p className="caption">Working on the rewrite…</p>}
          {failed && <p className="caption">No rewrite came back. Try again, or edit the text yourself.</p>}

          {result && (
            <>
              <p className="ask-helper-after">
                <span className="caption">After</span>
                {result}
              </p>
              <div className="ask-helper-choices">
                <button type="button" className="btn btn-primary btn-sm" onClick={replace}>
                  Replace
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={insertBelow}>
                  Insert below
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={close}>
                  Cancel
                </button>
              </div>
            </>
          )}
          {!result && !busy && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={close}>
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
}
