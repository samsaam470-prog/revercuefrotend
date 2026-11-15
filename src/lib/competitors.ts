export interface Competitor {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  differences: string[];
  fits: string;
}

/*
 * Factual comparisons. No competitor bashing: every claim is about the shape of
 * the product, not about quality. Pricing and plan names change, so they are not
 * quoted here; the competitor's own pricing page is the source for those.
 */
const BASE_COMPETITORS: Competitor[] = [
  {
    slug: "bonsai",
    name: "Bonsai",
    kind: "Freelancer suite",
    summary:
      "Proposals, contracts, invoices, accounting and a light CRM for freelancers. The thread is mostly there; the documents are still documents.",
    intro:
      "Bonsai is one of the closest products to Revercue on paper: a freelancer suite that covers proposals, contracts, invoices and a client list. The difference is not the list of features. It is what happens between them.",
    sections: [
      {
        heading: "How the thread works in Bonsai",
        paragraphs: [
          "Bonsai starts from templates. You pick a proposal or contract template, fill it in, send it, and the client signs or pays through Bonsai's own flows. Invoices and a client list sit beside the documents, and the suite adds accounting and tax features that go well beyond the thread.",
          "For a freelancer who wants one subscription for the paperwork, that is a real convenience. The proposal, the contract and the invoice live in the same account, so you are not copying a client name between three tools.",
        ],
      },
      {
        heading: "Where the thread thins out",
        paragraphs: [
          "A proposal in Bonsai is still a document with a signature at the end. The client reads it, signs it, and the decisions inside it — which package, which optional line, which answer to a question — are not recorded as structured data you can act on later.",
          "The requirement form is a separate document rather than part of the proposal's flow, and the client record does not assemble itself from what the documents already know. You still get a client list, but it is a list you maintain rather than a record that builds itself.",
        ],
      },
    ],
    differences: [
      "Proposals are interactive links: the client selects a package, expands the FAQs and answers questions inside the page.",
      "Tracking by plan: opened, when, time spent, clicks, answers.",
      "The requirement form is part of the thread, with branching and a structured answer you can reuse.",
      "The client record is assembled from the documents, and it survives them.",
    ],
    fits:
      "Bonsai fits a freelancer who wants accounting and tax in the same subscription. Revercue fits a freelancer who wants the client work itself to stay connected and observable, and who already has an accountant.",
  },
  {
    slug: "honeybook",
    name: "HoneyBook",
    kind: "Client flow for service businesses",
    summary:
      "Inquiry to booking to contract to payment, built for service businesses. Strong on the client experience, lighter on the requirement and the record.",
    intro:
      "HoneyBook is built around the client journey: an inquiry form, a call, a proposal, a contract, an invoice, a payment. For service businesses with a repeatable sales motion, that flow is the product.",
    sections: [
      {
        heading: "How the thread works in HoneyBook",
        paragraphs: [
          "HoneyBook shines at the front of the relationship. The inquiry form, the scheduler, the branded proposal and the contract-with-payment pattern are designed to move a lead to a booking quickly, and the client sees a polished experience on their side.",
          "The project then lives in HoneyBook's workspace: files, messages, payments and tasks on one timeline. For a wedding photographer or a small studio, that is close to a complete back office.",
        ],
      },
      {
        heading: "Where the thread thins out",
        paragraphs: [
          "The proposal is a brochure with an accept button. What the client selected, which questions they read, and what they hesitated over are not first-class data; the requirement gathering usually happens on a call or in a separate form.",
          "The record is a project file, not a client memory. When the project closes, the history stays attached to the project, and the next job with the same client starts from a new project rather than from a summary of the relationship.",
        ],
      },
    ],
    differences: [
      "The document is the conversation: packages, embedded questions and FAQs inside one link.",
      "The requirement form is part of the thread, not a call note.",
      "Tracking is explicit and plan-based, with a session timeline on the higher plan.",
      "The client record is the durable artifact; the documents expire, the record does not.",
    ],
    fits:
      "HoneyBook fits a service business that sells through inquiry calls and wants scheduling and payments in one flow. Revercue fits a freelancer or small agency whose proposals need scope decisions and structured requirements more than a booking calendar.",
  },
  {
    slug: "dubsado",
    name: "Dubsado",
    kind: "Client management with automation",
    summary:
      "Forms, proposals, contracts, invoices and workflow automation. Powerful if you enjoy building the machine; the thread is assembled by you.",
    intro:
      "Dubsado is a client-management system for small service businesses. Its defining feature is automation: you build workflows that move a client from inquiry to contract to invoice with triggers and templates.",
    sections: [
      {
        heading: "How the thread works in Dubsado",
        paragraphs: [
          "You build the pieces once — a form, a proposal template, a contract, an invoice, a workflow — and then the workflow does the repetitive work: send this when that happens, remind the client after three days, move the project to the next stage.",
          "For someone who enjoys setting up systems, that is genuinely powerful. The product rewards the time you put into configuring it, and the result is a repeatable client experience.",
        ],
      },
      {
        heading: "Where the thread thins out",
        paragraphs: [
          "The setup is the product. Before the thread exists, you are designing it: which form feeds which proposal, which contract follows which package, which email fires when. The first client takes an afternoon of configuration.",
          "The documents themselves are conventional. A proposal is read and accepted; the package choice and the answers are collected by forms around it rather than inside it, and the client record is a project you manage rather than a memory the product keeps for you.",
        ],
      },
    ],
    differences: [
      "No workflow to build: the thread is the default path, not a diagram you maintain.",
      "The proposal collects the decision — package, questions, FAQs — in one page.",
      "The client record builds itself from the documents and outlives them.",
      "Suggestions are patterns on your own activity, not automations you configured.",
    ],
    fits:
      "Dubsado fits a business that wants deep automation and will invest time in designing it. Revercue fits someone who wants the thread to work on day one and would rather not maintain a workflow builder.",
  },
  {
    slug: "moxie",
    name: "Moxie",
    kind: "Freelancer workspace",
    summary:
      "Proposals, contracts, invoices, forms and a client portal for freelancers, with a writing helper. Close to the thread, with a different centre of gravity.",
    intro:
      "Moxie is a freelancer workspace: projects, proposals, contracts, invoices, forms and a client portal, with a helper that drafts and improves text. It is one of the few products that tries to cover the same span as Revercue.",
    sections: [
      {
        heading: "How the thread works in Moxie",
        paragraphs: [
          "Moxie organises work around projects and clients. You create a project, add a proposal or a contract, invoice from it, and the client has a portal where they can see what is happening. The writing helper is woven through the editors.",
          "For a solo freelancer, that is a coherent workspace: the day-to-day is in one place, and the client-facing side is branded rather than a raw document.",
        ],
      },
      {
        heading: "Where the thread thins out",
        paragraphs: [
          "The proposal is closer to a document than to a conversation. The client reads it and accepts; the package selection, the embedded question and the record of what they read are not the centre of the design.",
          "The intelligence is in the writing, not in the relationship. Suggestions help you produce the text; they do not tell you that a proposal was opened three times and never answered, or that a client went quiet after the invoice.",
        ],
      },
    ],
    differences: [
      "The proposal is a decision surface: package selection, questions and FAQs inside one link.",
      "Tracking and suggestions are about the client's behaviour, not the writer's text.",
      "The client record is built from the thread itself, including the 15-day summary.",
      "No model writes for you: the product uses patterns, and says so.",
    ],
    fits:
      "Moxie fits a freelancer who wants a project workspace with writing help built in. Revercue fits a freelancer whose bottleneck is the client's decision and follow-up, not the first draft.",
  },
  {
    slug: "plutio",
    name: "Plutio",
    kind: "All-in-one business workspace",
    summary:
      "Projects, tasks, proposals, invoices, forms and a CRM in one workspace. Broad by design; the thread is one module among many.",
    intro:
      "Plutio is an all-in-one workspace: projects and tasks, proposals, invoices, forms, a CRM, and a client portal. It is built for small teams that want one subscription instead of six.",
    sections: [
      {
        heading: "How the thread works in Plutio",
        paragraphs: [
          "Plutio treats the client relationship as one part of a broader workspace. Proposals and invoices are modules beside projects, tasks and time tracking, and the client portal ties them together for the person on the other side.",
          "If your work needs project management and client documents in the same place, that breadth is the point. You are not integrating a proposal tool with a task tool; they are the same product.",
        ],
      },
      {
        heading: "Where the thread thins out",
        paragraphs: [
          "Breadth has a cost: each module is good at its job, but the connection between them is lighter than in a product built around the connection. A proposal does not necessarily become the client record, and the requirement gathering is a form rather than part of the proposal's flow.",
          "The tracking and the suggestions are not the centre of the product. You can see whether a document was viewed, but the daily question — what needs a follow-up today, and why — is answered by your own discipline rather than by the workspace.",
        ],
      },
    ],
    differences: [
      "The whole product is the thread: five documents and the record, nothing else.",
      "The proposal carries the decision, the questions and the tracking.",
      "Follow-ups and suggestions are first-class, not a task you create by hand.",
      "The design is deliberately narrow, so the client experience stays simple.",
    ],
    fits:
      "Plutio fits a small team that wants projects, tasks and client documents under one roof. Revercue fits a freelancer or agency that already has project management and wants the client thread to be the product.",
  },
  {
    slug: "agiled",
    name: "Agiled",
    kind: "All-in-one CRM and operations",
    summary:
      "CRM, projects, proposals, contracts, invoices and automation for small businesses. Built around the pipeline; the documents follow the deal.",
    intro:
      "Agiled is an all-in-one business platform: a CRM pipeline, projects and tasks, proposals, contracts, invoices, forms and automation. It is aimed at small businesses that want a single system for sales and delivery.",
    sections: [
      {
        heading: "How the thread works in Agiled",
        paragraphs: [
          "Agiled starts from the deal. A lead moves through a pipeline, and the proposal, the contract and the invoice attach to that deal and that client. Automation moves records between stages and sends the reminders.",
          "For a small business with a sales pipeline, this is a familiar and effective shape. The CRM is the centre, and the documents are artifacts of the deal.",
        ],
      },
      {
        heading: "Where the thread thins out",
        paragraphs: [
          "When the CRM is the centre, the document is a step in a process. The client experience of the proposal is functional rather than designed: it is read and accepted, not explored, and the answers a client gives are captured in forms rather than in the document they were reading.",
          "The thread between proposal, contract, form, invoice and record exists through the deal, but it is a data relationship rather than a client-facing one. The client does not feel one continuous thread; they see separate pages.",
        ],
      },
    ],
    differences: [
      "The client-facing thread is the product, not the pipeline.",
      "Interactive proposals with package selection, embedded questions and FAQs.",
      "The client record is assembled from the documents and survives them.",
      "One clear next action per screen, without a pipeline to maintain.",
    ],
    fits:
      "Agiled fits a small business that runs on a sales pipeline and wants CRM, projects and invoicing together. Revercue fits a freelancer or agency that sells through documents and wants the client's side of the thread to feel like one product.",
  },
  {
    slug: "google-microsoft",
    name: "Google Workspace and Microsoft 365",
    kind: "Documents and email",
    summary:
      "Docs or Word, Drive or OneDrive, Gmail or Outlook, Forms, Calendar. Free or near-free, universal, and completely manual between the pieces.",
    intro:
      "Most freelancers already have the thread — spread across Google Workspace or Microsoft 365. A proposal in Docs or Word, a contract in a PDF, a form in Google Forms or Microsoft Forms, an invoice in a template, and the client history in an inbox.",
    sections: [
      {
        heading: "How the thread works there",
        paragraphs: [
          "The appeal is obvious: you already pay for it, you know it, and the client can open anything. Docs and Word are excellent writing tools, Drive and OneDrive are reliable storage, and Gmail or Outlook is where the conversation already happens.",
          "With enough discipline, the thread exists. You name files consistently, you keep a folder per client, you copy the answers from the form into the proposal, and you remember to follow up.",
        ],
      },
      {
        heading: "Where the thread breaks",
        paragraphs: [
          "Nothing connects the pieces. A proposal is a file; the client replies by email with an answer that lives in the inbox; the contract is signed in a different tool; the invoice is a PDF with a bank detail; the record is your memory and a folder tree.",
          "You cannot see whether the proposal was opened, which package the client was looking at, or how long they spent on the pricing page. The follow-up depends on you remembering, and the history of the relationship is scattered across formats that do not talk to each other.",
          "That is not a criticism of the tools. It is the cost of using general-purpose tools for a specific job: they are good at the document and indifferent to the thread.",
        ],
      },
    ],
    differences: [
      "One link per client that holds the proposal, the contract, the form and the invoice.",
      "The client selects a package and answers questions inside the page.",
      "Tracking tells you what happened without asking the client.",
      "The client record outlives the documents, so a returning client starts with context.",
    ],
    fits:
      "The Google and Microsoft suites fit anyone who wants universal, familiar tools and will do the connecting themselves. Revercue fits a freelancer who has decided that the connecting is the expensive part.",
  },
];

