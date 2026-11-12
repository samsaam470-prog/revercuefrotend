import { AppLayout } from '../../components/layout/AppLayout';

export default function PublicInvoicePage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Invoice</h1><p className="body-secondary">Review the invoice.</p></section>
      <section className="page-content"><p>Content for Invoice.</p></section>
    </AppLayout>
  );
}
