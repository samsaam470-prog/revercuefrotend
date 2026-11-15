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

const BASE_GUIDES: Guide[] = [
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
          "Start at the sign-up page. Enter your email and a password of at least eight characters, tick the box that says you accept the Terms and the Privacy Policy, and create the account. The Terms box is a gate, not a formality: the create button stays disabled until it is ticked, and the two legal pages open in a new tab so you can read them without losing what you typed.",
          "FormSubmit sends an activation email. Enter the six-digit code on the next screen to finish. The code expires after five minutes and the resend button waits ninety seconds before it is available again, so a double click cannot flood your inbox. The activation email is about transactional mail, app notifications and security alerts. It does not opt you in to the newsletter, and the newsletter checkbox on the sign-up form is separate and optional.",
          "You can also continue with Google. The Google button asks for your name, email and profile picture only; no calendar, no drive, no contacts. If the build has no Google client configured, the button says so plainly instead of failing silently.",
        ],
      },
      {
        heading: "Finish the five onboarding steps",
        paragraphs: [
          "Choose freelancer or agency, fill in your profile and services, confirm the legal consent, then pick a plan. Free is available now. The paid plans are invite-only, so you join the waitlist and the team reaches out when a spot opens; Teams is in beta and you join the beta the same way.",
          "The profile step asks for your business name, your website, your Fiverr profile if you take work there, and the services you sell. The website and the Fiverr profile are optional and labelled that way. The services are not decoration: they decide which built-in templates are marked Suggested when you open a proposal.",
          "The tutorial overlay walks through the ten places you will use most. It is a single modal with numbered steps, not a chain of popovers that trap the pointer. You can skip it at any step and find every screen again in the Guides.",
        ],
        visual: "DashboardVisual",
      },
      {
        heading: "Send the first proposal",
        paragraphs: [
          "Create proposal opens the requirement form. Pick the client, describe the problem in a sentence or two, choose the sections, set the currency and the tone, then continue to the builder. The form is not optional: the details you enter become the suggestions in the canvas, and the draft is created through the API so the work survives a refresh.",
          "Pick a template, edit the blocks, and press Create. The share modal gives you the link, a message you can edit, and the reminder that Revercue does not send it. You send it from your own account, and the log records that you shared it.",
          "Open the link yourself first. You will see exactly what the client sees: the same page, the same packages, the same questions, with your brand and no login. If something reads wrong, fix it before you send it, because an edit after sharing changes the same link the client already has.",
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
          "The stat strip answers one question: what needs my attention today. Active documents, clients, follow-ups due and revenue this month. Each card is a link to the filtered list behind the number, so a surprising figure is one click from its evidence.",
          "Pending payments is a line, not a fifth card. If something is overdue, a second line appears in red. Revenue counts confirmed payments only: an invoice marked paid by the client but not confirmed by you does not inflate the number.",
          "The numbers count up when the page loads, briefly, because a moving figure is easier to notice than a static one. If your system asks for reduced motion, they appear at their final value instead.",
        ],
        visual: "DashboardVisual",
      },
      {
        heading: "Suggested actions",
        paragraphs: [
          "On Growth and Scale the dashboard suggests the next move: a follow-up that is due, a contract that follows an accepted proposal, a client warm enough to reopen. Each suggestion has Do it and Dismiss. Dismiss removes it for that client or document and it does not come back for the same reason.",
          "The suggestion is a prompt, never an action. Do it opens the right screen with the right client already chosen; nothing is created, sent or archived without you. On Free, the card explains what the pattern would have said instead of hiding that the feature exists.",
        ],
      },
      {
        heading: "The create row and the activity feed",
        paragraphs: [
          "The create row is one gold button and three ghost buttons: proposal, contract, invoice and form. Gold marks the primary action on the screen, and the primary action is the proposal because it is the start of the thread.",
          "The activity feed lists the last events in plain sentences: who opened what, who approved, who paid, who asked a question. It is a reading list, not a notification centre; the bell in the header owns unread state, and its badge arrives with the page response rather than a polling request.",
        ],
      },
      {
        heading: "When the account is empty",
        paragraphs: [
          "With no documents and no clients, the middle of the page is replaced by a single card: create your first proposal, or read the guides. The stat strip still shows zeros, honestly, because an empty account is a real state and pretending otherwise makes the first real number harder to trust.",
          "The empty state is not a dead end. It names the next action and links to it, and it does not ask you to import data you do not have.",
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
          "You cannot skip the details step. Choose an existing client or enter a new one, write the problem in a sentence or two, and tick the sections you want. FAQs and embedded questions open extra editors when you tick them, so a simple proposal never shows fields it does not use.",
          "The currency, the timeline length and the tone are all on this form. Tone changes the default wording of the template, not the facts: a friendly template still shows your prices exactly as you typed them.",
          "Continue to builder creates the draft through the API, which is why the work survives a refresh and why the URL becomes a real document id rather than a form in memory.",
        ],
      },
      {
        heading: "Choose a starting point",
        paragraphs: [
          "The template screen offers the built-in templates, Start from blank, and, on paid plans, uploading your own HTML or pointing at a URL. Suggested templates are the ones that match the services in your profile, and the rest are still there, just below.",
          "Uploading needs Starter or above, and the plan limits are three, ten and fifteen custom templates. A custom template is private to your account: it is not shared with other customers and it is not visible on the public site.",
        ],
        visual: "BuilderVisual",
      },
      {
        heading: "The three-panel canvas",
        paragraphs: [
          "Sections and the block library live on the left, the document in the middle, the properties on the right. The canvas is a white page inside the dark app because the client reads a document, not an app screen; the surrounding chrome is yours and the page is theirs.",
          "Select a block to edit its properties: text, level, alignment, colour, or the items inside a pricing table. A block's toolbar moves it up or down, duplicates it, deletes it, or selects it for the panel. Add sections from the library, and use Preview for the full client view without the editing handles.",
          "Every block is a normal block. The template is a starting arrangement, not a lock: nothing is generated for you and nothing you place is hidden from you later.",
        ],
      },
      {
        heading: "Auto-save, then share",
        paragraphs: [
          "There are three saves: the explicit Save button, a 60-second interval while there are unsaved changes, and a beacon when the tab is hidden or closed. The indicator next to the title always says which state you are in: saved, saving, unsaved changes, or could not save and retrying.",
          "Create publishes the document and opens the share sheet with the link, a message you can edit, and copy buttons for the link and the password if the document is protected. Revercue does not send the message; you send it from your own account, and the record notes that you shared it.",
          "A published link is live immediately. Editing the document changes that same link, so if the client is reading while you edit, they see the new version on their next load. That is deliberate: one link, one source of truth.",
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
          "The requirement form asks which proposal this contract follows, the scope, the payment terms, the revision policy and the cancellation policy. Sections are Parties, Scope, Payment, Timeline, Revisions, Cancellation, Liability and Signatures; untick the ones this engagement does not need.",
          "The after-approval choice decides what the client sees next: the requirement form, the invoice, or the PDF only. The form and invoice options are Growth and Scale. On Free the choice is the PDF, stated in the helper rather than offered and then refused.",
          "Linking a proposal is optional but useful: the client record already carries the proposal, and the contract sits beside it instead of creating a second client with a slightly different spelling of the same name.",
        ],
      },
      {
        heading: "No FAQs, no per-question prompts",
        paragraphs: [
          "A contract does not carry FAQs or embedded questions. Questions happen at the document level through I Have Questions, which you can switch off in the document properties if the contract should be a read-and-sign page.",
          "The signature block is two lines, one for you and one for the client. It is a visual anchor for the approval, not a cryptographic signature, and the page says so plainly below the buttons.",
        ],
        visual: "ContractVisual",
      },
      {
        heading: "What the client can do",
        paragraphs: [
          "Approve, Decline, or I Have Questions. Approve opens a confirmation that asks for the client's name and an explicit tick, and says plainly that it is not a legally binding e-signature. Decline asks once and takes an optional reason so you can revise and resend.",
          "A question goes to your dashboard and the client can still approve afterwards, because a question is not a refusal. When the client uses the after-approval chain, the next step is created only after you confirm it; nothing is auto-issued on their approval.",
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
          "The left panel is the question list, the middle is the selected question, the right is the form settings. Every question and its options live in the same card, so the grouping never drifts and a reorder never separates an option from its question.",
          "The list shows the number, the text, a gold asterisk for required, and the type in small type. A form of twenty questions still reads as a list you can scan, and the question count and required count sit at the top where you can see them while you work.",
        ],
        visual: "FormVisual",
      },
      {
        heading: "The seven question types",
        paragraphs: [
          "Short text, long text, file upload, single choice, multiple choice, combined text plus choice, and dropdown. Choice questions need at least two options; the publish check refuses a form with one option, because a choice with one answer is not a choice.",
          "File upload questions take a maximum number of files and a maximum size per file, both set on the question. Required questions block the submit until they are answered, and the client sees which ones are still blank rather than a generic error.",
          "Every question can carry an explanation behind an info icon. Use it for the thing you would otherwise repeat in a follow-up email: which file format you want, or what counts as a revision.",
        ],
      },
      {
        heading: "Branching, on Growth and Scale",
        paragraphs: [
          "A branching rule says: if the client answers this option, show these questions. Questions without a rule are always shown. Growth allows three adaptive forms, Scale fifteen.",
          "Branching runs in test mode exactly as it runs for the client, with no data saved. That is the only honest way to check a rule: reading the rule list tells you what you intended, clicking through tells you what happens.",
        ],
      },
      {
        heading: "Test, preview, publish",
        paragraphs: [
          "Test runs the branching with no data saved. Preview is the read-only client view. Create validates the title, the questions and the options, then publishes and opens the share sheet.",
          "When the client submits, the answers are stored on the form and the client record. The structured paragraph assembled from the answers is a pattern, not a model: you copy it into whichever tool you like, and it is written in your own words, from their answers.",
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
          "There is no template selection. The invoice inherits your logo and brand colours from Settings, because an invoice is a document with a job to do, not a page to design. The builder is the line items, the payment arrangement, the due date and the notes.",
          "Each line has a description, a quantity and a unit price. The subtotal, the tax and the total update as you type, and the total is what the client sees at the top of the payment block. The invoice number is generated for you in the INV-YEAR-NNNN form.",
        ],
        visual: "InvoiceVisual",
      },
      {
        heading: "Option A or Option B",
        paragraphs: [
          "Option A is an external payment link: the client presses Buy Now and is redirected to your Stripe, PayPal or Wise page. Revercue never touches the money and never sees a card number.",
          "Option B shows your bank details and, if you allow it, an upload field for a payment proof. The details are typed by you and rendered exactly as typed, so check the IBAN before you send: a wrong digit is the client's problem only until they read it.",
          "Both options are presented as two cards, not a toggle, so the client can see what each one means before choosing. There is no third option and no hidden fallback: if you have entered neither, the page says the instructions are missing rather than showing an empty payment block.",
        ],
      },
      {
        heading: "Confirming the payment",
        paragraphs: [
          "A proof upload moves the invoice to Proof submitted and notifies you. You confirm it from the invoices list, which records a payment for the revenue tracker and shows the client Payment confirmed. The confirmation is a human step by design: a screenshot is evidence, not proof.",
          "With Option A you confirm manually once the money arrives. The line stays honest on both sides: this is not a receipt until payment is confirmed, and the client page says so under the total.",
          "Overdue is derived from the due date, not from a reminder you have to set. An invoice past its date shows Overdue in red on your list and on the client's page, and it appears in the pending line on the dashboard.",
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
          "The client record is a vertical page. The communication log is the main body, the documents are grouped below it, and the notes and follow-ups sit beside them. Creating a document for an existing client links it automatically, so the record fills itself as you work.",
          "You can also add a client by hand, with a name, an email, a company, a phone number and a channel. A duplicate email is caught before the record is created, because two records for the same person is the one CRM problem that is genuinely hard to undo.",
        ],
        visual: "CrmVisual",
      },
      {
        heading: "The writing area",
        paragraphs: [
          "Add communication opens the writing area: entry type, direction, channel, message, estimated time, linked document, next step and follow-up date. Save to log writes the entry. Copy message copies the text so you can paste it into your own email or WhatsApp. Revercue does not send.",
          "The gist is enough. You do not need to paste a whole email: a line about what you sent and what you expect next is more useful in six months than a transcript you will never reread. Estimated time is optional and feeds the effort view, not a timesheet.",
        ],
      },
      {
        heading: "Notes and follow-ups",
        paragraphs: [
          "Notes are limited by plan: three per client on Free, ten on Starter, unlimited above that. The limit is shown honestly rather than hidden, and a note is private to your account.",
          "Follow-ups due appear at the top of the dashboard and in the client's Follow-ups tab with a Mark done button. The empty state is positive: no follow-ups due. A follow-up you completed stays in the log with a done marker, so the history does not rewrite itself.",
        ],
      },
      {
        heading: "The interest level and revenue",
        paragraphs: [
          "On Scale the interest badge opens the arithmetic: base fifty, plus and minus per signal, clamped to zero and one hundred. Opens, time spent, questions and replies move it; what the client says does not. It is arithmetic, not a model, and the breakdown is always visible.",
          "The revenue tab shows earned, spent and profit per client, plus the price suggestion built from your own expenses. If the plan does not include it, the tab is replaced by a card that says which plan does, rather than a broken table.",
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
          "Every document has an unguessable public link. The client opens it without signing up, on a phone, in the browser they already have. The page carries the freelancer's brand; the Revercue footnote disappears on Scale and Teams.",
          "The page is served noindex, nofollow and never appears in a search result. The link is the access, so treat it like a key: send it to the client, not to a group chat.",
        ],
        visual: "ProposalVisual",
      },
      {
        heading: "The four views",
        paragraphs: [
          "A proposal has sections, FAQs, embedded questions and packages, and the client can approve or decline from the bottom of the page. A contract adds Approve, Decline and I Have Questions, and asks for a typed name before it accepts an approval.",
          "An invoice has the line items, the total and either Buy Now or the account details with a proof upload. A form has the questions, the branching and, on Scale, a custom thank-you page with your own heading, body and button.",
          "All four share the same rules: the freelancer's colours, the serif headline, the sans body, one gold action, and no login. If a client has to create an account to read a proposal, the page has failed at its only job.",
        ],
      },
      {
        heading: "The wall, the closed page, the proof",
        paragraphs: [
          "A password-protected document shows the wall first: three attempts, then a fifteen-minute lock. The unlock token is scoped to that one document, so opening a proposal does not open the contract beside it.",
          "An archived, declined, approved or expired document shows the closed page instead of the content. It says which state it is in and what to do next, and it never leaks the document body behind a blur.",
          "The proof upload is its own page so the client can bookmark it and come back after paying. It accepts an image or a PDF, and it tells the client that the invoice is not a receipt until the freelancer confirms the payment.",
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
          "Heading, paragraph, quote, list, image and graph cover most documents. Headings carry the structure and the table of contents the client page builds from them; paragraphs carry the argument; a graph is for one number, not a dashboard.",
          "An image block takes a URL or an upload and demands alt text, because an image without alt text is a hole in the page for anyone using a screen reader. A quote block is for the client's own words, not for decoration.",
        ],
      },
      {
        heading: "Layout",
        paragraphs: [
          "Divider, spacer, card, two-column and three-column arrange the page. The columns are for comparison, not decoration: two columns of prose are hard to read, two columns of package features are easy to compare.",
          "A spacer is the honest way to add breathing room. Padding on a block changes the block; a spacer changes the page, and you can delete it without hunting for the property that caused the gap.",
        ],
      },
      {
        heading: "Document-specific blocks",
        paragraphs: [
          "Pricing table, packages, timeline, FAQ list, embedded question, file upload, button, signature and the next-step block. Packages default to Basic, Standard and Premium and you can rename, reprice or remove them; the client's selection is recorded with the approval.",
          "The embedded question block is the one that turns a proposal into a conversation: the client answers inside the page, and the answer lands on the proposal and the client record. The FAQ list is a real details element, so it opens without JavaScript and prints open if the client prints the page.",
          "The next-step block closes the document with the contact details from your profile and a plain sentence about what happens after approval. It is not a sales pitch; it is the instruction the client needs at the moment they decide.",
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
          "A template declares its zones: the hero, the body, the pricing area, the closing. When a block is inserted, it lands in the zone that matches its type. Nothing is auto-generated and nothing is invented; the pipeline is a filing rule, not an author.",
          "That is why a proposal looks coherent before you have written a word: the template already decided that a pricing block belongs after the scope, and the pipeline keeps it there when you add another section.",
        ],
      },
      {
        heading: "Editing what the pipeline chose",
        paragraphs: [
          "Every placement is a normal block. Select it, change its properties, move it, delete it. The pipeline is a starting arrangement, not a lock, and there is no hidden layer that will re-apply a decision you reversed.",
          "If a visual looks wrong at a smaller width, the fix is in the block's properties, not in a separate mobile editor. The document is responsive; there is one layout and it reflows.",
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
          "The app is near-black so the documents stand out as white pages. Gold marks exactly one action per screen. Serif is for headlines only, sans for everything else, mono for anything you copy: an invoice number, a token, a code.",
          "A light mode exists and follows the same rules instead of inverting them. The gold darkens enough to stay legible on paper, the document pages stay white in both modes, and the serif and the spacing do not change. Settings → Appearance switches between dark, light and system, and the choice is stored on the device.",
        ],
        visual: "PricingVisual",
      },
      {
        heading: "Six states, every element",
        paragraphs: [
          "Default, hover, focus, active, disabled and loading. A button that is saving says so and cannot be pressed twice. A field that is invalid says why, in a line under the field, and keeps the label visible so the message has a subject.",
          "Fields add a label, a helper and an error line. Related inputs live in a fieldset with a legend, so a question and its options never drift apart. Optional fields say (optional) in the label, because a required-looking optional field is a small lie that costs trust.",
        ],
      },
      {
        heading: "Plain CSS, named tokens",
        paragraphs: [
          "There is no utility framework and no CSS-in-JS. The tokens are custom properties: colour, type, spacing, radius, shadow, transition. A component reads the token, never a raw hex, which is what makes the light mode a twenty-line override rather than a second stylesheet.",
          "Motion is a token too: 150ms for a state change, 200ms for a panel, and longer only for the public visuals. Reduced motion is honoured at the token level, so every animation collapses at once.",
        ],
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
          "Free records opened or not. Starter adds the timestamp. Growth adds time spent and button clicks. Scale adds the session timeline, per-question time, the not-submitted state and the behavioural signals that feed the interest level.",
          "The document list shows the summary each plan allows and says which plan shows more, rather than showing an empty column with no explanation. Tracking a client is not surveillance: it is a record of whether the document was read, which is the question you would otherwise ask by email.",
        ],
      },
      {
        heading: "The five-day rule",
        paragraphs: [
          "Raw events are reduced to a time-spent total after five days and the events are deleted. The summary stays; the timeline does not. That keeps the useful answer (did they read it, for how long) without keeping a minute-by-minute record of someone else's afternoon.",
          "Time spent is approximate by design. A document left open in a background tab is not six hours of attention, and the figure is presented as an estimate, never as proof.",
        ],
        visual: "DashboardVisual",
      },
      {
        heading: "Reading it honestly",
        paragraphs: [
          "An open with two seconds on the page means the link was clicked, not that the proposal was read. A long read with no reply means something in the document is unclear or too expensive. The tracking tells you where to look; it does not tell you what the client thinks.",
          "When a client tells you something directly, that beats the tracking every time. The log is there to prompt a good question, not to win an argument about whether they read it.",
        ],
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
          "The patterns are written rules with a visible reason. Nothing is inferred from the content of your documents, and there is no model deciding what you should do next. The suggestion shows the signal that produced it, so you can disagree with the signal.",
        ],
        visual: "SuggestionVisual",
      },
      {
        heading: "You are always the actor",
        paragraphs: [
          "Do it opens the right screen with the right client filled in. Dismiss removes the suggestion and it does not come back for that client or document for the same reason. The suggestion never creates anything on its own.",
          "That constraint is deliberate. An assistant that sends a follow-up in your name is a liability; a prompt that puts the right screen in front of you is an assistant. The difference is who presses the button.",
        ],
      },
      {
        heading: "The price suggestion",
        paragraphs: [
          "On Scale the price suggestion is built from your own expenses and your own past invoices. It shows the arithmetic, not just a number: what you spent, what you charged, what margin you kept. If you have not entered expenses, it says so instead of guessing.",
          "Use it as a second opinion, not an oracle. You know what the work is worth to this client; the suggestion only knows what it has cost you before.",
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
          "Blank is a real option, not a punishment: the block library has every block the templates use, and starting blank means every section in the document is one you chose.",
        ],
      },
      {
        heading: "The template is a starting layout",
        paragraphs: [
          "The template provides structure and default wording. Your edits are stored as structured blocks, not as modified HTML, so the client view stays consistent when the template changes and so the same document can render on a phone without a second design.",
          "An uploaded HTML template is sanitized before it renders. Scripts, event handlers and remote iframes are removed; the template keeps its structure and its styles, not its ability to execute.",
        ],
        visual: "BuilderVisual",
      },
      {
        heading: "Suggested, not forced",
        paragraphs: [
          "Templates are marked Suggested when they match the services in your profile. The mark is a hint about fit, not a recommendation to pay for anything, and you can use any template on any plan as long as your template limit allows it.",
        ],
      },
    ],
  },
  {
    slug: "settings",
    title: "The settings",
    excerpt: "Profile, appearance, plan, security, notifications, saved libraries and the transparency page.",
    category: "Product",
    readMinutes: 5,
    updated: "2026-11-01",
    visual: "SecurityVisual",
    sections: [
      {
        heading: "Each section saves explicitly",
        paragraphs: [
          "Settings never auto-save. Save changes stays disabled until you change something, and Cancel reverts to the value the server returned. That is the opposite of the builder on purpose: a document is a draft you iterate on, a setting is a decision you make once.",
          "The profile carries your name, business, services, brand colours and logo. The logo and colours flow into every client page, so changing them changes documents you have already shared. That is the behaviour you want, but it is worth knowing before you experiment with the colour picker.",
        ],
      },
      {
        heading: "Appearance",
        paragraphs: [
          "Dark, Light or System, with System following the device and changing with it. The choice is stored in the browser on this device, not on the account, so a work laptop can be dark while a phone is light. The preview card under the control shows the current choice without making you leave the page.",
        ],
      },
      {
        heading: "Security and notifications",
        paragraphs: [
          "Change the password, turn 2FA on or off, and review the active sessions. Turning 2FA off requires your password again, because the person most likely to turn it off is someone who should not.",
          "Notification settings are per event on Growth and Scale; the FormSubmit card shows whether the activation email has been confirmed and offers the one-time activation link. The newsletter is separate and off unless you ticked it.",
        ],
        visual: "SecurityVisual",
      },
      {
        heading: "The libraries and the transparency page",
        paragraphs: [
          "Saved FAQs and saved packages are libraries the builder pre-fills from. They expire after three months without use, and the screen shows the last-used date so an expiry is never a surprise. Revision prices are per category and appear to the client when they request a revision.",
          "What Revercue Knows is a read-only page listing the account data and the private data in plain language. It is the same table the Security page shows, with your actual plan and limits, and it exists so you do not have to take a marketing page's word for it.",
        ],
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
          "The infrastructure stores your data so the product works. The team sees account details for support and billing, not the content of your documents, your clients, your notes or your communication log.",
          "Two exceptions, both stated on the Security page: a credible report of illegal use, or a legal requirement. Everything else is the ordinary case, and the ordinary case is that nobody at Revercue opens your proposal.",
        ],
      },
      {
        heading: "Retention in one paragraph",
        paragraphs: [
          "Documents follow the plan retention (1, 3, 12, 24 or 36 months) with a PDF emailed before deletion. Tracking events are reduced after five days. Notifications live for ninety days. Saved FAQs and packages expire after three months of not being used. A deleted account is removed after five days.",
          "Retention is a plan feature, not a punishment for the free tier: the PDF before deletion is there so the end of retention is a handover, not a loss.",
        ],
        visual: "SecurityVisual",
      },
      {
        heading: "Export and deletion",
        paragraphs: [
          "Export your clients as CSV from the CRM, and each document as a PDF from its page. Deletion is in Settings → Delete Account, with the five-day grace period and an email copy of your data.",
          "If you need something the product does not offer, use the contact form. A data request gets an answer within one business day, and the form carries the account context so you do not have to prove who you are twice.",
        ],
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
          "The activation is a one-time step for transactional mail. If you skip it, the product still works, but document and security emails will not arrive, which is why the banner keeps asking.",
        ],
        visual: "CodeScreenVisual",
      },
      {
        heading: "The document will not open",
        paragraphs: [
          "Four causes, in order: the link is wrong, the document is a draft, the document is archived, or the document is password-protected. The page tells you which one it is; there is no generic error, because a generic error makes you guess.",
          "If a client says the link is dead, check the status in your list before resending. A resent link to an archived document fails the same way the first one did.",
        ],
      },
      {
        heading: "The proof upload failed",
        paragraphs: [
          "Images and PDFs up to five megabytes are accepted. If the upload succeeded but the invoice still says pending, the freelancer has not confirmed it yet. Confirmation is a human step by design, and the client page says so.",
          "If the file is too large, compress the image or export the receipt as a smaller PDF. If the upload fails twice with a small file, use the contact form with the invoice number and the file type; that is a bug, not a limit.",
        ],
      },
      {
        heading: "The page says you are offline",
        paragraphs: [
          "That message means the browser could not reach the API, not that your account is gone. Your session is kept, not cleared. Check the connection and reload; if the API is genuinely down, the page says so and your work is not lost.",
          "A signed-out session and an unreachable API used to look identical. They no longer do: one sends you to the login screen, the other tells you the network is the problem.",
        ],
      },
    ],
  },
];

