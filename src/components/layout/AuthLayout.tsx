import { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth">
      <main className="auth-main">{children}</main>
    </div>
  );
}