/*
 * The second half of every comparison: the money, the migration and the
 * day-to-day. These are the questions a reader asks after the feature list.
 */
const NOTES: Record<string, { heading: string; paragraphs: string[] }[]> = {
  bonsai: [
    {
      heading: "The money and the paperwork",
      paragraphs: [
        "Bonsai follows the invoice further than Revercue does. It adds accounting, expense tracking and tax-oriented features, so the same subscription can hold the money side of a freelance business, and an accountant can be handed a report instead of a folder of PDFs. That is a genuine advantage, and it is the reason many freelancers choose a suite in the first place.",
        "Revercue stops at the invoice and is explicit about it. The invoice has a payment arrangement, a proof upload and a confirmed state, and then the money lives in whichever tool you already use for money. If you want the accounting inside the same app, Bonsai is the better fit; if you already have an accountant and a bank feed, the extra module is weight you pay for monthly.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "Moving from Bonsai is mostly a matter of clients and documents. The client list comes across as a CSV, and the documents can be recreated from the templates you already use, because the structure of a proposal is the same in both products. The part that does not come across is the history: what was opened, what was answered, and when a client went quiet.",
        "The practical approach is to migrate the clients who are active, keep Bonsai read-only for the archive until the retention period ends, and start new proposals in Revercue. Running both for a month is not a failure of the migration; it is how you find out which product you actually reach for on a busy day.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "In Bonsai the day starts in the dashboard of a suite: invoices due, expenses, documents, clients. In Revercue the day starts with follow-ups and suggestions, because the product assumes the paperwork is handled by the document itself and the remaining work is the relationship.",
        "That is a philosophical difference more than a feature one. A suite is built for the freelancer who wants one place to administer the business; Revercue is built for the freelancer who wants one place to run the client conversation and does not mind a second tool for the books.",
      ],
    },
  ],
  honeybook: [
    {
      heading: "The money and the paperwork",
      paragraphs: [
        "HoneyBook is strongest where money and booking meet: a deposit taken at the moment of acceptance, a payment schedule attached to the project, a card on file. For a business that sells packages with deposits, the payment experience is part of the sales pitch and it is polished.",
        "Revercue separates the decision from the payment. The proposal ends with a package selection, the contract handles the approval, and the invoice handles the money in whichever way you already collect it: a payment link, or account details with a proof upload that you confirm yourself. There is no card on file and no deposit taken inside the product, which is simpler to explain and less useful if your model depends on instant deposits.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "HoneyBook projects are the unit you would move. Each active project becomes a client record plus the documents you still need, and the old project stays in HoneyBook until it closes. The inquiry forms are the piece most people forget; if your funnel depends on them, keep HoneyBook for the front of the funnel or replace it with a simple form of your own.",
        "The migration is easiest for a business with a handful of active clients and hardest for one with a long tail of small projects, because the record is per client in Revercue and per project in HoneyBook. Deciding which of those is your real unit of work is the first step, before any data moves.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "HoneyBook's day is organised around the next booking and the next payment: inquiries to answer, calls to schedule, contracts to send, payments to collect. It is a sales-and-delivery rhythm, and the interface is built to keep it moving.",
        "Revercue's day is organised around the thread: which document is waiting on a decision, which client opened the proposal and did not answer, which follow-up is due, which invoice is overdue. If your work is project-shaped and calendar-driven, HoneyBook's rhythm will feel more natural; if it is relationship-shaped and document-driven, Revercue's will.",
      ],
    },
  ],
  dubsado: [
    {
      heading: "The money and the paperwork",
      paragraphs: [
        "Dubsado can invoice, take payments and track what is owed, and its automation can chase an unpaid invoice without you remembering. The accounting depth is lighter than a dedicated bookkeeping tool, but the connection between a signed contract and an invoice can be automatic once you have built the workflow.",
        "Revercue does not automate the chase with a workflow you design. The invoice has a due date, the record shows what is overdue, and a suggestion fires when a payment has not arrived — but the action is still yours. The trade is control and clarity for setup effort: nothing happens in the background that you did not decide to do.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "Leaving Dubsado means leaving the workflows behind, and that is the honest cost. The forms, the email templates and the stage automations do not have an equivalent you configure in Revercue, because Revercue ships a default path instead of a builder. What moves is the client list, the documents and the history of each relationship.",
        "The usual approach is to finish the clients who are mid-workflow inside Dubsado, start new ones in Revercue, and keep the old account long enough to export contracts and invoices. The workflows that took an afternoon to build are also the reason someone stays; if yours are load-bearing, staying is a legitimate decision.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "Dubsado's day is a set of queues: forms to review, projects to move, emails to approve. The product is at its best when you trust the machine and only intervene at the edges, which rewards the setup you did months ago.",
        "Revercue's day is a short list of decisions: this proposal needs an answer, this follow-up is due, this invoice needs confirming. There is no machine to supervise. For some freelancers that is a relief; for others it feels like the product is doing less, because it is not doing things on their behalf.",
      ],
    },
  ],
  moxie: [
    {
      heading: "The money and the paperwork",
      paragraphs: [
        "Moxie handles invoices and payments in the same workspace as the proposals, with a client portal that keeps the paperwork in one place. The writing helper is the differentiator, and it shows up across the documents rather than in one corner of the product.",
        "Revercue does not write for you, and that is a deliberate position. The product spends its effort on what happens after the text exists: who opened it, what they chose, what they answered, and what you should do next. If the blank page is your bottleneck, Moxie attacks that problem directly; if the follow-through is your bottleneck, Revercue does.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "The move is straightforward for documents and clients, because both products treat a proposal as a structured page rather than a PDF. The part that needs care is the text itself: any draft produced with Moxie's helper should be read once by you before it becomes a template in Revercue, since a template is reused dozens of times.",
        "The client portal is the piece without a direct equivalent. Revercue's client experience is per document — a link for the proposal, a link for the contract, a link for the invoice — connected by the record rather than by a portal login. If a single logged-in portal is important to your clients, that is a real difference to weigh before switching.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "Moxie's day is a workspace: projects, tasks, drafts, client messages. The helper is always one keystroke away, and the rhythm is productive rather than analytical — you are making things.",
        "Revercue's day is quieter and more diagnostic: a client opened the pricing twice, a proposal has been unanswered for four days, a contract was approved and no invoice exists yet. It is a product you check rather than one you work inside, which suits freelancers whose writing is not the bottleneck.",
      ],
    },
  ],
  plutio: [
    {
      heading: "The money and the paperwork",
      paragraphs: [
        "Plutio covers invoices and payments alongside projects and time tracking, so a small team can bill from the same place it plans the work. For an agency that bills hourly, having the timer, the task and the invoice in one product is a real saving.",
        "Revercue does not track time and does not plan projects. It assumes the work is planned somewhere and focuses on the client-facing thread: what was proposed, what was agreed, what was asked, what was invoiced. If billing follows hours, Plutio's model fits better; if billing follows a fixed proposal, Revercue's does.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "Migrating from Plutio is a partial move by design. Projects, tasks and time stay where they are; the client documents and the record move. That is less disruptive than a full switch, and it is the honest recommendation for a team already running on Plutio: keep the workspace, move the thread.",
        "The overlap to watch is the client portal. Plutio gives clients one login for projects and documents; Revercue gives them a link per document. For a team whose clients expect a portal, the switch changes the client experience more than the internal one.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "Plutio's day is a project board: tasks moving, time logged, files shared. The client documents are part of that flow, which keeps everything in one window but makes the document feel like an attachment to the work.",
        "Revercue's day treats the document as the work. There is no board to update; the state of the relationship is the state of the documents and the record. Teams that need the board will miss it; teams that resent updating it will not.",
      ],
    },
  ],
  agiled: [
    {
      heading: "The money and the paperwork",
      paragraphs: [
        "Agiled links the deal to the invoice, so a won opportunity can become a project and a bill without re-entering the client. For a small business with a sales pipeline, that chain — lead, deal, project, invoice — is the core value, and the accounting integrations extend it further.",
        "Revercue has no pipeline and no deal stages. The proposal is not an artifact of a deal; it is where the client makes a decision. That is a narrower model, and it means a sales team used to pipeline reporting will find less to look at, while a freelancer who sells through documents will find less to maintain.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "A move from Agiled usually keeps the CRM and moves the documents, or keeps both for different stages of the business. The client list exports cleanly, and the proposals can be rebuilt from your templates; the pipeline history does not have a home in Revercue, and it should not be forced into one.",
        "The decision to make first is whether the thread or the pipeline is the system of record. If the pipeline is, Revercue is a companion product rather than a replacement. If the thread is, Agiled becomes the place where leads live and Revercue becomes where clients decide.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "Agiled's day is a pipeline review and a task list: which deals moved, which follow-ups are late, which projects are behind. The documents are steps inside that rhythm, and the reporting rewards consistent data entry.",
        "Revercue's day has no pipeline to review. It shows what the client did with the document and what that implies for the next message. It asks less data entry and gives less reporting, which is either the point or the limitation depending on how you sell.",
      ],
    },
  ],
  "google-microsoft": [
    {
      heading: "The money and the paperwork",
      paragraphs: [
        "In the suites, the invoice is usually a template: a Docs or Word file exported to PDF, with bank details typed in, or a link to a payment page pasted into the email. Some teams add a spreadsheet to track what is owed, which works until two people edit it at once.",
        "Revercue gives the invoice a state: sent, proof submitted, confirmed, overdue. The due date is part of the document, the client sees the payment arrangement, and the record knows what is still outstanding. It is a small amount of structure that removes a recurring manual check.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "You do not migrate away from your documents; you move the client-facing part of them. The existing proposals and contracts stay in Drive or OneDrive as the archive, and new ones are built in Revercue from the structure you already use. Your brand assets, your logo and your contact details come across in a few minutes.",
        "The part that changes is the habit. Instead of editing a file and attaching it, you build a page and share a link. The first few documents feel slower, because the block library is a new vocabulary; by the fifth, the template is doing the work and the editing is lighter than formatting a document by hand.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "The suites' day is an inbox and a file tree: search for the client, find the latest version, check the thread, reply. It is flexible and familiar, and the flexibility is why the thread drifts — every document is a new file and every client is a new folder convention.",
        "Revercue's day is one record per client with the documents attached in order. You lose the universal familiarity of Docs and Word and gain the ability to answer a simple question — has this client read the scope and chosen a package — without opening five tabs.",
      ],
    },
  ],
};

