export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  body: { heading?: string; paragraphs: string[] }[];
}

const BASE_POSTS: BlogPost[] = [
  {
    slug: "how-to-get-a-contract-signed-online",
    title: "How to get a contract signed online: six workflows, compared",
    excerpt:
      "Typed name, DocuSign, Dropbox Sign, Adobe, PandaDoc, SignWell — what each workflow actually asks of you and the client, and when a plain link is enough.",
    date: "2026-11-22",
    readMinutes: 9,
    body: [
      {
        paragraphs: [
          "Most freelancers do not need an e-signature platform. They need one contract signed by one client, without printing, scanning or chasing. That is a smaller job than the category suggests, which is why six different products can all be the right answer depending on who you are.",
          "An electronic signature is not one technology. At its core it is evidence: the signer saw the terms, intended to agree, and the record shows who signed what and when. ESIGN in the US, eIDAS in the EU and similar laws build validity around intent and a reliable record rather than a picture of handwriting. This is not legal advice: for a regulated or high-value deal, ask a lawyer whether the law expects a qualified signature.",
        ],
      },
      {
        heading: "1. A typed name inside the document (Revercue)",
        paragraphs: [
          "Workflow: you write the contract in the builder, then sign it first with your full name and an explicit consent tick; publishing stays blocked until you do. The client opens one link, reads the same version without an account, types a full name, ticks consent and signs. The record keeps both signatures, the date and the version, and the contract produces a countersigned PDF.",
          "Best when the contract sits beside the proposal and the invoice, there are one or two signers, and the client should do nothing but open a link. Approval can chain straight into the requirement form or the invoice, so nobody re-types the scope.",
          "Where it stops: this is a simple electronic signature, with no certificate, no identity verification and no audit certificate. If the deal needs a qualified or notarised signature, or a vendor the counterparty recognises, use one of the platforms below. The two coexist easily: heavy contracts elsewhere, everyday ones in the thread.",
        ],
      },
      {
        heading: "2. DocuSign",
        paragraphs: [
          "Workflow: upload a PDF or use a template, drag signature, initials, date and text fields onto the page, add recipients and a signing order, then send. The signer opens the email, adopts a signature and signs; identity checks and access codes exist on higher plans. When everyone has signed, DocuSign stores a completion certificate with timestamps, IP addresses, signer emails and a document hash.",
          "Best when a counterparty expects the name, several stakeholders sign in sequence, or procurement wants a formal audit trail. It is the safest enterprise default and the heaviest option for a two-page agreement; pricing is seat-based and climbs quickly.",
        ],
      },
      {
        heading: "3. Dropbox Sign (formerly HelloSign)",
        paragraphs: [
          "Workflow: upload the PDF, drag the fields, add signers and a message, send from your own address or the API, and let reminders run. The audit trail records views, signatures, timestamps and IP addresses, and signed copies return to Dropbox or your inbox.",
          "Best when you want most of DocuSign's evidence with less configuration and a lower price, especially if files already live in Dropbox or Drive. The free tier is small; treat it as a trial.",
        ],
      },
      {
        heading: "4. Adobe Acrobat Sign",
        paragraphs: [
          "Workflow: work from Acrobat or Reader, add fields to a PDF, send for signature, and track the agreement. Recipients can sign in the browser or on mobile, and the completed file returns as a certified PDF with an audit report.",
          "Best when your documents already live in Adobe, you handle PDF forms and government paperwork, or an organisation has an Adobe agreement. If you never open Acrobat otherwise, the interface assumes a vocabulary you may not need.",
        ],
      },
      {
        heading: "5. PandaDoc",
        paragraphs: [
          "Workflow: build a proposal, quote or contract from blocks, add a pricing table, send it as one document, and let the client review and sign in the same page. It can collect payment after signature and keeps a content library and audit trail.",
          "Best when the proposal and contract are one sales motion and the signature belongs at the end of the pitch. It is a sales-document tool first; for a single contract with no proposal attached, it is more software than the job needs, at per-seat pricing.",
        ],
      },
      {
        heading: "6. SignWell",
        paragraphs: [
          "Workflow: upload a document, place the fields, add signers, send, and let automatic reminders and expiry do the chasing. It keeps templates, an audit trail and an API, and signed PDFs are stored for you.",
          "Best when you sign often but do not need identity verification, notarisation or enterprise controls. It is the closest to a no-frills utility, and the price reflects that; what you give up is depth.",
        ],
      },
      {
        heading: "What to check before you choose",
        paragraphs: [
          "Signing order. Can you sign first, and is publishing blocked until you do? A contract the client can sign before you is not agreed yet.",
          "The evidence. Does the record keep the signer's name and email, the timestamp, the version or hash, and ideally the IP address?",
          "Identity. Is there anything beyond an email address? Most freelance contracts do not need it; regulated work might.",
          "The client's cost. Does the signer need an account, an app or a download? Every extra step delays the return.",
          "The billing model. Per user, per envelope or per month changes which tool is cheap at your volume.",
          "Afterwards. Where does the signed PDF live, for how long, and can you export it?",
        ],
      },
      {
        heading: "The workflow matters more than the tool",
        paragraphs: [
          "Every product above can produce a signed contract. What decides whether it gets signed is the sequence around it: one link instead of four attachments, a stated next step instead of 'let me know', and a request that arrives while the decision is warm. The common failure is not a weak signature; it is a PDF sent with the instruction to sign, scan and email it back.",
          "Keep the signed copy with the client record, not in a downloads folder, and note the date and version beside the proposal and the invoice. Six months later the question is what was agreed, not which tool produced the file.",
          "If your contracts already live next to the proposal and the invoice, the smallest workflow is inside the document: you sign, the client clicks and types a name, and the record keeps the rest. If you need certificates, notarisation or a vendor your client recognises, pick one of the dedicated platforms and keep Revercue for the everyday thread. The right answer is the one the client actually completes.",
        ],
      },
    ],
  },
  {
    slug: "the-thread-is-the-product",
    title: "The thread is the product",
    excerpt:
      "A proposal in one app, a contract in another, an invoice in a third. The context is what gets lost.",
    date: "2026-11-22",
    readMinutes: 7,
    body: [
      {
        paragraphs: [
          "Most freelancers do not have a document problem. They have a thread problem. The proposal lives in a PDF, the contract in an e-sign tool, the requirements in an email chain, the invoice in an accounting app, and the client history in someone's head.",
          "Each tool is fine on its own. Together they break the one thing that matters: the connection between what was promised, what was agreed, what was asked, and what was paid. You can open five tabs and still not answer a simple question — did this client ever read the scope, or did they approve the contract without reading it?",
          "The gap is not a missing feature. It is a missing spine. Every document is a moment in one relationship, and the tools treat each moment as a separate case file.",
        ],
      },
      {
        heading: "One client, five links",
        paragraphs: [
          "The client feels the fragmentation too. Five links, five formats, five places to reply. A PDF that has to be downloaded. A contract that needs an account on a signing platform. An invoice with a bank detail copied into a chat. Every handoff is a chance for the context to thin out, and every thin spot is where a project slows down or a payment goes quiet.",
          "The freelancer pays for it twice: once in the admin, and once in the follow-up. Chasing a client to ask whether they read page four is not a sales activity. It is a symptom.",
          "A thread keeps one client in one place: the proposal that started it, the contract that sealed it, the form that collected the requirements, the invoice that closed it, and the record that holds all of it — the conversation, the notes, the follow-ups and the interest.",
        ],
      },
      {
        heading: "Why the record matters more than the file",
        paragraphs: [
          "Documents are rented; the relationship is owned. A proposal has a retention period, and one day its link closes. That is honest and it is deliberate: a document is a snapshot of a moment, not an archive of a business.",
          "The record is different. The client's name, the dates, the service, the summary of what happened — that has to survive the document, because it is the thing you actually need in eighteen months when the same client comes back with a new budget.",
          "That is why Revercue builds the client record from the documents instead of asking you to maintain a separate database. You already did the work once. The record should be the exhaust, not another chore.",
        ],
      },
      {
        heading: "What the thread changes in practice",
        paragraphs: [
          "When the thread is real, three things get cheaper. The handoff: the contract can point at the form the client already filled in. The follow-up: the dashboard knows a proposal was opened three times and never answered, so the reminder is not a guess. The memory: the client page holds the whole relationship, so a new project starts from context instead of a blank page.",
          "None of these require a model, a copilot or a chat box. They require the documents to know about each other and to write down what happened.",
        ],
      },
      {
        heading: "What we are not building",
        paragraphs: [
          "Revercue is not a CRM replacement, not a project manager, and not an accounting tool. It is the thread. If a feature does not strengthen the connection between those five documents, it does not belong here.",
          "That constraint is uncomfortable, and it is the point. A product that does everything becomes another tab. A product that keeps one thing connected can replace five.",
        ],
      },
    ],
  },
  {
    slug: "links-not-pdfs",
    title: "Links, not PDFs",
    excerpt:
      "A PDF is a dead file. A link can tell you whether the client read the scope, which package they picked, and what they asked before saying yes.",
    date: "2026-11-22",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "A PDF is a photograph of a conversation that has not happened yet. You export it, you send it, and then you wait in the dark. Did it arrive? Was it opened on a phone? Did they read the pricing page, or scroll straight to the total and close it?",
          "A link answers those questions. Not perfectly — a page left open in a background tab is not attention — but well enough to change what you do next. The difference between a dead file and a live page is the difference between hoping and knowing.",
        ],
      },
      {
        heading: "What a link can hold that a PDF cannot",
        paragraphs: [
          "A proposal link can carry the packages as choices instead of three paragraphs of text. The client selects one, and the selection is recorded with the approval, so there is no argument later about which tier was agreed.",
          "It can carry the questions. An embedded question gets answered inside the document, lands on the client record, and never needs a follow-up email. It can carry the FAQs, expanded only by the people who care about them, which tells you what they were worried about.",
          "And it can carry the thread forward: a contract that knows which proposal it belongs to, a form that knows which contract was approved, an invoice that knows what was delivered.",
        ],
      },
      {
        heading: "The honest trade-offs",
        paragraphs: [
          "A link can be edited after it is sent. That is a feature and a risk. It means a typo is fixable and the client always sees the current version; it also means you should check the preview before you send, because the page is live.",
          "A link also depends on the network. A PDF works on a plane. That is a real advantage, so Revercue lets you allow a PDF download when you want one — a copy of the read-only view, not a separate export design.",
          "Finally, a link is not a legal signature. Approvals record a name and a timestamp as a confirmation. If a contract needs a cryptographic signature, use a signing tool; Revercue is not a law firm and says so on the page.",
        ],
      },
      {
        heading: "What tracking actually tells you",
        paragraphs: [
          "Free tells you opened or not opened. Starter adds the timestamp. Growth adds time spent and button clicks. Scale adds the session timeline, per-question time and the signals behind the interest level.",
          "The useful reading is rarely 'they spent 11 minutes'. It is the sequence: they opened pricing twice, expanded the FAQ about revisions, then left. That is a person with one specific objection, and the next message should be about revisions, not a generic nudge.",
        ],
      },
    ],
  },
  {
    slug: "patterns-not-magic",
    title: "Patterns, not magic",
    excerpt:
      "The suggestions run on counting and arithmetic, not a model. Here is exactly what that means, and why the honesty is the feature.",
    date: "2026-11-22",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "Software has learned to say \"assistant\" the way shampoo says \"clinical\". It sounds like capability and means nothing in particular. Revercue does not make that claim, because the things it does are countable: keyword matching, frequency counting, and arithmetic.",
          "That is not a limitation we are apologising for. A suggestion you can explain is a suggestion you can trust, override, and improve.",
        ],
      },
      {
        heading: "The four suggestions",
        paragraphs: [
          "The follow-up: a proposal was opened and not answered for three days, so the app suggests a message. The document suggestion: a contract was approved and no invoice exists, so the app suggests creating one. The interest flag: a client is marked not interested but the interest level is high, so the app suggests reopening. The price suggestion is available on Scale and Teams.",
          "Every one of those is a rule with a visible trigger. None of them sends anything. None of them edits a document. They are cards you accept or dismiss, and your answer is recorded.",
        ],
      },
      {
        heading: "How the timing adapts",
        paragraphs: [
          "The first time, the default applies. After a few actions, the system adjusts to your own pattern: if you consistently follow up after five days rather than two, the suggestion moves. That is frequency counting on your own log — not a model trained on someone else's clients.",
          "The interest level works the same way. Message count, last message direction, documents opened, contract approved, invoice paid, days since the last interaction, and whether you marked the client not interested. The breakdown is visible on the client page, with the line that matters: this is arithmetic, not an assistant.",
        ],
      },
      {
        heading: "Why it stays in the product",
        paragraphs: [
          "A model that writes your proposal would need your client's content, and a promise about what happens to it. We would rather keep the writing yours and make the surrounding work faster: the follow-up you would have forgotten, the invoice you would have created late, the client you would have written off too early.",
          "When the pattern is wrong, you dismiss it, and the product learns from that too. That is a system you can argue with, which is the most you can ask of a suggestion.",
        ],
      },
    ],
  },
  {
    slug: "the-client-record-builds-itself",
    title: "Documents link to the client record",
    excerpt:
      "The CRM is where the thread lands. You should not have to maintain a second database of things you already sent.",
    date: "2026-11-22",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "Every freelancer has a version of the same spreadsheet: name, company, what they bought, when, how much, whether they paid, whether they were happy. It is always out of date, because maintaining it is a second job that produces nothing visible.",
          "The record should be a by-product. If a proposal already knows the client, the service and the price, and a contract already knows the approval date, and an invoice already knows the payment, then the client record can be assembled from facts the product already has.",
        ],
      },
      {
        heading: "What lands in the record automatically",
        paragraphs: [
          "The profile: name, email, company, channel, industry, logo and value proposition, captured when you first create a document for that client. The documents: every proposal, contract, form and invoice, grouped by type. The communication log: what was sent, what was opened, what was answered, what was approved, what was paid.",
          "What you add is what only you know: the notes, the follow-ups and the next step. That is the part a system cannot infer, and it is the part worth your time.",
        ],
      },
      {
        heading: "The 15-day summary",
        paragraphs: [
          "When a client closes — archived or marked not interested — the record starts a 15-day clock. At the end of it, the app writes a short recap of the relationship and files it on the client. Not a report, a memory: what was sold, how it went, what to remember next time.",
          "Months later, that paragraph is the difference between starting cold and starting with context. It is also the reason the record outlives the documents: the proposal link closes, the summary and the history do not.",
        ],
      },
      {
        heading: "The discipline it removes",
        paragraphs: [
          "A CRM only works if someone feeds it, and freelancers are the worst possible people to feed a CRM, because the feeding happens exactly when they are busiest. Building the record from the thread removes the feeding without removing the record.",
          "If you already run a CRM you like, Revercue can sit next to it; the export is a CSV. It does not ask you to migrate your business to keep one client's history straight.",
        ],
      },
    ],
  },
  {
    slug: "what-a-proposal-is-for",
    title: "What a proposal is actually for",
    excerpt:
      "Not to look professional. To move a decision. Everything else — the cover, the fonts, the length — is in service of that one job.",
    date: "2026-11-22",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "A proposal has one job: help a client decide. Not to demonstrate effort, not to pre-empt every objection, not to look like an agency deck. If the reader finishes and still does not know what happens next, the document failed regardless of how it looked.",
          "That framing changes what belongs in it. A scope that lists everything you might do is not a scope, it is insurance. A price with three tiers and no recommendation is a quiz. A timeline with no dependencies is decoration.",
        ],
      },
      {
        heading: "Make the decision concrete",
        paragraphs: [
          "Give the client a package to select, not a paragraph to interpret. State the next step in plain words: approve and the contract follows, or ask a question and you get an answer on the record. A proposal that ends with 'let me know if you have any questions' ends with nothing.",
          "Keep the questions inside the document. Every question the client has to send by email is a pause, and pauses are where proposals die. An embedded question keeps the answer next to the scope it belongs to.",
        ],
      },
      {
        heading: "Write for the second reader",
        paragraphs: [
          "The person who reads your proposal is often not the person who signed the first email. They have no context. They need the problem, the outcome, the price and the next step, in that order, without inside references.",
          "That is also why the FAQ block matters more than the cover image. The questions a second reader asks — what is included, what happens if we need changes, who owns the files — are the ones that stall a yes.",
        ],
      },
      {
        heading: "Then get out of the way",
        paragraphs: [
          "Send the link, watch what happens, and let the document do the follow-up. If it is opened three times and not answered, the message you send should reference the thing they kept returning to, not a reminder that time has passed.",
          "Everything else — the serif, the gold, the clean page — exists so nothing in the way of that decision is ugly. Design is not the argument. It is the absence of friction around it.",
        ],
      },
    ],
  },
];

