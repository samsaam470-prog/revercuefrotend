import type { BlogPost } from "../blog";

// SEO cluster — discount requests. Commercial intent; the sibling article on
// raising rates covers the proactive increase.

export const DISCOUNT_REQUEST_POST: BlogPost = {
  slug: "how-to-handle-a-discount-request",
  title: "A client asked for a discount. Here's how to answer.",
  excerpt:
    "Four responses that keep the price and the relationship, how to trade scope instead of rate, and the narrow cases where a discount is actually a good deal.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "How to price a freelance project", to: "/blog/how-to-price-a-freelance-project" },
    { label: "How to raise your freelance rates", to: "/blog/how-to-raise-your-freelance-rates" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A discount request is rarely about the money. It is a test: of your confidence, of your margin, and of whether the price was real. The freelancer who cuts the number immediately has told the client that the first number was invented. The freelancer who refuses flatly has told the client that the relationship does not matter.",
        "There is a third answer, and it is usually the right one: change what is included, not what it costs.",
      ],
    },
    {
      heading: "First, find out what is being asked",
      paragraphs: [
        "\\\"Can you do it for less?\\\" has at least four meanings: the budget is fixed and lower, the value is unclear, they are comparing you to a cheaper quote, or they are testing whether the price is negotiable.",
        "Ask one question before responding: \\\"Is the budget fixed at that number, or is it a target?\\\" The answer changes everything. A fixed budget is a scope conversation. A target is a value conversation.",
        "If they mention another quote, ask what it includes. A cheaper quote for a narrower scope is not a cheaper quote. Comparing totals without comparing deliverables is how clients accidentally buy less than they need.",
      ],
    },
    {
      heading: "The four responses",
      paragraphs: [
        "Hold the price and explain the value. This is right when the scope is already lean, the price is fair, and the client has not given a reason. \\\"The price reflects the scope as described; I can't reduce it without changing what's included.\\\"",
        "Reduce the scope to meet the budget. This is right when the budget is real and the work is worth having. Remove a deliverable, a revision round, a channel or a phase, and show the new total. The rate stays the same.",
        "Change the terms. A discount can be traded for something that has value to you: payment upfront, a longer engagement, a case study, a referral, a faster approval process, or a smaller number of stakeholders. Never give a discount for nothing.",
        "Walk away. This is right when the budget is below your floor, the client will not discuss scope, or the negotiation itself is a preview of the project. A politely declined project is cheaper than a badly priced one.",
      ],
    },
    {
      heading: "Trade scope, not rate",
      paragraphs: [
        "The difference matters commercially and psychologically. A reduced rate applies to every future project with that client, and to every referral they make. A reduced scope applies once.",
        "Make the trade visible. \\\"The full package is X. At your budget I can include the homepage, the two inner pages and one revision round, and leave the blog templates for a later phase.\\\" The client sees what they are giving up, which makes the original price credible.",
        "Offer a phase two rather than a permanent reduction. Deferring a deliverable preserves the total value of the work and gives the client a reason to come back. It also gives you a natural moment to re-quote.",
        "If the client insists on the same scope for less, the honest answer is that the price would have to come from somewhere: slower delivery, fewer revisions, no source files, or a longer commitment. Say which one you are willing to trade.",
      ],
    },
    {
      heading: "Terms you can trade instead of money",
      paragraphs: [
        "Prepayment: a discount for paying the full fee upfront, or a larger deposit, is a real concession because it improves your cash flow and reduces collection risk. State the percentage and the reason.",
        "Commitment: a retainer or a multi-project agreement can justify a lower unit rate because it reduces your sales cost and fills capacity. Put a term on it so the rate does not become permanent.",
        "Testimonial or case study: a discount in exchange for a named, quotable reference is common, but only offer it if you would want the reference. A weak testimonial is not worth a margin cut.",
        "Speed: if the client can approve in one round with one decision-maker, you can price the efficiency in. Fewer revision loops is a genuine cost saving, and it is fair to share part of it.",
      ],
    },
    {
      heading: "When a discount is rational",
      paragraphs: [
        "A first project with a client you want to keep, where the work is a genuine portfolio piece and the scope is small enough that the margin loss is trivial. Treat it as a marketing cost, and say so to yourself, not to the client.",
        "A long engagement that fills otherwise empty capacity. A slightly lower day rate across three months can be worth more than a full rate across three weeks.",
        "A strategic client whose name opens doors. Be honest about whether it actually will; many freelancers discount for a logo that never converts into another project.",
        "A referral source. If the client consistently sends work, a preferential rate is a sensible loyalty arrangement, but it should be documented and reviewed, not granted in the moment.",
      ],
    },
    {
      heading: "What not to do",
      paragraphs: [
        "Do not discount in the first reply. It signals that the price was padded and invites a second request. Ask a question first, then respond.",
        "Do not discount and keep the full scope. That is the one outcome that damages both the current project and every future negotiation with the same client.",
        "Do not explain the discount as a favour. \\\"I'll do it for less this time\\\" creates an expectation with no boundary. If you make a concession, tie it to a reason and an end date.",
        "Do not let a discount change the contract quietly. If the scope or terms change, update the proposal or agreement so the record matches what was agreed.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Should I lower my price if a client asks? Only in exchange for something: less scope, better terms, a longer commitment or a reference. A discount with nothing in return teaches the client that the price is negotiable every time.",
        "How do I say no to a discount politely? Acknowledge the budget, restate what the price includes, and offer a smaller scope at their number. \\\"I can't reduce the price for this scope, but I can adjust what's included\\\" is clear and not hostile.",
        "Is it bad to give a discount to a new client? Not if it is deliberate and time-limited. The problem is an unstructured discount that becomes the baseline for the relationship.",
        "What if they have a cheaper quote? Ask what it covers. Compare scope, revisions, timeline and what happens after delivery. If the other quote is genuinely equivalent, let them take it rather than matching a price you cannot sustain.",
        "Can a discount be a red flag? Sometimes. A client who opens with a discount request before discussing the work is signalling how the rest of the project will go. Price accordingly or decline.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "The answer to a discount request is not yes or no; it is a trade. Keep the rate, change the scope, ask for better terms, or walk away. Whatever you choose, make the trade visible and put it in writing, so the price stays credible for the next project.",
      ],
    },
  ],
};
