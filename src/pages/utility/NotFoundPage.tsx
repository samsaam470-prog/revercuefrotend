import { AppLayout } from '../../components/layout/AppLayout';

export default function NotFoundPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">404</h1><p className="body-secondary">This page does not exist.</p></section>
      <section className="page-content"><p>Content for 404.</p></section>
    </AppLayout>
  );
}
