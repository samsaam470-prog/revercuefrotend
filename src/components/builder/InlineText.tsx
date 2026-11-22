import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export interface InlineTextProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  /** Enter makes a new line instead of ending the edit. */
  multiline?: boolean;
  ariaLabel?: string;
}

/**
 * Text you can type straight into on the canvas. While it is focused the
 * browser owns the DOM (so the cursor never jumps); when the value changes
 * from elsewhere — a draft fill, the helper, undo — it is written back in.
 */
export function InlineText({
  value,
  onChange,
  className,
  style,
  placeholder,
  multiline = false,
  ariaLabel,
}: InlineTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (document.activeElement === element) return;
    const next = value ?? "";
    if (element.innerText !== next) element.innerText = next;
  }, [value]);

  return (
    <span
      ref={ref}
      className={`inline-text${className ? ` ${className}` : ""}`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={ariaLabel}
      aria-multiline={multiline}
      tabIndex={0}
      data-placeholder={placeholder}
      onInput={(event) => onChange(event.currentTarget.innerText)}
      onBlur={(event) => onChange(event.currentTarget.innerText.replace(/\n{3,}/g, "\n\n"))}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === "Escape") {
          event.currentTarget.blur();
          return;
        }
        if (event.key === "Enter" && !multiline) {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      onPaste={(event) => {
        event.preventDefault();
        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
    />
  );
}
