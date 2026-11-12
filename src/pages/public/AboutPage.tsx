import { Link } from "react-router-dom";

const BELIEFS = [
  "The thread matters more than any single document.",
  "The client should not need an account to read a proposal.",
  "The product should not use a model to guess. Patterns are enough.",
  "Your data is yours. We store it. We do not read it.",
];

export function AboutPage() {
  return (
    <div className="page page-narrow">
      <div className="page-head">
        <p className="eyebrow">About</p>
        <h1>Why Revercue exists.</h1>
      </div>

      <div className="stack-6">
        <p className="muted" style={{ lineHeight: 1.8 }}>
          A freelancer writes a proposal in a word processor, sends it as a PDF, negotiates in
          WhatsApp, writes a contract in an e-sign tool, collects requirements over four emails,
          invoices from an accounting app, and keeps the client history in their head. Five tools,
          five formats, five handoffs. The thread — the connection between what was promised and what
          was paid — is what gets lost.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          The thesis is one line: a thread, not disconnected workflows. One client, one place, from
          proposal to payment. The documents are links, so the client can read without an account,
          answer an embedded question, select a package and ask something without leaving the page.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          The promise is quieter than a promise usually is. The client record builds itself. The
          suggestions learn your pattern instead of inventing one. The team sees your account details
          for support and billing, not the content of your work.
        </p>
      </div>

      <section className="section">
        <h2 className="serif" style={{ fontSize: 26, marginBottom: 16 }}>
          What we believe
        </h2>
        <ul className="stack-3">
          {BELIEFS.map((belief) => (
            <li key={belief} className="inline" style={{ alignItems: "flex-start" }}>
              <span style={{ color: "var(--gold)", lineHeight: 1.5 }}>—</span>
              <span className="muted">{belief}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="serif" style={{ fontSize: 26, marginBottom: 12 }}>
          The roadmap
        </h2>
        <p className="muted">
          Today: the thread — the five modules, the builder, the CRM, the suggestions and the public
          site. Next: the API. Then the MCP, and later the Agent Hub, starting with Teams. Nothing on
          that list replaces the thread; each one extends it.
        </p>
      </section>

      <div className="card card-md mt-8">
        <h3 style={{ marginBottom: 8 }}>Start with the Free plan.</h3>
        <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>
          Five active documents, one-month retention, the whole thread. No credit card.
        </p>
        <Link to="/signup" className="btn btn-primary">
          Start Free
        </Link>
      </div>
    </div>
  );
}
