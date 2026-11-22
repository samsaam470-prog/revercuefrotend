/*
 * The 13 questions a buyer actually asks, answered for Revercue and every
 * platform on the Compare page. Ratings are deliberately coarse — yes, partly,
 * no — and every note says where the boundary sits. Pricing and packaging change,
 * so the notes describe shape and behaviour rather than quoting a figure.
 */

export type Rating = "yes" | "partial" | "no";

export const RATING_LABEL: Record<Rating, string> = {
  yes: "Yes",
  partial: "Partly",
  no: "No",
};

export interface Criterion {
  id: string;
  label: string;
  question: string;
}

export const CRITERIA: Criterion[] = [
  {
    id: "all-in-one",
    label: "All-in-one management",
    question: "Does the platform manage multiple business operations in one place?",
  },
  {
    id: "crm",
    label: "Client relationship management",
    question: "How effectively does it manage leads, clients and customer relationships?",
  },
  {
    id: "project-management",
    label: "Project management",
    question: "Does it offer project creation, task assignment, deadlines and progress tracking?",
  },
  {
    id: "workflow-automation",
    label: "Workflow automation",
    question: "Can users automate repetitive tasks, follow-ups and business processes?",
  },
  {
    id: "invoicing",
    label: "Invoicing and billing",
    question: "How easy is it to create invoices, manage recurring billing and track payments?",
  },
  {
    id: "proposals-contracts",
    label: "Proposals and contracts",
    question: "Does it support professional proposals, agreements and electronic signatures?",
  },
  {
    id: "client-portal",
    label: "Client portal",
    question: "Can clients see projects, documents, invoices and updates in one place?",
  },
  {
    id: "time-tracking",
    label: "Time tracking",
    question: "Does it track billable hours and project time?",
  },
  {
    id: "team-collaboration",
    label: "Team collaboration",
    question: "Can several team members collaborate and split responsibilities?",
  },
  {
    id: "customization",
    label: "Customization",
    question: "Can users customize workflows, dashboards, templates and processes?",
  },
  {
    id: "integrations",
    label: "Integrations",
    question: "Does it connect to the third-party apps and services a business already uses?",
  },
  {
    id: "pricing-scalability",
    label: "Pricing and scalability",
    question: "Is pricing affordable as the business grows, and are the plans sized for it?",
  },
  {
    id: "ease-of-use-support",
    label: "Ease of use and support",
    question: "How easy is it to learn and navigate, and how usable is the help when something breaks?",
  },
];

export interface PlatformRow {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  website?: string;
  ratings: Record<string, { rating: Rating; note: string }>;
}

