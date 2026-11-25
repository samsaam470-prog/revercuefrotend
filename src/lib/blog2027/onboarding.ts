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
        "What follows is not a template to admire. It is a sequence: the twelve things to settle, the order to ask them in, the wording to use, the five working days in which to do it, and the four ways clients push back with an answer for each.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Settle twelve things before the first deliverable: the decision-maker, the invoice details, the deposit, the approval process, the assets, the access, the scope and exclusions, the change mechanism, the communication channel, the update rhythm, the review dates and the exit conditions. Send them as one form with a deadline, not as twelve questions spread over three weeks.",
        "If you only have time for three, take the approver, the deposit and the delivery date. Those three cause more rework, more late payment and more quiet resentment than the other nine combined, and the remaining items can follow in the first weekly update.",
      ],
    },
    {
      heading: "The money",
      paragraphs: [
        "Billing entity and address, purchase order if they need one, who receives the invoice, and what the payment terms actually are in their system. Ask for a sample invoice or a supplier form in week one, because the finance team's requirements are the ones that hold up payment in week six. Confirm the deposit has cleared before the start date, and say that work begins when it does.",
        "The deposit deserves a sentence of its own, because it is the item freelancers most often waive in the interests of momentum. It is not mainly about cash flow. It is the cheapest test of whether the client can complete a task that involves their own finance team. A client who cannot move a deposit through their organisation in a week will not move a purchase order through it in a month, and you will find that out either now or after you have done the work.",
        "Write the terms in the same place as the scope rather than in a separate email. Fifty per cent before the start, the balance on delivery, payment within fourteen days of the invoice, late payment pausing the work. Four figures, one paragraph, and no ambiguity for anyone in accounts to interpret differently.",
      ],
    },
    {
      heading: "The approver",
      paragraphs: [
        "One person with the authority to sign off each deliverable, named in writing. If feedback comes from a committee, agree that the approver consolidates it into one response per round. This single item prevents more revision loops than any clause, because it converts a stream of opinions into a decision.",
        "Ask for the name rather than the role. The marketing team is not an approver; it is a group of people, some of whom will disagree on a Tuesday. A named person with a stated deadline is an approver, and if that person is on holiday for the week the design is due, you want to know that in week one rather than in week three.",
        "Say what happens if the approval does not arrive: the date moves by the same number of days, and the next stage starts when the approval does. That is not a penalty, it is arithmetic, and clients accept arithmetic far more readily than they accept a complaint about responsiveness.",
      ],
    },
    {
      heading: "The material",
      paragraphs: [
        "What you need from them, in what format, by when. Brand assets, logins, copy, product photography, legal pages, any third-party accounts. List it explicitly, name a date, and say what happens if it arrives late: the delivery date moves by the same number of days. Material arriving late is the most common cause of a project that is technically behind but has no villain.",
        "Be specific enough that the list can be actioned by someone who was not on the call. Logo files in SVG and PNG rather than the logo, please. Access to the analytics account rather than the numbers. Six product photographs at 2000 pixels wide rather than some photos. Vagueness here is read as flexibility, and flexibility is what turns a one-day handover into a two-week scavenger hunt.",
        "Where the assets already exist somewhere awkward, offer the smallest possible route: a shared folder, a transfer link, or an upload form. The friction in the request is usually the reason it does not happen, and lowering the friction is faster than reminding anyone about it.",
      ],
    },
    {
      heading: "The scope",
      paragraphs: [
        "Confirm the deliverables, the number of rounds, the exclusions and the change mechanism in the same words the contract used. Ask the client to reply with a one-line confirmation that this matches their expectation. That reply is worth more than the signature, because it is written after they have read the version they will actually remember.",
        "Use the same wording in all three places: proposal, contract and the brief the client opens in week three. If those documents disagree, the one people open wins, and it will not be the contract. Copying four sentences between documents is a minute of work and removes an entire category of argument.",
      ],
    },
    {
      heading: "The channel and the rhythm",
      paragraphs: [
        "One channel for decisions, one for files, one for anything urgent. Agree a weekly update, even if it is three sentences on a Friday: done, next, blocked. Clients go quiet when they cannot see progress, and a weekly note costs five minutes while removing most of the where are we messages that interrupt the work.",
        "Agree the review dates at the same time. A project with dates in the calendar behaves differently from one with dates in an email, because the first creates an expectation that someone will look at the work on a particular day.",
        "Define urgent while you are at it, because the word will otherwise be used for everything. A good definition is short: urgent means the work cannot continue today without an answer, and it goes in the message channel with the word urgent in the first line. Everything else waits for the weekly note.",
      ],
    },
    {
      heading: "Week one, day by day",
      paragraphs: [
        "Monday: send the form, with the fields you can already complete filled in and a date for the rest. Include the invoice details request in the same message, so finance can start in parallel with the project.",
        "Tuesday: a twenty-minute call, not an hour, covering only the two items that need discussion. Who approves, and what the client is most worried about. Record the answers in the project record before the call ends, while the client is still there to correct them.",
        "Wednesday: confirm access and material, and send the one-page project sheet: scope, dates, approver, channel, update day. Ask for a one-line reply confirming it is right. That reply is your real kick-off.",
        "Thursday: set the recurring update and the review dates in the calendar, with the approver invited rather than merely informed. Then start the work.",
        "Friday: send the first update even if there is little to report, in the done, next, blocked format. The first update teaches the client what the rhythm will be, and a rhythm established in a quiet week survives a busy one.",
      ],
    },
    {
      heading: "The twelve fields, written out",
      paragraphs: [
        "If you are building the form from scratch, these are the twelve fields in the order that works, with the wording that gets a usable answer.",
        "One: who signs off each deliverable, and who covers for them when they are away. Two: the legal entity, billing address and any purchase order reference. Three: who in finance receives invoices, and their portal or format requirements. Four: confirmation that the deposit has been sent, with the date. Five: how feedback is consolidated, and by when in each round. Six: the assets and access needed, each with a format and a date.",
        "Seven: confirmation that the scope, rounds and exclusions match expectations. Eight: what happens when something outside the scope is requested. Nine: the channel for decisions, the channel for files, and what counts as urgent. Ten: the day and format of the weekly update. Eleven: the review dates for each stage. Twelve: what happens if the project pauses, and what notice either side gives.",
        "Twelve fields is one screen of a form. It takes the client ten minutes and it takes you two to read. The alternative is twelve separate conversations over five weeks, each of which begins with the client wondering why you are asking again.",
      ],
    },
    {
      heading: "When the client pushes back",
      paragraphs: [
        "We do not pay deposits. Then the first invoice is the deposit, due before the start, and the same terms apply. If their process genuinely forbids it, ask for a purchase order instead, which serves a similar purpose: proof that someone with authority has committed money.",
        "Just start, we will sort the paperwork later. Reply that you will hold the start date for a week while the form comes back, and that the date will move if it does not. This is the point where a project either becomes manageable or becomes a favour, and it is much easier to be firm on day two than in week six.",
        "Our project manager will send feedback from the team. Ask the project manager to consolidate it into one response per round, and confirm that the named approver has the final say. If nobody has the final say, the rounds are unlimited and the price should reflect it.",
        "We do not know who the approver is yet. Then the first deliverable is a decision, not a design. Agree a date by which the approver is named, and do not start work that will need reapproval until it is.",
      ],
    },
    {
      heading: "What good onboarding prevents",
      paragraphs: [
        "It prevents the invoice that cannot be paid because there is no purchase order. It prevents the fifth round of revisions caused by four people with four opinions. It prevents the late delivery that was caused by assets arriving in week three. And it prevents the worst version of all, where the client is unhappy and neither of you can point to the moment the expectation diverged.",
        "It also does something less obvious: it sets the tone for every conversation that follows. A client who has been asked clear questions, given clear answers and seen a date hold will treat your next request as reasonable. A client who has never seen the boundary will treat every boundary as a surprise.",
      ],
    },
    {
      heading: "What to hand over at the end of week one",
      paragraphs: [
        "One page, five lines: the scope in the client's words, the dates, the approver, the channel and the update day. Send it as a document or a link, not as a message that will be scrolled past. It is the thing you will both open when memory disagrees, and the effort of writing it is repaid the first time anyone asks what was agreed.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should onboarding take? An hour to send, a day or two to come back. If it takes a week, that is a signal about the project rather than the form.",
        "What if the client will not fill in a form? Send the same questions as a short email and ask for answers in one reply. The medium is negotiable; the written record is not.",
        "Should onboarding be part of the paid work? Yes, it is project setup and it belongs in the first milestone. Free onboarding invites it to be treated as optional.",
        "Do I need a call at all? Only for the two questions that involve judgement: who approves, and what the client is worried about. Everything else is data entry.",
        "What if the client wants to skip straight to work? Start with the part of the work that does not depend on the missing answers, and hold the rest. Momentum is worth keeping; it is not worth promising a date you cannot hold.",
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
