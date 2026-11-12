import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Contact</h1>
        <p className="body-secondary">We read every message.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
