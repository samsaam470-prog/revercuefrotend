import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, FileText, FileSignature, Receipt, Users, Workflow } from "lucide-react";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

type Solution = {
  title: string;
  eyebrow: string;
  intro: string;
  problem: string;
  outcome: string;
  features: string[];
  steps: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; to: string }[];
};

const SOLUTIONS: Record<string, Solution> = {
  "proposal-software": {
    eyebrow: "Proposal software for freelancers",
    title: "Send proposals clients can actually respond to.",
    intro: "Create a clear, branded proposal with packages, FAQs and client questions. Share one link, see the response, and keep the next step connected to the same client record.",
    problem: "A proposal sent as a static attachment can start a long email chain. Packages get clarified in separate messages, decisions are hard to track, and the client details end up scattered.",
    outcome: "Revercue turns the proposal into an interactive page. Clients can review options, choose a package, ask a question and approve or decline from the page.",
    features: ["Build proposals with editable packages and reusable templates", "Add FAQs and questions directly where clients need context", "Share a branded link instead of sending a static PDF", "See proposal activity and keep the conversation in the client record", "Continue into a contract, requirement form or invoice"],
    steps: [{ title: "Build", copy: "Start with a template and shape the proposal around the project." }, { title: "Share", copy: "Send one client-facing link from your own email or messaging account." }, { title: "Continue", copy: "Use the response to move the same client thread to the next document." }],
    faqs: [
      { question: "Can clients choose between packages?", answer: "Yes. Add packages to a proposal so the client can review and select the option that fits." },
      { question: "Do clients need a Revercue account?", answer: "No. Client-facing proposal pages are designed to open from a share link without a client login." },
      { question: "What happens after a proposal is accepted?", answer: "You can continue the workflow with a contract, requirement form or invoice and keep the documents connected to the client record." },
    ],
    related: [{ label: "Freelance client management", to: "/solutions/client-management" }, { label: "Proposal and invoice workflow", to: "/solutions/proposal-and-invoice-tool" }],
  },
  "client-management": {
    eyebrow: "Freelance client management software",
    title: "Keep every client, conversation and next step together.",
    intro: "A practical client management workspace for freelancers: client records, communication history, follow-ups, proposals, contracts, forms and invoices connected in one place.",
    problem: "When client details live in a spreadsheet, messages live in an inbox and documents live in separate folders, it is easy to lose context or miss the next follow-up.",
    outcome: "Revercue builds the client record around the work. Documents and communication history stay connected, while follow-ups due can surface on your dashboard.",
    features: ["Keep client details and project documents in one record", "See communication history and the next step in context", "Track proposals, contracts, requirement forms and invoices", "Surface follow-ups due from the dashboard", "Add notes and keep a clearer history of each client relationship"],
    steps: [{ title: "Add the client", copy: "Create or open a client record before starting the project." }, { title: "Work in context", copy: "Create documents for that client so the record grows with the project." }, { title: "Follow through", copy: "Use the communication log and due follow-ups to keep work moving." }],
    faqs: [
      { question: "Is Revercue a CRM for freelancers?", answer: "Yes. Revercue includes client records, a communication log, notes and follow-up visibility, connected to its proposal, contract, form and invoice tools." },
      { question: "Does the client record update from documents?", answer: "The client record is designed to collect the documents and activity created in the connected workflow." },
      { question: "Can I manage proposals and invoices in the same place?", answer: "Yes. Proposals and invoices are part of the same client workflow rather than disconnected tools." },
    ],
    related: [{ label: "All-in-one freelancer business tools", to: "/solutions/freelance-business-management" }, { label: "Proposal software", to: "/solutions/proposal-software" }],
  },
  "invoice-contract-software": {
    eyebrow: "Invoice and contract software for freelancers",
    title: "Move from agreed scope to signed terms and payment.",
    intro: "Create client-ready contracts and invoices in the same workspace as your proposals. Keep scope, signatures, payment instructions and client history connected to the project.",
    problem: "Freelancers often prepare a proposal in one tool, a contract in another and an invoice somewhere else. Re-entering client details and project terms creates avoidable admin.",
    outcome: "Revercue keeps contracts and invoices alongside the proposal and client record. Clients can review and sign the contract, then receive an invoice with clear payment instructions.",
    features: ["Create contracts with scope, payment terms, revisions and cancellation details", "Capture a typed-name signature with explicit consent and date", "Generate invoices with line items, tax and totals", "Provide a payment link or account details with optional proof upload", "Keep document activity connected to the client communication log"],
    steps: [{ title: "Agree the work", copy: "Start with a proposal that sets out the package and scope." }, { title: "Confirm the terms", copy: "Prepare a contract and send it to the client for review and signature." }, { title: "Request payment", copy: "Create an invoice with the payment method and instructions you use." }],
    faqs: [
      { question: "Does Revercue support electronic signatures?", answer: "It supports a typed full name with an explicit consent tick and recorded date. It is not a qualified electronic signature or identity-verification service." },
      { question: "Can I add a payment link to an invoice?", answer: "Yes. An invoice can use an external payment link, or account details with an optional proof upload." },
      { question: "Are contracts and invoices connected to the client?", answer: "Yes. They are part of the same client workflow and communication history." },
    ],
    related: [{ label: "Proposal software", to: "/solutions/proposal-software" }, { label: "Client management software", to: "/solutions/client-management" }],
  },
  "freelance-business-management": {
    eyebrow: "All-in-one business management software for freelancers",
    title: "Run the client-workflow side of your freelance business in one place.",
    intro: "Revercue connects proposals, contracts, requirement forms, invoices and client management, helping independent professionals spend less time moving information between tools.",
    problem: "A growing freelance business can end up with one app for proposals, another for signatures, a form builder, an invoicing tool and a separate client spreadsheet.",
    outcome: "Revercue brings those client-facing steps into one connected workflow. It is focused on managing client work from first proposal through documents and payment—not a replacement for every accounting, time-tracking or project-delivery system.",
    features: ["Create and share interactive proposals", "Prepare contracts and collect client signatures", "Collect project requirements with adaptive forms", "Send invoices and record payment status", "Manage client records, communication and follow-ups"],
    steps: [{ title: "Win the work", copy: "Send a proposal with packages, FAQs and questions." }, { title: "Set up the project", copy: "Confirm terms and collect requirements without switching tools." }, { title: "Get paid and stay organised", copy: "Invoice the client and keep the history in the same record." }],
    faqs: [
      { question: "What does all-in-one mean in Revercue?", answer: "It means the core client workflow—proposals, contracts, requirement forms, invoices and CRM—is connected in one product." },
      { question: "Does Revercue replace accounting software?", answer: "No. Revercue provides invoice creation and payment tracking for the client workflow; it should not be treated as a full accounting or tax platform." },
      { question: "Who is Revercue designed for?", answer: "It is designed for freelancers and independent service providers who manage proposals, client agreements, project requirements and invoices." },
    ],
    related: [{ label: "Client management", to: "/solutions/client-management" }, { label: "Invoice and contract tools", to: "/solutions/invoice-contract-software" }],
  },
  "proposal-and-invoice-tool": {
    eyebrow: "Proposal and invoice tool for freelancers",
    title: "Connect the proposal you send to the invoice that follows.",
    intro: "Stop rebuilding the same client and project details in separate tools. Create a proposal, move the agreed work forward and prepare an invoice in the same connected client workflow.",
    problem: "The gap between winning a project and getting paid is full of repetitive admin: copying client details, checking what was agreed and recreating line items or payment instructions.",
    outcome: "Revercue keeps proposals and invoices attached to the same client record, with contracts and requirement forms available between those steps when the project needs them.",
    features: ["Create proposals with packages and client questions", "Keep the agreed project context with the client record", "Prepare a contract before work begins when needed", "Create invoices with line items, tax and payment instructions", "Keep the proposal-to-payment history visible in one workflow"],
    steps: [{ title: "Present the offer", copy: "Build a proposal that explains the work and available packages." }, { title: "Confirm the project", copy: "Record the agreement and collect requirements from the client." }, { title: "Send the invoice", copy: "Prepare the invoice from the same client workspace and track its status." }],
    faqs: [
      { question: "Can I create both proposals and invoices?", answer: "Yes. Revercue includes proposal and invoice builders within the same workspace." },
      { question: "Do I need to create a contract too?", answer: "Not every project needs one, but Revercue includes a contract builder when you want to confirm scope and terms." },
      { question: "Can I track invoice payment?", answer: "Revercue displays invoice status and lets you confirm payment to record revenue in its tracker." },
    ],
    related: [{ label: "Proposal software", to: "/solutions/proposal-software" }, { label: "Invoice and contract software", to: "/solutions/invoice-contract-software" }],
  },
};