const NOTES_THREE: Record<string, { heading: string; paragraphs: string[] }[]> = {
  bonsai: [
    {
      heading: "If you are choosing between the two this week",
      paragraphs: [
        "Ask yourself one question: when a client goes quiet, do you want to check the books or the conversation first? Bonsai answers the first; Revercue answers the second. Most freelancers need both eventually, and the order says more about your business than any feature list. Start with the one that matches the moment you are in, and expect the other to arrive later.",
        "There is a cheaper way to decide than switching: run the next proposal in Revercue and keep Bonsai for the books. One client, one document, one invoice, two tools. If the thread changes how you follow up within a month, you have your answer; if not, you have lost an hour and learned that the paperwork was never the problem.",
      ],
    },
  ],
  honeybook: [
    {
      heading: "If you are choosing between the two this week",
      paragraphs: [
        "Count the deposits you took last quarter and compare that with the proposals that died after the price. HoneyBook wins on the first number and Revercue on the second. If your revenue depends on booking momentum, stay where the deposit is instant; if it depends on a handful of large decisions, the thread is the better investment.",
        "A third number settles it faster: how many clients asked a question the proposal had already answered. Every one of those is a document that was not read, and a link with tracking tells you which section they skipped. That is the specific problem Revercue exists to solve, and it is worth a month of running both to see whether it is yours.",
      ],
    },
  ],
  dubsado: [
    {
      heading: "If you are choosing between the two this week",
      paragraphs: [
        "Open your Dubsado workflows and count how many run without you touching them. If the answer is most of them, you have built a machine worth keeping and Revercue will feel like a downgrade in automation. If the answer is one, the machine is mostly maintenance, and the default path in Revercue will save more time than it gives up.",
        "It is also fair to keep both, and many people do: Dubsado for the front of the funnel where automation earns its keep, Revercue for the documents where a decision has to be made. The overlap is the proposal, and the rule is simply to send it from one place so the tracking means something.",
      ],
    },
  ],
  moxie: [
    {
      heading: "If you are choosing between the two this week",
      paragraphs: [
        "Look at your last three proposals and ask which part took longest: the writing or the follow-up. Moxie attacks the writing; Revercue attacks the follow-up. Nobody can tell you which is your bottleneck, and the honest answer changes with the season, so choose the tool that fixes the current one rather than the imaginary one.",
        "A practical compromise for writers: draft in Moxie or in your own editor, then rebuild the structure in Revercue for the send. The text is yours, the decisions and the tracking are the product's, and neither tool has to be the whole answer. It costs one extra step per document and removes the pressure to pick a side.",
        "Whichever you pick, read the generated text once with the client's name and one specific detail of their business in mind. That single edit is what turns a competent draft into a document that could only have been written for them, and no helper can do it for you.",
      ],
    },
  ],
  plutio: [
    {
      heading: "If you are choosing between the two this week",
      paragraphs: [
        "If your clients ask about tasks and timelines, Plutio's portal answers them in one place; if they ask what they agreed to and what they owe, Revercue's documents answer in one link. The two questions describe different businesses, and the one your inbox receives most often is the one to build around.",
        "Teams rarely need to choose outright. Keep the project board where the work is planned, and let the client-facing documents live in the thread. The one integration worth insisting on is a link between the client record and the project, so opening a client shows the work in progress without a second search.",
        "If you do consolidate, do it one client at a time and keep the board read-only until the project closes. A half-migrated team with two sources of truth is worse than either tool on its own, and the cost of tidying up afterwards is always higher than the cost of a slower move.",
      ],
    },
  ],
  agiled: [
    {
      heading: "If you are choosing between the two this week",
      paragraphs: [
        "Check whether you can name your last three deals and their stages without opening the app. If you can, the pipeline is real and should keep its home. If you cannot, the pipeline is a form you fill in because the tool asks, and the thread is where your actual work happens. That test is more reliable than any comparison table.",
        "If the pipeline is real, the two products can coexist without duplication: Agiled owns the lead and the forecast, Revercue owns the document the client decides on, and the handover is a contact record plus a link. The only rule is that the proposal exists in one place, because two copies of a scope is how a price gets quoted twice.",
        "Write the handover down once — who creates the record, who sends the link, who updates the stage — and the overlap stops being a risk. Most tool duplication is not a software problem; it is an unwritten rule that two people interpret differently.",
      ],
    },
  ],
  "google-microsoft": [
    {
      heading: "If you are choosing between the two this week",
      paragraphs: [
        "You are not choosing to leave your documents; you are choosing where the client-facing moment happens. If a client has ever asked which file is the latest version, or replied to a proposal with a question you had already answered, the thread is the gap. If that has never happened, your folder convention is working and the suites are cheaper.",
        "Start with one document type rather than a migration. Send the next proposal as a link, keep the contract and the invoice where they are, and watch whether the client's replies get more specific. If they do, the difference is real and worth extending; if they do not, the suite was never the problem and the exercise cost you one afternoon.",
      ],
    },
  ],
};

