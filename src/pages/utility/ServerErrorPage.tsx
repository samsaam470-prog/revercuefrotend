import { AppLayout } from '../../components/layout/AppLayout';

export default function ServerErrorPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">500</h1><p className="body-secondary">Something went wrong.</p></section>
      <section className="page-content"><p>Content for 500.</p></section>
    </AppLayout>
  );
}
