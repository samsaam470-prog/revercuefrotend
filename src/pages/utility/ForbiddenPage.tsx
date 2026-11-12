import { AppLayout } from '../../components/layout/AppLayout';

export default function ForbiddenPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">403</h1><p className="body-secondary">You do not have access.</p></section>
      <section className="page-content"><p>Content for 403.</p></section>
    </AppLayout>
  );
}
