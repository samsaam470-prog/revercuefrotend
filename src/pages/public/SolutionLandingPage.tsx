import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, FileText, FileSignature, Receipt, Users, Workflow } from "lucide-react";
import { AuthActionStart } from "../../components/auth/AuthActionStart";
import solutionData from "../../content/solutions.json";

type Solution = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  key_facts: string[];
  sections: { heading: string; paragraphs: string[] }[];
  features: string[];
  steps: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; to: string }[];
};

const SOLUTIONS = solutionData as Record<string, Solution>;

export function SolutionLandingPage() {
  const { slug = "" } = useParams();
  const solution = SOLUTIONS[slug];

  if (!solution) {
    return (
      <div className="page page-wide">
        <div className="page-head">
          <p className="eyebrow">Freelancer tools</p>
          <h1>Find the right way to manage client work.</h1>
          <p>Explore Revercue's tools for proposals, client management, contracts and invoices.</p>
          <Link className="btn btn-primary mt-6" to="/solutions/proposal-software">Explore proposal software <ArrowRight size={15} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-wide">
      <header className="page-head">
        <p className="eyebrow">{solution.eyebrow}</p>
        <h1>{solution.title}</h1>
        <p>{solution.intro}</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 24 }}>
          <AuthActionStart className="btn btn-primary btn-lg">Start Free</AuthActionStart>
          <Link to="/pricing" className="btn btn-secondary btn-lg">See pricing</Link>
        </div>
        <p className="caption" style={{ marginTop: 12 }}>Free plan available. No credit card required.</p>
      </header>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Quick answer</p>
          <h2>What this solution does.</h2>
        </div>
        <p className="muted">{solution.summary}</p>
        <ul className="key-facts">
          {solution.key_facts.map((fact) => (
            <li key={fact}><Check size={16} color="var(--gold)" /> <span>{fact}</span></li>
          ))}
        </ul>
      </section>

      {solution.sections.map((section) => (
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
          <p className="eyebrow">What you can do</p>
          <h2>Tools built around the work, not another disconnected app.</h2>
        </div>
        <div className="module-grid">
          {solution.features.map((feature) => (
            <div className="module-card" key={feature}>
              <Check size={18} color="var(--gold)" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2>One client thread, from first step to next step.</h2>
        </div>
        <div className="thread-grid">
          {solution.steps.map((step, index) => (
            <div className="step-card" key={step.title}>
              <span className="num">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Common questions</p>
          <h2>Before you choose a tool.</h2>
        </div>
        <div className="faq-list">
          {solution.faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Explore related workflows</p>
          <h2>More ways Revercue connects client work.</h2>
        </div>
        <div className="module-grid">
          {solution.related.map((item) => (
            <Link className="module-card" key={item.to} to={item.to}>
              <Workflow size={18} />
              <h3>{item.label}</h3>
              <span className="inline">Explore <ArrowRight size={14} /></span>
            </Link>
          ))}
          <Link className="module-card" to="/features">
            <FileText size={18} /><h3>All Revercue features</h3><span className="inline">See features <ArrowRight size={14} /></span>
          </Link>
          <Link className="module-card" to="/pricing">
            <Receipt size={18} /><h3>Plans and pricing</h3><span className="inline">Compare plans <ArrowRight size={14} /></span>
          </Link>
          <Link className="module-card" to="/guides">
            <FileSignature size={18} /><h3>Product guides</h3><span className="inline">Read guides <ArrowRight size={14} /></span>
          </Link>
          <Link className="module-card" to="/about">
            <Users size={18} /><h3>Why Revercue</h3><span className="inline">Our approach <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>

      <section className="section text-center">
        <h2>Keep the client work connected.</h2>
        <p className="muted">Start with the free plan and build your next client workflow in Revercue.</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 20 }}>
          <AuthActionStart className="btn btn-primary btn-lg">Start Free</AuthActionStart>
          <Link to="/features" className="btn btn-secondary btn-lg">Explore features</Link>
        </div>
      </section>
    </div>
  );
}
