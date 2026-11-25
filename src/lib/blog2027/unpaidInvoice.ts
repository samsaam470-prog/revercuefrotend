import type { BlogPost } from "../blog";

// Cluster B, article three: the escalation ladder. Deliberately procedural,
// with a standing note that the legal detail depends on jurisdiction.

export const UNPAID_INVOICE_POST: BlogPost = {
  slug: "when-a-client-does-not-pay-an-invoice",
  title: "What to do when a client does not pay an invoice",
  excerpt:
    "A four-week sequence that starts with a fact check and ends with a decision, plus the wording for each step and the point at which chasing costs more than the invoice.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Invoices in Revercue", to: "/features/invoices" },
    { label: "Freelance payment terms", to: "/blog/freelance-payment-terms" },
    { label: "How much deposit to ask for", to: "/blog/how-much-deposit-should-a-freelancer-ask-for" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "An invoice that is a week late is usually an administration problem. An invoice that is a month late is usually a cash-flow problem, and it may be the client's rather than yours. An invoice that is three months late is a decision, and the decision is yours: how much more time, money and goodwill you are willing to spend on it.",
        "The mistake most freelancers make is to treat all three as the same problem and respond with the same message, escalating emotionally while staying static procedurally. What follows is a sequence with dates, so each step is a decision rather than a reaction.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Check the invoice is correct and delivered, then send a short reminder at day one, a firmer one at day seven, a final notice with a deadline at day twenty-one, and a decision at day thirty. Keep every message in writing, keep the tone flat, and stop work if the terms allow it. Most invoices are paid somewhere in that sequence, and the ones that are not need a different tool rather than a stronger email.",
      ],
    },
    {
      heading: "Day one: check before you chase",
      paragraphs: [
        "Confirm the invoice arrived, the amount and reference match the purchase order, and the bank details are correct. A surprising share of late payments are invoices sent to the wrong address, raised against the wrong entity, or missing a reference the finance team requires. If your invoice is wrong, the delay is yours, and the fastest fix is a corrected invoice with a one-line apology rather than a complaint about being ignored.",
        "Check the address in the reply, too. Invoices forwarded to an accounts address that nobody monitors look exactly like a client who is avoiding you, and the difference matters because one needs a re-send and the other needs a decision.",
      ],
    },
    {
      heading: "Day one to three: assume an oversight",
      paragraphs: [
        "Hi Sam, the invoice for the 2,400 issued on the 4th was due yesterday. I am sure it is in a queue somewhere, but could you confirm it is with the right person? The invoice is attached again in case it helps. Notice what this message does not do: it does not accuse, it does not explain your own financial position, and it asks one answerable question. It also gives the client a face-saving explanation, which is often what makes a reply easy.",
        "Do not open with an apology, and do not explain that you hate chasing. Both make the message about your discomfort, and the client's reply then becomes reassurance rather than payment. The best reminders read as if a system sent them, with your name on the end.",
      ],
    },
    {
      heading: "Day seven to ten: state the consequence",
      paragraphs: [
        "The invoice is now nine days overdue. Under our terms work pauses on unpaid invoices, so I have held the next milestone until it clears. If there is a problem with the invoice, tell me what needs changing and I will reissue it today. That is the whole message. Naming the consequence is not aggression; it is the clause you both agreed to, applied once, early, while the relationship is still comfortable.",
        "If the client responds with a date, accept it and put it in writing: understood, I will check again on the 19th. A promised date turns an open loop into a scheduled one, and it makes the next message a reminder rather than an escalation.",
      ],
    },
    {
      heading: "If the client disputes the work",
      paragraphs: [
        "A dispute is a different problem from a delay, and mixing them costs you the moral position. Ask for the specific item in dispute, in writing, rather than the general complaint. You will usually find it is one deliverable out of several, and the rest of the invoice is not in question.",
        "Then separate the two: the undisputed amount is due now, and the disputed item will be resolved by a stated date. Offering that split is not weakness; it is the fastest route to most of the money, and it keeps the argument narrow enough to settle.",
        "If the dispute is really about scope, go back to the change log and the approvals. If there is no record, settle it once, at a discount if necessary, and change your process so the next client's approvals are written down.",
      ],
    },
    {
      heading: "If their client has not paid them",
      paragraphs: [
        "Some late payments are passed down the chain: the agency has not been paid by the end client, so your invoice waits. That is a cash-flow problem in their business, and it is not a term you agreed to unless your contract says pay-when-paid, which you should avoid for exactly this reason.",
        "The reply is sympathetic and firm: I understand the end client has not paid, and that is a difficult position. Our terms are 14 days from invoice, so I need a date for payment or a plan. Offering a dated instalment plan is usually better than waiting for their client to pay, because it gives you something enforceable and gives them a way to keep the relationship.",
      ],
    },
    {
      heading: "Day twenty-one to thirty: the final notice",
      paragraphs: [
        "The invoice for 2,400 is now 24 days overdue and two reminders have had no response. I need payment by Friday the 28th. If that is not possible, tell me today what is happening and I will work with a dated plan. If I do not hear by Friday I will pass this to a collections process and pause all work on the account. Short, specific, dated, and true: only send it if you will do what it says.",
        "Send it to the person who can approve payment, copy the person who hired you, and keep the same subject line so the history is in one place. A final notice that starts a new thread is easy to treat as a new complaint.",
      ],
    },
    {
      heading: "Day thirty to sixty: escalation options",
      paragraphs: [
        "For a small debt, a formal letter before action and a county court claim are often enough on their own, and the process is designed to be used without a solicitor. For larger amounts, a solicitor's letter or a debt collection agency costs money and takes a share, but it converts your problem into someone else's. Statutory interest on late commercial payments exists in many jurisdictions and can be claimed on top, though the rules differ, so this is general information rather than legal advice.",
        "Before you escalate, weigh the invoice against the cost: the fee, the hours, and the relationship. Sometimes the right answer is to write it off deliberately, with a note in your records, rather than carry it for a year. A written-off invoice you decided to abandon is a business decision; one you keep chasing out of principle is a grudge with a spreadsheet.",
      ],
    },
    {
      heading: "The record you need if it goes further",
      paragraphs: [
        "Keep the signed agreement or accepted proposal, the invoice with its date and delivery, and every message in the sequence, in one folder. If there is no written agreement, keep the proposal, the emails accepting it, and any evidence that the work was delivered and used.",
        "Dates matter more than tone at this stage. A file that shows the invoice was issued on the 4th, due on the 18th, reminded on the 19th and 26th, and paused on the 2nd is a file that any process can act on. A folder of screenshots and indignation is not.",
      ],
    },
    {
      heading: "Protecting the relationship, or deciding not to",
      paragraphs: [
        "If you want the client back, keep the messages about the invoice and never about their character, and give them a way to save face. If the non-payment is part of a pattern, stop pretending the relationship is worth protecting. The useful test is whether they communicated: a client who tells you the budget moved and offers a date is worth keeping, even if the payment is late. A client who ignores three messages is telling you what the next project would be like.",
      ],
    },
    {
      heading: "Preventing the next one",
      paragraphs: [
        "Deposit before work, short terms, a due date printed as a date, automatic reminders, and a pause clause. None of that guarantees payment, but it removes the excuses and it makes the sequence above a process you already agreed to rather than a conversation you have to start. Keep a record of which clients pay late and price the next project accordingly.",
      ],
    },
    {
      heading: "The phone call, scripted",
      paragraphs: [
        "When email goes unanswered, one call is worth several messages, because the silence is usually about avoidance rather than information. Call the person who hired you, not the accounts inbox, and open with the project rather than the money: I am calling about the rebuild, and I wanted to check the invoice has reached the right person.",
        "Then stop and let them talk. You will hear one of three things: it is in a queue, there is a problem, or they did not know. Each has a different reply. For a queue, ask for the payment run date. For a problem, ask what needs fixing. For did not know, ask who can approve it and whether they will forward it today.",
        "End by restating the date in one sentence and sending it in writing within the hour. The call creates the clarity; the email creates the record. Neither replaces the other, and doing both in the same afternoon is usually the point at which a stuck invoice moves.",
      ],
    },
    {
      heading: "When to involve a professional",
      paragraphs: [
        "Involve a solicitor or a collections service when the amount is large relative to your month, when the client has stopped responding entirely, or when the facts are disputed rather than the timing. Those are the three situations where a letter carries more weight than another email from you.",
        "Do not involve one out of frustration at a small amount. The fee and your time will usually exceed the invoice, and the letter ends the relationship. Decide on the numbers, write the reason in your notes, and move on to work that pays.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should I wait before chasing? One working day after the due date for a first quiet reminder. The longer you wait, the more the silence looks accepted.",
        "Should I keep working while an invoice is unpaid? Only if the terms say so, and only for a client with a clean history. Working while unpaid turns a payment problem into a leverage problem.",
        "Is a payment plan a good idea? Yes, if it is dated and written down. A plan with dates is a decision; we will sort it soon is not.",
        "Should I call instead of emailing? One call is worth three emails when you cannot tell whether the message is being read. Follow it with an email restating what was agreed, because the call is for clarity and the email is the record.",
        "When should I stop chasing? When the cost of the next step exceeds the invoice, or when the client has stopped responding entirely. Decide deliberately, note the reason, and move the time into finding the next client.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Chase on a schedule, not on a feeling. Check the invoice, remind once quietly, state the consequence early, set a final date, then choose between escalation and a deliberate write-off. The sequence protects your cash and your attention, which are the two things a late payer is really costing you.",
      ],
    },
  ],
};
