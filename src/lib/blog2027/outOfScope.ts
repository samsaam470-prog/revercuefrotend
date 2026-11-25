import type { BlogPost } from "../blog";

export const OUT_OF_SCOPE_POST: BlogPost = {
  slug: "out-of-scope-clause",
  title: "The out-of-scope clause: what it should say and why it matters",
  excerpt:
    "The clause that protects a project is not the one that lists what you will do. It is the one that says what you will not, and what happens when the client asks for it anyway. Here is how to write it in plain English.",
  date: "2026-11-25",
  readMinutes: 11,
  links: [
    { label: "How to handle scope creep", to: "/blog/how-to-handle-scope-creep" },
    { label: "How to write a change request", to: "/blog/how-to-write-a-change-request" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Every freelance contract has a scope section, and most of them are written as a promise: the freelancer will deliver five pages, two rounds of revisions and a handover. That is necessary, and it is not where the protection is. The protection is in the sentence that follows, which says what is not included and what happens if the client wants it.",
        "Without that sentence, the contract describes an intention rather than a boundary. Anything the client can plausibly associate with the project becomes arguable, and arguments about scope are expensive even when you win them. This article explains what an out-of-scope clause should contain, why the plain-English version beats the legal-looking one, and how it interacts with the change process.",
        "This is general information, not legal advice. Contract terms are interpreted differently by jurisdiction, and a clause that is standard in one country may be unenforceable in another. For a significant project, have the contract reviewed by a qualified adviser.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "An out-of-scope clause does three things. It lists the categories of work that are not included. It defines the quantities that are included, because quantities are where most disputes live. And it states the mechanism for adding work: a written change request with a price and a schedule impact, approved before the work begins.",
        "Three short paragraphs are enough. The clause does not need to anticipate every request; it needs to make clear that the scope is finite and that additions have a process. A client who understands the process rarely argues about the boundary, because the boundary is no longer personal.",
      ],
    },
    {
      heading: "Why the exclusions matter more than the inclusions",
      paragraphs: [
        "Inclusions tell the client what they are buying. Exclusions tell them what they are not, which is the information that prevents disappointment later. A proposal that lists five pages and says nothing about copywriting leaves the client free to assume the words are included, and the assumption is reasonable because it was never contradicted.",
        "The exclusions also do something subtler: they make the price legible. A client comparing two quotes of 4,000 and 6,000 needs to know what each includes, and the cheaper quote that silently excludes copywriting is not cheaper at all. A clear exclusion list is a sales document as much as a legal one, because it lets the client compare like with like.",
        "Write them in the client's language, not yours. Copywriting, photography, stock licences, hosting, ongoing maintenance, content migration beyond twenty posts, and third-party fees are the usual list. If you work in a regulated field, add approvals, compliance review and anything requiring a specialist. One line each, no explanation required.",
      ],
    },
    {
      heading: "Quantities: the quiet part",
      paragraphs: [
        "Most scope disputes are not about categories. They are about numbers. A logo, a page, a revision round, an image, a product variant: each of these is a unit, and each unit is a place where the project can grow without anyone deciding to grow it.",
        "State the numbers explicitly and define the unit. Five pages, where a page means a unique layout at one URL. Two revision rounds, where a round means one consolidated set of feedback delivered in a single message. Up to ten products in the initial upload. Three stock images. When the client asks for a sixth page, the conversation is about a number rather than about whether the request is reasonable.",
        "Define the unit carefully, because a vague unit is worse than no unit. Unlimited revisions is not a term; it is an invitation. Unlimited pages within a template is ambiguous the moment the client wants a layout that does not exist. The tighter the definition, the less there is to interpret, and the less interpreting you have to do under pressure.",
      ],
    },
    {
      heading: "The change mechanism",
      paragraphs: [
        "The clause should end with the process: work outside this scope is quoted in writing before it begins, with its cost and its effect on the schedule, and it starts only when approved in writing. That single sentence converts every future request into a decision rather than a confrontation.",
        "It also protects the client. A process that requires written approval means nobody can add work to a project without the person paying knowing about it. For a client with a team, that is a feature: it stops a junior colleague from quietly expanding the engagement and surprising the finance department.",
        "Make the mechanism easy to use. If a change request takes you a day to produce, you will not send one, and the clause becomes decoration. Four lines and a number, sent in the same thread, is the right weight. The clause is the rule; the change request is the practice.",
      ],
    },
    {
      heading: "What a plain-English version looks like",
      paragraphs: [
        "Something like this: this agreement covers the five pages listed in Appendix A, two rounds of revisions per page, and the handover described in section four. It does not include copywriting, photography, stock licences, hosting, content migration beyond twenty posts, or any third-party fees. Additional pages, revision rounds or deliverables are quoted in writing before they begin, with their cost and schedule impact, and are added only when approved in writing.",
        "That paragraph is about a hundred words. It is readable, it is specific, and it gives both parties a clear answer to the question that causes most freelance arguments. It does not need a defined-terms section or a numbering scheme. Clarity is the goal, and clarity is usually shorter than the version a template would give you.",
        "Add one line about what happens if the client's requirements change materially after approval. Reopening an approved decision after the work has moved past it is new work, not a revision, and the price should reflect when the change arrives rather than only what it is.",
      ],
    },
    {
      heading: "Where it belongs",
      paragraphs: [
        "Put the clause in the contract, and reference it in the proposal. The proposal is where the client decides, so it should show the scope and the exclusions in plain language. The contract is where it becomes binding, so it should carry the same list, ideally identical wording. When the two documents disagree, the client will rely on the one that suits them, and you will spend an afternoon reconciling them.",
        "If you send a requirement form, the answers become part of the scope too. A form that collects the number of products, the number of pages and the languages is doing scope work, and its answers should feed the contract rather than sit in a separate inbox. This is one practical argument for keeping the form, the contract and the invoice on one client thread: the scope is not a single document, it is the chain of them.",
        "Review the clause once a year. If you have absorbed the same kind of request three times, the clause is missing a category. If you have never used a category, it may be doing nothing but worrying the client. The list should reflect the work you actually do, not the work you imagine you might be asked for.",
      ],
    },
    {
      heading: "The mistakes that make the clause useless",
      paragraphs: [
        "The first is writing it after the project starts. A clause agreed mid-project applies to the next project, not this one, and raising it during a disagreement reads as moving the goalposts. The second is making it longer than the scope itself, which signals distrust and invites the client to negotiate the whole document.",
        "The third is a clause with no mechanism. Saying additional work is chargeable without saying how it is quoted, approved and scheduled leaves the most important question open. The fourth is inconsistency: a contract that says two revision rounds, a proposal that says three, and an invoice that mentions a change fee nobody agreed to. One scope, one set of numbers, repeated in every document.",
        "The fifth mistake is the hardest to avoid: not applying it. A clause that is never enforced is a clause that teaches the client the boundary is theoretical. Every time you absorb an out-of-scope request silently, you make the next conversation harder, and you make the clause less credible to the person who is paying you.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is an out-of-scope clause legally binding? In most jurisdictions a clear, agreed clause is enforceable, but enforceability depends on local law and on how the contract was formed. Treat it as a communication tool first and a legal one second, and take advice for high-value work.",
        "Should the clause list prices for extras? Not necessarily, but listing a rate for additional pages or revision rounds removes a negotiation later. A stated unit price is often the difference between a quick approval and a stalled request.",
        "What if the client refuses to sign a contract with exclusions? Ask which exclusions concern them. Often the objection is to one line, not the clause, and that line is usually a misunderstanding about what the project includes.",
        "Does this replace a change request? No. The clause sets the rule, and the change request applies it. A contract without a change habit is a rule nobody uses.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "The out-of-scope clause is the cheapest protection in a freelance contract. List the categories you do not do, define the quantities you do, and say how new work is quoted and approved. Keep it to a hundred plain words, repeat it in the proposal, and use it every time. The boundary is not there to say no to clients; it is there so that yes has a price.",
      ],
    },
  ],
};
