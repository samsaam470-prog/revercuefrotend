import { PublicLayout } from '../../components/layout/PublicLayout';
import { StartFreeBand } from '../../components/layout/StartFreeBand';

export default function ComparePage() {
  return (
    <PublicLayout>
      <section className="page-hero">
        <h1 className="display">Compare</h1>
        <p className="body-secondary">The thread vs. the stack of tools you're using now.</p>
      </section>
      <StartFreeBand />
    </PublicLayout>
  );
}
