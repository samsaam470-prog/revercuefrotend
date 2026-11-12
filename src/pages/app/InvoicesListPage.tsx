import { AppLayout } from '../../components/layout/AppLayout';

export default function InvoicesListPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Invoices</h1><p className="body-secondary">Your invoices.</p></section>
      <section className="page-content"><p>Content for Invoices.</p></section>
    </AppLayout>
  );
}
