import { ReactNode } from 'react';

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin">
      <AdminHeader /><div className="admin-body"><AdminSidebar /><main>{children}</main></div>
    </div>
  );
}
