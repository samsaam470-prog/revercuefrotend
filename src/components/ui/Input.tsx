import type { InputHTMLAttributes } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "id"> {
  label: string;
  helper?: string;
  error?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
}

export function Input({
  label,
  helper,
  error,
  id,
  value,
  onChange,
  hideLabel = false,
  className = "",
  ...rest
}: InputProps) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`input-group${error ? " has-error" : ""}`}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : undefined}>
        {label}
        {rest.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
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
