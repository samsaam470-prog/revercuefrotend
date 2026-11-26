import type { BlogPost } from "../blog";

// GEO cluster — taxonomy. Twelve flags, each paired with the clause or question
// that handles it.

export const CLIENT_RED_FLAGS_POST: BlogPost = {
  slug: "freelance-client-red-flags",
  title: "12 freelance client red flags, and the clause that handles each",
  excerpt:
    "A red flag is not proof of a bad client. It is a signal that a term needs to be explicit before work starts. Here are twelve, what each one predicts, and the question or clause that contains the risk.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Do freelancers need a contract?", to: "/blog/do-freelancers-need-a-contract" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Freelancers talk about red flags as if they were reasons to walk away. Most are not. They are reasons to make a term explicit, slow down the start, or price the risk. The skill is not spotting danger; it is converting an uneasy signal into a clause or a question before the work begins.",
        "The twelve below are the ones that most reliably predict a difficult project. Each is paired with the response that contains it. None of them is a judgement about the person; all of them are information about the deal.",
      ],
    },
    {
      heading: "1. They will not put the scope in writing",
      paragraphs: [
        "The signal: \"Let's just get started, we can figure out the details as we go.\" It predicts scope drift and a dispute about what was included.",
        "The response: a one-page scope with deliverables, exclusions, rounds and an approver. If they will not agree to that, the project has no boundary, and the price has no meaning.",
      ],
    },
    {
      heading: "2. The brief is a mood, not a decision",
      paragraphs: [
        "The signal: \"Make it pop\", \"we'll know it when we see it\", or a reference board with no explanation. It predicts endless revisions because success has not been defined.",
        "The response: a paid discovery or direction phase with a fixed number of concepts and a named approver. Define the decision before you produce the work.",
      ],
    },
    {
      heading: "3. Every stakeholder is an approver",
      paragraphs: [
        "The signal: feedback arrives from the founder, the marketing lead, the operations manager and someone's cousin. It predicts contradictory comments and a project that cannot converge.",
        "The response: one named approver who consolidates feedback. Put it in the statement of work: one consolidated response per round, from one person, by an agreed date.",
      ],
    },
    {
      heading: "4. The deadline was agreed before the scope",
      paragraphs: [
        "The signal: a fixed launch date, a campaign booked, a conference announced, and no agreed deliverables. It predicts either unpaid overtime or a missed date that becomes your fault.",
        "The response: a timeline with dependencies and a start condition. State what happens if content or approvals arrive late, and price any acceleration.",
      ],
    },
    {
      heading: "5. They want a discount before they have seen the work",
      paragraphs: [
        "The signal: \"What's your best price?\" before the brief is discussed. It predicts a client who values the work by the discount rather than the outcome, and who will ask again at invoice time.",
        "The response: hold the price and reduce the scope, or offer a phased start. Do not discount the same scope; it teaches the client that the first number was negotiable.",
      ],
    },
    {
      heading: "6. Payment terms keep getting longer",
      paragraphs: [
        "The signal: net 30 becomes net 60, then \"after we invoice our client\". It predicts a cash-flow problem that becomes yours.",
        "The response: staged payments, a deposit, and a clear due date with a consequence. If the client cannot pay a deposit, the risk is not administrative.",
      ],
    },
    {
      heading: "7. They will not sign anything",
      paragraphs: [
        "The signal: \"We don't do contracts\", or a request to start before the paperwork is approved. It predicts that the terms will be whatever is convenient later.",
        "The response: a one-page agreement or a written confirmation of scope, price and payment before work starts. If neither is acceptable, decide whether the fee is worth the exposure.",
      ],
    },
    {
      heading: "8. The work is urgent, but the feedback is slow",
      paragraphs: [
        "The signal: the project is needed \"ASAP\", but questions go unanswered for a week and approvals arrive after the deadline. It predicts a compressed delivery window caused by the client's own delays.",
        "The response: a dependency clause and a revised date whenever an input is late. Put the dependency in the timeline, not just in your head.",
      ],
    },
    {
      heading: "9. They have a bad story about every previous supplier",
      paragraphs: [
        "The signal: all three previous freelancers were \"unprofessional\", \"slow\" or \"difficult\". Sometimes that is true. Often it is a pattern of unmet expectations that will repeat with you.",
        "The response: ask what went wrong and what would have made it work. Then write the answer into the scope. If the answer is \"they did not read my mind\", the brief is the problem.",
      ],
    },
    {
      heading: "10. They want to pay on results",
      paragraphs: [
        "The signal: a lower fee plus a share of revenue, conversions or savings. It predicts a dispute about attribution and a payment you cannot control.",
        "The response: price the work you do, and if you accept a performance element, define the metric, the measurement period, the baseline and who validates it. Do not replace a fee with a hope.",
      ],
    },
    {
      heading: "11. The scope includes a promise you cannot keep",
      paragraphs: [
        "The signal: \"We need you to guarantee the campaign will hit £X\", or \"the site must rank first\". It predicts a warranty claim on an outcome that depends on the market, the client's team and factors outside your control.",
        "The response: warrant the work, not the result. Commit to method, quality and reasonable skill; decline guarantees of commercial outcomes.",
      ],
    },
    {
      heading: "12. The relationship is warm, but the process is absent",
      paragraphs: [
        "The signal: long friendly calls, lots of enthusiasm, no written brief, no approver, no dates. It predicts a project that feels good until it needs a decision.",
        "The response: convert the warmth into a short written summary after each call. \"To confirm what we agreed: scope, price, date, next step.\" Warmth is not a substitute for a record.",
      ],
    },
    {
      heading: "How to use the list",
      paragraphs: [
        "Score the project, not the person. One flag is a reason to clarify; three or more is a reason to slow down, take a deposit or decline. The same behaviour from a long-standing client may be harmless because the trust and the process already exist.",
        "Write the response into the proposal or statement of work, not into a mental note. A red flag that changes nothing in the documents is just a feeling, and feelings are hard to enforce.",
        "Keep a short record of what was agreed about each flag. If the project later goes wrong, the note explains why the term exists and what the client accepted.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Should I walk away at the first red flag? Not necessarily. Clarify the term and see how the client responds. A client who engages with the clarification is often a better client than one who had no flags because they never told you anything.",
        "What is the biggest red flag? A refusal to define the scope in writing, because it makes every other protection harder to apply.",
        "How do I raise a concern without insulting the client? Talk about the project, not the person: \"To keep the timeline honest, I need one approver and a written scope. Here is what I suggest.\"",
        "Can a contract fix a bad client? No. It gives you a remedy, not a relationship. Use the flags to decide whether the relationship is worth the remedy.",
        "What if the client is a friend? Use the same terms, with a lighter explanation. The friendship is more likely to survive a clear scope than an unpaid favour.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Red flags are not verdicts; they are prompts. Each one tells you which term needs to be explicit before work starts. Handle them in the documents and most difficult clients become merely demanding ones.",
      ],
    },
  ],
};
