import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { COMPETITORS, competitorBySlug } from "../../lib/competitors";
import { COMPETITOR_RESEARCH, PRICING_CHECKED } from "../../lib/competitorResearch";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

export function CompareDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const competitor = slug ? competitorBySlug(slug) : undefined;
  const research = slug ? COMPETITOR_RESEARCH[slug] : undefined;

  if (!competitor) {
    return (
      <div className="page page-narrow">
        <p className="eyebrow">404</p>
        <h1 className="serif" style={{ fontSize: 32, margin: "12px 0" }}>
          This comparison doesn't exist.
        </h1>
        <p className="muted">
          It may have been renamed. Every comparison is listed on the Compare page.
        </p>
        <Link to="/compare" className="btn btn-primary mt-6">
          All comparisons
        </Link>
      </div>
    );
  }

  const others = COMPETITORS.filter((item) => item.slug !== competitor.slug).slice(0, 3);

  return (
    <div className="page page-narrow">
      <Link to="/compare" className="back-link">
        <ArrowLeft size={14} /> All comparisons
      </Link>

      <div className="page-head" style={{ marginBottom: 24 }}>
        <p className="eyebrow">Compare · {competitor.kind}</p>
        <h1>
          {competitor.name} vs. Revercue
        </h1>
        <p className="lede">{competitor.summary}</p>
        {competitor.website && (
          <p className="caption">
            Source: <a href={competitor.website} target="_blank" rel="noopener noreferrer">{competitor.website}</a>
          </p>
        )}
        <p className="caption">
          On the 13-point breakdown: {" "}
          <Link to="/compare/criteria">the same questions, answered for all eight platforms</Link>.
        </p>
      </div>

      <article className="article editorial">
        <p className="article-lede">{competitor.intro}</p>

        <ol className="article-toc" aria-label="On this page">
          {competitor.sections.map((section, index) => (
            <li key={section.heading}>
              <a href={`#section-${index + 1}`}>{section.heading}</a>
            </li>
          ))}
          {research && (
            <>
              <li><a href="#pricing">Current pricing, checked {research.checkedOn}</a></li>
              <li><a href="#what-others-say">What others say about {competitor.name}</a></li>
              <li><a href="#sources">Sources</a></li>
            </>
          )}
        </ol>

        {competitor.sections.map((section, index) => (
          <section key={section.heading} id={`section-${index + 1}`}>
            <h2>
              <span className="section-index">{String(index + 1).padStart(2, "0")}</span>
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <div className="card card-md" style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>Where Revercue differs</h2>
          <ul className="stack-2">
            {competitor.differences.map((difference) => (
              <li key={difference}>{difference}</li>
            ))}
          </ul>
        </div>

        <section>
          <h2>
            <span className="section-index">
              {String(competitor.sections.length + 1).padStart(2, "0")}
            </span>
            Who each is for
          </h2>
          <p>{competitor.fits}</p>
        </section>

        {research && (
          <section id="pricing">
            <h2>
              <span className="section-index">{String(competitor.sections.length + 2).padStart(2, "0")}</span>
              Current pricing, checked {research.checkedOn}
            </h2>
            <p>
              These are the list prices published by {competitor.name} on the day we checked, not a
              quote or a promotional offer. Plans and prices change; the vendor's pricing page is
              always the source of truth, and this table is dated so a later change does not turn a
              past fact into a false claim.
            </p>
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Price</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {research.pricing.map((row) => (
                    <tr key={row.plan}>
                      <td>{row.plan}</td>
                      <td>{row.price}</td>
                      <td>{row.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="caption">
              Source:{" "}
              <a href={research.pricingSource.url} target="_blank" rel="noopener noreferrer">
                {research.pricingSource.label}
              </a>{" "}
              — read on {research.checkedOn}. {research.pricingNote}
            </p>
          </section>
        )}

        {research && (
          <section id="what-others-say">
            <h2>
              <span className="section-index">{String(competitor.sections.length + 3).padStart(2, "0")}</span>
              What others say about {competitor.name}
            </h2>
            <p>{research.othersSay.intro}</p>
            <p>{research.othersSay.summary}</p>
            <p className="caption">
              The summaries below are written by Revercue from the linked articles. They describe what
              each article says, not what we think of {competitor.name}. Every link opens the original.
            </p>
            <div className="stack-3">
              {research.othersSay.articles.map((article) => (
                <div className="card card-md" key={article.url}>
                  <h3 style={{ fontSize: 18, marginBottom: 4 }}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title} <ArrowUpRight size={14} />
                    </a>
                  </h3>
                  <p className="caption" style={{ marginTop: 0 }}>{article.source}</p>
                  <p>{article.summary}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {research && (
          <section id="sources">
            <h2>
              <span className="section-index">{String(competitor.sections.length + 4).padStart(2, "0")}</span>
              Sources
            </h2>
            <p>
              The pricing table and the comparison above were checked against these sources on{" "}
              {research.checkedOn}. They include the vendor's own pricing and documentation, its
              product pages, independent review-site profiles and a third-party editorial review.
            </p>
            <ul className="stack-2">
              {research.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a>
                </li>
              ))}
            </ul>
            <p className="caption">Pricing last verified: {PRICING_CHECKED}.</p>
          </section>
        )}
      </article>

      <div className="inline mt-8">
        <AuthActionStart className="btn btn-primary">
          Start Free
        </AuthActionStart>
        <Link to="/pricing" className="btn btn-secondary">
          See Pricing
        </Link>
      </div>

      <section className="section" style={{ marginTop: 48 }}>
        <h2 style={{ marginBottom: 16 }}>More comparisons</h2>
        <div className="stack-3">
          {others.map((item) => (
            <Link key={item.slug} to={`/compare/${item.slug}`} className="link-card">
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
