import { PublicLayout } from '../../components/layout/PublicLayout';
import { DashboardVisual } from '../../components/visuals/DashboardVisual';
import { BuilderVisual } from '../../components/visuals/BuilderVisual';
import { ProposalVisual } from '../../components/visuals/ProposalVisual';
import { InvoiceVisual } from '../../components/visuals/InvoiceVisual';
import { StartFreeBand } from '../../components/layout/StartFreeBand';
import { faqs } from '../../data/faqs';

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="hero">
        <p className="eyebrow">YOUR CLIENT WORK IS ONE THREAD</p>
        <h1 className="display">Your work should speak, not you.</h1>
        <p className="body-secondary">Proposal. Contract. Form. Invoice. Client. In one place, not five. Interactive links, not PDFs. The client record builds itself.</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="/signup">Start Free</a>
          <a className="btn btn-ghost" href="/pricing">See Pricing</a>
        </div>
        <p className="caption">Free plan. No credit card. 2 minutes to set up.</p>
        <div className="visual-card"><DashboardVisual /></div>
      </section>

      <section className="thread">
        <h2 className="headline">One thread, three steps.</h2>
        <div className="steps">
          <div className="step"><span className="step-num">01</span><h3>Create</h3><p>Build the proposal from a template.</p></div>
          <div className="step"><span className="step-num">02</span><h3>Share</h3><p>Send the link from your own account.</p></div>
          <div className="step"><span className="step-num">03</span><h3>Track</h3><p>See who opened, what they answered, what's next.</p></div>
        </div>
        <div className="visual-card"><BuilderVisual /></div>
      </section>

      <section className="modules">
        <h2 className="headline">Everything in one place.</h2>
        <div className="module-grid">
          <div className="module-card"><h3>Proposals</h3><p>Interactive links with packages, FAQs, questions.</p></div>
          <div className="module-card"><h3>Contracts</h3><p>Approve, decline, or ask a question.</p></div>
          <div className="module-card"><h3>Forms</h3><p>Adaptive requirement forms with branching.</p></div>
          <div className="module-card"><h3>Invoices</h3><p>Pay by link or account details + proof.</p></div>
          <div className="module-card"><h3>CRM</h3><p>The client record, the communication log, the follow-ups.</p></div>
        </div>
      </section>

      <section className="client-view">
        <h2 className="headline">What your client sees.</h2>
        <p className="body-secondary">A clean page. Your brand. No login. No PDF.</p>
        <div className="visual-row">
          <div className="visual-card"><ProposalVisual /></div>
          <div className="visual-card"><InvoiceVisual /></div>
        </div>
      </section>

      <section className="faqs">
        <h2 className="headline">Questions, answered.</h2>
        {faqs.slice(0, 12).map((f, i) => (
          <details key={i} className="faq-item">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <a className="btn btn-ghost" href="/guides">Show all 100</a>
      </section>

      <StartFreeBand />
    </PublicLayout>
  );
}
