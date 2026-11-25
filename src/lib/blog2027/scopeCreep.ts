import type { BlogPost } from "../blog";

export const SCOPE_CREEP_POST: BlogPost = {
  slug: "how-to-handle-scope-creep",
  title: "How to handle scope creep without losing the client",
  excerpt:
    "Scope creep is rarely a client being greedy. It is usually a boundary that was never drawn. Here is how to spot it early, price the extra work without an argument, and keep the relationship intact.",
  date: "2026-11-25",
  readMinutes: 12,
  links: [
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "How to write a change request", to: "/blog/how-to-write-a-change-request" },
    { label: "The out-of-scope clause", to: "/blog/out-of-scope-clause" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Scope creep has a reputation as a client problem, and it is worth starting by disagreeing. In most projects the creep begins with a small, reasonable request that the freelancer accepts because saying no feels disproportionate. A logo adjustment here, an extra section there, one more round of revisions because the feedback arrived late. Each one is trivial. Together they add a week, and the week is unpaid.",
        "The client is not usually trying to extract free work. They are buying an outcome and they do not know where the line is, because nobody drew it. That is the freelancer's job, and it is a job that has to be done before the work starts, not in the moment the request arrives. This article covers how to draw the line, how to spot a creep early, and how to say the awkward sentence in a way that keeps the relationship.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Define what is included in terms of deliverables and quantities, define what is not included, define how many revision rounds each stage gets, and define what happens when something new arrives. Then, when it does, respond with a choice rather than a refusal: I can add this for X, or we can swap it for Y at no extra cost.",
        "The choice is the whole technique. A refusal invites negotiation about whether the request is reasonable. A choice moves the conversation to what the client wants to spend, which is the only question that matters. The freelancer who says that is out of scope and the freelancer who says here is what it costs are offering the same information, and only one of them gets a reply.",
      ],
    },
    {
      heading: "What actually counts as scope creep",
      paragraphs: [
        "Creep is any request that changes the work without changing the price or the timeline. It comes in four shapes. Additions, where something new is wanted. Expansions, where the quantity grows: more pages, more products, more variants. Iterations, where the revision count is exceeded. And substitutions, where an approved decision is reopened after the work has moved past it.",
        "The fourth is the most expensive and the least discussed. A client who changes their mind about the homepage layout in week one costs you an hour. A client who changes it after the design has been built, the copy written and the template assembled costs a day. The scope did not grow; the timing of the change did, and the contract needs to price that difference.",
        "Not all change is creep. If the client's requirements genuinely changed because their business changed, that is new work and it should be priced, not resisted. The distinction is whether the change serves the agreed outcome or replaces it. A change that serves the outcome is usually worth accommodating, sometimes at a discount. A change that replaces it is a new project and should be treated as one.",
      ],
    },
    {
      heading: "Draw the line before the work starts",
      paragraphs: [
        "A scope section that lists what is included is necessary and not sufficient. It should also state the quantities, because quantities are where expansion happens. Five pages, two revision rounds, one brand direction, up to ten products, three stock images. A number gives you something to point at, and pointing at a number is much easier than arguing about fairness.",
        "Then state the exclusions. Copywriting, photography, hosting, migration of more than a stated number of posts, ongoing maintenance, and anything requiring a third-party licence. Exclusions are not an insult to the client. They are the part of the proposal that lets the client see what they are buying rather than guessing what they are missing.",
        "Finally, state the change process. One sentence is enough: if something outside this scope is needed, I will send a short change request with the cost and the schedule impact, and work continues on the agreed scope until it is approved. That sentence turns every future request into a normal business event rather than an awkward conversation.",
      ],
    },
    {
      heading: "Spotting it early",
      paragraphs: [
        "Creep usually announces itself in language rather than in a formal request. While we are at it. It would be great if. Could you also just. Small words that soften a new ask. Another signal is a feedback round that introduces new material instead of responding to what was delivered: comments on the work you sent are revision, comments on a page that did not exist are new work.",
        "A third signal is the meeting that keeps growing. If each call adds a deliverable and none of them appears in an updated scope, the project is drifting, and the drift is invisible until the end. A one-line summary after each call, sent to the client, is the cheapest cure: to confirm, we agreed A and B, and C moves to the next phase.",
        "The fourth signal is your own reluctance to raise an invoice. When a project feels unpaid for, it usually is. That feeling is data, and it is worth checking against the scope before it becomes resentment.",
      ],
    },
    {
      heading: "The sentence that handles the request",
      paragraphs: [
        "When the request arrives, do three things in one message. Acknowledge it as a good idea, because most of them are. Put it in context: that is outside what we scoped, and here is why it matters. Offer the choice: I can add it for X and it moves delivery by Y, or we can swap it for Z and keep the date.",
        "In practice: that is a good thought, and it is outside the five pages we scoped. I can add the pricing page for 450 and move delivery by three days, or we can replace the team page with it and keep the date. Which is more useful? That message takes two minutes to write and it converts a potential free week into a decision the client can make in one line.",
        "The alternative, a flat no, is almost always the wrong move in a healthy relationship. The alternative on the other side, silent acceptance, is worse. It teaches the client that the scope is elastic, and it makes the next boundary harder to draw, because now you are changing the rules mid-project.",
      ],
    },
    {
      heading: "When the client says it should be included",
      paragraphs: [
        "Sometimes the client pushes back, and sometimes they are right. If the request is genuinely implied by what was promised, include it and say so. That builds more trust than winning the argument. If it is not implied, restate the scope in one line without defending it at length: the scope covers five pages and two rounds; the extra work is real work and I am happy to do it, priced separately.",
        "The most useful move at this point is to put the decision in writing with a number attached. A short change request, even three lines, changes the nature of the conversation. It is no longer one person asking for a favour and another refusing; it is two businesses agreeing a variation. Most clients accept a clear number, and the ones who do not were going to be difficult throughout.",
        "There is one situation where absorbing the cost is correct: when the creep was caused by your own miscommunication. If the scope was ambiguous and the client reasonably read it the other way, the extra work is yours to carry. Say so, do it, and fix the wording in your template so the next client does not hit the same ambiguity.",
      ],
    },
    {
      heading: "Making it a habit",
      paragraphs: [
        "The projects that stay in scope are the ones with a rhythm. A short written recap after each call. A visible list of what is in flight and what is next. A single place where the client can see what was approved and when. None of that requires project management software; a shared document and a consistent habit will do.",
        "The rhythm also makes the change request normal. If the client has seen a scope document, a recap and a delivery note, a change request is simply the next document in a series, not a surprise invoice. The freelancer who only appears at the end with a bill is the one who has the argument.",
        "And keep the evidence. When a client asks whether something was included, the answer should be a link to the scope, not a memory. That is the practical argument for keeping the proposal, the contract, the form answers and the invoices in one thread per client: the scope is not a document you file and forget, it is the thread itself.",
      ],
    },
    {
      heading: "What not to do",
      paragraphs: [
        "Do not absorb the work and then resent the client. The resentment leaks into the next project and it is always more expensive than the conversation you avoided. Do not use the phrase scope creep in front of the client; it sounds like an accusation, and it turns a business decision into a character judgment. Do not send a large invoice for unbilled extras at the end of a project without warning; that is the single fastest way to lose a client who would have paid happily at the time.",
        "Do not confuse a revision with a creep. A client who is unhappy with the third draft is not necessarily exceeding the scope; they may be within their two rounds and still unsatisfied. The answer there is a conversation about the brief rather than a change request, and the earlier it happens the cheaper it is.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How many revision rounds should I include? Two is the common default, with a third priced. The number matters less than stating it, and than defining what a round is: one consolidated set of feedback, delivered at once.",
        "Should I charge for a change the client thinks is small? Charge for the work, not for the size of the request. A five-minute change that requires rebuilt files is not small. A small change that fits inside the round is part of the round.",
        "What if I already agreed to the extra work and now want to bill it? You can raise it once, honestly, as a scope review: this has grown beyond what we scoped, and here is the additional cost for the remaining work. Do not retroactively bill work you already delivered without a conversation.",
        "Does a change request need a signature? A written approval in the thread is normally enough for small changes. Use the contract or a signed variation for anything that changes the total significantly.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Scope creep is a design failure before it is a client failure. Draw the line with quantities and exclusions, state the change process, and answer every new request with a choice rather than a refusal. The relationship survives because the client is never told no; they are told what the yes costs. The freelancer who can do that keeps the work, the client and the margin.",
      ],
    },
  ],
};
