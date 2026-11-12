import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Features</h1>
        <p className="body-secondary">Everything the thread needs. Nothing it doesn't.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
