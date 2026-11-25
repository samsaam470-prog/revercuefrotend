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
        note: "Documents link to the client record as they are created. Messages appear only when logged by hand, and notes, follow-ups and interest level sit on the client.",
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
        note: "Free to start. Starter, Growth and Scale are $12, $29 and $49 a month, with Teams in beta and priced separately. Paid plans are bought through public checkout.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "No independent review-listing sample is shown for Revercue on these comparison pages; this row is a product-fit assessment, not a user-satisfaction score.",
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
      crm: { rating: "yes", note: "CRM and unlimited clients are listed across plans; the Deals Pipeline is a Premium feature." },
      "project-management": {
        rating: "yes",
        note: "Tasks, due dates and progress per project, though lighter than a dedicated board.",
      },
      "workflow-automation": {
        rating: "partial",
        note: "Templates and automations are listed, but the public plan matrix does not establish a full visual workflow builder or equal access on every tier.",
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
        note: "Capterra lists Bonsai at 4.6/5 from 95 reviews; ease of use is 4.6 and customer service 4.3. Treat this as a modest sample.",
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
        note: "A time-tracker reference appears in individual reviews, but it is not listed in the current public plan comparison. Verify availability with HoneyBook before relying on it.",
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
        note: "Flat subscription tiers: Essentials lists up to 2 team members and Premium lists unlimited team members; the Starter team limit is not stated in the plan summary.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "Capterra lists HoneyBook at 4.7/5 from 696 reviews; ease of use is 4.6 and customer service 4.7. Reviewers also mention email and payment-processing limitations.",
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
        rating: "partial",
        note: "Contracts are included in Starter and Premier; public proposals are a Premier feature."
      },
      "client-portal": {
        rating: "yes",
        note: "A portal with documents, invoices and messages.",
      },
      "time-tracking": { rating: "yes", note: "Dubsado lists time tracking as a core feature; its current pricing summary does not clearly state plan-specific time-tracking limits." },
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
        note: "Published new-subscriber prices are $35/month or $335/year for Starter and $55/month or $525/year for Premier; additional users and brands have separate fees.",
      },
      "ease-of-use-support": {
        rating: "partial",
        note: "Capterra lists Dubsado at 4.2/5 from 61 reviews; ease of use is 3.7 and customer service 4.3. Reviews mention a setup and learning curve.",
      },
    },
  },
  {
    slug: "moxie",
    name: "Moxie",
    kind: "Freelancer workspace",
    summary:
      "A freelancer workspace with client and project management, proposals, contracts, invoicing and a Moxie Assistant; portal and automation access are tier-dependent.",
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
        note: "Workflow automation is listed on Pro and above; it is not listed in Starter.",
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
        note: "The white-label client portal is listed on Pro and Teams, not Starter.",
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
        note: "Workspace pricing is $12/$25/$40 monthly; Teams includes up to five team members, while project collaborators are a separate concept.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "Moxie's samples are small on G2 (4.5/5 from 4) and Capterra (4.0/5 from 1); Trustpilot shows 4.8/5 from 539 on a merged profile. Do not infer support quality from the small samples.",
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
        note: "Flat workspace pricing: Core is capped at 9 active clients with no contributors, Pro includes 30 contributors, and Max has unlimited contributors.",
      },
      "ease-of-use-support": {
        rating: "partial",
        note: "Capterra lists Plutio at 4.6/5 from 162 reviews; ease of use and customer service are both 4.5. Some reviews mention a learning curve and feature limitations.",
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
        note: "The core: contacts, accounts, deals, pipelines and activity history."
      },
      "project-management": {
        rating: "yes",
        note: "Agiled's product reference lists projects, tasks, time tracking and timesheets, but the current pricing matrix leaves those entitlement rows blank. Confirm which plan includes them before relying on them.",
      },
      "workflow-automation": {
        rating: "yes",
        note: "Automation limits are tiered: 10 on Pro, 50 on Business and 250 on Scale; Starter does not list automations.",
      },
      invoicing: {
        rating: "partial",
        note: "Invoices are included, with 100 on Starter and unlimited on paid tiers; subscriptions and accounting integrations are tier-dependent."
      },
      "proposals-contracts": {
        rating: "partial",
        note: "The pricing matrix lists a Docs allowance (25 on Starter, unlimited on paid tiers); confirm the exact proposal and e-signature limits for the plan before purchase."
      },
      "client-portal": {
        rating: "yes",
        note: "Branded client portal is included on Business and Scale; Starter and Pro can add it separately.",
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
        note: "Workspace pricing includes 1/3/7/15 seats. Paid annual equivalents are $24/$59/$99/$199; the pricing FAQ says users can continue on Free after trial, while Agiled's official product reference says there is no free plan. The conflict is unresolved.",
      },
      "ease-of-use-support": {
        rating: "partial",
        note: "Agiled is 4.7/5 from 350 Capterra reviews (ease 4.6, customer service 4.7) and 4.7/5 from 387 G2 reviews. Review counts are platform-specific.",
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
        note: "Google eSignature is included on Business Standard and Plus (and eligible higher editions); Microsoft eSignature is a separate SharePoint/Syntex pay-as-you-go service at $2 per request, not a base-plan inclusion.",
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
        note: "Large add-on ecosystems across Google Workspace Marketplace and Microsoft AppSource; availability varies by plan and vendor."
      },
      "pricing-scalability": {
        rating: "yes",
        note: "Per-user subscriptions; Google Workspace list prices are $7/$14/$22 per user/month on a one-year commitment with monthly payments. Microsoft lists Basic at $7, Standard with Copilot at $23.50, and Premium with Copilot at $32 per user/month paid yearly. Microsoft currently lists Business Basic at $7, Standard with Copilot at $23.50, and Premium with Copilot at $32 per user/month billed yearly.",
      },
      "ease-of-use-support": {
        rating: "yes",
        note: "Capterra's comparison listing shows Google Workspace at 4.7/5 from 89,356 reviews and Microsoft 365 at 4.6/5 from 14,193. These are large but different product listings, not a like-for-like usability test.",
      },
    },
  },
];

export const criteriaBySlug = (slug: string) =>
  PLATFORM_CRITERIA.find((platform) => platform.slug === slug);
