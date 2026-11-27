import type { BlogPost } from "../blog";

// GEO cluster — reference checklist. Close-out is a repeatable artefact, written
// to be lifted as a list.

export const HANDOVER_CHECKLIST_POST: BlogPost = {
  slug: "freelance-project-handover-checklist",
  title: "Freelance project handover checklist: what to transfer at the end",
  excerpt:
    "Files, access, documentation, accounts, payments and approvals — the complete close-out list, with the order to do it in and the things freelancers most often forget.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Freelance project statuses", to: "/blog/freelance-project-statuses" },
    { label: "How to share documents with clients", to: "/blog/how-to-share-documents-with-clients" },
    { label: "Client records in Revercue", to: "/features/crm" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A project is not finished when the last file is sent. It is finished when the client can operate without you, the access you held has been reviewed, and there is a record of what was agreed and what was delivered.",
        "Use this as a close-out checklist for every project. It takes about an hour and prevents the most common post-delivery problem: a client who cannot use what they paid for, or a freelancer who still holds credentials months later.",
      ],
    },
    {
      heading: "Files and deliverables",
      paragraphs: [
        "Deliver the formats the contract promised: source files, exports, editable documents, code, or the specific output named in the scope. If the contract lists them, match the list item by item.",
        "Label versions clearly. The final version should have a name a stranger can interpret, and superseded versions should be marked or removed from the delivery rather than left alongside the final.",
        "Include a one-page index: what each file is, what it is for, and which one is the master. This is the single most appreciated document in a handover and the least often provided.",
        "Check that the files open. A design file without linked fonts, a spreadsheet with broken references or a repository without its environment file is not a deliverable, even if it was sent.",
      ],
    },
    {
      heading: "Access and accounts",
      paragraphs: [
        "Transfer ownership where the client should own the account: domains, hosting, analytics, ad accounts, repository organisations, form tools, scheduling tools and any platform bought in their name.",
        "Remove your personal access from client systems you no longer need: shared drives, CMS roles, social accounts, payment dashboards and email aliases. Confirm the removal in writing so there is no ambiguity later.",
        "Keep a record of what was transferred and what was revoked, with dates. If the client later says they cannot access something, the record tells you whether it was transferred or never existed.",
        "For credentials, use a password manager share or the platform's own transfer flow. Never send passwords in plain text in the handover email.",
      ],
    },
    {
      heading: "Documentation the client needs",
      paragraphs: [
        "A short operating guide: how to update the content, where the images live, how to publish, how to restore a backup, who to contact for the platform. Two pages is usually enough; a video walkthrough is often better received.",
        "A list of dependencies and renewals: fonts, plugins, stock licences, hosting, certificates, paid tiers and their renewal dates. The client should know what will stop working and when.",
        "The acceptance record: what was signed off, when, by whom, and against which criteria. This is the document that settles a later disagreement about whether the work was complete.",
        "The final invoice and payment status, in the same close-out email. A handover that prompts the final payment is more effective than a chase two weeks later.",
      ],
    },
    {
      heading: "Approvals and rights",
      paragraphs: [
        "Confirm the licence or assignment in writing, consistent with the contract. If rights transfer on full payment, say so explicitly and make sure the payment has cleared before the transfer is final.",
        "Record the third-party assets used — stock images, fonts, icons, libraries — with their licence terms. The client needs to know what they can reuse and what requires a subscription.",
        "If confidentiality applies, confirm what may be disclosed and whether the work can appear in your portfolio. Get the answer in writing now, not when you update your site.",
      ],
    },
    {
      heading: "The close-out email",
      paragraphs: [
        "One email that does five things: confirms delivery and where the files are, summarises what was transferred and what was revoked, attaches or links the documentation, states the invoice and payment position, and confirms the project is complete.",
        "Keep it short and scannable. The index and the documentation carry the detail; the email is the summary the client will forward internally.",
        "Ask for confirmation of receipt. A one-line reply closes the loop and gives you evidence that the handover happened.",
      ],
    },
    {
      heading: "After handover",
      paragraphs: [
        "Set a support boundary: what is included after delivery, for how long, and how additional work is requested. Without it, the handover becomes an indefinite helpdesk.",
        "Archive the project in one place: contract, proposal, approved versions, invoices, handover record and correspondence. If a question arrives in a year, the archive should answer it in minutes.",
        "Ask for the testimonial and the referral while the result is fresh. The close-out is the natural moment, and a satisfied client is easiest to ask then.",
      ],
    },
    {
      heading: "The common omissions",
      paragraphs: [
        "The domain. It is the item most often left in the freelancer's account, and the one that causes the most distress when the relationship ends.",
        "The renewal list. Clients discover a lapsed font licence or hosting plan only when something breaks.",
        "The master file. A folder of exports but no editable source is a deliverable the client cannot maintain.",
        "The access revocation. Credentials held after the project are a security risk and, if something goes wrong, a reputational one.",
        "The acceptance record. Without it, \\\"you never finished\\\" is a claim that is hard to disprove from memory.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "What should a freelance project handover include? The deliverables in the agreed formats with an index, transferred accounts and revoked access, operating documentation, renewal and licence information, the acceptance record, and the final invoice.",
        "When should handover happen? After acceptance and, where the contract requires it, after final payment. The handover record should state both dates.",
        "Should I keep copies of the work after handover? Keep what your contract and jurisdiction allow for your records, and keep it secure. Do not keep client credentials you no longer need.",
        "Who owns the domain at handover? Usually the client, if they paid for it or the contract says so. Transfer it explicitly rather than leaving it in your registrar account.",
        "What if the client does not confirm receipt? Send one follow-up with the handover summary, then record the delivery as complete with the evidence you have.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Handover is a list, not a feeling. Files with an index, access transferred and revoked, documentation the client can follow, rights recorded, and one close-out email that states the payment position. An hour of work at the end saves months of \\\"where is that file?\\\" later.",
      ],
    },
  ],
};
