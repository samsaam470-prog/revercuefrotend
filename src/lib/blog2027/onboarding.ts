import type { BlogPost } from "../blog";

// Cluster D — onboarding. The checklist is the artefact; the article explains
// what each item prevents rather than just listing twelve boxes.

export const ONBOARDING_POST: BlogPost = {
  slug: "client-onboarding-checklist",
  title: "Client onboarding checklist for freelancers: the twelve things to settle in week one",
  excerpt:
    "Most difficult projects were difficult in week one and nobody noticed. Here is the twelve-item checklist that settles money, access, approval and rhythm before the work starts, and how to run it without another meeting.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Requirement forms in Revercue", to: "/features/requirement-forms" },
    { label: "Questions to ask a new client", to: "/blog/questions-to-ask-a-new-client" },
    { label: "How to run a discovery call", to: "/blog/how-to-run-a-discovery-call" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The projects that go badly rarely announce themselves. They start in a week where everyone is enthusiastic, the documents are signed, and a handful of small things are left for later: who approves the work, which folder the assets are in, what happens if the invoice is late. Later arrives in week five, and by then each of those small things has become a conversation with a deadline attached.",
        "Onboarding is the cheapest hour in a project. It is also the one most often skipped, because the work feels like it has already started and the client is keen to see something. The checklist below is deliberately short enough to complete in one form or one call, and each item exists because of a specific way projects fail.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Settle twelve things before the first deliverable: the decision-maker, the invoice details, the deposit, the approval process, the assets, the access, the scope and exclusions, the change mechanism, the communication channel, the update rhythm, the review dates and the exit conditions. Send them as one form with a deadline, not as twelve questions spread over three weeks.",
      ],
    },
    {
      heading: "The money",
      paragraphs: [
        "Billing entity and address, purchase order if they need one, who receives the invoice, and what the payment terms actually are in their system. Ask for a sample invoice or a supplier form in week one, because the finance team's requirements are the ones that hold up payment in week six. Confirm the deposit has cleared before the start date, and say that work begins when it does.",
      ],
    },
    {
      heading: "The approver",
      paragraphs: [
        "One person with the authority to sign off each deliverable, named in writing. If feedback comes from a committee, agree that the approver consolidates it into one response per round. This single item prevents more revision loops than any clause, because it converts a stream of opinions into a decision.",
      ],
    },
    {
      heading: "The material",
      paragraphs: [
        "What you need from them, in what format, by when. Brand assets, logins, copy, product photography, legal pages, any third-party accounts. List it explicitly, name a date, and say what happens if it arrives late: the delivery date moves by the same number of days. Material arriving late is the most common cause of a project that is technically behind but has no villain.",
      ],
    },
    {
      heading: "The scope",
      paragraphs: [
        "Confirm the deliverables, the number of rounds, the exclusions and the change mechanism in the same words the contract used. Ask the client to reply with a one-line confirmation that this matches their expectation. That reply is worth more than the signature, because it is written after they have read the version they will actually remember.",
      ],
    },
    {
      heading: "The channel and the rhythm",
      paragraphs: [
        "One channel for decisions, one for files, one for anything urgent. Agree a weekly update, even if it is three sentences on a Friday: done, next, blocked. Clients go quiet when they cannot see progress, and a weekly note costs five minutes while removing most of the where are we messages that interrupt the work.",
        "Agree the review dates at the same time. A project with dates in the calendar behaves differently from one with dates in an email, because the first creates an expectation that someone will look at the work on a particular day.",
      ],
    },
    {
      heading: "How to run the checklist without a meeting",
      paragraphs: [
        "Send it as a single form with the fields already filled where you can, and a date by which you need the rest. Forms are better than calls for this because the answers are written, dated and searchable, and because the client can complete them at eleven at night without scheduling anything.",
        "Reserve the call for the two items that genuinely need discussion: who approves, and what the client is most worried about. Everything else is data entry, and data entry does not need a calendar slot.",
      ],
    },
    {
      heading: "What good onboarding prevents",
      paragraphs: [
        "It prevents the invoice that cannot be paid because there is no purchase order. It prevents the fifth round of revisions caused by four people with four opinions. It prevents the late delivery that was caused by assets arriving in week three. And it prevents the worst version of all, where the client is unhappy and neither of you can point to the moment the expectation diverged.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should onboarding take? An hour to send, a day or two to come back. If it takes a week, that is a signal about the project rather than the form.",
        "What if the client will not fill in a form? Send the same questions as a short email and ask for answers in one reply. The medium is negotiable; the written record is not.",
        "Should onboarding be part of the paid work? Yes, it is project setup and it belongs in the first milestone. Free onboarding invites it to be treated as optional.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Twelve items, one form, one deadline, before the first deliverable. The list is not bureaucracy; each line is a specific failure that becomes cheap to prevent and expensive to fix. Do it once well and the rest of the project is mostly the work you were hired to do.",
      ],
    },
  ],
};