export const PLATFORM_CRITERIA: PlatformRow[] = [
  {
    slug: "revercue",
    name: "Revercue",
    kind: "The thread",
    summary:
      "One path from proposal to contract to requirement form to invoice, with the client record assembling itself along the way.",
    website: "https://revercue.co.uk",
    ratings: {
      "all-in-one": {
        rating: "partial",
        note: "One thread — proposal, contract, form, invoice, client record. Not accounting, payroll or a work planner.",
      },
      crm: {
        rating: "yes",
        note: "The record builds itself from the documents, and notes, follow-ups and interest level sit on the client.",
      },
      "project-management": {
        rating: "no",
        note: "No boards, task assignment or milestones. The thread tracks decisions, not the work itself.",
      },
      "workflow-automation": {
        rating: "partial",
        note: "Suggestions, follow-up reminders and auto-save. No drag-and-drop automation builder, by design.",
      },
      invoicing: {
        rating: "partial",
        note: "One-off invoices with a payment link or a proof upload and an overdue state. No recurring billing, no ledger.",
      },
      "proposals-contracts": {
        rating: "yes",
        note: "Proposals and contracts as links, with package selection, embedded questions and a timestamped client approval.",
      },
      "client-portal": {
        rating: "no",
        note: "No login and no dashboard for the client. Each document has its own link, connected by the record.",
      },
      "time-tracking": {
        rating: "no",
        note: "No billable hours or timesheets. Documents show attention and decisions, not time worked.",
      },
      "team-collaboration": {
        rating: "partial",
        note: "Roles, handoff and team attribution on Teams, which is in beta. The solo plans are single-owner.",
      },
      customization: {
        rating: "partial",
        note: "Branding, templates, saved packages and saved FAQs, plus custom HTML templates on the paid plans.",
      },
      integrations: {
        rating: "partial",
        note: "CSV and PDF export; no public API or native connector marketplace.",
      },
      "pricing-scalability": {
        rating: "yes",
        note: "Free to start, paid solo plans in the low tens per month, Teams priced separately. Invite-only above Free.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "One path through the product, so there is little to configure before the first document goes out.",
      },
    },
  },
  {
    slug: "bonsai",
    name: "Bonsai",
    kind: "Freelancer suite",
    summary:
      "A close neighbour on paper: proposals, contracts, invoices, accounting and a light CRM under one subscription.",
    website: "https://www.hellobonsai.com",
    ratings: {
      "all-in-one": {
        rating: "yes",
        note: "Proposals, contracts, invoices, expenses, accounting and a client list in one account.",
      },
      crm: { rating: "yes", note: "Client list with projects and simple pipelines; enough for a solo business." },
      "project-management": {
        rating: "yes",
        note: "Tasks, due dates and progress per project, though lighter than a dedicated board.",
      },
      "workflow-automation": {
        rating: "partial",
        note: "Templates and reminders, with some automatic invoice chasing; not a full workflow builder.",
      },
      invoicing: {
        rating: "yes",
        note: "The strongest part: one-off and recurring invoices, deposits, payment links and expense tracking.",
      },
      "proposals-contracts": {
        rating: "yes",
        note: "Templates with electronic signature and client approval on the contract.",
      },
      "client-portal": {
        rating: "yes",
        note: "Clients sign in to a portal for documents, invoices and messages.",
      },
      "time-tracking": { rating: "yes", note: "Time entries and billable rates feed the invoice." },
      "team-collaboration": {
        rating: "partial",
        note: "Additional users are supported, but the product is shaped around one freelancer.",
      },
      customization: {
        rating: "partial",
        note: "Template and branding options; the workflow logic itself is mostly fixed.",
      },
      integrations: {
        rating: "yes",
        note: "Accounting, payments, calendar and form connectors, plus Zapier.",
      },
      "pricing-scalability": {
        rating: "partial",
        note: "Bundled plans get expensive as features stack, but the entry price suits a solo desk.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "Clean and quick to learn, with responsive support on paid plans.",
      },
    },
  },
  {
    slug: "honeybook",
    name: "HoneyBook",
    kind: "Clientflow suite",
    summary:
      "Built around booking: inquiry, proposal, contract, deposit and payment schedule, with a polished client experience.",
    website: "https://www.honeybook.com",
    ratings: {
      "all-in-one": {
        rating: "yes",
        note: "Inquiry, proposal, contract, invoice, payment and scheduling in one flow.",
      },
      crm: { rating: "yes", note: "Leads and projects in one pipeline, with contact history per client." },
      "project-management": {
        rating: "partial",
        note: "Light project and task tracking; it is not a project management tool.",
      },
      "workflow-automation": {
        rating: "yes",
        note: "Automations for reminders, questionnaires and payment schedules.",
      },
      invoicing: {
        rating: "yes",
        note: "Invoices, deposits, payment schedules and card payments at the point of signing.",
      },
      "proposals-contracts": {
        rating: "yes",
        note: "Templates with e-signature, and payment can be collected as the contract is signed.",
      },
      "client-portal": {
        rating: "yes",
        note: "A branded portal where clients see files, invoices and messages.",
      },
      "time-tracking": {
        rating: "partial",
        note: "A project time tracker with manual entries and billable flags that can be converted into an invoice; no desktop stopwatch.",
      },
      "team-collaboration": {
        rating: "yes",
        note: "Several team members with assignment and permissions.",
      },
      customization: {
        rating: "partial",
        note: "Branding and templates are configurable; the flow itself is opinionated.",
      },
      integrations: {
        rating: "partial",
        note: "Payments and calendar connections plus a few others, but not an open ecosystem.",
      },
      "pricing-scalability": {
        rating: "partial",
        note: "Per-seat subscription that is comfortable solo and heavier for a small team.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "Polished and guided, with support included rather than sold as an add-on.",
      },
    },
  },
  {
    slug: "dubsado",
    name: "Dubsado",
    kind: "Workflow suite",
    summary:
      "The automation-first suite: forms, contracts, invoices and a portal, wired together by workflows you build.",
    website: "https://www.dubsado.com",
    ratings: {
      "all-in-one": {
        rating: "yes",
        note: "Forms, contracts, invoices, scheduling and a client portal in one account.",
      },
      crm: { rating: "yes", note: "Leads, projects and client history with tags, statuses and notes." },
      "project-management": {
        rating: "partial",
        note: "Projects and tasks exist, but depth is modest next to a real PM tool.",
      },
      "workflow-automation": {
        rating: "yes",
        note: "Its whole point: multi-step workflows triggered by a form, a contract or an invoice.",
      },
      invoicing: {
        rating: "yes",
        note: "Invoices, payment plans and automatic reminders for what is unpaid.",
      },
      "proposals-contracts": {
        rating: "yes",
        note: "Contract templates with electronic signature and questionnaire steps.",
      },
      "client-portal": {
        rating: "yes",
        note: "A portal with documents, invoices and messages.",
      },
      "time-tracking": { rating: "yes", note: "Time tracking and billable rates." },
      "team-collaboration": {
        rating: "yes",
        note: "Team members, roles and assignment across projects.",
      },
      customization: {
        rating: "yes",
        note: "Very configurable: forms, workflows, templates, fields and branding.",
      },
      integrations: {
        rating: "partial",
        note: "Calendar, payments and a handful of connectors; no large app marketplace.",
      },
      "pricing-scalability": {
        rating: "yes",
        note: "One of the cheaper suites per month, and it stretches to a small team.",
      },
      "ease-of-use-support": {
        rating: "partial",
        note: "Powerful, with a real setup curve; support is good once you ask for it.",
      },
    },
  },
  {
    slug: "moxie",
    name: "Moxie",
    kind: "Freelancer workspace",
    summary:
      "A friendly workspace with a writing helper, so proposals and projects feel less like admin.",
    website: "https://www.withmoxie.com",
    ratings: {
      "all-in-one": {
        rating: "yes",
        note: "Proposals, contracts, invoices, projects, time and a portal in one workspace.",
      },
      crm: { rating: "yes", note: "Clients, leads and project history in one place." },
      "project-management": {
        rating: "yes",
        note: "Tasks, deadlines and progress per project.",
      },
      "workflow-automation": {
        rating: "partial",
        note: "Reminders and recurring invoices; lighter on multi-step automation.",
      },
      invoicing: {
        rating: "yes",
        note: "Invoices, recurring billing and payment links.",
      },
      "proposals-contracts": {
        rating: "yes",
        note: "Templates with e-signature, plus a writing helper for the draft.",
      },
      "client-portal": {
        rating: "yes",
        note: "Clients sign in to see projects, files and invoices.",
      },
      "time-tracking": { rating: "yes", note: "Timers and billable hours against a project." },
      "team-collaboration": { rating: "yes", note: "Shared clients and team members." },
      customization: {
        rating: "partial",
        note: "Templates and branding; the workflow logic is mostly fixed.",
      },
      integrations: {
        rating: "partial",
        note: "A few connectors and an API, narrower than the larger suites.",
      },
      "pricing-scalability": {
        rating: "partial",
        note: "Solo-friendly pricing; per-seat costs add up once a team joins.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "Friendly interface and responsive support; the writing help is the hook.",
      },
    },
  },
  {
    slug: "plutio",
    name: "Plutio",
    kind: "All-in-one workspace",
    summary:
      "Projects and tasks at the centre, with proposals, invoices, time and a portal attached to them.",
    website: "https://www.plutio.com",
    ratings: {
      "all-in-one": {
        rating: "yes",
        note: "Projects, tasks, time, proposals, contracts and invoices in one workspace.",
      },
      crm: { rating: "yes", note: "Contacts and a simple pipeline alongside the projects." },
      "project-management": {
        rating: "yes",
        note: "Strong: boards, tasks, subtasks, deadlines and progress.",
      },
      "workflow-automation": {
        rating: "yes",
        note: "Automations triggered by task and project events.",
      },
      invoicing: { rating: "yes", note: "Invoices, estimates and payments." },
      "proposals-contracts": {
        rating: "yes",
        note: "Proposals and contracts with electronic signature.",
      },
      "client-portal": {
        rating: "yes",
        note: "A client portal with projects, files and invoices.",
      },
      "time-tracking": {
        rating: "yes",
        note: "Timers, timesheets and billable rates.",
      },
      "team-collaboration": {
        rating: "yes",
        note: "Built for small teams, with roles and assignment.",
      },
      customization: {
        rating: "yes",
        note: "Highly configurable workspaces, fields and templates.",
      },
      integrations: {
        rating: "partial",
        note: "Some integrations and an API; the ecosystem is smaller than the big suites.",
      },
      "pricing-scalability": {
        rating: "partial",
        note: "Per-seat pricing is affordable at small size and climbs with the team.",
      },
      "ease-of-use-support": {
        rating: "partial",
        note: "Dense interface with a real learning curve; support is decent once you are in.",
      },
    },
  },
  {
    slug: "agiled",
    name: "Agiled",
    kind: "Business suite",
    summary:
      "Pipeline-first: leads and deals at the top, projects and invoices downstream, all in one subscription.",
    website: "https://www.agiled.app",
    ratings: {
      "all-in-one": {
        rating: "yes",
        note: "CRM, projects, proposals, contracts, invoices and a portal in one.",
      },
      crm: {
        rating: "yes",
        note: "The core: leads, deals, pipelines and activity history.",
      },
      "project-management": {
        rating: "yes",
        note: "Projects, tasks, milestones and time tracking.",
      },
      "workflow-automation": {
        rating: "yes",
        note: "Automations across deals, projects and invoices.",
      },
      invoicing: {
        rating: "yes",
        note: "Invoices, recurring billing and payment tracking with accounting connectors.",
      },
      "proposals-contracts": {
        rating: "yes",
        note: "Proposals, estimates and contracts with e-signature.",
      },
      "client-portal": {
        rating: "yes",
        note: "A branded portal for projects, files and invoices.",
      },
      "time-tracking": { rating: "yes", note: "Timesheets and billable rates per project." },
      "team-collaboration": {
        rating: "yes",
        note: "Team roles and assignment across the pipeline.",
      },
      customization: {
        rating: "partial",
        note: "Pipelines, fields and templates are configurable; the interface less so.",
      },
      integrations: {
        rating: "yes",
        note: "Accounting, payments and Zapier connections.",
      },
      "pricing-scalability": {
        rating: "yes",
        note: "Low entry price with per-seat scaling as the team grows.",
      },
      "ease-of-use-support": {
        rating: "partial",
        note: "Broad and therefore busy; support quality varies by plan.",
      },
    },
  },
  {
    slug: "google-microsoft",
    name: "Google Workspace and Microsoft 365",
    kind: "Office suites",
    summary:
      "The default stack most freelancers already pay for: documents, email, calendar and storage, with no thread between them.",
    website: "https://workspace.google.com",
    ratings: {
      "all-in-one": {
        rating: "no",
        note: "Documents, email, calendar and storage — not business operations.",
      },
      crm: {
        rating: "no",
        note: "Contacts only. A real CRM means a separate product.",
      },
      "project-management": {
        rating: "partial",
        note: "Planner, Lists or Tasks can hold a simple project, without client context.",
      },
      "workflow-automation": {
        rating: "partial",
        note: "Apps Script or Power Automate can automate almost anything, with setup work.",
      },
      invoicing: {
        rating: "no",
        note: "A document template at best: no payment tracking, no reminders, no state.",
      },
      "proposals-contracts": {
        rating: "partial",
        note: "Google Docs includes e-signature on supported plans; Microsoft 365 eSignature is a metered add-on at about $2 per request.",
      },
      "client-portal": {
        rating: "no",
        note: "A shared folder is not a portal and has no decision state.",
      },
      "time-tracking": {
        rating: "no",
        note: "Nothing native; a spreadsheet is the usual workaround.",
      },
      "team-collaboration": {
        rating: "yes",
        note: "Excellent real-time co-editing and shared drives.",
      },
      customization: {
        rating: "yes",
        note: "Total freedom in the documents themselves; less in process.",
      },
      integrations: {
        rating: "yes",
        note: "The largest ecosystem of add-ons in the category.",
      },
      "pricing-scalability": {
        rating: "yes",
        note: "Per-seat and predictable, and most businesses already pay for it.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "Everyone already knows it, and enterprise support is mature.",
      },
    },
  },
];

export const criteriaBySlug = (slug: string) =>
  PLATFORM_CRITERIA.find((platform) => platform.slug === slug);
