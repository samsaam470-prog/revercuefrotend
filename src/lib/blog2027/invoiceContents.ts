import type { BlogPost } from "../blog";

// SEO cluster — search demand. Invoice contents is a template-seeking query that
// existing articles on late payment and invoices do not answer.

export const INVOICE_CONTENTS_POST: BlogPost = {
  slug: "what-to-include-on-a-freelance-invoice",
  title: "What to include on a freelance invoice (and what to leave off)",
  excerpt:
    "The fields that make a freelance invoice payable, the extras that prevent a query, and the lines that start an argument instead of ending one — with a numbering scheme and a payment-terms checklist.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "How to set freelance payment terms", to: "/blog/freelance-payment-terms" },
    { label: "When a client does not pay an invoice", to: "/blog/when-a-client-does-not-pay-an-invoice" },
    { label: "Invoices in Revercue", to: "/features/invoices" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "An invoice is not a bill in the way a restaurant bill is. It is a request for payment that has to survive being forwarded to someone in finance who has never heard of you, matched against a purchase order, and approved by a person who was not in the meeting. Every missing field is a reason for that chain to stop.",
        "Most freelance invoice problems are not payment problems. They are matching problems: the client cannot match your invoice to a supplier record, a project code or a signed contract, so it sits in a queue until someone replies. The fields below are the ones that prevent that.",
      ],
    },
    {
      heading: "The core fields every invoice needs",
      paragraphs: [
        "Who is billing: your legal or trading name, address and contact details, plus any company or tax registration number your jurisdiction requires. The name should match the one on your contract and bank account; a mismatch is the single most common reason a payment run is delayed.",
        "Who is being billed: the client's legal entity, not the first name of your contact. If you invoice a subsidiary with the parent company's name, the invoice may be rejected or paid late. Include the billing address and any supplier or vendor number they have given you.",
        "A unique invoice number, the invoice date and the date payment is due. The due date should be calculated from terms you have already agreed, not invented on the invoice. If the contract says 14 days, the invoice says 14 days and shows the resulting date.",
        "A description that identifies the work. One line per deliverable or milestone, with quantities where it makes sense. \\\"Consulting services\\\" is harder to approve than \\\"Brand identity — logo, type system, brand sheet (project 2026-014)\\\".",
        "The amount, the currency, any tax that applies and the total. If tax does not apply, say so explicitly where the client expects a tax line, rather than leaving a blank that finance will query.",
        "Payment instructions: bank details, an account name, a reference to quote, or a payment link. Include the exact reference format, because a payment without a reference is a payment someone has to trace by hand.",
      ],
    },
    {
      heading: "The extras that stop a query",
      paragraphs: [
        "A purchase order number or project code, if the client uses one. Many finance systems will not release a payment without it. Ask for the number before you start work, not when the invoice is rejected.",
        "A reference to the contract or proposal the invoice relates to. It connects the money to an approved document and answers the question \\\"what is this for?\\\" without an email chain.",
        "The payment terms in words, not just a due date: \\\"Payment due within 14 days of the invoice date.\\\" If late payment interest applies, state the rate and when it starts, but only if the contract or statute supports it.",
        "A short note on what happens next, such as confirmation of receipt or a reminder date. It reads as administrative, not aggressive, and it gives the client a reason to acknowledge the invoice.",
        "If you are paid through a platform or escrow, say so and include the reference. If several people need a copy, name them in the invoice email rather than hoping it is forwarded.",
      ],
    },
    {
      heading: "What to leave off",
      paragraphs: [
        "Apologies, explanations and emotional context. \\\"Sorry to chase, I know you're busy\\\" belongs in a follow-up email if it belongs anywhere; on the invoice it signals that the payment is optional.",
        "Discounts you did not agree. If you offered a reduction to win the work, show it as a line so the client can see what they are being charged and why. If you did not, do not add one to seem generous on paper.",
        "Scope arguments. An invoice is not the place to relitigate a change request. If there is a dispute about what is billable, resolve it in writing first, then invoice the agreed amount. An invoice with a paragraph of justification invites a paragraph of objection.",
        "Personal bank details you would not want forwarded. Use a business account and a payment reference; invoices travel further than you expect.",
      ],
    },
    {
      heading: "Tax, VAT and jurisdiction",
      paragraphs: [
        "Tax rules differ by country and by the status of both parties. In some jurisdictions an invoice must show a tax registration number and a tax rate; in others, a reverse-charge note is required for cross-border services; in others, no tax line is needed at all.",
        "This is general information, not tax or legal advice. If you are unsure whether to charge tax, at what rate, or what wording a cross-border invoice needs, ask an accountant in your jurisdiction. Getting this wrong is expensive in a way that a missing project code is not.",
        "For international clients, state the currency and who bears transfer fees. A payment that arrives 20 short because of intermediary bank charges is a conversation you do not want to have on every invoice.",
      ],
    },
    {
      heading: "A numbering scheme that survives an audit",
      paragraphs: [
        "Use one sequence, not one per client. A simple format such as 2026-014 (year, then a running number) is easy to read, sort and search. If you issue credit notes, give them their own prefix and reference the original invoice.",
        "Never reuse a number, even if an invoice was cancelled. Void it, keep the record, and issue a replacement with the next number. Reuse is how two documents end up claiming the same identity in a tax return.",
        "Keep the sequence gapless where your jurisdiction expects it. If you are not sure whether gaps matter, treat them as if they do; it costs nothing to be consistent.",
      ],
    },
    {
      heading: "When to send it",
      paragraphs: [
        "Send the invoice as soon as the trigger in the contract happens: on delivery, on acceptance, on a milestone date. A client who receives an invoice the same day as the deliverable has the context in front of them; one who receives it three weeks later has to reconstruct the project.",
        "If you invoice on a schedule, say so in advance and stick to it. Predictable invoicing is easier for a client to budget for, and it makes a missed payment obvious rather than ambiguous.",
        "Follow up on the due date, not before and not much after. A short, factual reminder that references the invoice number and the agreed terms is more effective than a long one that explains why you need the money.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "What must a freelance invoice include? At minimum: your details, the client's legal entity, a unique invoice number, the invoice and due dates, a description of the work, the amount, any tax and the payment instructions. Many jurisdictions also require tax registration details.",
        "Do I need a purchase order number on my invoice? Only if the client's finance process requires one. Ask before you start work; if they cannot provide one, get written confirmation that the invoice will be paid without it.",
        "Can I charge late payment interest? Only if your contract allows it or a statute provides for it. State the rate and the start date on the invoice, and check the rule in the relevant jurisdiction.",
        "Should I put my bank details on the invoice? Yes, if that is how you are paid, along with an exact payment reference. For international clients, state the currency and who pays transfer fees.",
        "What if the client disputes an invoice? Resolve the dispute in writing before issuing a replacement. Do not simply cancel and reissue a lower invoice without documenting why, because that weakens your position on the rest of the fee.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A good invoice answers four questions without a follow-up: who is billing, who is paying, what for, and by when. Add the reference fields that let a finance system match it, remove the commentary that invites a reply, and keep the numbering boring. The invoice is the last administrative step in a project; it should be the easiest one.",
      ],
    },
  ],
};
