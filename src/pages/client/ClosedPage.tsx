import { AppLayout } from '../../components/layout/AppLayout';

export default function ClosedPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Closed</h1><p className="body-secondary">This document is closed.</p></section>
      <section className="page-content"><p>Content for Closed.</p></section>
    </AppLayout>
  );
}
