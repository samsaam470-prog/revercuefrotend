import type { VisualName } from "../components/visuals";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  visual?: VisualName;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: "Proposals" | "Contracts" | "Pricing" | "Follow-ups" | "Product";
  readMinutes: number;
  updated: string;
  visual: VisualName;
  sections: GuideSection[];
}

export const GUIDES: Guide[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    excerpt: "Sign up, finish onboarding, and send your first proposal in about five minutes.",
    category: "Proposals",
    readMinutes: 5,
    updated: "2026-11-01",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "Create the account",
        paragraphs: [
          "Start at the sign-up page. Enter your email and a password of at least eight characters, accept the Terms, and create the account. FormSubmit sends an activation email; enter the six-digit code on the next screen to finish.",
          "The activation email is about transactional mail, app notifications and security alerts. It does not opt you in to the newsletter. The newsletter is a separate checkbox.",
        ],
      },
      {
        heading: "Finish the five onboarding steps",
        paragraphs: [
          "Choose freelancer or agency, fill in your profile and services, confirm the legal consent, then pick a plan. Free is available now. The paid plans are invite-only, so you join the waitlist and the team reaches out when a spot opens.",
          "The tutorial overlay walks through the ten places you will use most. You can skip it and find every step again in the Guides.",
        ],
        visual: "DashboardVisual",
      },
      {
        heading: "Send the first proposal",
        paragraphs: [
          "Create proposal opens the requirement form. Pick the client, describe the problem, choose the sections, set the currency and the tone, then continue to the builder.",
          "Pick a template, edit the blocks, and press Create. The share modal gives you the link. Revercue does not send it: you send it from your own account, and the log records that you shared it.",
        ],
      },
    ],
  },
  {
    slug: "dashboard",
    title: "The dashboard",
    excerpt: "The four stat cards, the pending line, the suggested actions and the activity feed.",
    category: "Product",
    readMinutes: 4,
    updated: "2026-11-01",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "What each card answers",
        paragraphs: [
          "The stat strip answers one question: what needs my attention today. Active documents, clients, follow-ups due and revenue this month. Each card is a link to the filtered list behind the number.",
          "Pending payments is a line, not a fifth card. If something is overdue, a second line appears in red.",
        ],
        visual: "DashboardVisual",
      },
      {
        heading: "Suggested actions",
        paragraphs: [
          "On Growth and Scale the dashboard suggests the next move: a follow-up that is due, a contract that follows an accepted proposal, a client warm enough to reopen. Each suggestion has Do it and Dismiss. Dismiss removes it for that client or document.",
          "The suggestion is a prompt, never an action. You click, you create.",
        ],
      },
      {
        heading: "When the account is empty",
        paragraphs: [
          "With no documents and no clients the middle of the page is replaced by a single card: create your first proposal, or read the guides. The stat strip still shows zeros, honestly.",
        ],
      },
    ],
  },
  {
    slug: "proposal-builder",
    title: "The proposal builder",
    excerpt: "The requirement form, the template selection, the canvas, the auto-save and the share.",
    category: "Proposals",
    readMinutes: 7,
    updated: "2026-11-01",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "The requirement form comes first",
        paragraphs: [
          "You cannot skip the details step. Choose an existing client or enter a new one, write the problem in a sentence or two, and tick the sections you want. FAQs and embedded questions open extra editors when you tick them.",
          "Continue to builder creates the draft through the API, so the work survives a refresh.",
        ],
      },
      {
        heading: "Choose a starting point",
        paragraphs: [
          "The template screen offers the built-in templates, Start from blank, and (on paid plans) uploading your own HTML or pointing at a URL. Suggested templates are the ones that match your services.",
        ],
        visual: "BuilderVisual",
      },
      {
        heading: "The three-panel canvas",
        paragraphs: [
          "Sections and the block library live on the left, the document in the middle, the properties on the right. The canvas is a white page inside the dark app because the client reads a document, not an app screen.",
          "Select a block to edit its properties. Add sections from the library, drag to reorder, and use Preview for the client's view.",
        ],
      },
      {
        heading: "Auto-save, then share",
        paragraphs: [
          "There are three saves: the explicit Save button, a 60-second interval while there are unsaved changes, and a beacon when the tab is hidden or closed. The indicator next to the title always tells you which state you are in.",
          "Create publishes the document and opens the share sheet with the link, a message you can edit, and the reminder that Revercue does not send it.",
        ],
      },
    ],
  },
  {
    slug: "contract-builder",
    title: "The contract builder",
    excerpt: "The same canvas, the after-approval chain, and the three client actions.",
    category: "Contracts",
    readMinutes: 6,
    updated: "2026-11-01",
    visual: "ContractVisual",
    sections: [
      {
        heading: "Contract-specific details",
        paragraphs: [
          "The requirement form asks which proposal this contract follows, the scope, the payment terms, the revision policy and the cancellation policy. Sections are Parties, Scope, Payment, Timeline, Revisions, Cancellation, Liability and Signatures.",
          "The after-approval choice decides what the client sees next: the requirement form, the invoice, or the PDF only. The form and invoice options are Growth and Scale.",
        ],
      },
      {
        heading: "No FAQs, no per-question prompts",
        paragraphs: [
          "A contract does not carry FAQs or embedded questions. Questions happen at the document level through I Have Questions, which you can switch off in the document properties.",
        ],
        visual: "ContractVisual",
      },
      {
        heading: "What the client can do",
        paragraphs: [
          "Approve, Decline, or I Have Questions. Approve opens a confirmation that says plainly it is not a legally binding e-signature. Decline asks once and takes an optional reason. A question goes to your dashboard and the client can still approve afterwards.",
        ],
      },
    ],
  },
  {
    slug: "form-editor",
    title: "The form editor",
    excerpt: "The question list, the question types, the branching, the test mode and the thank-you page.",
    category: "Proposals",
    readMinutes: 6,
    updated: "2026-11-01",
    visual: "FormVisual",
    sections: [
      {
        heading: "A question builder, not a canvas",
        paragraphs: [
          "The left panel is the question list, the middle is the selected question, the right is the form settings. Every question and its options live in the same card, so the grouping never drifts.",
        ],
        visual: "FormVisual",
      },
      {
        heading: "The seven question types",
        paragraphs: [
          "Short text, long text, file upload, single choice, multiple choice, combined text plus choice, and dropdown. Choice questions need at least two options. Required questions block the submit until they are answered.",
        ],
      },
      {
        heading: "Branching, on Growth and Scale",
        paragraphs: [
          "A branching rule says: if the client answers this option, show these questions. Questions without a rule are always shown. Growth allows three adaptive forms, Scale fifteen.",
        ],
      },
      {
        heading: "Test, preview, publish",
        paragraphs: [
          "Test runs the branching with no data saved. Preview is the read-only client view. Create validates the title, the questions and the options, then publishes and opens the share sheet.",
          "When the client submits, the Prompt Creator assembles a structured paragraph from their answers. It is a pattern, not a model: you copy it into whichever tool you like.",
        ],
      },
    ],
  },
  {
    slug: "invoice-builder",
    title: "The invoice builder",
    excerpt: "Line items, the payment arrangement, the proof upload and the confirm payment action.",
    category: "Pricing",
    readMinutes: 5,
    updated: "2026-11-01",
    visual: "InvoiceVisual",
    sections: [
      {
        heading: "An invoice is a table",
        paragraphs: [
          "There is no template selection. The invoice inherits your logo and brand colours from Settings. The builder is the line items, the payment arrangement, the due date and the notes.",
        ],
        visual: "InvoiceVisual",
      },
      {
        heading: "Option A or Option B",
        paragraphs: [
          "Option A is an external payment link: the client is redirected to it. Option B shows your bank details and, if you allow it, an upload field for a payment proof.",
          "The invoice number is generated for you in the INV-YEAR-NNNN form.",
        ],
      },
      {
        heading: "Confirming the payment",
        paragraphs: [
          "A proof upload moves the invoice to Proof submitted. You confirm it from the invoices list, which records a payment for the revenue tracker and shows the client Payment confirmed.",
          "With Option A you confirm manually once the money arrives. The line stays honest: this is not a receipt until payment is confirmed.",
        ],
      },
    ],
  },
  {
    slug: "crm",
    title: "The CRM",
    excerpt: "The list, the client record, the communication log, notes, follow-ups and the interest level.",
    category: "Follow-ups",
    readMinutes: 6,
    updated: "2026-11-01",
    visual: "CrmVisual",
    sections: [
      {
        heading: "The record is the thread's home",
        paragraphs: [
          "The client record is a vertical page. The communication log is the main body, the documents are grouped below it, and the notes and follow-ups sit beside them. Creating a document for an existing client links it automatically.",
        ],
        visual: "CrmVisual",
      },
      {
        heading: "The writing area",
        paragraphs: [
          "Add communication opens the writing area: entry type, direction, channel, message, estimated time, linked document, next step and follow-up date. Save to log writes the entry. Copy message copies the text so you can paste it into your own email or WhatsApp. Revercue does not send.",
          "On Scale, a suggested phrasing panel offers one of your previous messages, not a generated one.",
        ],
      },
      {
        heading: "Notes and follow-ups",
        paragraphs: [
          "Notes are limited by plan: three per client on Free, ten on Starter, unlimited above that. The limit is shown honestly rather than hidden.",
          "Follow-ups due appear at the top with a Mark done button. The empty state is positive: no follow-ups due.",
        ],
      },
      {
        heading: "The interest level and revenue",
        paragraphs: [
          "On Scale the interest badge opens the arithmetic: base fifty, plus and minus per signal, clamped to zero and one hundred. It is arithmetic, not a model, and the breakdown is always visible.",
          "The revenue tab shows earned, spent and profit per client, plus the price suggestion built from your own expenses.",
        ],
      },
    ],
  },
  {
    slug: "client-pages",
    title: "The client-facing pages",
    excerpt: "What the client sees: the four document views, the password wall, the closed page, the proof upload.",
    category: "Product",
    readMinutes: 5,
    updated: "2026-11-01",
    visual: "ProposalVisual",
    sections: [
      {
        heading: "One link, no account",
        paragraphs: [
          "Every document has an unguessable public link. The client opens it without signing up. The page carries the freelancer's brand; the Revercue footnote disappears on Scale and Teams.",
        ],
        visual: "ProposalVisual",
      },
      {
        heading: "The four views",
        paragraphs: [
          "A proposal has sections, FAQs, embedded questions and packages. A contract adds Approve, Decline and I Have Questions. An invoice has the line items and Buy Now. A form has the questions and, on Scale, a custom thank-you page.",
        ],
      },
      {
        heading: "The wall, the closed page, the proof",
        paragraphs: [
          "A password-protected document shows the wall first: three attempts, then a fifteen-minute lock. An archived document shows the closed page instead of the content. The proof upload is its own page so the client can bookmark it.",
        ],
      },
    ],
  },
  {
    slug: "ui-elements",
    title: "The UI elements",
    excerpt: "The blocks you can place in a document and what each one is for.",
    category: "Product",
    readMinutes: 6,
    updated: "2026-11-01",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "Text and media",
        paragraphs: [
          "Heading, paragraph, quote, list, image and graph cover most documents. Headings carry the structure; paragraphs carry the argument; a graph is for one number, not a dashboard.",
        ],
      },
      {
        heading: "Layout",
        paragraphs: [
          "Divider, spacer, card, two-column and three-column arrange the page. The columns are for comparison, not decoration.",
        ],
      },
      {
        heading: "Document-specific blocks",
        paragraphs: [
          "Pricing table, packages, timeline, FAQ list, embedded question, file upload, button, signature and the next-step block. Packages default to Basic, Standard and Premium and you can rename or remove them.",
        ],
        visual: "BuilderVisual",
      },
    ],
  },
  {
    slug: "visual-intelligence",
    title: "The visual pipeline",
    excerpt: "How the template's zones decide where a visual goes, and how to edit it.",
    category: "Product",
    readMinutes: 4,
    updated: "2026-11-01",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "Zones, not guesses",
        paragraphs: [
          "A template declares its zones: the hero, the body, the pricing area, the closing. When a block is inserted, it lands in the zone that matches its type. Nothing is auto-generated and nothing is invented.",
        ],
      },
      {
        heading: "Editing what the pipeline chose",
        paragraphs: [
          "Every placement is a normal block. Select it, change its properties, move it, delete it. The pipeline is a starting arrangement, not a lock.",
        ],
        visual: "BuilderVisual",
      },
    ],
  },
  {
    slug: "design-system",
    title: "The design system",
    excerpt: "The palette, the type scale, the spacing and the components, and why they look like this.",
    category: "Product",
    readMinutes: 5,
    updated: "2026-11-01",
    visual: "PricingVisual",
    sections: [
      {
        heading: "Dark, gold, serif",
        paragraphs: [
          "The app is near-black so the documents stand out as white pages. Gold marks exactly one action per screen. Serif is for headlines only, sans for everything else, mono for anything you copy.",
        ],
      },
      {
        heading: "Six states, every element",
        paragraphs: [
          "Default, hover, focus, active, disabled and loading. Fields add a label, a helper and an error line. Related inputs live in a fieldset with a legend, so a question and its options never drift apart.",
        ],
        visual: "PricingVisual",
      },
    ],
  },
  {
    slug: "tracking",
    title: "The tracking",
    excerpt: "What is recorded on each plan, how to read the activity, and the five-day reduction.",
    category: "Follow-ups",
    readMinutes: 4,
    updated: "2026-11-01",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "By plan",
        paragraphs: [
          "Free records opened or not. Starter adds the timestamp. Growth adds time spent and button clicks. Scale adds the session timeline, per-question time, the not-submitted state and the behavioural signals.",
        ],
      },
      {
        heading: "The five-day rule",
        paragraphs: [
          "Raw events are reduced to a time-spent total after five days and the events are deleted. The summary stays; the timeline does not.",
        ],
        visual: "DashboardVisual",
      },
    ],
  },
  {
    slug: "suggestions",
    title: "The suggestions",
    excerpt: "Follow-ups, document suggestions, interest flags and the price suggestion.",
    category: "Follow-ups",
    readMinutes: 4,
    updated: "2026-11-01",
    visual: "SuggestionVisual",
    sections: [
      {
        heading: "What fires, and when",
        paragraphs: [
          "A pattern is evaluated against your log: a proposal sent two days ago with no reply, a client who said yes but has no contract, a client marked not interested whose interest is high again. When the pattern matches, the instruction fires.",
        ],
        visual: "SuggestionVisual",
      },
      {
        heading: "You are always the actor",
        paragraphs: [
          "Do it opens the right screen with the right client filled in. Dismiss removes the suggestion and it does not come back for that client or document. The suggestion never creates anything on its own.",
        ],
      },
    ],
  },
  {
    slug: "templates",
    title: "The templates",
    excerpt: "Built-in templates, your own HTML, a URL, or a blank page.",
    category: "Proposals",
    readMinutes: 4,
    updated: "2026-11-01",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "The four starting points",
        paragraphs: [
          "Built-in templates, your uploaded HTML, a template fetched from a URL, and blank. Uploading needs Starter or above; the plan limits are three, ten and fifteen custom templates.",
        ],
      },
      {
        heading: "The template is a starting layout",
        paragraphs: [
          "The template provides structure and default wording. Your edits are stored as structured blocks, not as modified HTML, so the client view stays consistent when the template changes.",
        ],
        visual: "BuilderVisual",
      },
    ],
  },
  {
    slug: "settings",
    title: "The settings",
    excerpt: "Profile, plan, security, notifications, saved libraries and the transparency page.",
    category: "Product",
    readMinutes: 5,
    updated: "2026-11-01",
    visual: "SecurityVisual",
    sections: [
      {
        heading: "Each section saves explicitly",
        paragraphs: [
          "Settings never auto-save. Save changes stays disabled until you change something, and Cancel reverts. The profile carries your name, business, services, brand colours and logo; the logo and colours flow into every client page.",
        ],
      },
      {
        heading: "Security and notifications",
        paragraphs: [
          "Change the password, turn 2FA on or off, and review the active sessions. Notification settings are per event on Growth and Scale; the FormSubmit card shows whether the activation email has been confirmed.",
        ],
        visual: "SecurityVisual",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy and your data",
    excerpt: "What is stored, who can see it, how long it stays, and how to export or delete it.",
    category: "Product",
    readMinutes: 5,
    updated: "2026-11-01",
    visual: "SecurityVisual",
    sections: [
      {
        heading: "Stored, not read",
        paragraphs: [
          "The infrastructure stores your data so the product works. The team sees account details for support and billing, not the content of your documents, your clients or your communication log.",
        ],
      },
      {
        heading: "Retention in one paragraph",
        paragraphs: [
          "Documents follow the plan retention (1, 3, 12, 24 or 36 months) with a PDF emailed before deletion. Tracking events are reduced after five days. Notifications live for ninety days. Saved FAQs and packages expire after three months of not being used. A deleted account is removed after five days.",
        ],
        visual: "SecurityVisual",
      },
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    excerpt: "The activation email, a document that will not open, and a payment proof that was rejected.",
    category: "Product",
    readMinutes: 4,
    updated: "2026-11-01",
    visual: "CodeScreenVisual",
    sections: [
      {
        heading: "The activation email never arrived",
        paragraphs: [
          "Check the spam folder first. The dashboard banner and Settings → Notifications both offer I clicked the activation link. If the email is genuinely missing, resend the code and wait for the ninety-second cooldown.",
        ],
        visual: "CodeScreenVisual",
      },
      {
        heading: "The document will not open",
        paragraphs: [
          "Four causes, in order: the link is wrong, the document is a draft, the document is archived, or the document is password-protected. The page tells you which one it is; there is no generic error.",
        ],
      },
      {
        heading: "The proof upload failed",
        paragraphs: [
          "Images and PDFs up to five megabytes are accepted. If the upload succeeded but the invoice still says pending, the freelancer has not confirmed it yet. Confirmation is a human step by design.",
        ],
      },
    ],
  },
];

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export const GUIDE_CATEGORIES = ["All", "Proposals", "Contracts", "Pricing", "Follow-ups", "Product"] as const;
