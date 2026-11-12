import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">About</h1>
        <p className="body-secondary">Why Revercue exists.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
