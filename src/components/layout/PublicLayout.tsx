import { ReactNode } from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-layout">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
