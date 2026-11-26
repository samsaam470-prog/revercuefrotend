import type { BlogPost } from "../blog";

// AEO cluster — question-shaped demand. Copyright basics with a clear
// jurisdiction caveat; not legal advice.

export const WORK_OWNERSHIP_POST: BlogPost = {
  slug: "who-owns-the-work-in-a-freelance-contract",
  title: "Who owns the work in a freelance contract? Copyright, explained",
  excerpt:
    "The creator usually owns copyright unless it is assigned, and a licence is not an assignment. Here is what to check in a contract, what portfolio rights look like, and why the answer changes by jurisdiction.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Freelance contract glossary", to: "/blog/freelance-contract-glossary" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A client pays for a logo and assumes they own it. The designer assumes they have granted a licence to use it. Both are reasonable, both signed the same document, and neither can point to the sentence that settles it. Ownership is the clause most often read as obvious and most often wrong.",
      ],
    },
    {
      heading: "Who owns the work in a freelance contract? The short answer",
      paragraphs: [
        "In most common-law jurisdictions, copyright in a work belongs to the person who created it unless it is assigned in writing. For employees, the employer usually owns work created in the course of employment; for freelancers, the default is generally the freelancer.",
        "A contract can transfer ownership (assignment) or grant permission to use the work (licence). They are not the same. An assignment moves the rights; a licence leaves them with you and sets out what the client may do.",
        "This is general information, not legal advice. The default and the formalities differ by country, by the type of work and by the parties' status, so a contract for significant work should be checked in the relevant jurisdiction.",
      ],
    },
    {
      heading: "Assignment versus licence",
      paragraphs: [
        "An assignment transfers copyright, usually permanently and usually for the whole world unless the contract limits it. After assignment, the client can generally use, modify and license the work without asking you. If you want to reuse it, you need a licence back.",
        "A licence keeps ownership with you and gives the client specific permissions: to use the work on their website, in print, for a defined period, in a defined territory, for a defined purpose. An exclusive licence limits your ability to license the same work elsewhere; a non-exclusive licence does not.",
        "For most freelance design and content work, the client wants the practical ability to use the work, not the legal ownership of the copyright. A broad, perpetual, worldwide licence can meet that need while leaving you the right to show the work and reuse generic elements.",
      ],
    },
    {
      heading: "What the contract should say",
      paragraphs: [
        "Name the work being assigned or licensed: the deliverables, not \"all materials\". A clause that assigns \"all intellectual property\" can capture pre-existing tools, templates and code you did not intend to give away.",
        "Say when the transfer happens. Many contracts make assignment conditional on full payment, which is a sensible protection: the client gets the rights when they have paid for them. If the contract is silent, the timing may be unclear.",
        "Carve out pre-existing materials. If you use a framework, a font, a stock image or a component library, the client's ownership should not extend to it. List those materials and the licence terms, or use a schedule.",
        "Address moral rights where they exist. In some jurisdictions, creators have rights to be identified and to object to derogatory treatment, and those rights may need to be waived explicitly if the client wants unrestricted use.",
      ],
    },
    {
      heading: "Portfolio and publicity rights",
      paragraphs: [
        "Owning the copyright does not automatically give you the right to show the work publicly if the contract includes a confidentiality clause. Nor does a client's ownership prevent you from describing the project in general terms, unless the contract says so.",
        "A short portfolio clause is worth the space: \"The supplier may display the work in its portfolio and on its website unless the client requests otherwise in writing.\" If the client needs confidentiality, offer a delayed or anonymised version rather than losing the reference entirely.",
      ],
    },
    {
      heading: "Third-party assets and open-source code",
      paragraphs: [
        "Not everything in a deliverable is yours to assign. Stock photography, fonts, icons, plugins and open-source libraries carry their own licences. The client's ownership clause should not promise more than you can give.",
        "For software, distinguish between the application code, the third-party dependencies and the client's data. An assignment of the application code is normal; an assignment of a dependency the client has no right to own is not possible. List the dependencies and their licences.",
        "If the client supplies assets, the contract should include a warranty that they have the right to use them and an indemnity if that turns out to be false. You do not want to be liable for a photograph the client did not license.",
      ],
    },
    {
      heading: "Employees, contractors and the default rule",
      paragraphs: [
        "The employee/contractor distinction matters. In many jurisdictions, work created by an employee in the course of employment belongs to the employer automatically. A freelancer is usually not an employee, so the default is different.",
        "Some countries also have specific rules for commissioned works, particularly in the United States, where \"work made for hire\" can apply to certain categories if the parties agree in writing. The categories are narrow and technical. Do not assume a freelance commission falls into them.",
        "The practical lesson is the same everywhere: do not rely on the default. Put the ownership position in the contract, in plain language, and make sure both sides mean the same thing.",
      ],
    },
    {
      heading: "What clients usually need",
      paragraphs: [
        "Most clients need the right to use, reproduce, modify and display the work for their business, indefinitely and worldwide. That can be granted by a broad licence without transferring the copyright.",
        "Some clients genuinely need ownership: a business being sold, a brand that will be licensed to third parties, a piece of software that will be maintained by another team. In those cases, assignment is reasonable, and the price should reflect the value of the rights.",
        "Ask what the client intends to do with the work. The answer usually reveals whether a licence is enough, and it prevents the default assumption that ownership is included in every fee.",
      ],
    },
    {
      heading: "A practical clause",
      paragraphs: [
        "\"On receipt of full payment, the supplier assigns to the client all copyright in the final deliverables listed in Schedule 1, worldwide and for the full term of copyright. The supplier retains ownership of its pre-existing materials, tools and know-how, and grants the client a perpetual, non-exclusive licence to use them as incorporated in the deliverables. The supplier may display the deliverables in its portfolio unless the client requests confidentiality in writing.\"",
        "That clause does three jobs: it transfers what the client paid for, protects what you brought to the project, and keeps the portfolio right. Adapt the wording to the jurisdiction and have a lawyer review it for significant work.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Does the client own the work if they paid for it? Not automatically. Payment does not transfer copyright in most jurisdictions; an assignment or a licence does. Check the contract.",
        "Is a licence as good as ownership for the client? For most uses, yes. A broad, perpetual licence gives the client the practical rights they need while leaving ownership with the creator.",
        "Can I show the work in my portfolio? Only if the contract allows it. Copyright ownership alone does not override a confidentiality clause, so include a portfolio right explicitly.",
        "Who owns the copyright in code? Generally the developer, unless assigned. Third-party libraries and open-source components remain under their own licences and cannot be assigned by either party.",
        "What about moral rights? They exist in some jurisdictions and may need to be waived if the client wants to modify the work freely. Ask a lawyer in the relevant jurisdiction.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "The creator usually owns the work unless the contract says otherwise, and a licence is not an assignment. Say which one you are giving, name the deliverables, time the transfer to payment, carve out your pre-existing materials and keep the portfolio right. The clause is short; the argument it prevents is not.",
      ],
    },
  ],
};
