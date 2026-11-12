import { AppLayout } from '../../components/layout/AppLayout';

export default function DashboardOverviewPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Dashboard</h1><p className="body-secondary">What needs your attention today.</p></section>
      <section className="page-content"><p>Content for Dashboard.</p></section>
    </AppLayout>
  );
}
