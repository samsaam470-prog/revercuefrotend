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
    highlights: ["A communication log of messages, replies and documents", "Follow-ups that are due appear on the dashboard", "A record that builds itself from your documents"],
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
        <h1>Seven features, one client thread.</h1>
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
        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <section id={section.id} key={section.id} className="section" style={{ paddingTop: 24 }}>
              <div className="two-up" style={{ direction: index % 2 ? "rtl" : "ltr" }}>
                <div style={{ direction: "ltr" }}>
                  <p className="eyebrow">0{index + 1}</p>
                  <div className="feature-title">
                    <span className="feature-icon"><Icon size={20} /></span>
                    <h2 className="serif" style={{ fontSize: 28, margin: 0 }}>{section.title}</h2>
                  </div>
                  <p className="muted" style={{ marginBottom: 16 }}>{section.copy}</p>
                  <ul className="stack-2">
                    {section.highlights.map((highlight) => (
                      <li key={highlight} className="inline" style={{ alignItems: "flex-start" }}>
                        <Check size={15} color="var(--gold)" style={{ flex: "0 0 auto", marginTop: 3 }} />
                        <span className="muted" style={{ fontSize: 14 }}>{highlight}</span>
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
