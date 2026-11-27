import type { BlogPost } from "../blog";

// AEO cluster — feedback turnaround. Sets an expectation and a remedy; distinct
// from revision rounds, which is about how many.

export const FEEDBACK_TURNAROUND_POST: BlogPost = {
  slug: "how-long-should-a-client-take-to-give-feedback",
  title: "How long should a client take to give feedback?",
  excerpt:
    "Two to three working days for a single approver is a fair default, and one consolidated round is worth more than a fast fragmented one. How to set the window and what to do when it slips.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "How many revisions should a client get?", to: "/blog/how-many-revisions-should-a-client-get" },
    { label: "How to handle scope creep", to: "/blog/how-to-handle-scope-creep" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Two to three working days is a fair default for feedback from a single approver on a defined deliverable. Complex work with several stakeholders needs longer — often five working days — and the contract or project plan should say so before the work starts.",
        "The number matters less than two other things: that the window is agreed in advance, and that the feedback arrives as one consolidated round from a named approver. A fast reply from three people with three opinions is slower than a considered reply from one.",
      ],
    },
    {
      heading: "How long should a client take to give feedback? The short answer",
      paragraphs: [
        "Set the window in the schedule: two to three working days for a single approver, five for a committee or a regulated review, and a stated time for legal or brand review if those exist. Put the date in the document that accompanies the deliverable.",
        "Say who the approver is. \\\"Feedback from the marketing lead by Thursday\\\" is a commitment; \\\"feedback from the team\\\" is an invitation to drift.",
        "State what happens if the window passes: the next milestone moves by the same number of days, or the review is treated as approved if the contract allows it. The second option needs to be agreed in advance and used sparingly.",
      ],
    },
    {
      heading: "Why feedback takes longer than clients expect",
      paragraphs: [
        "Approval is often a side task for someone whose main job is something else. The deliverable arrives, it is queued, and the queue moves when a meeting is cancelled.",
        "Multiple stakeholders multiply the delay. Each reviewer waits for the previous one to comment, and the comments conflict. One approver with the authority to decide is the single biggest speed improvement available.",
        "Some delays are legitimate: legal review, accessibility checks, translation, a board meeting. Those should be in the plan as named phases, not discovered as slippage.",
        "Some delays are avoidance. If the client is not sure about the direction, they may stall rather than say so. A short call often resolves in ten minutes what a week of silence will not.",
      ],
    },
    {
      heading: "How to set the expectation",
      paragraphs: [
        "Put the feedback window in the proposal, the schedule and the email that delivers the work. Three mentions is not nagging; it is how an expectation becomes normal.",
        "Give the client a template. \\\"Please reply with: approved / approved with changes / needs a call, plus any comments against the section numbers.\\\" A structured reply is faster to act on and easier to scope.",
        "Ask for one consolidated round. If three people need to comment, the client should collect the comments and send one set. This protects the revision count and stops a drip of small changes becoming a fourth round.",
        "Confirm the dates that depend on the feedback. \\\"If feedback arrives by Thursday, the build starts Monday and delivery stays on the 12th.\\\" The client can see the cost of the delay without you having to argue about it later.",
      ],
    },
    {
      heading: "When the window slips",
      paragraphs: [
        "Send one factual reminder on the day after the deadline, not before. It should reference the deliverable, the agreed date and the effect on the schedule. No apology and no editorialising.",
        "If there is no reply after two working days, call. A message can be ignored; a call usually produces an answer or a name of someone who can give one.",
        "Move the dependent dates and say so in writing. \\\"The delivery date moves from the 12th to the 17th to match the feedback date.\\\" Silent slippage is how a project ends up late while everyone believes it is on time.",
        "If the delay is repeated and significant, raise it as a project risk rather than a personal complaint. \\\"The last two rounds took nine days each, which puts the launch at risk\\\" is a fact the client can act on.",
      ],
    },
    {
      heading: "Should late feedback cost more?",
      paragraphs: [
        "Sometimes. If the contract includes a validity window for dates, or a rescheduling fee for delays caused by the client, it should be clear and proportionate. A fee that appears for the first time after a delay reads as a penalty.",
        "The more common and more effective remedy is schedule movement, not money. The client feels the consequence in the launch date, which is usually what they care about most.",
        "If you do charge, apply it consistently and only to delays beyond the agreed window. Selective enforcement turns a neutral clause into a grievance.",
      ],
    },
    {
      heading: "Feedback quality matters as much as speed",
      paragraphs: [
        "A fast \\\"looks good\\\" from someone who has not read the document is worse than a slow, specific review. Ask for comments against the brief and the acceptance criteria, not general impressions.",
        "If the feedback contradicts the brief, say so before implementing it. \\\"This changes the audience we agreed in section 2 — should we update the brief?\\\" is how a change becomes a change request rather than free rework.",
        "Keep the feedback with the version it refers to. A comment on v2 applied to v4 is how a revision goes wrong.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should a client have to review work? Two to three working days for a single approver on a defined deliverable; up to five for multiple stakeholders or formal review. Agree the window before the work starts.",
        "What if the client does not give feedback on time? Remind them once, move the dependent dates in writing, and escalate to a call if there is still no response. Keep the schedule consequence visible.",
        "Should I charge for late feedback? Only if the contract provides for it and the charge is proportionate. Moving the schedule is usually more effective than a fee.",
        "Can feedback be treated as approval if the client is silent? Only if the contract says so, and only after a clear written notice. Silence is weak evidence without an agreed deemed-approval clause.",
        "How many people should review the work? One approver with authority is ideal. If several must comment, the client should consolidate their feedback into one round.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Put the feedback window in writing, name the approver, ask for one consolidated round, and move the dates when the window slips. Speed is useful, but a single clear decision is what actually keeps a project on schedule.",
      ],
    },
  ],
};
