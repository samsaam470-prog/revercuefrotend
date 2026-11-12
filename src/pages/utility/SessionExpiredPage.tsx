import { AppLayout } from '../../components/layout/AppLayout';

export default function SessionExpiredPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Session Expired</h1><p className="body-secondary">Log in again.</p></section>
      <section className="page-content"><p>Content for Session Expired.</p></section>
    </AppLayout>
  );
}
