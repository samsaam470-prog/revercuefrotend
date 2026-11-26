import type { BlogPost } from "../blog";

// SEO cluster — commercial. Recurring engagement model; article 4 covers how to
// set a price, article 13 how to keep versions straight.

export const RETAINER_GUIDE_POST: BlogPost = {
  slug: "retainer-agreement-guide",
  title: "Retainer agreements for freelancers: capacity, terms and the maths",
  excerpt:
    "A retainer is not a project paid monthly. It is a capacity commitment with its own rules: what the client can use, what happens to unused time, how either side ends it, and how to price it so it stays profitable.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "How to price a freelance project", to: "/blog/how-to-price-a-freelance-project" },
    { label: "Contract version control", to: "/blog/contract-version-control" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A retainer looks like the answer to an unstable income: a client pays every month, you plan your capacity, and the sales cycle stops starting from zero. Then the client treats it as an unlimited support line, the month fills with small requests, and the retainer becomes the worst-paid project you have.",
        "The problem is rarely the retainer model. It is that the agreement never defined what the retainer buys. A retainer is a capacity commitment, not a friendship with an invoice attached.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Sell a defined amount of capacity or a defined set of outputs per month, state how requests are made and prioritised, decide what happens to unused time, and set a notice period and a review date. Price it from the same cost floor as project work, then add a small premium for the availability you are reserving.",
        "If a client needs unpredictable, urgent access, that is a different product: a priority or access retainer, priced higher because you are holding time you may not use.",
      ],
    },
    {
      heading: "Three kinds of retainer",
      paragraphs: [
        "A capacity retainer sells hours or days per month. It is the most flexible for the client and the easiest to administer, but it invites the question of what happens to unused time. It suits ongoing design, development or marketing support where the work varies.",
        "A deliverable retainer sells a defined output: a monthly report, four articles, a set number of support tickets. It is easier to value because the client can see what arrives, and it protects you from a queue of small requests that consume the capacity without producing the output.",
        "An access or priority retainer sells availability rather than volume: a guaranteed response window, a named contact, a reserved slot each week. It is appropriate for clients who need someone on call, and it should be priced for the time you reserve even when the time is quiet.",
      ],
    },
    {
      heading: "When a retainer is the right shape",
      paragraphs: [
        "A retainer fits when the work is ongoing, the client needs continuity and the demand is reasonably predictable. It does not fit when the work is a series of discrete projects, when the client cannot describe what they need month to month, or when the volume is so low that the admin outweighs the revenue.",
        "A useful test: would the client be worse off if you disappeared for a month? If yes, continuity has value and a retainer can capture it. If they would simply hire you again when the next project arrives, a project fee is cleaner for both sides.",
      ],
    },
    {
      heading: "Do the capacity maths first",
      paragraphs: [
        "Start with the hours you can actually deliver each month. Take your billable hours, subtract holiday, sick time and admin, and divide by twelve. A freelancer with 1,100 billable hours a year has roughly 90 a month; retaining 30 of them to one client uses a third of the business.",
        "Price the retainer from your target rate, not from a discount. If your rate is £75 an hour and the retainer is 20 hours a month, the base value is £1,500. Add a premium if you are reserving availability, guaranteeing a response time or giving the client priority over project work.",
        "Then check utilisation. If the client consistently uses only half the capacity, the retainer is either over-sold or over-priced for their actual need. If they consistently exceed it, the retainer is under-sold and the overage needs a rate.",
      ],
    },
    {
      heading: "Define what the retainer buys",
      paragraphs: [
        "The agreement should state the unit — hours, days, outputs or availability — the amount per month, the period it covers and whether it rolls over. \"Up to 20 hours of design and production work per calendar month\" is a definition; \"ongoing design support\" is not.",
        "List what is included and what is not. Typical inclusions: scheduled work, revisions within the agreed rounds, a monthly planning call, a response window. Typical exclusions: new projects above a threshold, out-of-hours work, third-party costs, travel, and work that requires a separate specialist.",
        "Say how requests are prioritised when demand exceeds capacity. A simple rule works: requests are taken in writing, scheduled in the order received, and anything that cannot fit moves to the next month or becomes a separate quote.",
      ],
    },
    {
      heading: "Unused time: roll over, expire or credit",
      paragraphs: [
        "There are three common approaches. Rollover lets unused hours carry into the next month, usually with a cap such as one month's worth. Use-it-or-lose-it keeps the retainer simple and protects your capacity. A credit gives the client a discount on future work instead of time.",
        "Rollover is the most client-friendly and the most dangerous for capacity planning, because a quiet month can become a double month later. If you offer it, cap it. If you do not, say so in the agreement and explain it before the client signs, not when they ask for the unused hours.",
        "Whatever you choose, be consistent. A client who discovers the rule at the end of a quiet month will feel misled even if the contract is clear.",
      ],
    },
    {
      heading: "Term, renewal and notice",
      paragraphs: [
        "Retainers usually run month to month or in a fixed term of three, six or twelve months. Fixed terms are easier to plan and can justify a lower monthly price; rolling terms are easier to sell and require a notice period to protect your capacity.",
        "A workable structure: an initial term of three months, then rolling monthly with 30 days' written notice from either side. The initial term gives the relationship time to work; the notice period gives you time to replace the revenue.",
        "Include a review point. A short review at the end of the initial term — usage, priorities, price — prevents the slow drift where the scope grows and the fee does not.",
      ],
    },
    {
      heading: "Payment and the pause clause",
      paragraphs: [
        "Invoice in advance, on a fixed date, with payment due within a stated period. A retainer is a reservation of capacity, so paying after the month has been used reverses the risk: you hold the time, the client holds the money, and a late payment becomes a collection problem.",
        "Add a pause clause. If the client does not pay, or asks to pause, the capacity is released after a defined period and the retainer is renegotiated on return. Without it, a paused retainer can leave you holding a slot that produces no revenue.",
        "Also deal with overage. Work beyond the monthly capacity should be quoted at your standard rate, with the client's written approval before it starts. An overage rate that is higher than the retainer rate is normal, because it is unplanned work.",
      ],
    },
    {
      heading: "Ending it well",
      paragraphs: [
        "The end of a retainer should be as defined as the start. State the notice period, what happens to unused time, how work in progress is handed over, and which clauses survive — confidentiality, IP and payment obligations usually do.",
        "Offer a handover: final files, access, documentation and a short summary of open items. It costs a few hours and protects the reference. The client who leaves badly is unlikely to return; the one who leaves cleanly often does.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "A designer offers 24 hours a month at £80 an hour: £1,920 a month, invoiced on the first, payable within seven days, with a three-month initial term and 30 days' notice afterwards. Requests come through a single written channel and are scheduled in order.",
        "Unused hours roll over for one month, capped at 24. Work beyond 24 hours is quoted at £95 an hour and needs written approval. The client gets a monthly planning call and a response within one business day; out-of-hours work and third-party costs are excluded.",
        "At the review, the client has used 22, 26 and 18 hours. The overage was billed, the unused six hours rolled into the next month, and the fee stays the same. The arrangement is profitable because the capacity was priced, not discounted, and the boundaries were visible from the first invoice.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "What is a retainer agreement? An agreement for ongoing services paid on a recurring basis, usually for a defined capacity, output or availability rather than a single project. It should state what the fee buys and how the relationship ends.",
        "Should unused hours roll over? It is a commercial choice. Rollover is friendlier but harder to plan; use-it-or-lose-it is simpler but can feel harsh. If you roll over, cap it at one month.",
        "How much should a retainer cost? Price the capacity at your target rate, then add a premium if you are reserving availability or guaranteeing response times. Do not discount the rate simply because the client is committing.",
        "Can I have more than one retainer client? Yes, but check the total reserved capacity against your deliverable hours. Two 30-hour retainers use two-thirds of a 90-hour month before any project work.",
        "Is a retainer legally binding? A retainer agreement can be a binding contract if it contains the essential terms and is accepted. Whether particular clauses are enforceable depends on the jurisdiction; this is general information, not legal advice.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A retainer is a product, not a payment plan. Define the unit, price the capacity, decide what happens to unused time, and give both sides a clean exit. Do that and the recurring revenue is genuinely recurring, rather than a monthly argument with an invoice attached.",
      ],
    },
  ],
};
