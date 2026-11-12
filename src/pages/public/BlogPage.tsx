import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function BlogPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Blog</h1>
        <p className="body-secondary">Notes on the thread.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
