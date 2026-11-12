import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function BetaPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Beta</h1>
        <p className="body-secondary">Help shape the thread.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
