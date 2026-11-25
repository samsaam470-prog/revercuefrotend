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
        "Scope creep is rarely a negotiation. It is a series of ordinary decisions made in good faith by a client who does not know where the boundary is, because the boundary was never visible to them. The fix is not a firmer tone; it is a boundary that can be seen before it is crossed, and a habit of answering every request the same way.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Name the boundary in writing before work starts, respond to every out-of-scope request with the same three-part sentence, and attach a price rather than a refusal. The sentence is: yes, we can do that; it is not in the current scope; it is about X hours or Y pounds, and here is what it does to the date. That gives the client a real option and moves the decision back to them, which is where it belongs.",
        "The second half of the answer is consistency. The first time you absorb a request without comment, the boundary moves, and every later request is measured against the one you gave away. Handling creep is therefore less about bravery in a single conversation than about doing the same ordinary thing each time.",
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
      heading: "Four kinds of creep, and which to absorb",
      paragraphs: [
        "The first kind is the small favour: a tweak, a quick look, a five-minute opinion. This is the cheapest to absorb and often the most valuable per minute, because it builds goodwill. Set a threshold in advance, say thirty minutes a week, and spend it deliberately rather than discovering at the end of the month that you spent eight hours on favours you cannot invoice.",
        "The second kind is the scope-shaped request: an extra page, an extra template, a second language. This is never a favour, because the work repeats. Price it, even if the price is small, so the pattern is established.",
        "The third kind is the moving target: the brief changes after the work exists. This is the most expensive, because it can invalidate hours already spent. It needs a decision in writing before any rework begins, and it needs the earlier work to be acknowledged rather than quietly replaced.",
        "The fourth kind is the creeping stakeholder: a new person joins the feedback loop and brings their own view of the project. The work has not changed, but the number of approvals has. Answer this one by asking the approver to consolidate, not by doing the extra rounds.",
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
        "Keep it to four sentences on a phone screen. Long explanations of your process read as defensiveness, and defensiveness invites negotiation. The shorter the message, the more it looks like a fact about the project rather than a position in an argument.",
      ],
    },
    {
      heading: "Three scripts for the awkward ones",
      paragraphs: [
        "The small favour: happy to look at that. It is outside the scope, so I would either fold it into the next round on Thursday or quote it separately, whichever you prefer. This keeps the favour available without making it free by default.",
        "The new stakeholder: I can absolutely take feedback from your head of sales. To keep the rounds countable, could your project lead consolidate everyone's comments into one response per round? That way nothing gets lost and the date stays honest.",
        "The extra round: we have used the two rounds in the scope. A third round is four hours, 320, and it moves the launch by two days. If you would rather not, I can hand over as it stands and you can take the remaining notes in-house. Both options are real, which is why the client picks one.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "A four-week website project is agreed at 4,000 for five pages, two rounds and one approver, with delivery on the 28th. In week two the client asks for a pricing page, a blog index and a chat widget. None of the three is in the scope.",
        "Handled as three requests: the pricing page is quoted at six hours and two days of date, the blog index at four hours and one day, and the chat widget is declined with a suggestion, because installing third-party scripts is not something this project covers and the client's developer can add it in an afternoon.",
        "The client takes the pricing page, defers the blog index to phase two, and accepts the recommendation on the widget. The invoice at the end is 4,480, the date has moved by two days and both parties knew why. The version where all three were absorbed quietly ends with a project delivered four days late, an invoice for 4,000 and a freelancer who has learned to dread the client's messages.",
      ],
    },
    {
      heading: "When the client says it should be included",
      paragraphs: [
        "Sometimes they will argue, and sometimes they will be right. If the request is genuinely implied by what was sold, include it and say so: you are right, that is covered by the content migration, I will fold it in. That costs you nothing and buys a great deal of trust.",
        "If it is not implied, hold the line once, calmly, and point at the document rather than at your memory: the scope lists five pages and two rounds; the sixth page is the only thing outside it. Then offer the smallest version that fits the budget. What you must not do is argue about intent, because a conversation about who said what cannot be won and does not need to be had when there is a written scope.",
        "If the client repeats the argument after that, the conversation is no longer about the page. It is about whether the project is viable as priced, and the honest answer is a scope review: here is what 4,000 covers, here is what the project now needs, and here is the difference. That is a harder conversation, and it is much better held in week three than in week seven.",
      ],
    },
    {
      heading: "Spotting it early",
      paragraphs: [
        "Creep is cheapest to handle in the first hour. The signals are a message that begins with a small favour, a request that arrives from someone who was not in the kick-off, or a deliverable that gets described differently each time it is mentioned. When you see one, respond the same day with the three-part sentence, while the request is still small enough to price.",
        "Keep a simple log of requests and answers, even if it is a list in the project record. Two lines per request, dated, is enough to show at invoice time that the extra work was agreed rather than assumed. It also makes the pattern visible to you, which is often the moment you realise the project needs re-scoping rather than another change request.",
      ],
    },
    {
      heading: "What not to do",
      paragraphs: [
        "Do not absorb the work quietly and mention it at the end, because the invoice will look like a surprise and the client will feel ambushed. Do not refuse without an alternative, because a no with no path forward ends the conversation. Do not blame the client for not knowing a boundary you never showed them, and do not discount the change so heavily that the process stops being worth having.",
        "Do not use the phrase scope creep in front of the client. It sounds like an accusation, and the client's experience is that they asked for something sensible. Talk about the scope, the date and the cost, and let the words do the work.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Should I charge for small changes? Not always. Set a threshold, such as anything under thirty minutes, and absorb it deliberately rather than resentfully. The point is that the decision is yours.",
        "What if the client refuses to pay for any change? Then the project has a fixed scope and a fixed date, and the answer to new requests is that something else has to come out. Offer the swap rather than the refusal.",
        "Does a change request ruin the relationship? A priced change with a choice attached usually improves it, because it shows the client you take their request seriously enough to plan it.",
        "What if I already absorbed the work? Say so once, plainly, and reset the boundary for what remains. You cannot invoice the past, but you can stop repeating it.",
        "How do I price a change quickly? Use your normal rate for the hours you can estimate, and add a contingency for the ones you cannot. A slightly generous quick quote is better than a precise one that arrives next week.",
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
