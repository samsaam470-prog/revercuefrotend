import type { BlogPost } from "../blog";

// AEO cluster — cross-border client work. Jurisdiction and tax caveats are
// explicit; the article is about the practical clauses.

export const INTERNATIONAL_CLIENTS_POST: BlogPost = {
  slug: "freelance-contract-for-international-clients",
  title: "What should a freelance contract include for international clients?",
  excerpt:
    "Currency, tax, governing law, payment routes, time zones and data — the clauses that matter when the client is in another country, and the ones people remember too late.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "How to set freelance payment terms", to: "/blog/freelance-payment-terms" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A freelance contract for an international client needs the same things as a domestic one — scope, fee, payment, IP, termination — plus a short list of clauses that only matter across a border: which currency, which law, which tax treatment, which payment route and which data rules.",
        "The single most useful addition is not a clause but a sentence: name the currency, the payment route and who bears the transfer fees. Most cross-border disputes between freelancers and clients are not about the work; they are about a payment that arrived short, late or in the wrong currency.",
        "This is general information, not legal or tax advice. Cross-border rules on tax, withholding, data and enforceability vary by country and by the parties' status. For a significant engagement, have the agreement reviewed in the relevant jurisdictions.",
      ],
    },
    {
      heading: "What should a freelance contract include for international clients? The short answer",
      paragraphs: [
        "Include everything a domestic contract needs, then add: the currency and who pays conversion or transfer fees; the tax treatment and who is responsible for withholding; the governing law and dispute forum; the payment method and the details needed to receive money; the time zone and communication expectations; and the data-protection position if personal data crosses a border.",
        "If those six items are not in the contract, they will be discovered one at a time, usually through a failed payment or a tax query.",
      ],
    },
    {
      heading: "Currency and payment mechanics",
      paragraphs: [
        "State the invoicing currency and the currency of payment. If they differ, state the exchange-rate basis and the date it is applied. \\\"Invoiced in GBP, payable in GBP\\\" removes the argument; \\\"payable in local currency at the prevailing rate\\\" invites one.",
        "Say who pays the intermediary and transfer fees. International transfers can lose a meaningful percentage to correspondent banks and platform fees. \\\"All bank charges are borne by the client\\\" is a short clause with a large effect on a small invoice.",
        "Name the payment route: bank transfer, card, a payment platform, or a link. Include the details needed to pay you, and the reference format that lets you match the payment. If the client's finance system cannot pay by your preferred route, find that out before the invoice, not after.",
        "Set the payment terms in days and state the date. A 30-day term across time zones and approval chains easily becomes 45. If you need faster cash flow, ask for a deposit and milestone payments rather than a shorter term the client's process cannot meet.",
      ],
    },
    {
      heading: "Tax and withholding",
      paragraphs: [
        "Cross-border payments can be subject to withholding tax in the client's country. If the client withholds, you receive less than the invoice total unless the contract says the fee is grossed up or the treaty position is applied.",
        "The contract should say who is responsible for withholding, what documentation is required, and whether the fee is gross or net of any withholding. If a tax treaty applies, you may need to provide a residence certificate or a tax form before payment.",
        "Ask an accountant in your jurisdiction how the income should be treated and what evidence you need to keep. Do not rely on a clause to fix a tax position; the clause records the intention, the law decides the outcome.",
        "If you are registered for a consumption tax such as VAT or GST, the place-of-supply rules for services may mean you do not charge it, or that the client accounts for it. The invoice wording matters. Get the specific wording from your accountant.",
      ],
    },
    {
      heading: "Governing law and disputes",
      paragraphs: [
        "Choose the governing law deliberately. Your own jurisdiction is usually the cheapest to enforce in, but a client may insist on theirs. A neutral jurisdiction is a third option, though it can cost more to pursue than the debt is worth.",
        "Name the dispute forum and the steps before proceedings: negotiation, then mediation or arbitration, then court. For small cross-border debts, enforcement is often impractical, which is why deposits and milestone payments matter more than a strong clause.",
        "If you accept the client's governing law, price the risk. A contract governed by a distant jurisdiction is harder to enforce, and that should be reflected in the payment schedule rather than absorbed silently.",
      ],
    },
    {
      heading: "Time zones, communication and delivery",
      paragraphs: [
        "State the working hours and the expected response time. A client who expects an answer within their own working day, eight hours ahead of you, will be disappointed by a contract that does not say otherwise.",
        "Agree where documents live and who can access them. Cross-border teams change quickly; a shared link is more reliable than an attachment, and a record of versions is more reliable than either.",
        "Put review and approval deadlines in the schedule. A feedback window that assumes a single time zone will slip when three approvers are in three countries.",
      ],
    },
    {
      heading: "Data protection",
      paragraphs: [
        "If the work involves personal data — customer lists, employee records, user research — the transfer may engage data-protection rules in one or both jurisdictions. The contract should identify the roles (controller and processor, or their local equivalents), the purpose, the security measures and the sub-processors.",
        "Do not copy a data-processing clause from another contract without checking it fits the jurisdictions involved. This is a regulated area, and the penalties are not proportionate to the size of a freelance project.",
        "If you use tools that store data outside the client's country, say so. A client with a data-residency requirement will ask eventually, and it is better to answer before the work starts.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Which law should govern a freelance contract with an international client? Usually one of the parties' jurisdictions, chosen deliberately. Your own is cheaper to enforce in; the client's may be non-negotiable. Take advice for a significant engagement.",
        "Who pays international transfer fees? Agree it in the contract. The safest wording is that the client bears all bank and platform charges, so the amount received matches the invoice.",
        "Do I charge VAT to an international client? It depends on your jurisdiction, the client's status and the place-of-supply rules. Ask an accountant for the correct treatment and invoice wording.",
        "What about withholding tax? The client's country may withhold tax from the payment. The contract should say who bears it and what documentation is needed. A tax treaty may reduce the rate.",
        "Can I enforce a freelance contract against an overseas client? It is possible but often impractical for small sums. Deposits, milestone payments and a payment route you control are more effective protections than a distant court.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Cross-border work fails on the small mechanics before it fails on the law. Name the currency, the fees, the route, the tax position, the law and the data rules. Then price the payment schedule so that you are never carrying a large receivable in a jurisdiction you cannot practically enforce in.",
      ],
    },
  ],
};
