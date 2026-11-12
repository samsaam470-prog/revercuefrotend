import { AppLayout } from '../../components/layout/AppLayout';

export default function OfflinePage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Offline</h1><p className="body-secondary">Check your connection.</p></section>
      <section className="page-content"><p>Content for Offline.</p></section>
    </AppLayout>
  );
}
