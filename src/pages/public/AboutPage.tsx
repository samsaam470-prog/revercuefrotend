import { AuthActionStart } from "../../components/auth/AuthActionStart";

const STATUS_ROWS = [
  ["Available now", "Free plan: 5 active documents, one-month retention, no card required. Proposals, contracts, forms, invoices, a client record, and opened/not-opened tracking."],
  ["Invite-only", "Starter, Growth, and Scale plans are currently available by invitation."],
  ["In beta", "Teams is being tested with real teams. Applying or joining the beta does not automatically start a paid subscription."],
  ["Not available yet", "In-app payment processing, automated message sending or scheduling, annual billing, and integrations."],
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
            I spent 21 months freelancing and learned how much time disappears into the work around
            the work. Proposals lived in one place, contracts in another, requirements arrived over
            messages, invoices were made somewhere else, and the client context was scattered across
            folders and conversations.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            The frustrating part was not creating each document. It was keeping the whole client
            relationship connected: remembering what had been promised, what the client had seen,
            what was still needed, and what should happen next.
          </p>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            Revercue is my attempt to make that thread one connected workflow. A proposal can lead
            into a contract, a requirement form, and an invoice, with the client record keeping the
            context together. Clients receive a clear link they can open and respond to, rather than
            another attachment to track down.
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
          Revercue is built for independent professionals and small teams who want a more joined-up
          way to move client work from first proposal to final invoice, without making clients learn
          another complicated workspace.
        </p>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Product status</p>
          <h2>Where we are today</h2>
          <p>Here is what is available, what is being tested, and what is still on the roadmap.</p>
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
            <strong>Payments:</strong> clients can pay using an external payment link or bank
            transfer and provide proof where enabled. Revercue does not process card payments or
            send payouts inside the app.
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Follow-ups:</strong> Revercue can show reminders and suggested next steps, but it
            does not automatically send or schedule messages on your behalf.
          </p>
          <p className="muted" style={{ lineHeight: 1.75 }}>
            <strong>Integrations:</strong> external app integrations are not available yet. We will
            share changes as they become real and ready to use.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Our Founder's Commitment</p>
          <h2>Be clear. Build what works.</h2>
        </div>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          I will be honest about what is ready, what is experimental, and what is not built yet. I
          will not describe a roadmap idea as a working feature or promise a date just to make the
          product sound bigger. The goal is to earn trust through useful work and steady progress.
        </p>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Our Team's Commitment</p>
          <h2>Your work deserves care.</h2>
        </div>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          We treat client and document information with care. Team access to account details is for
          support and billing; it is not permission to casually inspect the contents of your
          documents. We aim to collect only what the product needs, protect it, and make product
          decisions with privacy in mind.
        </p>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: "left", margin: 0 }}>
          <p className="eyebrow">Get Involved</p>
          <h2>Help shape what comes next.</h2>
        </div>
        <div className="inline" style={{ gap: 12, flexWrap: "wrap" }}>
          <AuthActionStart className="btn btn-primary">Try Revercue</AuthActionStart>
          <Link to="/pricing" className="btn btn-secondary">Join the waitlist</Link>
          <Link to="/beta" className="btn btn-secondary">Apply for Teams beta</Link>
          <Link to="/contact" className="btn btn-secondary">Send Feedback</Link>
        </div>
      </section>
    </div>
  );
}
