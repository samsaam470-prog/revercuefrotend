import type { BlogPost } from "../blog";

// Cluster C — scope. This one is the cluster entry point: it names the pattern
// and hands off to the change-request and clause articles.

export const SCOPE_CREEP_POST: BlogPost = {
  slug: "how-to-handle-scope-creep",
  title: "How to handle scope creep without losing the client",
  excerpt:
    "Most scope creep is not a client trying it on. It is a small, reasonable request that arrives without a price attached. Here is the sentence that handles it, the line to draw first, and what to do when the client disagrees.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "How to write a change request", to: "/blog/how-to-write-a-change-request" },
    { label: "The out-of-scope clause", to: "/blog/out-of-scope-clause" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "It starts with one small thing. Can we also add a blog? Can the logo be a bit bigger? Can you jump on a call with my business partner? Each request is reasonable, each takes twenty minutes, and together they turn a four-week project into seven weeks at the same price. By the time you notice, you are either resentful or working for free, and neither is a business model.",
        "Scope creep is rarely a negotiation. It is a series of ordinary decisions made in good faith by a client who does not know where the boundary is, because the boundary was never visible to them. The fix is not a firmer tone; it is a boundary that can be seen before it is crossed.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Name the boundary in writing before work starts, respond to every out-of-scope request with the same three-part sentence, and attach a price rather than a refusal. The sentence is: yes, we can do that; it is not in the current scope; it is about X hours or Y pounds, and here is what it does to the date. That gives the client a real option and moves the decision back to them, which is where it belongs.",
      ],
    },
    {
      heading: "What actually counts as scope creep",
      paragraphs: [
        "Not every change is creep. A client refining a design within the agreed rounds is doing what the process is for. Creep is work that adds a deliverable, a stakeholder, a channel or a round of revision beyond what the scope describes. The four reliable signals are: a new deliverable appears, a new person starts giving feedback, the number of rounds quietly grows, or the definition of done changes after the work is done.",
        "The distinction matters because a freelancer who treats every comment as creep becomes impossible to work with, and a freelancer who treats every new request as normal becomes unpaid. Ask one question: does this change what the client receives, or only how we get there? Changing how is usually free. Changing what is a change request.",
      ],
    },
    {
      heading: "Draw the line before the work starts",
      paragraphs: [
        "The scope should say what is included, what is not, how many rounds are included, and who approves. The exclusions do most of the work, because they are the part clients read when a question arises. Three lines are usually enough: five pages, two rounds of revision, one approver. Everything else is a change.",
        "Put those numbers in the proposal, not only in the contract. A client who sees two rounds before signing will not ask for a fifth round as though it were included. A client who signed a contract they did not read will, and the argument about what was agreed is more expensive than the sentence that would have prevented it.",
      ],
    },
    {
      heading: "The sentence that handles the request",
      paragraphs: [
        "Yes, we can add the pricing page. It is not in the current scope, which covers five pages. Adding it is about six hours, which is 480, and it moves delivery from the 14th to the 19th. Do you want me to add it, or keep the original date? This works because it does three things at once: it says yes to the work, it names the cost, and it offers a choice between the change and the date.",
        "The order matters. Starting with yes keeps the relationship intact and signals that you are not being difficult. Starting with it is out of scope reads as a door closing, even when the offer that follows is generous. And always attach a consequence to the date, because time is the currency clients feel most clearly.",
      ],
    },
    {
      heading: "When the client says it should be included",
      paragraphs: [
        "Sometimes they will argue, and sometimes they will be right. If the request is genuinely implied by what was sold, include it and say so: you are right, that is covered by the content migration, I will fold it in. That costs you nothing and buys a great deal of trust.",
        "If it is not implied, hold the line once, calmly, and point at the document rather than at your memory: the scope lists five pages and two rounds; the sixth page is the only thing outside it. Then offer the smallest version that fits the budget. What you must not do is argue about intent, because a conversation about who said what cannot be won and does not need to be had when there is a written scope.",
      ],
    },
    {
      heading: "Spotting it early",
      paragraphs: [
        "Creep is cheapest to handle in the first hour. The signals are a message that begins with a small favour, a request that arrives from someone who was not in the kick-off, or a deliverable that gets described differently each time it is mentioned. When you see one, respond the same day with the three-part sentence, while the request is still small enough to price.",
      ],
    },
    {
      heading: "What not to do",
      paragraphs: [
        "Do not absorb the work quietly and mention it at the end, because the invoice will look like a surprise and the client will feel ambushed. Do not refuse without an alternative, because a no with no path forward ends the conversation. Do not blame the client for not knowing a boundary you never showed them, and do not discount the change so heavily that the process stops being worth having.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Should I charge for small changes? Not always. Set a threshold, such as anything under thirty minutes, and absorb it deliberately rather than resentfully. The point is that the decision is yours.",
        "What if the client refuses to pay for any change? Then the project has a fixed scope and a fixed date, and the answer to new requests is that something else has to come out. Offer the swap rather than the refusal.",
        "Does a change request ruin the relationship? A priced change with a choice attached usually improves it, because it shows the client you take their request seriously enough to plan it.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Scope creep is a visibility problem before it is a pricing problem. Show the boundary, answer every request with yes, cost and date, and let the client choose. Most will choose the original scope once the price is on the table, and the ones who choose the change will pay for it.",
      ],
    },
  ],
};
