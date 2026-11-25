import type { BlogPost } from "../blog";

export const DISCOVERY_CALL_POST: BlogPost = {
  slug: "how-to-run-a-discovery-call",
  title: "How to run a discovery call that produces a brief you can use",
  excerpt:
    "A discovery call is not a pitch and not an interview. It is the twenty minutes where you find out whether the project is real, what it is worth and how it will be decided. Here is a structure that leaves you with a brief.",
  date: "2026-11-25",
  readMinutes: 12,
  links: [
    { label: "Questions to ask a new client", to: "/blog/questions-to-ask-a-new-client" },
    { label: "Client onboarding checklist", to: "/blog/client-onboarding-checklist" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Most discovery calls end the same way: the client talks for forty minutes, you say something encouraging, and you promise to send a proposal. Then you sit down to write it and realise you do not know who signs, what the budget is, or what the client would accept as done. The call produced warmth and no information.",
        "A good discovery call has a shape. It opens with the client's words, moves through the constraints that will decide whether the project is possible, and ends with an agreement about what happens next. It is not a pitch, although you will be judged in it. It is not an interrogation, although you will ask hard questions. It is a short, structured conversation that ends with enough to write a proposal that lands.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Spend the first five minutes letting the client describe the problem in their own words without interrupting. Spend the next ten on four constraints: the decision, the money, the deadline and the history. Spend the last five confirming what you heard, what happens next and when. Then send a short written recap within an hour.",
        "The ratio is the point. Most calls spend all their time on the problem and none on the constraints, which is why the proposal has to guess at the price and the timeline. Five minutes of constraints is worth more than an hour of describing the solution, because the constraints decide whether there is a project at all.",
      ],
    },
    {
      heading: "Before the call",
      paragraphs: [
        "Ten minutes of preparation changes the conversation. Look at the client's current website, their most recent launch, and anything public about the business. You are looking for two things: what they already have, and the gap they are likely to be describing. Walking in with a specific observation is the cheapest credibility you can buy.",
        "Write four questions on a card and keep it in front of you. Who decides? What is the budget? When does it need to be live? What has been tried? Those four carry most of the value, and having them written prevents the call from drifting into a friendly chat about fonts.",
        "Decide in advance what you will not do on the call. Do not quote a fixed price unless the scope is genuinely clear, and do not promise a date you have not checked against your calendar. A number given in a call becomes the number in the client's head, and revising it upwards later is much harder than giving it in writing the next day.",
      ],
    },
    {
      heading: "Minutes 0 to 5: the problem in their words",
      paragraphs: [
        "Open with a question that invites a story rather than a specification. What made you start looking for someone now? Or: what is happening that made this urgent this month? The answer tells you the trigger, and the trigger is usually the real brief.",
        "Then let them talk. Do not correct, do not improve, and do not start describing what you would do. Take notes in their language, because their phrases will be more persuasive in the proposal than your paraphrase. If they say the site feels like a brochure from 2019, that is the line to use.",
        "Listen for the thing they are not saying. A client who spends a long time on internal politics is describing a decision problem. A client who keeps returning to the previous supplier is describing a trust problem. A client who cannot name a single outcome is describing a project that has not been thought through, which is not a reason to decline, but is a reason to scope carefully.",
      ],
    },
    {
      heading: "Minutes 5 to 15: the four constraints",
      paragraphs: [
        "Ask who makes the final decision, and get a name. Then ask who else reviews the work before it is approved. The second question is the one that reveals the hidden stakeholder, and the hidden stakeholder is the most common cause of a stalled project.",
        "Ask whether the budget is approved and what range they had in mind. Do not soften it into a question about investment levels. Ask it plainly, then stop talking. A client who has a number will usually give it, and a client who will not give a number has told you something useful about how the project will be run.",
        "Ask when it needs to be live, and why that date. A date with a reason is real; a date without one is a preference. If the reason is a trade show or a funding announcement, you know how much slippage is tolerable and who will feel it.",
        "Ask what has already been tried. This is where the useful history lives: the agency that disappeared, the template that was abandoned, the internal build that nobody maintains. The failure pattern is usually the thing the proposal must solve, and it is rarely in the brief.",
      ],
    },
    {
      heading: "Minutes 15 to 20: close with an agreement",
      paragraphs: [
        "Summarise what you heard in three sentences, using their words. The site is being rebuilt because the current one undersells the work, the deadline is the trade show in March, and the decision sits with you and the finance director. Ask if that is right, and let them correct it. The correction is often the most honest sentence of the call.",
        "Then say what happens next and when. I will send a proposal by Thursday with two options and a timeline. If it is useful, we can have a fifteen-minute call to walk through it. Naming the day matters more than naming the format, because it sets the expectation that a decision is coming.",
        "Ask one closing question: is there anything I should know that we have not covered? It is an invitation for the thing the client was too polite to raise, and it is surprising how often it produces the real objection.",
      ],
    },
    {
      heading: "Within the hour: the recap",
      paragraphs: [
        "Send a short written recap the same day. Five lines: the problem as you understood it, the deadline, the decision-maker, the budget range if given, and the date the proposal will arrive. Ask them to correct anything that is wrong. This is not admin; it is the moment the project becomes documented rather than remembered.",
        "The recap does three things. It proves you listened, which is rarer than it should be. It creates a record that the proposal can reference. And it surfaces misunderstandings while they are cheap. A client who replies with one correction has just saved you a rewrite.",
        "Keep the recap in the same thread as the proposal. When the project starts, the recap becomes the first entry in the brief, and the brief becomes the scope. A client record that begins with a clear recap is much easier to work from than one that begins with a forwarded email chain.",
      ],
    },
    {
      heading: "Mistakes that cost the project",
      paragraphs: [
        "Pitching too early. The moment you start describing your process, the client stops describing their problem, and you leave without the constraints. Save the solution for the proposal, where it can be priced and read.",
        "Talking about price before scope. A number offered in a call is usually heard as a ceiling, and everything afterwards is a negotiation about what fits under it. If the client pushes for a number, give a range and tie it to scope: projects like this usually land between X and Y depending on how many pages and how much copy you need.",
        "Not asking about the decision. A warm call with the wrong person is the most expensive hour in the pipeline, because it produces a proposal that goes nowhere. Ask early and lightly, and if the answer is I will pass it on, ask what happens after that.",
        "Ending without a next step. A call that ends with great, I will be in touch is a call that will be followed by two weeks of silence. Name a date for the proposal, and put it in the calendar before you hang up.",
      ],
    },
    {
      heading: "Turning the call into a proposal",
      paragraphs: [
        "The proposal should open with the client's problem in the client's words, then state the outcome, then the scope and the price, then the timeline and the next step. The discovery call supplies all four. If you find yourself inventing the problem statement, the call did not work.",
        "Include the constraint you learned, because naming it builds trust. You said the finance director signs anything above 5,000, so I have included a phased option that stays under that for the first stage. A proposal that shows you were listening is more persuasive than one that shows how much you know.",
        "Then send it while the call is still fresh. A proposal that arrives the next day, referencing the conversation, converts far better than one that arrives a week later when the client has forgotten what they said. Speed is a form of quality in this part of the process.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should a discovery call be? Twenty to thirty minutes is enough for most freelance projects. Longer calls usually mean the scope is unclear or the client is using the call to think out loud, which is fine, but it should not become the default.",
        "Should I send a proposal after every call? No. Send one when you know the decision, the budget range, the deadline and the scope. If you are missing two of those, ask one more question before you write anything.",
        "What if the client cancels the call? Offer two specific times and ask them to pick one. A cancellation is not a rejection, but a second one usually is a signal about priority.",
        "Do I need to record the call? Only with consent, and rarely necessary. A written recap sent the same day is more useful than a recording nobody re-listens to.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A discovery call is five minutes of listening, ten minutes of constraints and five minutes of agreeing what happens next. Prepare four questions, take notes in the client's words, close with a date, and send a recap the same day. Do that and the proposal writes itself, because the call has already produced the brief.",
      ],
    },
  ],
};
