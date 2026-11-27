import type { BlogPost } from "../blog";

// AEO cluster — purchase orders. Answers a finance-process question that sits
// between the contract and the invoice.

export const PURCHASE_ORDER_POST: BlogPost = {
  slug: "do-you-need-a-purchase-order-to-invoice",
  title: "Do you need a purchase order to invoice a client?",
  excerpt:
    "Usually not legally, but often practically: if the client's finance system needs a PO number, a missing one turns a valid invoice into a parked one. How to get the number before the work starts.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "What to include on a freelance invoice", to: "/blog/what-to-include-on-a-freelance-invoice" },
    { label: "How to set freelance payment terms", to: "/blog/freelance-payment-terms" },
    { label: "Invoices in Revercue", to: "/features/invoices" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Legally, a purchase order is not usually required to invoice. Practically, it often is: many finance systems will not release a payment without a PO number, and an invoice that cannot be matched sits in a queue until someone intervenes.",
        "So the useful answer is not \\\"yes\\\" or \\\"no\\\" but \\\"find out before you start\\\". Ask the client whether their process needs a PO, who raises it, what it covers and how long it takes. That conversation takes two minutes and prevents the most common freelance payment delay.",
      ],
    },
    {
      heading: "Do you need a purchase order to invoice? The short answer",
      paragraphs: [
        "Not as a legal requirement in most jurisdictions. A valid invoice needs the information we describe elsewhere — parties, number, dates, description, amount, tax and payment details — not a PO.",
        "But if the client's internal controls require one, the PO becomes a practical condition of payment. Treat it as part of the engagement: get the number, put it on the invoice, and keep it with the contract.",
      ],
    },
    {
      heading: "What a purchase order actually is",
      paragraphs: [
        "A PO is the client's internal authorisation to buy, issued to a supplier before or at the point of purchase. It usually names the supplier, the scope or description, the amount, the cost centre and an approval reference.",
        "It is not normally a contract on its own. It references an agreement or sets a budget; the terms come from the contract, the proposal or the client's standard supplier terms.",
        "A PO can be a ceiling. If the approved amount is lower than your fee, the finance system may reject the invoice even though the work was agreed. Check the amount against the contract before you start.",
      ],
    },
    {
      heading: "When the client says they need a PO",
      paragraphs: [
        "Ask for the number and the approved amount before the first day of work. If the PO is raised after the work, you are delivering on the client's internal process rather than your own terms.",
        "Find out what the PO must reference: the supplier legal name, a statement of work, a quote number, a cost centre, a tax ID. A mismatch between the PO and the invoice is a common reason for rejection.",
        "Ask what happens if the scope changes. Some clients issue a revised PO; others require a change order first. Knowing the route prevents a stall halfway through a project.",
        "Put the PO number on the invoice and in the email. If the client's portal requires it as a field, enter it there rather than in a note the finance team will not read.",
      ],
    },
    {
      heading: "When the client does not use POs",
      paragraphs: [
        "Get that in writing, even if it is one line: \\\"No purchase order is required for this engagement; invoices should be sent to accounts@…\\\" It protects you if a new finance person later asks for a number that never existed.",
        "Ask for the supplier onboarding requirements instead. Many organisations have a vendor form, a bank-details verification, an insurance certificate or a tax form. Those are the practical equivalent of a PO and can delay payment just as effectively.",
        "Confirm who approves the invoice and what they need to see. A named approver and a reference are more useful than a general accounts address.",
      ],
    },
    {
      heading: "If the PO arrives late or never arrives",
      paragraphs: [
        "If the work is done and the PO is missing, send the invoice anyway with a note referencing the agreement and the approval. Then chase the PO as an administrative task, in parallel, not as a precondition you invented.",
        "Do not let a missing PO become an unpaid invoice you are embarrassed to chase. The client's internal process is the client's problem to solve; your invoice is still due under the contract.",
        "If the client refuses to pay without a PO that they never raised, escalate to your main contact rather than the finance team. The person who commissioned the work can authorise it or explain the delay.",
        "For repeat work, put the PO requirement in your onboarding checklist so it is resolved once per client rather than once per invoice.",
      ],
    },
    {
      heading: "A note on PO terms",
      paragraphs: [
        "Some POs carry the client's standard terms on the back, including payment terms, liability and IP clauses that conflict with your contract. Read them. A PO that silently replaces your 14-day terms with 60 days is a change to the deal.",
        "If there is a conflict, raise it before accepting the PO. \\\"Our agreement specifies 14-day payment terms; the PO says 60. Can we align them?\\\" is easier to resolve before the work than after the invoice.",
        "Keep the PO with the contract and the invoice. When a payment is queried, the three documents together answer almost every question.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is a purchase order required for a freelance invoice? Not legally in most jurisdictions, but it may be required by the client's finance process. Ask before the work starts.",
        "What if the client will not raise a PO? Ask for written confirmation that no PO is required and who approves invoices. Keep that with the contract.",
        "Can a client refuse to pay without a PO? They can delay payment internally, but the contractual obligation usually stands. Escalate to the person who commissioned the work.",
        "Should the PO number go on the invoice? Yes, if one exists. Put it in the reference field and in the invoice email so it can be matched.",
        "What if the PO amount is lower than the agreed fee? Raise it before the work starts. A PO below the fee can cause the invoice to be rejected or partly paid.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A PO is a process artefact, not a legal one — but a process artefact can stop a payment as effectively as a dispute. Ask about it at onboarding, get the number and the amount before you start, put it on the invoice, and keep it with the agreement. Two minutes at the start saves a month at the end.",
      ],
    },
  ],
};
