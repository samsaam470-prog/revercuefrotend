import type { BlogPost } from "../blog";

// GEO cluster — method. A reproducible version-control routine for contracts.

export const CONTRACT_VERSIONS_POST: BlogPost = {
  slug: "contract-version-control",
  title: "Contract version control: a simple method that prevents the wrong signature",
  excerpt:
    "Most contract disputes about wording start with the wrong file, not a bad clause. A naming rule, one source of truth and a version table keep the signed document and the agreed document the same thing.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "How clients approve a proposal", to: "/blog/how-clients-approve-a-proposal" },
    { label: "Retainer agreement guide", to: "/blog/retainer-agreement-guide" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A contract is agreed over email, revised in a document, reviewed by a lawyer and signed in a third system. By the end there are five files with similar names, two of them called final, and nobody is entirely sure which version the client actually signed.",
        "Version control is not a software ritual. It is the practice of making the current version obvious, so that the document someone signs is the document everyone agreed to.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Use one naming convention, keep one source of truth, record every material change in a version table, and send only the current version. When a signature is requested, freeze the version and reference its number in the signing message.",
        "A workable convention: `ClientName_Service_Contract_v1.2_2026-11-26.pdf`, where the major number changes when the commercial terms change and the minor number changes for wording or formatting. The date is the date of that version, not the project start.",
      ],
    },
    {
      heading: "Pick one source of truth",
      paragraphs: [
        "Decide where the authoritative version lives: a document system, a contract tool, or a shared folder with controlled access. Every other copy is a reference, not a place to edit.",
        "The common failure is editing the version attached to an email because it is the one open on screen. The attachment becomes a new draft, the shared folder still holds the old one, and the next person to look has two candidates.",
        "If you use email to exchange drafts, say which copy is authoritative in the message: \"Attached is v1.3; this replaces v1.2. I will update the shared folder after your review.\" That sentence prevents most accidental forking.",
      ],
    },
    {
      heading: "Use a version table",
      paragraphs: [
        "Put a small table at the top or end of the contract: version, date, author, summary of change, status. Five columns and one row per version is enough. It turns a pile of files into a history.",
        "Example entries: v1.0, 12 November, supplier, first draft, superseded. v1.1, 18 November, supplier, payment terms changed from 30 to 14 days at client request, superseded. v1.2, 22 November, client counsel, liability cap added, signed.",
        "The table also helps the person reviewing the contract. They can see what changed since the version they read, rather than re-reading the whole document to find one clause.",
      ],
    },
    {
      heading: "Handle redlines deliberately",
      paragraphs: [
        "A redline is a proposed change, not an agreed change. Accept or reject each edit, then produce a clean version. Do not send a document with unresolved tracked changes and call it final; the other side cannot tell which comments are still live.",
        "When you accept a change, note it in the version table. When you reject one, say why in the covering message, briefly. The goal is a clean current version plus a record of the decisions, not a forensic trail of every keystroke.",
        "If the other side sends a redline, compare it against your current version, not against an older draft. Otherwise you may reintroduce a clause that was already removed.",
      ],
    },
    {
      heading: "Freeze before signature",
      paragraphs: [
        "The moment you ask for a signature, stop editing. Convert the document to a non-editable format if that is the convention, or lock the version in the signing tool, and reference the version number in the request: \"Please sign v1.2 dated 22 November. This is the version we agreed on 21 November.\"",
        "If a change is needed after the signature request, withdraw the request, issue a new version, and ask for the new version to be signed. Editing a document that is already out for signature is how two different signed versions end up in existence.",
        "After signature, store the signed copy as the authoritative record and mark all previous versions superseded. Do not delete them; the history is useful if the wording is ever questioned.",
      ],
    },
    {
      heading: "What to send, and what not to",
      paragraphs: [
        "Send the current version and, if helpful, a summary of changes since the last version. Do not send five attachments with names like final, final2 and final-reviewed. The recipient will open the wrong one, and the mistake will be yours to resolve.",
        "If the client asks for a Word version to edit, send it with the version number in the filename and a note that the shared copy remains authoritative until they return it. When it comes back, treat it as a new draft and increment the version.",
        "For signature, send one file and one link. If the signing platform generates its own copy, reference the version number in the subject line and the message so the signed artefact can be matched to the agreed draft.",
      ],
    },
    {
      heading: "Keep the record together",
      paragraphs: [
        "Store the signed contract, the final statement of work, the proposal it references and the approval email in one place. A signed contract without the scope it incorporates is only half a record.",
        "Name the folder by client and project, not by date. The question six months later is \"what did we agree with this client?\", not \"what did we do in November?\".",
        "If the contract has schedules or annexes, version them too. A schedule updated without a change to the contract version is a quiet amendment that nobody has approved.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "A consultant sends v1.0 on 12 November. The client's lawyer returns a redline on 18 November: liability cap added, payment terms changed to 14 days. The consultant accepts both, produces v1.1 with a clean copy and a version table, and sends a two-line summary of the changes.",
        "The client approves v1.1 by email on 21 November. The consultant freezes v1.2 — the same content with the signature block and final formatting — and sends it for signature with the version number in the message. The client signs on 22 November.",
        "The folder holds v1.0 (superseded), v1.1 (approved draft), v1.2 (signed) and the approval email. If the payment terms are questioned in March, the answer is one file away rather than in an inbox search.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How should I name contract versions? Include the client, the service, a version number and the date: Client_Service_Contract_v1.2_2026-11-26.pdf. Change the major number for commercial changes and the minor number for wording.",
        "Should I send PDF or Word? Send PDF for signature and a Word version only when the other side needs to edit. Always put the version number in the filename and the email subject.",
        "What if the client edits a signed contract? A signed contract should not be edited. Any change needs a new version or a written amendment, signed by both parties.",
        "Do I need a version table for a one-page contract? It is still useful if the contract goes through more than one round. For a single draft with no changes, the filename and date are enough.",
        "How long should I keep old versions? Keep them for the life of the contract plus any limitation period in the relevant jurisdiction. The history is evidence if the wording is disputed.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Version control is three habits: one authoritative copy, a numbered history and a freeze before signature. The method costs a few minutes and prevents the most avoidable contract dispute of all — two people holding different documents and both believing they are right.",
      ],
    },
  ],
};
