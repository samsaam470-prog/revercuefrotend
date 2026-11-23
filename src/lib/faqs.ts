export interface Faq {
  id: number;
  question: string;
  answer: string;
  group:
    | "product"
    | "plans"
    | "documents"
    | "tracking"
    | "data"
    | "crm"
    | "design"
    | "support"
    | "email"
    | "signatures";
}

/**
 * The FAQ copy. Source: faqs.txt with rules.txt applied:
 * no "AI" claims in the marketing voice (Rule 1), no MVP / version names
 * (Rule 2), no Payoneer (Rule 3), Teams is in beta (Rule 4). The dataset is the
 * single source of truth for the page-specific FAQ sections and for /faqs; the
 * counts are derived from `FAQS.length`, never written by hand.
 */
export const FAQS: Faq[] = [
  {
    id: 1,
    group: "product",
    question: "What is Revercue?",
    answer:
      "Revercue is a tool for freelancers and agencies. It keeps your client work in one thread: proposal, contract, requirement form, invoice, and client record. The documents are interactive links, not PDFs. The client opens a link, reads, answers questions, and selects a package. You see the activity, and the client record builds itself.",
  },
  {
    id: 2,
    group: "product",
    question: "How is this different from sending a PDF?",
    answer:
      "A PDF is a dead file. You send it, you wait, you do not know if it was opened. Revercue sends a link. You see when it was opened, how long the client spent, which FAQs they expanded, which questions they answered, and which package they selected. The client can ask a question from the page. The proposal is a conversation, not a file.",
  },
  {
    id: 3,
    group: "product",
    question: "Do I need to code to use it?",
    answer:
      "No. You build the proposal from a template, edit the text and the blocks, and click Create. The link is generated. You share it from your own WhatsApp or email. No code, no design tool, no developer.",
  },
  {
    id: 4,
    group: "product",
    question: "Is this a CRM?",
    answer:
      "It has a CRM, but it is not just a CRM. The client record is one part of the thread. The thread is the product. The CRM is where the thread lands.",
  },
  {
    id: 5,
    group: "product",
    question: "Does Revercue send my writing to a server?",
    answer:
      "No. The helper's work never reaches a Revercue server: the text you select, the rewrite that comes back and the document you are editing are not sent to us and are not stored in the database; the team cannot read them. The suggestions elsewhere in the product use patterns: keyword matching, frequency counting and arithmetic over your own record. Nothing is applied without you: you review each suggestion and choose what to change, and Revercue does not make that change on your behalf. The footer has four buttons that open an outside assistant (ChatGPT, Perplexity, Claude, Gemini) with a pre-filled question about Revercue — the answer comes from that tool, not from us.",
  },
  {
    id: 6,
    group: "product",
    question: "What are the five modules?",
    answer:
      "Proposals, Contracts, Requirement Forms, Invoices, and the CRM. The Document Builder is the engine that the proposal, contract, and invoice builders share. The form editor is a separate tool. The CRM is a record.",
  },
  {
    id: 7,
    group: "product",
    question: "What is \"the thread\"?",
    answer:
      "The thread is the client relationship: the proposal that started it, the contract that sealed it, the form that collected the requirements, the invoice that got you paid, and the client record that holds it all. Revercue keeps the thread in one place. Other tools break it across five apps.",
  },
  {
    id: 8,
    group: "product",
    question: "Can I use only one module?",
    answer:
      "Yes. You can use only proposals, or only invoices, or only the CRM. The thread is more powerful when you use all of it, but you are not forced to. The Free plan lets you try the whole thread.",
  },
  {
    id: 9,
    group: "product",
    question: "What is the tagline?",
    answer: "\"Your work should speak, not you.\"",
  },
  {
    id: 10,
    group: "product",
    question: "What is the thesis?",
    answer: "\"A thread, not disconnected workflows.\"",
  },

  {
    id: 11,
    group: "plans",
    question: "What are the plans?",
    answer:
      "Free (available now), Starter, Growth, Scale (invite-only), and Teams (in beta). The paid plans are invite-only in the fresh state. You join the waitlist, and the team reaches out when a spot opens. Teams is in beta. You join the beta.",
  },
  {
    id: 12,
    group: "plans",
    question: "What is the difference between the plans?",
    answer:
      "The plans scale on active documents, retention, storage, and the advanced features. Free has 5 active documents, 1-month retention, and basic CRM suggestions. Starter adds custom templates, previous outreach patterns and follow-up strategy. Growth adds saved FAQs, saved packages, adaptive forms, no Revercue branding, in-context paragraph suggestions, detailed prompts using previous data and project expense recording. Scale adds advanced tracking, the interest level, the revenue overview, expense categories, the what-revercue-knows page, the custom thank-you page and broader client-history context. Teams adds the team features (in beta). The price suggestion is not available.",
  },
  {
    id: 13,
    group: "plans",
    question: "How do I pay?",
    answer:
      "The paid plans are invite-only in the fresh state. Join the waitlist. The team will contact you with the next steps when a spot opens. The Free plan is available now, no invitation needed.",
  },
  {
    id: 14,
    group: "plans",
    question: "Can I pay annually?",
    answer: "Annual billing is not available yet. Join the waitlist for updates.",
  },
  {
    id: 15,
    group: "plans",
    question: "Can I downgrade?",
    answer:
      "Yes. At the end of your billing cycle. You choose which documents to keep within the new plan's limit. The rest are archived, and you have 7 days to download the PDFs.",
  },
  {
    id: 16,
    group: "plans",
    question: "What happens to my documents if I downgrade?",
    answer:
      "You keep up to the new plan's active-document limit. The rest are archived. A PDF of each is emailed to you. The archived documents are deleted after the new plan's archive retention. The CRM records survive.",
  },
  {
    id: 17,
    group: "plans",
    question: "Do you offer refunds?",
    answer:
      "No refunds. If you downgrade, the plan changes at the end of the cycle. If you delete your account, the data is deleted after a 5-day grace period.",
  },
  {
    id: 18,
    group: "plans",
    question: "What is the Teams plan?",
    answer:
      "Teams is the agency plan. It adds the Handoff Dashboard, the team roles, the bulk transfer, the audit log, and the team attribution. Teams is in beta. The team is testing the team features with a small group. You can join the beta from the Pricing page.",
  },
  {
    id: 19,
    group: "plans",
    question: "What is the difference between the waitlist and the beta?",
    answer:
      "The waitlist is for the paid plans (Starter, Growth, Scale). The paid plans are invite-only in the fresh state. You join the waitlist, and the team reaches out when a spot opens. The beta is for Teams. Teams is in beta. You join the beta, and the team will reach out to include you in the test. The Free plan is available now.",
  },
  {
    id: 20,
    group: "plans",
    question: "What is the Free plan?",
    answer:
      "The Free plan is free forever, not a trial. It includes 5 active documents, 1-month retention, 50 MB storage, 3 notes per client, and the full thread. It is enough to try the product with real clients.",
  },
  {
    id: 21,
    group: "plans",
    question: "What happens if I exceed my plan's active-document limit?",
    answer:
      "You cannot create a new document. The app says: \"You have 5 of 5 active documents. Archive or delete one to create a new one.\" You can archive a document (it no longer counts) or delete one.",
  },
  {
    id: 22,
    group: "plans",
    question: "What happens if I exceed my storage limit?",
    answer:
      "You cannot upload a new file. The app says: \"Storage limit reached (50 MB on your plan).\" You can delete an old file or join the waitlist for a paid plan.",
  },

  {
    id: 23,
    group: "documents",
    question: "Can I add a custom template?",
    answer:
      "Yes, on Starter, Growth, Scale and Teams. Free uses suggested templates. You can upload your own HTML template as a file, or paste a URL. Revercue fetches it, sanitizes it, caches it, and renders it in your builder. Your custom template appears in your template selection screen.",
  },
  {
    id: 24,
    group: "documents",
    question: "Will my template be available to other users?",
    answer:
      "No. Your custom template is private to your account. No other user can see it. The team cannot see it either. It is stored in your file storage, not in a shared library.",
  },
  {
    id: 25,
    group: "documents",
    question: "Can I use a blank template?",
    answer:
      "Yes. On the template selection screen, there is a \"Start from blank\" card. It opens an empty canvas with the block library. The requirement form data appears in the suggestions panel. You can insert any of it with one click.",
  },
  {
    id: 26,
    group: "documents",
    question: "Can I request a feature or a specific colour or font?",
    answer:
      "Yes. Use the feedback prompt after a milestone, or Settings → Feedback, which is always available. Every request goes to the feedback inbox. We read every message. We do not promise to build everything, but we do read everything.",
  },
  {
    id: 27,
    group: "documents",
    question: "Can I edit a document after I share it?",
    answer:
      "Yes. The document is a live link. When you edit it, the client sees the new version on the next open. The communication log records \"Document edited.\"",
  },
  {
    id: 28,
    group: "documents",
    question: "What is the \"Make new from this\" action?",
    answer:
      "On any document, it copies the content, opens the copy in the builder, and lets you change the client and any other field. The new document is a new active document. It counts against your limit. The original stays as it was.",
  },
  {
    id: 29,
    group: "documents",
    question: "Can I password-protect a document?",
    answer:
      "Yes, on Growth and Scale. In the share modal, toggle \"Require a password,\" set a password (min 6 characters), and send it to the client separately. The client sees a password wall. The session remembers the password for 30 minutes. Three wrong attempts lock the wall for 15 minutes. Growth allows 15 password-protected documents; Scale allows 50.",
  },
  {
    id: 30,
    group: "documents",
    question: "What happens when the retention period ends?",
    answer:
      "The document is permanently deleted. Before deletion, a PDF is emailed to you. The CRM record survives: the client name, email, dates, service, and a one-line summary. The documents are rented; the CRM record is owned.",
  },
  {
    id: 31,
    group: "documents",
    question: "What is the draft retention?",
    answer:
      "A draft is a document created but not published. Drafts have their own retention: Free 10 days, Starter 30, Growth 50, Scale 80, Teams 80. If you do not publish the draft, it is deleted. A PDF is emailed to you first. A draft does not count against the active-document limit.",
  },
  {
    id: 32,
    group: "documents",
    question: "What is the archive?",
    answer:
      "Archiving makes the public link unusable. The document stays in your records. It is removed from the active-document count. Archive limits: Free 5 at once, 15-day retention; Starter 15, 30 days; Growth, Scale, Teams 30, 30 days. When the archive retention ends, the document is permanently deleted.",
  },
  {
    id: 33,
    group: "documents",
    question: "What are the saved FAQs?",
    answer:
      "On Growth and Scale, you can save FAQs to a personal library. When you create a proposal, the saved FAQs are pre-filled automatically. A saved FAQ is deleted after 3 months of not being used. You are warned 10 days before deletion. Growth 10, Scale 30. Free and Starter do not have saved FAQs.",
  },
  {
    id: 34,
    group: "documents",
    question: "What are the saved packages?",
    answer:
      "On Growth and Scale, you can save a package (name, price, deliverables, description, Recommended flag). It appears in the builder's \"Saved packages\" section. Limits: Growth 10, Scale 15. Retention: 3 months, 10-day warning.",
  },
  {
    id: 35,
    group: "documents",
    question: "What is the scroll length?",
    answer:
      "It is the length of the document. Short, Medium, or Long. It drives the number of sections and the number of visuals. Short is 3–4 sections; Long is 8–12 sections.",
  },
  {
    id: 36,
    group: "documents",
    question: "What is the visual intelligence?",
    answer:
      "It is the system that decides where a visual goes in the document. It reads the content and decides: this section needs an image, this section needs a chart, this section needs a diagram, this section needs an icon. The visual is placed in the template's zone. The visual is editable.",
  },
  {
    id: 37,
    group: "documents",
    question: "What can I add to a document?",
    answer:
      "Heading, paragraph, quote, list, image, graph, divider, spacer, card, two and three column rows, pricing table, packages, timeline, FAQ, embedded question, file upload, button, signature, shape and next step. Each one is inserted from the left panel and configured in the right panel; the ones that carry words also accept Ask the helper and the text formatting toolbar.",
  },
  {
    id: 38,
    group: "documents",
    question: "Can I change how my documents look?",
    answer:
      "Yes, within the design system. You choose the brand primary and secondary colours, the page width, and per block the alignment, colour and inline formatting (bold, italic, underline, size, colour). You also choose the template you start from. The type scale and spacing stay fixed, so every document you send looks like the same product rather than a different deck each time. Custom font uploads are not part of the product.",
  },
  {
    id: 39,
    group: "documents",
    question: "Are the screenshots on this site real?",
    answer:
      "Yes. The visuals on this site are the real product components rendered live in the page — the dashboard, the builder, the chart and the client page — built from the same code as the app, not mocked images. When the product changes, the page changes with it. They are responsive and they animate.",
  },
  {
    id: 40,
    group: "documents",
    question: "Why is the design dark?",
    answer:
      "The dark base is the product's identity. It is calm, focused, and premium. The gold is the accent. The serif headlines give the product a document feel. The sans body is readable. The mono is for the copyable values.",
  },
  {
    id: 41,
    group: "documents",
    question: "What is the password wall?",
    answer:
      "When a document is password-protected, the client sees a wall: \"This document is protected. Enter the password to continue.\" The client enters the password, and the document opens. The session remembers the password for 30 minutes. Three wrong attempts lock the wall for 15 minutes.",
  },
  {
    id: 42,
    group: "documents",
    question: "What is the closed page?",
    answer:
      "When a document is archived, the client who opens the link sees a closed page: \"This proposal is no longer available.\" No content. The freelancer's contact. The link is not a 404; it is a designed \"closed\" page.",
  },

  {
    id: 43,
    group: "tracking",
    question: "What tracking do I get on each plan?",
    answer:
      "Free: opened (yes/no). Starter: opened-at timestamp. Growth: time spent (estimate) and button clicks. Scale: exact time, session timeline, deselect, typing time, per-question time, not-submitted state, behavioural signals. The tracking is reduced to a time-spent total after 5 days; the raw events are deleted.",
  },
  {
    id: 44,
    group: "tracking",
    question: "What is the interest level?",
    answer:
      "On Scale, it is a 0–100 score calculated from the client's behaviour: the message count, the last message direction, the proposal opened, the proposal answered, the contract approved, the invoice paid, the days since the last interaction, and whether you marked them not interested. It is arithmetic, not an assistant.",
  },
  {
    id: 45,
    group: "tracking",
    question: "How does the suggestion engine work?",
    answer:
      "The admin writes instructions (the \"what to suggest\") and patterns (the \"when to suggest\") and pairs them. The system evaluates the pattern; when it matches, the instruction fires. The default applies the first time. After 3–5 actions, the system adjusts to your own pattern. A suggestion never changes your work by itself: you review it and choose whether to act, and Revercue does not make the change on your behalf.",
  },
  {
    id: 46,
    group: "tracking",
    question: "Does the suggestion engine learn from my data?",
    answer:
      "Yes. It records what you do with each suggestion (accept, dismiss, ignore) and adjusts the timing and the path to your own pattern. It is arithmetic on your own data.",
  },
  {
    id: 47,
    group: "tracking",
    question: "Can I disable email notifications for specific things?",
    answer:
      "Yes. On Growth and Scale, Settings → Notifications shows each event with its own toggle. Turn off any event you do not want an email for. The other events still send. In-app notifications are always on; email is the opt-in layer.",
  },
  {
    id: 48,
    group: "tracking",
    question: "What is the revenue tracker?",
    answer:
      "On every plan, it shows the earned revenue and pending payments. On Growth and above, project expense recording and totals are included. On Scale, expense categories, platform and provider records and spending breakdowns are included. The price suggestion is not available.",
  },
  {
    id: 49,
    group: "tracking",
    question: "What is the price suggestion?",
    answer:
      "The price suggestion is not available. It is not a current feature and no release date is promised.",
  },
  {
    id: 50,
    group: "tracking",
    question: "What is the follow-up?",
    answer:
      "It is the reminder you set in the communication log. You set a follow-up date and a next step. On the date, the dashboard's \"Follow-ups due today\" count increases, and a notification is created. You click \"Mark done\" when it is done.",
  },
  {
    id: 51,
    group: "tracking",
    question: "What is the form reminder?",
    answer:
      "On Scale, when a client opens a form and does not submit it after 3 days, a suggestion fires: \"The client opened the form 3 days ago, not submitted. Send a reminder?\"",
  },
  {
    id: 52,
    group: "tracking",
    question: "What is the reopen suggestion?",
    answer:
      "On Scale, when a client is marked \"not interested\" but the interest level is 80%+, a suggestion fires: \"The client marked not interested, but the interest is 82%. Reopen the conversation?\"",
  },

  {
    id: 53,
    group: "email",
    question: "How does Revercue deliver email?",
    answer:
      "Revercue sends its own transactional email for account, security and document notices. Authentication, email verification and password resets are handled by AuthAction. The newsletter is a separate opt-in, in Settings → Notifications.",
  },

  {
    id: 57,
    group: "data",
    question: "Do you sell my data?",
    answer:
      "No. We do not sell your data. We do not share your client data with any third party. The infrastructure providers (Cloudflare, Backblaze B2, Turso) store the data but do not read it.",
  },
  {
    id: 58,
    group: "data",
    question: "What does the Revercue team see?",
    answer:
      "The team sees your account details (email, name, business name, plan, usage counts, last login, feedback) for support and billing. The team does not see the content of your documents, your client names, your communication log, your notes, your saved FAQs, your templates, or your tracking data. The exception is a report of illegal use or a legal requirement.",
  },
  {
    id: 59,
    group: "data",
    question: "What is encrypted?",
    answer:
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your password is hashed with bcrypt. Your document passwords are hashed. Your documents are stored in a private bucket and served through a Worker proxy.",
  },
  {
    id: 60,
    group: "data",
    question: "What happens to my data if I delete my account?",
    answer:
      "You have a 5-day grace period. Before deletion, a PDF of your documents and a CSV of your clients are emailed to you. After 5 days, the account, the documents, the client records, the communication log, the files, and the feedback are deleted. The payment records are kept for tax and legal reasons.",
  },
  {
    id: 61,
    group: "data",
    question: "Can I export my data?",
    answer:
      "Yes. Settings → Export gives you a CSV of your clients and a PDF of your documents.",
  },
  {
    id: 62,
    group: "data",
    question: "What is the \"What Revercue knows about me\" page?",
    answer:
      "On Scale and Teams, Settings → What Revercue knows about me is a read-only transparency page. It shows what the platform stores about you, what is private, what the team can see, what is encrypted, what is shared with third parties, what you can do with your data, and what Revercue does not know.",
  },
  {
    id: 63,
    group: "data",
    question: "Where is my data stored?",
    answer:
      "In Cloudflare (the Workers, the D1 database), in Turso (the auth and admin data), and in Backblaze B2 (the files). The infrastructure providers store the data but do not read it.",
  },
  {
    id: 64,
    group: "data",
    question: "Who can see my documents?",
    answer:
      "Only you and the client you shared the link with. The documents are private. The team does not read them. The exception is a report of illegal use or a legal requirement.",
  },
  {
    id: 65,
    group: "data",
    question: "Do you use my data to train a model?",
    answer:
      "No. We do not train a model on your data. The product uses the patterns (the aggregates, anonymized) to improve the suggestions, not your specific content. The data is yours.",
  },
  {
    id: 66,
    group: "data",
    question: "What is the 15-day summary?",
    answer:
      "When you close a client (archive or mark not interested), 15 days later the app generates a summary: a 2–3 sentence recap of the relationship. The summary is saved to the client record. You are notified when it is ready.",
  },
  {
    id: 67,
    group: "data",
    question: "Can I see the team's access to my data?",
    answer:
      "The team does not access your content. There is nothing to log. The team sees the account details (email, name, plan, usage) for support and billing. The \"What Revercue knows\" page states the exception (illegal use, legal requirement).",
  },
  {
    id: 68,
    group: "data",
    question: "What is the retention model?",
    answer:
      "The documents are rented; the CRM record is owned. Every document has a retention period by plan. When the retention ends, the document is deleted, and a PDF is emailed to you. The CRM record survives.",
  },

  {
    id: 69,
    group: "crm",
    question: "Where do I plan a message before sending it?",
    answer:
      "It is the form in the CRM where you plan the message you are about to send. You choose the client, write the message, and the helper (if available) suggests improvements and fixes the grammar. You copy the message and send it from your own email or WhatsApp. Revercue does not send.",
  },
  {
    id: 70,
    group: "crm",
    question: "What is the communication log?",
    answer:
      "It is the timeline of the client relationship: the messages sent, the replies received, the follow-ups, the documents created and shared. It is the main body of the client record.",
  },
  {
    id: 71,
    group: "crm",
    question: "What are the client notes?",
    answer:
      "They are the private notes you write about the client. Free allows 3 per client, Starter 10, Growth and above unlimited. The notes are only visible to you.",
  },
  {
    id: 72,
    group: "crm",
    question: "What are the follow-ups?",
    answer:
      "They are the reminders you set in the communication log. You set a follow-up date and a next step. On the date, the dashboard's \"Follow-ups due today\" count increases, and a notification is created.",
  },
  {
    id: 73,
    group: "crm",
    question: "What is the client profile?",
    answer:
      "It is the saved memory: the name, email, company, phone, channel, industry, target audience, website, value proposition, key points, logo. It is built once (on the first document for the client) and reused.",
  },
  {
    id: 74,
    group: "crm",
    question: "What is the interest breakdown?",
    answer:
      "On Scale, it is the modal that shows the 0–100 score, the signals (the message count, the last direction, the proposal opened, the contract approved, the invoice paid, the days since), the arithmetic, and the one-line: \"This is arithmetic, not an assistant.\"",
  },
  {
    id: 75,
    group: "crm",
    question: "What is the revenue tab?",
    answer:
      "On Scale, it is the client-level view: the earned from this client, the spent on this client, the profit, the expense list, and the price suggestion.",
  },
  {
    id: 76,
    group: "crm",
    question: "What is the expense entry?",
    answer:
      "On Scale, you add an expense per client: the amount, the category (domain, hosting, video editing, etc.), the platform (Namecheap, GoDaddy, Adobe Premiere, etc.), the date, the note.",
  },
  {
    id: 77,
    group: "crm",
    question: "What is the 15-day summary for?",
    answer:
      "It is the permanent record of the closed relationship. When you return months later, you read the summary and remember the client.",
  },
  {
    id: 78,
    group: "crm",
    question: "Can I reopen a closed client?",
    answer:
      "Yes. On the client detail, the \"Reopen\" action sets the status back to active. The summary is not deleted; it stays as the record.",
  },
  {
    id: 79,
    group: "crm",
    question: "Can I delete a client?",
    answer:
      "Yes. The delete action removes the client record. The documents linked to the client are kept (or deleted, your choice). The communication log is deleted with the client.",
  },
  {
    id: 80,
    group: "crm",
    question: "What is the client's channel?",
    answer:
      "It is the preferred channel: Email, WhatsApp, Phone, In-person, Other. It is used in the communication log and the writing area.",
  },

  {
    id: 81,
    group: "design",
    question: "How do buttons respond when I click them?",
    answer:
      "Every control answers in the same order: it lifts on hover, shows a gold focus ring when you reach it with the keyboard, presses in when clicked, sits at half opacity when disabled, shows a spinner while it works, and shows a red border plus a sentence when something fails. The same six answers on every screen, so nothing surprises you mid document.",
  },
  {
    id: 82,
    group: "design",
    question: "Why is only one button gold?",
    answer:
      "Gold is for one thing per screen: the primary action. If two gold buttons appear, one is wrong. The secondary is a ghost button.",
  },
  {
    id: 83,
    group: "design",
    question: "What fonts do my documents use?",
    answer:
      "A serif for headlines, a sans for body text, and a mono for values you copy such as invoice numbers and references. They come from the template and stay fixed, which is what makes two documents from the same account look related. What you can change is the weight, size and colour of a selection, from the toolbar that appears when you select text.",
  },
  {
    id: 84,
    group: "design",
    question: "How are groups of options laid out?",
    answer:
      "The question sits above, then the options in one labelled group, one choice per line. A screen reader reads the question and then the set, never a loose field. Nothing is placed beside its own label, and nothing is spread across two columns on a narrow screen.",
  },
  {
    id: 85,
    group: "design",
    question: "What will I see before I add anything?",
    answer:
      "An empty screen that tells you the first action: a short headline, one sentence about what will appear here, and the button that starts it. The dashboard, the client list, the documents list and the builder all do this. Nothing pretends to have data, and nothing shows a fake row to look finished.",
  },
  {
    id: 86,
    group: "design",
    question: "What is the loading state?",
    answer:
      "Every list, table, and feed has a loading state: a skeleton (a grey block with a shimmer). It is not a spinner in the middle of the page.",
  },
  {
    id: 87,
    group: "design",
    question: "What is the error state?",
    answer:
      "Every list, table, and feed has an error state: a short message and a \"Retry\" button. It is not a silent failure.",
  },
  {
    id: 88,
    group: "design",
    question: "What is the destructive action confirmation?",
    answer:
      "Every destructive action (delete, archive, downgrade, delete account) has a confirmation modal. The modal names the consequence.",
  },
  {
    id: 89,
    group: "design",
    question: "What is the form validation?",
    answer:
      "Every field has a label (always visible), a helper (optional), and an error line. The error appears below the field in red. The submit button is disabled until the required fields are valid.",
  },
  {
    id: 90,
    group: "design",
    question: "What is the responsive behavior?",
    answer:
      "Every screen is mobile-first. The header collapses to a hamburger. The tables scroll horizontally. The cards stack. The modals are full-screen on mobile.",
  },

  {
    id: 91,
    group: "support",
    question: "How do I contact support?",
    answer:
      "The Contact page has a form. We reply within one business day. For bug reports, use Settings → Feedback. The direct email is support@revercue.co.uk.",
  },
  {
    id: 92,
    group: "support",
    question: "Is there a mobile app?",
    answer:
      "Not yet. The public site and the dashboard are responsive and work in the mobile browser. The client-facing pages are mobile-first.",
  },
  {
    id: 93,
    group: "support",
    question: "What browsers are supported?",
    answer:
      "Recent versions of Chrome, Edge, Safari, and Firefox. The core product works on every modern browser: documents, clients, invoices and tracking. The helper inside the builders needs newer graphics support; where it cannot run, its button is not shown and the text fields work normally — there is no notice and nothing else changes. The suggestions are patterns, not the helper, and they work everywhere."
  },
  {
    id: 94,
    group: "support",
    question: "How do I reset my password?",
    answer:
      "Password resets are handled by AuthAction. Open the Log In screen, start the secure sign-in, then choose \"Forgot password?\" on AuthAction's page. If the address has an account, AuthAction sends the reset link itself. The email comes from AuthAction, not from Revercue. Your new password is set with AuthAction.",
  },
  {
    id: 95,
    group: "support",
    question: "Does Revercue support two-factor authentication?",
    answer:
      "No. Revercue does not offer two-factor authentication, email OTP, or authenticator codes. Sign-in itself is handled by AuthAction; Revercue does not add a second factor of its own.",
  },
  {
    id: 96,
    group: "support",
    question: "How do I delete my account?",
    answer:
      "Settings → Delete Account. Type your email address to confirm. Your account is scheduled for deletion in 5 days. A PDF of your documents and a CSV of your clients are emailed to you. You can cancel the deletion by logging in during the 5 days.",
  },
  {
    id: 97,
    group: "support",
    question: "What do the footer links do?",
    answer:
      "They open an outside assistant (ChatGPT, Perplexity, Claude, Gemini) with a pre-filled question about Revercue. The answer comes from that tool, not from us. The prompt is written by us, so the answer is about the product. If you want the official answer, read the FAQs, the Guides, or the Pricing page.",
  },
  {
    id: 98,
    group: "support",
    question: "How can I trust you?",
    answer:
      "Trust is earned, not given. You do not need to trust us blindly. Check the Security page (the encryption, the storage, the retention), the Privacy page (what we collect, who we share it with), the \"What Revercue knows about me\" page (on Scale), and the Compare page. The Free plan exists so you can try the product without paying. The data is yours; the export is in Settings. The trust is built on the transparency.",
  },
  {
    id: 99,
    group: "support",
    question: "Why is a feature not available in my browser?",
    answer:
      "One feature needs a modern browser with graphics support: the helper inside the builders. When your browser cannot run it, the Ask the helper button is not shown at all — no warning, no broken control — and every text field works exactly as before. The rest of the product, including the suggestions, the tracking and the client pages, does not depend on it.",
  },
  {
    id: 100,
    group: "support",
    question: "What makes Revercue different?",
    answer:
      "Three things. The thread: the client work in one place. The interactive document: the documents are links, not PDFs. The client record builds itself. The design: the product is built to feel like one workspace, not five tools. The honesty: the product does not claim an assistant where it uses patterns. The data is yours. The trust is earned by the transparency.",
  },
  {
    id: 101,
    group: "support",
    question: "What device do you suggest to use for Revercue?",
    answer:
      "You can use Revercue on any device — a laptop, a desktop, a tablet, or a phone. The product works in any modern browser (Chrome, Edge, Safari, Firefox). For the best experience when building and rendering documents with visuals (charts, diagrams, images), we suggest a device with 4 GB of RAM or more. The documents are interactive and can get heavy; a modern browser with enough memory keeps the rendering smooth. On older or low-memory devices, the core product works, but the visual rendering may be slower.",
  },
  {
    id: 102,
    group: "product",
    question: 'What is "Ask the helper"?',
    answer:
      "Ask the helper is the inline assistant in the builder. You select a piece of text, click Ask the helper, and it can rewrite the text in a different tone, fix the grammar, expand it, simplify it, or change the wording. The helper is a tool, not an action. It suggests a rewrite; you decide whether to replace the text, insert it below, or cancel. The text you select is not sent to Revercue, not sent to the team, and not stored in the database. The team cannot read the text you selected, the rewrite the helper suggested, or the document you are editing. The team sees the account details (your email, your name, your plan, your usage), not the content. The content is yours; the helper is the tool that works on it. If the helper is unavailable in your browser, the Ask the helper button is not shown, and you edit the text manually.",
  },
  {
    id: 103,
    group: "documents",
    question: "What is post-document analysis?",
    answer:
      "Post-document analysis is the review that runs after you click Create. It reads the document and gives you a quality score (0–100) and a list of issues. The score is both the pattern engine's (the structure, the missing sections, the tone consistency) and the helper's (the readability, the flow, the clarity). The issues are tagged by source (From this client's history, From your usual method, From what works). You see the score and the issues, and you decide whether to fix them or publish anyway. The analysis is not a gate; it is a quality signal.",
  },
  {
    id: 104,
    group: "signatures",
    question: "Is an electronic signature legally binding?",
    answer: "An electronic signature can be legally binding, but it depends on the law that governs the contract and the jurisdiction in which it is enforced. Different regions have different rules about what counts as a valid signature and what evidence is required. Revercue does not claim that its signatures are enforceable everywhere. Consult qualified legal counsel for high-value or regulated transactions.",
  },
  {
    id: 105,
    group: "signatures",
    question: "How does Revercue signing work?",
    answer: "The freelancer reviews and finalizes the contract, signs that exact version, and then publishes it to the client. The client opens the secure public signing page, reviews the same version, and signs. The backend verifies both signatures and generates a countersigned PDF. No one can sign before the freelancer, and no one can edit a signed version.",
  },
  {
    id: 106,
    group: "signatures",
    question: "Why must the freelancer sign first?",
    answer: "The freelancer is the party who wrote and stands behind the terms. Signing first commits the freelancer to the version being sent. If the client could sign first, a client could accept a draft the freelancer had not finalized, which is not a contract anyone can rely on.",
  },
  {
    id: 107,
    group: "signatures",
    question: "Does the client sign the same contract version?",
    answer: "Yes. The client signs the exact version the freelancer signed. The version is hashed and the hash is stored with each signature. If the contract is edited after signing, the hash no longer matches and the signature is visibly invalid.",
  },
  {
    id: 108,
    group: "signatures",
    question: "Can a contract be edited after signing?",
    answer: "No. A signed version is locked and cannot be edited. If changes are needed, the freelancer creates a new version with its own version number and signing process. The old signed version remains on record, so there is always a clear history of what was agreed.",
  },
  {
    id: 109,
    group: "signatures",
    question: "What happens if a client declines?",
    answer: "A decline records the reason, if one is given, and closes that version of the contract. The freelancer can then revise the terms and create a new version for the client to review. A decline is the process working as intended: no one is forced to sign something they do not agree with.",
  },
  {
    id: 110,
    group: "signatures",
    question: "Can both parties access the signed PDF?",
    answer: "Yes. After both parties sign, the backend generates a countersigned PDF. The freelancer can request a short-lived, authorized download link from the contract page. The client receives access through the signing flow. The download token is required and is validated against the contract and version.",
  },
  {
    id: 111,
    group: "signatures",
    question: "What information is recorded?",
    answer: "Each signature records the signer's name, email where available, the exact version signed, a server timestamp, the IP address, and the browser used. Consent is recorded together with the signature. These fields form a read-only audit record attached to the contract version.",
  },
  {
    id: 112,
    group: "signatures",
    question: "Can someone sign on a mobile device?",
    answer: "Yes. The signing page works in a mobile browser. The signer types their name, ticks the consent checkbox, and submits. No app installation is required.",
  },
  {
    id: 113,
    group: "signatures",
    question: "What happens if a signing link expires?",
    answer: "The freelancer can publish a fresh link. Links are short-lived by design to limit the window in which a stolen link could be used. The old link stops working once it expires.",
  },
  {
    id: 114,
    group: "signatures",
    question: "What happens if a signature submission fails?",
    answer: "The error message states the reason, such as a version conflict, missing consent, an expired link, or a rate limit. The signer should reload the page, review the current version, and try again rather than retrying blindly.",
  },
  {
    id: 115,
    group: "signatures",
    question: "How should signed contracts be stored?",
    answer: "Both parties should save their own copy of the signed PDF. Revercue provides the download link, but the parties are responsible for keeping their own records. Signed contracts are retained according to the retention policy and are not automatically deleted.",
  },

];

export const FAQ_TOTAL = FAQS.length;

export function faqsByGroup(groups: Faq["group"][]): Faq[] {
  return FAQS.filter((faq) => groups.includes(faq.group));
}
