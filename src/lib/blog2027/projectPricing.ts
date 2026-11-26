import type { BlogPost } from "../blog";

// SEO cluster — commercial. Price-setting method; article 5 covers packaging
// recurring work and article 9 covers revision rounds.

export const PROJECT_PRICING_POST: BlogPost = {
  slug: "how-to-price-a-freelance-project",
  title: "How to price a freelance project without guessing",
  excerpt:
    "Cost gives you a floor, the market gives you a range, and the value gives you a ceiling. A practical method for estimating hours, pricing risk and presenting three options the client can actually choose between.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Retainer agreement guide", to: "/blog/retainer-agreement-guide" },
    { label: "How many revisions should a client get?", to: "/blog/how-many-revisions-should-a-client-get" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Most freelancers price by looking at the last project, adding a little, and hoping. That works until the work changes shape, the client asks for a discount, or a competitor quotes half the number and you cannot tell whether they are cheaper or simply wrong.",
        "A price is not a single number pulled from the air. It is three numbers in tension: what the work costs you, what the market pays for it, and what the outcome is worth to this client. Good pricing finds the overlap and presents it clearly.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Estimate the hours, multiply by your target rate, add a risk buffer for the parts you cannot control, then check the result against the market and the client's value. Present three options — a smaller scope, the recommended scope and an expanded scope — with the same rate logic behind all three.",
        "If the number feels uncomfortable, the problem is usually the scope or the client, not the arithmetic. Discounting the rate to make a bad project fit is how good freelancers end up busy and broke.",
      ],
    },
    {
      heading: "Start with your cost floor",
      paragraphs: [
        "Your floor is the amount you need to earn per billable hour to cover your costs and the hours you cannot bill. Add your annual costs — software, insurance, equipment, accounting, pension, holiday, sick time, sales and admin — to the income you need, then divide by the billable hours you can realistically sell in a year.",
        "A freelancer who needs £60,000 and can bill 1,000 hours needs £60 an hour before tax and before profit. If only 70% of working time is billable, the effective rate on every project has to be higher, not the same. This is not the price you charge; it is the line below which the work does not pay for itself.",
        "Review the floor once a year. It moves when your costs move, and a rate that was adequate two years ago may now be a slow loss.",
      ],
    },
    {
      heading: "Estimate the work in blocks",
      paragraphs: [
        "Line-by-line estimates are optimistic because they assume the work is linear. Estimate in blocks instead: discovery, production, review, delivery, project management and contingency. Give each block a range, then use the upper end for the parts that depend on the client.",
        "For each block, write the assumption behind the number. \"Five pages at six hours each\" is an estimate; \"five pages at six hours each, assuming final copy is supplied and one round of changes\" is an estimate with a boundary. The boundary is what makes the number defensible.",
        "Add a contingency of 15–25% for fixed-fee work. It is not padding; it is the price of carrying the risk that the work takes longer than expected. If the project runs exactly to plan, the contingency is your margin. If it does not, it is what stops the project becoming a loss.",
      ],
    },
    {
      heading: "Check the market, carefully",
      paragraphs: [
        "Market rates are a range, not a target. Look at what comparable suppliers charge for comparable scope, in the same market and at the same level of experience. A day rate from a large agency is not a benchmark for a solo designer, and a marketplace price is not a benchmark for bespoke work.",
        "Use the market to sense-check, not to set the number. If your estimate is far above the range, the scope may be larger than the client expects, or you may be selling to the wrong segment. If it is far below, you may be underestimating the work or underpricing your experience.",
      ],
    },
    {
      heading: "Find the value ceiling",
      paragraphs: [
        "The value ceiling is the most the outcome is worth to the client. It is easiest to see when the work connects to revenue, cost or risk: a booking system that saves ten hours a week, a landing page that supports a launch, a contract that reduces exposure on a large deal.",
        "Ask what the client will do with the result, what happens if it is late, and what they would spend on the alternative. You are not trying to capture all of the value; you are trying to avoid charging a fraction of it for work that carries real commercial weight.",
        "For work with no direct financial outcome — a personal project, a small brand refresh — the market range and your cost floor will do most of the work. Not every project needs a value conversation.",
      ],
    },
    {
      heading: "Price the risk, not just the hours",
      paragraphs: [
        "Two projects can take the same hours and carry very different risk. A fixed-fee project with an unclear brief, multiple approvers and a hard launch date is riskier than a time-and-materials project with one decision-maker. The price should reflect that difference.",
        "Identify the risk factors: scope uncertainty, number of stakeholders, dependency on client-supplied content, fixed deadlines, payment history, and whether the client has bought this kind of work before. If several are present, either add a risk premium or change the terms — staged payments, a discovery phase, or a time-and-materials structure.",
        "The alternative to pricing risk is absorbing it. That is a decision, not a discount, and it should be made deliberately.",
      ],
    },
    {
      heading: "Present three options",
      paragraphs: [
        "A single price invites a yes/no decision. Three options invite a choice about scope. The smallest option should solve the core problem with fewer deliverables; the recommended option should be the scope you believe is right; the largest should add the things the client will probably want later.",
        "Keep the rate logic consistent across all three. If the small option is £2,000 for four days and the large is £6,000 for nine days, the arithmetic should be visible, not a mysterious jump. Options are not discounts in disguise; they are different amounts of work.",
        "Name what each option leaves out. The client should be able to see the trade-off without reading the whole proposal, and the cheapest option should be genuinely viable rather than deliberately weakened.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "A freelancer needs £65,000 a year and can bill 1,100 hours, so the floor is about £59 an hour. A five-page website is estimated at 60 hours of production, 10 hours of project management and 8 hours of discovery: 78 hours. At £75 an hour that is £5,850; a 20% contingency brings it to £7,020, rounded to £7,000.",
        "The market range for comparable work is £5,000–£9,000. The client's outcome is a launch that supports a £40,000 campaign, so the value ceiling is well above the estimate. The price sits inside the range and above the floor, which is the overlap to aim for.",
        "The proposal offers three options: a four-page version at £5,400, the recommended five-page version at £7,000, and a six-page version with a copywriting support block at £8,600. Each has the same day-rate logic, the same payment schedule and a clearly different scope.",
      ],
    },
    {
      heading: "What to put in the price — and what not to",
      paragraphs: [
        "Include the work, the project management, the communication and the risk. Exclude anything the client will supply: content, photography, licences, hosting, printing. Name those exclusions so the price is not compared with a quote that quietly includes them.",
        "Do not include speculative work, unlimited revisions or an open-ended support period without a boundary. If you want to offer a guarantee, make it a defined remedy — a refund of a stage fee, an extra round — rather than an unlimited promise.",
        "Do not discount for a promise of future work. A discount is a real loss today; future work is a hope. If you want to reward a repeat client, do it with a clear policy, not an improvised reduction.",
      ],
    },
    {
      heading: "When the client says it is too expensive",
      paragraphs: [
        "First, find out what is too expensive: the total, the timing, or the scope. A client who expected £3,000 for a £7,000 scope is not negotiating; they are describing a different project. A client who can afford £7,000 but needs to pay later is a terms conversation, not a price conversation.",
        "If the budget is genuinely lower, reduce the scope rather than the rate. Remove a deliverable, reduce the rounds, simplify the approach, or split the work into phases. A lower price for the same scope teaches the client that your first number was invented.",
        "If the client needs the full scope and cannot fund it, the honest answer is that the project is not viable at that budget. Saying so early is better than delivering a compromised version and being blamed for the gap.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Should I charge hourly or fixed fee? Fixed fee suits well-defined work and rewards efficiency; hourly suits uncertain scope and protects you when the work expands. Many freelancers use fixed fee for defined projects and hourly or a retainer for ongoing work.",
        "How much should I add as a contingency? Fifteen to twenty-five per cent for fixed-fee work with normal uncertainty. Add more if the brief is thin, the client has multiple approvers or the deadline is fixed.",
        "How do I price the first project with a new client? Price the work, not the relationship. A first project can include a paid discovery phase to reduce uncertainty, which is better than a speculative discount.",
        "Do I have to show my day rate? No. Show the price for the scope, and be ready to explain the logic if asked. Transparency about assumptions matters more than publishing a rate card.",
        "What if I underestimate? Deliver the agreed scope at the agreed price, then change the process for the next project: smaller phases, clearer assumptions, more contingency. Renegotiating a fixed fee mid-project damages trust unless the scope genuinely changed.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Price from the floor up and the value down, then land inside the market range. Estimate in blocks, name your assumptions, charge for risk and present a choice of scopes. The number will still be a judgement, but it will be a judgement you can explain — and that is what makes it defensible in the room.",
      ],
    },
  ],
};
