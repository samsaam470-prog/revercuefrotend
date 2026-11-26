import type { BlogPost } from "../blog";

// GEO cluster — reference. Definitions written to survive being quoted alone.

export const CONTRACT_GLOSSARY_POST: BlogPost = {
  slug: "freelance-contract-glossary",
  title: "Freelance contract glossary: 30 terms in plain English",
  excerpt:
    "From assignment and acceptance criteria to kill fee and survival, the terms that decide what a freelance contract actually means — each defined in one or two sentences you can use in a conversation.",
  date: "2026-11-26",
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
        "Contracts use ordinary words in specific ways. \"Assignment\" is not a task; \"consideration\" is not politeness; \"survival\" is not about staying alive. This glossary defines the terms that appear most often in freelance agreements, in the order you are likely to meet them.",
        "It is general information, not legal advice, and definitions vary by jurisdiction. Use it to understand a clause well enough to ask a better question, not as a substitute for advice on a significant agreement.",
      ],
    },
    {
      heading: "Documents and parties",
      paragraphs: [
        "Proposal: a sales document that recommends an approach and a price. It can become a contract if accepted with the necessary terms, but it is written to persuade rather than to govern.",
        "Statement of work (SOW): the delivery definition attached to a contract. It lists deliverables, acceptance criteria, exclusions, assumptions, timing and the change process.",
        "Master services agreement (MSA): the standing terms between two parties, intended to cover multiple projects. Individual SOWs sit underneath it and describe the work for each engagement.",
        "Letter of engagement: a short agreement, often one or two pages, used for smaller or repeat engagements. It usually incorporates the proposal and the standard terms by reference.",
        "Non-disclosure agreement (NDA): a contract that restricts one or both parties from sharing specified confidential information. It should define what is confidential, the purpose, the duration and the exclusions.",
        "Memorandum of understanding (MOU): a document recording an intention to work together. It is often non-binding, but it can create obligations if it contains firm commitments, so read the wording rather than the title.",
        "Purchase order (PO): the client's internal authorisation to buy. It is not usually a contract on its own; it references one and sets a budget or approval number.",
        "Change order: a written record of a change to the scope, price or timeline after the agreement is signed. It should be approved by both parties before the changed work begins.",
      ],
    },
    {
      heading: "Money",
      paragraphs: [
        "Fixed fee: a price agreed for a defined scope, regardless of the hours taken. It rewards efficiency and puts the risk of overrun on the supplier unless the scope changes.",
        "Time and materials (T&M): billing for the time actually spent, usually at an hourly or daily rate, sometimes with a cap. It suits uncertain scope and puts the risk of overrun on the client.",
        "Retainer: a recurring fee for ongoing capacity, outputs or availability. It is not simply a project fee divided into months; it should define what the fee buys and what happens to unused time.",
        "Deposit: an advance payment, usually a percentage of the fee, paid before work starts. It is not automatically refundable; the contract should say what happens if either side cancels.",
        "Milestone payment: a payment triggered by completing a defined stage or deliverable, rather than by a calendar date. It links cash flow to progress.",
        "Net 30: payment due 30 days after the invoice date. Net 14 and net 60 work the same way. The term is a convention, not a law, unless a statute or the contract says otherwise.",
        "Late payment interest: a charge applied when an invoice is paid after its due date. It must be agreed in the contract or allowed by statute; the rate and the calculation should be stated.",
        "Kill fee: a payment due if the client cancels the project before completion, intended to cover work done and lost capacity. It is usually a fixed amount or a percentage of the remaining fee.",
        "Expenses: costs incurred on the client's behalf, such as stock images, printing or travel. The contract should say which are included in the fee, which are rechargeable and whether approval is required.",
      ],
    },
    {
      heading: "Scope and delivery",
      paragraphs: [
        "Deliverable: a specific thing you will hand over, with a format and a quantity. \"Five-page website\" is a deliverable; \"web presence\" is not.",
        "Acceptance criteria: the test the client applies to decide whether a deliverable is done. Good criteria are observable: pages live, forms submitting, copy approved in writing.",
        "Assumption: a condition on which the price or timeline depends, such as one approver or content supplied by the client. If an assumption proves false, the price or date may need to change.",
        "Dependency: something the client must provide or decide before you can proceed, such as brand assets, access or approval. A missed dependency usually moves the timeline.",
        "Exclusion: work that is explicitly not included. Exclusions are as important as inclusions because they define the boundary when a client asks for something adjacent.",
        "Revision round: one consolidated set of feedback from the named approver, followed by one revised version. Without a definition, \"two rounds\" can mean anything.",
        "Scope creep: work that adds a deliverable, a stakeholder, a channel or a revision beyond the agreed scope. It is different from a refinement within the agreed direction.",
      ],
    },
    {
      heading: "Rights",
      paragraphs: [
        "Intellectual property (IP): the legal rights in creations such as text, images, software, designs and brands. Copyright is one type of IP; trademarks, patents and trade secrets are others.",
        "Copyright: the right to control copying, adaptation, distribution and display of a work. It generally belongs to the creator unless assigned, but the default varies by jurisdiction and employment status.",
        "Assignment: a transfer of ownership of rights. An assignment moves the copyright to the client; a licence does not.",
        "Licence: permission to use the work on stated terms, while ownership stays with the creator. A licence can be exclusive or non-exclusive, limited by territory, duration and purpose.",
        "Moral rights: rights of attribution and integrity that exist in some jurisdictions, allowing creators to be identified and to object to derogatory treatment. They may need to be waived explicitly.",
        "Work made for hire: a US doctrine under which certain commissioned works are treated as owned by the commissioning party from creation. It applies to specific categories and usually requires a written agreement; do not assume it covers every freelance job.",
        "Portfolio rights: the right to display the work publicly as an example of your services. It is separate from copyright ownership and should be stated explicitly, especially where confidentiality applies.",
      ],
    },
    {
      heading: "Risk and ending",
      paragraphs: [
        "Warranty: a promise about the work, such as that it is original or delivered with reasonable skill and care. A warranty about a business outcome is a different and much broader promise.",
        "Indemnity: a promise to cover the other party's losses arising from a specified event, such as an IP claim. Read who indemnifies whom, for what, and whether the obligation is capped.",
        "Limitation of liability: a clause that caps or excludes certain losses. A cap tied to fees paid is common; unlimited liability for any breach is unusual for a small supplier.",
        "Confidentiality: the obligation not to disclose specified information. It should define the information, the permitted purpose, the duration and the standard exclusions.",
        "Termination for convenience: ending the agreement without a breach, usually on notice. It should say what notice is required and what is payable for work done.",
        "Termination for cause: ending the agreement because the other party breached it. The contract usually requires notice and an opportunity to remedy the breach.",
        "Force majeure: a clause excusing performance when an unforeseen event outside the parties' control prevents it. It should define the events and the consequence, such as suspension or termination.",
        "Governing law: the jurisdiction whose law interprets the contract. It is not always the same as the jurisdiction where the work is done.",
        "Dispute resolution: the process for resolving a disagreement, such as negotiation, mediation, arbitration or court. It should name the forum and any steps required before proceedings.",
        "Survival: the clauses that continue after the agreement ends, typically confidentiality, IP, payment obligations and liability. Without a survival clause, the whole agreement may end at termination.",
      ],
    },
    {
      heading: "How to use this glossary",
      paragraphs: [
        "When a clause uses a term you cannot explain in one sentence, stop and look it up before signing. If the other side cannot explain it either, that is a reason to ask for plainer wording, not a reason to assume it is standard.",
        "Pay particular attention to the terms that allocate risk: assignment, indemnity, limitation of liability, termination and survival. Those are the clauses that decide what happens when the project does not go to plan.",
        "Definitions are not uniform across jurisdictions. A term that means one thing in a UK contract may have a different scope in a US or EU agreement. For significant work, have the document reviewed by a lawyer in the relevant jurisdiction.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "What is the difference between a licence and an assignment? An assignment transfers ownership of the rights; a licence grants permission to use them while ownership stays with the creator.",
        "What does net 30 mean? Payment is due 30 days after the invoice date. It is a payment term, not a guarantee of payment.",
        "What is a kill fee? A payment due when a client cancels a project before completion, intended to cover work done and capacity reserved. It should be defined in the contract.",
        "What does survival mean in a contract? It identifies which clauses continue after the agreement ends, such as confidentiality, IP and liability.",
        "Is a memorandum of understanding legally binding? It depends on its wording. An MOU can be non-binding, but firm commitments inside it may create obligations. Read the document, not the label.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A contract is easier to read when the vocabulary is clear. Learn the ten terms that allocate money and risk — assignment, licence, indemnity, limitation of liability, termination, survival, acceptance, dependency, exclusion and change order — and most agreements become legible.",
      ],
    },
  ],
};
