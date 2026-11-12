import { ReactNode } from 'react';

export function TopBar({ children }: { children?: ReactNode }) {
  return <div className="builder-topbar">{children}</div>;
}
