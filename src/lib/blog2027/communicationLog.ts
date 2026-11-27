import type { BlogPost } from "../blog";

// GEO cluster — reference method. Fields, cadence and limits, written to be
// lifted as a specification.

export const COMMUNICATION_LOG_POST: BlogPost = {
  slug: "what-to-record-in-a-client-communication-log",
  title: "What to record in a client communication log (and what to leave out)",
  excerpt:
    "The fields that make a client log useful six months later, the cadence that keeps it accurate, and the information that should never go into it — a reference for freelancers.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Questions to ask a new client", to: "/blog/questions-to-ask-a-new-client" },
    { label: "Freelance client red flags", to: "/blog/freelance-client-red-flags" },
    { label: "Client records in Revercue", to: "/features/crm" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A client communication log is a record of what was decided, requested and promised, kept close to the client rather than buried in an inbox. Its purpose is not to document every message. It is to answer three questions quickly: what did we agree, what is outstanding, and who said what.",
        "This reference lists the fields worth keeping, the cadence that keeps the log current, and the material that should not be recorded. It applies whether the log is a spreadsheet, a document or a field in a client record.",
      ],
    },
    {
      heading: "The minimum fields",
      paragraphs: [
        "Date. The date of the communication, not the date you logged it. If they differ, record both; the gap is sometimes the interesting part.",
        "Channel. Email, call, message, meeting, portal. This tells you where the evidence lives if you need to find it.",
        "Participants. The people involved on both sides, by name and role. \\\"The client\\\" is not a participant; \\\"Priya, marketing lead\\\" is.",
        "Type. Decision, request, approval, change, risk, payment, or general update. A small controlled list makes the log searchable and stops it becoming a diary.",
        "Summary. One or two sentences in plain language: what was said, what was agreed, what happens next. Write it for a reader who was not there.",
        "Owner and due date. Who is doing the next action and by when. A log without an owner is a history; a log with one is a tool.",
        "Links. The message thread, the document version, the invoice or the ticket. The log points to the evidence rather than replacing it.",
      ],
    },
    {
      heading: "Fields worth adding for project work",
      paragraphs: [
        "Project and phase. Which piece of work the entry relates to, especially if the client has several projects open.",
        "Document version. If a decision refers to a proposal, contract or design version, record which one. A decision recorded against the wrong version is worse than no record.",
        "Amount. For anything financial, the figure and the currency. \\\"Discussed the budget\\\" is not useful; \\\"agreed £4,500 for phase two, invoiced on 12 December\\\" is.",
        "Sentiment or risk flag. Optional, but useful for a short note such as \\\"client concerned about timeline\\\" so a pattern is visible across entries.",
      ],
    },
    {
      heading: "Cadence",
      paragraphs: [
        "Log on the event, not on a schedule: a decision, an approval, a change, a promise or a payment. Those are the entries that matter later.",
        "Summarise the week in one entry if the project has a regular rhythm. A weekly line that names the status, the next milestone and any open dependency is enough for most client work.",
        "Review the log before every client call. Five minutes of reading replaces twenty minutes of scrolling through email, and it makes the call start with the open items rather than the history.",
        "Close the loop at the end of a project: mark the final decisions, the acceptance and the handover. A log that stops at delivery is missing the entries a dispute would need.",
      ],
    },
    {
      heading: "What not to record",
      paragraphs: [
        "Passwords, card numbers, bank credentials or identity documents. A communication log is not a secure store, and client data in the wrong place is a liability.",
        "Personal opinions about the client or their team. The log may be disclosable, forwarded, or read by someone else. Write what was agreed, not what you thought of the meeting.",
        "Speculation presented as fact. \\\"The client seems to be running out of budget\\\" is a guess; \\\"the client asked to defer phase two to Q1\\\" is a record.",
        "Every message in full. The log is a summary layer; the messages are the evidence. Copying entire threads makes the log unreadable and duplicates data you may need to delete later.",
        "Anything you would not want the client to read, unless your jurisdiction and your policy clearly treat the log as private. Assume it could be seen.",
      ],
    },
    {
      heading: "Why the log pays for itself",
      paragraphs: [
        "It shortens the next call. The open items and the last decisions are already written down.",
        "It settles scope questions. A change that was requested and approved is an entry with a date, not a memory of a conversation.",
        "It supports invoicing. Work agreed in an entry can be traced to the scope and the fee.",
        "It protects the relationship. A factual record lets you raise a problem without implying bad faith, because the sequence is visible to both sides.",
        "It survives staff changes. When the client's contact leaves, the log is the briefing document for their replacement.",
      ],
    },
    {
      heading: "Where to keep it",
      paragraphs: [
        "Keep it with the client record: one place per client, with projects inside it. A log spread across notebooks, email folders and memory is not a log.",
        "Keep it separate from the documents themselves. The log references the contract, the proposal and the invoice; it does not replace them.",
        "Back it up or use a tool that does. A communication log that disappears with a laptop is a record you did not really keep.",
        "Set a review date for retention. Keep what you need for the period your jurisdiction and your insurer expect, then delete the rest on a schedule rather than keeping everything forever.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "What should a client communication log contain? Date, channel, participants, type, a short summary, the next action with an owner and due date, and links to the underlying document or thread.",
        "How often should I update it? When something is decided, approved, requested, changed or paid. A weekly summary is enough for routine project updates.",
        "Can I keep client emails in a spreadsheet? You can summarise them there, but keep the originals in the mail system and link to them. A spreadsheet is not a reliable archive of the messages themselves.",
        "Should the client be able to see the log? Only if you intend it as a shared record. Otherwise treat it as internal, and never write anything you would not want disclosed.",
        "How long should I keep a client communication log? For the period your jurisdiction, insurer and contract require. Review it at close-out and delete what is no longer needed.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A useful log has seven fields, is updated when something changes, and is read before every call. It answers what was agreed, what is outstanding and who said what — without keeping every message or every opinion.",
      ],
    },
  ],
};
