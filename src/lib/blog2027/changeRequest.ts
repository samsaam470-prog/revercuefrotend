import type { BlogPost } from "../blog";

export const CHANGE_REQUEST_POST: BlogPost = {
  slug: "how-to-write-a-change-request",
  title: "How to write a change request: a four-line format that ends the argument",
  excerpt:
    "A change request does not need a template library. Four lines, a number and a date will do it. Here is the format, an example, and how to send one without making the client feel ambushed.",
  date: "2026-11-25",
  readMinutes: 11,
  links: [
    { label: "How to handle scope creep", to: "/blog/how-to-handle-scope-creep" },
    { label: "The out-of-scope clause", to: "/blog/out-of-scope-clause" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The phrase change request sounds like something a consultancy sends. In practice it is the shortest document in a freelance business, and the one that prevents the most resentment. It exists to answer a single question in writing: this new thing is not in what we agreed, so what happens now.",
        "Most freelancers avoid writing one because it feels heavy. A formal document suggests a dispute, and a dispute is the last thing you want with a client you like. But the change request is not a dispute document. It is a decision document, and the lighter it is, the more likely it is to be read and approved in the same hour.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Four lines: what changed, what it costs, what it does to the schedule, and what you need from the client to proceed. Add a date and a total, and send it in the same thread as the original scope. That is a complete change request, and it takes about three minutes to write.",
        "If the client approves in writing, the change is now part of the agreement. If they do not, the original scope still stands and nobody has to argue about what was implied. Either outcome is better than the work being done silently and invoiced later, which is the scenario the document exists to prevent.",
      ],
    },
    {
      heading: "The four lines",
      paragraphs: [
        "Line one, the change: one sentence naming what is different, in the client's language. Add a sixth page, the pricing page, to the site. Not scope variation for additional template. The client should recognise the request immediately.",
        "Line two, the cost: a number and what it covers. 450, covering the design, build and one round of feedback. If the amount is an estimate, say so and give the range and the trigger for the upper end. An estimate with no ceiling is the thing clients fear, and it is usually the reason a change request gets stuck.",
        "Line three, the schedule: the impact in days or weeks, and what it does to the delivery date. Three working days, moving delivery from 12 December to 17 December. If there is no impact, say that too, because no schedule impact is the most persuasive line in the whole document.",
        "Line four, the approval: what you need, and what happens if you do not get it. Reply to confirm and I will start on Monday. If I have not heard by Friday I will continue with the agreed scope and we can add this later. That last sentence is what stops the request from becoming a stall.",
      ],
    },
    {
      heading: "An example you can adapt",
      paragraphs: [
        "Subject: Change request — pricing page",
        "Hi Sam. Following Thursday's call, here is the change request for the pricing page. Change: one additional page with three plan cards, a comparison table and one FAQ section. Cost: 450, covering design, build and one round of feedback. Schedule: three working days, moving delivery from 12 December to 17 December. Approval: reply to confirm and I will add it to this week's work. If I have not heard by Friday, I will continue with the five agreed pages and we can schedule this for January.",
        "That is the whole document. It fits in an email, it can be read on a phone, and it gives the client everything needed to decide without a meeting. The important detail is the last sentence: it makes silence a valid answer, which removes the pressure that causes clients to avoid replying to money questions.",
      ],
    },
    {
      heading: "When to send one",
      paragraphs: [
        "Send one whenever the work changes and the price does not, or the price changes and the scope does not. In practice that means four situations: a new deliverable, an increase in quantity, additional revision rounds beyond the agreed number, and a reopened decision after the work has moved past it.",
        "Do not send one for a clarification, a correction of your own error, or a small adjustment inside a revision round. Those are part of doing the job well, and turning them into paperwork makes the process feel adversarial. The test is whether the request changes the amount of work meaningfully, not whether the client used the word extra.",
        "Send it promptly, in the same conversation where the request was made. A change request that arrives three weeks later reads as an ambush, and the client will reasonably ask why it was not raised at the time. The same document sent within the hour reads as good process.",
      ],
    },
    {
      heading: "How to send it without making it awkward",
      paragraphs: [
        "Lead with agreement, not with the boundary. That is a good idea, and it is outside the five pages we scoped, so here is what it would take. The client hears yes before they hear cost, and the cost lands as information rather than as a refusal.",
        "Keep it in the existing thread. If the scope, the proposal and the conversation live in one place, the change request is the next message rather than a new subject line. That context does most of the persuasion, because the client can see what was agreed without being reminded in a way that feels like a reproach.",
        "Offer an alternative whenever there is one. Adding the pricing page and moving delivery, or swapping it for the team page and keeping the date. A choice turns a yes or no into a preference, and preferences are much easier to state. It also signals that you are protecting the client's budget rather than your own invoice.",
      ],
    },
    {
      heading: "What to do when the client ignores it",
      paragraphs: [
        "Silence after a change request is common, because the client is deciding whether they want the thing enough to pay for it. Do not start the work. Continue with the agreed scope, and say so in one line at the next natural checkpoint: I have kept the pricing page out for now, so the delivery date stays at 12 December.",
        "If the client later asks why the page is missing, the answer is the thread, not an argument. This is the reason the four-line format includes a default: it makes the outcome predictable without requiring another conversation. A client who wanted the page will reply. A client who did not will be quietly relieved that the decision was made for them.",
        "If the client approves but the work grows again inside the same change, send a second change request. Two small requests are easier to accept than one large revision to an earlier one, and they keep the record honest.",
        "There is one more habit worth building: price the change from a unit you already use. If an extra page is 450 in this request, it should be 450 in the next one, and the client should be able to predict it without asking. Predictable unit prices do two useful things. They make a small request easy to approve, because the client already knows the number, and they stop the negotiation that happens when every change is priced from scratch. Write the unit prices into your template, keep them current, and quote from them rather than from memory.",
      ],
    },
    {
      heading: "Keeping the record",
      paragraphs: [
        "A change request is only useful if it can be found later. Keep it with the contract, not in a separate folder of emails. When the project ends and the invoice is questioned, the chain should read: proposal, contract, change request, approval, delivery, invoice. Each document should reference the one before it.",
        "If your contract is signed and stored in the same place as the proposal, attaching the change request to that thread is a two-minute job. If your documents live in five different apps, it is not, which is often why freelancers skip the change request and absorb the cost instead. The tooling is not the point, but it does decide whether the good habit survives a busy month.",
        "Keep the approval too, not just the request. An approved change request with a reply that says agreed is a variation to the contract. A request with no reply is just a message, and it will not help you if the client later disputes the invoice.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Does a change request need to be a separate document? No. An email with the four lines is a valid change request, and it is more likely to be approved than a PDF. The format matters more than the file type.",
        "Should I charge a deposit on extra work? For a small change, no. For a change that is large enough to be a second project, yes, and treat it like one.",
        "What if the client refuses to pay for the extra work? Then the extra work does not happen, and the agreed scope is delivered. That is not a conflict; it is the change request working as intended.",
        "Can I raise a change request after the work is done? You can, but it is much harder to get approved. Raise it before you start, and if you must do it afterwards, frame it as a scope review rather than a bill.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Four lines, a number, a date and a default. A change request is not bureaucracy; it is the shortest way to keep a project honest without a difficult conversation. Send it in the thread, lead with agreement, offer a choice, and let silence mean the original scope. The client gets clarity, and you get paid for the work you actually did.",
      ],
    },
  ],
};
