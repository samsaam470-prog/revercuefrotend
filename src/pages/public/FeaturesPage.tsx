import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
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

interface Section {
  id: string;
  title: string;
  copy: string;
  bullets: string[];
  visual: VisualName;
}

const SECTIONS: Section[] = [
  {
    id: "proposals",
    title: "Proposals",
    copy: "A proposal is a page, not a file. Packages, FAQs and embedded questions, with an info icon wherever a question needs one.",
    bullets: [
      "Packages: Basic, Standard, Premium — rename or remove them",
      "Collapsible FAQs and per-question Ask a Question",
      "Optional password protection on Growth and Scale",
      "The client selects a package; you see the click",
      "No Accept button — the reply happens in your own inbox",
    ],
    visual: "ProposalVisual",
  },
  {
    id: "contracts",
    title: "Contracts",
    copy: "Approve, Decline, or I Have Questions. After approval the thread continues to the form or the invoice.",
    bullets: [
      "Three client actions, stated honestly as not an e-signature",
      "Choose the after-approval step: form, invoice or PDF",
      "Scope, payment terms, revisions and cancellation in one page",
      "Every action lands in the communication log",
      "Decline takes an optional reason",
    ],
    visual: "ContractVisual",
  },
  {
    id: "forms",
    title: "Requirement forms",
    copy: "A question builder, not a canvas. Seven question types and branching on Growth and Scale.",
    bullets: [
      "Short text, long text, file upload, single, multiple, combined, dropdown",
      "Branching: if the answer is this, show those questions",
      "One page or multi-page with a progress indicator",
      "Custom thank-you page on Scale",
      "The Prompt Creator assembles a structured paragraph from the answers",
    ],
    visual: "FormVisual",
  },
  {
    id: "invoices",
    title: "Invoices",
    copy: "Line items, tax, totals, and two ways to get paid: a payment link or your account details with a proof upload.",
    bullets: [
      "Auto-generated invoice number (INV-YEAR-NNNN)",
      "Option A: external payment link",
      "Option B: bank details plus optional proof upload",
      "Confirm payment records revenue for the tracker",
      "Overdue state is visible to the client, honestly",
    ],
    visual: "InvoiceVisual",
  },
  {
    id: "crm",
    title: "CRM",
    copy: "The client record is the thread's home. The communication log is the main body, not a tab.",
    bullets: [
      "The log records messages, replies, follow-ups, documents",
      "Notes are plan-limited and shown honestly",
      "Follow-ups due surface on the dashboard",
      "Interest level on Scale, with the full arithmetic",
      "The record builds itself from the documents",
    ],
    visual: "CrmVisual",
  },
  {
    id: "builder",
    title: "The builder",
    copy: "The template is the starting layout, the block library is the toolset, and your edits are structured data.",
    bullets: [
      "Three panels: sections and blocks, the canvas, the properties",
      "The canvas is a white page inside the dark app",
      "Undo, redo, preview and a live auto-save indicator",
      "60-second interval, session-end beacon, explicit save",
      "The share sheet never sends for you",
    ],
    visual: "BuilderVisual",
  },
  {
    id: "suggestions",
    title: "Suggestions",
    copy: "Patterns from your own log, not a model. A follow-up that is due, a contract that should exist, a client worth reopening.",
    bullets: [
      "Growth: follow-up suggestions",
      "Scale: document suggestions, interest flags, form reminders",
      "Do it opens the right screen with the client filled in",
      "Dismiss removes it for that client or document",
      "You are always the actor",
    ],
    visual: "SuggestionVisual",
  },
];

const ICONS: Record<string, LucideIcon> = {
  proposals: FileText,
  contracts: ScrollText,
  forms: ListChecks,
  invoices: Receipt,
  crm: Users,
  builder: LayoutDashboard,
  suggestions: Sparkles,
};

