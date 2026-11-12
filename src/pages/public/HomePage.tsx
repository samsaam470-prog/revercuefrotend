import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileSignature,
  FileText,
  FormInput,
  Receipt,
  Users,
} from "lucide-react";
import { CodeVisual } from "../../components/visuals";
import { FAQItem } from "../../components/shared/FAQItem";
import { FAQS } from "../../lib/faqs";
import { PLANS } from "../../lib/constants";

const MODULES = [
  { icon: FileText, title: "Proposals", body: "Interactive links with packages, FAQs and questions." },
  { icon: FileSignature, title: "Contracts", body: "Approve, decline, or ask a question." },
  { icon: FormInput, title: "Forms", body: "Adaptive requirement forms with branching." },
  { icon: Receipt, title: "Invoices", body: "Pay by link, or account details with proof." },
  { icon: Users, title: "CRM", body: "The client record, the communication log, the follow-ups." },
];

const STEPS = [
  { num: "01", title: "Create", body: "Build the proposal from a template." },
  { num: "02", title: "Share", body: "Send the link from your own account." },
  { num: "03", title: "Track", body: "See who opened, what they answered, what's next." },
];

export function HomePage() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? FAQS : FAQS.slice(0, 12);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Your client work is one thread</p>
        <h1>Your client work is one thread.</h1>
        <p className="lede">
          {"Proposal. Contract. Form. Invoice. Client. In one place, not five.\nInteractive links, not PDFs. The client record builds itself."}
        </p>
        <div className="hero-ctas">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Start Free
          </Link>
          <Link to="/pricing" className="btn btn-secondary btn-lg">
            See Pricing
          </Link>
        </div>
        <p className="trust">Free plan. No credit card. 2 minutes to set up.</p>
        <div className="visual-frame hero-frame">
          <CodeVisual name="DashboardVisual" />
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>One thread, three steps.</h2>
        </div>
        <div className="thread-grid">
          {STEPS.map((step) => (
            <div className="step-card" key={step.num}>
              <span className="num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
        <div className="visual-frame">
          <CodeVisual name="BuilderVisual" />
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>Everything in one place.</h2>
        </div>
        <div className="module-grid">
          {MODULES.map((module) => (
            <div className="module-card" key={module.title}>
              <module.icon size={22} strokeWidth={1.6} />
              <h3>{module.title}</h3>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>What your client sees.</h2>
          <p>A clean page. Your brand. No login. No PDF.</p>
        </div>
        <div className="two-up">
          <div className="visual-frame">
            <CodeVisual name="ProposalVisual" />
          </div>
          <div className="visual-frame">
            <CodeVisual name="InvoiceVisual" />
          </div>
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>Simple, honest pricing.</h2>
          <p>Free is available now. The paid plans are invite-only. Teams is in beta.</p>
        </div>
        <div className="pricing-chips">
          {PLANS.map((plan) => (
            <Link to="/pricing" className="chip" key={plan.id}>
              <b>{plan.price === null ? `$${plan.base}` : `$${plan.price}`}</b>
              <span>
                {plan.name}
                {plan.price === null ? " base" : ""} ·{" "}
                {plan.status === "available"
                  ? "available now"
                  : plan.status === "beta"
                    ? "in beta"
                    : "waitlist"}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/pricing" className="btn btn-secondary">
            See full pricing <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>Questions, answered.</h2>
          <p>The first twelve, then the rest. No modal, no accordion library.</p>
        </div>
        <div className="faq-list">
          {visible.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        {!showAll && FAQS.length > 12 && (
          <div className="text-center mt-6">
            <button type="button" className="btn btn-ghost" onClick={() => setShowAll(true)}>
              Show all {FAQS.length}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
