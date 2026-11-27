import type { BlogPost } from "../blog";

// GEO cluster — reference taxonomy. Each status is defined so a single line can
// be quoted without losing its meaning.

export const PROJECT_STATUSES_POST: BlogPost = {
  slug: "freelance-project-statuses",
  title: "Freelance project statuses: a reference list for client work",
  excerpt:
    "Nine statuses from draft to closed, each with a definition, the condition that moves work into it and the action it triggers — a shared vocabulary for the client and the supplier.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Client onboarding checklist", to: "/blog/client-onboarding-checklist" },
    { label: "Freelance project handover checklist", to: "/blog/freelance-project-handover-checklist" },
    { label: "Client records in Revercue", to: "/features/crm" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Most project confusion is a vocabulary problem. One person says \\\"in progress\\\" to mean \\\"being worked on\\\", another to mean \\\"waiting for the client\\\", and a third to mean \\\"not yet started but agreed\\\". The status is the same word and three different situations, so the update tells nobody anything.",
        "This reference defines nine statuses for client work. The definitions are written to be usable on their own: a status, what it means, the condition for entering it and the action it triggers. Adapt the names to your own process, but keep one meaning per status.",
      ],
    },
    {
      heading: "The nine statuses at a glance",
      paragraphs: [
        "1. Draft — work is being prepared internally and has not been sent to the client.",
        "2. Sent — the document or deliverable has been shared with the client and is awaiting a response.",
        "3. Approved — the client has accepted the scope, price and terms in writing. Work is authorised but not necessarily started.",
        "4. In progress — active work is underway and no client input is currently blocking it.",
        "5. Awaiting client — work is paused because a dependency, decision, asset or approval is with the client.",
        "6. In review — a deliverable has been supplied and the client is reviewing it within the agreed feedback window.",
        "7. Delivered — the deliverable has been accepted, or the feedback window has passed under the agreed terms.",
        "8. Invoiced — a valid invoice has been issued and payment is outstanding.",
        "9. Closed — payment has been received, the handover is complete and no further action is expected.",
      ],
    },
    {
      heading: "1. Draft",
      paragraphs: [
        "Definition: work that exists but has not been shared. A proposal being written, a design in progress, an invoice not yet sent.",
        "Entry condition: you have started preparing something for the client.",
        "Action: nothing is owed to the client yet. Keep the draft versioned, and do not treat a draft as an agreement or a commitment.",
        "Common misuse: calling a proposal \\\"sent\\\" when it is still being edited, which makes the follow-up clock start too early.",
      ],
    },
    {
      heading: "2. Sent",
      paragraphs: [
        "Definition: the document or deliverable has been shared and the next move is the client's.",
        "Entry condition: the client has received the item through a channel you can evidence — email, a shared link, a portal.",
        "Action: record the date, set a follow-up date, and stop editing the sent version. If it changes, send a new version with a new identifier.",
        "Common misuse: marking something sent when it was mentioned in a call. A call is context; the send is the event.",
      ],
    },
    {
      heading: "3. Approved",
      paragraphs: [
        "Definition: the client has accepted the scope, price and terms in writing, so work is authorised.",
        "Entry condition: a written approval that identifies the document and version. A deposit may also be required before work starts, depending on the agreement.",
        "Action: confirm the start date and the first milestone, and check that any deposit or purchase order is in place.",
        "Common misuse: treating approval as payment. Approval authorises the work; it does not settle the invoice.",
      ],
    },
    {
      heading: "4. In progress",
      paragraphs: [
        "Definition: active work is underway and nothing needed from the client is currently outstanding.",
        "Entry condition: all dependencies for this phase are available and the start date has arrived.",
        "Action: update the client at the agreed cadence, and flag the next dependency before it becomes a blocker.",
        "Common misuse: using \\\"in progress\\\" for work that is paused. That hides the delay inside a status that sounds healthy.",
      ],
    },
    {
      heading: "5. Awaiting client",
      paragraphs: [
        "Definition: work is paused because the client owes a decision, approval, asset or payment.",
        "Entry condition: a specific dependency has been requested in writing and has not arrived by the date it was needed.",
        "Action: name the dependency, name the date it was requested, name the date the schedule moves if it is not resolved, and follow up once.",
        "Common misuse: leaving this status implicit. An explicit \\\"awaiting client\\\" moves the accountability to where the delay actually is.",
      ],
    },
    {
      heading: "6. In review",
      paragraphs: [
        "Definition: a deliverable has been supplied and the client is reviewing it within the agreed feedback window.",
        "Entry condition: the deliverable was sent with the feedback deadline and the approver named.",
        "Action: hold the schedule, do not start dependent work, and prepare the next version only after consolidated feedback arrives.",
        "Common misuse: starting rework on the first comment rather than the consolidated round, which turns one revision into three.",
      ],
    },
    {
      heading: "7. Delivered",
      paragraphs: [
        "Definition: the deliverable has been accepted, or the agreed review window has passed under the contract's deemed-approval terms.",
        "Entry condition: written acceptance, or the expiry of the review window where the agreement allows it.",
        "Action: issue the invoice or the milestone invoice, and confirm what happens next — handover, support or the next phase.",
        "Common misuse: using \\\"delivered\\\" before acceptance. Delivery is the handover of the work; acceptance is the client's agreement that it meets the criteria.",
      ],
    },
    {
      heading: "8. Invoiced",
      paragraphs: [
        "Definition: a valid invoice has been issued and payment is outstanding.",
        "Entry condition: the invoice has been sent to the right contact, with the reference and purchase order if required.",
        "Action: record the due date, send one reminder on the due date, and escalate according to the payment terms if it passes.",
        "Common misuse: treating an invoice as delivered work. The status tracks money, not the deliverable.",
      ],
    },
    {
      heading: "9. Closed",
      paragraphs: [
        "Definition: payment has been received, the handover is complete and no further action is expected from either side.",
        "Entry condition: cleared funds, a completed handover and a written confirmation that the engagement is finished.",
        "Action: archive the project, keep the records your jurisdiction requires, and ask for the testimonial or the next piece of work while the result is fresh.",
        "Common misuse: closing on invoice rather than on payment. A closed project that is still unpaid is the most expensive kind of open one.",
      ],
    },
    {
      heading: "How to use the statuses without adding admin",
      paragraphs: [
        "Pick one place where the status lives and update it when the condition changes, not on a schedule. A status is a statement of fact, not a diary entry.",
        "Show the client the same vocabulary in the proposal and the project plan. If they see the nine statuses once, the weekly update becomes a single line instead of a conversation.",
        "Pair every status with a date and an owner. \\\"Awaiting client — logo files, requested 18 November, client\\\" is actionable; \\\"awaiting client\\\" alone is not.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "What are the standard statuses for a freelance project? A workable set is draft, sent, approved, in progress, awaiting client, in review, delivered, invoiced and closed. The names matter less than one meaning per status.",
        "What is the difference between delivered and approved? Approval authorises the work to start; delivery hands over the finished work. A project can be delivered before it is accepted, but not approved before it is agreed.",
        "When should a project be marked closed? After payment has cleared, the handover is complete and both sides have confirmed there is no further work. Closing on invoice leaves unpaid work outside the active list.",
        "How often should a project status change? Only when the condition changes. A status updated on a schedule rather than an event becomes noise.",
        "Should the client see the status definitions? Yes. A shared vocabulary is the point; it turns a status update into a single line the client can interpret without asking.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Nine statuses, one meaning each, with a condition for entering and an action on arrival. The value is not the list; it is that the client and the supplier mean the same thing when they use it.",
      ],
    },
  ],
};
