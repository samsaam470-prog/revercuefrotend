import type { BlogPost } from "../blog";

// SEO cluster — cancellation and kill fees. The glossary defines a kill fee;
// this article covers the process of ending a project.

export const CANCEL_PROJECT_POST: BlogPost = {
  slug: "how-to-cancel-a-freelance-project",
  title: "How to cancel a freelance project without losing the relationship",
  excerpt:
    "What the contract needs to say before a project goes wrong, the sequence to follow when either side ends it, how to calculate what is owed, and what to hand over on the way out.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "When a client does not pay an invoice", to: "/blog/when-a-client-does-not-pay-an-invoice" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Projects end early for ordinary reasons: the budget moves, the product changes, the client hires internally, the work stops being the right work. None of that has to be a fight. What turns an ending into a dispute is usually not the decision — it is the absence of a written answer to three questions: how much notice, how much money, and what gets handed over.",
        "This article covers both directions. A client cancelling your project and you cancelling theirs are the same conversation with different leverage, and the same clause should handle both.",
      ],
    },
    {
      heading: "Before it happens: what the contract should say",
      paragraphs: [
        "Notice: how either party ends the engagement, and how many days' notice is required. Seven or fourteen days is common for project work; thirty is common for retainers. Without a notice period, \\\"cancel\\\" means \\\"stop today\\\", which leaves both sides guessing about the work in progress.",
        "Payment on cancellation: what is owed for work completed, work in progress and capacity reserved. A clear formula is better than a feeling. \\\"Work completed to the cancellation date is payable at the agreed rate, plus any non-refundable costs incurred\\\" is a formula.",
        "A kill fee, if you use one: a fixed amount or a percentage of the remaining fee, triggered when the client ends the project without cause. It compensates for the work you turned down and the gap the cancellation leaves in your schedule. If you include one, say what it is not: it is not a penalty for a change of mind, and it should be reasonable enough to be enforceable.",
        "Delivery on cancellation: what you hand over if the project stops midway, in what format, and whether it is conditional on payment. A common arrangement is that finished, paid-for work is delivered, and unfinished work is either delivered as-is with a note or retained.",
        "Rights on cancellation: what happens to the licence or assignment if the project ends before completion. This is the clause people forget. It should say what the client may do with partial work.",
      ],
    },
    {
      heading: "When the client cancels",
      paragraphs: [
        "Acknowledge it in writing the same day. Confirm the date the cancellation takes effect, the notice period that applies, and what you understand to be outstanding. Do not argue about the reason; the reason rarely changes what is owed.",
        "Send a cancellation statement rather than a surprise invoice. It should list work completed, work in progress and its percentage, expenses incurred, the notice period charge if the contract has one, any kill fee, and the total. Attach the timesheet, milestone record or delivery evidence if the project had one.",
        "Pause new work immediately and tell the client you have. Continuing to work after a cancellation, without written agreement, is how a disputed extra invoice appears later.",
        "Offer a handover that is proportionate. If they are stopping because the budget moved, they may still need what exists. Handing over completed files promptly, with a short index, ends the relationship well and reduces the chance of a payment dispute.",
      ],
    },
    {
      heading: "When you cancel",
      paragraphs: [
        "Cancelling on a client is harder and should be rarer. Do it in writing, with the notice the contract requires, and with a reason that is factual rather than personal: capacity, a conflict of interest, a repeated failure to provide dependencies, or a breakdown in the working relationship.",
        "If the cause is non-payment or missing approvals, say so precisely and give the client a chance to remedy it if you are willing to continue. \\\"The invoice due on 14 November remains unpaid, and work is paused until it is settled\\\" is clearer than a general complaint.",
        "Return or delete what you should not keep, confirm what has been paid, and hand over the work that has been paid for. Do not hold completed work as leverage for a disputed amount unless the contract allows it; in many jurisdictions that is a bigger problem than the unpaid invoice.",
        "Expect the relationship to end. Sometimes it does not — a well-handled cancellation can lead to a referral later — but do not cancel in a way that assumes it will.",
      ],
    },
    {
      heading: "Calculating what is owed",
      paragraphs: [
        "Start from the contract, not from a feeling about fairness. If the contract says completed milestones are payable, list the completed milestones. If it says hourly, use the recorded hours. If it says a percentage of the fee on cancellation, apply the percentage.",
        "For work in progress, agree a percentage before the cancellation where possible. \\\"The brand sheet is 60 per cent complete\\\" is easier to accept when it was written in a status update the week before, rather than calculated in the same email as the invoice.",
        "Expenses need receipts, not estimates. If you booked a photographer, a licence or travel, the cancellation statement should show the cost and the evidence. Estimates invite negotiation; receipts do not.",
        "If there is no clause at all, propose a split and explain the reasoning. A reasonable proposal — completed work plus a share of the notice period — is more likely to be paid than an all-or-nothing claim, and it keeps the possibility of a reference alive.",
      ],
    },
    {
      heading: "What to hand over",
      paragraphs: [
        "Hand over what has been paid for, in the format the client can use: source files if the contract promised them, exports if that is what was specified, and a short index that explains what each file is and what state it is in.",
        "Label unfinished work clearly. A half-built website with no note about what is missing is worse than no website, because the next supplier has to reverse-engineer your decisions. A one-page status note costs ten minutes and prevents a call six months later.",
        "Keep a copy of the correspondence and the cancellation statement. If the client later disputes the amount or claims work was not delivered, the record is the argument.",
      ],
    },
    {
      heading: "If the client disputes the cancellation charge",
      paragraphs: [
        "Respond with the clause and the evidence, not with the story. Quote the notice period, the payment clause and the dates. Attach the status updates that show what was in progress.",
        "Offer a payment plan if the amount is genuinely difficult for them and you want the relationship. A disputed invoice that is paid over three months is better than a correct invoice that is never paid.",
        "If the amount is small relative to your time, decide early whether to pursue it. The cost of a formal claim is often higher than the debt, and the decision should be commercial, not moral.",
        "For significant amounts, get advice in the relevant jurisdiction. This article describes general principles, not legal advice, and the enforcement route differs by country.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Can a client cancel a project after paying a deposit? Usually yes, but the deposit is normally non-refundable and any work completed beyond it is still payable. The contract should say what the deposit covers and what happens to it on cancellation.",
        "What is a kill fee? A payment due when a client ends a project without cause, intended to cover work done and capacity reserved. It is usually a fixed amount or a percentage of the remaining fee, and it should be defined in the contract.",
        "Do I have to hand over unfinished work if the project is cancelled? Only what the contract requires and what has been paid for. Agree the position in writing before handing anything over.",
        "Can I cancel a project because the client is difficult? Check the notice and termination clauses first. If the contract has no termination for convenience, you may need to rely on a breach or negotiate an exit.",
        "Should I refund a deposit if I cancel? It depends on the contract and the reason. If you cancel without cause, expect to return the unearned portion; if the client breached the agreement, the position may differ. Take advice for a significant sum.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Cancellation is a process, not a verdict. Put notice, payment and handover in the contract before the project starts, confirm the ending in writing on the day, issue a statement that shows the calculation, and deliver what has been paid for. The relationship may end, but the argument does not have to.",
      ],
    },
  ],
};