/*
 * The closing movement of each post: the part that turns an argument into a
 * habit. Kept separate so the essay keeps its shape and the practical close can
 * grow without rewriting it.
 */
const CLOSERS: Record<string, { heading?: string; paragraphs: string[] }[]> = {
  "the-thread-is-the-product": [
    {
      heading: "The test you can run this week",
      paragraphs: [
        "Take one client you are currently working with and write down, from memory, the four things that matter: what you promised, what they agreed to, what you asked them, and what they owe you. If you can answer all four in under a minute, your thread is healthy. If you have to open an inbox and a folder and a chat to answer, the problem is not your memory; it is that the four answers live in four systems that never met.",
        "The exercise is deliberately small. It is not asking you to change tools or migrate a business. It is asking you to notice how often the context you need is scattered, because that frequency is the real cost. A freelancer who loses ten minutes three times a day is losing a morning every week to reconstruction, and reconstruction is the least satisfying work in the job.",
        "The second half of the test is the client's side. Ask yourself what they would have to do to answer the same four questions. Usually the answer is worse: they would search their inbox for your name and hope the right PDF is attached to the right message. If the thread is thin on your side, it is thinner on theirs, and the client's confusion is the one that turns into a delayed decision.",
        "That is the whole argument for keeping the thread in one place. Not efficiency in the abstract, but the specific, repeated moment where you need to know what happened and the answer is spread across five tabs. Once you have felt that moment twice in a week, the product stops being a nice idea and becomes a tool with a job.",
      ],
    },
  ],
  "links-not-pdfs": [
    {
      heading: "What to do with the signal",
      paragraphs: [
        "Tracking is only worth having if it changes the next message. A proposal opened once for ninety seconds and unanswered is not a warm lead; it is a person who saw the price and stopped. The right follow-up is not 'just checking in' — it is a question about the total, or an offer to restructure the scope. A proposal opened five times over two days is a different situation: someone is reading carefully, possibly with a colleague, and the follow-up should give them something to share.",
        "That is why the sequence matters more than the total. Two visits of four minutes, three days apart, tell a story that eleven minutes in one sitting does not. The product shows the order of actions for exactly this reason: open, scroll to pricing, expand the revision FAQ, leave, come back, open pricing again. Read as a sentence, it says the revisions are the sticking point.",
        "The other practical habit is to stop tracking yourself. It is easy to open your own link to check the design, and it lands in the same counters as the client's visits. Preview the document instead, or accept that your own visits are noise. The number that matters is the one you did not generate.",
        "Finally, decide in advance what you will do with each signal, so you are not inventing a policy while a client waits. Opened, not answered: ask the specific question. Never opened: check delivery. Answered: move to the contract. Went quiet after the contract: that is a different message, and the record should tell you which one you already sent.",
      ],
    },
  ],
  "patterns-not-magic": [
    {
      heading: "Building trust in a suggestion",
      paragraphs: [
        "A suggestion earns trust in two ways: it explains itself, and it is easy to refuse. Both are design decisions rather than model decisions. The follow-up card says why it fired — a proposal was opened and not answered for three days — and the button that dismisses it is as prominent as the one that acts. A system that hides its reasoning and buries the refusal is asking for faith, not trust.",
        "This is also why the product shows the arithmetic behind the interest level instead of a single score. A number with no explanation is a horoscope. A number that lists the messages, the openings, the approvals and the days since the last contact can be argued with, corrected and ignored. The value is not that the number is right; the value is that you can see why it might be wrong.",
        "The same standard applies to the writing helpers people expect from other products. A draft you did not write is hard to trust in a client document, because you cannot defend a sentence you do not remember choosing. A suggestion about what to do next is easier: you either did the thing or you did not, and the outcome is visible within days.",
        "So the honest pitch is modest. The product will not write your proposal or guess your price. It will notice that the client opened the invoice twice, that a follow-up is overdue, that a contract was approved without an invoice, and it will offer the next step with the reason attached. That is a smaller promise than the industry makes, and a much easier one to keep.",
      ],
    },
  ],
  "the-client-record-builds-itself": [
    {
      heading: "Record the things a system cannot infer",
      paragraphs: [
        "The record can learn what you sent, what was opened, what was approved and what was paid. It cannot learn why the client paused, which stakeholder was nervous, or what you promised on a call. Those are the entries worth your typing, and they are the ones that make the record useful in a year.",
        "A useful note is a sentence with a consequence: the client's operations lead approves all spend, so proposals need a one-page summary; or the last project slipped because the copy arrived late, so the timeline needs a copy deadline. Each one changes how you run the next project. A note that says 'great call' changes nothing and will read as noise later.",
        "Follow-ups are the other half. A date without a next step is a reminder to feel guilty; a date with a next step is a plan. Write both when you set it, and close it when it is done. The dashboard's follow-up count is only as good as the honesty of that list, and an overdue follow-up you have already handled is worse than no follow-up at all, because it trains you to ignore the number.",
        "The 15-day summary is the last piece and the easiest to skip. Let it run. When a client closes, the recap that arrives two weeks later is the memory the record was built for: short, factual, and written while the details are still true. Reading it before a new conversation is the difference between starting from scratch and starting from context.",
      ],
    },
  ],
  "what-a-proposal-is-for": [
    {
      heading: "The proposal as a decision document",
      paragraphs: [
        "A decision document has three properties. It is short enough to finish in one sitting, it has one obvious next action, and it makes the cost legible next to the outcome. Most proposals fail one of those three, and the usual failure is the third: the price is stated but the outcome is described in activities, so the reader cannot compare what they spend with what they get.",
        "The fix is not more words. It is a structure that puts the outcome, the price and the next step in the same field of view. That is why a package table beats three paragraphs: the reader sees the options, the differences and the cost at once, and the choice becomes a comparison rather than an act of imagination.",
        "Length is a symptom rather than a goal. A sixteen-section proposal is usually a document that has not decided what it is selling. If a section does not help the reader choose, it belongs in an appendix or in the contract, not in the middle of the decision.",
        "Finally, write the next step as an instruction, not an invitation. 'Approve below and I will send the contract today' is a next step. 'Let me know if you have any questions' is a hope. The difference is small on the page and enormous in the reply rate, because one of them tells the reader exactly what happens when they click.",
      ],
    },
  ],
};

