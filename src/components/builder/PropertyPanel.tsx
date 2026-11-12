import { ReactNode } from 'react';

export function PropertyPanel({ children }: { children?: ReactNode }) {
  return <div className="property-panel">{children}</div>;
}
