import type { BlogPost } from "../blog";

// Cluster E, article three: the comparison. Product mentioned once, plainly,
// with the cases where the cheaper options win stated as clearly as the rest.

export const SHARING_COMPARED_POST: BlogPost = {
  slug: "client-portal-vs-shared-drive",
  title: "Client portal vs shared drive vs PDF: what to use for proposals, contracts and invoices",
  excerpt:
    "Three ways to send the same document, with different costs and very different consequences. A decision table for proposals, contracts and invoices, based on what the client has to do and what you need to see afterwards.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Do freelancers need a client portal?", to: "/blog/do-freelancers-need-a-client-portal" },
    { label: "Sharing documents securely", to: "/blog/how-to-share-documents-with-clients" },
    { label: "Compare Revercue with other tools", to: "/compare" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A PDF, a shared drive and a client portal all deliver a document. The differences show up in three places: what the client has to do to act on it, what you can see afterwards, and what happens when something goes wrong six months later. Those three questions decide the right tool more reliably than a feature list.",
        "The temptation is to pick one tool for everything and be consistent. Consistency is worth something, but a proposal and an invoice are not the same object, and treating them the same is how freelancers end up with approvals buried in email and invoices nobody can find.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Use an interactive link for proposals and contracts, because the client has to decide and you need a record of when. Use a shared folder for working files the client will open more than once. Use a PDF only when the client needs a fixed copy for their own records or their systems cannot accept a link. Invoices belong wherever payment can be tracked, which usually means a link plus a dated reminder.",
      ],
    },
    {
      heading: "What the client has to do",
      paragraphs: [
        "A PDF asks the client to download, find the right page, and reply by email. A shared drive asks them to navigate a folder structure you designed for your own brain. A portal asks them to open a link and press one button. The fewer decisions between the document and the action, the more likely the action happens on the day you need it.",
        "This is not about the client being lazy. It is about attention: they are reading your proposal on a phone, between two other things, and every extra step is a place where the task gets postponed.",
      ],
    },
    {
      heading: "What you can see afterwards",
      paragraphs: [
        "With a PDF, nothing. With a shared drive, a last-modified date if you are lucky. With a portal, whether the document was opened, which parts were viewed, and when it was approved. That information changes your follow-up: a client who read the pricing twice and stopped is a different conversation from one who never opened it.",
        "Be careful how you use it. Knowing that a document was opened is useful for choosing what to say; mentioning it turns a helpful message into surveillance. The rule is simple: use the information to be more specific, never to prove a point.",
      ],
    },
    {
      heading: "How it is found six months later",
      paragraphs: [
        "A PDF lives in whichever inbox or downloads folder it landed in, renamed and possibly re-sent twice. A drive folder survives if the client kept the link and your structure still makes sense. A portal keeps the whole history for that client in one place, which matters most at the moment someone asks what was agreed.",
        "The test is a question you can ask yourself now: if this client emails in March asking what the final scope was, how long would it take you to answer? If the answer is longer than a minute, the filing system is the problem, not the client.",
      ],
    },
    {
      heading: "What happens when something goes wrong",
      paragraphs: [
        "Version confusion is the most common failure: the client works from the second draft while you work from the fourth. A PDF makes this likely, a drive makes it possible, a portal makes it visible, because there is one current version with a date.",
        "The second failure is access. A link sent to the wrong person, a folder shared with the whole company, an old invoice still available after the project ended. Revocability is the control that matters here, and it is the one a PDF cannot offer at all.",
      ],
    },
    {
      heading: "The same project, three ways",
      paragraphs: [
        "A six-week rebrand with a 5,000 fee, three decision points and one invoice. With PDFs: a proposal attached on Monday, a contract attached on Thursday, a brief attached after that, and an invoice at the end. Every document is a separate attachment, the client's folder is their inbox, and the approval is an email that says looks good.",
        "With a shared drive: one folder per client, three subfolders, and a link to the proposal. It is tidier, the client can find the files, and the approval is still an email. The drive solves storage and does nothing for the decision.",
        "With a portal: one link, the proposal approved in the product on Tuesday, the contract signed in the same place on Thursday, the invoice issued with a due date and a reminder. The client has one place to look and you have a dated record of every decision. The cost is the subscription and the discipline of keeping the link current.",
      ],
    },
    {
      heading: "Cost, in money and in habits",
      paragraphs: [
        "A PDF is free and takes seconds. A drive is free with the account you already have and costs you the discipline of naming and permissions. A portal costs a monthly fee and a change of habit for both sides. Price the habit, not the subscription: if you will not keep one link per client updated, the portal will be an expensive place to store files nobody opens.",
        "There is also a switching cost that vendors rarely mention. Moving live clients into a new tool mid-project means two places to look for a few weeks, which is worse than either place on its own. Migrate between projects, not during them.",
      ],
    },
    {
      heading: "Where the cheap option wins",
      paragraphs: [
        "If you send fewer than three documents a month, and those documents are deliverables rather than decisions, a folder and a clear email are enough. If your clients are individuals who will never log in anywhere, a link to a PDF is the kindest option. If your work is one deliverable and one payment, the tooling is not your bottleneck.",
        "The one thing worth keeping even in that setup is a dated record of approval. A reply that says approved is a record; a phone call is not. That single habit is the part of a portal you can copy for free.",
      ],
    },
    {
      heading: "A decision table",
      paragraphs: [
        "Proposal: interactive link, because it needs a decision and you want the date it was read. Contract: interactive link with signature or written acceptance, because the record matters more than the format. Invoice: link plus a due date printed as a date and an automatic reminder, because payment is a process rather than a document. Working files: shared folder, because they are opened repeatedly and do not need approval.",
        "If you only remember one line from this article: decisions want links, files want folders, and money wants dates. Everything else is a preference.",
      ],
    },
    {
      heading: "Where Revercue fits",
      paragraphs: [
        "Revercue sends proposals, contracts, requirement forms and invoices as interactive links that a client opens without an account, so the decision is recorded on the document rather than in an email thread. It does not process card payments, does not provide a certified signature, and does not include a shared file drive, so it sits alongside your bank and your folder rather than replacing them. The free plan covers the link model; paid plans start at 12 a month.",
      ],
    },
    {
      heading: "What the client actually experiences",
      paragraphs: [
        "It is worth walking the client's version of each option, because the client's experience is the product. With a PDF, they receive an email, tap an attachment, wait for a viewer, scroll to find the price, and then either reply or close it. The reply is a sentence, and the sentence is the approval.",
        "With a drive, they receive a link, land in a folder, work out which file is current, open it, and reply by email as before. The folder is better than an attachment and the decision is unchanged, which is why drives feel tidier without solving the approval problem.",
        "With a portal, they receive a link and land on the document itself: the price, the scope, the button. They approve, and both sides have a timestamped record without anyone writing a sentence. The client's total effort falls from four steps to two, and the thing you need most, a decision, is the thing the interface is built around.",
      ],
    },
    {
      heading: "Migrating without breaking a live project",
      paragraphs: [
        "Change tools between projects, never during one. A live client with documents in two places will use the older one, because that is where the history is, and you will spend the rest of the project reconciling versions.",
        "When you do migrate, move one client at a time and start with the documents that are still open. Export the history you need as PDFs before you cancel anything, keep the old folder read-only for a month, and tell each client in one line where the new link is. A migration that needs a meeting is a migration that has gone wrong.",
        "Finally, decide what you will not migrate. Old projects from two years ago are records, not workflows; leave them archived where they are and let the new tool start clean. A fresh tool full of dead projects is harder to use than an empty one.",
      ],
    },
    {
      heading: "What to do this week",
      paragraphs: [
        "If you do nothing else, do three things. Take the last proposal you sent as an attachment, rebuild it as a link, and notice how much shorter the email becomes. Move the current client files into one folder with one link, and send that link once with a line about what it holds. Then put the due date as a date on your next invoice, and turn on one reminder.",
        "That is an afternoon of work and it covers the three failures this article is about: the decision that gets lost in an inbox, the file nobody can find, and the payment that quietly drifts past its date. You can decide about a portal later, with evidence from your own projects rather than a feature comparison.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Can I just use one tool for everything? Yes, if it is good at the decisions. A drive is fine for files but weak on approvals; a portal is strong on approvals but unnecessary for working files.",
        "Is a portal worth it for five clients? If those five clients generate most of your revenue and most of your admin, yes. If they are one-off projects, a link and a folder will do.",
        "What about clients who insist on email attachments? Send the PDF as a final copy, keep the link as the live version, and say which is which in one line.",
        "Does a link count as a signature? Only if the tool records consent, the name and the date, and even then it is a practical record rather than a certified signature. Check what your contract needs.",
        "What about security? A revocable link is usually safer than an uncancellable attachment. Scope the permission to the document and keep bank details out of email bodies.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Match the tool to the action. Decisions want an interactive link, files want a folder, records want a fixed copy, and money wants a dated process. Choosing per document takes five minutes and removes most of the confusion that makes client work feel heavier than it is.",
      ],
    },
  ],
};