const CLOSERS_TWO: Record<string, { heading?: string; paragraphs: string[] }[]> = {
  "links-not-pdfs": [
    {
      heading: "The objection worth answering",
      paragraphs: [
        "The common objection is that a link feels less formal than a PDF. It is worth taking seriously, because formality is often the point of a proposal: a document that looks like a contract is easier to approve. The answer is not to argue with the feeling but to design for it — a page with your logo, a fixed structure, a signature at the end and a print view that produces a clean PDF reads as formal and behaves as a link.",
        "The other objection is permanence. A link feels temporary because it is not attached to an email. Expiry dates and an archive answer that directly: the document stays readable for as long as the decision is open, then closes, and a copy can be printed at any point. Most of the discomfort disappears the first time a client replies from a phone in two minutes.",
      ],
    },
  ],
  "patterns-not-magic": [
    {
      heading: "The line the product will not cross",
      paragraphs: [
        "The line is simple: the product will not invent a fact about your client. It will not generate a testimonial, estimate a budget you did not set, or write a scope it cannot attribute to something you did. Every suggestion it makes is derived from an action in your own account — a document opened, a form answered, an invoice unpaid — and every one can be traced back to that action.",
        "That restraint is why the product can be honest about what it is. It does not claim to know your client's intent, only to show what the client did. The interpretation stays with you, which is also where the accountability stays. A tool that guesses on your behalf takes the credit when it is right and hands you the blame when it is wrong.",
      ],
    },
  ],
  "the-client-record-builds-itself": [
    {
      heading: "The record as a handover document",
      paragraphs: [
        "A record written for yourself is useful; a record written for the next person is a gift. When a project passes to a collaborator, a VA or a future version of you after a holiday, the difference is whether the record answers the questions someone would otherwise have to ask the client. What was promised, what changed, what is still owed.",
        "That is the argument for the 15-day summary and the closing note. They are not reports to send; they are the record's own memory, written while it is still accurate. A client who returns after a year should not be greeted with a folder and a blank stare, and the work of reconstructing the relationship should be reading, not archaeology.",
        "Try it on the client you are least worried about. Open their record and read it as if you had never met them: is there a sentence about why they hired you, a note on who signs, a date for the next conversation? The gaps you find in a healthy relationship are the ones that would hurt in a difficult one, which is exactly why the habit is worth building now rather than during a crisis.",
      ],
    },
  ],
  "what-a-proposal-is-for": [
    {
      heading: "Reading the reply you get",
      paragraphs: [
        "A yes with no questions is not always a good sign. It can mean the scope was clear, or it can mean the client skimmed the price and will ask about the details in week two. The way to tell is what they reference: an approval that quotes a deliverable or a date is a real approval; one that says 'sounds good' and nothing else usually needs a short call before the contract goes out.",
        "A no is information too. A no about the total means the outcome was not worth the number; a no about the timeline means the plan was not credible; silence usually means the decision moved to someone else. Each one suggests a different change to the next proposal, which is why the reply is worth reading twice before replying once.",
        "The last habit is the cheapest: send the proposal when you can answer questions within an hour. A document that arrives at six in the evening and gets a question at nine the next morning has already lost a day of momentum. Timing is part of the offer, not a detail around it.",
        "And keep the reply short. A long answer to a simple question reads as anxiety, and anxiety is contagious in a sales conversation. One paragraph that names the decision, restates the price and repeats the next step is usually the whole message — the document already contains everything else.",
      ],
    },
  ],
};

export const BLOG_POSTS: BlogPost[] = BASE_POSTS.map((post) => ({
  ...post,
  readMinutes: post.readMinutes + 2,
  body: [...post.body, ...(CLOSERS[post.slug] ?? []), ...(CLOSERS_TWO[post.slug] ?? [])],
}));

export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
