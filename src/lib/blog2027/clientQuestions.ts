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
        "Six is the number that fits a twenty-minute conversation with time to listen. Everything else, the brand guidelines, the font preferences, the list of competitors, can go in a form afterwards. The call is for the answers that need a follow-up question attached.",
      ],
    },
    {
      heading: "The decision",
      paragraphs: [
        "Who signs this off, and who else needs to be comfortable with it? The answer tells you whether you are talking to the buyer or the researcher. If it is the researcher, ask when the decision-maker will see the proposal and what they will want to know. Then write the proposal for that person rather than the one on the call.",
        "What happens after we agree? A client who says we will get started, and a client who says it goes to the finance committee on the 12th, are describing two different projects with the same scope. The second needs a version that can be forwarded and read cold, and a proposal that assumes the first will stall in a queue.",
        "The pause-worthy answer: nobody else needs to be involved. That is either very good news or it is a sign the project has no sponsor, and the difference shows up later when nobody will release the budget. Ask who is paying for it, and whether they have seen the plan.",
      ],
    },
    {
      heading: "The money",
      paragraphs: [
        "What range have you set aside for this? Most freelancers avoid this question and then discover the answer through silence. Asked plainly and early, it is not rude, and the reply usually saves everyone a week. If the client will not give a range, offer three: here is what 4,000 buys, here is 8,000, here is 15,000.",
        "Who pays the invoice, and what does their process require? A purchase order, a supplier form, a portal, a named contact in finance. This is the least interesting question on the list and the one most likely to delay your money by six weeks.",
        "The pause-worthy answer: we will sort the budget once we see the proposal. That is not a red flag on its own, but it becomes one if it is still the answer after you send three options. An organisation that cannot state a range usually cannot approve one quickly either.",
      ],
    },
    {
      heading: "The work",
      paragraphs: [
        "What have you already tried? The answer tells you what the client believes has failed and why, which is usually the real brief. It also tells you whether you are the third freelancer on the same problem, which changes both the price and the risk.",
        "What would make this a success in six months? Clients often answer with a deliverable, and the useful follow-up is what that deliverable is supposed to cause. More enquiries, fewer support tickets, a launch date, a board decision. Once you know the effect, you can tell whether the thing you are being asked to build can produce it.",
        "Who is this for, and what do they currently do instead? The second half is the one people skip. Whatever your client's customers do today is your real competition, and it often costs nothing.",
        "The pause-worthy answer: nobody has tried anything yet, and we need it live in three weeks. That combination usually means the problem is bigger than the timeline, and the useful response is a smaller first phase that can genuinely ship.",
      ],
    },
    {
      heading: "The history",
      paragraphs: [
        "Has anything like this been built before, and what happened to it? A previous failure is free research. So is a previous success: if an earlier version worked, the question is why it stopped, and the answer is often organisational rather than technical.",
        "Who will be affected by this internally? The person whose job changes when the new system arrives is the most reliable source of late-stage objections. Finding them in week one is cheaper than finding them in the final review.",
        "The pause-worthy answer: the last two agencies did not work out, but it was definitely their fault. It might be entirely true. It is still worth asking what the agency was asked to do and what the handover looked like, because the next three months will answer the same question about you.",
      ],
    },
    {
      heading: "The exit",
      paragraphs: [
        "What happens if the budget changes or the project has to pause? A client who has thought about this is usually a client who has run a project before. A client who has not is not necessarily bad, but you should write the pause and cancellation terms more carefully and say them out loud on the call.",
        "What would make you stop working with a freelancer? It is an unusual question and it produces unusually honest answers, usually about communication rather than quality. Take the answer literally and build your update rhythm around it.",
        "The pause-worthy answer: we have never had to pause a project. That is exactly the client most likely to need a pause clause explained twice, because the possibility has not occurred to them. Say what happens before it happens, while it is still a hypothetical.",
      ],
    },
    {
      heading: "What to do with the answers",
      paragraphs: [
        "Write them down during the call, in the client's words where possible, and send a short recap the same day. The recap has three headings: what I heard, what I am assuming, and what I still need. It takes four minutes and catches most misunderstandings while they are still cheap.",
        "The assumptions section is the valuable one, because it is where you make the invisible visible. I have assumed the existing site stays live during the build, and that you will supply the product photography. If either is wrong, the date changes. A client who corrects that sentence on day one has saved both of you a week.",
        "Then quote against the recap rather than the conversation. The proposal can be shorter, because it now refers to a document the client has already agreed is accurate, and the scope can be specific without being long.",
      ],
    },
    {
      heading: "Five answers that should make you pause",
      paragraphs: [
        "The budget is whatever it takes, followed by no number when you ask again. Enthusiasm without a figure is usually a stakeholder problem, and stakeholder problems consume schedules.",
        "We need it in two weeks, and the copy is not written. The timeline depends on material that does not exist yet. Either the copy is in scope or the date is not real, and you should ask which.",
        "Can you send the proposal to my colleague, I am not sure who decides. Then the sale has not started, and you are writing for an audience you cannot name.",
        "We do not need anything in writing, we trust you. It sounds generous and it removes your only protection. Reply that the writing protects the date rather than the relationship, and send it anyway.",
        "The last person did the same thing for half the price. That may be true, and it is still a question about what the half-price version included. If the answer is everything, the difference is your margin, not your value.",
      ],
    },
    {
      heading: "When they cannot answer",
      paragraphs: [
        "Some clients genuinely do not know their budget, their approver or their success measure. That is common on a first project and it is not a reason to guess. Offer a short paid discovery with a written brief as the deliverable, and make the build proposal conditional on it.",
        "The discovery should be small: one call, a written summary, a scope and a range. Price it as a fixed fee that is credited against the build if the client proceeds. That structure respects the client's uncertainty and stops you from absorbing it.",
        "If the client will not pay for discovery and will not answer the questions, the project is not ready. Saying so kindly is the most useful thing you can do in the first week, and it is much cheaper than discovering it in the fourth.",
      ],
    },
    {
      heading: "How to ask without it feeling like an interrogation",
      paragraphs: [
        "Ask two or three per topic, not all at once, and write the answers down while the client is talking. Send a short recap the same day: what I heard, what I am assuming, what I still need. The recap is where most misunderstandings are caught, and it takes four minutes to write.",
        "Explain why you are asking before you ask. I ask about the approver because it changes how I structure the review rounds is a sentence that turns a personal question into a professional one.",
        "If the client cannot answer the money or decision questions, do not fill the gap with optimism. Offer a paid discovery step that answers them, and make the proposal conditional on it. That is a smaller sale, and it is the honest one.",
      ],
    },
    {
      heading: "Questions not to ask",
      paragraphs: [
        "Some questions cost more than they return. What is your brand voice? invites a paragraph that means nothing and takes ten minutes. What is your timeline? is answered with soon, and the useful version is the one about the trade show date. How did you hear about me? is a marketing question wearing a scoping hat.",
        "Others are worse than useless. Asking what the budget is and then arguing with the answer ends the call. Asking who else is quoting turns a conversation into a comparison you cannot see. Asking whether they have read your website tells you nothing you can act on.",
        "The test is simple: if the answer would not change what you quote, what you write or whether you take the work, it belongs in a form or nowhere. A shorter call with sharper questions is more impressive than a thorough one that covers everything.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is it rude to ask about budget? No, it is the question that makes the proposal relevant. Offer ranges if a single number feels too blunt.",
        "What if the client does not know what they want? That is normal and it is not a reason to guess. Sell a short discovery phase with a written brief as the deliverable.",
        "How many questions is too many? If it takes more than twenty minutes, it has become a survey. Six questions answered properly beat twenty answered politely.",
        "Should I send the questions before the call? Send the six in the calendar invitation. Clients who see them in advance answer more precisely, and the ones who do not read them still get the benefit of your structure.",
        "What if the answers contradict the brief? Say so in the recap, plainly, and ask which one is right. Contradictions found on day one are clarifications; contradictions found in week five are arguments.",
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
