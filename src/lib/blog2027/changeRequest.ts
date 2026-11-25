import type { BlogPost } from "../blog";

// Cluster C, article two: the artefact. Four lines, one example, and the
// socially awkward parts (sending it, chasing it) handled explicitly.

export const CHANGE_REQUEST_POST: BlogPost = {
  slug: "how-to-write-a-change-request",
  title: "How to write a change request: a four-line format that ends the argument",
  excerpt:
    "A change request does not need a form, a tool or a meeting. It needs four lines that both sides can read in ten seconds: what changed, what it costs, what it does to the date, and what happens next.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "How to handle scope creep", to: "/blog/how-to-handle-scope-creep" },
    { label: "The out-of-scope clause", to: "/blog/out-of-scope-clause" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The moment a change is agreed in conversation, it becomes a memory, and memories disagree. Three weeks later the client remembers that the extra page was included and you remember quoting for it, and the argument is not about the page. It is about whose record is authoritative. A change request exists to make sure that question never arises.",
        "It does not need software. It needs a message the client can read in ten seconds and reply to with one word, and it needs to be sent before the work rather than after. Four lines are enough, and the format below is the one that survives being forwarded to a finance team.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Write four lines: what changed, the cost in hours or money, the effect on the delivery date, and the single question you need answered. Send it in the same thread as the original scope, ask for a reply in writing, and do not start the work until you have one. The whole message should fit on a phone screen.",
      ],
    },
    {
      heading: "The four lines",
      paragraphs: [
        "Change: adding a sixth page, the pricing page, with the three plan tables. Cost: six hours, 480, invoiced with the final milestone. Date: delivery moves from 14 November to 19 November. Next: reply approve and I will add it to the scope and start on Monday.",
        "Each line answers a question the client would otherwise have to ask. What is it. What does it cost. What does it do to the thing I care about. What do you need from me. A change request missing any one of the four produces a reply that asks for it, which is a round trip you did not need to spend.",
      ],
    },
    {
      heading: "An example you can adapt",
      paragraphs: [
        "Hi Sam. Following our call, this is the change we discussed. Change: the homepage now includes a testimonial carousel, which was not in the agreed scope of five static sections. Cost: four hours of design and development, 320, added to the final invoice. Date: delivery moves from the 14th to the 17th. Next: reply approve and I will start it tomorrow; if you would rather keep the date, we can leave the carousel for phase two.",
        "The last clause is the one most people leave out, and it is the one that gets a fast reply, because it offers a way to say no without rejecting the idea. A change request with only one possible answer is a notification, not a decision.",
      ],
    },
    {
      heading: "When to send one",
      paragraphs: [
        "Send it when the request adds a deliverable, a stakeholder, a round of revision, or a change to something already approved. Send it before any work begins, even if the work is small, because the sequence is what makes the record credible. Send it in writing even when the client agrees on a call: particularly then, because a verbal yes is the version most likely to be remembered differently.",
        "The exception is genuinely trivial work, where the cost of the paperwork exceeds the work. Pick a threshold in advance and say what it is, so the boundary is a policy rather than a mood.",
      ],
    },
    {
      heading: "How to send it without making it awkward",
      paragraphs: [
        "Do not apologise for the process and do not explain your margins. Frame it as protecting the date rather than protecting your fee: the reason we do this is so the launch date stays honest. That is true, and it is also the version clients repeat to their own team without embarrassment.",
        "Keep it in the same thread as the proposal and the scope, so the history is in one place. If your tools support it, attach the change to the project rather than sending a standalone email that will be lost by Friday. And reply to a verbal request with the written version the same day, with one line: putting this in writing so we both have it.",
      ],
    },
    {
      heading: "What to do when the client ignores it",
      paragraphs: [
        "If the request was made verbally and the written version goes unanswered, do not start the work. Send one reminder with a date: I have not heard back on the change, so I am assuming it is on hold and keeping the original date. That message is not a threat; it is a statement of what will happen by default, and defaults get answers.",
        "If the client says proceed but never replies in writing, reply once more with a deadline and a consequence: I will take this as approved unless you say otherwise by Thursday, and the cost will appear on the next invoice. Silence after a clear statement is a weak but usable record, and it is much better than no record at all.",
      ],
    },
    {
      heading: "Keeping the record",
      paragraphs: [
        "One folder, one thread, or one project in your tools, containing the scope, every change request and every approval. The point is not tidiness; it is that at invoice time you can show the client a list of what was added and when they approved it. That list settles most disputes before they become disputes.",
        "Add a line to the final invoice that references the changes by date. Clients pay faster when the invoice matches a story they already know, and a change log is that story.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Does a change request need a signature? A written approval in the thread is usually enough for small changes. For larger ones, a signature or a formal acceptance in your contract tool is worth the extra minute.",
        "Should I charge for the change request itself? No, unless the request needs investigation. Price the work, not the paperwork, or clients will stop asking and start assuming.",
        "What if the client approved verbally and now disputes it? Point at the dates and the messages, not at the conversation. That is the entire reason the four lines exist.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Four lines, sent before the work, in the same thread, with one question and one easy way to say no. That is a change request. It takes two minutes, it prevents the argument that costs a weekend, and it makes the final invoice a document the client recognises rather than one they have to reconstruct.",
      ],
    },
  ],
};
