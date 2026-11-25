import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  FileText,
  ScrollText,
  ListChecks,
  Receipt,
  Users,
  LayoutDashboard,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CodeVisual, type VisualName } from "../../components/visuals";
import { faqsByGroup } from "../../lib/faqs";
import { FAQItem } from "../../components/shared/FAQItem";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

interface Section {
  id: string;
  title: string;
  copy: string;
  highlights: string[];
  visual: VisualName;
  icon: LucideIcon;
}

const SECTIONS: Section[] = [
  {
    id: "proposals",
    title: "Proposals",
    copy: "Proposals are shareable web pages with packages, FAQs and client questions, so the client can choose and respond from one link.",
    highlights: ["Packages with Basic, Standard and Premium starting tiers", "Collapsible FAQs and per-question Ask a Question", "Approve or decline from the bottom of the page"],
    visual: "ProposalVisual",
    icon: FileText,
  },
  {
    id: "contracts",
    title: "Contracts",
    copy: "Scope, payment terms, revisions and cancellation on one page, with a typed-name signature, explicit consent and a recorded date.",
    highlights: ["Freelancer signs the exact version before publishing", "Client signs the same version, with the date recorded", "Choose the after-approval step: form, invoice or PDF"],
    visual: "ContractVisual",
    icon: ScrollText,
  },
  {
    id: "requirement-forms",
    title: "Requirement forms",
    copy: "A question builder for project briefs, with seven question types, branching on Growth and Scale, and a structured brief at the end.",
    highlights: ["Short text, long text, file upload, choice and dropdown questions", "Branching that shows follow-ups only when they apply", "The Prompt Creator assembles answers into a brief"],
    visual: "FormVisual",
    icon: ListChecks,
  },
  {
    id: "invoices",
    title: "Invoices",
    copy: "Line items, tax and totals, numbered automatically, with a payment link or your bank details and an optional proof upload.",
    highlights: ["Automatic numbers in the format INV-YEAR-NNNN", "Two ways to get paid: a payment link or bank details", "Confirmed payments are recorded in the revenue tracker"],
    visual: "InvoiceVisual",
    icon: Receipt,
  },
  {
    id: "crm",
    title: "CRM",
    copy: "A client record with a communication log at its centre, notes, follow-up reminders, and a record that fills in as you work.",
    highlights: ["A communication log of messages, replies and documents", "Follow-ups that are due appear on the dashboard", "Documents linked to the record, and messages you log by hand"],
    visual: "CrmVisual",
    icon: Users,
  },
  {
    id: "builder",
    title: "The builder",
    copy: "A three-panel editor with a template as the starting layout, a block library, auto-save, and a review before you share.",
    highlights: ["Sections and blocks, the canvas and the properties in three panels", "Auto-save every 60 seconds and at session end", "A review with a score before the document goes out"],
    visual: "BuilderVisual",
    icon: LayoutDashboard,
  },
  {
    id: "suggestions",
    title: "Suggestions",
    copy: "Follow-ups, contracts and invoices suggested from patterns in your own client log. Every card hands the action back to you.",
    highlights: ["Follow-ups for clients who have gone quiet", "Document suggestions after proposals and delivered work", "Do it opens the right screen, Dismiss removes the card"],
    visual: "SuggestionVisual",
    icon: Sparkles,
  },
];

