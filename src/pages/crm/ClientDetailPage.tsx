import { AppLayout } from '../../components/layout/AppLayout';

export default function ClientDetailPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Client</h1><p className="body-secondary">The client record.</p></section>
      <section className="page-content"><p>Content for Client.</p></section>
    </AppLayout>
  );
}
