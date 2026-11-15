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
        <h2 className="serif" style={{ fontSize: 32, marginBottom: 24 }}>
          Built by a freelancer, for freelancers.
        </h2>
        <div className="stack-6">
          <p className="muted" style={{ lineHeight: 1.8 }}>
            I am a freelancer. I have been one for years. And for years, I had the same problem.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            The client work was never in one place. The proposal was a Google Doc. The contract was a
            PDF in an email. The requirement form was a Google Form. The invoice was a spreadsheet.
            The client record was a folder in Drive, a thread in WhatsApp, a note in my phone. Five
            tools, five tabs, five versions of the same client. I spent more time moving between the
            tools than doing the work.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            The worst part was not the tools. It was the lost thread. A proposal was sent, and I did
            not know if it was opened. A contract was signed, and I did not know if the client had
            read the revision clause. An invoice was paid, and I did not know which project it was
            for. The client asked a question, and I searched three apps to find the context. The work
            was there; the thread was not.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            I tried the all-in-one tools. They were toolboxes. They gave me more modules, more
            settings, more dashboards. They did not give me the thread. They gave me a place to manage
            the work, not a way to connect it. The proposal was still a separate document. The
            contract was still a separate file. The client was still a row in a database. The thread
            was still in my head.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            So I decided to build the tool I wanted. One thread. The proposal flows into the contract.
            The contract flows into the form. The form flows into the invoice. The invoice flows into
            the client record. The client record is the thread's home. The documents are interactive
            links, not PDFs. The client opens a link, reads, answers, selects a package, and I see the
            activity. The client record builds itself. I do not re-type the client's details. I do not
            search for the context. The thread is there.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            I built Revercue because I was tired of losing the thread. I built it for the freelancer
            who is tired of the same. The product is not a toolbox. It is the thread. Your work should
            speak, not you.
          </p>
          <p className="caption">— The founder, a freelancer.</p>
        </div>
      </section>

      <section className="section">
        <p className="caption" style={{ lineHeight: 1.8 }}>
          The product is built to feel like one workspace, not five tools. The dark base, the gold,
          the serif headlines. The documents look like the product, not a generic template. The
          design is the thread's visual language.
        </p>
        <p className="caption" style={{ lineHeight: 1.8, marginTop: 12 }}>
          Revercue does not use AI. It uses patterns. Every suggestion is a prompt you click, never an
          action taken for you. The data is yours. The team sees the account details, not the
          content. The documents are rented; the CRM record is owned.
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
