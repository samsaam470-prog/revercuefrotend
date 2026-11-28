import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CRITERIA,
  PLATFORM_CRITERIA,
  RATING_LABEL,
  type Rating,
} from "../../lib/criteria";
import { PRICING_CHECKED } from "../../lib/competitorResearch";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

function RatingChip({ rating }: { rating: Rating }) {
  return (
    <span className={`criteria-rating is-${rating}`} title={RATING_LABEL[rating]}>
      {RATING_LABEL[rating]}
    </span>
  );
}

export function CompareCriteriaPage() {
  return (
    <div className="page page-narrow">
      <Link to="/compare" className="back-link">
        <ArrowLeft size={14} /> All comparisons
      </Link>

      <div className="page-head">
        <p className="eyebrow">Compare · 13 questions</p>
        <h1>Thirteen questions, eight platforms.</h1>
        <p className="lede">
          The same thirteen questions asked of every platform on this site, answered in the same
          order. The rating is deliberately blunt — yes, partly, no — and the note explains where
          the boundary sits, because "yes" without a boundary is marketing. Last verified:
          {PRICING_CHECKED}. Assessments use vendor documentation, public feature pages and dated
          review listings; we have not independently hands-on tested every competitor.
        </p>
      </div>

      <div className="criteria-legend">
        <span className="criteria-chip">
          <RatingChip rating="yes" /> native, part of the product
        </span>
        <span className="criteria-chip">
          <RatingChip rating="partial" /> possible, with a caveat
        </span>
        <span className="criteria-chip">
          <RatingChip rating="no" /> not what it is for
        </span>
      </div>

      <nav className="criteria-toc" aria-label="Jump to a platform">
        {PLATFORM_CRITERIA.map((platform) => (
          <a key={platform.slug} href={`#${platform.slug}`}>
            {platform.name}
          </a>
        ))}
      </nav>

      {PLATFORM_CRITERIA.map((platform) => (
        <section key={platform.slug} id={platform.slug} className="criteria-platform">
          <header className="criteria-platform-head">
            <p className="compare-kind">{platform.kind}</p>
            <h2>{platform.name}</h2>
            <p>{platform.summary}</p>
            {platform.website && (
              <p className="caption">
                Source: <a href={platform.website} target="_blank" rel="noopener noreferrer">{platform.website}</a>
              </p>
            )}
            {platform.slug !== "revercue" && (
              <Link to={`/compare/${platform.slug}`} className="criteria-deep-link">
                Read the full comparison <ArrowRight size={14} />
              </Link>
            )}
          </header>

          <dl className="criteria-rows">
            {CRITERIA.map((criterion) => {
              const entry = platform.ratings[criterion.id];
              if (!entry) return null;
              return (
                <div key={criterion.id} className="criteria-row">
                  <dt>
                    <span className="criteria-label">{criterion.label}</span>
                    <RatingChip rating={entry.rating} />
                  </dt>
                  <dd>{entry.note}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">New on Scale</p>
          <h2>Two Scale features that sit outside the criteria above.</h2>
        </div>
        <div className="module-grid">
          <Link className="module-card" to="/announcements/shareable-builder-and-offline-builder">
            <h3>Shareable Builder</h3>
            <p>Invite one contributor to a proposal, contract, invoice or form by secure link. No account needed. Watch their edits live, use a temporary chat, and take back control when they finish.</p>
            <span className="inline">Read the announcement</span>
          </Link>
          <Link className="module-card" to="/announcements/shareable-builder-and-offline-builder">
            <h3>Offline Builder</h3>
            <p>Prepare a document while online, keep editing it offline in the same browser, and sync when you are back online. Nothing reaches your workspace until you complete the document.</p>
            <span className="inline">Read the announcement</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="card card-lg">
          <h2 className="serif" style={{ fontSize: 26, marginBottom: 12 }}>
            The pattern in the thirteen answers.
          </h2>
          <p className="muted">
            Suites win the width — they cover more of the list — and lose the thread, because the
            documents inside them are still documents. Office suites win familiarity and lose every
            client-facing operation. Revercue deliberately answers "no" to project management and
            time tracking, and "yes" to the five jobs a client actually decides on: the proposal,
            the contract, the requirements, the invoice and the record that remembers all four.
          </p>
          <div className="inline mt-6">
            <AuthActionStart className="btn btn-primary">
              Start Free
            </AuthActionStart>
            <Link to="/pricing" className="btn btn-secondary">
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
