import type { BlogPost } from "../blog";

// Cluster B — money. Search intent is a number, so the article gives ranges
// and the reasoning behind them, with a plain caveat that it is not legal advice.

export const PAYMENTS_DEPOSIT_POST: BlogPost = {
  slug: "how-much-deposit-should-a-freelancer-ask-for",
  title: "How much deposit should a freelancer ask for?",
  excerpt:
    "Most freelancers ask for too little, too late, or with no conditions attached. Here is what a deposit is actually for, the percentages that work, and the wording that gets it paid without a negotiation.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Invoices in Revercue", to: "/features/invoices" },
    { label: "Freelance payment terms", to: "/blog/freelance-payment-terms" },
    { label: "What to do when a client does not pay", to: "/blog/when-a-client-does-not-pay-an-invoice" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The question sounds like it has a number for an answer, and most advice obliges with a range: 25 percent, 50 percent, a third. Those numbers are not wrong, but they answer the wrong question. A deposit is not a tip for enthusiasm or a test of whether the client trusts you. It is the money that lets you start work without carrying the whole risk of the project, and the right figure is the one that covers what you spend before the first invoice is due.",
        "Get that order right and the percentage becomes obvious. Get it wrong and you end up with a deposit that feels like a negotiation, a client who resents it, and a project that is still unpaid in month three.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "For most project work, 30 to 50 percent up front is normal, with the rest on delivery or across milestones. Long engagements are better split into monthly payments or milestones than a single deposit. Retainers are paid in advance for the month. The number matters less than the condition attached to it: what the deposit covers, whether it is refundable, and what happens if the project is cancelled. A deposit with no conditions is just a smaller invoice with more hope.",
      ],
    },
    {
      heading: "Why a deposit is not about trust",
      paragraphs: [
        "Freelancers often avoid asking because asking implies distrust, and distrust is uncomfortable in a relationship they want to be collaborative. The client, meanwhile, is not insulted by a deposit; they are used to paying one for a venue, a solicitor or a builder. What reads as unprofessional is not the request, it is the vagueness around it: a deposit that appears for the first time in an invoice, with no explanation and no terms.",
        "A deposit also does something quieter than protecting cash flow. It converts interest into commitment. Clients who are still deciding often agree to a proposal and then drift; a deposit request is the point where the project either becomes real or reveals that it was never funded. Discovering that in week one is much cheaper than discovering it in week six, when you have already turned down other work.",
      ],
    },
    {
      heading: "The rule that matters more than the percentage",
      paragraphs: [
        "Work backwards from your costs. Add the software, subcontractors, stock, travel and any deposit you pay on the client's behalf, plus the hours you will spend before the first milestone payment lands. That number is your floor. If 25 percent does not cover it, the percentage is too low for this project regardless of what is normal in your field.",
        "Then think about exposure. A three-week website is a small risk; a six-month brand programme with a large subcontracted print run is not. The longer the project and the more you spend on the client's behalf, the more the payment schedule should look like a series of small bets rather than one large one.",
      ],
    },
    {
      heading: "Choosing a number for your situation",
      paragraphs: [
        "Project work under a month: 50 percent up front and 50 percent on delivery is simple, common and easy to explain. Work that runs for months: a smaller mobilisation payment, then equal monthly invoices or milestone payments tied to deliverables the client can see. Retainers: the full month in advance, because the retainer buys availability rather than output, and availability is consumed whether or not the client uses it.",
        "For new clients, the first project can carry a higher deposit than later ones, and it is reasonable to say so: new clients start at 50 percent, returning clients at 30. That is not a penalty, it is the same logic a landlord uses. If a client pushes back hard on any deposit at all, treat that as information about how the invoices will go later.",
      ],
    },
    {
      heading: "How to ask without making it awkward",
      paragraphs: [
        "Put it in the proposal, not in a separate conversation after the yes. One line is enough: the project starts with a 40 percent deposit, which covers the research and setup, with the balance on delivery. The invoice goes out with the contract, and work begins when it clears. Saying when work begins is the part that makes the request feel like a process rather than a favour.",
        "If the client asks to reduce it, do not simply agree. Reduce the scope to match, or move the first milestone earlier so the money arrives sooner. What you are protecting is not the percentage but the principle that you are never far ahead of your invoices.",
      ],
    },
    {
      heading: "What to put in writing",
      paragraphs: [
        "Four things, in plain English. What the deposit pays for. Whether it is refundable, and until when. What happens to it if the client cancels, and what happens if you do. And when the balance is due. A deposit described as non-refundable once work has started is normal; a deposit described as non-refundable with no explanation will start an argument you do not need.",
        "This article is general information rather than legal advice, and the rules differ by country, so keep the wording simple and, for anything large, have a professional read it once. The goal is a clause both sides understand without a lawyer in the room.",
      ],
    },
    {
      heading: "What the deposit does not fix",
      paragraphs: [
        "It does not fix a client who will not pay the balance, a scope that was never defined, or a project with no written agreement. It is one control among several: payment terms, a change process and an approval step do the rest. Treat the deposit as the first of those controls rather than the whole safety net.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is 50 percent too much to ask? No, for project work under a month it is common and easy to justify. It becomes too much when it is asked for without explaining what it covers.",
        "Should the deposit be non-refundable? It should be non-refundable once work has started, which protects the time you have already spent. Before work starts, a refund is usually the fair outcome.",
        "What if the client is a large company that only pays on 60-day terms? Ask for the deposit to be paid by card or on a separate shorter invoice, and get the payment route agreed before the contract is signed.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Pick a deposit that covers your costs before the first milestone, explain what it buys, say when work begins, and put the conditions in the agreement rather than in your head. The number will vary by project and by client. The clarity should not.",
      ],
    },
  ],
};
