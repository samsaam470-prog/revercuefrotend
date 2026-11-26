import type { BlogPost } from "../blog";

// AEO cluster — question-shaped demand. General principles with a jurisdiction
// caveat; not legal advice.

export const PROPOSAL_BINDING_POST: BlogPost = {
  slug: "is-a-proposal-legally-binding",
  title: "Is a proposal legally binding? When a yes becomes a contract",
  excerpt:
    "A proposal can become a binding contract if it contains certain terms, shows an intention to be bound and is accepted. A signature is strong evidence, but it is not the only route. Here is what decides it.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Do freelancers need a contract?", to: "/blog/do-freelancers-need-a-contract" },
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A client replies \"approved, go ahead\" to a proposal. No contract is signed. Something goes wrong. The first question is whether the proposal itself is a contract. The answer is sometimes yes, and that is exactly why the wording matters.",
      ],
    },
    {
      heading: "Is a proposal legally binding? The short answer",
      paragraphs: [
        "It can be. A proposal becomes a binding agreement when it contains sufficiently certain terms, the parties intend to create legal relations, and the client accepts it. A signature is the clearest evidence of acceptance, but an email, a purchase order or conduct can also amount to acceptance in many jurisdictions.",
        "An unsigned proposal that nobody has accepted is not binding. It is an offer or an invitation to negotiate. The moment of acceptance is what changes its legal character.",
        "This is general information, not legal advice. The rules differ by jurisdiction, by the type of work and by the status of the parties, and a lawyer should review anything significant.",
      ],
    },
    {
      heading: "The four elements that decide it",
      paragraphs: [
        "Offer: the proposal must set out what you will do and on what terms with enough certainty that a court could tell what was agreed. A price, a scope and a payment schedule help. \"We will support your marketing\" does not.",
        "Acceptance: the client must agree to those terms, not to a different version. A reply that says \"approved, but can we change the payment terms\" is a counter-offer, not an acceptance. The contract forms when someone accepts the final version.",
        "Consideration: each side must give something of value. The client pays; you deliver. This is rarely an issue in commercial work, but it is why a free discovery phase is not usually a contract.",
        "Intention: both parties must intend the arrangement to be legally binding. A proposal marked \"for discussion only\", \"subject to contract\" or \"non-binding\" signals the opposite. So does a document that is clearly a marketing brochure.",
      ],
    },
    {
      heading: "Signature is evidence, not magic",
      paragraphs: [
        "A signed proposal is easier to prove than an email, but a signature does not make a vague document enforceable. If the scope is unclear, the signature only proves that both sides signed something unclear.",
        "Electronic signatures are widely accepted for commercial agreements, but the standard varies. A typed name with a consent record is usually enough for an ordinary services contract; regulated or high-value agreements may require a more formal signature or witnessed signing. This is general information, not legal advice.",
        "What matters is the record: who accepted, when, which version, and what they saw. A signature on a document with no version number is weaker evidence than a signature on a dated PDF that matches the version you hold.",
      ],
    },
    {
      heading: "What weakens a proposal",
      paragraphs: [
        "Vagueness. \"A new website\" is not a scope. \"Five pages, two rounds, launch by 14 March\" is. If the essential terms are missing, there may be no enforceable agreement at all, only a discussion.",
        "Contradictions. A proposal that says \"fixed fee\" in one section and \"billed hourly\" in another gives both sides a plausible reading, which is the definition of a dispute.",
        "Missing terms. Payment timing, exclusions, IP ownership and termination are the clauses that decide what happens when the relationship sours. A proposal without them can still be a contract, but it will be a thin one.",
        "Conditions that were never met. \"Subject to a signed contract\" or \"subject to board approval\" keeps the proposal from binding until the condition is satisfied. That is often sensible, but it should be deliberate.",
      ],
    },
    {
      heading: "Proposal, contract and statement of work",
      paragraphs: [
        "A proposal sells the work. A contract records the enforceable terms. A statement of work defines delivery. For a small job, one document can do all three if it contains the essentials. For a larger job, the proposal can be incorporated into the contract by reference, which is cleaner than restating the scope three times.",
        "If you want the proposal to be the contract, say so: \"This proposal is an offer. Acceptance is confirmed by signature or written approval, and the terms below apply from that point.\" If you want it to be non-binding until a contract is signed, say that too: \"This proposal is for discussion and is subject to a signed services agreement.\"",
        "The dangerous version is silence. Silence lets each side assume the interpretation that suits them.",
      ],
    },
    {
      heading: "When a client relies on an unsigned proposal",
      paragraphs: [
        "If a client tells you to start, and you do, the conduct can create an agreement even without a signature. That is not a favourable position: the terms may be unclear, and proving what was agreed can be expensive.",
        "The practical response is to confirm in writing before work starts: \"Thanks for approving. To confirm, the scope is X, the fee is Y, payment is Z, and the start date is D. I will begin on that basis.\" That message is not a substitute for a contract, but it is much better evidence than a phone call.",
        "If the work is significant, do not start until the contract or a signed acceptance is in place. The commercial pressure to begin immediately is real; so is the cost of doing three months of work on an unclear promise.",
      ],
    },
    {
      heading: "How to make acceptance unambiguous",
      paragraphs: [
        "Put an acceptance block in the proposal: name, role, date, signature and a line that says the signatory has authority to bind the client. Add the version number and the date to the footer.",
        "State how acceptance can be given. If email approval is acceptable, say so and define what counts: \"a reply from the client's named contact confirming approval of this version\". If it is not acceptable, say that a signature is required.",
        "Keep the accepted version. Send the client a copy of the signed document, not just a confirmation email. The version they hold should be the version you hold.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is an unsigned proposal legally binding? It can be if the client accepted it and the other elements of a contract are present. Without acceptance, it is an offer, not a binding agreement.",
        "Does a proposal need a signature to be enforceable? Not always, but a signature is strong evidence. Email acceptance or conduct can also create a contract in many jurisdictions; the rules vary.",
        "Can a client cancel after approving a proposal? That depends on the terms and the law. If the proposal or contract has a cancellation clause, it governs. If not, the position may be unclear, which is why the clause matters.",
        "Is a proposal the same as a contract? No. A proposal is a sales document that can become a contract if accepted with the necessary terms. A contract is the document drafted to record the enforceable agreement.",
        "Should I put legal terms in a proposal? At minimum, scope, price, payment, IP, confidentiality and termination. For significant work, put the full terms in a contract and incorporate the proposal by reference.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A proposal is binding when it has certain terms, an intention to be bound and a clear acceptance. A signature helps, but clarity helps more. Decide whether you want the proposal to bind, say so in the document, and keep the accepted version.",
      ],
    },
  ],
};
