import { ReactNode } from 'react';

export function Canvas({ children }: { children?: ReactNode }) {
  return <div className="canvas">{children}</div>;
}