/*
 * The second half of every guide: the part that answers the questions the first
 * half raises. Kept separate so the base guide stays a clean walkthrough and the
 * practical notes can grow without rewriting it.
 */
const PRACTICE: Record<string, GuideSection[]> = {
  "getting-started": [
    {
      heading: "The first ten minutes, checked",
      paragraphs: [
        "The five-minute promise is about the first proposal, not about mastering the product. Sign up, finish onboarding, create one document for a client you already have, and send the link to yourself. That single loop teaches more than reading every setting: you see the requirement form, the template screen, the canvas, the preview and the share sheet in the order you will actually meet them.",
        "Keep the first document small. One package, three sections, one embedded question. A short document that ships today is a better teacher than a perfect one that never leaves draft, and the draft retention clock only starts when you create it — ten days on Free, longer on the paid plans.",
      ],
      bullets: [
        "Use a real client, not a test name. The record you build is the one you keep.",
        "Send the first link to yourself before you send it to a client.",
        "Leave the notification badge alone for a day: it arrives with the page, it does not poll.",
        "If email does not arrive, the FormSubmit activation is the usual cause, not the account.",
      ],
    },
  ],
  dashboard: [
    {
      heading: "Reading the dashboard on a busy day",
      paragraphs: [
        "The dashboard is a triage screen, not a report. Read it in one order: follow-ups due today, then suggestions, then the activity feed. Follow-ups are promises you made to a person; suggestions are the product's guesses; activity is history. Doing them in any other order means reacting to noise before obligations.",
        "The counts are deliberately small numbers. Twelve active documents, eight clients, three follow-ups — if a number is larger than you can act on in a sitting, the list behind it is the thing to open, not the card. A dashboard that makes you feel busy is failing at its only job.",
      ],
      bullets: [
        "Start with what is due today, even if it is one follow-up.",
        "Dismiss suggestions you will not act on; an ignored card is noise tomorrow.",
        "Treat 'client opened, not answered' as a question to answer, not a reason to nudge.",
      ],
    },
  ],
  "proposal-builder": [
    {
      heading: "A build order that survives a rewrite",
      paragraphs: [
        "Build the document in the order a client reads it: problem, outcome, scope, price, next step. The template decides the shapes, but the order is yours, and it is the part that survives every redesign. If the price appears before the scope, the reader compares numbers without context; if the next step is missing, the document ends without a decision.",
        "Use the block library as a vocabulary, not a checklist. A pricing table, a timeline and a two-column comparison do different jobs, and a document with all three usually means the thinking is not finished. The rule of thumb: one block per idea, and no block that repeats the section above it.",
      ],
      bullets: [
        "Write the scope as outcomes, then list the deliverables underneath.",
        "Name the packages by what the client gets, not by tier adjectives.",
        "Leave one embedded question: it turns a monologue into a conversation.",
        "Check the preview at phone width before sharing; that is where most proposals are read.",
      ],
    },
  ],
  "contract-builder": [
    {
      heading: "The after-approval chain in practice",
      paragraphs: [
        "The approval is the middle of the thread, not the end. Decide the next step before you send: the requirement form, the invoice, or the PDF only. Choosing the form means the client answers the intake questions while the decision is still warm; choosing the invoice means payment is the next action and the scope is already agreed.",
        "Keep the contract readable by the person who was not in the sales conversation. Sections, plain headings, one signature block, and a next-step paragraph that says what happens after approval. If a clause needs a lawyer, it belongs in your own template, not improvised in the builder.",
      ],
      bullets: [
        "Turn off I Have Questions only when you have another channel ready.",
        "Name the approval for what it is: a confirmation, not an e-signature.",
        "Chain to the form when the project needs discovery, to the invoice when it does not.",
      ],
    },
  ],
  "form-editor": [
    {
      heading: "Branching without a flowchart",
      paragraphs: [
        "Branching earns its complexity when two clients genuinely need different questions. If most answers lead to the same follow-up, you do not need a branch; you need a shorter form. Start with the unconditional questions, then add one branch and run test mode before adding a second.",
        "Question types are a contract with the client. A short text field asks for a sentence; a long text field invites a paragraph; a file upload asks for work they may not have ready. Matching the type to the effort is most of the usability, and a choice question with fewer than two options cannot be published for a reason.",
      ],
      bullets: [
        "Put the one question you cannot start without first.",
        "Use test mode after every branch change; reading the rule is not the same as clicking it.",
        "Write the thank-you page as an instruction: what happens next, and when.",
      ],
    },
  ],
  "invoice-builder": [
    {
      heading: "Chasing payment without chasing people",
      paragraphs: [
        "An invoice is a table with a job. Keep the line items literal, the due date visible, and the payment instruction impossible to misread. Option A sends the client to your payment link; Option B shows your account details and, if you allow it, a proof upload. In both cases the money moves outside Revercue, and the confirmation is yours to make.",
        "The overdue mark is derived from the date, not from a reminder you have to set, so the invoice tells the truth even when you are busy. When a proof arrives, confirm it the same day: the client sees 'payment confirmed', and the record stops asking.",
      ],
      bullets: [
        "One invoice per milestone beats one invoice with five ambiguous lines.",
        "Put the reference in the line item, not only in the notes.",
        "Enable proof upload when you accept bank transfers; it saves a week of screenshots in chat.",
      ],
    },
  ],
  crm: [
    {
      heading: "The log you will actually keep",
      paragraphs: [
        "A communication log survives only if writing to it takes less effort than remembering. Log the message you sent, the reply you got, and the next step — one line each. The documents add themselves, so the only manual entries are the things a system cannot infer: what was said, and what you promised.",
        "Use the writing area before you send, not after. Planning the message in the client record means the next person to read the thread — often you, in three months — sees the reasoning and not just the outcome. Copy it out and send it from your own email or WhatsApp; Revercue does not send on your behalf.",
      ],
      bullets: [
        "Set the follow-up date when you send, not when you remember.",
        "Mark a client not interested only with a sentence explaining why.",
        "Notes are private to you; put the sensitive context there, not in a document.",
      ],
    },
  ],
  "client-pages": [
    {
      heading: "What the client sees on a phone",
      paragraphs: [
        "Most links are opened on a phone, often in a messaging app's in-app browser, sometimes on a connection that drops mid-scroll. The client pages are built for that: one column, large tap targets, no login, no cookie banner, and a password wall that survives a reload for thirty minutes.",
        "Your brand is the only brand on the page — your logo, your colours, your contact. On Free and Starter a small Revercue line appears in the footer; on Growth and above it does not. That is the whole difference the client notices, and it is why the branding gate is a plan feature rather than a setting.",
      ],
      bullets: [
        "Check the phone preview before sending; the desktop view is the exception.",
        "Send the password separately from the link, never in the same message.",
        "When a document is archived, the client sees a designed closed page, not a 404.",
      ],
    },
  ],
  "ui-elements": [
    {
      heading: "Choosing the right block",
      paragraphs: [
        "Blocks are answers to reader questions. A timeline answers 'how long', a pricing table answers 'how much and what', a two-column block answers 'this versus that', a quote answers 'why should I believe you'. If you cannot name the question a block answers, it is decoration, and decoration is what makes a proposal feel long.",
        "Edit the content first, then the styling. The properties panel will happily let you spend twenty minutes on a divider; the reader will not notice it, and the scope paragraph it sits above is still vague. A useful test: hide the block. If the document is still clear, the block was optional.",
      ],
      bullets: [
        "Use one heading level per section; the outline is how people skim.",
        "A chart needs a number the reader cares about, not a shape that looks analytical.",
        "Keep the embedded question near the section it belongs to.",
      ],
    },
  ],
  "visual-intelligence": [
    {
      heading: "When a visual does not help",
      paragraphs: [
        "The visual layer reads a section and decides whether it needs an image, a chart, a diagram or an icon. The decision is a pattern on the content, not a judgement about taste, so it can be wrong: a section about a feeling does not need a chart, and a section with one number does not need a diagram around it.",
        "Treat every placed visual as a draft. Keep the ones that carry information — a timeline that shows the real sequence, a chart with the real figures — and delete the ones that only fill a zone. An empty zone is honest; a decorative chart implies data you do not have.",
      ],
      bullets: [
        "A visual must add a fact the paragraph does not already state.",
        "Replace placeholder figures before sharing; a fake number is worse than no chart.",
        "On mobile, prefer one visual per screen of text at most.",
      ],
    },
    {
      heading: "The zones, and the pass you should do before sending",
      paragraphs: [
        "A template is a set of zones: a hero, a body column, a sidebar, a closing band. The visual layer places a block in the zone the template defines for it, which is why the same document looks coherent on a laptop and on a phone. The zone decides where the visual can go; the content decides whether it should exist at all.",
        "Before you share, read the document once and ask three questions about every visual. Does it carry a number or a sequence the reader needs? Is the number real, not a placeholder? Would the paragraph be clearer without it? A chart with invented data is the fastest way to lose a client's trust, and an empty zone is not a design failure — it is a decision.",
        "The edit pass is also where you fix the mismatches the pattern makes: a diagram in a section that turned out to be a list, an icon on a heading that already says the same thing, a timeline that does not match the dates in the text. Two minutes of deletion is worth more than ten minutes of styling.",
      ],
      bullets: [
        "Delete any visual whose data you did not supply yourself.",
        "One visual per section is a ceiling, not a target.",
        "Check the document at phone width after the edit pass; that is where a zone collapses.",
      ],
    },
  ],
  "design-system": [
    {
      heading: "Using the gold sparingly",
      paragraphs: [
        "The gold is the accent, not the palette. One primary action per screen, and everything else is a ghost or a quiet secondary. The moment two gold buttons compete, neither reads as the next step, which is the whole reason the rule exists.",
        "The type does the rest: a serif headline for the document feel, a sans body for reading, a mono face for anything a reader might copy — invoice numbers, links, totals. If a number matters, it is mono; if a sentence matters, it is sans. Mixing the two in the same line is how a clean page starts to feel assembled.",
      ],
      bullets: [
        "Dark is the brand; light is a courtesy. The gold survives both.",
        "Spacing does more for a premium feel than any border or shadow.",
        "Never hardcode a colour in a component; use the token so both modes stay correct.",
      ],
    },
  ],
  tracking: [
    {
      heading: "Signals, not surveillance",
      paragraphs: [
        "Tracking is most useful as a question generator. A proposal opened twice and not answered suggests a specific objection; a form opened and abandoned after question three suggests the form is too long. Neither needs a score to be useful — the sequence is the insight.",
        "Respect the limits of the data. Time spent is an estimate, because a tab left open is not attention. Raw events are reduced to a total after five days, and the client is never shown an analytics panel. If knowing whether a document was read is changing how you treat a client, that is worth noticing.",
      ],
      bullets: [
        "Read the sequence before the totals.",
        "Do not message 'I saw you opened it'. Use the information, do not report it.",
        "On Free, 'opened' is the whole signal; do not over-interpret it.",
      ],
    },
  ],
  suggestions: [
    {
      heading: "Dismissing well",
      paragraphs: [
        "A suggestion is only useful if dismissing it teaches the product something. When you dismiss the follow-up because the client asked for two weeks, dismiss it — that answer adjusts the timing. Ignoring it is the one response that teaches nothing and still leaves the card in the way tomorrow.",
        "Accept suggestions in the same spirit: they are shortcuts to the next action, not instructions. The price suggestion reads your expenses and your margin; if the margin is wrong, the number is wrong, and the fix is the input rather than the card.",
      ],
      bullets: [
        "Dismiss with a reason in your head; the product learns from the action, you learn from the reason.",
        "Keep the suggestion set small: three cards you act on beat ten you scan.",
        "Nothing is sent, archived or invoiced because a suggestion fired.",
      ],
    },
  ],
  templates: [
    {
      heading: "Template or blank",
      paragraphs: [
        "A template is a decision you already made about structure. Use one when the document type is familiar — a website proposal, a retainer contract — and start from blank when the job is unusual enough that the structure would fight you. A blank canvas is not a lesser document; it is the same blocks without an opinion.",
        "Custom templates are for your own HTML, uploaded or fetched from a URL and sanitized before they render. Use them when the document must match an existing brand system exactly, and keep a built-in template as the fallback so a broken upload never leaves you without a way to send.",
      ],
      bullets: [
        "Custom templates are private to your account and visible only to you.",
        "A fetched template is sanitized: scripts, event handlers and remote frames are removed.",
        "Start from blank when more than half the template's sections would be deleted.",
      ],
    },
  ],
  settings: [
    {
      heading: "The settings worth visiting once",
      paragraphs: [
        "Four settings repay a single visit. Profile: your logo, colours and contact details, because every client page inherits them. Notifications: per-event email toggles, so a busy week does not train you to ignore the inbox. Security: two-factor authentication, which needs your current password to change. Appearance: dark, light or system, stored on the device rather than the account.",
        "The rest can wait until they are relevant. Saved FAQs and saved packages become useful once you have sent ten proposals, not before. The what-revercue-knows page is a read-only statement of what is stored about you, and it is worth reading once so the privacy claim stops being abstract.",
      ],
      bullets: [
        "Set the profile before your first client link; it is the only branding the client sees.",
        "Export the client CSV before a plan change.",
        "Deleting the account has a five-day grace period; you can cancel by signing in.",
      ],
    },
  ],
  privacy: [
    {
      heading: "Your own data hygiene",
      paragraphs: [
        "The product's privacy is only half of the story; the other half is what you put into it. Client notes are private to you and a good place for the context you would not put in a document. Documents are shared with whoever holds the link, so a password on a sensitive proposal is cheaper than a difficult conversation later.",
        "Keep the export habit. A CSV of clients and a PDF of documents takes a minute, and it means a plan change or an account closure is a decision rather than a loss. The five-day deletion grace period exists for the same reason: a mistake should be reversible for long enough to notice it.",
      ],
      bullets: [
        "Password-protect proposals with pricing you would not post publicly.",
        "Export before deleting a client, not after.",
        "Do not paste a client's confidential file into a document you might archive.",
      ],
    },
  ],
  troubleshooting: [
    {
      heading: "Before you write to support",
      paragraphs: [
        "Three checks answer most reports. First, is the API reachable: if the app says it cannot reach the server, the problem is the connection or the deployment, not your account. Second, is the email activation done: without it, security codes and notifications do not arrive, while the in-app bell still works. Third, is the link the current one: editing a shared document changes it live, but an archived document shows the closed page by design.",
        "When you do write, include the document id or the client name, the browser and what you expected to happen. The feedback form in Settings carries the account context automatically, which is why it is faster than a fresh message.",
      ],
      bullets: [
        "Try a second browser before assuming a rendering bug.",
        "A 401 means the session expired; sign in again rather than resetting the password.",
        "A proof upload that fails is usually file size, not the invoice.",
      ],
    },
  ],
};

