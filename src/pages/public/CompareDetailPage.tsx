import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { COMPETITORS, competitorBySlug } from "../../lib/competitors";

export function CompareDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const competitor = slug ? competitorBySlug(slug) : undefined;

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
      </article>

      <div className="inline mt-8">
        <Link to="/signup" className="btn btn-primary">
          Start Free
        </Link>
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
