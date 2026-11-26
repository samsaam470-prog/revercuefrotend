import type { BlogPost } from "../blog";

// SEO cluster — document types. Entry point for articles 2 and 3.

export const PROPOSAL_VS_CONTRACT_POST: BlogPost = {
  slug: "proposal-vs-contract-vs-statement-of-work",
  title: "Proposal vs contract vs statement of work: what to send, and when",
  excerpt:
    "A proposal sells the work, a statement of work defines it and a contract makes it enforceable. Here is what belongs in each, the order they go out, and the mistake that turns three documents into one confusing PDF.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "How to write a statement of work", to: "/blog/how-to-write-a-statement-of-work" },
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
  ],
  body: [
    {
      paragraphs: [
        "A client asks for a proposal. You send a document with prices, a timeline and a signature block. They sign it. Three weeks later nobody can agree whether the extra page was included, because the document that was supposed to settle it was written to win the work, not to govern it.",
        "That is not a contract problem or a proposal problem. It is a document-type problem. A proposal, a statement of work and a contract answer three different questions, and collapsing them into a single PDF feels efficient until the first disagreement.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "A proposal persuades: here is what you need, here is what I suggest, here is what it costs. A statement of work defines: exactly what will be delivered, by when, to what standard, and what is excluded. A contract binds: who the parties are, what they owe each other, and what happens if something goes wrong.",
        "For a small fixed-scope job, a proposal with clear terms and a signed acceptance can carry all three jobs. For anything with several deliverables, a change process or meaningful risk, keep them separate. The rule of thumb: if you would need to point at a sentence six months from now to settle an argument, that sentence belongs in the statement of work or the contract, not only in the pitch.",
      ],
    },
    {
      heading: "What a proposal is for",
      paragraphs: [
        "A proposal is a sales document. Its job is to show that you understood the problem, that your approach is credible, and that the price is connected to an outcome the client cares about. It should be written for the person approving the spend, not for a file.",
        "That means it can be persuasive. It can include evidence, a recommendation, a comparison of options and a reason to choose you. It can also be short. A proposal that answers the client's real question in two pages is more likely to be approved than a twenty-page capability document that buries the price on page fourteen.",
        "What a proposal should not do is carry the detailed machinery of delivery. If the pricing table says five pages and two rounds, that is useful. If the scope paragraph tries to anticipate every exclusion, every acceptance criterion and every remedy, the proposal stops selling and starts pretending to be a contract.",
      ],
    },
    {
      heading: "What a statement of work is for",
      paragraphs: [
        "A statement of work, or SOW, is the delivery definition. It translates the promise into a testable list: deliverables, acceptance criteria, assumptions, dependencies, the review process and the change mechanism. It is the document a project manager can run from and a client can hold you to.",
        "The SOW is where ambiguity is expensive. If it says the website will be launched without saying who provides the copy, the answer will be discovered at the worst possible moment. If it says two rounds of revisions without defining a round, the third round will arrive as a reasonable request and the argument will be about memory rather than the document.",
        "A SOW does not need to be long. One page can be enough for a small project if it names the deliverables, the exclusions, the acceptance test, the assumptions and the change route. What it cannot be is vague in the places where the project will actually be judged.",
      ],
    },
    {
      heading: "What a contract is for",
      paragraphs: [
        "A contract is the enforceable agreement. It identifies the parties, records the consideration, sets the payment terms, allocates risk through warranties, liability and indemnities, and says how the relationship ends. It may incorporate the proposal and the SOW by reference, or restate the essentials.",
        "The contract is also where the unglamorous questions live: who owns the intellectual property, what happens to a deposit if the client cancels, how much notice either side must give, which law governs the agreement and where disputes are heard. Those questions rarely matter during a good project and always matter during a bad one.",
        "This article is general information, not legal advice. Contract requirements and implied terms vary by jurisdiction and by the type of work, and a contract drafted for a software project is not automatically suitable for construction or regulated services.",
      ],
    },
    {
      heading: "The difference in one comparison",
      paragraphs: [
        "Purpose: a proposal answers why you; a SOW answers what exactly; a contract answers what is enforceable. Audience: a proposal is read by a decision-maker, a SOW by the delivery team and the client's operations lead, a contract by both parties and, if things go wrong, their advisers. Lifespan: a proposal is a snapshot of a moment, a SOW runs for the project, a contract can outlive the project through confidentiality and IP clauses.",
        "Level of detail: a proposal is selective and persuasive; a SOW is exhaustive about delivery and silent about price unless it restates it; a contract is exhaustive about obligations and consequences. Failure mode: a weak proposal loses the work, a weak SOW causes scope arguments, a weak contract leaves you with no remedy.",
      ],
    },
    {
      heading: "The order they go out",
      paragraphs: [
        "The usual sequence is proposal, then contract or SOW, then work. The proposal establishes the commercial shape: outcomes, approach, price, timing. Once the client says yes in principle, the SOW pins down delivery and the contract records the terms. For small jobs the proposal and contract can be one document, with the SOW as an appendix.",
        "A useful test for whether you need a separate SOW: can a stranger read the proposal and tell exactly what will be delivered, what will not, and how acceptance will be judged? If yes, the proposal is carrying the SOW. If no, write the SOW before work starts and attach it to the contract.",
        "The most common sequencing error is sending the contract before the commercial terms are agreed. The client reads a legal document, spots a number they did not expect, and the deal restarts. Sell first, define second, bind third.",
      ],
    },
    {
      heading: "When one document is enough",
      paragraphs: [
        "If the work is small, fixed and low-risk, one document can do all three jobs: a one-page proposal with scope, price, payment terms, a short list of exclusions, an acceptance line and a signature. This is common for a single deliverable such as a logo, a half-day workshop or a standard installation.",
        "The conditions are strict. The scope must be genuinely small, the client must be paying before or on delivery, the deliverables must be easy to describe, and there must be no meaningful dependency on the client's own team. Once any of those conditions fails, the single document starts hiding decisions that should be visible.",
      ],
    },
    {
      heading: "The mistakes that cause the argument",
      paragraphs: [
        "The first is using the proposal as the scope. A persuasive paragraph such as \"we will refresh the site and improve conversion\" is not a deliverable. It reads well and settles nothing. Replace it with a list of pages, a definition of done and a named approver.",
        "The second is putting price in three places with three different numbers: the proposal, the SOW and the contract. Pick one source of truth and reference it everywhere else.",
        "The third is leaving the change process until the contract. A SOW without a change route invites informal additions; a contract without one gives you a legal argument where a sentence would have done. The fourth is assuming a signature makes a bad document good. A signed vague document is still vague.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "A designer is asked to rebrand a small retailer. The proposal is four pages: the client's situation, the recommended direction, three packages and a timeline. It ends with a recommendation and a price.",
        "The SOW is two pages: logo suite, colour and type system, five application mock-ups, two rounds of revision, one approver, final files in specified formats. It lists exclusions: photography, printing, signage production and copywriting. It defines acceptance as written approval of the final round and names the change route.",
        "The contract is four pages: parties, fees, payment schedule, IP assignment on final payment, portfolio rights, confidentiality, termination, liability and governing law. It incorporates the SOW as a schedule. Each document does one job, and the client signs one pack rather than three competing stories.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Can a proposal double as a contract? It can if it contains the essential terms, shows that both parties intend to be bound, and is accepted. Whether that is enough depends on the jurisdiction and the deal. For anything significant, a separate signed contract is the safer record.",
        "Does a statement of work need to be signed? It should be accepted in writing by someone with authority, either as a standalone document or as a schedule to the contract. An emailed \"approved\" is better than nothing but weaker evidence than a signature on a versioned document.",
        "Who writes the SOW? Usually the supplier, because they know the delivery detail, but the client should review it. A SOW the client has never read is a document that will be argued with.",
        "What if the client insists on using their own contract? Read it against your proposal and SOW. The common conflicts are payment timing, IP ownership, liability caps and termination rights. Raise them before signature, not after.",
        "Is a proposal legally binding if it is not signed? It may be if the parties behaved as though it were agreed, but proving that is harder than pointing at a signature. The practical answer is to make acceptance explicit.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Use the proposal to win the work, the statement of work to define it, and the contract to bind it. Collapse them only when the work is genuinely small and the terms are genuinely clear. The question to ask before sending anything is not \"does this look professional?\" but \"if this project goes wrong, does this document tell us what happens next?\"",
      ],
    },
  ],
};
