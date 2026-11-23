import { Link } from "react-router-dom";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

const STATUS_ROWS = [
  ["Available now", "Free, Starter, Growth, and Scale. Start on the free plan with no card, or choose a paid plan when you are ready. Proposals, contracts, requirement forms, invoices, and the client record are included, with tracking that grows with your plan."],
  ["In beta", "Teams. We are testing it with real teams. Joining the beta does not automatically start a paid subscription."],
  ["Not available yet", "Built-in card payments and payouts for client invoices, automated message sending and scheduling, annual billing, and integrations with other tools."],
];

export function AboutPage() {
  return (
    <div className="page page-narrow">
      <div className="page-head">
        <p className="eyebrow">About Revercue</p>
        <h1>Your work should speak, not you.</h1>
        <p>
          Revercue keeps every client project in one connected thread: the proposal, the contract,
          the requirement form, the invoice, and the client record. Your clients get a clear link
          instead of a PDF, and you get one place to see where every client relationship stands.
        </p>
        <div className="inline mt-6" style={{ gap: 12, flexWrap: "wrap" }}>
          <AuthActionStart className="btn btn-primary">Start Free</AuthActionStart>
          <Link to="/pricing" className="btn btn-secondary">See Pricing</Link>
        </div>
      </div>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Why Revercue Exists</p>
          <h2>From the founder</h2>
        </div>
        <div className="stack-4">
          <p className="muted" style={{ lineHeight: 1.8 }}>
            I started Revercue because I spent 21 months working as a freelancer, and I learned most
            of what I know about client work the hard way.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            I sent proposals and never knew whether anyone had opened them. I waited weeks for
            clients to answer simple questions, because the answers were buried in emails, messages,
            and attachments. I rewrote the same requirement forms for every new client. I chased
            invoices that should have been paid on time, and I felt uncomfortable every time I did.
            Each problem looked small on its own. Together they cost me clients, time, and confidence.
            I came to believe that the work itself was rarely the problem. The problem was the
            experience around the work: it was unclear, scattered across too many tools, and hard
            for clients to trust.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            Revercue began as my answer to that problem. We wanted one place where the proposal that
            started a client relationship, the contract that sealed it, the form that collected
            requirements, the invoice that got paid, and the client record that holds it all stay
            connected. We also wanted clients to receive something better than a PDF. A PDF
            disappears into an inbox, and you rarely know whether it was read. A Revercue document
            is a link. Your client can read it, answer questions on the page, choose a package, and
            ask a question without leaving the page, and you can see what happened.
          </p>
          <p className="caption">— Founder, Revercue</p>
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Who It Is For</p>
          <h2>Freelancers and small agencies.</h2>
        </div>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          Revercue is built for independent freelancers and small agencies: people who do excellent
          work and deserve a client experience that matches it. I know these people because I was
          one of them. I know how much time disappears into repetitive admin, and how much a clear,
          polished document can change the way a client sees you.
        </p>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Product status</p>
          <h2>Where we are today</h2>
          <p>We are at an early stage, and I would rather be precise about what exists than overstate it.</p>
        </div>
        <div className="about-status-table-wrap">
          <table className="about-status-table">
            <tbody>
              {STATUS_ROWS.map(([status, description]) => (
                <tr key={status}>
                  <th scope="row">{status}</th>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="stack-3 mt-6">
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Team features.</strong> Shared workspaces, member roles, and team attribution
            are in beta. Teams is being shaped by the teams testing it now.
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Payment processing.</strong> Invoices can already be paid by an external payment
            link or by bank transfer with proof of payment. Built-in card payments and payouts for
            client invoices are not available yet. Money requires more care than any other feature,
            and we will not launch it until we are confident it works reliably for you and your clients.
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Automated messages and scheduling.</strong> Follow-up reminders and a suggestion
            engine that learns from your own habits are part of the product. Revercue does not send
            messages on your behalf. Scheduled sending is not available yet.
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Integrations.</strong> We are listening to requests for connections to the tools
            you already use. None are available today.
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Paid-plan billing.</strong> Starter, Growth, and Scale subscriptions use Whop
            checkout. Whop processes the payment details you submit during checkout; Revercue
            receives the subscription and payment-status information needed to manage your plan.
            This is separate from payments your clients make against your invoices.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Our Founder's Commitment</p>
          <h2>A promise I intend to keep.</h2>
        </div>
        <div className="stack-4">
          <p className="muted" style={{ lineHeight: 1.8 }}>
            I cannot promise all of these on day one, and I would rather tell you that plainly than
            promise more than we can deliver. What I can promise is that I will work hard to bring
            as much of this as we responsibly can, in the order that makes Revercue most useful to
            the people who depend on it.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            I also cannot guarantee that any document you send will lead to a signed contract or a
            paid invoice. Those outcomes depend on many things beyond our control. What I can
            promise is that Revercue is designed to help you present your work clearly, keep every
            client conversation in one place, and give your clients an experience that reflects the
            quality of what you deliver.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            When something is available, I will say so. When it is in beta or still in development,
            I will say that just as clearly. You deserve to know what you are getting, what you are
            not yet getting, and what we are working toward.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            Thank you for giving us the chance to earn your trust.
          </p>
          <p className="caption">— Founder, Revercue</p>
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Our Team's Commitment</p>
          <h2>We want your work to feel lighter.</h2>
        </div>
        <div className="stack-4">
          <p className="muted" style={{ lineHeight: 1.8 }}>
            We, the team behind Revercue, make this commitment to everyone who chooses to build
            their work with us.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            We recognise that freelancers and agencies do not have time to spare. Every hour spent
            wrestling with a tool that creates more work than it removes is an hour taken from
            clients, craft, and the life you are building. We will keep that reality at the centre
            of every decision we make, and we will measure our progress by whether Revercue
            genuinely makes your work lighter, clearer, and more professional.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            We will listen closely to the people who use Revercue. When a freelancer tells us that a
            client did not understand a proposal, that a form was confusing, or that an invoice was
            overlooked, we will examine it carefully. Our roadmap will be shaped by real problems
            described by real people, not by guesses about what might sound impressive.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            We will not make promises we cannot keep. We will not present a planned capability as a
            finished feature, and we will not hide the limits of what exists today.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            We will protect the trust you place in us. The content of your documents and the details
            of your clients belong to you. Our team sees your account details for support and billing,
            not the content of your work, and we will handle your information with care for privacy
            and respect for the relationships each document represents. For paid-plan checkout,
            Whop processes your payment details; Revercue receives the subscription and
            payment-status information needed to manage your plan.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            We will work patiently and steadily. We would rather build a focused product that works
            well than a crowded one that works poorly, and we will release each improvement only
            when it is ready to earn its place in your working life.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            We commit to improving Revercue week after week. We will be honest when we fall short,
            quick to correct our mistakes, and grateful to everyone who helps us do better. We
            would rather let our work speak for us than rely on claims we have not yet earned.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Get Involved</p>
          <h2>Help shape what comes next.</h2>
        </div>
        <div className="stack-3">
          <div>
            <p className="muted" style={{ lineHeight: 1.75 }}>
              <strong>Try Revercue.</strong> Start with the free plan and send your first document. No
              credit card is needed.
            </p>
            <AuthActionStart className="btn btn-primary">Start Free</AuthActionStart>
          </div>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Choose a plan.</strong> Starter, Growth, and Scale are available now, so you can
            pick the plan that fits how much work you send. <Link to="/pricing">See Pricing</Link>
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Join the Teams beta.</strong> If you work with a team and want to help shape how
            Revercue supports collaboration, apply to become a beta partner. <Link to="/beta">Become a Teams Beta Partner</Link>
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Share your feedback.</strong> Tell us what slowed you down, what confused your
            clients, and what you wish Revercue could do. Feedback helps us understand what to
            improve next. <Link to="/contact">Send Feedback</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
