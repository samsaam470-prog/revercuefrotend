import type { BlogPost } from "../blog";

// AEO cluster — question-shaped demand. A number plus a definition; the scope
// articles cover what to do when the number is exceeded.

export const REVISION_ROUNDS_POST: BlogPost = {
  slug: "how-many-revisions-should-a-client-get",
  title: "How many revisions should a client get? Two rounds, defined properly",
  excerpt:
    "Two rounds is the common standard for freelance work, three for complex projects. The number only works if a round is defined: one consolidated set of comments, one response, one deadline.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "How to price a freelance project", to: "/blog/how-to-price-a-freelance-project" },
    { label: "How long should a proposal be?", to: "/blog/how-long-should-a-proposal-be" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The question sounds like it has a universal answer. It does not, but it has a useful default: two rounds for most freelance projects, three when the work is complex or the client has several stakeholders. The default only holds if both sides agree on what a round is.",
      ],
    },
    {
      heading: "How many revisions should a client get? The short answer",
      paragraphs: [
        "Two rounds of revision is the standard for a defined deliverable such as a logo, a website design or a piece of copy. Three rounds is reasonable for complex work with multiple decision-makers, regulated content or a phased design process. More than three usually means the brief was incomplete or the approval process is broken.",
        "One round is enough only for a small, tightly specified deliverable where the direction has already been agreed.",
      ],
    },
    {
      heading: "A round is one consolidated response",
      paragraphs: [
        "A round is not every comment a client sends. It is one set of consolidated feedback, delivered by one named person, by an agreed date, followed by one revision from you. That definition is what makes the number meaningful.",
        "If five stakeholders each send separate comments on different days, that is five rounds wearing one label. The fix is procedural: one approver collects the comments, resolves conflicts internally, and sends a single response per round.",
        "Put the definition in the proposal and the statement of work: \"Two rounds of revision. A round is one consolidated set of comments from the named approver, delivered within three business days of the draft. The supplier responds with one revised version.\"",
      ],
    },
    {
      heading: "What counts as a revision",
      paragraphs: [
        "A revision changes the work within the agreed direction: adjusting copy, refining a layout, changing a colour, correcting a detail. A new direction is not a revision; it is new work, even if it arrives during a revision round.",
        "A change of mind about the brief is also not a revision. If the client approved a direction and later wants a different one, the earlier work is not invalidated by a comment; it is replaced by a decision that should be priced.",
        "Minor corrections — typos, broken links, an image swapped for the correct file — should not consume a round. Say that in the terms so the client is not afraid to report a mistake.",
      ],
    },
    {
      heading: "How to write the revision clause",
      paragraphs: [
        "A workable clause has four parts: the number of rounds, the definition of a round, the response time, and the consequence of exceeding the number. For example: \"Two rounds of revision are included. Each round consists of one consolidated written response from the client's named approver within three business days. Additional rounds are charged at [rate] per round and may affect the delivery date.\"",
        "Name the approver. \"The client\" is not a person, and a committee is not an approver. One named role with authority to consolidate feedback prevents the slow accumulation of contradictory comments.",
        "State what happens if feedback does not arrive. The project should not stall indefinitely. A deemed-approval rule or a revised date is better than an open-ended wait.",
      ],
    },
    {
      heading: "Why two is the default",
      paragraphs: [
        "The first round catches the things that are easier to see once the work exists: the headline is wrong, the layout is too dense, the tone is off. The second round catches the consequences of the first: the new headline needs a different image, the layout change affects the mobile view.",
        "A third round is usually about a stakeholder who was not involved earlier or a decision that was never made. That is why complex projects with multiple approvers often need three: not because the work is worse, but because more people need to see it in context.",
        "Beyond three, the pattern tends to repeat. If a project reaches a fourth round, the useful question is not \"how many more?\" but \"who has not approved, and what decision are they avoiding?\"",
      ],
    },
    {
      heading: "Revisions versus scope creep",
      paragraphs: [
        "A revision stays inside the agreed scope; creep adds a deliverable, a channel, a page or a stakeholder. The two feel similar to a client and are very different commercially.",
        "The distinction to use in conversation: does this change what you receive, or only how it looks? Changing how is usually a revision. Changing what is a change request, even if it arrives during a revision round.",
        "If the client is unsure, offer the smallest version that fits the current scope and price the rest. The goal is to keep the project moving, not to win the definition.",
      ],
    },
    {
      heading: "What to do when the rounds run out",
      paragraphs: [
        "Remind the client of the number and the definition, then offer a choice: an additional round at a stated price, a handover of the work as it stands, or a scope review if the direction has genuinely changed.",
        "Do not simply absorb the extra round. The first free round teaches the client that the number is decorative, and the next project starts with the same expectation.",
        "If the extra round is small and the relationship is strong, you can waive it deliberately and say so: \"I will include this one, but the next round is chargeable.\" A stated exception is different from an unspoken habit.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "A copywriter agrees three articles, two rounds each. Round one arrives as one email from the marketing lead with six consolidated comments. The writer returns a revised draft within two days. Round two arrives as a single set of line edits; the writer returns the final version.",
        "A third request arrives from the founder, who wants a different angle on one article. That is a new direction, not a revision. The writer quotes a rewrite for that article and keeps the other two on schedule. The project ends with the agreed fee, a clear extra charge and no resentment.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is two rounds of revision normal? Yes, for most defined freelance deliverables. Three is common for complex work with several approvers; one is enough only for tightly specified small work.",
        "Do revisions include changes of direction? No. A revision refines the agreed direction. A new direction is new work and should be quoted separately.",
        "Should I charge for a third round? If the scope says two, yes, unless you choose to waive it. Price it per round or per hour and state it before the work begins.",
        "What counts as one round if several people comment? One consolidated response from the named approver. If comments arrive separately, they are separate rounds unless you agree otherwise.",
        "How do I stop endless revisions? Define the round, name the approver, cap the number and put a price on the extra. The structure does more than a firm email.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Two rounds is the default, three for complex work, and the number is only useful with a definition. One round equals one consolidated response from one approver, followed by one revision. Put it in the scope, and the fourth round becomes a decision rather than a surprise.",
      ],
    },
  ],
};
