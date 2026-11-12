import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "id"> {
  label: string;
  helper?: string;
  error?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export function Textarea({
  label,
  helper,
  error,
  id,
  value,
  onChange,
  rows = 4,
  className = "",
  ...rest
}: TextareaProps) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`input-group${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {rest.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
        className={className}
        {...rest}
      />
      {helper && (
        <span className="helper" id={helperId}>
          {helper}
        </span>
      )}
      {error && (
        <span className="error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
