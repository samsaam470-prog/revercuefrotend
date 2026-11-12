import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function PricingPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Pricing</h1>
        <p className="body-secondary">Start free. Upgrade when the thread pays for itself.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
