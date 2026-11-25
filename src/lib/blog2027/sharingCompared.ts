import type { BlogPost } from "../blog";

export const SHARING_COMPARED_POST: BlogPost = {
  slug: "client-portal-vs-shared-drive",
  title: "Client portal vs shared drive vs PDF: what to use for proposals, contracts and invoices",
  excerpt:
    "Three ways to share client work, compared on what the client has to do, what you can see afterwards, and what each one costs you when a project goes wrong. No single winner, a clear default.",
  date: "2026-11-25",
  readMinutes: 12,
  links: [
    { label: "Do freelancers need a client portal?", to: "/blog/do-freelancers-need-a-client-portal" },
    { label: "Sharing documents securely", to: "/blog/how-to-share-documents-with-clients" },
    { label: "Compare Revercue with other tools", to: "/compare" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "There are three common ways to give a client a proposal, a contract or an invoice: a PDF attachment, a shared drive folder, or a portal or link. Each is a different trade between convenience for the client and visibility for you, and the right choice depends on the document rather than on taste.",
        "This comparison is deliberately practical. It does not rank the options overall, because there is no overall winner. It compares them on four things that decide how a project feels: what the client has to do, what you can see afterwards, how the document is found six months later, and what happens when something goes wrong.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Use a link for anything the client needs to read and act on: proposals, contracts, requirement forms and invoices. Use a shared drive for the working files that you and the client both edit or reference repeatedly. Use a PDF for the final artefact that must be archived, signed or submitted to a system that requires a file.",
        "In practice that means a link is the default for the client-facing decision, a drive is the default for the collaboration, and a PDF is the default for the record. Most freelancers use one of the three for all three jobs, which is where the friction comes from.",
      ],
    },
    {
      heading: "What the client has to do",
      paragraphs: [
        "A PDF requires a download, a compatible viewer and often a reply. On a phone, which is where most first opens happen, that is three steps before the client has read a word. The reply then has to contain the decision, the questions and the chosen package, which means you re-type it into your own documents.",
        "A shared drive requires a link, sometimes a sign-in, and a folder structure the client has to understand. It is excellent for a client who is collaborating on files and poor for a client who needs to make one decision. The folder also tends to accumulate versions, so the client has to work out which file is current.",
        "A portal link requires one tap and no account. The client reads, chooses a package, asks a question or signs on the page, and the answer becomes structured data rather than a paragraph in an email. The trade is that the client cannot keep the page in the same way they keep a file, so a download option still matters.",
      ],
    },
    {
      heading: "What you can see afterwards",
      paragraphs: [
        "A PDF tells you nothing. You know you sent it. You do not know whether it arrived, whether it was opened, or which page the client stopped at. Every follow-up is therefore a guess, and the guess is usually wrong in the direction of assuming the client read it.",
        "A shared drive tells you a little: file views in some suites, edit history if the client edits. It does not tell you whether the decision-maker saw the document, and it rarely tells you what they looked at.",
        "A link tells you the most: opened, when, and depending on the tool, which sections were viewed, which package was selected and which question was asked. This is the strongest argument for links, and it is not about surveillance. It is about knowing whether to send a follow-up about the price or a follow-up about the deadline.",
      ],
    },
    {
      heading: "How it is found six months later",
      paragraphs: [
        "A PDF is found in an inbox, if the client still has the email. It is a fixed artefact, which is good for evidence and bad for updates. The version question is settled, which is the one thing PDFs do better than anything else.",
        "A drive is found if the client remembers the folder. It is good for ongoing work and poor for the record, because folders get reorganised and links get revoked when someone leaves.",
        "A link is found if it is still live and the client kept it. That is a real weakness, which is why the record should also exist on your side. The client's ability to find it later matters less than your ability to answer the question what was agreed, and that answer should come from your record rather than from the client's inbox.",
      ],
    },
    {
      heading: "What happens when something goes wrong",
      paragraphs: [
        "The dispute scenario is the one that reveals the difference. A client says the scope included something you did not agree to, or that the invoice was for a different amount. With a PDF, you have a file and an email, and the file may be one of four versions. With a drive, you have a folder whose contents have changed. With a link and a record, you have the published version, the date it was opened, the package that was chosen and the question that was asked.",
        "That is not a legal guarantee, and it does not replace a contract. It is evidence, and evidence is what turns a disagreement into a short conversation. The freelancer with a record rarely has to argue about what happened, because the record shows it.",
        "The same applies to payment. An invoice that was sent as a link, opened twice and never paid is a different conversation from an invoice that may or may not have arrived. The second conversation is about delivery; the first is about intention. The first is much easier to have.",
      ],
    },
    {
      heading: "Cost, in money and in habits",
      paragraphs: [
        "A PDF costs nothing and needs no new tool, which is why it is the default. A drive is usually already paid for, and it is free at the point of use if the client has the same suite. A portal or a link tool costs a subscription, and it asks you to build templates and a process.",
        "The hidden cost of the free options is your time. Every version you re-send, every follow-up you send blind, every decision you re-type from an email is a cost that does not appear on an invoice. The question is not whether the tool is free; it is whether the hours it saves are worth more than the subscription.",
        "The hidden cost of the paid option is adoption. A tool you do not use consistently is worse than a method you use every time. If you buy a portal and still send PDFs half the time, you have added a subscription and kept the problem.",
      ],
    },
    {
      heading: "A decision table",
      paragraphs: [
        "Proposal: link. The client needs to read, choose and ask, and you need to know whether it was opened. Send a PDF only if the client's systems require one.",
        "Contract: link, with a typed-name signature and a stored copy. PDF for the executed version, because the counterparty may need a file.",
        "Requirement form: link. The answers should arrive structured, not as an email reply with six paragraphs.",
        "Invoice: link with the payment details or the payment link. PDF for the client's finance system if required, with the bank details handled carefully.",
        "Working files: shared drive. This is what drives are for, and no portal replaces it.",
        "Final deliverables: PDF or the format the client will actually use, plus a link to the archive.",
      ],
    },
    {
      heading: "Where Revercue fits",
      paragraphs: [
        "Revercue takes the link model: a proposal, a contract, a requirement form and an invoice are each an interactive page with an unguessable address that the client opens without an account. Every action on the page, such as opening, choosing a package, asking a question, approving or paying, becomes part of the client record.",
        "It does not replace a shared drive for working files, and it does not claim to be a document management system. It also does not send email itself: you share the link from your own address or messaging app. That is a deliberate scope decision rather than a missing feature, and it is worth knowing before you compare it with a portal that owns the whole inbox.",
        "If your work is mostly one proposal a month to a new client, a good PDF and a tidy inbox may be enough. If you have repeat clients and several documents per project, the link plus the record is the smallest setup that solves the three problems in this article.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Can I use all three? Yes, and most good setups do: links for decisions, a drive for files, PDFs for records.",
        "Which is best for a client who is not technical? A link with no account. It is one tap and nothing to install. The PDF is the fallback if their email system blocks links.",
        "Do portals work on mobile? The good ones do. Check before you buy, because the first open is usually on a phone.",
        "Is a shared drive secure enough for contracts? It depends on the permissions and on who has access. For a signed contract, a link with a stored copy is usually a better record than a folder.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Match the method to the job. Links for decisions, drives for collaboration, PDFs for the record. The mistake is using one for all three, because each one is good at exactly one thing and mediocre at the others. The freelancer who gets this right spends less time chasing and more time working, and the client notices the difference.",
      ],
    },
  ],
};