const SUBS: Record<string, { label: string; copy: string }[]> = {
  proposals: [
    { label: "Package selection", copy: "The client picks a package and you see the click." },
    { label: "Embedded questions", copy: "Ask inside the page, with an info icon on the ones that need it." },
    { label: "Ask the helper", copy: "Select a sentence, ask for a clearer version, keep what you like." },
  ],
  contracts: [
    { label: "Three honest actions", copy: "Approve, Decline, or I Have Questions — no e-signature claim." },
    { label: "After approval", copy: "Send the form, the invoice, or the PDF next." },
    { label: "Ask the helper", copy: "Tighten a clause in the builder without retyping it." },
  ],
  forms: [
    { label: "Seven question types", copy: "From short text to file upload, with branching on Growth and Scale." },
    { label: "Ask the client instead", copy: "Every question allows a question back, so nothing stalls." },
    { label: "Ask the helper", copy: "Rewrite a description so the request is understood the first time." },
  ],
  invoices: [
    { label: "Two ways to pay", copy: "A payment link, or your account details with a proof upload." },
    { label: "Overdue, honestly", copy: "The client sees the state, and so do you." },
    { label: "Ask the helper", copy: "Clearer notes on the invoice, written in one selection." },
  ],
  crm: [
    { label: "The communication log", copy: "Direction, channel, next step, follow-up date — the memory of the thread." },
    { label: "The interest level", copy: "Arithmetic over real behaviour, with the working shown." },
    { label: "The 15-day summary", copy: "What was sent, what came back, what is next." },
  ],
  builder: [
    { label: "Three panels", copy: "Sections and blocks, the page, the properties of the selected block." },
    { label: "The block library", copy: "Twenty elements that stay readable instead of forty that do not." },
    { label: "The post-document review", copy: "A score and a short list of what to fix, before you send." },
  ],
  suggestions: [
    { label: "Follow-ups", copy: "Due when the client has gone quiet, timed by your own habit on Scale." },
    { label: "Document suggestions", copy: "A contract when a proposal is answered, an invoice when work lands." },
    { label: "You are the actor", copy: "Every card hands you a line and a link. Nothing is sent for you." },
  ],
};

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
    <div className="page page-wide">
      <div className="page-head">
        <p className="eyebrow">Features</p>
        <h1>Five modules, one thread.</h1>
        <p>
          Every part of the work shares the same client, the same brand and the same record. Nothing
          is copy-pasted between tools because there is only one tool.
        </p>
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
        {SECTIONS.map((section, index) => (
          <section id={section.id} key={section.id} className="section" style={{ paddingTop: 24 }}>
            <div className={`two-up`} style={{ direction: index % 2 ? "rtl" : "ltr" }}>
              <div style={{ direction: "ltr" }}>
                <p className="eyebrow">0{index + 1}</p>
                <div className="feature-title">
                  <span className="feature-icon">
                    {(() => {
                      const Icon = ICONS[section.id] ?? Sparkles;
                      return <Icon size={20} />;
                    })()}
                  </span>
                  <h2 className="serif" style={{ fontSize: 28, margin: 0 }}>
                    {section.title}
                  </h2>
                </div>
                <p className="muted" style={{ marginBottom: 16 }}>
                  {section.copy}
                </p>
                <ul className="stack-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="inline" style={{ alignItems: "flex-start" }}>
                      <Check size={15} color="var(--gold)" style={{ flex: "0 0 auto", marginTop: 3 }} />
                      <span className="muted" style={{ fontSize: 14 }}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="feature-subs">
                  {(SUBS[section.id] ?? []).map((sub) => (
                    <div className="feature-sub" key={sub.label}>
                      <span className="feature-sub-dot" />
                      <div>
                        <p className="feature-sub-label">{sub.label}</p>
                        <p className="muted" style={{ fontSize: 13 }}>
                          {sub.copy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/signup" className="btn btn-secondary btn-sm mt-6">
                  Start Free
                </Link>
              </div>
              <div style={{ direction: "ltr" }}>
                <CodeVisual name={section.visual} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section">
        <div className="section-head">
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
