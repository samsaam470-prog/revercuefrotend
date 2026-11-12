import { AppLayout } from '../../components/layout/AppLayout';

export default function CrmListPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Clients</h1><p className="body-secondary">Your clients.</p></section>
      <section className="page-content"><p>Content for Clients.</p></section>
    </AppLayout>
  );
}
