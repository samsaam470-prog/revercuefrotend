import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function GuideDetailPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Guide</h1>
        <p className="body-secondary">How to run the thread.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
