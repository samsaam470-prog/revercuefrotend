import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Workflow } from "lucide-react";
import { CodeVisual, type VisualName } from "../../components/visuals";
import { FAQItem } from "../../components/shared/FAQItem";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

interface FeatureGuide {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  key_facts: string[];
  visual: VisualName;
  sections: { heading: string; paragraphs: string[] }[];
  includes: string[];
  faqs: { question: string; answer: string }[];
  related: { label: string; to: string }[];
}

const modules = import.meta.glob<FeatureGuide>("../../content/features/*.json", {
  eager: true,
  import: "default",
});

export const FEATURE_GUIDES: Record<string, FeatureGuide> = Object.fromEntries(
  Object.values(modules).map((guide) => [guide.slug, guide]),
);

export function FeatureDetailPage() {
  const { slug = "" } = useParams();
  const guide = FEATURE_GUIDES[slug];

  if (!guide) {
    return (
      <div className="page page-wide">
        <div className="page-head">
          <p className="eyebrow">Features</p>
          <h1>Explore the Revercue feature set.</h1>
          <p>Proposals, contracts, requirement forms, invoices, CRM, the builder and suggestions.</p>
          <Link className="btn btn-primary mt-6" to="/features">See all features <ArrowRight size={15} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-wide feature-doc">
      <header className="page-head">
        <p className="eyebrow">{guide.eyebrow}</p>
        <h1>{guide.title}</h1>
        <p>{guide.intro}</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 24 }}>
          <AuthActionStart className="btn btn-primary btn-lg">Start Free</AuthActionStart>
          <Link to="/features" className="btn btn-secondary btn-lg">All features</Link>
        </div>
      </header>

      <section className="section">
        <div className="two-up">
          <div className="feature-summary">
            <p className="eyebrow">Quick answer</p>
            <h2>What it does.</h2>
            <p className="muted">{guide.summary}</p>
          </div>
          <div>
            <CodeVisual name={guide.visual} />
          </div>
        </div>
        <ul className="key-facts">
          {guide.key_facts.map((fact) => (
            <li key={fact}><Check size={16} color="var(--gold)" /> <span>{fact}</span></li>
          ))}
        </ul>
      </section>

      {guide.sections.map((section) => (
        <section className="section" key={section.heading}>
          <div className="section-head">
            <h2>{section.heading}</h2>
          </div>
          {section.paragraphs.map((paragraph) => (
            <p className="muted" key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">What is included</p>
          <h2>Everything this feature covers.</h2>
        </div>
        <div className="module-grid">
          {guide.includes.map((item) => (
            <div className="module-card" key={item}>
              <Check size={18} color="var(--gold)" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Questions</p>
          <h2>Common questions.</h2>
        </div>
        <div className="faq-list">
          {guide.faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Keep exploring</p>
          <h2>Related Revercue features.</h2>
        </div>
        <div className="module-grid">
          {guide.related.map((item) => (
            <Link className="module-card" key={item.to} to={item.to}>
              <Workflow size={18} />
              <h3>{item.label}</h3>
              <span className="inline">Explore <ArrowRight size={14} /></span>
            </Link>
          ))}
          <Link className="module-card" to="/features">
            <Check size={18} /><h3>All features</h3><span className="inline">See the overview <ArrowRight size={14} /></span>
          </Link>
          <Link className="module-card" to="/pricing">
            <Check size={18} /><h3>Plans and pricing</h3><span className="inline">Compare plans <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>

      <section className="section text-center">
        <h2>Put this to work for your next client.</h2>
        <p className="muted">Start with the free plan and set up your first client workflow in Revercue.</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 20 }}>
          <AuthActionStart className="btn btn-primary btn-lg">Start Free</AuthActionStart>
          <Link to="/pricing" className="btn btn-secondary btn-lg">See pricing</Link>
        </div>
      </section>
    </div>
  );
}
