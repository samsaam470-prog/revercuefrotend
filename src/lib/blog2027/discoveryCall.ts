import type { BlogPost } from "../blog";

// Cluster D, article three: the twenty-minute structure, minute by minute,
// plus the recap that turns a conversation into a brief.

export const DISCOVERY_CALL_POST: BlogPost = {
  slug: "how-to-run-a-discovery-call",
  title: "How to run a discovery call that produces a brief you can use",
  excerpt:
    "A discovery call is not a friendly chat before the real work. It is the twenty minutes that decide whether the proposal is accurate. Here is the structure, the four constraints to pin down, and the recap that does the selling.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Questions to ask a new client", to: "/blog/questions-to-ask-a-new-client" },
    { label: "Client onboarding checklist", to: "/blog/client-onboarding-checklist" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Most discovery calls fail in a way that feels like success. The conversation is warm, the client likes you, you talk for forty minutes and hang up with a good feeling and no brief. Then you write a proposal from impressions, price it from instinct, and discover in week two that the approver is someone you never spoke to.",
        "A good discovery call has a shape: five minutes on the problem in the client's words, ten on the constraints that decide the price, five on what happens next. Everything else, including the rapport, fits inside that.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Spend the first five minutes getting the client to describe the problem without using your discipline's vocabulary, the next ten pinning down the four constraints (budget range, deadline, decision-maker, and what has already been tried), and the last five agreeing what happens next and when. Send a written recap within the hour. The recap is what the proposal is built from, and it is usually what wins the work.",
      ],
    },
    {
      heading: "Before the call",
      paragraphs: [
        "Spend ten minutes looking at the client's site, their last three announcements and whatever they have already built. Note one specific observation you can make in the first minute, because it changes the tone from supplier to peer. Then write three questions you will not leave without answering, so the call has a floor even if the conversation wanders.",
        "Decide in advance whether this is a qualification call or a scoping call. They are different. A qualification call is short and mostly about money and authority. A scoping call assumes both and goes into detail. Running them together is how calls reach forty minutes and end with neither.",
      ],
    },
    {
      heading: "Minutes 0 to 5: the problem in their words",
      paragraphs: [
        "Open with one sentence about why you took the call, then ask the broadest useful question and stop talking. What is happening now that made you look for someone? Write down their phrasing verbatim, including the words that sound imprecise. Those words are the language of the proposal and, later, of the deliverable.",
        "If the client answers with a solution, ask what problem it solves. Clients arrive with a website, an app or a rebrand in mind because a solution is easier to describe than a problem. Your value in these five minutes is turning the solution back into the problem it was meant to fix.",
      ],
    },
    {
      heading: "Minutes 5 to 15: the four constraints",
      paragraphs: [
        "Budget range, even if it is a range offered by you. Deadline, and whether it is a real date or an ambition. Decision-maker, including who else has to be comfortable. And what has already been tried, because it tells you what the client believes has failed.",
        "Those four decide the shape of the proposal: a fixed date and a flexible budget is a different proposal from a fixed budget and a flexible date. Ask the follow-up that turns an answer into a fact: if we started on the 3rd, what would have to be true for the launch to happen on the 20th? That question surfaces dependencies better than any checklist.",
      ],
    },
    {
      heading: "Minutes 15 to 20: close with an agreement",
      paragraphs: [
        "Do not end with I will send something over. End with a specific next step and a date: I will send a proposal by Thursday with two options, and I will assume the 12th is the decision date unless you tell me otherwise. Then ask the one question that is awkward and useful: is there anything about this that would stop you going ahead?",
        "The answer is often a constraint you can design around, and it is always better heard now than inferred from silence later. If the client says they need to check with a partner, ask to have that partner on the next call rather than sending a proposal into a room you cannot see.",
      ],
    },
    {
      heading: "Within the hour: the recap",
      paragraphs: [
        "Four short sections: what I heard, what I am assuming, what I still need, and what happens next. Keep it under two hundred words and send it while the call is still fresh. Clients reply to recaps, and every correction you get now is a correction you do not get in week four.",
        "The recap also does quiet competitive work. Most freelancers send a proposal three days later with no summary in between, so the client's memory of the call is whatever they wrote in their own notes. A recap makes your version of the conversation the one on record, which is exactly where the brief should live.",
      ],
    },
    {
      heading: "Mistakes that cost the project",
      paragraphs: [
        "Talking for more than half the call. Quoting a number before you know the deadline. Skipping the decision-maker because the person in front of you is friendly. Treating a clear brief as a reason to skip the recap. And agreeing to send a proposal without agreeing when the client will decide, which is how a good call becomes three weeks of silence.",
      ],
    },
    {
      heading: "Turning the call into a proposal",
      paragraphs: [
        "Build the proposal from the recap, not from memory: the problem in the client's words on the first screen, the outcome in their terms, the two options that match the budget range, the date that matches their deadline, and the exclusions that match what was not discussed. If a section of the proposal cannot be traced to something said on the call, it is probably your standard copy, and the client will read it as such.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should a discovery call be? Twenty minutes for qualification, forty-five for scoping. Book the shorter slot and extend only if the constraints are still unclear.",
        "Should I charge for it? Not for a first qualification call. Charge when the output is a written brief or an audit the client keeps.",
        "What if they want a price on the call? Give a range tied to scope: projects like this usually land between 4,000 and 9,000, and I will narrow it once I know the deadline.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Five minutes on the problem, ten on the constraints, five on the next step, then a recap within the hour. The call is not where you impress the client with what you know. It is where you find out enough to write a proposal that is true.",
      ],
    },
  ],
};
