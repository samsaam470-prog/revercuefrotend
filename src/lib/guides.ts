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
    updated: "2026-11-22",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "Create the account",
        paragraphs: [
          "Start at the sign-up page. Enter your email and a password of at least eight characters, tick the box that says you accept the Terms and the Privacy Policy, and create the account. The Terms box is a gate, not a formality: the create button stays disabled until it is ticked, and the two legal pages open in a new tab so you can read them without losing what you typed.",
          "Revercue sends its own transactional email for account, security and document notices. No separate activation is required. The newsletter checkbox on the sign-up form is separate and optional.",
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
    updated: "2026-11-22",
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
    updated: "2026-11-22",
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
      {
        heading: "Selecting text, selecting an element",
        paragraphs: [
          "Select words inside any text field and a toolbar appears above it: Ask the helper, bold, italic, underline, a size picker, a colour picker and delete. The formatting is written into the text with the document's small markup, so what you apply in the builder is what the client reads on the page — no separate preview and no export step.",
          "Select a block on the canvas and its action strip appears under the content: Ask the helper, Upload from device where the element takes a file, and Remove. The helper here reads that element's own words — a heading, a card, a chart caption, an image description, an FAQ answer — and writes the result back through the same update the properties panel uses, so nothing is changed anywhere you cannot see it.",
          "The icon row on the block still does the structural work: move up, move down, duplicate, delete, select. The action strip is the content work. When the browser cannot run the helper, that one button is not rendered; the formatting toolbar, upload and the rest of the strip are unaffected.",
        ],
      },
    ],
  },
  {
    slug: "contract-builder",
    title: "The contract builder",
    excerpt: "The same canvas, the freelancer-first signing flow, and the after-approval chain.",
    category: "Contracts",
    readMinutes: 6,
    updated: "2026-11-22",
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
          "The signature block is two lines, one for you and one for the client. The lines are the visual anchor; the signature itself is the typed full name and the consent tick captured on each side, recorded with the date and the version that was signed.",
        ],
        visual: "ContractVisual",
      },
      {
        heading: "What the client can do",
        paragraphs: [
          "Sign, Decline, or I Have Questions. You sign the exact version first and publishing stays blocked until you do. The client then opens the link, reads the same version, types a full name, ticks the consent box and signs; the record keeps the date and the version. Decline asks once and takes an optional reason so you can revise and resend.",
          "The page says plainly what the signature is: a simple electronic signature made of a typed name, an explicit consent tick and a timestamp. There is no certificate, no identity check and no audit certificate, so a deal that needs a qualified signature belongs with a dedicated signing service.",
          "A question goes to your dashboard and the client can still approve afterwards, because a question is not a refusal. When the client uses the after-approval chain, the next step is created only after you confirm it; nothing is auto-issued on their approval.",
        ],
      },
      {
        heading: "Selecting text, selecting an element",
        paragraphs: [
          "Select words inside any text field and a toolbar appears above it: Ask the helper, bold, italic, underline, a size picker, a colour picker and delete. The formatting is written into the text with the document's small markup, so what you apply in the builder is what the client reads on the page — no separate preview and no export step.",
          "Select a block on the canvas and its action strip appears under the content: Ask the helper, Upload from device where the element takes a file, and Remove. The helper here reads that element's own words — a heading, a card, a chart caption, an image description, an FAQ answer — and writes the result back through the same update the properties panel uses, so nothing is changed anywhere you cannot see it.",
          "The icon row on the block still does the structural work: move up, move down, duplicate, delete, select. The action strip is the content work. When the browser cannot run the helper, that one button is not rendered; the formatting toolbar, upload and the rest of the strip are unaffected.",
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
    updated: "2026-11-22",
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
          "When the client submits, the answers are stored on the form and the client record. The structured paragraph assembled from the answers is a pattern, not a model: you copy it into whichever tool you like, and it is written in your own words, from their answers. Requirement form downloads are available in Markdown, and client-submitted questions and answers can be downloaded together in Markdown.",
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
    updated: "2026-11-22",
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
    updated: "2026-11-22",
    visual: "CrmVisual",
    sections: [
      {
        heading: "The record is the thread's home",
        paragraphs: [
          "The client record is a vertical page. The communication log is the main body, the documents are grouped below it, and the notes and follow-ups sit beside them. Creating a document for an existing client links it automatically, so the record fills itself as you work.",
          "You can also add a client by hand, with a name, an email, a company, a phone number and a channel. A duplicate email is caught before the record is created, because two records for the same person is the one CRM problem that is genuinely hard to undo. Copyable prompts and CRM client profile details are available from the client record.",
        ],
        visual: "CrmVisual",
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
          "Revenue overview (earned revenue, pending payments and totals) is available on every plan. Project expense recording and project expense totals are available on Growth and above. Expense categories, platform and provider records and spending breakdowns are available on Scale and above. The price suggestion is not available.",
        ],
      },
      {
        heading: "The writing area",
        paragraphs: [
          "The writing area is the form in the CRM where you plan the message you are about to send. You open it from the client record. You write the message. You can add a prompt or instruction describing what you want. Suggestions are returned separately, alongside the message, so you can review them and choose what to use. You copy the message and send it from your own email or WhatsApp. Revercue does not send the message. The thread is the record; the message is yours.",
          "The context available to the writing area follows the suggestion progression: basic CRM suggestions on every plan, previous outreach patterns and follow-up strategy from Starter, in-context paragraph suggestions, detailed prompts from previous data and project expense suggestions from Growth, and broader client-history context from Scale.",
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
    updated: "2026-11-22",
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
          "All four share the same rules: the freelancer's colours, the serif headline, the sans body, one gold action, and no login. If a client has to create an account to read a proposal, the page has failed at its only job. PDF export is limited: package selection remains interactive only in the client link and is not preserved in a PDF.",
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
    updated: "2026-11-22",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "How this guide is organised",
        paragraphs: [
          "Every element below follows the same shape: what it is for, where to find it, how to insert it, how to configure it, the properties it exposes, when to use it, how to write for it, what the client sees, what Ask the helper can do with it, the mistakes that cost the most, and what to check on a phone or with a screen reader.",
          "Two vocabularies run through the whole guide. The element is the block you insert from the left panel. The property is the setting in the right panel once the block is selected. Anything you can change about an element is a property; anything you cannot change is the template's decision, and that is deliberate.",
          "The helper is available on the elements that carry words — heading, paragraph, quote, card, button, next step, FAQ answer, question text, image description, chart caption. It is not available on the elements that carry no words, like divider, spacer and shape, because there is nothing to rewrite.",
        ],
        bullets: [
          "Ask the helper: select text, choose an action, read the before and after, then Replace, Insert below or Cancel",
          "The selection toolbar: bold, italic, underline, size, colour and delete, applied to the selected words",
          "The element action strip: the same helper, Upload from device on image elements, and Remove",
        ],
      },
      {
        heading: "Heading",
        paragraphs: [
          "Purpose — Names a section so the client knows what the next few screens are about, and gives the document its skeleton for scanning.",
          "Where you find it — Left panel, under Blocks; the first block of every template we generate.",
          "How to insert it — Open the left panel, choose Heading. It lands at the end of the block stack and is selected, so the properties panel opens on it.",
          "How to configure it — Pick the level (H1, H2, H3), the alignment and the colour, then write the words. One heading per section; the level is the document's outline.",
          "Best use cases — Section names in a proposal (Scope, Timeline, Pricing), the title of a contract clause, and the opening line of each part of a long document.",
          "Writing effective content — Three to six words, a noun rather than a sentence. 'What is included' beats 'Here is a list of everything that is included in this engagement'. If a heading needs a comma, it is probably a paragraph.",
          "How the client experiences it — The client sees a larger line in the document's serif face, at the colour you chose, and jumps between these lines when scrolling. Headings are what the page's outline is built from.",
          "How Ask the helper improves it — Select the heading text and ask for concise or formal. The helper is good at turning 'Details about the project and what we will do' into 'Scope'. It only rewrites the selected heading, never the blocks under it.",
          "Common mistakes — Using a heading for a sentence you want to be big. Skipping a level (H1 straight to H3) so the outline jumps. Repeating the document title as a heading on the first screen.",
          "Mobile and accessibility — Headings are real heading elements, so a screen reader can list them and navigate by them. Keep one H1 per document, keep the levels in order, and never rely on colour alone to mark a section.",
        ],
        bullets: [
          "Properties: Level: H1, H2 or H3",
          "Properties: Alignment: left, centre, right",
          "Properties: Colour: any hex value",
          "Properties: Text: the heading itself, with the selection toolbar",
        ],
      },
      {
        heading: "Paragraph",
        paragraphs: [
          "Purpose — Carries the prose: the explanation, the scope, the reason, the close. Most of the document is paragraphs.",
          "Where you find it — Left panel, under Blocks; also the block the pipeline uses for every section that is not pricing, FAQ or a question.",
          "How to insert it — Choose Paragraph in the left panel. It arrives with a placeholder line and opens in the properties panel.",
          "How to configure it — Write in the text field, then use the selection toolbar for bold, italic, underline, size and colour, or ask the helper for a rewrite. Alignment and colour apply to the whole block.",
          "Best use cases — Scope, the problem statement, payment terms, a short story about a similar project, the sentence that explains a number.",
          "Writing effective content — One idea per paragraph, three to five sentences. Put the fact first and the justification second. If a paragraph reaches six sentences, split it into two paragraphs rather than one long one.",
          "How the client experiences it — The client reads it as body text at the width you set, with the line height the page uses. Inline formatting — bold for an amount, colour for a warning — carries through to the client page unchanged.",
          "How Ask the helper improves it — This is where the helper earns its place. Select a rambling scope line and ask for concise; select a blunt close and ask for friendly. Read the before and after, then Replace or Insert below. The helper works on the selection, so the rest of the paragraph keeps your voice.",
          "Common mistakes — Writing the whole proposal in one paragraph. Using bold for whole sentences. Pasting text with its own line breaks so the paragraph renders with gaps.",
          "Mobile and accessibility — Body text stays at a readable size and line height on every screen; inline formatting is semantic (strong, emphasis) rather than colour-only. Keep colour contrast in mind when you use a custom colour on white.",
        ],
        bullets: [
          "Properties: Text: the prose, with inline formatting from the selection toolbar",
          "Properties: Alignment: left, centre, right",
          "Properties: Colour: the block's base colour",
          "Properties: Rows: how tall the editing field is",
        ],
      },
      {
        heading: "Quote",
        paragraphs: [
          "Purpose — Sets a sentence apart: the client's own words, a line from the brief, or the one promise you want remembered.",
          "Where you find it — Left panel, under Blocks.",
          "How to insert it — Choose Quote. It arrives with a left rule in your brand colour and italic text.",
          "How to configure it — Write the line in the text field. The brand colour of the rule comes from the document's brand primary, so changing the brand changes every quote with it.",
          "Best use cases — The client's own sentence from their first email. A guarantee. The one line of the brief that shaped the whole proposal.",
          "Writing effective content — One or two sentences, quoted exactly if it is the client's. Do not add quotation marks in the text; the block already sets it apart. Keep it under twenty-five words or it stops reading as a quote.",
          "How the client experiences it — The client sees an indented line with a coloured rule on the left, in italic. It reads as evidence rather than argument, which is why it works.",
          "How Ask the helper improves it — Use it to tighten a long quotation without changing the meaning, or to fix the grammar of your own line. Do not use it to rewrite the client's words into something they did not say — quote the sentence, then answer it in a paragraph.",
          "Common mistakes — Quoting three paragraphs. Using a quote where a heading belongs. Changing the client's quoted words to sound better.",
          "Mobile and accessibility — Quotes are marked up as quotations, so assistive technology announces them as such. The rule is decorative; the text still reads on its own without it.",
        ],
        bullets: [
          "Properties: Text: the quoted line",
          "Properties: Brand rule colour: inherited from the document's brand primary",
          "Properties: Inline formatting: from the selection toolbar",
        ],
      },
      {
        heading: "List",
        paragraphs: [
          "Purpose — Breaks a set of parallel items into lines the client can scan instead of a paragraph they have to parse.",
          "Where you find it — Left panel, under Blocks.",
          "How to insert it — Choose List. It starts with two items; add or remove rows in the properties panel.",
          "How to configure it — Each row has a label. Keep the items parallel — all nouns, or all verb phrases — and keep the number of items small enough to hold in mind.",
          "Best use cases — Deliverables, what is included and what is not, the three things you need from the client, the revision limits.",
          "Writing effective content — Start each item with the same kind of word. Five to seven items is comfortable; ten is a wall. If an item needs a second sentence, it wants to be a card or a paragraph.",
          "How the client experiences it — The client sees a bulleted list at body size, indented once. On mobile it wraps without losing the bullet alignment.",
          "How Ask the helper improves it — Select one item at a time and ask for concise, or select a line and ask for formal. Formatting from the toolbar carries into the list item, so a bold amount stays bold.",
          "Common mistakes — Mixing sentences and fragments. Nested lists in a document that is already long. Using a list for prose that has no parallel structure.",
          "Mobile and accessibility — Lists are real lists, so a screen reader announces the count and the position of each item. Do not fake bullets with dashes inside a paragraph.",
        ],
        bullets: [
          "Properties: Items: one label per row",
          "Properties: Add or remove rows in the properties panel",
          "Properties: Bullets render with the document's list styling",
        ],
      },
      {
        heading: "Image",
        paragraphs: [
          "Purpose — Shows something words cannot: a screenshot, a reference, a photograph of the work, a logo lockup.",
          "Where you find it — Left panel, under Blocks; the properties panel for an image block.",
          "How to insert it — Choose Image, then use Upload from device in the element's action strip or in the properties panel. The file is read on your device and stored as the block's source.",
          "How to configure it — Upload the file, then write the alt text. The alt text is what a client using a screen reader hears, and what shows if the image fails to load.",
          "Best use cases — A screenshot of the finished work, a mood reference, a photo of the team, a diagram you already made elsewhere.",
          "Writing effective content — Write alt text as if you were describing the image to someone on the phone: what it shows and why it matters. Skip 'image of'. Compress large photographs before uploading — the storage bar counts files, not layout.",
          "How the client experiences it — The client sees the image at the document's width, with the alt text available to assistive technology and shown if the file cannot load.",
          "How Ask the helper improves it — Ask the helper to turn a rough note into a one-line description, or to write clearer alt text from your description. It rewrites the description, not the picture, so the image itself is still yours to choose.",
          "Common mistakes — Uploading a 6 MB photograph for a 300px slot. Leaving alt text empty. Using an image of text instead of a heading.",
          "Mobile and accessibility — Always write alt text. Do not put essential information only inside an image. Keep the image readable at mobile width, and avoid text baked into screenshots at small sizes.",
        ],
        bullets: [
          "Properties: Image source: the uploaded file or a URL",
          "Properties: Alt text: the description",
          "Properties: Brand primary: used where the block needs a fallback",
        ],
      },
      {
        heading: "Graph",
        paragraphs: [
          "Purpose — Shows a shape in the numbers — growth, split, comparison — as bars rather than a table of digits.",
          "Where you find it — Left panel, under Blocks; the caption sits under the bars.",
          "How to insert it — Choose Graph. It arrives with a sample series and a caption explaining that the values should be replaced.",
          "How to configure it — Write the caption in the text field. The bars use the document's brand primary, so the chart matches the page without a separate colour setting.",
          "Best use cases — Revenue across three months, the split between two service lines, a before-and-after comparison the client already cares about.",
          "Writing effective content — The caption should state the finding, not label the axis: 'Two of the three months came from the retainer' beats 'Monthly revenue'. If the chart needs a legend, it is probably a table.",
          "How the client experiences it — The client sees bars in the brand colour with the caption underneath, at document width. On mobile the bars stay proportional and the caption wraps below.",
          "How Ask the helper improves it — Ask the helper to sharpen a vague caption into a claim, or to shorten it. It works on the caption text only; it does not invent numbers, and the values stay whatever you set.",
          "Common mistakes — Decorating with a chart that says nothing. Using a graph for two numbers. Writing a caption that repeats the heading.",
          "Mobile and accessibility — The caption carries the meaning in words, so the chart is never the only way to read the data. Keep contrast between the bars and the page background strong enough to see the shape.",
        ],
        bullets: [
          "Properties: Caption: one line under the chart",
          "Properties: Bar values: the sample series, replaced with your own data",
          "Properties: Colour: inherited from brand primary",
        ],
      },
      {
        heading: "Divider",
        paragraphs: [
          "Purpose — Marks the end of a section with a thin rule, so the document breathes between ideas.",
          "Where you find it — Left panel, under Blocks.",
          "How to insert it — Choose Divider. It is a single line with almost no configuration, which is the point.",
          "How to configure it — Set the rule colour if the default is too loud or too faint for the page background.",
          "Best use cases — Between the scope and the pricing, before the FAQ, at the end of the document before the signature.",
          "Writing effective content — Nothing to write. If a divider needs a caption, it wants a heading instead.",
          "How the client experiences it — The client sees a hairline rule spanning the page width, with the document's spacing above and below it.",
          "How Ask the helper improves it — Nothing for the helper here — the divider has no words. Adding one is the sign that a heading was what you actually wanted.",
          "Common mistakes — A divider between every block. A divider directly under a heading. Using two dividers in a row to make a thicker line.",
          "Mobile and accessibility — The rule is decorative and is not announced. Never use a divider as the only way to signal a new section for a screen reader; the heading does that job.",
        ],
        bullets: [
          "Properties: Colour: the rule's colour, defaulting to the page's hairline",
        ],
      },
      {
        heading: "Spacer",
        paragraphs: [
          "Purpose — Adds vertical room without adding content, so a page does not crowd its own elements.",
          "Where you find it — Left panel, under Blocks.",
          "How to insert it — Choose Spacer and set its height in the properties panel.",
          "How to configure it — Height in pixels. Twenty-four is a breath, forty-eight is a pause, ninety-six is a new page.",
          "Best use cases — After a pricing block, before a signature, between a quote and the paragraph that answers it.",
          "Writing effective content — No content. If you are adding spacers everywhere, the document's spacing is doing too little — use fewer, larger gaps.",
          "How the client experiences it — The client sees empty space, which is the only element they experience without noticing it.",
          "How Ask the helper improves it — Not applicable: there is no content to rewrite.",
          "Common mistakes — Stacking three spacers to fake a section break. Using a spacer instead of a heading's own margin. Very tall spacers on mobile, which turn into a blank screen.",
          "Mobile and accessibility — Spacers add no text and are skipped by assistive technology. Keep the total gap modest on small screens so content stays reachable.",
        ],
        bullets: [
          "Properties: Height: the gap in pixels",
        ],
      },
      {
        heading: "Card",
        paragraphs: [
          "Purpose — Groups a small idea with a label so it reads as one unit: a benefit, a step, a promise.",
          "Where you find it — Left panel, under Blocks.",
          "How to insert it — Choose Card. It arrives with a single label line you can rewrite.",
          "How to configure it — Write the card's line, then ask the helper if it needs tightening. Use several cards where one list would feel flat.",
          "Best use cases — Three benefits in a row, the steps of the process, the three things included in a package.",
          "Writing effective content — A short noun phrase, or one short sentence. Cards work in threes; two feels incomplete and four feels like a list that escaped.",
          "How the client experiences it — The client sees a bordered box with the line inside, in the document's spacing. Cards sit in the page flow, so they read in order.",
          "How Ask the helper improves it — Select the card line and ask for concise or change the wording, which is useful when three cards should sound like a set rather than three separate thoughts.",
          "Common mistakes — Putting a paragraph in a card. Making every card bold. Using cards for content that belongs in a list.",
          "Mobile and accessibility — The card's text is real text. Keep the border contrast visible, and do not let a card's shape be the only way to understand grouping.",
        ],
        bullets: [
          "Properties: Text: the card's title line",
          "Properties: Inline formatting from the selection toolbar",
        ],
      },
      {
        heading: "Two and three column",
        paragraphs: [
          "Purpose — Puts short parallel content side by side: what is included on the left, the timeline on the right.",
          "Where you find it — Left panel, under Blocks; the column text lives in the properties panel.",
          "How to insert it — Choose Two column or Three column. Each column is edited as plain lines, one paragraph per line.",
          "How to configure it — Write one paragraph per line in the column field. On narrow screens the columns stack, so the reading order matters more than the pairing.",
          "Best use cases — Deliverables against assumptions, included against excluded, three phases of work.",
          "Writing effective content — Keep each line under two sentences and make the two sides answer each other. If the columns are not parallel, the layout is doing work the words should do.",
          "How the client experiences it — The client sees the columns beside each other on desktop and stacked in order on mobile, with the document's gap between them.",
          "How Ask the helper improves it — Ask the helper on each line separately — it edits one selection at a time. Use it to make both sides the same length and the same tone, which is what makes a two-column block look deliberate.",
          "Common mistakes — Long paragraphs in a column. Four columns' worth of content split into three. Different volumes on each side.",
          "Mobile and accessibility — Columns stack in source order on small screens, so write them so the stacked version still makes sense. Do not use columns to place something visually beside text that a screen reader needs in a specific order.",
        ],
        bullets: [
          "Properties: Column one: lines, one paragraph each",
          "Properties: Column two (and three): the same",
          "Properties: Gap: the space between columns",
        ],
      },
      {
        heading: "Pricing table",
        paragraphs: [
          "Purpose — Lists what the work includes and what each line costs, as a table the client can add up at a glance.",
          "Where you find it — Left panel, under Blocks; rows are edited in the properties panel.",
          "How to insert it — Choose Pricing table. It arrives with two sample rows and an Add line item button in the properties panel.",
          "How to configure it — Each row has a description, a quantity and a price. Add rows for the work, remove the ones you do not do, and put the biggest item first.",
          "Best use cases — A breakdown of deliverables with a price per line, a fixed-scope project, or the itemised part of a retainer proposal.",
          "Writing effective content — Name the deliverable, not the hour. 'Homepage design and build' with one line beats six lines of 'design work'. Keep the number of rows between three and eight; a table longer than that belongs in an appendix.",
          "How the client experiences it — The client sees a real table with a header row, quantities and right-aligned prices. It scrolls horizontally on a very small screen rather than shrinking the text.",
          "How Ask the helper improves it — The helper can rewrite a description line — select it in the properties panel and ask for concise — but it never touches the numbers. Prices are yours and stay exactly as typed.",
          "Common mistakes — Using this table as the plan prices, which it is not. Mixing hourly and fixed lines in one table. Leaving a row with a price and no description.",
          "Mobile and accessibility — A real table with header cells, so a screen reader can announce the column before each value. Do not use a table for layout, and do not rely on colour to mark a row.",
        ],
        bullets: [
          "Properties: Rows: description, quantity, price",
          "Properties: Add or remove rows",
          "Properties: Total: the sum of the rows as the client reads it",
        ],
      },
      {
        heading: "Packages",
        paragraphs: [
          "Purpose — Offers two or three levels the client can choose between, and records the choice when they do.",
          "Where you find it — Left panel, under Blocks. It is the block the proposal template puts in the pricing section.",
          "How to insert it — Choose Packages. It arrives with Basic, Standard and Premium, which you can rename, reprice or reduce to two.",
          "How to configure it — Edit each package's label and price, keep the middle one as the recommendation, and describe what each includes in the paragraphs above it.",
          "Best use cases — Three levels of the same service, a good-better-best choice, or two options where one is clearly the recommended start.",
          "Writing effective content — Name the level by what it is for, not by size: 'The single landing page' beats 'Basic'. Keep the labels the same length. Put the difference between the packages in the paragraph above, not inside the card.",
          "How the client experiences it — The client sees the package cards side by side, with the middle one outlined in the brand colour. On mobile they stack in order, and the client's selection is recorded on the document.",
          "How Ask the helper improves it — Ask the helper to shorten a package name or to make two labels sound like a set. It edits the words, not the prices, and the selection is always recorded exactly once.",
          "Common mistakes — Four packages. Prices that do not ladder. Describing a package only in the card, so the difference is invisible.",
          "Mobile and accessibility — The package cards are buttons with their label and price read in order. Never encode the recommended package in colour alone — say it in the sentence above the cards.",
        ],
        bullets: [
          "Properties: Item label: the package name",
          "Properties: Price: the amount shown on the card",
          "Properties: Number of packages: two or three",
          "Properties: Middle card: highlighted in the brand colour",
        ],
      },
      {
        heading: "Timeline",
        paragraphs: [
          "Purpose — Shows the shape of the work in phases, so the client can see when each part arrives.",
          "Where you find it — Left panel, under Blocks; the phases are rows in the properties panel.",
          "How to insert it — Choose Timeline. It starts with Kickoff and Delivery.",
          "How to configure it — Each row has a label and an optional value — the phase and its week or duration. Add a row per phase and keep the values consistent.",
          "Best use cases — A four-week engagement, a launch sequence, the order of approvals before work starts.",
          "Writing effective content — Use a verb for the label and a week for the value: 'Design · week 1'. Keep every value in the same unit. If a phase has no date, say 'after approval' rather than leaving the value blank.",
          "How the client experiences it — The client sees a vertical list with a marker per phase and the timing beside it. On mobile it stays a single column, which is how it reads best anyway.",
          "How Ask the helper improves it — Ask the helper to make a phase label consistent with the others, or to shorten a long one. It rewrites the label, never the timing.",
          "Common mistakes — Two timelines in one document. Values in weeks and days in the same list. A timeline with one phase.",
          "Mobile and accessibility — The timeline is an ordered list, so the sequence is announced. The marker is decorative; the text carries the timing.",
        ],
        bullets: [
          "Properties: Rows: label and value",
          "Properties: Order: the sequence the client reads",
          "Properties: Marker colour: inherited from brand primary",
        ],
      },
      {
        heading: "FAQ",
        paragraphs: [
          "Purpose — Answers the question the client is about to email you, before they send it.",
          "Where you find it — Left panel, under Blocks; the question and answer are edited in the properties panel.",
          "How to insert it — Choose FAQ. It arrives with one collapsed question.",
          "How to configure it — Write the question as the client would ask it, and the answer in the shortest form that is still true. Add one block per question.",
          "Best use cases — What is not included, how revisions work, who owns the files, what happens if the project pauses.",
          "Writing effective content — Ask the question in the first person and answer it in the second. Two to four sentences. If the answer needs a list, that is a sign the question was two questions.",
          "How the client experiences it — The client sees a row they can open, and the answer expands in place. It works without JavaScript and prints open, so a client who prints the proposal still gets the answers.",
          "How Ask the helper improves it — Select the answer and ask for concise, friendly or formal — the FAQ is where the helper's tone actions matter most, because the answer is written for the client's worry rather than your record.",
          "Common mistakes — Using the FAQ for marketing copy. Ten questions with the same answer. Answering a question the client never asked.",
          "Mobile and accessibility — The question is a real expandable control, reachable by keyboard, and the answer is read after it. Do not hide essential terms only inside a collapsed answer.",
        ],
        bullets: [
          "Properties: Question: the client's words",
          "Properties: Answer: the response, with the selection toolbar",
          "Properties: Collapsed by default, so the page stays short",
        ],
      },
      {
        heading: "Embedded question",
        paragraphs: [
          "Purpose — Asks the client something inside the document, so the answer is part of the thread instead of a separate form.",
          "Where you find it — Left panel, under Blocks; the question settings are in the properties panel.",
          "How to insert it — Choose the question element. It arrives with a short-text question and a type selector.",
          "How to configure it — Write the question, choose the type, mark it required if the document cannot proceed without it, and allow the client to ask you something instead.",
          "Best use cases — Two or three decisions you need before you can start: the launch date, the domain owner, which package they picked.",
          "Writing effective content — Ask one thing. 'Which launch date do you want, and who owns the domain?' is two questions and will get one answer. Put the context in the paragraph above, not inside the field label.",
          "How the client experiences it — The client sees the question with its input, an optional info icon, and a way to ask you instead of answering. Their answer is stored on the document and on the client record.",
          "How Ask the helper improves it — Ask the helper to make a question direct, or to rewrite an explanation that sits behind the info icon. It edits the wording only; the question type and the required setting stay as you set them.",
          "Common mistakes — Six questions in one proposal. Making everything required. Asking for information you already have in the client record.",
          "Mobile and accessibility — Each question has a visible label tied to its input, and the info icon is a button with an accessible name. Choice options are grouped so a screen reader reads the set, not loose fields.",
        ],
        bullets: [
          "Properties: Question text",
          "Properties: Type: short text, long text, single choice, multiple choice, dropdown, file upload",
          "Properties: Required: whether the client must answer",
          "Properties: Allow a question back: an option on the client side",
          "Properties: Options: for the choice types",
        ],
      },
      {
        heading: "File upload",
        paragraphs: [
          "Purpose — Lets the client send you a file from inside the document — a brief, a logo, a signed page.",
          "Where you find it — Left panel, under Blocks; it is also available as a question type.",
          "How to insert it — Choose File upload, then write the line that tells the client what you want.",
          "How to configure it — Describe the file you need and any limit. Uploads count against your plan's storage, not against the document count.",
          "Best use cases — A brand asset pack, a signed contract page, a photograph you need for the work, a spreadsheet of products.",
          "Writing effective content — Say what the file is for and what format helps: 'The logo as SVG or PNG, please — not a screenshot of the logo.' One file is easier than five.",
          "How the client experiences it — The client sees a drop target and a chosen-file state, then a confirmation once it uploads. On mobile the file picker opens their own files app.",
          "How Ask the helper improves it — Ask the helper to make the instruction clearer, or to say why the file is needed. It cannot upload on the client's behalf, and it never reads the file.",
          "Common mistakes — Asking for files you do not need yet. Not saying which format. Uploading your own file here instead of to the image element — this block is the client's side.",
          "Mobile and accessibility — The upload is keyboard operable, reports progress and errors in text, and names the file once chosen. Do not require a drag gesture alone.",
        ],
        bullets: [
          "Properties: Text: what to upload",
          "Properties: Accepted kinds of file, by the question type",
          "Properties: Required: whether the client can continue without it",
        ],
      },
      {
        heading: "Button",
        paragraphs: [
          "Purpose — A single call to action in the page: book a call, open the form, see the work.",
          "Where you find it — Left panel, under Blocks.",
          "How to insert it — Choose Button and write its label.",
          "How to configure it — Keep the label to two or three words. One gold action per screen — the second button on the page is a secondary style.",
          "Best use cases — A link to your calendar after the pricing, a link to the requirement form, a link to a case study that supports the proposal.",
          "Writing effective content — Start with a verb: 'Book a call', 'Open the brief'. Never 'Click here'. If the label needs a sentence, the paragraph above it is missing.",
          "How the client experiences it — The client sees a filled button in the brand colour and can reach it by keyboard. On mobile it stays at least a finger-width tall.",
          "How Ask the helper improves it — Select the label and ask for concise or change the wording when two buttons on the page say almost the same thing. Short labels are where the helper is least needed and most useful.",
          "Common mistakes — Two gold buttons on one page. Buttons that lead nowhere. A button used as a heading.",
          "Mobile and accessibility — The control is a real button or link with an accessible name, a visible focus ring and a target large enough to tap. Never use colour alone to show it is clickable.",
        ],
        bullets: [
          "Properties: Label text",
          "Properties: Colour: the brand primary on the primary style",
          "Properties: Position: the block's place in the flow",
        ],
      },
      {
        heading: "Signature",
        paragraphs: [
          "Purpose — Closes a contract with a line for each party. The lines hold the typed signatures once both sides sign.",
          "Where you find it — Left panel, under Blocks; contracts add it automatically at the end.",
          "How to insert it — Choose Signature. It renders the freelancer and client lines side by side.",
          "How to configure it — There is almost nothing to configure: the parties come from the document and the profile. Keep it last, after the terms.",
          "Best use cases — The end of every contract, and the end of a proposal that is being used as a signed agreement.",
          "Writing effective content — Nothing to write here. The sentence above the signature is where you say plainly that signing is a typed name plus consent, recorded with the date, and that it is a simple electronic signature rather than a qualified one.",
          "How the client experiences it — The client sees two ruled lines with labels. On mobile they stack, freelancer first.",
          "How Ask the helper improves it — No content for the helper to rewrite. If the closing sentence needs work, that is a paragraph block above the signature.",
          "Common mistakes — Claiming a qualified, notarised or identity-verified signature. Putting the signature before the terms. Adding your own name twice.",
          "Mobile and accessibility — Each line has a text label, so the block is understandable without seeing the rule. The signature itself is not an interactive control.",
        ],
        bullets: [
          "Properties: Parties: freelancer and client",
          "Properties: Line and label styling from the design system",
        ],
      },
      {
        heading: "Next step",
        paragraphs: [
          "Purpose — Ends the document with the one instruction the client needs at the moment they decide.",
          "Where you find it — Left panel, under Blocks; the template ends with it.",
          "How to insert it — Choose Next step and write the line.",
          "How to configure it — Write what happens next in plain words — reply to this link, book the call, expect the contract within a day. Contact details come from your profile.",
          "Best use cases — The close of every proposal and contract, and the last screen before an invoice.",
          "Writing effective content — One sentence, one action. 'Reply here and I will send the contract today' beats 'We look forward to hearing from you at your earliest convenience'.",
          "How the client experiences it — The client sees a bordered closing block with your line and your contact details. It is the last thing on the page and the first thing they can act on.",
          "How Ask the helper improves it — Ask the helper to make the close direct, or to remove the hedging. This is the block where a friendly rewrite changes the reply rate most.",
          "Common mistakes — Ending without one. Using it for a second sales pitch. Repeating the pricing that was two screens above.",
          "Mobile and accessibility — The closing text is body text at a readable size, and the contact details are selectable rather than images.",
        ],
        bullets: [
          "Properties: Text: the next step",
          "Properties: Contact details: from your profile",
          "Properties: Position: last block in the document",
        ],
      },
      {
        heading: "Shape",
        paragraphs: [
          "Purpose — Adds a purely visual mark: a dot, a rule, a background accent that separates ideas.",
          "Where you find it — Left panel, under Blocks; the shape style is set in the properties panel.",
          "How to insert it — Choose Shape. It renders small, in the brand colour, at the block's place in the flow.",
          "How to configure it — Choose the shape style. It carries no text, so there is nothing else to set.",
          "Best use cases — A small accent beside a heading, a marker between phases, a divider that is softer than a rule.",
          "Writing effective content — No content. A shape with words in it is a card or a quote.",
          "How the client experiences it — The client sees a small coloured mark where the block sits, at the document's spacing.",
          "How Ask the helper improves it — Not applicable: the shape has no words.",
          "Common mistakes — Using shapes as decoration on every page. Using a shape where a real divider is clearer. Sizing it by uploading an image instead.",
          "Mobile and accessibility — Decorative and skipped by assistive technology. It must never be the only thing that separates two sections for a screen reader.",
        ],
        bullets: [
          "Properties: Shape style: circle or square",
          "Properties: Colour: the brand primary",
          "Properties: Size: the block's default size",
        ],
      },
    ],
  },
  {
    slug: "visual-intelligence",
    title: "The visual pipeline",
    excerpt: "How the template's zones decide where a visual goes, and how to edit it.",
    category: "Product",
    readMinutes: 4,
    updated: "2026-11-22",
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
    updated: "2026-11-22",
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
    updated: "2026-11-22",
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
    excerpt: "Follow-ups, document suggestions, interest flags and plan-specific context.",
    category: "Follow-ups",
    readMinutes: 4,
    updated: "2026-11-22",
    visual: "SuggestionVisual",
    sections: [
      {
        heading: "What fires, and when",
        paragraphs: [
          "A pattern is evaluated against your log: a proposal sent two days ago with no reply, a client who said yes but has no contract, a client marked not interested whose interest is high again. When the pattern matches, the instruction fires.",
          "The patterns are written rules with a visible reason. The suggestions count events — a document sent, opened, answered, paid — and never read the prose of your documents. The post-document review is the one thing that reads the text, and the text is never sent to a Revercue server for it. The suggestion shows the signal that produced it, so you can disagree with the signal.",
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
        heading: "Price suggestion (not available)",
        paragraphs: [
          "The price suggestion is not available. It is not a current feature and no release date is promised.",
        ],
      },
      {
        heading: "What each plan gets",
        paragraphs: [
          "The suggestions are on every plan. The plan shapes the depth, not the existence. Every freelancer gets the suggestions; the plan decides how smart they are.",
          "Every plan includes basic CRM suggestions. Free includes basic CRM suggestions only.",
          "Starter adds previous outreach patterns and follow-up strategy on top of the basic CRM suggestions.",
          "Growth adds in-context paragraph suggestions, detailed prompts using previous data and project expense suggestions on top of the Starter capabilities.",
          "The Scale plan has the advanced suggestions. The follow-up (the user's own median delay, not the default). The document suggestion (the user's own intent to document pattern, not the default). The interest flag (the client marked not interested, the interest 80%+). The form reminder (the client opened the form, not submitted after 3 days). The reopen (the not-interested client, the high interest). Broader client-history context is available on Scale. The price suggestion is not available.",
          "Teams includes the Scale capabilities. Teams is in beta.",
        ],
      },
      {
        heading: "The summary",
        paragraphs: [
          "Capability progression: basic CRM suggestions on every plan; previous outreach patterns and follow-up strategy from Starter; in-context paragraph suggestions, detailed prompts using previous data and project expense suggestions from Growth; broader client-history context from Scale.",
        ],
      },
      {
        heading: "The follow-up, and how its date is chosen",
        paragraphs: [
          "The follow-up is the simplest suggestion and the one people act on most. It appears when a proposal has been sent and the client has not replied in a while. On Growth and below, the wait is the product default: two days. On Scale it is your own median delay, calculated from the follow-ups you have actually made. If you wait four days on average, the card waits four days; if you follow up the next morning, it does too.",
          "The card carries the client, the document, the days since it was sent, and a line you can send. It does not send the message. You copy it into your own email or WhatsApp, and the log records that you followed up. That is the shape of every suggestion in the product: a card, a line, and a click that starts your own work.",
        ],
      },
      {
        heading: "The document suggestion",
        paragraphs: [
          "A client agrees. In a message, in a call you noted down, or by approving a proposal. The next artifact in the thread is a contract, and the suggestion says so with a link that opens the contract builder with the client already chosen and the scope carried over.",
          "On Scale the trigger is your own pattern rather than a fixed rule. If your accounts usually move from an answered proposal straight to a contract, that is the shape the suggestion follows. If they usually move through a call first, the suggestion waits for the note that a call happened. The suggestion is reading your method, not a generic funnel.",
        ],
      },
      {
        heading: "The interest flag",
        paragraphs: [
          "The interest level is arithmetic: the number of messages, the last direction, whether the proposal was opened, whether it was answered, whether the contract was approved, whether the invoice was paid, the days since the last interaction, and whether you marked the client not interested. Out of that comes a number, and the flag appears when the number is high and the client has gone quiet, or when you marked them not interested and the activity says otherwise.",
          "The flag is not a prediction. It is a mirror of behaviour that already happened. A client at eighty per cent who has not replied in nine days is a client worth one more message; that is all the number claims.",
        ],
      },
      {
        heading: "The form reminder",
        paragraphs: [
          "A client opened the requirement form and did not submit it. Three days later, the reminder appears with the form, the date it was opened and the questions that were reached. That last part is the useful one: a client who stopped at the budget question is telling you something different from a client who stopped at the first field.",
          "The reminder does not resend the form. It gives you the link and the line, and you decide whether to nudge, to shorten the form, or to let it go.",
        ],
      },
      {
        heading: "Price suggestion (not available)",
        paragraphs: [
          "The price suggestion is not available. It is not a current feature and no release date is promised.",
        ],
      },
      {
        heading: "The reopen",
        paragraphs: [
          "A client you marked not interested comes back: they open a document, they reply, the interest climbs. The reopen suggestion appears with the date you closed the account and the activity since, and a line that acknowledges the gap without apologising for it.",
          "This is the suggestion that saves the most value per click, because the relationship already exists and the reason it paused has usually expired. It also shows why the record is the product: nothing here would be possible if the decision had not been written down.",
        ],
      },
      {
        heading: "What makes a suggestion arrive",
        paragraphs: [
          "Signals, not guesses. A proposal sent. A proposal opened. A proposal answered. A contract approved. An invoice paid. A form opened. A message logged in either direction. A note with a next step. The product reads those events, counts them, and compares them with the timing that fits your plan: the default on Growth, your own pattern on Scale.",
          "That is the whole mechanism. Keyword matching, frequency counting, arithmetic. There is no model deciding what you should do next, and no content leaving the product to decide it. Two freelancers with different histories get different suggestions because the arithmetic is over different histories.",
        ],
      },
      {
        heading: "What a suggestion never does",
        paragraphs: [
          "It never sends anything. There is no queue, no automation, no scheduled message that goes out while you are asleep. The suggestion hands you the line and the link, and you send it from your own account.",
          "It never creates a document. The contract suggestion opens the contract builder; it does not publish a contract. It never edits a document you have written, never marks a client as interested on its own, and never deletes the record of a conversation.",
          "It also never hides its reason. Every card names the signal that produced it — the document, the date, the days, the number — so you can disagree with it. A suggestion you cannot audit is a suggestion you stop reading.",
        ],
      },
      {
        heading: "Reading a suggestion critically",
        paragraphs: [
          "The first question is always whether the signal is true. A proposal marked sent that the client never received will produce a follow-up that reads oddly, and the fix is the log, not the card. The second question is whether the timing fits this client: some accounts move in hours, some in weeks, and a card that fires early is not wrong, just early.",
          "The third question is whether the action is the one you want. A follow-up, a contract, a price change: each is a decision about the relationship, and the product is only ever offering the next step it can count. You are allowed to ignore every suggestion on the page and still have the thread work. The record is the product; the suggestions are the intelligence on top of it.",
          "The fourth question is whether it is worth the interruption. A card that appears every morning and never needs action teaches you to stop reading cards. The suggestions that survive are the ones you dismiss once and stop seeing: the card respects the dismissal, and the next time it appears, the signal has actually changed.",
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
    updated: "2026-11-22",
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
    updated: "2026-11-22",
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
          "Review the active sessions. Passwords are managed by AuthAction. Revercue does not offer two-factor authentication; passkeys are a passwordless sign-in method, not a second factor.",
          "Notification settings are per event on Growth and Scale. Follow-up reminders are available in-app on every plan; email reminders to the freelancer are available on Growth and above. Revercue sends its own transactional email for account, security and document notices. The newsletter is separate and off unless you ticked it.",
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
    updated: "2026-11-22",
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
    updated: "2026-11-22",
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
  {
    slug: "how-revercue-makes-a-document",
    title: "How Revercue makes a document",
    excerpt:
      "Your previous patterns, the search engines, the pattern engine, the UI engines, the old proposals, and the details you add in the form.",
    category: "Product",
    readMinutes: 9,
    updated: "2026-11-22",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "Between the click and the document",
        paragraphs: [
          "You click Create proposal. You fill the form. You pick a template. You click Continue. And the document is there. But what happened between the click and the document?",
          "Here is the honest answer. The document is not a template with blank fields. It is built from six sources, in order. Each source adds something the others cannot. The form is the foundation. The patterns are the memory. The search engines are the research. The pattern engine is the structure. The old proposals are the precedent. The UI engines are the visual language. The six together are the document.",
        ],
      },
      {
        heading: "1. The details you add in the form",
        paragraphs: [
          "The form is the first source. It is the only source that is entirely yours. You add the client, the client email, the industry, the service, the client website, your website, the problem you are solving, the target audience, the call to action, the sections you want, the packages, the FAQs, the embedded questions, the currency, the timeline, the tone, the scroll length. Every detail is used. None of it is ignored. The form is the foundation: the document is built on the facts you gave it.",
          "The form is also the boundary. The product does not invent the client, the industry, the service, or the problem. Those are yours. The search engines and the pattern engine add the context, the structure, and the visual language, but they do not change the facts. If you say the client is a restaurant in Islamabad, the document is a restaurant in Islamabad. The product does not guess. It builds on what you said.",
        ],
      },
      {
        heading: "2. Your previous patterns",
        paragraphs: [
          "The product remembers. It is not a blank slate. Every document you have created, every template you have picked, every tone you have used, every follow-up you have sent, every FAQ you have saved, every package you have offered. The product reads your own history and builds the new document from your own pattern, not a generic one.",
          "If you usually use a formal tone, the document is formal. If you usually follow up after three days, the suggestion is three days. If you usually offer three packages at $500, $1,200, and $2,500, the new document offers the same structure. If you usually include a What is included FAQ, the new document includes it. If you usually start with a Problem section and end with a Next step, the document follows the same shape. The pattern is the memory: the document sounds like you, because it is built from you.",
          "The pattern is not a lock. You can change anything. The pattern is the starting point, not the final. If you want a different tone, you change it. If you want a different package, you change it. The pattern is the default, and the default is your own.",
        ],
      },
      {
        heading: "3. The search engines",
        paragraphs: [
          "The product searches. It does not invent the industry context, the client details, the definitions, or the images. It fetches them. The search engines are the research: the industry summary, the client website metadata, the definitions of the unfamiliar terms, the location context, the images, the icons. Each search engine has a purpose, and the product uses the right one for the right question.",
          "The industry search returns the context: the summary of the industry, the image that represents it. The client search returns the samples: the public proposals and the business context. The definition search returns the meaning of the unfamiliar terms. The location search returns the geographic context, when it is relevant. The image search returns the image that fits the subject. The icon search returns the icon that represents the service. The product does not use every search engine for every document. It uses the one that is needed for the question at hand.",
          "The research is the context. The document is not a generic proposal; it is a proposal for a restaurant, or a SaaS, or an agency. The industry summary, the client website, the definitions, the images: those are what make the document specific, not generic. The research is the difference between a template and a document.",
        ],
      },
      {
        heading: "4. The pattern engine",
        paragraphs: [
          "The product organizes. The research is not a pile of facts. It is a structure. The pattern engine takes the research and the form and organizes them into the sections you chose. It fixes the tone, the completeness, the flow. It marks the missing information. It never invents.",
          "The pattern engine also uses the sample proposals for the structure. The public proposals are the reference for the shape: the sections, the order, the tone, the pricing presentation. The pattern engine reads the structure of the samples, not the text. It does not copy the samples; it learns the shape. The structure is the form, and the text is yours.",
          "The pattern engine is the structure. It is the difference between a document that reads like a list of facts and a document that reads like a proposal. The facts are the research; the structure is the pattern engine. The two together are the document.",
        ],
      },
      {
        heading: "5. The old proposals",
        paragraphs: [
          "The product learns from your own work. Your previous proposals are the precedent. The structure, the sections, the tone, the packages, the FAQs, the call to action. The new document follows the same shape. If you usually include a timeline, the new document includes a timeline. If you usually use a specific pricing table, the new document uses the same table. If you usually end with a Book a call button, the new document ends with the same button.",
          "The old proposals are not copied. They are the reference. The product reads the structure of your own work and builds the new document from the same shape. The precedent is the consistency: the document is not a new experiment every time; it is your own work, continued.",
        ],
      },
      {
        heading: "6. The UI engines",
        paragraphs: [
          "The product visualizes. The document is not just text. It has the charts, the diagrams, the images, the icons, the tables, the shapes. The UI engines are the visual language: the chart that shows the revenue, the diagram that shows the process, the image that shows the industry, the icon that shows the service, the table that shows the pricing, the shape that separates the sections.",
          "The UI engines are not a fixed layout. The product decides where the visual goes, not the template. The template defines the zone; the UI engines fill it. If the section has numbers, the chart. If the section has a process, the diagram. If the section has a service, the icon. If the section has a comparison, the table. The visual is placed in the zone, and the zone is the template is.",
          "The visual is editable. You can change the chart, the diagram, the image, the icon, the table. The UI engines are the starting point, not the final. The visual language is the difference between a document that reads like a wall of text and a document that reads like a designed proposal.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "The document is not a template. It is your pattern, your research, your structure, your precedent, your visual language, and your form details, in one document. The six sources are the document. The form is the foundation. The patterns are the memory. The search engines are the research. The pattern engine is the structure. The old proposals are the precedent. The UI engines are the visual language.",
          "The document is editable. You can change anything. The product is the pen; you are the author. The template is the starting point; the document is yours. The next step: the template, the edit, the preview, the link, the share. The client opens the link, reads the document, answers the questions, selects the package. The thread continues.",
          "The product does not lean on an assistant for its suggestions. It uses patterns, search engines, and UI engines. The patterns are your own. The search engines are the research. The UI engines are the visual language. The document is the thread's first artifact. The thread is the product. Your work should speak, not you.",
        ],
      },
    ],
  },
  {
    slug: "why-invite-only",
    title: "Why the paid plans are invite-only",
    excerpt:
      "Why Revercue's paid plans are invite-only, what the waitlist means, and how the invite works.",
    category: "Pricing",
    readMinutes: 7,
    updated: "2026-11-22",
    visual: "PricingVisual",
    sections: [
      {
        heading: "Why can't I just pay and start?",
        paragraphs: [
          "You land on the pricing page. You see the plans. The Free plan is available now. The paid plans — Starter, Growth, Scale — say Join the waitlist. Teams says Join the beta. You may wonder: why can't I just pay and start?",
          "Here is the honest answer. Revercue is in a fresh state. The product is built, the thread works, the Free plan is live. But the paid plans are not a checkout. They are an invitation. The waitlist is the invitation. The team reaches out when a spot opens. This is not a marketing trick. It is a deliberate choice, and here is why.",
        ],
      },
      {
        heading: "1. The product is new, and the support is real",
        paragraphs: [
          "Revercue is not a large company with a support team of fifty. It is a small team, and the support is personal. When a paid user has a problem, the team answers. When a paid user has a question, the team replies. When a paid user wants a feature, the team reads it. The invitation is how the team keeps the support real. If the paid plans were open, the team could not answer every user. The waitlist is the queue. The team invites the next user when it can support them well.",
        ],
      },
      {
        heading: "2. The paid plans carry more, and the more needs care",
        paragraphs: [
          "The Free plan is 5 active documents, 1-month retention, 50 MB storage, 3 notes per client. The paid plans carry more: 20, 100, or 300 active documents; 3, 12, or 24 months of retention; 100 MB, 1 GB, or 5 GB of storage; the advanced tracking, the interest level, the revenue tracker, the pattern learning, the saved FAQs, the saved packages. The more is not a switch. It is a relationship. The team wants to onboard each paid user, not just charge them. The invitation is the onboarding. The team shows the user what the paid plan does, and why it matters. The user is not alone with a new tier; the team is there.",
        ],
      },
      {
        heading: "3. The paid plans shape the product",
        paragraphs: [
          "The first paid users are not just customers. They are the product's test. They find the bugs, they ask for the features, they tell the team what works and what does not. The invitation is how the team keeps the first paid users close. If the paid plans were open, the first 100 users would be anonymous. The team would not know them, and the product would not learn from them. The waitlist is the feedback loop. The team invites the users who will shape the product, not the users who will just pay.",
        ],
      },
      {
        heading: "4. The fresh state is honest",
        paragraphs: [
          "The product is in a fresh state. It is not hiding behind a coming soon page. The Free plan is live. The thread works. The paid plans are the next tier, and the team is inviting the users one at a time. This is the honest version of launching. The team is not pretending the paid plans are open when they are not. The waitlist is the truth: the paid plans are coming, and the team is inviting the users when the product is ready for them.",
        ],
      },
      {
        heading: "What the waitlist means",
        paragraphs: [
          "The waitlist is a form. You add your email, the plan you want, and why. The team reads every entry. The team invites the users when a spot opens. The invitation is an email: You are invited to the plan. Here is what happens next. The invitation includes the onboarding, the support, and the plan's details. The invitation is not a payment link. It is the start of the relationship.",
          "If you are on the waitlist and you do not hear back, it is not a rejection. It is the queue. The team invites the users as the product grows. The Free plan is still there. You can use the thread today, with the Free plan, while you wait. The Free plan is not a trial; it is the product, with the limits. The paid plans are the next step, when the team can support them.",
        ],
      },
      {
        heading: "What the beta means",
        paragraphs: [
          "Teams is in beta. The team features — the Handoff Dashboard, the roles, the bulk transfer, the audit log — are being tested with a small group. The beta is the co-creation. The team invites the beta users, the beta users use the features, the team learns, the features improve. The beta is not the same as the waitlist. The waitlist is the queue for the paid plans. The beta is the test for the team features. Both are the invitation. Both are the honest version of launching.",
        ],
      },
      {
        heading: "The invitation is the product's promise",
        paragraphs: [
          "The paid plans are invite-only because the product is new, the support is real, the more needs care, the first users shape the product, and the fresh state is honest. The invitation is not a limitation. It is the product's promise: the team is there, the onboarding is real, the feedback matters, the users are known. The waitlist is the queue. The Free plan is available now. The paid plans are the next step, when the team can support them.",
          "If you are a freelancer with a real client, the Free plan is enough to start. The thread is there. The proposal, the contract, the form, the invoice, the client record. The paid plans are the next tier, when the team invites you. The Free plan is the product; the paid plans are the product with more. The invitation is the honest bridge between the two. Your work should speak, not you.",
        ],
      },
    ],
  },
  {
    slug: "active-documents",
    title: "What are active documents",
    excerpt:
      "What an active document is, what counts against the limit, what does not, and how the password-protected and adaptive forms follow the same rule.",
    category: "Pricing",
    readMinutes: 6,
    updated: "2026-11-22",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "What is an active document?",
        paragraphs: [
          "Every plan has an active-document limit. The Free plan has 5. The Starter has 20. The Growth has 100. The Scale has 300. The Teams has 500. You may wonder: what is an active document? What counts? What does not?",
          "Here is the honest answer. An active document is a document that is published and shareable. It has a public link. The client can open it. The client can read it, answer the questions, select a package, ask a question. The document is live. It is the thread's current artifact. The active-document limit is the number of live documents you can have at one time.",
        ],
      },
      {
        heading: "What counts against the limit",
        paragraphs: [
          "The documents that are published and shareable. The proposal with a public link. The contract with a public link. The form with a public link. The invoice with a public link. Each one counts. If you have 3 published proposals, 1 published contract, and 1 published invoice, you have 5 active documents. The Free plan's 5 is full.",
          "The password-protected documents count. The password is a layer on top of the published document; it is not a different document. The document is still active; the client still opens the link; the password is the gate. The password-protected document is the published document with a wall. It counts against the limit. The Growth plan has 15 password-protected documents active at one time; the Scale plan has 50. The number is the active password-protected documents, not the total documents. The limit is the same rule: the published document counts, the password is the gate.",
          "The adaptive forms count. The branching, the questions, the thank-you page: those are features of the form. The form is still a published document. The client still opens the link; the branching is the logic. The adaptive form is the published form with the logic. It counts against the limit. The Growth plan has 3 adaptive forms; the Scale plan has 15; the Teams plan has unlimited. The number is the active adaptive forms, not the total forms. The limit is the same rule: the published form counts, the logic is the feature.",
        ],
      },
      {
        heading: "What does not count against the limit",
        paragraphs: [
          "The drafts. A draft is a document that has been created but not published. It has no public link. The client cannot open it. The draft is the work in progress, not the live document. The draft does not count against the active-document limit. The draft has its own retention: Free 10 days, Starter 30, Growth 50, Scale 80, Teams 80. If the draft is not published within the retention, it is deleted. The draft is the before, the active document is the after. The limit is the after.",
          "The archived documents. An archived document is a document that was published and then archived. The public link no longer works. The document is not live. The archived document does not count against the active-document limit. The archive has its own limit: Free 5 at once, 15 days; Starter 15, 30 days; Growth, Scale and Teams 30, 30 days. The archive is the closed, the active document is the open. The limit is the open.",
          "The deleted documents. A deleted document is gone. It does not count. The delete is the end, the active document is the now. The limit is the now.",
        ],
      },
      {
        heading: "The password-protected and the adaptive: the same rule",
        paragraphs: [
          "The password-protected document and the adaptive form follow the same rule as the published document: they count. The password is not a second document; it is the gate on the published document. The branching is not a second form; it is the logic on the published form. The active document is the published document, with or without the password, with or without the branching. The limit is the published document. The password and the branching are the features, not the count.",
          "The password-protected limit (Growth 15, Scale 50) and the adaptive-form limit (Growth 3, Scale 15, Teams unlimited) are sub-limits. They are the number of the active documents that can have the feature. The active-document limit is the total. The sub-limit is the part. The two are the same rule: the published document counts, the feature is the gate. The Growth plan can have 100 active documents, of which 15 can have a password and 3 can be adaptive. The Scale plan can have 300 active documents, of which 50 can have a password and 15 can be adaptive. The Teams plan can have 500 active documents, of which an unlimited number can have a password and an unlimited number can be adaptive.",
        ],
      },
      {
        heading: "Why the limit exists",
        paragraphs: [
          "The limit is the storage and the support. Each active document is stored, tracked, and supported. The limit is how the plan keeps the product sustainable. The Free plan has 5; the Starter 20; the Growth 100; the Scale 300; the Teams 500. The limit is the ceiling, not the floor. You can have fewer; you cannot have more. The limit is the plan's shape.",
          "The limit is also the nudge. When you reach the limit, the product says: You have 5 of 5 active documents. Archive or delete one to create a new one. The nudge is not a block; it is a decision. You archive a document (the link closes, the document is kept, the active count decreases) or you delete a document (the document is gone, the active count decreases). The nudge is the housekeeping. The active document is the live document; the archive is the closed; the delete is the gone. The limit is the live.",
        ],
      },
      {
        heading: "The one-line rule",
        paragraphs: [
          "An active document is a published, shareable document. The password-protected document is an active document with a gate. The adaptive form is an active form with logic. The draft is not active. The archived is not active. The deleted is not active. The limit is the published documents. The password and the branching are the features, not the count. The active document is the thread's current artifact; the limit is the thread's current size. Your work should speak, not you.",
        ],
      },
    ],
  },
  {
    slug: "plans-explained",
    title: "The plans, explained",
    excerpt:
      "The five plans, what each one adds, and the limits that actually change how you work.",
    category: "Pricing",
    readMinutes: 6,
    updated: "2026-11-22",
    visual: "PricingVisual",
    sections: [
      {
        heading: "Five plans, two states",
        paragraphs: [
          "Free is available now. Starter, Growth and Scale are invite-only: join the waitlist and the team reaches out when a spot opens. Teams is in beta: join the beta and the team tests the team features with you. Nothing about the thread changes between the plans. The proposal, the contract, the form, the invoice and the client record are the same product on every tier. What changes is how much of it you can keep at once, and how long you keep it.",
        ],
      },
      {
        heading: "What each tier adds",
        paragraphs: [
          "Free gives you 5 active documents, 1-month retention, 50 MB of storage, 3 notes per client, and the full thread. It is the product, not a demo.",
          "Starter adds room: 20 active documents, 3-month retention, 100 MB, 10 notes per client, and 3 custom templates. Email notifications start on Growth, not Starter.",
          "Growth adds the features that change how a document is made: 100 active documents, 12-month retention, 1 GB, 10 custom templates, 10 saved FAQs, 10 saved packages, 3 adaptive forms, 15 password-protected documents, the follow-up suggestions, and no Revercue branding on the client pages.",
          "Scale adds the numbers: 300 active documents, 24-month retention, 5 GB, 15 custom templates, 30 saved FAQs, 15 saved packages, 15 adaptive forms, 50 password-protected documents, the advanced tracking, the interest level, the revenue overview, project expense recording, expense categories, the what-revercue-knows page, the custom thank-you page, and the full set of suggestions. The price suggestion is not available.",
          "Teams adds the people: 500 active documents, 36-month retention, 10 GB, unlimited custom templates, saved FAQs, saved packages, password-protected documents and adaptive forms, everything on Scale, and the team features — the Handoff Dashboard, the roles, the bulk transfer and the audit log. Teams is in beta.",
        ],
      },
      {
        heading: "The limits that actually matter",
        paragraphs: [
          "Active documents are the live ones: published, with a public link. A draft is not active. An archived document is not active. Deleting ends it. The password is a gate on a published document, not a second document, so a password-protected proposal still counts once. The same is true of an adaptive form: the branching is a feature of the form, not a second form.",
          "Drafts have their own clock: 10 days on Free, 30 on Starter, 50 on Growth, 80 on Scale and Teams. Publish inside it or lose the draft. The archive has a count and a window too: 5 for 15 days on Free, 15 for 30 on Starter, 30 for 30 on Growth and above.",
        ],
      },
      {
        heading: "What happens when a document expires",
        paragraphs: [
          "The documents are rented; the client record is owned. When retention runs out, the document is deleted — but a PDF is emailed to you before the deletion, and the CRM record, the communication log and the notes stay. The thread survives the document. That is the difference between renting a document and owning the relationship.",
        ],
      },
      {
        heading: "How a limit is actually counted",
        paragraphs: [
          "Every plan limit is counted the same way, at the same moment, from the same table. The active documents are the published ones with a live link. The password does not create a second document, so a password-protected proposal counts once. The branching on a form does not create a second form, so an adaptive form counts once. The draft is not published, so it counts against nothing but the draft clock. The archive is not live, so it counts against the archive allowance instead.",
          "That single rule removes most of the confusion people bring from other products. Here, archiving a proposal is housekeeping that buys you room. There, the same action is a paid feature or a permanent delete. The count goes down the moment the link closes, and the document is still there if the client comes back.",
          "The counting also explains the sub-limits. Growth allows 100 active documents, of which 15 may carry a password and 3 may be adaptive. The 15 and the 3 are ceilings inside the 100, not additions to it. A plan can be full on passwords and still have room for forty more proposals without one. That is why the settings page shows four bars and not one: documents, storage, archive and password-protected each move on their own.",
        ],
      },
      {
        heading: "What retention means in practice",
        paragraphs: [
          "Retention is the life of the document after it is published, not the life of the account. Free keeps a document for one month; Starter for three; Growth for twelve; Scale for twenty-four; Teams for thirty-six. The clock starts when the document is published, not when the draft was created.",
          "When the clock runs out the document is deleted, and a PDF of it is emailed to you first. The client record is untouched: the notes, the communication log, the follow-ups and the linked activity stay. This is the sentence worth remembering from the whole pricing page: the documents are rented, the client record is owned. You are not paying to keep a relationship alive; you are paying to keep the artifact live for longer.",
          "Drafts have their own clock, and it is shorter: ten days on Free, thirty on Starter, fifty on Growth, eighty on Scale and Teams. A draft that is never published is deleted quietly, because an unpublished document costs storage and is not part of the thread yet.",
        ],
      },
      {
        heading: "Choosing between Starter and Growth",
        paragraphs: [
          "The honest answer is that most freelancers choose on one of two things: how many proposals are live at once, or whether the client page carries your brand alone. Starter gives you twenty documents and three custom templates. Growth gives you a hundred documents, ten templates, ten saved FAQs, ten saved packages, three adaptive forms, fifteen password-protected documents and no Revercue branding on the client pages.",
          "If you send two proposals a week and archive the dead ones, Starter is enough room for a long time. If you run a pipeline where a dozen clients are deciding at once, or if the client page is part of how you sell, Growth is the plan that stops the ceiling from being the thing you think about.",
          "Growth is also where the reusable content starts: the FAQ you answer most often, the package you sell most often, both saved once and pulled into the next document. That saving is not about features; it is about the number of times you type the same paragraph in a month.",
        ],
      },
      {
        heading: "Choosing Scale",
        paragraphs: [
          "Scale is the plan for the freelancer who has stopped asking how many documents fit and started asking what the account knows. Three hundred active documents, twenty-four months of retention, five gigabytes of storage, fifty password-protected documents and fifteen adaptive forms are the room. The interest level, the revenue overview, project expense recording, expense categories and the what-revercue-knows page are the intelligence. The price suggestion is not available.",
          "The revenue overview is available on every plan. Project expense recording and totals are available on Growth. Expense categories, platform and provider records and spending breakdowns are available on Scale. The price suggestion is not available.",
          "The same is true of the advanced suggestions: the follow-up timing becomes your own median delay instead of the product's default, and the document suggestions follow your own intent-to-document pattern instead of a generic one. Nothing new is invented; the plan changes whose pattern the product reads.",
        ],
      },
      {
        heading: "Teams, and what beta means",
        paragraphs: [
          "Teams carries everything on Scale and adds the handoff: the Handoff Dashboard, the roles, the bulk transfer and the audit log, with five hundred active documents and thirty-six months of retention. It is in beta, which means the team features are being tested with a small group and will change as that group uses them.",
          "Joining the beta is not joining the waitlist. The waitlist is the queue for the paid solo plans. The beta is the test for the team features. Both are invitations, and neither is a checkout.",
        ],
      },
      {
        heading: "Upgrading, downgrading, and the waitlist",
        paragraphs: [
          "The paid plans are invite-only in this fresh state. You join the waitlist with your email, the plan you want and why; the team reads the entries and invites people when it can support them properly. An invitation is an email that says what happens next, not a payment link.",
          "Downgrades take effect at the end of the cycle. Documents above the new limit are archived rather than deleted, so the links close but nothing is lost. If you go from a hundred live documents to twenty, eighty of them move to the archive and the archive allowance of the lower plan applies. That is the moment the archive limit matters most, and it is why the archive is counted separately.",
          "Nothing on the pricing page is a trial. Free is free forever, with limits. The paid plans are the same product with more room and more intelligence, and the invitation is how the team keeps the room honest.",
        ],
      },
      {
        heading: "What the plan never changes",
        paragraphs: [
          "The thread is the same on every plan. The proposal, the contract, the form, the invoice and the client record work identically; the client pages look the same; the interactive link is the interactive link. The free plan is not a demo with the product switched off. The only differences are quantity, retention, storage and the depth of the suggestions.",
          "That is a deliberate shape. A freelancer on Free can send a proposal to a real client this afternoon and look exactly as professional as a freelancer on Scale. The upgrade is about how much you can keep and how much the product can learn from you, not about whether the work is good enough to send.",
          "The last thing worth saying about plans is that the limits are honest in both directions. Nothing expires because a timer ran out on a plan you never chose, nothing is charged without an invitation, and nothing you have written is held hostage. If you stop paying, the documents archive and the record stays. The product is trying to be the cheapest part of the relationship, and the pricing page is written to be read once, not re-checked every month.",
          "If you only remember one line from this guide, remember the order: first the thread, then the room it needs. Start on Free, send a real proposal, watch where the limit actually bites — active documents, storage or retention — and choose the plan that answers that specific bite. Paying for room you do not use is the only genuinely bad plan decision there is.",
        ],
      },
      {
        heading: "Storage, and what actually fills it",
        paragraphs: [
          "Storage is simpler than it looks: it counts the files you upload, not the documents you build. A proposal with forty blocks and three charts is text and layout, and text is close to free. The storage bar moves when you add a logo, a client's brand asset, a photographed page, an uploaded PDF in a form submission, or an image inside a document. Five gigabytes on Scale is a lot of logos and a fair number of photographs.",
          "The practical advice is to compress before uploading and to delete the file you replaced. A logo that was replaced three times is three files until someone cleans up. The settings page shows the usage; the file itself is deleted when you delete the document that used it, and the draft that was never published takes its files with it.",
          "If the bar is close to full and you do not want to upgrade, the answer is almost always a replaced asset or an archived document with a large image, not a document you need. Archives still hold their files until the archive window closes.",
        ],
      },
      {
        heading: "The archive, and why it is separate",
        paragraphs: [
          "The archive is a parking space with its own allowance and its own clock: five documents for fifteen days on Free, fifteen for thirty on Starter, thirty for thirty on Growth and above. Archiving closes the public link, keeps the document and its content, and returns the active-document slot immediately. The client who opens an archived link sees a closed page, not a broken one.",
          "It is separate because the two limits answer different questions. The active limit asks how many conversations are open. The archive limit asks how much closed work you are keeping. A freelancer can be at five of five active with an empty archive, or at two of five active with five archived documents waiting for a decision. The bars tell you which problem you have.",
          "The archive is also the safe way to handle a downgrade. When a plan change lowers the active limit, the excess is archived rather than deleted, so nothing is destroyed by a billing decision. You can unarchive a document later if a slot opens, and the link comes back with the same address.",
        ],
      },
    ],
  },
  {
    slug: "ask-the-helper",
    title: "Ask the helper",
    excerpt:
      "Select a sentence, ask for a rewrite, and decide whether to take it. What the helper can do, what it will not do, and where it runs.",
    category: "Product",
    readMinutes: 9,
    updated: "2026-11-22",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "A tool you point at a sentence",
        paragraphs: [
          "The helper is the inline assistant inside the builders. It is not a chat window and it is not a separate product. It works on one thing at a time: the text you have selected. You are writing the introduction of a proposal, the scope of a contract, the notes on an invoice, the description of a form. You write a sentence, you read it back, and something about it is not right. That is when you use the helper.",
          "The design is deliberate. A writing assistant that can change your whole document is a writing assistant you have to watch. A writing assistant that answers one selected passage, shows you the before and the after, and waits is one you can trust. The helper is the second option.",
        ],
      },
      {
        heading: "How the flow works",
        paragraphs: [
          "Select a sentence or a paragraph in the text field. A small Ask the helper button appears beside the field. Click it and a panel opens with the quick actions and a box for your own instruction.",
          "Choose an action, or type something specific: make it sound more confident, shorten it to two sentences, remove the jargon. The helper rewrites the passage and shows you both versions, the before above and the after below, so you can read them against each other instead of trusting a result you cannot see.",
          "Then you choose. Replace puts the rewrite in place of the selection. Insert below keeps your original and adds the rewrite underneath, which is useful when you want both and will edit them together. Cancel closes the panel and changes nothing. You can also click into the original and adjust it yourself, with the panel still open, because the selection only moves when you select something new.",
        ],
      },
      {
        heading: "The seven quick actions",
        paragraphs: [
          "Make it formal removes the contractions and the casual asides without flattening the meaning. Make it friendly warms the opening and the close, which matters on a follow-up and matters less in a liability clause. Make it concise cuts the padding and keeps the facts, and it is the action most people use most.",
          "Expand adds the detail the sentence implies but does not state; use it when a scope line is too thin to protect you. Fix the grammar repairs the agreement, the tense and the punctuation, and changes nothing else. Simplify breaks a long sentence into shorter ones and replaces the jargon. Change the wording rewrites the same idea in different words, which is what you want when a sentence is correct but reads awkwardly.",
        ],
      },
      {
        heading: "What happens to your data",
        paragraphs: [
          "The text you select is never sent to a Revercue server, never sent to the team, and never stored in the database. Nothing about the passage or the rewrite reaches us at any point in the flow, not when you select it, not when you ask, not when you accept the rewrite.",
          "The team cannot read the passage you selected, the rewrite that came back, or the document you are editing. The team sees the account details — your email, your name, your plan and your usage — and nothing of the content. That distinction is the point: the content is yours, and the helper is the tool that works on it.",
        ],
      },
      {
        heading: "What it will not do",
        paragraphs: [
          "It will not change the document on its own. There is no mode where the helper edits while you are not looking. Every change goes through Replace or Insert below, and both are clicks you make.",
          "It will not invent facts. It rewrites what is in front of it. If your scope does not mention a revision limit, the helper will not add one, because a number it made up is a number you would have to honour. If the passage is missing something, the post-document review is where you find out, not the helper.",
          "It will not rewrite the whole document at once. Select a passage, work on it, select the next one. A document written that way still sounds like a person wrote it, because a person chose every line.",
        ],
      },
      {
        heading: "Where you will find it",
        paragraphs: [
          "In the proposal builder, on the text of a heading, a paragraph, a quote, a card, a next step, and on an FAQ answer. In the contract builder, on the same blocks and on the clause text. On an invoice, on the notes to the client. In the form editor, on the description and on a question's explanation. Anywhere the product asks you to write prose, the helper is one selection away.",
          "It is also the thing behind the writing area in the CRM, where you plan a message before you copy it into your own email or WhatsApp. There the helper suggests a warmer opening or a clearer ask, and you decide what to keep before anything leaves your hands.",
        ],
      },
      {
        heading: "When the button is not there",
        paragraphs: [
          "Some browsers and some devices cannot run the helper. In that case the button is simply not rendered: no warning, no broken control, no message about compatibility. The text fields keep working exactly as before, and you write the passage yourself. Nothing else in the builder depends on the helper, so the product is whole without it.",
          "This is a quiet choice on purpose. A feature that cannot run should not announce itself in the middle of your work. It should be absent, and the work should continue.",
        ],
      },
      {
        heading: "The habit worth building",
        paragraphs: [
          "Write the sentence badly first. Get the fact down, in whatever words arrive, and then select it and ask for concise or formal. Most of the value of the helper is not in the first draft; it is in the second pass, when you already know what the sentence has to say.",
          "Keep the rewrite you did not use. Insert below is not a compromise; it is a way to keep two versions of a line and choose later, when you have read the whole document and know which voice fits. The helper is a pen, not the author. You are the author.",
        ],
      },
    ],
  },
  {
    slug: "post-document-analysis",
    title: "The post-document review",
    excerpt:
      "The review that runs after Create: a score out of 100, the issues behind it, and what to do with them before you send.",
    category: "Product",
    readMinutes: 9,
    updated: "2026-11-22",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "What runs after Create",
        paragraphs: [
          "You press Create. The document is published to its link, and then the review runs. It reads what you just built and gives you two things: a quality score out of 100, and a list of the issues that produced it. The review appears once, in front of you, before the share modal. You read it, decide, and either go back into the builder or publish anyway.",
          "The score is not a grade on your work and it is not a gate. Publishing is a button on the same panel. The review exists because most documents are sent within a minute of being written, and a minute is not enough time to notice that the pricing block is missing or that the close is three screens down.",
        ],
      },
      {
        heading: "The two layers",
        paragraphs: [
          "The pattern engine checks the structure. It looks at the sections you said you wanted and the sections that actually exist, the presence of the pricing, the presence of a next step, the length of the document against the length you chose, the tone you set against the words on the page, and the repetition of a line in two places. Those checks are arithmetic and comparison; they do not need to read for meaning.",
          "The helper checks the prose, when it is available. It reads the text for readability, flow and clarity, and returns one short note rather than a rewrite. That note is attached to the same list. The text is not sent to a Revercue server to produce the note.",
          "The two layers are separated on purpose. Structure problems are objective: a missing pricing block is missing whether or not the writing is good. Prose problems are judgment, and they come from a different place.",
        ],
      },
      {
        heading: "The score bands",
        paragraphs: [
          "Eighty and above is ready. The sections are there, the pricing is there, the close is there, and nothing in the prose stalled the read. Send it.",
          "Fifty to seventy-nine is good with a few improvements. Usually one thing is missing: a next step, a pricing block, or a section you chose but never wrote. The list tells you which; fixing it takes a minute and moves the score.",
          "Under fifty is not ready. More than one structural piece is absent, or the document is far shorter than the shape you chose. That is not a failure, it is an unfinished draft that was published by accident. Keep editing is the right answer.",
        ],
      },
      {
        heading: "The three tags",
        paragraphs: [
          "From this client's history: the issue comes from the shape of this relationship — the document is not linked to a client record, the length is short for a first proposal to this client, the client's previous documents ran longer. These are the issues a colleague who knows the account would raise first.",
          "From your usual method: the issue comes from how you normally work — a section you usually include is empty, a sentence pattern you usually avoid has crept in, the formal tone has contractions in it. These are the issues you would notice yourself on a second read.",
          "From what works: the issue comes from the shape of the accepted documents across the product — no pricing block, no clear next step, a paragraph long enough to lose the reader, a repeated line. These are the issues that do not depend on who you are.",
        ],
      },
      {
        heading: "What it checks, and what it does not",
        paragraphs: [
          "It checks the structure, the sections, the pricing, the timeline, the tone consistency, the call to action, the length against the shape you chose, the paragraphs that run long, the sentences that run long, a repeated line, and whether the document is linked to a client.",
          "It does not check whether the price is right, whether the timeline is achievable, or whether the client will say yes. It does not check the legal sufficiency of a clause, and it does not replace a read. It also does not block: there is no state in which the product refuses to publish because the score is low.",
        ],
      },
      {
        heading: "How to use it well",
        paragraphs: [
          "Read the list twice. The first pass, fix what is missing, because a missing section is the difference between a document and a fragment. The second pass, read the prose notes and decide which ones you agree with. Some will be wrong for this client, and that is fine: the review is a second pair of eyes, not the final word.",
          "Then publish. A document with a score of seventy-two that goes out today beats a document with a score of ninety that goes out on Friday afternoon. The score measures the document, not the relationship.",
          "If you publish anyway, nothing is recorded against you and nothing is hidden. The review is a mirror, and a mirror does not keep a record of what it saw.",
        ],
      },
      {
        heading: "The bands are not the product",
        paragraphs: [
          "The number is a summary of the checks, and a summary always loses something. A document at eighty-two can still be the wrong proposal for the wrong client, and a document at fifty-eight can be exactly what the client asked for in three lines. Treat the score as a checklist pressure, not a verdict.",
          "What you are actually buying from the review is the pause. It is the thirty seconds between writing and sending, in which someone — even a pattern — asks whether the pricing is on the page and whether the client has anywhere to click. Most of the value of a review is that it happens at all.",
          "The review also leaves a trace you can compare. Publish three proposals in a week and the scores tell you which shape you write well and which one you rush. That is not a ranking of you; it is a pattern in your own work, and the pattern engine is good at exactly that kind of counting.",
        ],
      },
    ],
  },
  {
    slug: "communication-log",
    title: "The communication log",
    excerpt:
      "The timeline inside the client record: what an entry holds, what reads it, and why the log is the memory of the thread.",
    category: "Product",
    readMinutes: 9,
    updated: "2026-11-22",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "The record is the body, the log is its memory",
        paragraphs: [
          "Every client record has a communication log. It is the main body of the page, below the summary and beside the documents. Each line is one moment in the relationship: a message you sent, a reply you received, a follow-up you made, a document you created, a document you shared. Put together, those lines are the history of the account.",
          "The log exists because the thread is not only the documents. A proposal, a contract, an invoice: those are the artifacts. The reason the client said yes, the thing they asked on a call, the day you promised to send the revision — that is the log. Without it the client record is a folder. With it, the record is the account.",
        ],
      },
      {
        heading: "What an entry holds",
        paragraphs: [
          "Direction: outgoing or incoming. It is the difference between what you said and what they said, and it changes how you read a silence.",
          "Channel: email, WhatsApp, phone, or in person. The channel tells you where to look for the original and how the client prefers to be reached, which is the single most useful fact in an account.",
          "The message itself, short and in your own words. It is not a copy of the email; it is the note that lets you remember the email a month later.",
          "The estimated time, so a follow-up due today can be sorted against one due next week. The linked document, so the entry and the proposal are one thought. The next step, because a log without a next step is a diary. The follow-up date, so the record can surface it on the day.",
        ],
      },
      {
        heading: "Adding an entry takes fifteen seconds",
        paragraphs: [
          "Open the client record, add the entry, choose the direction and the channel, write the line, set the next step and the date. If the message went out through your own email, paste nothing: the log is not the inbox, and the line is enough. If the client answered a document, link the document and the entry reads as the response to it.",
          "The discipline is to add the entry when you send, not later. Fifteen seconds at the send is worth an hour of reconstruction in three weeks, and the reconstruction is always worse: you remember the tone, not the date, and the date is the part that matters.",
        ],
      },
      {
        heading: "What reads the log",
        paragraphs: [
          "The interest level reads it. The message count, the last direction, the days since the last interaction: an account with three unanswered messages is not the same as an account that replied yesterday, and the level says so without you counting.",
          "The suggestions read it. A proposal sent with no reply becomes a follow-up suggestion; a client who agreed in a message becomes a contract suggestion. The suggestion is late or early depending on what the log knows.",
          "The fifteen-day summary reads it. Open a client record on Scale and the summary tells you what was sent, what the client did, and what is next — written from the entries, not invented. If the log is thin, the summary is thin, and that is honest.",
        ],
      },
      {
        heading: "The timeline, not the inbox",
        paragraphs: [
          "The log is a record, not a mail client. It does not receive messages, it does not send them, and it does not sync with your inbox. You write the line that matters. That is why it stays readable: an inbox is everything, and a log is the part worth keeping.",
          "It also means the log survives a deleted document. When retention runs out and the proposal is deleted, the entries that mention it stay. The document is rented; the record — and its log — is owned.",
        ],
      },
      {
        heading: "Editing, and privacy",
        paragraphs: [
          "You can edit an entry and you can delete one. Correcting a date is normal; deleting a mistake is normal. The log is your record of the account, and a record you cannot correct stops being used.",
          "The log is private to the account. The team does not read it; the team sees the account details for support and billing, not the communication. The client does not see it either: the client sees the documents, never the notes about them.",
        ],
      },
      {
        heading: "The habit that makes the thread work",
        paragraphs: [
          "Write the log for the version of you who will open this record in six weeks and remember nothing. What was sent, what came back, what was promised, and when you said you would speak again. Four facts, one line.",
          "Do that and the suggestions get sharper, the interest level gets truer, and the summary reads like someone who was there. Skip it and the product still works, but the thread thins into documents with no memory. The documents are the thread's artifacts; the log is the thread's history.",
          "One more habit: write the next step as an action you will take, not a state you hope for. Waiting for the client is not a next step; sending the revised scope on Thursday is. The record can only surface what you wrote down, and a sentence with a verb in it is the only kind it can act on. When the date arrives, the follow-up is there, the message is half written, and the account moves without you holding it in your head.",
          "The log also makes the handover possible. If someone else picks up the account, or if you come back from a week away, the entries are the brief. Direction, channel, what was said, what is next: four lines, and the new reader knows where the relationship stands. That is what a client record is for, and it is the part no other tool in the stack holds for you.",
        ],
      },
    ],
  },
  {
    slug: "electronic-signatures",
    title: "Electronic signatures in Revercue",
    excerpt: "How Revercue records a real signature from you and then from your client, locks the version, and produces a countersigned PDF.",
    category: "Contracts",
    readMinutes: 9,
    updated: "2026-11-22",
    visual: "ContractVisual",
    sections: [
      { heading: "What an electronic signature is", paragraphs: ["An electronic signature is a record that a person intended to sign a document and did so on a specific version of that document at a specific time. It is not the same as a typed name in a chat message, and it is not the same as clicking an 'I agree' button without reading. The signature is evidence of intent, identity and consent, captured in a way that can be stored, replayed and verified later.", "Revercue does not treat a button click as a signature. A real signature requires a name, an explicit consent statement, a version of the contract, and a timestamp. All four are recorded together so that, months later, anyone can see who signed what, when, and on which version."] },
      { heading: "How electronic signatures differ from typed names and ordinary approvals", paragraphs: ["A typed name in an email is a statement, but it is not bound to a document version. If the contract changes after the email, the name no longer clearly applies. An ordinary approval button records that someone pressed a button, but it says nothing about what they read or agreed to.", "Revercue binds the signature to the exact contract version. The version is hashed and the hash is stored with the signature. If the contract is edited afterwards, the hash no longer matches and the signature is visibly invalid. This is what makes the signature meaningful rather than decorative."] },
      { heading: "How Revercue's freelancer-first, client-second process works", paragraphs: ["The workflow has two signing steps in a fixed order. First the freelancer reviews and finalizes the contract draft. Then the freelancer signs that exact version. Only after the freelancer's signature is recorded and locked may the contract be published to the client. The client then opens the secure public signing page, reviews the same version, and signs. The backend verifies both signatures and creates the countersigned PDF.", "The order matters. The freelancer signs first because the freelancer is the party who wrote and stands behind the terms. The client signs second because the client is accepting those terms. Reversing the order would let a client sign a draft the freelancer had not committed to, which is not a contract anyone can rely on."] },
      { heading: "What the signer is agreeing to", paragraphs: ["By signing, the signer confirms that they have read the contract, that they understand its terms, and that they intend to be bound by it. The consent wording is shown on screen and must be ticked explicitly. The signature is not recorded if consent is not given.", "The signer is not agreeing to anything beyond the text of the contract. Revercue does not add terms, does not change wording, and does not attach conditions that are not in the document."] },
      { heading: "How consent is collected", paragraphs: ["Consent is collected through an explicit checkbox with wording that states what the signer is agreeing to. The checkbox must be ticked before the sign button is enabled. The signature and the consent are stored together, so the record shows not only that a name was entered but that the consent statement was accepted at the same time.", "Consent cannot be implied from navigation, from opening the link, or from scrolling. It must be a deliberate action."] },
      { heading: "How contract versions are protected", paragraphs: ["Once a contract is signed by either party, that version is locked. No further edits are allowed to the signed version. If changes are needed, a new version is created and the signing process starts again on the new version.", "The backend detects version conflicts. If two people try to sign the same version at once, or if the version changed between the time the page loaded and the time the signature was submitted, the server returns an error and the signature is not recorded. The signer is asked to reload and review the current version before trying again."] },
      { heading: "How signing timestamps and audit records work", paragraphs: ["Each signature is recorded with the signer's name, the signer's email where available, the exact version signed, the timestamp, the IP address and the user agent of the browser used. These fields are stored as an audit record attached to the contract version.", "The timestamps are server timestamps, not the clock on the signer's device. This prevents a signer from backdating or forward-dating a signature. The audit record is read-only and cannot be edited through the application."] },
      { heading: "How the completed PDF is generated and accessed", paragraphs: ["After both parties have signed, the backend generates a countersigned PDF that contains the full contract text and both signatures with their audit details. The PDF is stored securely and is available through a short-lived, authorized download link that the freelancer can request from the contract page.", "The download link expires. If it expires, the freelancer can request a fresh one. Possessing the public contract link is not enough to download the PDF; the download token is required and is validated against the contract and version."] },
      { heading: "How both parties should review a contract before signing", paragraphs: ["Before signing, read the whole document, including the cancellation, liability and payment terms. Check that the client name, the scope, the deliverables, the timeline and the price match what was agreed. If anything is wrong, decline or ask a question instead of signing.", "The freelancer should open the public link themselves before sending it, to see exactly what the client will see. The client should ask for changes in writing if a clause is unclear, rather than signing and hoping it does not matter."] },
      { heading: "What happens if a party declines", paragraphs: ["Either party can decline. A decline records the reason, if one is given, and closes that version of the contract. The freelancer can then revise the terms and create a new version for the client to review.", "A decline is not a failure of the process. It is the process working as intended: no one is forced to sign something they do not agree with."] },
      { heading: "What happens if the contract needs changes", paragraphs: ["A signed contract cannot be edited. If a change is needed, the freelancer creates a new version. The new version is a fresh document with its own version number and its own signing process. The old version remains on record as signed, so there is always a clear history of what was agreed at each point."] },
      { heading: "How to handle signing errors or expired links", paragraphs: ["If a signing submission fails, the error message states the reason: a version conflict, a missing consent, an expired link, or a rate limit. The signer should not retry blindly. They should reload the page, review the current version, and try again.", "If a signing link has expired, the freelancer can publish a fresh one. Links are short-lived by design, to limit the window in which a stolen link could be used."] },
      { heading: "Record keeping and document security", paragraphs: ["Signed contracts and their audit records are retained according to the retention policy. Invoices and fully signed contracts are not automatically deleted. The freelancer can delete a draft or an archived document, but a fully signed contract remains available for download as long as the account exists.", "Access to the signed PDF is gated by an authorized download token. The token is validated against the contract and version, and it expires after a short time."] },
      { heading: "Responsibilities of freelancers and clients", paragraphs: ["The freelancer is responsible for making sure the contract accurately describes the work, the price, the timeline and the terms, and for not publishing it until they have signed it. The client is responsible for reading the contract before signing and for declining if anything is wrong.", "Both parties are responsible for keeping their own copy of the signed PDF. Revercue provides the download link, but the parties should save the file to their own records."] },
      { heading: "Limitations of electronic signatures", paragraphs: ["An electronic signature records intent and consent. It does not verify identity beyond the email address and the browser session used. It does not provide a qualified or advanced electronic signature, a certificate-based signature, or a notarized signature. It does not guarantee that a court in any particular jurisdiction will accept it.", "Revercue does not claim that its signatures are legally enforceable everywhere. The signature is evidence, and evidence is weighed by the law that applies."] },
      { heading: "How applicable law and jurisdiction affect enforceability", paragraphs: ["Whether an electronic signature is enforceable depends on the law that governs the contract and the jurisdiction in which it is enforced. Different countries and regions have different rules about what counts as a valid signature, what evidence is required, and which types of documents can be signed electronically.", "Revercue is not a law firm and does not provide legal advice. The guide is written for customers and explains how the product works. Have the contract and the signing process reviewed by qualified legal counsel before relying on it for a high-value or regulated transaction."] },
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
        "If email does not arrive, check spam filters and inbox rules; the account itself is not the cause.",
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
        "Accept suggestions in the same spirit: they are shortcuts to the next action, not instructions. The price suggestion is not available.",
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
        "Four settings repay a single visit. Profile: your logo, colours and contact details, because every client page inherits them. Notifications: per-event email toggles, so a busy week does not train you to ignore the inbox. Security: active sessions and password change; passwords are managed by AuthAction. Revercue does not offer two-factor authentication. Appearance: dark, light or system, stored on the device rather than the account.",
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
