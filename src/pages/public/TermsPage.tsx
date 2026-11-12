import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function TermsPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Terms</h1>
        <p className="body-secondary">The service, your account, the acceptable use.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
