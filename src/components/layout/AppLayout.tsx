import { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <AppHeader /><div className="app-body"><AppSidebar /><main>{children}</main></div>
    </div>
  );
}