/*
 * The third layer: the habit each guide is really about. One section per guide,
 * written for the reader who has already set the product up and is now using it
 * on real clients.
 */
const HABITS: Record<string, GuideSection[]> = {
  "getting-started": [
    {
      heading: "What to do in week one",
      paragraphs: [
        "The first week is not about learning every feature; it is about proving that one client can move through the whole thread without a phone call. Pick a client you are already talking to, build the proposal from your usual scope, and send it with one package selection and one embedded question. When the answer arrives, create the contract from the same client, then the invoice. That single loop teaches the structure of the product better than any tour.",
        "At the end of the week, look at the record. Does it describe the relationship in a way you would trust in six months? If something is missing, it is usually a note or a follow-up date, not a feature. Add the note, set the date, and the record becomes the thing you open before the next call.",
      ],
      bullets: [
        "One real client beats three test clients.",
        "Finish the loop — proposal, contract, invoice — before exploring settings.",
        "Write the note while the context is fresh; it is the part only you can supply.",
      ],
    },
  ],
  dashboard: [
    {
      heading: "The three numbers that matter",
      paragraphs: [
        "A dashboard with twelve metrics is a dashboard nobody reads. Three numbers carry the morning decision: how many follow-ups are due, how many documents are waiting on a client, and how much money is owed. Everything else is context you can open when one of those three looks wrong.",
        "Read them as a sentence rather than a report: three follow-ups are due, two proposals are unanswered, one invoice is overdue. That sentence tells you what the next hour is for. If the sentence is empty, the day is yours — which is the outcome the product is trying to produce, not a sign that something is broken.",
      ],
      bullets: [
        "Follow-ups first: they are promises, not metrics.",
        "Waiting-on-client is a count of decisions, not documents.",
        "Money owed is a date problem more often than a client problem.",
      ],
    },
  ],
  "proposal-builder": [
    {
      heading: "Writing that survives skimming",
      paragraphs: [
        "Nobody reads a proposal the way you wrote it. They skim the headings, stop at the price, then go back to the section that worried them. Write for that path: headings that state a conclusion rather than a topic, a price block that stands alone, and one paragraph under each heading that makes sense without the rest.",
        "The most common failure is a scope written as a list of activities. A reader cannot tell whether five bullets are a big job or a small one. Say what changes for the client — the site that loads in under two seconds, the onboarding email that stops the support queue — and put the activities underneath as evidence.",
      ],
      bullets: [
        "A heading should be a sentence a client could repeat.",
        "Put the price where the reader expects it, not where the template puts it.",
        "One idea per paragraph; two ideas is how a skim becomes a stop.",
      ],
    },
  ],
  "contract-builder": [
    {
      heading: "Clauses freelancers forget",
      paragraphs: [
        "Most freelance contracts are short for a reason, but four clauses cause most of the arguments: what happens when the scope grows, who owns the files at the end, how many revision rounds are included, and what the client owes if the project stops. None of them needs legal language to be useful; each needs a sentence that says what you will actually do.",
        "Write them in the order a project goes wrong. Scope growth happens mid-project, ownership matters at handover, revisions happen in the last week, cancellation happens at any time. A reader who finds those four answers without searching will not need to email you the question — which is the point of putting them in a document rather than a conversation.",
      ],
      bullets: [
        "State the revision count as a number, not an adjective.",
        "Say when ownership transfers: on final payment, not on delivery.",
        "Say what happens to the deposit if the client cancels.",
      ],
    },
  ],
  "form-editor": [
    {
      heading: "The five questions worth asking",
      paragraphs: [
        "A requirement form is not a survey. Five questions cover most projects: what the client wants to be different when this is done, what already exists, what the deadline is and why, who approves the work, and what would make this a failure. Everything else is detail you can ask once the work starts.",
        "Ask the failure question plainly. It feels negative and it produces the most useful answer in the form, because it names the constraint the client has not written down. If the form is longer than a screen and a half, the drop-off is not a design problem; it is a sign that the questions belong in a call.",
      ],
      bullets: [
        "One question per outcome, not one per deliverable.",
        "Use the deadline question to surface the real driver.",
        "Put the approval question early; it prevents a late surprise.",
      ],
    },
  ],
  "invoice-builder": [
    {
      heading: "When a client goes quiet",
      paragraphs: [
        "An overdue invoice is rarely a dispute about the amount. It is usually a person who has not opened the email, or a finance process that needs a reference number. The invoice should make both easy: a reference in the line item, a due date that is visible without scrolling, and a payment method that matches how the client actually pays.",
        "The second message should not repeat the first. If the invoice was opened twice and not paid, ask whether the reference is wrong or the payment method does not fit; if it was never opened, resend with the date in the subject. The record tells you which message to send, which is cheaper than guessing.",
      ],
      bullets: [
        "Make the reference number the client needs obvious.",
        "Ask a specific question in the follow-up, not for the money again.",
        "Confirm a proof the day it arrives; silence reads as doubt.",
      ],
    },
  ],
  crm: [
    {
      heading: "Keeping the record honest",
      paragraphs: [
        "A client record becomes useful at the point it stops being flattering. If every note says the project is going well, the record cannot warn you about anything. Write the difficult sentence: the client is slow to approve, the scope is drifting, the last invoice needed two reminders. That is the context future-you needs.",
        "Keep the log short and dated. One line per meaningful exchange beats a transcript, and the date is what turns lines into a history. When a client returns in a year, the record should answer three questions in ten seconds: what we did, how it went, and what to watch for.",
      ],
      bullets: [
        "Log the decision, not the whole conversation.",
        "Date everything; undated notes become folklore.",
        "Close the record with the summary while you still remember.",
      ],
    },
  ],
  "client-pages": [
    {
      heading: "Branding the client sees",
      paragraphs: [
        "The client does not see the dashboard, the gold rule or the design system. They see one page with your logo, your colours and your contact details. Everything the product invests in internally is invisible at that moment, which is why the profile settings matter more than they look: a missing logo is the difference between a page that feels like your studio and one that feels like a form.",
        "Keep the client page quiet. One heading, one clear next action, no navigation. The temptation is to add a menu because websites have menus; a document with a menu is a website, and a website is something a client scrolls rather than decides. The single decision is the design.",
      ],
      bullets: [
        "Upload the logo before the first link goes out.",
        "Use your own colours in the profile, not the defaults.",
        "Test the link on a phone with one hand, because that is how it is read.",
      ],
    },
  ],
  "ui-elements": [
    {
      heading: "Blocks that carry weight",
      paragraphs: [
        "Three blocks do most of the work in a proposal: the price table, the timeline and the embedded question. The price table turns a paragraph into a decision; the timeline turns a promise into a plan; the question turns a monologue into a conversation. If a document has those three and nothing else, it is probably complete.",
        "The blocks people overuse are the decorative ones. An icon set, a divider and a quote look professional in isolation and add nothing to a decision. A useful test is to read the document without any styling: if the argument still holds, the blocks are supporting it; if it collapses, they were doing the work that the words should do.",
      ],
      bullets: [
        "Start with the price table; it clarifies the scope.",
        "Use the timeline to commit to dates you control.",
        "Delete one decorative block per draft until it hurts, then stop.",
      ],
    },
  ],
  "visual-intelligence": [
    {
      heading: "Sizing a visual for the reader",
      paragraphs: [
        "A visual has a reading distance. A chart with eight labels is read at arm's length on a laptop and squinted at on a phone; a diagram with three boxes is read at a glance on both. When a visual needs more than a glance, it usually needs a paragraph instead of a picture, or a simpler picture.",
        "The practical rule is one idea per visual. Two series on a chart is fine; six is a spreadsheet. Four boxes in a diagram is fine; twelve is a map. If the visual cannot be described in a sentence — the graph shows the drop after the price change — it is not carrying its weight in a document that is meant to be decided, not studied.",
      ],
      bullets: [
        "Label only what the reader must compare.",
        "Keep one unit per axis; mixing units invents a trend.",
        "If the visual needs a legend longer than the caption, simplify it.",
      ],
    },
  ],
  "design-system": [
    {
      heading: "Reading a page at a glance",
      paragraphs: [
        "A page is read in three passes: the shape, the headings, then the body. The shape is spacing and contrast — where the eye lands first. The headings are the argument in miniature. The body is the detail only a convinced reader reaches. A page that fails the first pass is never read, no matter how good the third is.",
        "That is why spacing and one accent colour do more than any ornament. A generous margin, a clear hierarchy and a single gold action make the page feel considered without decoration. When a page feels busy, the fix is almost always fewer elements, not smaller ones.",
      ],
      bullets: [
        "One primary action; everything else is quiet.",
        "Space groups content more reliably than borders do.",
        "If everything is emphasised, nothing is.",
      ],
    },
  ],
  tracking: [
    {
      heading: "An open, unanswered proposal",
      paragraphs: [
        "Opened three times and never answered is the most common signal in the product, and the most misread. It rarely means the client is avoiding you; it usually means a question is unanswered. Look at what they returned to — the pricing section, the revision FAQ, the timeline — and answer that in the next message instead of asking whether they have decided.",
        "The inverse signal matters too: never opened after three days means the message, not the proposal, is the problem. Check the address, the subject and whether the link arrived as a link rather than a preview. Sending the same document again to an inbox that never saw it is not a follow-up.",
      ],
      bullets: [
        "Reference the section they kept returning to.",
        "One specific question beats a generic nudge.",
        "Never say you saw them open it; use the information quietly.",
      ],
    },
  ],
  suggestions: [
    {
      heading: "Patterns that change with you",
      paragraphs: [
        "The first suggestions are generic because the product has not seen you work. After a handful of decisions it starts to reflect your rhythm: the day you usually follow up, the document you usually create next, the moment you tend to close a client. The adjustment is arithmetic on your own actions, not an opinion about how you should sell.",
        "You can accelerate that by being explicit. Dismiss a suggestion the day it stops being true and accept one the day it is. A card that sits ignored for a week teaches nothing and adds noise; a card answered in a second is the whole mechanism working.",
      ],
      bullets: [
        "Answer every card: accept, dismiss, or ignore deliberately.",
        "Expect the first week to feel generic.",
        "Nothing sends itself; a suggestion is an offer.",
      ],
    },
  ],
  templates: [
    {
      heading: "Your own HTML, safely",
      paragraphs: [
        "A custom template is for the case where the document must match a brand system exactly. Upload the HTML or point at a URL, and the product fetches, sanitizes and caches it before rendering. Sanitizing removes scripts, event handlers and remote frames, which is what keeps a template from becoming a security problem for your clients.",
        "Keep a built-in template as a fallback. A custom file can break when a remote asset moves, and a proposal that cannot render is worse than one in a default style. Test the custom template with a real document before you make it the default for a client type.",
      ],
      bullets: [
        "Custom templates are private to your account.",
        "A fetched template is sanitized; do not rely on scripts running.",
        "Test on mobile: a desktop-only layout breaks on the link people actually open.",
      ],
    },
  ],
  settings: [
    {
      heading: "The export habit",
      paragraphs: [
        "The export is the least glamorous feature and the one that makes every other promise credible. A CSV of clients and a PDF of documents takes a minute, and it turns a plan change or an account closure from a loss into a decision. Do it before a downgrade, before a quiet quarter, and before you delete a client.",
        "The same habit applies to the record. The CRM survives the documents, but only if it is accurate. Once a quarter, open the client list and close the ones that are finished: the summary is written, the follow-ups are cleared, the status is honest. A list of forty active clients is usually a list of ten active clients and thirty memories.",
      ],
      bullets: [
        "Export before any plan change, not after.",
        "Close finished clients so the active list means something.",
        "Read the what-revercue-knows page once; it is short and specific.",
      ],
    },
  ],
  privacy: [
    {
      heading: "What leaves the product",
      paragraphs: [
        "Almost nothing does. Documents are served to the client you shared them with, and the notification emails go through the mail provider. There is no analytics vendor on client pages, no advertising pixel, and no model provider in the path of your work. The footer buttons open an external tool in your browser, but the prompt travels in the URL and the answer stays in that tool.",
        "That makes the privacy question simpler than it usually is: the boundary is your own sharing. A password on a proposal with sensitive pricing, a separate message for the password, and an archive when the document is done are three habits that do more than any policy paragraph. The policy explains the system; the habits control the exposure.",
      ],
      bullets: [
        "Share links deliberately; a link is the permission.",
        "Send the password in a different channel from the link.",
        "Archive a document when the decision is made.",
      ],
    },
  ],
  troubleshooting: [
    {
      heading: "The five-minute diagnosis",
      paragraphs: [
        "When something feels broken, separate the layers before changing anything: the page, the network, and the account. Reload in a second browser; if the page renders, it is a local cache or an extension. If the app says it cannot reach the server, it is the network or the deployment, not your data. If you are signed out, it is a session, not a password.",
        "Then check the one state that explains most confusion: is the document published, archived or a draft. A draft has no public link, an archived document shows the closed page, and a published one reflects edits immediately. Naming the state out loud usually resolves the ticket before it is written.",
      ],
      bullets: [
        "Reproduce in a second browser first.",
        "Check the document state before the link.",
        "Include the document id and the exact time in any report.",
      ],
    },
  ],
};

