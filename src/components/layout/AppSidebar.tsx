import { ReactNode } from 'react';

export function AppSidebar({ children }: { children: ReactNode }) {
  return (
    <div className="sidebar">
      <nav>{children}</nav>
    </div>
  );
}
