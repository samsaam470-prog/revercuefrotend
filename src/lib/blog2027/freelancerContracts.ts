import type { BlogPost } from "../blog";

// AEO cluster — question-shaped demand. The threshold question: whether a
// contract is needed at all, and what the minimum version contains.

export const FREELANCER_CONTRACTS_POST: BlogPost = {
  slug: "do-freelancers-need-a-contract",
  title: "Do freelancers need a contract? The minimum that protects you",
  excerpt:
    "Yes for most paid work. It does not need to be twenty pages: one page covering scope, price, payment, ownership and cancellation prevents most of the arguments that end freelance relationships.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Is a proposal legally binding?", to: "/blog/is-a-proposal-legally-binding" },
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Freelancers often skip contracts for the same three reasons: the client is a friend, the job is small, and the paperwork feels like distrust. Then the friend asks for a fourth revision, the small job grows, and the relationship becomes a negotiation about what was never written down.",
        "A contract is not a sign that you expect trouble. It is the version of the agreement that both people can check when memory differs.",
      ],
    },
    {
      heading: "Do freelancers need a contract? The short answer",
      paragraphs: [
        "Yes for most paid work, including small jobs and work for people you know. The minimum is a one-page agreement covering the parties, the scope, the fee, the payment schedule, who owns the work, what happens if either side cancels, and how changes are handled.",
        "The exceptions are narrow: unpaid work, a genuinely trivial favour, or a client whose procurement process makes a formal contract impossible. In the last case, a written confirmation of scope and price is the fallback, not a substitute.",
      ],
    },
    {
      heading: "What goes wrong without one",
      paragraphs: [
        "The scope drifts. Without a list of deliverables, every request is arguable, and the client's memory of the conversation is as valid as yours. The result is extra work that cannot be invoiced without looking petty.",
        "The payment terms are unclear. Was the deposit refundable? Is the final invoice due on delivery or on approval? If approval is never formally given, when does payment become due? These are simple questions with expensive answers when nobody wrote them down.",
        "The ownership is assumed. The client believes they own everything; you believe you licensed the work. Neither of you is lying, and both of you are stuck.",
        "The exit is undefined. A client cancels halfway through. Do they pay for work done? Do you hand over the files? Can you show the work in your portfolio? A contract answers these before anyone is angry.",
      ],
    },
    {
      heading: "The one-page contract",
      paragraphs: [
        "A one-page agreement is enough for most small freelance projects. It needs eight things: the legal names of the parties, the scope with quantities and exclusions, the fee and currency, the payment schedule, the delivery date or timeline, the IP position, the cancellation terms, and the governing law or a statement that the parties will resolve disputes in good faith.",
        "Add a change clause in one sentence: work outside the scope is quoted and agreed in writing before it starts. That single line prevents most of the scope arguments that a longer contract is supposed to solve.",
        "Keep the language plain. A contract the client cannot understand is a contract they will not follow, and clarity is more useful than formality in a small commercial relationship.",
      ],
    },
    {
      heading: "When the risk is genuinely low",
      paragraphs: [
        "A small, fixed, prepaid job for a repeat client with a clear brief carries less risk than a large, open-ended project for a new client. If the whole fee is paid before work starts and the deliverable is simple, a short written confirmation may be proportionate.",
        "Even then, confirm three things in writing: what you will deliver, what you will not deliver, and that the fee is non-refundable once work begins. That message is not a formal contract, but it is evidence of the terms.",
        "The risk rises quickly when any of these appear: a deposit is not paid, the scope is unclear, the client has multiple stakeholders, the work is custom or high-value, or the client's payment history is unknown. At that point, use the one-pager.",
      ],
    },
    {
      heading: "But what if the client refuses?",
      paragraphs: [
        "A client who refuses to sign a one-page agreement is telling you something about how the project will go. Sometimes the refusal is bureaucratic rather than hostile: their procurement team has its own document, or the signatory is on holiday.",
        "If they have their own contract, read it. The common conflicts are IP ownership, payment timing, liability and termination. If it is broadly fair, use it and attach your scope as a schedule. If it is not, say which clauses you cannot accept and why.",
        "If they refuse any written terms at all, decide whether the fee is worth the risk. For most freelancers, the answer is no: the project that begins without terms is the project most likely to end without payment.",
      ],
    },
    {
      heading: "What a contract cannot do",
      paragraphs: [
        "A contract cannot guarantee payment. It gives you a stronger claim if payment does not arrive, but enforcing it costs time and money. The best protection is still a deposit, staged payments and a client who has been checked.",
        "A contract cannot make a vague scope precise. If the schedule says \"website\" and nothing else, the document will not resolve the argument about the blog.",
        "A contract cannot replace a conversation. The most useful thing about writing terms is that it forces both sides to say what they expect before the work begins.",
      ],
    },
    {
      heading: "A practical sequence",
      paragraphs: [
        "Send the proposal with the scope and price. Once the client approves, send the contract or the one-page agreement with the same scope attached. Collect the deposit. Start work. Keep the signed version with the project record.",
        "If the client needs to move quickly, send the agreement and the invoice together, with a start date that depends on both. The sequence protects you without adding a separate negotiation.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Can I use a free template? Yes, as a starting point, but read it and adapt it to the jurisdiction and the work. A template that names the wrong law or assumes the wrong IP position can be worse than no template.",
        "Do I need a contract for a small job? It is still sensible. A one-page agreement is enough, and it takes less time than the first argument it prevents.",
        "Is an email agreement enough? An email can be evidence of a contract, but it is easier to dispute than a signed document. Use email for confirmations, not as the only record of the terms.",
        "What if the client is a friend? Especially then. A clear scope and payment terms protect the friendship from the resentment that builds when expectations differ.",
        "Does a contract have to be reviewed by a lawyer? Not for every small job, but use a well-drafted template and get a review when the value or risk is significant. This is general information, not legal advice.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Most freelancers need a contract, and most need a shorter one than they think. One page with scope, price, payment, ownership, cancellation and changes will do more than a twenty-page template nobody reads. Write it once, reuse it, and adapt the scope each time.",
      ],
    },
  ],
};
