import type { BlogPost } from "../blog";

export const CLIENT_QUESTIONS_POST: BlogPost = {
  slug: "questions-to-ask-a-new-client",
  title: "Questions to ask a new client before you start",
  excerpt:
    "The questions that decide whether a project will be easy or exhausting are not the ones about colours. They are about decisions, money, history and what happens when something goes wrong. Twenty questions, grouped by what they protect.",
  date: "2026-11-25",
  readMinutes: 12,
  links: [
    { label: "Requirement forms in Revercue", to: "/features/requirement-forms" },
    { label: "Client onboarding checklist", to: "/blog/client-onboarding-checklist" },
    { label: "How to run a discovery call", to: "/blog/how-to-run-a-discovery-call" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A discovery conversation usually covers the brief: what the client wants, who it is for, when it is needed. Those questions are necessary and they are the easy ones. The questions that decide whether the project runs smoothly are different, and they are mostly about the client's situation rather than the work.",
        "Who decides, who pays, what has failed before, what happens in the week everything is due. A client who answers those clearly will be a good client even if the brief is vague. A client who cannot answer them will be difficult even if the brief is perfect, and knowing that before you quote is worth more than any amount of proposal polish.",
        "The list below is organised by what each group protects: the decision, the money, the work, the history and the exit. Ask the ones that matter for the size of the project. A two-day job does not need all twenty.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Ask four questions first, because their answers determine whether the rest are worth asking. Who will make the final decision on this? Who pays for it, and does the budget already exist? What has already been tried? And what does success look like in a sentence you could put on a slide?",
        "If those four produce clear answers, the project has a decision-maker, a budget, a history and a definition of success. If any of them produces a shrug, the project is at risk before it begins, and the risk is worth naming in the proposal rather than discovering in week five.",
      ],
    },
    {
      heading: "The decision",
      paragraphs: [
        "Who makes the final decision? Not who is in the meeting. A single name, with a role. If the answer is we decide together, ask who breaks a tie, because a tie is what happens the week before launch.",
        "Who else will review the work before it is approved? This surfaces the stakeholder nobody mentioned, usually a founder, a brand manager or a partner. Every hidden reviewer adds a round of feedback, and each round has a cost. Knowing the number in advance lets you plan the schedule honestly.",
        "How quickly do decisions usually get made here? A useful question because it is about the client's habits rather than their intentions. A client who says we are usually quick but the last project slipped three weeks is telling you the schedule you should plan for.",
        "What would make you say no to this project going ahead? A surprising question that often produces the most useful answer of the conversation: a budget cap, a board approval, a competing priority. Whatever it is, it is the real constraint, and the proposal should address it.",
      ],
    },
    {
      heading: "The money",
      paragraphs: [
        "Is the budget already approved, or is this a conversation about whether to spend it? The distinction changes everything. A project with an approved budget is a scheduling exercise. A project without one is a sales process, and it may not close this quarter.",
        "What range did you have in mind? Ask it plainly and then be quiet. Most clients have a number, and the number is information rather than an insult. If the range is below your price, you can choose to show a smaller scope rather than a discount, and you can do that before you have written a proposal.",
        "Who approves the invoice, and what does your payment process look like? This is the question that prevents the late payment article you would otherwise be reading in six weeks. Ask for the name, the address, the purchase order requirement and the usual payment run.",
        "Is there anything about this purchase that needs to go through procurement, legal or finance? In larger organisations the answer determines the timeline. A contract that needs legal review can take three weeks, and a project that starts before the contract is signed is a project without terms.",
      ],
    },
    {
      heading: "The work",
      paragraphs: [
        "What does success look like, in one sentence? If the client cannot answer, offer three options and ask them to pick. A number, a feeling, a comparison to a competitor, a reduction in support tickets. The answer becomes the first line of the proposal and the last line of the delivery note.",
        "What is the one thing that must not change? Every client has a fixed point: a logo, a way of speaking, a page that cannot be touched. Knowing it prevents the one piece of feedback that undoes a week of work.",
        "Which parts of this already exist, and which need to be made? A client may assume the copy, the photography or the content is included because it exists somewhere. Separating existing material from new work is the fastest way to make the scope honest.",
        "Who is going to use this after we finish? The answer determines how much documentation and training the handover needs, and it is often the difference between a project that gets used and one that gets replaced in a year.",
        "What is the deadline, and what happens if it moves? Some deadlines are real, such as a launch event or a regulatory date. Others are preferences. Knowing which is which decides whether overtime is a conversation about scope or about goodwill.",
      ],
    },
    {
      heading: "The history",
      paragraphs: [
        "What has already been tried? This is the highest-value question in the list. A client who has been through two agencies will tell you what went wrong, and the answer is usually about process rather than talent: nobody could get a decision, the scope kept changing, the last one disappeared.",
        "Why did the last version stop working? If there is a previous website, deck or system, ask what it failed to do. The answer is usually more specific than the brief and more useful than the brief.",
        "Is there anything I should know about how this has gone before? Open, deliberately vague, and often produces the thing the client was too polite to say at the start. Give them room, and do not react defensively to the answer.",
        "Who else has seen this brief? If a colleague, a partner or a previous supplier has opinions, they will surface eventually. Better to know now than in the feedback round.",
      ],
    },
    {
      heading: "The exit",
      paragraphs: [
        "What happens if we disagree about the work? A light question with a serious purpose. It establishes that disagreement is possible and that there is a way through it, which makes the first difficult feedback easier to give and to receive.",
        "Who owns the files at the end? The default in most freelance contracts is transfer on full payment, and it should be stated rather than assumed. Ask whether the client needs editable source files, and price them if they do.",
        "What is the plan for after launch? Maintenance, hosting, updates, and who is responsible. A project that ends with nobody responsible for the site is a project that comes back as an emergency three months later, usually at the worst possible time.",
        "If this goes well, what would the next phase look like? A good closing question. It tells you whether the client is thinking long term, and it gives you a reason to structure the first project so that a second one is possible.",
      ],
    },
    {
      heading: "How to ask them",
      paragraphs: [
        "Do not send twenty questions as an email. It reads as an interrogation and it will get a partial reply. Put the operational questions in a form or a numbered list, and ask the relationship questions in the call. The form gives you structure; the call gives you tone.",
        "Ask the hard ones early and lightly. Is the budget approved is easier to answer in the first ten minutes than after an hour of design discussion, because by then the client feels committed and may shade the answer to keep the conversation pleasant. Early questions get honest answers.",
        "Write down the answers in the client's own words where you can. A phrase such as we just need it to feel less like a bank is worth more than a paragraph of your interpretation, and it can go straight into the brief and the proposal.",
      ],
    },
    {
      heading: "What the answers tell you",
      paragraphs: [
        "A client who answers the decision, money and history questions clearly is ready to buy. A client who cannot name a decision-maker is not, and the proposal should be a discovery document rather than a fixed price. A client who will not discuss the budget is either inexperienced or negotiating, and both are worth one more conversation before you write anything.",
        "The most important signal is not the answer itself but whether the client engages with the question. A client who thinks about who signs off is a client who runs projects. A client who says it is all fine, we will sort it out, is telling you that you will be doing the sorting.",
        "None of this requires a long process. Four good questions in a twenty-minute call will tell you more than a template of forty. The point is not to interrogate; it is to make the invisible parts of the project visible while they are still cheap to fix.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is it rude to ask about the budget? No. It is the fastest way to avoid wasting both people's time. Ask for a range and explain that you use it to decide which scope to recommend.",
        "How many questions is too many? More than ten in one message. Split them: operational ones in a form, relationship ones in the call.",
        "What if the client does not know the answers? Offer options rather than leaving the question open. Most clients know what they do not want, and that is enough to start.",
        "Should I ask all of this before quoting? Ask the decision, money and history questions before quoting. The rest can follow once the proposal is accepted.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "The best discovery questions are about the client's situation, not the deliverable. Ask who decides, who pays, what was tried and what success means, and listen for the answer behind the answer. Twenty minutes of good questions in week zero is cheaper than any amount of rework in week six, and it is the difference between quoting a project and guessing at one.",
      ],
    },
  ],
};
