import type { BlogPost } from "../blog";

// AEO cluster — question-shaped. Answer in the first 150 words, then the
// conditions, the evidence and the exceptions.

export const UNSIGNED_CONTRACT_POST: BlogPost = {
  slug: "what-if-a-client-never-signs-the-contract",
  title: "What happens if a client never signs the contract?",
  excerpt:
    "You can often start on written approval rather than a signature, but what you can enforce later depends on what the messages say. Here is the sequence that protects the work.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Do freelancers need a contract?", to: "/blog/do-freelancers-need-a-contract" },
    { label: "Is a proposal legally binding?", to: "/blog/is-a-proposal-legally-binding" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A client who has approved the work in writing but not signed the contract is a common situation, and the practical answer is that you usually can start — but what you can prove later depends on what the written approval actually says.",
        "A signed contract is the cleanest evidence of agreed terms. Without one, a clear email or message thread that names the scope, the price and the payment terms can still show that a contract exists. What it rarely does is carry the clauses you did not discuss: liability caps, IP assignment, cancellation terms, confidentiality. Those are the clauses that matter when something goes wrong.",
      ],
    },
    {
      heading: "What happens if a client never signs the contract? The short answer",
      paragraphs: [
        "If the client has approved the proposal in writing and you have started work, a contract may exist in practice even without a signature. In many jurisdictions, acceptance can be shown by conduct — approving the quote, paying a deposit, or asking you to begin.",
        "But an unsigned document is weaker evidence. If the client later disputes the scope or the price, you are relying on the messages rather than a signed record. And the protective clauses you drafted are only part of the agreement if they were communicated and accepted.",
        "The practical rule: do not start significant work on a verbal yes. Get written approval that references the document, and keep chasing the signature before the work goes far. This is general information, not legal advice; enforceability differs by jurisdiction and by the size and type of the engagement.",
      ],
    },
    {
      heading: "Why clients stall on signing",
      paragraphs: [
        "Usually not because they intend to avoid the terms. The signature sits with legal, procurement or a director who is travelling. The client's own process may require a purchase order, a vendor form or a security review before anything is signed.",
        "Sometimes the delay is a signal. A client who will not sign but wants you to start immediately is asking you to carry the risk. That is worth naming: \\\"I can hold the dates, but work starts once the agreement is signed or the deposit is paid.\\\"",
        "A third possibility is that the contract contains something they object to and they have not said so. Ask directly which clause is holding it up. A five-minute conversation often removes a two-week delay.",
      ],
    },
    {
      heading: "The written approval that protects you",
      paragraphs: [
        "Ask for an email that does three things: identifies the document and its version, states that the client approves it, and authorises you to begin. \\\"We approve proposal v3 dated 20 November and authorise you to start on 24 November\\\" is enough to show agreement on scope and price.",
        "Attach the document to the approval, or link to the exact version. An approval of \\\"the proposal\\\" when three versions have been sent is ambiguous, and ambiguity is what a dispute feeds on.",
        "Confirm the commercial terms in your reply: fee, payment schedule, start date, and what happens if the agreement is not signed. This turns a single approval into a short record of the arrangement.",
        "If the client will not put approval in writing, treat that as a decision about the project, not a communication preference. Verbal approval of a four-figure engagement is a risk you can choose to take; verbal approval of a large one is a risk you should not.",
      ],
    },
    {
      heading: "What to do about the clauses that need a signature",
      paragraphs: [
        "Some terms are difficult to imply from conduct: an assignment of intellectual property, a limitation of liability, a non-solicitation, a data-processing obligation. If those matter to the project, the signature matters too.",
        "For IP, you can make delivery conditional: files transfer on signature or full payment. For liability, you can state the cap in the proposal and the invoice. Neither is as strong as a signed clause, but both are better than silence.",
        "If the client's procurement process is the blocker, ask what they need to complete it. A vendor form, a W-9 equivalent, an insurance certificate or a purchase order number can unblock a signature faster than another reminder email.",
      ],
    },
    {
      heading: "How long to wait before starting",
      paragraphs: [
        "For small, reversible work — a one-page audit, a short consultation — a written approval may be enough, with the invoice issued at the same time. The downside is contained.",
        "For work that requires you to turn down other projects, buy licences, book a subcontractor or commit to a date, wait for the signature or a deposit. Those are irreversible commitments, and they should not be made on an unsigned document.",
        "Set the expectation before the delay happens: \\\"The dates are held for five working days from this email; after that I'll need to release them.\\\" A deadline turns a passive wait into a decision the client can make.",
      ],
    },
    {
      heading: "If the client still will not sign",
      paragraphs: [
        "Ask what would make it possible. Sometimes the answer is a simpler agreement, a shorter term, a different entity or a missing document from you.",
        "Offer a one-page letter of engagement for smaller work. Some clients who will not send a longer contract through legal will sign a short document that covers scope, fee, payment and IP.",
        "If neither works, decide whether to proceed on the written approval, reduce the scope to what you are willing to risk, or decline. All three are legitimate; proceeding without deciding is the one option that carries the risk without the return.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is a contract valid without a signature? Often yes, if there is evidence of agreement and intent to be bound, such as a written approval and performance. A signature makes it easier to prove, and some clauses and jurisdictions require specific formalities.",
        "Can I start work before the contract is signed? For small, reversible work, written approval may be enough. For work that commits your time or money, wait for a signature or a deposit.",
        "What if the client says the signature is coming next week? Ask for written approval in the meantime, confirm the dates you are holding, and set a date when they are released.",
        "Does an email count as accepting a contract? It can, if it clearly approves the terms. A vague \\\"sounds good\\\" is weaker than \\\"we approve the attached proposal and its terms\\\".",
        "Should I invoice before the contract is signed? Only if the terms are agreed in writing. An invoice is a request for payment, not proof of the agreement behind it.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A missing signature is not automatically a reason to stop, but it is a reason to be deliberate. Get written approval that names the document and authorises the start, confirm the commercial terms in writing, and do not make irreversible commitments until the signature or the deposit arrives. If the client will not sign, make that a decision rather than a drift.",
      ],
    },
  ],
};
