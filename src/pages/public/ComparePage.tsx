import { Link } from "react-router-dom";
import { COMPETITORS } from "../../lib/competitors";
import { COMPETITOR_RESEARCH, PRICING_CHECKED } from "../../lib/competitorResearch";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

export function ComparePage() {
  return (
    <div className="page page-wide">
      <div className="page-head">
        <p className="eyebrow">Compare</p>
        <h1>Revercue, next to the tools you already know.</h1>
        <p>
          Seven comparisons, one job: the proposal, the contract, the requirement form, the invoice
          and the client record, kept on one thread. Every page carries the competitor's current
          published pricing with the date it was checked, and a summary of what independent
          reviewers say, with links to each article. No competitor bashing — each tool is good at
          what it does, and the question is what happens between the pieces.
        </p>
        <p className="caption">
          Competitor pricing was checked on {PRICING_CHECKED}. Every page lists the plans, the six
          sources behind the comparison and ten independent reviews.
        </p>
      </div>

      <section className="card card-lg stack-3" style={{ marginBottom: 24 }}>
        <p className="eyebrow">A message from the founder</p>
        <h2 className="serif" style={{ fontSize: 26 }}>Why I built this comparison</h2>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          When I was freelancing, I compared tools to find a better way to run client work. Most
          tools solved one part well, but the proposal, contract, invoice, and answers about a client
          still ended up scattered across different places.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          Revercue is built around connecting those pieces: the proposal, contract, requirement
          form, invoice, and client record. I am not claiming it is better than every tool. The
          right choice depends on your workflow, your team, and what you need a product to do. This
          page is here to explain what Revercue does, what it costs, and what is still developing so
          you can make an informed comparison.
        </p>
        <p className="caption">— Founder, Revercue</p>
      </section>

      <Link to="/compare/criteria" className="compare-criteria-banner">
        <span>
          <strong>Thirteen questions, eight platforms.</strong> The same breakdown for every tool —
          CRM, projects, automation, invoicing, portal, time, team, pricing.
        </span>
        <span className="compare-more">
          Open the 13-point comparison <ArrowRight size={14} />
        </span>
      </Link>

      <div className="compare-grid">
        {COMPETITORS.map((competitor) => (
          <Link key={competitor.slug} to={`/compare/${competitor.slug}`} className="compare-card">
            <span className="compare-kind">{competitor.kind}</span>
            <h2>{competitor.name}</h2>
            <p>{competitor.summary}</p>
            {COMPETITOR_RESEARCH[competitor.slug] ? (
              <span className="caption">
                From {COMPETITOR_RESEARCH[competitor.slug].pricing[0]?.price.split(",")[0]} · pricing
                checked {PRICING_CHECKED}
              </span>
            ) : null}
            <span className="compare-more">
              Read the comparison <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      <section className="section">
        <div className="card card-lg">
          <h2 className="serif" style={{ fontSize: 26, marginBottom: 12 }}>
            What Revercue is not.
          </h2>
          <p className="muted">
            Revercue is not a CRM replacement. It is not a project manager. It is not an accounting
            tool. It is the thread: the proposal, the contract, the form, the invoice, and the client
            record, in one place. If you already have a CRM, Revercue can sit next to it. If you
            already have an accounting tool, Revercue can sit next to it. The thread is the gap; the
            other tools are the rest.
          </p>
          <AuthActionStart className="btn btn-primary mt-6">
            Start Free
          </AuthActionStart>
        </div>
      </section>
    </div>
  );
}
