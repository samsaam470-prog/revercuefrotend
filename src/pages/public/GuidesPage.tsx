import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function GuidesPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Guides</h1>
        <p className="body-secondary">How to run the thread, from proposal to payment.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
