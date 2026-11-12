import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function SecurityPage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Security</h1>
        <p className="body-secondary">The encryption, the storage, the retention.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
