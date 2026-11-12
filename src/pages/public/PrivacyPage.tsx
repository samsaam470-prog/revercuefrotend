import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Privacy</h1>
        <p className="body-secondary">What we collect, how we use it, who we share it with.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
