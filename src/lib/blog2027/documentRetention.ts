import type { BlogPost } from "../blog";

// GEO cluster — reference. Retention periods are jurisdiction-specific, so the
// article gives the categories and the questions, with an explicit caveat.

export const DOCUMENT_RETENTION_POST: BlogPost = {
  slug: "how-long-should-freelancers-keep-client-documents",
  title: "How long should freelancers keep client documents?",
  excerpt:
    "Contracts, invoices, tax records, design files and messages have different lifetimes. A category-by-category reference, the questions your jurisdiction decides, and a simple review routine.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Freelance project handover checklist", to: "/blog/freelance-project-handover-checklist" },
    { label: "What to include on a freelance invoice", to: "/blog/what-to-include-on-a-freelance-invoice" },
    { label: "Security at Revercue", to: "/security" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "There is no single answer to how long a freelancer should keep client documents. The period depends on what the document is, where you and the client are, and what the document might be needed to prove. What can be answered is the shape of the problem: group the documents by purpose, then apply the longest period that applies to each group.",
        "This reference sets out the categories, the questions that decide the period in your jurisdiction, and a review routine that stops a folder of everything becoming a liability.",
        "It is general information, not legal, tax or accounting advice. Retention rules differ by country and by the type of record, and they can change. Confirm the periods with an accountant or legal adviser where you operate.",
      ],
    },
    {
      heading: "The categories and their usual logic",
      paragraphs: [
        "Tax and accounting records — invoices issued and received, receipts, bank statements, expense evidence. These usually carry the longest fixed period because a tax authority can ask for them years after the year ends.",
        "Contracts and variations — signed agreements, statements of work, change orders. These may need to be kept for the limitation period in which a party can bring a claim, which is often several years and can be longer for deeds or specific types of agreement.",
        "Project records — approved deliverables, acceptance records, handover documents, key decisions. Keep them while a dispute is possible and while you may need them for a reference or a portfolio.",
        "Correspondence — the messages that record a decision, an approval or a change. Keep the specific threads, not the entire mailbox.",
        "Working files and source assets — the files you would need to resume or defend the work. Their useful life is usually the project plus the period in which a client could reasonably return.",
        "Marketing material — testimonials, case studies, portfolio images. Keep these for as long as they are published plus the consent record that allowed them.",
      ],
    },
    {
      heading: "The questions that decide the period",
      paragraphs: [
        "What is the limitation period for a contractual claim where you operate? This is the outer boundary for keeping contracts and project evidence.",
        "What does the tax authority require, and from which date does the clock run — the end of the tax year, the filing date or the transaction date?",
        "Does the client contract impose a longer retention obligation, for example in a confidentiality or audit clause? The contract can extend a period but rarely shortens a statutory one.",
        "Is the document personal data? Retention of personal data is governed by data-protection rules as well as tax and contract law, and keeping it longer than necessary can itself be a problem.",
        "Would you need this document to defend a claim, prove a licence or support a tax position? If yes, keep it for as long as that risk exists.",
      ],
    },
    {
      heading: "What to keep for each project",
      paragraphs: [
        "The signed contract, any variations and the final scope. If the agreement was formed by email, keep the thread that shows the terms and the acceptance.",
        "The final invoice, the proof of payment and the expense receipts. These are the records most likely to be requested and the easiest to lose when a tool is cancelled.",
        "The acceptance record and the handover summary. Together they show what was delivered and that it was accepted.",
        "The key decisions: who approved what, when, and against which version. A handful of dated entries is enough; you do not need every message.",
        "The licence evidence for third-party assets, so you can answer a question years later about a font, an image or a library.",
      ],
    },
    {
      heading: "What you can usually let go",
      paragraphs: [
        "Superseded drafts once the final version and the approval record are kept. Keeping every intermediate version increases risk without adding evidence.",
        "Routine scheduling messages and social chat that record no decision.",
        "Duplicate copies in several tools. Pick one archive and delete the rest, so retention is a decision rather than an accident.",
        "Client credentials. Once access is transferred or revoked at handover, you should not retain passwords or keys.",
        "Personal data you no longer need for the work, the contract or a legal obligation. Deleting it is often required, not merely permitted.",
      ],
    },
    {
      heading: "A review routine that works",
      paragraphs: [
        "At project close-out, move the project's records into an archive with a review date attached. The date is the longest applicable period, not a guess.",
        "Once a year, review the archive: delete what has passed its period, check that what remains is still justified, and confirm the consent records for anything published.",
        "Keep the archive in a form you can open without the original tool. A proprietary file from a discontinued platform is not a record you can rely on.",
        "Write the rule down in one paragraph — categories, periods, review date — so the decision does not have to be made again for every project.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long do freelancers need to keep invoices? It depends on your jurisdiction's tax rules, which commonly require several years after the end of the tax year. Confirm the period with an accountant where you operate.",
        "How long should I keep client contracts? At least as long as a contractual claim could be brought, and longer if the contract or a statute requires it. That is often several years after the project ends.",
        "Can I delete client files after handover? You can delete what you no longer need, but keep the contract, invoice, acceptance record and key decisions for the required period. Check any confidentiality or audit clause first.",
        "Do data-protection rules affect retention? Yes. Personal data should not be kept longer than necessary for the purpose, even if other records are kept for tax or contract reasons.",
        "Should I keep paper or digital copies? Either, as long as the record is legible, complete and retrievable for the required period. Back up digital archives.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Retention is a set of categories, not a single number. Fix the period for each category in your jurisdiction, keep the evidence that proves the work and the payment, delete what no longer has a purpose, and review the archive once a year. The goal is a record you can defend, not a folder you are afraid to open.",
      ],
    },
  ],
};