export function SolutionLandingPage() {
  const { slug = "" } = useParams();
  const solution = SOLUTIONS[slug];

  if (!solution) {
    return (
      <div className="page page-wide">
        <div className="page-head">
          <p className="eyebrow">Freelancer tools</p>
          <h1>Find the right way to manage client work.</h1>
          <p>Explore Revercue's tools for proposals, client management, contracts and invoices.</p>
          <Link className="btn btn-primary mt-6" to="/solutions/proposal-software">Explore proposal software <ArrowRight size={15} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-wide">
      <header className="page-head">
        <p className="eyebrow">{solution.eyebrow}</p>
        <h1>{solution.title}</h1>
        <p>{solution.intro}</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 24 }}>
          <AuthActionStart className="btn btn-primary btn-lg">Start Free</AuthActionStart>
          <Link to="/pricing" className="btn btn-secondary btn-lg">See pricing</Link>
        </div>
        <p className="caption" style={{ marginTop: 12 }}>Free plan available. No credit card required.</p>
      </header>

      <section className="section">
        <div className="two-up">
          <div>
            <p className="eyebrow">The problem</p>
            <h2>Client work gets fragmented fast.</h2>
            <p className="muted">{solution.problem}</p>
          </div>
          <div>
            <p className="eyebrow">A connected workflow</p>
            <h2>Keep the context with the client.</h2>
            <p className="muted">{solution.outcome}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">What you can do</p>
          <h2>Tools built around the work, not another disconnected app.</h2>
        </div>
        <div className="module-grid">
          {solution.features.map((feature) => (
            <div className="module-card" key={feature}>
              <Check size={18} color="var(--gold)" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2>One client thread, from first step to next step.</h2>
        </div>
        <div className="thread-grid">
          {solution.steps.map((step, index) => (
            <div className="step-card" key={step.title}>
              <span className="num">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Common questions</p>
          <h2>Before you choose a tool.</h2>
        </div>
        <div className="faq-list">
          {solution.faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Explore related workflows</p>
          <h2>More ways Revercue connects client work.</h2>
        </div>
        <div className="module-grid">
          {solution.related.map((item) => (
            <Link className="module-card" key={item.to} to={item.to}>
              <Workflow size={18} />
              <h3>{item.label}</h3>
              <span className="inline">Explore <ArrowRight size={14} /></span>
            </Link>
          ))}
          <Link className="module-card" to="/features">
            <FileText size={18} /><h3>All Revercue features</h3><span className="inline">See features <ArrowRight size={14} /></span>
          </Link>
          <Link className="module-card" to="/pricing">
            <Receipt size={18} /><h3>Plans and pricing</h3><span className="inline">Compare plans <ArrowRight size={14} /></span>
          </Link>
          <Link className="module-card" to="/guides">
            <FileSignature size={18} /><h3>Product guides</h3><span className="inline">Read guides <ArrowRight size={14} /></span>
          </Link>
          <Link className="module-card" to="/about">
            <Users size={18} /><h3>Why Revercue</h3><span className="inline">Our approach <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>

      <section className="section text-center">
        <h2>Keep the client work connected.</h2>
        <p className="muted">Start with the free plan and build your next client workflow in Revercue.</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 20 }}>
          <AuthActionStart className="btn btn-primary btn-lg">Start Free</AuthActionStart>
          <Link to="/features" className="btn btn-secondary btn-lg">Explore features</Link>
        </div>
      </section>
    </div>
  );
}
