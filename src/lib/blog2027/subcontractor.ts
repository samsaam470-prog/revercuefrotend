import type { BlogPost } from "../blog";

// SEO cluster — subcontracting. Employment status and tax carry a clear caveat;
// the article is about the agreement and the flow-down of client terms.

export const SUBCONTRACTOR_POST: BlogPost = {
  slug: "hiring-a-subcontractor-as-a-freelancer",
  title: "Hiring a subcontractor as a freelancer: the agreement you actually need",
  excerpt:
    "Status, scope, flow-down clauses, intellectual property, payment and what happens when the subcontractor misses a deadline — the practical structure for bringing in help.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Who owns the work in a freelance contract?", to: "/blog/who-owns-the-work-in-a-freelance-contract" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The first time you bring in help, the temptation is to keep it informal: a message, a rate, a deadline. It works until something goes wrong, and then the informal arrangement is the problem. A subcontractor agreement is not bureaucracy; it is the document that lets you answer the client's question about who did the work without improvising.",
        "This article covers the structure of that agreement and the clauses that matter most. It is general information, not legal or tax advice: employment status, tax and registration rules differ by jurisdiction, and getting them wrong is expensive, so check the position where you and the subcontractor operate.",
      ],
    },
    {
      heading: "Employee or subcontractor?",
      paragraphs: [
        "A subcontractor is an independent business you engage to deliver part of the work. An employee is someone you direct and control in a way that creates employment obligations. The distinction is not decided by what you call the person; it is decided by the reality of the arrangement: control, integration, financial risk, exclusivity and who provides the tools.",
        "If you set their hours, require them to work only for you, provide their equipment and supervise the method rather than the outcome, you may have created employment regardless of the contract's label. That has tax, insurance and payroll consequences.",
        "This is the area to get advice on before the first engagement, not after. A local accountant or employment adviser can tell you how the test applies in your jurisdiction, and the answer may change how you structure the work.",
      ],
    },
    {
      heading: "What the subcontractor agreement should contain",
      paragraphs: [
        "The parties and status: both legal names, a statement that the subcontractor is an independent contractor responsible for their own tax and insurance, and confirmation that nothing in the agreement creates employment or partnership.",
        "The scope: the specific deliverables, the acceptance criteria, the deadline and the dependencies. Attach the relevant part of your client's statement of work rather than describing it again from memory; a mismatch between what you promised the client and what you asked for is the most common subcontracting failure.",
        "The fee and payment terms: a fixed fee or a rate, what triggers payment, what evidence is required (timesheet, milestone, delivered files) and when payment is due. If you are paid by the client on 30-day terms, say whether the subcontractor is paid on the same schedule or on delivery.",
        "Revisions and changes: how many rounds are included, and how a change is approved and priced. The subcontractor should not take instructions from the client directly; changes go through you, or the scope and the fee will drift.",
        "Termination: notice, what is payable on termination, and what is delivered. Mirror the client's cancellation terms where you can, so a client cancellation does not leave you paying for work you cannot bill.",
      ],
    },
    {
      heading: "Flow-down: passing the client's terms through",
      paragraphs: [
        "Your client contract probably contains obligations you cannot personally satisfy without the subcontractor: confidentiality, intellectual property assignment, data protection, insurance, anti-bribery, security or background checks. These need to flow down.",
        "Attach the relevant clauses or a schedule that reproduces them, and require the subcontractor to comply. \\\"The subcontractor agrees to the confidentiality and intellectual property terms in Schedule 2, as if it were the supplier under the head agreement\\\" is clearer than a general promise to keep things confidential.",
        "Check for clauses that prohibit subcontracting without consent. If the client contract requires approval, get it in writing before the subcontractor starts, and name the subcontractor if the clause requires it.",
        "If the client requires security or data-handling standards, the subcontractor needs the same standard, not a vague commitment. Ask for evidence before work starts, not after an incident.",
      ],
    },
    {
      heading: "Intellectual property and confidentiality",
      paragraphs: [
        "The client expects to own or license the final deliverable. That only works if the subcontractor has assigned or licensed their contribution to you first. The agreement should include a present assignment of copyright in the deliverables, or a licence broad enough for you to pass the rights on.",
        "Carve out the subcontractor's pre-existing tools and libraries, exactly as you would in your own client contract. You cannot assign what they did not create, and a clause that tries to is a clause that fails when tested.",
        "Confidentiality should cover the client's information and yours: briefs, data, pricing, and the existence of the project if the client requires discretion. Set a duration and the permitted purpose, and require the subcontractor to delete or return material at the end.",
        "If the subcontractor will access personal data, the agreement needs a data-processing clause and a defined instruction. This is a regulated area in many jurisdictions; use a template reviewed for your jurisdiction rather than a paragraph you wrote yourself.",
      ],
    },
    {
      heading: "Payment, markup and cash flow",
      paragraphs: [
        "Decide whether you are paying a share of the project fee or a separate rate. A share aligns incentives but exposes your margin; a separate rate is simpler and keeps the client price private.",
        "Do not promise the subcontractor payment on a date that depends on a client who has not paid you, unless they have agreed to it explicitly and the terms are fair. Many jurisdictions restrict \\\"pay when paid\\\" clauses, and a subcontractor who is not paid will pursue you, not the client.",
        "Hold a contingency for revisions. If you quote the client a fixed fee and pay the subcontractor by the hour, every extra round comes out of your margin. Cap the included hours or rounds in the agreement.",
        "Keep the subcontractor's invoice separate from the client's. Do not send the client a document that reveals your markup, and do not let the subcontractor invoice the client directly unless that is the agreed structure.",
      ],
    },
    {
      heading: "When the subcontractor misses a deadline",
      paragraphs: [
        "The agreement should say what happens: notice as soon as a delay is known, a revised date, and the consequences if the date is missed. A remedy that escalates — a reduction in fee, replacement, or termination — is more useful than a penalty clause you would never enforce.",
        "Tell the client early. A delay you disclose with a recovery plan is a scheduling problem; a delay they discover on the delivery date is a trust problem, and it is your name on the contract, not the subcontractor's.",
        "Keep the evidence: the brief, the agreed dates, the status updates. If you need to withhold part of a fee or end the engagement, the record is what makes the decision defensible.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Do I need a written agreement with a subcontractor? Yes, for any engagement beyond a trivial one. It should cover scope, fee, IP, confidentiality, termination and compliance with the client's terms.",
        "Can I subcontract without telling the client? Only if the client contract allows it. Many agreements require consent or notice, and some prohibit it. Check before you engage anyone.",
        "Who owns the work the subcontractor creates? It depends on the agreement. To pass rights to the client, you need an assignment or a broad licence from the subcontractor first.",
        "Should I pay a subcontractor before the client pays me? Not unless they have agreed to those terms in writing. A subcontractor is your supplier, and their payment should not depend on a third party's behaviour.",
        "Is a subcontractor the same as an employee? No. The label does not decide it; control, integration and financial risk do. Take advice in your jurisdiction before engaging someone regularly.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A subcontractor agreement is a copy of your client contract with the same obligations pointed at your supplier: the same scope discipline, the same IP assignment, the same confidentiality, the same termination logic. Get the status question answered locally, keep the client relationship in your hands, and put the flow-down clauses in writing before the work starts.",
      ],
    },
  ],
};
