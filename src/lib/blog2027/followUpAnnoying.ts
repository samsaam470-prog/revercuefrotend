import type { BlogPost } from "../blog";

// Cluster A — the silent client.
// Search intent: people who have sent a proposal and are now waiting, or who
// have lost work to silence and want to know why. These are not buyer queries,
// so the product is mentioned once, at the end, and only where it is relevant.

export const FOLLOW_UP_ANNOYING_POST: BlogPost = {
  slug: "how-to-follow-up-on-a-proposal-without-being-annoying",
  title: "How to follow up on a proposal without being annoying",
  excerpt:
    "A follow-up is not a reminder that you exist. It is a small piece of help that makes the decision easier. Here is the schedule, the wording and the stopping rule, plus what to do when the silence is really a no.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "How to make your proposal speak for you", to: "/blog/how-to-make-your-proposal-speak-for-you" },
    { label: "Why clients go quiet after a proposal", to: "/blog/why-clients-go-quiet-after-a-proposal" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "You sent the proposal on Tuesday. It is Thursday. You have read it three times, changed nothing, and are now writing the fourth version of a message that says, in effect, did you see it. Most freelance work is lost here, and it is lost to a follow-up problem rather than a pricing problem. The client did not decide against you; they did not decide at all, and your next message decides whether they get a reason to act or a reason to avoid you.",
        "Following up well is a small set of rules, and none of them require you to be pushy. They are about timing, about what each message adds, and about knowing when to stop.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Follow up three times over about three weeks, and make every message add something the client did not have before: an answer to the question they are most likely asking, a smaller first step, or a date after which you will assume the timing is wrong. Then stop, and say that you are stopping. A message that only asks whether the proposal was read hands the work of deciding back to the client without giving them anything new, which is why it feels annoying to send and reads as pressure to receive.",
      ],
    },
    {
      heading: "Why the follow-up is usually not the problem",
      paragraphs: [
        "Separate two failures that look identical from your side. The first is a decision that has not happened: the client is busy, the proposal sits in a queue, and a well-timed message moves it. The second is a decision that has happened and has not been communicated: the price was too high, the scope was not what they wanted, or the work went elsewhere. The first is fixed by the next message. The second is only fixed by the next proposal.",
        "You can tell the difference from what the client did rather than what they said. Someone who opened it twice and asked a question is still deciding. Someone who never opened it is not deciding about your proposal at all. A proposal that reports views tells you which situation you are in; a PDF attachment tells you nothing.",
      ],
    },
    {
      heading: "A schedule you can keep",
      paragraphs: [
        "Day zero is the send, and it is where most silence begins. Name the next step and a date in the proposal itself: I will check in on Thursday, or the price holds until the 14th. That line does more for your reply rate than any follow-up, because it says a decision is expected and when.",
        "Day two or three is the first follow-up. Keep it to two or three sentences and add one useful thing: an answer to the question you expect, a note about availability, a link to relevant work. Do not ask for a status update, and do not apologise for writing.",
        "Day seven to ten is the second, where you narrow the ask. Offer the smallest version that is still useful, such as a call to talk through scope, a revised package, or a later start date. A smaller question is easier to answer than a large one, and it keeps the thread alive without another round of did you see it.",
        "Day fourteen to twenty-one is the last, and it closes the loop. Say plainly that you are assuming the timing is not right, that the proposal stays on file, and that they can come back when it is. This message gets more replies than any other, because it is the first one where doing nothing has a consequence.",
      ],
    },
    {
      heading: "The three messages, written out",
      paragraphs: [
        "First, day two: Hi Sam. One thing I should have said in the proposal, the start date can move to the week of the 8th if that helps the trade show, and the price stays the same. If it is easier to talk it through, I have twenty minutes on Thursday.",
        "Second, day eight: Hi Sam. If the full build is more than you want to commit to now, I can do the homepage and the pricing page first for 2,900, with the rest in January. Would that be a better place to start?",
        "Third, day eighteen: Hi Sam. I have not heard back, so I am assuming the timing has moved and I will close this off for now. The proposal is saved and the price holds for thirty days from today. If it comes back onto the agenda, just reply here and I will pick it up.",
        "Read them together and the difference from a chase is obvious. Each message contains a decision the client can make in one word, and none of them asks the client to explain themselves.",
      ],
    },
    {
      heading: "What every follow-up should contain",
      paragraphs: [
        "Three jobs, three lines. Restate the decision in one clause: the proposal for the rebuild, the two packages at 4,200 and 6,800. Add something: a date, an answer, a smaller option. Name a default: if I do not hear back by Friday I will assume the timing has moved. What it must not do is apologise for existing. Sorry to bother you, just checking in and I know you are busy all signal that the message has no value, and they invite the client to treat it as noise.",
        "Do not introduce a new decision either. A message with a discount, a new package, a different timeline and a question has replaced one open decision with four, and the one that gets answered is always the one with a single small next step.",
      ],
    },
    {
      heading: "The subject line matters more than you think",
      paragraphs: [
        "Replies to a thread come faster than replies to a new email, so reply to your own proposal email rather than starting a new one. The subject keeps the context and the history in one place, which is what you want when the invoice is eventually questioned.",
        "When you must start a new thread, name the project and the decision: Kingsway site, two options, decision by the 12th. A subject that states the decision is easier to act on than one that says following up, which tells the client only that the message is about you.",
      ],
    },
    {
      heading: "If they say the price is too high",
      paragraphs: [
        "Do not discount immediately, and do not defend the number. Ask one question: is it the total, or the timing of the payments? The answer decides everything. If it is the total, offer a smaller scope at a lower price, and keep the rate intact. If it is the timing, offer a deposit and two instalments.",
        "If the client names a budget below your floor, say what that budget buys rather than what it does not. For 3,000 I can do the homepage and the contact page well, or the whole site at template quality. That is honest, it preserves your rate, and it gives the client a real choice instead of a rejection.",
      ],
    },
    {
      heading: "If they say they will get back to you",
      paragraphs: [
        "That sentence is the most common way a decision is deferred indefinitely. Accept it and attach a date: of course, when should I check in? If the client will not name a date, name one yourself and ask them to correct it: I will follow up on the 12th unless that is too soon.",
        "Put the date in your calendar and in the client record, and keep it to one message on that date. The point of the date is that the loop has an owner, and after the date you can close it without ambiguity.",
      ],
    },
    {
      heading: "The stopping rule",
      paragraphs: [
        "Stop earlier if the client says the timing is wrong, and immediately if they say no. Go later only if they gave you a real date: we decide after the board meeting on the 12th is an invitation to follow up on the 13th. When you stop, say so in one short message and leave the door open. A surprising number of projects come back through it months later, with a new budget.",
        "Write the outcome in your notes either way. Three follow-ups and no reply is a fact about the pipeline, and a quarter of those facts tells you whether your proposals are reaching the wrong person or describing the wrong project.",
      ],
    },
    {
      heading: "What not to do",
      paragraphs: [
        "Do not follow up on a different channel because email went unanswered. Moving to a direct message or a phone call reads as escalation, and escalation is what makes a follow-up annoying even when the content is fine.",
        "Do not send a read receipt request, a calendar invite for a call nobody agreed to, or a message that begins with a question about whether they are still interested. All three ask the client to do emotional work, and the client's alternative is to ignore them.",
        "Do not let the follow-up contradict the proposal. If the proposal said the price holds until the 14th, do not quietly change it on the 10th. Consistency is the reason the client believes the rest of the document.",
      ],
    },
    {
      heading: "When the silence is your fault",
      paragraphs: [
        "Some proposals go quiet because of something you did. You promised a follow-up and forgot. You sent a revised price and never confirmed it. You missed the call you proposed. The client is not avoiding you; they are waiting for you to do what you said, and the silence is the gap between your words and your calendar.",
        "Fix it in one message that owns the gap without over-explaining: I said I would send the revised scope on Friday and I did not, so here it is. No apology paragraph, no excuses about workload, and no request for sympathy. Clients forgive a missed date much faster than they forgive a long explanation of one.",
      ],
    },
    {
      heading: "The four-line check before you send",
      paragraphs: [
        "Read the draft and answer four questions. Does it name the specific project? Does it add one thing the client did not already have? Does it contain exactly one request? Does it end with a date or a default? If any answer is no, the message is not ready, and the missing line is usually the one that makes the client able to act.",
        "Then cut it by a third. Almost every draft follow-up is improved by removing the sentence that explains why the client should reply, because that sentence is about your need and the client can hear it.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is three follow-ups too many? Three short messages over three weeks is less contact than one newsletter, and the client asked you for a price. What reads as too many is repetition without value.",
        "Should I lower the price in a follow-up? Only if you learned something that justifies it, such as a reduced scope. A discount sent into silence teaches the client that waiting produces a better price.",
        "What if the client asks something the proposal already answers? Answer it again in one line and point to the section. They skimmed, which is normal. Correcting them is not the job.",
        "Should I follow up on a Friday? Tuesday to Thursday mornings get the best replies. A Friday afternoon message is read on Monday with everything else, or not at all.",
        "What if they reply after I have closed the loop? Pick it up as though no time had passed, and confirm the price and the dates before restarting. The gap is not a reason to reopen the negotiation.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Follow-up is the part of the sale where you make the decision cheap to make. Send fewer messages, make each one useful, name a date, and close the loop out loud when you stop. Fix the last paragraph of the proposal too: a document that ends with a date and a next step produces fewer silences on its own.",
      ],
    },
  ],
};
