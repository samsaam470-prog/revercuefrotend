export interface Competitor {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  website?: string;
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
      "Proposals, contracts, invoices, expense tracking and a light CRM for freelancers. The thread is mostly there; the documents are still documents.",
    website: "https://www.hellobonsai.com",
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
          "Bonsai supports proposals, contracts, service selections, forms and a client portal. Its official pages confirm a broad document workflow, so it would be inaccurate to describe every proposal as a static PDF or every client choice as unstructured. The distinction Revercue makes is its specific combination of package decisions, embedded requirements, engagement tracking and a client record; the exact equivalence of those behaviours has not been independently tested across both products.",
          "Bonsai offers proposals, contracts, forms and a client portal. Its public pages do not fully specify whether every requirement answer is embedded in the proposal itself or collected in a separate form, so this comparison does not claim that embedded capture is absent.",
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
    website: "https://www.honeybook.com",
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
          "HoneyBook offers interactive files that can combine proposals, service selections, contracts, invoices and forms, and it advertises file tracking. It is not accurate to reduce its proposal experience to a static brochure. The comparison is about product emphasis: HoneyBook organizes a broad lead-to-payment clientflow, while Revercue centers its own proposal-to-record sequence and follow-up view.",
          "HoneyBook organizes work around clients and projects and keeps documents and communications in its clientflow. Its public pages do not fully specify how much relationship history is aggregated across repeat projects, so we do not claim that client history is lost when a project closes.",
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
      "Client management, tasks, time tracking, invoices and workflow automation; Dubsado 3.0 also lists AI email-thread summaries and a meeting notetaker. Public proposals and scheduling are Premier-only.",
    website: "https://www.dubsado.com",
    intro:
      "Dubsado is a client-management system for small service businesses. Its defining feature is automation: you build workflows that move a client from inquiry to contract to invoice with triggers and templates. Its current product information also lists time tracking, task tracking, AI email-thread summaries and a meeting notetaker; confirm plan availability for newer features before purchase.",
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
          "Dubsado provides forms, proposals and contracts, with public proposals limited to Premier. Its public plan information does not fully specify whether package selections and form responses are captured as one unified proposal event; we do not claim that capability is absent.",
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
      "Client and project management, proposals, contracts, invoices, time tracking and a Moxie Assistant. Portal and automation access depend on the plan.",
    website: "https://www.withmoxie.com",
    intro:
      "Moxie is a freelancer workspace covering client and project management, proposals, contracts, invoices, time tracking, custom forms and scheduling. Its pricing page lists a Moxie Assistant on every plan; its white-label client portal and workflow automation are Pro-tier features. It is one of the closest products to Revercue in overall scope.",
    sections: [
      {
        heading: "How the thread works in Moxie",
        paragraphs: [
          "Moxie organises work around projects and clients. Its public product pages list proposals, contracts, invoices, time tracking, forms and scheduling; the Pro plan adds a white-label client portal and workflow automation. The Moxie Assistant is listed on the plan page, with detailed capabilities described in its help centre.",
          "For a solo freelancer, that is a coherent workspace: the day-to-day is in one place, and the client-facing side is branded rather than a raw document.",
        ],
      },
      {
        heading: "Where the thread thins out",
        paragraphs: [
          "Moxie supports proposals, contracts and forms. Its public product pages do not fully specify per-section engagement tracking or how package choices and requirement answers appear in one unified client record, so this is an unverified product-emphasis distinction rather than a claim that those features are missing.",
          "Moxie positions its Assistant as a broader productivity feature, so it should not be characterized as only a writing tool. The more useful distinction is that Moxie is a project-and-client workspace with an assistant, while Revercue focuses on the state of the client-facing documents and the follow-up they create.",
        ],
      },
    ],
    differences: [
      "The proposal is a decision surface: package selection, questions and FAQs inside one link.",
      "Tracking and suggestions are about the client's behaviour, not the writer's text.",
      "The client record is built from the thread itself, including the 15-day summary.",
      "Writing support is optional; the core workflow tracks client decisions and the next action.",
    ],
    fits:
      "Moxie fits a freelancer who wants a project workspace with a built-in Assistant; its white-label portal and workflow automation are plan-dependent. Revercue fits a freelancer whose main bottleneck is the client's decision and follow-up.",
  },
  {
    slug: "plutio",
    name: "Plutio",
    kind: "All-in-one business workspace",
    summary:
      "Projects, tasks, proposals, invoices, forms, CRM and client portal, with Plutio Pal / Super Work AI and plan-based AI credits. Broad by design; the client workflow is one part of the workspace.",
    website: "https://www.plutio.com",
    intro:
      "Plutio is an all-in-one workspace: projects and tasks, proposals, invoices, forms, a CRM, and a client portal. Its current pricing page includes Plutio Pal / Super Work AI, 500–10,000 AI credits and plan-based workflow-action quotas. It is built for small teams that want one subscription instead of six.",
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
          "Plutio brings projects, proposals, forms, invoices and a client portal into one workspace. Its current pricing page also confirms document tracking and workflow automations; the public material does not fully specify how proposal choices and requirement answers are consolidated into a single client record. We have not verified that as a missing feature.",
          "Plutio includes document tracking, workflow automations and Plutio Pal AI credits. Its main design is a broad workspace, so the way it prioritizes daily follow-up depends on how you configure projects and workflows; we do not claim that it lacks automation.",
        ],
      },
    ],
    differences: [
      "The whole product is the thread: five modules, one client record, nothing else.",
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
      "CRM, projects, proposals, contracts, invoices, automation and AI workers for small businesses. AI credits and worker limits vary by plan; branded portal and accounting integrations are tier-dependent.",
    website: "https://agiled.app",
    intro:
      "Agiled is an all-in-one business platform: a CRM pipeline, projects and tasks, proposals, contracts, invoices, forms and automation. Its current plan page lists 500–15,000 AI credits and 1/2/3/unlimited AI workers across Starter, Pro, Business and Scale. Branded portal and accounting integrations are tier-dependent; formal accounting is marked as coming soon.",
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
          "Agiled's official materials describe a connected CRM pipeline, projects, proposals, contracts, forms and invoices. The public documentation does not fully specify the exact client-side proposal experience or how answers are surfaced in a unified client record, so we treat that detail as unverified rather than absent.",
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
      "Docs or Word, Drive or OneDrive, Gmail or Outlook, Forms and Calendar, now with Gemini or Copilot features in eligible plans. Universal office suites, but the freelancer workflow still needs to be assembled.",
    website: "https://workspace.google.com",
    intro:
      "Most freelancers already have the thread — spread across Google Workspace or Microsoft 365. A proposal in Docs or Word, a contract in a PDF, a form in Google Forms or Microsoft Forms, an invoice in a template, and the client history in an inbox. Google Workspace adds Gemini in Gmail on Starter and more Workspace apps on Standard/Plus; Microsoft Business Standard and Premium with Copilot add Copilot inside Office apps, while Business Basic includes secure AI chat rather than in-app Copilot.",
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
          "The base office apps do not provide a dedicated freelancer clientflow with proposal-level decision tracking out of the box. Google Apps Script, Microsoft Power Automate, marketplace add-ons and e-signature services can connect parts of the workflow, but they require configuration and may not create one consistent client record.",
          "The base apps do not offer one unified client-facing proposal analytics view by default. Add-ons, e-signature services and administrator audit logs can provide parts of that signal, but they do not automatically create a single proposal-to-invoice follow-up view.",
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
        "Bonsai lists expense and income tracking, tax tools for US filers and accounting integrations such as QuickBooks and Xero. Those are meaningful finance features; whether they replace a full double-entry bookkeeping system depends on the accounting workflow and should be checked with the vendor or accountant.",
        "Revercue stops at the invoice and is explicit about it. The invoice has a payment arrangement, a proof upload and a confirmed state, and then the money lives in whichever tool you already use for money. If you want the accounting inside the same app, Bonsai is the better fit; if you already have an accountant and a bank feed, the extra module is weight you pay for monthly.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "Before moving, verify the exact export options for client/contact records, documents, signed agreements, invoices, payment history, attachments, notes and automation rules. The public sources reviewed here do not prove that every item exports in a portable, re-importable format.",
        "Run a small export test with one active and one closed client, inspect the files and fields, reconcile open invoices, and keep the old account available until the archive is complete. This is a migration checklist, not a claim that the vendor supports a one-click transfer.",
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
        "Before moving, verify the exact export options for client/contact records, documents, signed agreements, invoices, payment history, attachments, notes and automation rules. The public sources reviewed here do not prove that every item exports in a portable, re-importable format.",
        "Run a small export test with one active and one closed client, inspect the files and fields, reconcile open invoices, and keep the old account available until the archive is complete. This is a migration checklist, not a claim that the vendor supports a one-click transfer.",
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
        "Before moving, verify the exact export options for client/contact records, documents, signed agreements, invoices, payment history, attachments, notes and automation rules. The public sources reviewed here do not prove that every item exports in a portable, re-importable format.",
        "Run a small export test with one active and one closed client, inspect the files and fields, reconcile open invoices, and keep the old account available until the archive is complete. This is a migration checklist, not a claim that the vendor supports a one-click transfer.",
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
        "Moxie handles invoices and payments in the same workspace as proposals. Its white-label client portal is listed on Pro and Teams, not Starter; the Moxie Assistant is a separate product feature described in its help centre.",
        "Revercue is not positioned as a writing assistant; its primary job is to show what happens after a proposal is sent. The product spends its effort on what happens after the text exists: who opened it, what they chose, what they answered, and what you should do next. If the blank page is your bottleneck, Moxie attacks that problem directly; if the follow-through is your bottleneck, Revercue does.",
      ],
    },
    {
      heading: "What migrating actually looks like",
      paragraphs: [
        "Before moving, verify the exact export options for client/contact records, documents, signed agreements, invoices, payment history, attachments, notes and automation rules. The public sources reviewed here do not prove that every item exports in a portable, re-importable format.",
        "Run a small export test with one active and one closed client, inspect the files and fields, reconcile open invoices, and keep the old account available until the archive is complete. This is a migration checklist, not a claim that the vendor supports a one-click transfer.",
      ],
    },
    {
      heading: "The day-to-day difference",
      paragraphs: [
        "Moxie's day is a workspace: projects, tasks, drafts and client messages. Its Assistant adds another productivity layer, while the main workflow remains organized around projects and client administration.",
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
        "Before moving, verify the exact export options for client/contact records, documents, signed agreements, invoices, payment history, attachments, notes and automation rules. The public sources reviewed here do not prove that every item exports in a portable, re-importable format.",
        "Run a small export test with one active and one closed client, inspect the files and fields, reconcile open invoices, and keep the old account available until the archive is complete. This is a migration checklist, not a claim that the vendor supports a one-click transfer.",
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
        "Before moving, verify the exact export options for client/contact records, documents, signed agreements, invoices, payment history, attachments, notes and automation rules. The public sources reviewed here do not prove that every item exports in a portable, re-importable format.",
        "Run a small export test with one active and one closed client, inspect the files and fields, reconcile open invoices, and keep the old account available until the archive is complete. This is a migration checklist, not a claim that the vendor supports a one-click transfer.",
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
        "Before moving, verify the exact export options for client/contact records, documents, signed agreements, invoices, payment history, attachments, notes and automation rules. The public sources reviewed here do not prove that every item exports in a portable, re-importable format.",
        "Run a small export test with one active and one closed client, inspect the files and fields, reconcile open invoices, and keep the old account available until the archive is complete. This is a migration checklist, not a claim that the vendor supports a one-click transfer.",
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
        "Look at your last three proposals and ask which part took longest: preparing the material or following up after it was sent. Moxie offers an Assistant inside its broader workspace; Revercue's main differentiator is the client decision and follow-up view. Choose based on the bottleneck you can actually observe, not the one you imagine.",
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
        "Do not cancel until you have tested export of client records, projects, documents, signed contracts, invoices, payment history, attachments, messages and any workflow data you need to retain. The public sources reviewed here do not establish that all these objects export in a portable, re-importable format.",
        "Ask the vendor for the exact export scope and retention policy, keep copies of signed records, reconcile outstanding balances, and verify access to attachments before the subscription ends. Treat this as a prudent exit checklist rather than a claim about the platform's export functionality.",
      ],
    },
  ],
  honeybook: [
    {
      heading: "The exit",
      paragraphs: [
        "Do not cancel until you have tested export of client records, projects, documents, signed contracts, invoices, payment history, attachments, messages and any workflow data you need to retain. The public sources reviewed here do not establish that all these objects export in a portable, re-importable format.",
        "Ask the vendor for the exact export scope and retention policy, keep copies of signed records, reconcile outstanding balances, and verify access to attachments before the subscription ends. Treat this as a prudent exit checklist rather than a claim about the platform's export functionality.",
      ],
    },
  ],
  dubsado: [
    {
      heading: "The exit",
      paragraphs: [
        "Do not cancel until you have tested export of client records, projects, documents, signed contracts, invoices, payment history, attachments, messages and any workflow data you need to retain. The public sources reviewed here do not establish that all these objects export in a portable, re-importable format.",
        "Ask the vendor for the exact export scope and retention policy, keep copies of signed records, reconcile outstanding balances, and verify access to attachments before the subscription ends. Treat this as a prudent exit checklist rather than a claim about the platform's export functionality.",
      ],
    },
  ],
  moxie: [
    {
      heading: "The exit",
      paragraphs: [
        "Do not cancel until you have tested export of client records, projects, documents, signed contracts, invoices, payment history, attachments, messages and any workflow data you need to retain. The public sources reviewed here do not establish that all these objects export in a portable, re-importable format.",
        "Ask the vendor for the exact export scope and retention policy, keep copies of signed records, reconcile outstanding balances, and verify access to attachments before the subscription ends. Treat this as a prudent exit checklist rather than a claim about the platform's export functionality.",
      ],
    },
  ],
  plutio: [
    {
      heading: "The exit",
      paragraphs: [
        "Do not cancel until you have tested export of client records, projects, documents, signed contracts, invoices, payment history, attachments, messages and any workflow data you need to retain. The public sources reviewed here do not establish that all these objects export in a portable, re-importable format.",
        "Ask the vendor for the exact export scope and retention policy, keep copies of signed records, reconcile outstanding balances, and verify access to attachments before the subscription ends. Treat this as a prudent exit checklist rather than a claim about the platform's export functionality.",
      ],
    },
  ],
  agiled: [
    {
      heading: "The exit",
      paragraphs: [
        "Do not cancel until you have tested export of client records, projects, documents, signed contracts, invoices, payment history, attachments, messages and any workflow data you need to retain. The public sources reviewed here do not establish that all these objects export in a portable, re-importable format.",
        "Ask the vendor for the exact export scope and retention policy, keep copies of signed records, reconcile outstanding balances, and verify access to attachments before the subscription ends. Treat this as a prudent exit checklist rather than a claim about the platform's export functionality.",
      ],
    },
  ],
  "google-microsoft": [
    {
      heading: "The exit",
      paragraphs: [
        "Do not cancel until you have tested export of client records, projects, documents, signed contracts, invoices, payment history, attachments, messages and any workflow data you need to retain. The public sources reviewed here do not establish that all these objects export in a portable, re-importable format.",
        "Ask the vendor for the exact export scope and retention policy, keep copies of signed records, reconcile outstanding balances, and verify access to attachments before the subscription ends. Treat this as a prudent exit checklist rather than a claim about the platform's export functionality.",
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
