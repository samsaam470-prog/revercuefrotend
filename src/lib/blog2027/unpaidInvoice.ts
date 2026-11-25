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
      ],
    },
    {
      heading: "Day one to three: assume an oversight",
      paragraphs: [
        "Hi Sam, the invoice for the 2,400 issued on the 4th was due yesterday. I am sure it is in a queue somewhere, but could you confirm it is with the right person? The invoice is attached again in case it helps. Notice what this message does not do: it does not accuse, it does not explain your own financial position, and it asks one answerable question. It also gives the client a face-saving explanation, which is often what makes a reply easy.",
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
      heading: "Day twenty-one to thirty: the final notice",
      paragraphs: [
        "The invoice for 2,400 is now 24 days overdue and two reminders have had no response. I need payment by Friday the 28th. If that is not possible, tell me today what is happening and I will work with a dated plan. If I do not hear by Friday I will pass this to a collections process and pause all work on the account. Short, specific, dated, and true: only send it if you will do what it says.",
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
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should I wait before chasing? One working day after the due date for a first quiet reminder. The longer you wait, the more the silence looks accepted.",
        "Should I keep working while an invoice is unpaid? Only if the terms say so, and only for a client with a clean history. Working while unpaid turns a payment problem into a leverage problem.",
        "Is a payment plan a good idea? Yes, if it is dated and written down. A plan with dates is a decision; we will sort it soon is not.",
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
