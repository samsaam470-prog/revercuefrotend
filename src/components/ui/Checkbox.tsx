import { Check } from "lucide-react";
import type { ReactNode } from "react";

export interface CheckboxProps {
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
}

export function Checkbox({ label, checked, onChange, disabled, error, id, name }: CheckboxProps) {
  return (
    <label className={`checkbox${error ? " error" : ""}`} htmlFor={id}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="box" aria-hidden="true">
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      <span>
        {label}
        {error && (
          <span className="error-text" style={{ display: "block" }} role="alert">
            {error}
          </span>
        )}
      </span>
    </label>
  );
}
