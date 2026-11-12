import type { ReactNode } from "react";

export interface FieldsetProps {
  legend: string;
  error?: string;
  helper?: string;
  children: ReactNode;
  id?: string;
}

export function Fieldset({ legend, error, helper, children, id }: FieldsetProps) {
  return (
    <fieldset className="fieldset" aria-describedby={error ? `${id || legend}-error` : undefined}>
      <legend>{legend}</legend>
      {helper && <span className="helper">{helper}</span>}
      {children}
      {error && (
        <span className="error-text" id={`${id || legend}-error`} role="alert">
          {error}
        </span>
      )}
    </fieldset>
  );
}
