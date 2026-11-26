import type { BlogPost } from "../blog";

// SEO cluster — document types. The practical SOW guide; article 1 handles the
// proposal/contract distinction and article 3 the clause checklist.

export const STATEMENT_OF_WORK_POST: BlogPost = {
  slug: "how-to-write-a-statement-of-work",
  title: "How to write a statement of work that survives the project",
  excerpt:
    "A statement of work is not a longer proposal. It is the delivery definition: deliverables, acceptance tests, exclusions, dependencies and the route for changes. Here is a nine-part structure with wording you can adapt.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Proposal vs contract vs statement of work", to: "/blog/proposal-vs-contract-vs-statement-of-work" },
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
  ],
  body: [
    {
      paragraphs: [
        "Most statements of work fail in the same place: they describe the work in the language of the pitch. \"We will create a modern, responsive website\" sounds like a deliverable and is not one. When the client asks why the blog is not included, the document has no answer, so the conversation becomes a negotiation about memory.",
        "A useful SOW is a short, testable definition of what will exist at the end, what will not, and how both sides will know it is done. It is written for the delivery team and the client's operations lead, not for the person signing the cheque.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Write nine sections: purpose, scope, deliverables, acceptance criteria, exclusions, assumptions and dependencies, timeline and milestones, change control, and governance. Keep it to one page for small work and three or four pages for complex work. Put a number on anything countable — pages, rounds, workshops, environments, revision days — and define what a round or a milestone actually means.",
        "If a sentence cannot be tested or counted, it belongs in the proposal's narrative, not in the SOW.",
      ],
    },
    {
      heading: "1. Purpose and parties",
      paragraphs: [
        "Open with two or three sentences that say why the document exists, who it is between, and which agreement it sits under. This sounds administrative and prevents the most common filing problem: three versions of the scope in circulation, with no way to tell which one governs.",
        "A useful pattern: \"This statement of work is between [supplier] and [client] and sets out the services for [project]. It is governed by the [master agreement] dated [date]. If the documents conflict, the master agreement prevails and the scope in this document prevails over the proposal.\"",
      ],
    },
    {
      heading: "2. Scope in plain language",
      paragraphs: [
        "Write one paragraph describing the work as a whole, then a bulleted list of what is included. The paragraph gives context; the list is the part that gets used. Keep each bullet at the level of a thing that will exist: a five-page website, a brand guidelines PDF, a two-hour workshop with a written summary.",
        "Avoid verbs that cannot be verified. \"Support\", \"improve\", \"optimise\" and \"advise\" are legitimate services but need a definition of the output. \"Support the launch\" becomes \"attend two launch calls and answer written questions within one business day for the two weeks after launch\".",
      ],
    },
    {
      heading: "3. Deliverables, with quantities",
      paragraphs: [
        "List each deliverable, its format and its quantity. Format matters because it sets the boundary between what you hand over and what the client must convert: a Figma file is not a WordPress theme, and a PDF is not an editable source file.",
        "Quantities do the quiet work. Five pages, not \"a site\". Two logo routes, not \"logo options\". One workshop, not \"workshops as needed\". If a number is not fixed, the SOW should say how it will be fixed: \"the number of pages will be confirmed in the kickoff and recorded in a revised schedule\".",
      ],
    },
    {
      heading: "4. Acceptance criteria",
      paragraphs: [
        "Acceptance is where most SOWs are thinnest and where most disputes start. Define who accepts, on what basis, and what happens if they do not respond. A workable clause: \"The client will review each deliverable within five business days and respond with either written acceptance or a consolidated list of changes within the agreed rounds. If no response is received, the deliverable is deemed accepted.\"",
        "Deemed acceptance is not a trick; it is a decision rule that keeps the project moving. If the client is uncomfortable with it, replace it with a scheduled review meeting and a named approver.",
        "Acceptance should also say what is being tested. \"The site is accepted when the agreed pages are live on the production domain, the forms submit to the agreed address, and the client has confirmed the content is accurate.\" That is testable. \"The client is happy with the design\" is not.",
      ],
    },
    {
      heading: "5. Exclusions",
      paragraphs: [
        "Exclusions are the most valuable section and the one clients read most carefully when a question arises. Name the things that are adjacent to the work but not included: hosting, domain purchase, photography, copywriting, translation, accessibility remediation beyond the agreed standard, third-party licence fees, ongoing maintenance.",
        "Be specific about the boundary rather than defensive. \"Copywriting is not included; the client will provide final copy, and the supplier will place it\" is clearer than \"copywriting is excluded\". The first tells both sides what will happen; the second only tells them what will not.",
      ],
    },
    {
      heading: "6. Assumptions and dependencies",
      paragraphs: [
        "Assumptions are the conditions under which the price and timeline hold. Dependencies are the things the client must provide. Keep them separate, because they fail differently: a wrong assumption changes the price, a missed dependency changes the date.",
        "Typical assumptions: one round of stakeholder feedback per stage, content delivered in an agreed format, a single point of contact, access to the existing systems within two business days. Typical dependencies: brand assets, legal review, a decision on the platform, a nominated approver.",
        "Attach a consequence, lightly: \"If a dependency is delayed by more than five business days, the timeline moves by the same period.\" That sentence prevents the conversation where the supplier is blamed for a date the client's own delay caused.",
      ],
    },
    {
      heading: "7. Timeline and milestones",
      paragraphs: [
        "A timeline in a SOW is not a project plan. It is a sequence of milestones with dates or durations, and it should make the client's dependencies visible. A simple table works: stage, output, owner, target date.",
        "Use working days rather than vague weeks, and state the start condition. \"Eight weeks from receipt of the deposit and the content pack\" is enforceable in a way that \"eight weeks\" is not. If the project has fixed external dates, name them and say what happens if a dependency slips.",
      ],
    },
    {
      heading: "8. Change control",
      paragraphs: [
        "Every SOW needs one paragraph on changes, even if the contract has a longer clause. It should say how a change is requested, how it is priced, and that work outside the scope does not start until the change is agreed in writing.",
        "A serviceable wording: \"Either party may request a change in writing. The supplier will respond with the impact on scope, fee and timeline. No change is binding, and no work outside this statement of work begins, until both parties confirm the change in writing.\"",
        "This is the clause that turns an awkward conversation into a process. Without it, the only options are to absorb the work or to refuse it, and both damage the relationship.",
      ],
    },
    {
      heading: "9. Governance",
      paragraphs: [
        "Name the people: who approves deliverables, who handles day-to-day questions, who signs a change, and how often the project reviews progress. For small work this can be two lines. For multi-stakeholder work it prevents the slow drift that happens when everyone has an opinion and nobody has authority.",
        "Also name the communication channel and the response expectation. \"Written questions will be answered within two business days\" is a small commitment that makes the rest of the document credible.",
      ],
    },
    {
      heading: "A review checklist",
      paragraphs: [
        "Before sending, check five things. Can each deliverable be counted? Does every countable thing have a number? Is there a named approver and a response window? Are the exclusions specific enough that a stranger could apply them? Is there a change route that does not require a new contract?",
        "If any answer is no, the SOW is not finished. The test is not whether it reads well; it is whether two people who dislike each other could use it to resolve a disagreement without a meeting.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should a statement of work be? One page for a single deliverable, three to four for a multi-stage project. Length should follow the number of decisions, not the size of the price.",
        "Is a SOW legally binding? A SOW can be binding if it is incorporated into a contract or signed as an agreement and shows intent to be bound. Whether it is enforceable on its own depends on the jurisdiction and the terms. This is general information, not legal advice.",
        "Can the SOW be part of the proposal? Yes for small work, provided the proposal contains deliverable quantities, exclusions, acceptance and change control. For complex work, keep the SOW separate so the sales document can stay persuasive.",
        "Who signs the SOW? Someone with authority to commit the client, not only the day-to-day contact. Record the name, role and date.",
        "What if the scope changes during discovery? Revise the SOW before work continues. A verbal agreement to \"figure it out as we go\" is how the original document becomes fiction.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A statement of work is a testable definition, not a longer proposal. Fix the quantities, name the exclusions, define acceptance and give changes a route. Do that in two pages and the document will do more for the project than a twenty-page appendix nobody reads.",
      ],
    },
  ],
};
