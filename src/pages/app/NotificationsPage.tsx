import { AppLayout } from '../../components/layout/AppLayout';

export default function NotificationsPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Notifications</h1><p className="body-secondary">Your activity.</p></section>
      <section className="page-content"><p>Content for Notifications.</p></section>
    </AppLayout>
  );
}