const FOUNDER_NOTE: string[] = [
  "I didn't set out to build seven features. I set out to fix one moment: the moment a client says yes, and I have to rebuild the whole project from memory across three apps. Most of the decisions in this product come from that moment, and from the mistakes I made while I was living it. This page is where I explain the reasoning, because a feature list tells you what a tool does but not why it does it that way.",
  "Why a document is a link, not a file. A PDF is familiar, and I know that switching away from it asks something of you. I chose a link because a link can do two things a file can't. It can sit next to a question the client needs answered, and it tells you what happened after you sent it. Once you can see whether a proposal was opened, you stop guessing, and you stop sending the same follow-up email twice. We also chose not to watermark anything. A single footer line identifies the platform, and it's removed on Growth and above, because a document that looks like a template works against the person who sent it.",
  "Why tracking has tiers. I want to be careful here. Knowing that someone opened your document is useful. Knowing exactly how long they stared at a price can start to feel like surveillance, and I don't think a freelancer should have to be uncomfortable about how they follow up. So the basic signal, opened or not, is on every plan. The finer detail, such as time spent, clicks, and the session timeline, is limited to the plans where it helps you decide what to do next, and the raw events are reduced to a single time total after five days. The goal is to tell you where to look. It is not meant to tell you what the client thinks.",
  "Why the signature is what it is. Contracts are where I was most tempted to oversell. A typed name, an explicit consent tick, a recorded date, and the exact version that was signed is a real, practical record of agreement. It is not a qualified electronic signature, and it doesn't verify identity. I'd rather say that plainly than let a freelancer assume more protection than they have. The freelancer signs the exact version first, before the client is asked to commit, because a contract that only one side has agreed to is not much of a contract. For work that needs stronger proof, use a dedicated signing service. I'd rather you hear that from me than discover it during a dispute.",
  "Why requirement forms are short on purpose. The most expensive part of a project is often the week spent waiting for answers that should have been collected on day one. Forms are how I stopped doing that. But a long form gets abandoned, so the design rule is to ask only what the work needs and to show a question only when an earlier answer makes it relevant. Branching exists for that reason. The Prompt Creator exists because the answers are only useful once they become a brief you can act on.",
  "Why invoices show overdue to the client. This one surprises people. An overdue state visible to the client can feel confrontational. I think hiding it does more harm. A client who can see that a payment is outstanding, along with the invoice number, the amount, and the payment instructions, can settle it without an awkward conversation. Payment still happens through the method you choose, and you confirm it in Revercue, so the record matches what actually happened in your bank.",
  "Why suggestions never send anything. The suggestion cards are there to remind you of what is due: a follow-up, a contract that should follow an accepted proposal, an invoice for delivered work. They are built from patterns in your own client history. But client communication is the part of the work that depends most on your judgment, and no pattern knows the relationship the way you do. So every suggestion hands the decision back to you. Do it opens the right screen with the client filled in. Dismiss removes it. Nothing reaches a client without you pressing send.",
  "Why the builder keeps your edits as structure. Free-form layouts are tempting, and they are slow to keep consistent. A block-based builder, with a template as the starting point, means your proposals, contracts, and forms look like your work across every client. The review before sharing exists because the small gaps are the ones that cause questions later: a missing date, an empty section, an unclear next step. And the share sheet never sends on your behalf, because the last step should always be yours.",
  "What we chose not to build. Revercue does not do accounting, tax, time-tracking for billing, or project boards. Those tools exist, and they do them well. A freelancer who tries to run every part of the business in one product usually ends up with a worse version of each. Revercue covers the client thread: what was proposed, what was agreed, what was asked, what was invoiced, and what happens next. Keeping that scope narrow is how we keep it reliable.",
  "If you take one thing from these pages, make it this: the work is rarely what goes wrong. What goes wrong is everything around it. Start with the proposal you are about to send, and let the rest of the thread follow from it.",
];

export function FeaturesPage() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const featureFaqs = faqsByGroup(["documents", "tracking"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page page-wide feature-doc">
      <div className="page-head">
        <p className="eyebrow">Features</p>
        <h1>Seven features, one client thread.</h1>
        <p>
          Every part of the work shares the same client, the same brand and the same record. Nothing
          is copy-pasted between tools because there is only one tool.
        </p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 24 }}>
          <AuthActionStart className="btn btn-primary btn-lg">Start Free</AuthActionStart>
          <Link to="/pricing" className="btn btn-secondary btn-lg">See pricing</Link>
        </div>
      </div>

      <div className="tabs" style={{ position: "sticky", top: 72, background: "var(--bg-base)", zIndex: 20, paddingTop: 8 }}>
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`tab${active === section.id ? " active" : ""}`}
          >
            {section.title}
          </a>
        ))}
      </div>

      <div className="stack-8">
        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <section id={section.id} key={section.id} className="section" style={{ paddingTop: 24 }}>
              <div className="two-up" style={{ direction: index % 2 ? "rtl" : "ltr" }}>
                <div style={{ direction: "ltr" }}>
                  <p className="eyebrow">0{index + 1}</p>
                  <div className="feature-title">
                    <span className="feature-icon"><Icon size={20} /></span>
                    <h2 className="serif" style={{ margin: 0 }}>{section.title}</h2>
                  </div>
                  <p className="muted" style={{ marginBottom: 16 }}>{section.copy}</p>
                  <ul className="stack-2">
                    {section.highlights.map((highlight) => (
                      <li key={highlight} className="inline" style={{ alignItems: "flex-start" }}>
                        <Check size={15} color="var(--gold)" style={{ flex: "0 0 auto", marginTop: 3 }} />
                        <span className="muted" style={{ fontSize: 16 }}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="btn-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                    <Link className="btn btn-primary btn-sm" to={`/features/${section.id}`}>
                      Read the full guide <ArrowRight size={14} />
                    </Link>
                    <AuthActionStart className="btn btn-secondary btn-sm">Start Free</AuthActionStart>
                  </div>
                </div>
                <div style={{ direction: "ltr" }}>
                  <CodeVisual name={section.visual} />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">From the founder</p>
          <h2>A note on how these features were built.</h2>
        </div>
        {FOUNDER_NOTE.map((paragraph) => (
          <p className="muted" key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <p className="caption" style={{ marginTop: 16 }}>— Founder, Revercue</p>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Feature requests</p>
          <h2>Tell us what you need.</h2>
        </div>
        <p className="muted">
          If you want a feature, or anything else that would make Revercue more useful for your work, send it through the <Link to="/contact">contact form</Link>. I read the requests myself. I can't promise that every request will be accepted, but every one helps shape what we build next.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Questions</p>
          <h2>Questions about the details.</h2>
        </div>
        <div className="faq-list">
          {featureFaqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}
