import { Link } from "react-router-dom";

export interface StartFreeBandProps {
  headline?: string;
  subtext?: string;
}

export function StartFreeBand({
  headline = "Ready to stop losing the thread?",
  subtext = "One link. One thread. From proposal to payment.",
}: StartFreeBandProps) {
  return (
    <section className="start-band" aria-labelledby="start-band-title">
      <div className="start-band-inner">
        <h2 id="start-band-title">{headline}</h2>
        <p>{subtext}</p>
        <div className="band-actions">
          <Link to="/signup" className="btn btn-primary">
            Start Free
          </Link>
          <Link to="/pricing" className="btn btn-secondary">
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