const NOTES_TWO: Record<string, { heading: string; paragraphs: string[] }[]> = {
  bonsai: [
    {
      heading: "The exit",
      paragraphs: [
        "Every subscription should be judged by how it lets you leave. Bonsai exports clients, invoices and documents, and an accountant can work from those exports, which makes the exit survivable rather than painless. The templates and the automations do not come with you, and the invoice numbering is the small detail people forget until a tax filing.",
        "Revercue answers the exit question earlier: clients export as CSV, documents print to PDF, and the record is yours to take. If you are choosing between the two and expect to change your mind in a year, weigh the cost of leaving as much as the cost of joining, because the second one is rarely advertised.",
      ],
    },
  ],
  honeybook: [
    {
      heading: "The exit",
      paragraphs: [
        "HoneyBook's export is a project export: clients, invoices and files arrive in a format designed for a record rather than a rebuild. That is fine for an archive and less fine for a migration on a Sunday evening, so plan the move during a quiet week rather than between two deadlines.",
        "The lock-in is not technical, it is habitual. The inquiry form, the booking flow and the payment step are the parts clients touch, and changing them changes the experience. Revercue's exit is simpler because there is less to leave: a client list, a set of documents, and a record you can print.",
      ],
    },
  ],
  dubsado: [
    {
      heading: "The exit",
      paragraphs: [
        "The workflows you built are the thing you lose, and their value is exactly why leaving feels expensive. A contract template, a form and three automations represent an afternoon of setup each, and none of them transfers as a file — they transfer as knowledge about how you want the business to run.",
        "That is worth writing down before you migrate anywhere, even if you stay. A one-page description of your workflow is portable; a Dubsado account is not. Revercue ships a default path precisely because most freelance workflows are variations on the same five steps, and the description matters more than the builder.",
      ],
    },
  ],
  moxie: [
    {
      heading: "The exit",
      paragraphs: [
        "Documents export as documents, so the archive is safe. The client portal history is the part that does not travel cleanly, because messages and files live inside a workspace rather than a document. Export the files you need before you cancel, not after.",
        "Revercue's documents are links with a print view, so the archive is a folder of PDFs if you want one. That is a lower ceiling than a portal and a shorter exit, and the trade is deliberate: the product optimises for the relationship you can pick up and carry, not the workspace you have to dismantle.",
      ],
    },
  ],
  plutio: [
    {
      heading: "The exit",
      paragraphs: [
        "A team workspace is the hardest kind to leave, because the history is shared. Exports cover files and invoices, but the tasks and the conversations around them are the institutional memory, and they usually end up as a spreadsheet nobody reads.",
        "If you are moving the client thread and keeping the project board, the exit problem shrinks to the documents, which is the part Revercue handles cleanly. That split is often the right answer for a small team: the workspace stays, the client-facing record moves, and nobody has to retrain on Monday morning.",
      ],
    },
  ],
  agiled: [
    {
      heading: "The exit",
      paragraphs: [
        "Agiled's exports are wide because the product is wide: contacts, deals, invoices, projects. The useful part for a migration is the contact list and the invoice history; the pipeline stages are only meaningful inside the product that defined them.",
        "The safer pattern is to stop adding new stages and let the pipeline drain while the thread moves to Revercue. Two quarters of parallel running is unglamorous and it keeps the reporting intact until the decision is settled, which is worth more than a clean cutover nobody trusts.",
      ],
    },
  ],
  "google-microsoft": [
    {
      heading: "The exit",
      paragraphs: [
        "There is no exit from Drive or OneDrive, and that is the advantage: the files are yours wherever you go, in formats every tool reads. The cost is that the thread is reconstructed every time, because a folder has no idea what a client decided.",
        "Revercue's exit is the same kind of promise in a smaller package: print the document, export the client list, and the archive survives. The difference is that the thread existed at all, so the PDF you keep is a decision record rather than a draft someone edited in 2023.",
      ],
    },
  ],
};

export const COMPETITORS: Competitor[] = BASE_COMPETITORS.map((competitor) => ({
  ...competitor,
  sections: [
    ...competitor.sections,
    ...(NOTES[competitor.slug] ?? []),
    ...(NOTES_TWO[competitor.slug] ?? []),
    ...(NOTES_THREE[competitor.slug] ?? []),
  ],
}));

export function competitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((competitor) => competitor.slug === slug);
}
