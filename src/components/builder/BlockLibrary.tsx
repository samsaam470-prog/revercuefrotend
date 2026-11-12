import { ReactNode } from 'react';

export function BlockLibrary({ children }: { children?: ReactNode }) {
  return <div className="block-library">{children}</div>;
}
