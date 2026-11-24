import { ArrowRight } from "lucide-react";
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
          and the client record, kept on one thread. Each page links to the vendor's published
          published pricing with the date it was checked, plus independent review listings where available. No competitor bashing — each tool is good at
          what it does, and the question is what happens between the pieces.
        </p>
        <p className="caption">
          Last verified: {PRICING_CHECKED}. Each page lists the published plans and links to the vendor sources and independent review listings checked for that comparison.
        </p>
      </div>

      <section className="card card-lg stack-3" style={{ marginBottom: 24 }}>
        <p className="eyebrow">A message from the founder</p>
        <h2 className="serif" style={{ fontSize: 26 }}>Why I built this comparison</h2>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          When I was working as a freelancer, I compared tools constantly. I was looking for something that would make my work look professional, keep clients informed, and help me get paid without spending my evenings on administration. Most of the tools I tried solved one part of the problem and left me to connect the rest myself. The proposal lived in one application, the contract in another, the invoice in a third, and the client's replies in my inbox. I never had a clear picture of a client relationship as a whole, and I spent more time searching for information than doing the work the client had hired me for.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          That experience is why I built Revercue the way I did. The proposal, the contract, the requirement form, the invoice, and the client record stay together in one thread for each client. You can see what was sent, what was opened, and what the client has said, without reconstructing the story from several sources. I also wanted clients to receive something better than a PDF attachment. A PDF is difficult to follow up on, and you rarely know whether it was read. A clear link gives your client a simple way to read, respond, and act, and it gives you a clearer view of what happens next.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          I want to be fair to the other tools on this page, and to you as you make your decision. Many of them have been built by talented people who have solved real problems for a long time. Some are better suited to large organisations, some to accounting, and some to highly specialised work. I am not writing this page to claim that Revercue is better than every alternative. The right choice depends on how many clients you manage, how your work is structured, whether you work alone or with a team, and what matters most to you in your day-to-day tools.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          What I can offer is an honest account of what Revercue does, what it costs, and what is still in development. The comparison below describes the plans and features that are available today, and it identifies the capabilities that are still in beta or not yet available. I would rather you know exactly what you are choosing than discover a gap after you have already moved your client work. If a feature you need is not listed as available, please assume it is not available until we say otherwise.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          Every comparison you read should help you make a decision that fits your business. I would rather you compare us carefully and choose what suits you than choose Revercue without understanding what it does. If you try Revercue and it does not fit your work, I want to hear why. That feedback is one of the most useful things we receive, and it guides what we build next.
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