/*
 * The last layer: the questions that arrive after the first read. Each answer is
 * written for someone who is already using the feature and hit the edge case.
 */
const QUESTIONS: Record<string, GuideSection[]> = {
  "contract-builder": [
    {
      heading: "Questions clients actually ask",
      paragraphs: [
        "The three questions a client asks about a contract are almost always the same: when do I pay, what if I need changes, and who owns the work. If the document answers those in the order they appear, the reply is usually an approval rather than an email. Put the payment schedule next to the price, the revision policy next to the scope, and the ownership sentence next to the handover date.",
        "A fourth question is less common and more expensive: what happens if I need to stop. Answering it in one sentence — the deposit covers the work completed to date, and the files are delivered on payment — prevents the argument that otherwise arrives at the worst possible moment.",
      ],
      bullets: [
        "Pair every payment term with a date, not a phase name.",
        "Answer the stop question before it is asked.",
        "Keep the signature block on one screen on mobile.",
      ],
    },
  ],
  "form-editor": [
    {
      heading: "When the form is the wrong tool",
      paragraphs: [
        "Some projects cannot be specified by a form. If the scope depends on a discovery call, a site visit or access to systems you have not seen, a long form produces confident answers that turn out to be wrong. In that case send a short form for the facts — budget range, deadline, existing assets — and keep the scope conversation for the call.",
        "The signal is in the wording of the answers. Vague answers to a precise question mean the client does not know yet, and more questions will not fix that. A form that accepts uncertainty, with a field for what is still open, produces a more honest brief than one that forces a decision.",
      ],
    },
  ],
  "invoice-builder": [
    {
      heading: "Payment methods that do not create work",
      paragraphs: [
        "The cheapest payment method is the one your client already uses, not the one with the best rate. A bank transfer with clear account details costs nothing and needs a proof; a payment link costs a percentage and needs no follow-up. For small invoices the link is usually worth the fee, and for large ones the transfer is usually worth the message.",
        "Whichever you choose, say it once and say it precisely. Two methods in one invoice means the client picks the one you do not reconcile. If you accept both, state which is preferred and put the reference format next to it, because a payment without a reference is a payment you will spend an afternoon matching.",
      ],
      bullets: [
        "One method per invoice, with the reference visible.",
        "Confirm a proof within a day; the client is waiting for the receipt.",
        "Keep the invoice number sequence unbroken across tools.",
      ],
    },
  ],
  "client-pages": [
    {
      heading: "When to archive a page",
      paragraphs: [
        "Archive when the decision is made, not when the project ends. A proposal that was approved should close as approved so the link cannot be used to reopen a settled conversation, and a contract should stay live until the work is delivered and paid, because the client may need to re-read the terms.",
        "The archive is also the honest answer to a client who asks for the document again six months later. A closed page still shows what was agreed, without inviting edits or a second signature. If a client needs a copy for their records, the print view is the right artifact, and it is the one an accountant will accept.",
      ],
      bullets: [
        "Close approved proposals the same day.",
        "Keep contracts live until final payment.",
        "Send a print copy for records, not a live link.",
      ],
    },
  ],
  "ui-elements": [
    {
      heading: "The blocks to avoid",
      paragraphs: [
        "The blocks that cause trouble are the ones that promise more than the content delivers: a testimonial carousel with one quote, a gallery with two images, a comparison table that compares one thing. Each is a signal that the document was assembled from a template rather than written, and clients read that signal quickly.",
        "A second category is blocks that need maintenance. An embedded video, a live chart or an external image can break after you send the link, and a proposal with a broken frame looks careless even when the argument is sound. Prefer blocks you control: text, a table, a timeline, a question, a file you uploaded.",
      ],
      bullets: [
        "No carousel with one item.",
        "No external embeds in a document a client will keep.",
        "One call to action per document, at the end.",
      ],
    },
  ],
  "visual-intelligence": [
    {
      heading: "Charts and the truth",
      paragraphs: [
        "A chart is an argument about proportion, and proportion is easy to distort without lying. A truncated axis exaggerates a difference; two different scales on one chart invent a relationship; a pie chart with six slices hides the one that matters. None of these is dishonest in intent, and all of them are read as claims.",
        "Start the axis at zero for bars, label the unit once, and use the same scale for anything compared. If the point is a change over time, a line; if the point is a share of a whole, a bar rather than a pie. If the point is that the numbers are close, say so in the caption and skip the chart.",
      ],
    },
  ],
  "design-system": [
    {
      heading: "Type sizes that hold up",
      paragraphs: [
        "Three sizes are enough for a document: a headline, a section heading, and body text. Add a fourth for captions and stop. The moment a page has six sizes, the reader starts looking for meaning in the difference and finds none, and the hierarchy becomes decoration.",
        "The same logic applies to weight. Two weights — regular and medium — carry a document; a third only works if it marks something specific, like a number in a table. And the line length matters more than the size: around seventy characters per line is comfortable on a laptop, and the column should narrow rather than the font shrink on a phone.",
        "Serif headings with a sans body is the combination the product uses, and it works because the two faces do different jobs. A serif heading reads as a document; a sans body reads as an interface. Mixing a serif body with a serif heading is not wrong, it just makes long reading harder at small sizes.",
      ],
      bullets: [
        "Three sizes, two weights, one accent colour.",
        "Narrow the column before shrinking the type.",
        "Never set body text below 15px on a phone.",
      ],
    },
  ],
  tracking: [
    {
      heading: "Time spent is an estimate",
      paragraphs: [
        "The time figure is derived from the gap between events, which means a tab left open overnight can read as hours of attention. The product reduces raw events to a total after five days for that reason, and the number should be read as a range rather than a measurement.",
        "What the figure is good for is comparison within one document: the pricing section held attention for longer than the timeline, so the price is the open question. What it is not good for is judging a person. A client who reads for ninety seconds and replies immediately has understood the document better than one who reads for twenty minutes and asks three questions about the first page.",
      ],
      bullets: [
        "Compare sections, not clients.",
        "Treat a long visit with no answer as a question, not interest.",
        "Never quote the number in a message.",
      ],
    },
  ],
  suggestions: [
    {
      heading: "When to turn them off",
      paragraphs: [
        "Suggestions are useful in proportion to how many decisions you make in the product. A freelancer sending three proposals a week gets a rhythm worth learning from; someone sending one a month gets advice built on too little history to be anything but generic. In the second case the cards are noise, and noise in a dashboard is expensive because it teaches you to ignore the dashboard.",
        "The honest test is whether you have acted on a suggestion in the last two weeks. If not, dismiss them for a while rather than leaving them to accumulate. The feature is not a moral obligation, and the product should be useful without it: the follow-ups, the record and the documents all work whether or not you ever accept a suggestion.",
        "There is also a version of this problem on the other side. A user who accepts every card without reading it is training the pattern on clicks rather than judgement, and the suggestions drift toward whatever is easiest to click. Read the reason line before you press the button; it exists so that the decision stays yours.",
      ],
      bullets: [
        "Below one document a week, ignore the cards.",
        "Dismiss rather than leave a card sitting.",
        "Read the reason before accepting; the button is a decision.",
      ],
    },
  ],
  templates: [
    {
      heading: "Custom templates and the mobile test",
      paragraphs: [
        "A custom template is HTML with slots for the document blocks, and the most common mistake is treating it as a website. Fixed widths, absolute positioning and a horizontal navigation bar all look correct on a laptop and collapse on a phone, which is where most client links are opened. Build with a single column and let the blocks stack.",
        "The second mistake is loading assets from a remote host you do not control. A font from a CDN, a logo from a staging server and an icon set from a third party are three ways for a document to render with missing pieces months later. Inline the small assets, host the large ones in the product, and keep the stylesheet self-contained.",
        "Before making a custom template the default, send one real document to yourself and open it on a phone, with the images disabled, and on a slow connection. If the layout still reads — headline, price, next step — the template is finished. If it depends on a background image or a web font, it is a design, not a template.",
        "Finally, keep one built-in template available for every document type. A custom file can be replaced or removed, and a proposal that cannot render is worse than one in a default style. The fallback is not a compromise; it is the reason a custom template is safe to use.",
      ],
      bullets: [
        "Single column, stacked blocks, no fixed widths.",
        "Inline tiny assets; host the rest in the product.",
        "Test with images off and on a phone before going live.",
        "Keep a built-in fallback for every document type.",
      ],
    },
  ],
  settings: [
    {
      heading: "Team, notifications and the quiet default",
      paragraphs: [
        "Notifications are the setting people change first and regret most. Email on every open turns a signal into noise within a week, and a client who opens a proposal four times produces four emails that say nothing. Start with the daily summary and turn on per-document alerts only for the documents where timing matters, such as a contract waiting on a signature.",
        "For a team, the setting that matters is who owns a client. Two people editing the same record without an owner is how a follow-up gets sent twice or not at all. Assign the owner when the client is created, and let the rest of the team see the record without changing its state.",
      ],
      bullets: [
        "Start with the daily summary, not per-open email.",
        "One owner per client record.",
        "Review notification settings once a quarter; defaults drift.",
      ],
    },
  ],
  privacy: [
    {
      heading: "Passwords, expiry and the link you sent by mistake",
      paragraphs: [
        "A password on a proposal is only as strong as the channel you use to send it. Sending the link and the password in the same email is the same as no password at all, because the risk is a forwarded message, not a guessed phrase. Send the password by message or on a call, and keep it short enough to read aloud.",
        "If a link goes to the wrong address, the fix is not an apology; it is a new link and an archive of the old one. A shared link cannot be recalled once it is out, which is why the archive is a security control rather than housekeeping. The same applies to a document that was shared with a colleague who has since left the client's company.",
        "Expiry is the third habit and the least used. A proposal that expires in thirty days is a decision with a deadline; a contract that expires is a reminder. Neither is a threat, and both reduce the number of live links that exist at any moment, which is the number that actually matters.",
      ],
      bullets: [
        "Never send the password with the link.",
        "Archive a mis-sent link and issue a new one.",
        "Set an expiry on proposals; it is a deadline, not a threat.",
      ],
    },
  ],
  troubleshooting: [
    {
      heading: "What to include in a report",
      paragraphs: [
        "A useful report is four lines: what you did, what you expected, what happened, and when. The time matters because server logs are the only way to reconstruct a failure, and a report without a timestamp turns into a guessing game. The document or client id matters for the same reason.",
        "Screenshots help only if they include the address bar and the browser. A cropped screenshot of an error message is usually not enough to identify which page failed, and a console screenshot is only useful if the error is visible in it. If you can, copy the browser and version as well; some failures are specific to one engine.",
        "Before writing, try the two cheapest checks: a private window and a different browser. If the problem disappears, the report is about an extension or a cache, and that is worth saying in the first line because it saves a round trip. If it persists, the report is about the product and the four lines are enough.",
      ],
      bullets: [
        "Four lines: action, expectation, result, time.",
        "Include the document id and the browser version.",
        "Say what you already ruled out.",
      ],
    },
  ],
};

export const GUIDES: Guide[] = BASE_GUIDES.map((guide) => ({
  ...guide,
  readMinutes: guide.readMinutes + 4,
  sections: [
    ...guide.sections,
    ...(PRACTICE[guide.slug] ?? []),
    ...(HABITS[guide.slug] ?? []),
    ...(QUESTIONS[guide.slug] ?? []),
  ],
}));

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export const GUIDE_CATEGORIES = ["All", "Proposals", "Contracts", "Pricing", "Follow-ups", "Product"] as const;
