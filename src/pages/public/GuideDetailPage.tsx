import { Link, useParams } from "react-router-dom";
import { CodeVisual } from "../../components/visuals";
import { CoverArt, coverKindForCategory } from "../../components/visuals/CoverArt";
import { GUIDES, guideBySlug } from "../../lib/guides";
import { formatDate } from "../../lib/formatters";

export function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? guideBySlug(slug) : undefined;

  if (!guide) {
    return (
      <div className="page page-narrow">
        <p className="eyebrow">404</p>
        <h1 className="serif" style={{ fontSize: 32, margin: "12px 0" }}>
          This guide doesn't exist.
        </h1>
        <p className="muted">It may have been renamed. Every guide is listed on the index.</p>
        <Link to="/guides" className="btn btn-primary mt-6">
          All guides
        </Link>
      </div>
    );
  }

  const related = GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <div className="article-layout">
      <nav className="legal-toc article-toc" aria-label="On this page">
        {guide.sections.map((section) => (
          <a key={section.heading} href={`#${slugify(section.heading)}`}>
            {section.heading}
          </a>
        ))}
      </nav>
      <article className="article">
        <p className="eyebrow">{guide.category}</p>
        <h1 style={{ marginTop: 8 }}>{guide.title}</h1>
        <p className="caption">
          Updated {formatDate(guide.updated)} · {guide.readMinutes} min read
        </p>

        <div className="cover-frame cover-frame-hero" style={{ margin: "32px 0" }}>
          <CoverArt
            seed={`${guide.slug}-hero`}
            kind={coverKindForCategory(guide.category)}
            variant="hero"
            label={`${guide.title} — cover`}
            monogram={guide.title.slice(0, 1)}
          />
        </div>

        {guide.sections.map((section) => (
          <section key={section.heading} id={slugify(section.heading)}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.visual && (
              <div style={{ margin: "24px 0" }}>
                <CodeVisual name={section.visual} />
              </div>
            )}
          </section>
        ))}

        <div className="card card-md mt-8">
          <h3 style={{ marginBottom: 8 }}>Ready to run the thread?</h3>
          <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>
            Free plan. No credit card. Two minutes to set up.
          </p>
          <div className="inline">
            <Link to="/signup" className="btn btn-primary">
              Start Free
            </Link>
            <Link to="/pricing" className="btn btn-secondary">
              See Pricing
            </Link>
          </div>
        </div>

        <section className="section" style={{ marginTop: 48 }}>
          <h2 style={{ marginBottom: 20 }}>Related guides</h2>
          <div className="stack-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/guides/${item.slug}`} className="link-card">
                <div className="cover-frame cover-frame-sm">
                  <CoverArt
                    seed={item.slug}
                    kind={coverKindForCategory(item.category)}
                    label={`${item.title} — cover`}
                    monogram={item.title.slice(0, 1)}
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
