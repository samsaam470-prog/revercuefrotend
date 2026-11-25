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
      heading: "What every follow-up should contain",
      paragraphs: [
        "Three jobs, three lines. Restate the decision in one clause: the proposal for the rebuild, the two packages at 4,200 and 6,800. Add something: a date, an answer, a smaller option. Name a default: if I do not hear back by Friday I will assume the timing has moved. What it must not do is apologise for existing. Sorry to bother you, just checking in and I know you are busy all signal that the message has no value, and they invite the client to treat it as noise.",
        "Do not introduce a new decision either. A message with a discount, a new package, a different timeline and a question has replaced one open decision with four, and the one that gets answered is always the one with a single small next step.",
      ],
    },
    {
      heading: "The stopping rule",
      paragraphs: [
        "Stop earlier if the client says the timing is wrong, and immediately if they say no. Go later only if they gave you a real date: we decide after the board meeting on the 12th is an invitation to follow up on the 13th. When you stop, say so in one short message and leave the door open. A surprising number of projects come back through it months later, with a new budget.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is three follow-ups too many? Three short messages over three weeks is less contact than one newsletter, and the client asked you for a price. What reads as too many is repetition without value.",
        "Should I lower the price in a follow-up? Only if you learned something that justifies it, such as a reduced scope. A discount sent into silence teaches the client that waiting produces a better price.",
        "What if the client asks something the proposal already answers? Answer it again in one line and point to the section. They skimmed, which is normal. Correcting them is not the job.",
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
