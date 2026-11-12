import { ReactNode } from 'react';

export function PreviewPane({ children }: { children?: ReactNode }) {
  return <div className="preview-pane">{children}</div>;
}
