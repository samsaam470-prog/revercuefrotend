import { ReactNode } from 'react';

export function TemplatePicker({ children }: { children?: ReactNode }) {
  return <div className="template-picker">{children}</div>;
}
