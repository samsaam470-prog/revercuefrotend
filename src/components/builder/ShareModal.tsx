import { ReactNode } from 'react';

export function ShareModal({ children }: { children?: ReactNode }) {
  return <div className="share-modal">{children}</div>;
}
