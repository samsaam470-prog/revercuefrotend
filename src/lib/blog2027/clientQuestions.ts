import type { BlogPost } from "../blog";

// Cluster D, article two: the question bank. Grouped by what each answer
// actually changes, so the list is diagnostic rather than a script.

export const CLIENT_QUESTIONS_POST: BlogPost = {
  slug: "questions-to-ask-a-new-client",
  title: "Questions to ask a new client before you start",
  excerpt:
    "Twenty questions is a survey. Six are a qualification. These are the questions that change what you quote, what you write, and whether you take the work at all, with the answer that should make you pause.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Requirement forms in Revercue", to: "/features/requirement-forms" },
    { label: "Client onboarding checklist", to: "/blog/client-onboarding-checklist" },
    { label: "How to run a discovery call", to: "/blog/how-to-run-a-discovery-call" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The first call with a new client is usually spent being helpful. That is the right instinct and the wrong structure, because the questions you ask in the first twenty minutes decide what you quote, what you promise and how much of the next three months you will spend managing expectations rather than doing the work.",
        "The list below is short on purpose. Each question exists because the answer changes something concrete, and each comes with the answer that should make you slow down. Ask them in whatever order the conversation allows; the point is that all of them get asked before you send a proposal.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Ask who decides, what happens after the decision, what the budget range is, what has already been tried, what would make this a failure, and what happens if the project has to stop. Those six cover authority, money, context, history, success and exit, which between them predict most of what a project will cost you in time you did not bill.",
      ],
    },
    {
      heading: "The decision",
      paragraphs: [
        "Who signs this off, and who else needs to be comfortable with it? The answer tells you whether you are talking to the buyer or the researcher. If it is the researcher, ask when the decision-maker will see the proposal and what they will want to know. Then write the proposal for that person rather than the one on the call.",
        "What happens after we agree? A client who says we will get started, and a client who says it goes to the finance committee on the 12th, are describing two different projects with the same scope. The second needs a version that can be forwarded and read cold, and a proposal that assumes the first will stall in a queue.",
      ],
    },
    {
      heading: "The money",
      paragraphs: [
        "What range have you set aside for this? Most freelancers avoid this question and then discover the answer through silence. Asked plainly and early, it is not rude, and the reply usually saves everyone a week. If the client will not give a range, offer three: here is what 4,000 buys, here is 8,000, here is 15,000.",
        "Who pays the invoice, and what does their process require? A purchase order, a supplier form, a portal, a named contact in finance. This is the least interesting question on the list and the one most likely to delay your money by six weeks.",
      ],
    },
    {
      heading: "The work",
      paragraphs: [
        "What have you already tried? The answer tells you what the client believes has failed and why, which is usually the real brief. It also tells you whether you are the third freelancer on the same problem, which changes both the price and the risk.",
        "What would make this a success in six months? Clients often answer with a deliverable, and the useful follow-up is what that deliverable is supposed to cause. More enquiries, fewer support tickets, a launch date, a board decision. Once you know the effect, you can tell whether the thing you are being asked to build can produce it.",
        "Who is this for, and what do they currently do instead? The second half is the one people skip. Whatever your client's customers do today is your real competition, and it often costs nothing.",
      ],
    },
    {
      heading: "The history",
      paragraphs: [
        "Has anything like this been built before, and what happened to it? A previous failure is free research. So is a previous success: if an earlier version worked, the question is why it stopped, and the answer is often organisational rather than technical.",
        "Who will be affected by this internally? The person whose job changes when the new system arrives is the most reliable source of late-stage objections. Finding them in week one is cheaper than finding them in the final review.",
      ],
    },
    {
      heading: "The exit",
      paragraphs: [
        "What happens if the budget changes or the project has to pause? A client who has thought about this is usually a client who has run a project before. A client who has not is not necessarily bad, but you should write the pause and cancellation terms more carefully and say them out loud on the call.",
        "What would make you stop working with a freelancer? It is an unusual question and it produces unusually honest answers, usually about communication rather than quality. Take the answer literally and build your update rhythm around it.",
      ],
    },
    {
      heading: "How to ask them",
      paragraphs: [
        "Ask two or three per topic, not all at once, and write the answers down while the client is talking. Send a short recap the same day: what I heard, what I am assuming, what I still need. The recap is where most misunderstandings are caught, and it takes four minutes to write.",
        "If the client cannot answer the money or decision questions, do not fill the gap with optimism. Offer a paid discovery step that answers them, and make the proposal conditional on it. That is a smaller sale, and it is the honest one.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is it rude to ask about budget? No, it is the question that makes the proposal relevant. Offer ranges if a single number feels too blunt.",
        "What if the client does not know what they want? That is normal and it is not a reason to guess. Sell a short discovery phase with a written brief as the deliverable.",
        "How many questions is too many? If it takes more than twenty minutes, it has become a survey. Six questions answered properly beat twenty answered politely.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Ask who decides, what happens next, what the range is, what was tried, what success causes, and what happens on exit. Write the answers down, send them back, and quote against them. The proposal that follows will be shorter, more accurate and much harder to misunderstand.",
      ],
    },
  ],
};
