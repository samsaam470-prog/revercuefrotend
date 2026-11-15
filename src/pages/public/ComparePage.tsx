import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPETITORS } from "../../lib/competitors";

export function ComparePage() {
  return (
    <div className="page page-wide">
      <div className="page-head">
        <p className="eyebrow">Compare</p>
        <h1>Revercue, next to the tools you already know.</h1>
        <p>
          Seven comparisons, one job: the proposal, the contract, the requirement form, the invoice
          and the client record, kept on one thread. No competitor bashing — each tool is good at
          what it does, and the question is what happens between the pieces.
        </p>
      </div>

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
          <Link to="/signup" className="btn btn-primary mt-6">
            Start Free
          </Link>
        </div>
      </section>
    </div>
  );
}
