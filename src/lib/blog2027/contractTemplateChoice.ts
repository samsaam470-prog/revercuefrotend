import type { BlogPost } from "../blog";

// GEO cluster — comparison. Template sources and the five checks that matter.

export const CONTRACT_TEMPLATE_POST: BlogPost = {
  slug: "how-to-choose-a-contract-template",
  title: "How to choose a contract template: four sources, five checks",
  excerpt:
    "A lawyer, a trade body, a template marketplace or a generator. Each produces a different document with different risks. Here is how to judge one before you put your name on it.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Freelance contract checklist", to: "/blog/freelance-contract-checklist" },
    { label: "Freelance contract glossary", to: "/blog/freelance-contract-glossary" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Every contract template looks plausible. That is the problem. A document with the right headings and a signature block can still name the wrong law, assign the wrong rights or leave out the clause that decides who pays when the project stops.",
        "The source of a template tells you what kind of review it has had, but not whether it fits your work. Choosing well is a matter of matching the source to the risk and checking the same five things every time.",
      ],
    },
    {
      heading: "The four sources",
      paragraphs: [
        "A lawyer-drafted bespoke contract is the strongest option and the most expensive. It is written for your jurisdiction, your service and your risk appetite, and it comes with advice. It is worth it when the value, the regulatory exposure or the client's bargaining power justifies the cost.",
        "A trade body or industry association template is written for a sector and usually reviewed by lawyers. It is a good starting point for standard services, but it may reflect the association's priorities rather than yours, and it can be generic about scope and payment.",
        "A template marketplace sells documents at a low price. Quality varies enormously. Some are drafted by lawyers for a specific jurisdiction; others are copies with the names changed. The convenience is real, and so is the risk of a clause that does not fit.",
        "A generator or document tool assembles a contract from answers to questions. It is fast and can be consistent, but the output is only as good as the questions and the underlying clauses. A generated contract should be read like any other draft, not trusted because it looks complete.",
      ],
    },
    {
      heading: "Check 1: jurisdiction",
      paragraphs: [
        "The template should name the governing law and the forum for disputes, and those should match where you and the client actually are. A US-style agreement used in the UK can produce clauses that are unenforceable or that mean something different from what you intended.",
        "Watch for jurisdiction-specific assumptions: employment status, statutory interest on late payment, consumer cancellation rights, data protection obligations, mandatory arbitration. If the template does not mention them, it may not have been drafted for your market.",
        "If you work across borders, the choice of law is a commercial decision as well as a legal one. Ask a lawyer which jurisdiction gives you a realistic remedy, not just which is familiar.",
      ],
    },
    {
      heading: "Check 2: scope fit",
      paragraphs: [
        "A template written for a construction subcontractor will not fit a copywriting engagement, even if both are called services agreements. The scope, insurance, warranties and payment structures are different.",
        "Check whether the template has a schedule for deliverables and a change process. If it assumes a project with a fixed site, a retainer with monthly hours or a licence with royalties, the clauses may import obligations that make no sense for your work.",
        "The best template is the one you can adapt without rewriting half of it. If you have to replace every substantive clause, you are paying for a format rather than a contract.",
      ],
    },
    {
      heading: "Check 3: the clauses that allocate risk",
      paragraphs: [
        "Read the IP, liability, indemnity, termination and payment clauses first. These are where a template earns or loses its value. A document that looks comprehensive but leaves liability unlimited or assigns all your pre-existing materials is not a safe default.",
        "Check the payment mechanism: when invoices are due, what happens if they are late, whether a deposit is refundable and how work already done is treated on cancellation. A template without these is a template without a money clause.",
        "Check the termination tail: notice, kill fee, handover and survival. The end of a contract is where the most expensive surprises live.",
      ],
    },
    {
      heading: "Check 4: usability",
      paragraphs: [
        "A contract the client cannot read is a contract they will not follow. Plain language, short sentences, clear headings and a schedule for the scope are worth more than archaic phrasing that sounds legal.",
        "Check that the template can be edited without breaking its numbering or cross-references. If it is a PDF that cannot be changed, it is a form, not a template, and you will be adapting your deal to the document rather than the document to the deal.",
        "Check the signature block: names, roles, dates, authority and a place for each party. A contract that is hard to sign is a contract that sits unsigned.",
      ],
    },
    {
      heading: "Check 5: maintenance",
      paragraphs: [
        "Law and practice change. A template that was accurate three years ago may now be missing a data protection clause, a new statutory payment right or a change in the rules on electronic signatures.",
        "Ask when the template was last reviewed and by whom. If the answer is unclear, treat it as a draft to be checked rather than a finished document. Keep a note of the version you used and the date.",
        "If you reuse a template, review it annually and after any significant change in your work, your jurisdiction or your client base. The review is cheaper than discovering the gap during a dispute.",
      ],
    },
    {
      heading: "When to pay a lawyer",
      paragraphs: [
        "Pay for a review when the value of the deal is significant, when the client has more bargaining power, when the work is regulated, when you are contracting across borders, or when the template contains a clause you do not understand.",
        "A one-off review of your standard contract can be cheaper than reviewing every deal, because it produces a reusable baseline. Ask the lawyer to explain the risky clauses as well as fix them, so you can spot changes in the client's redlines.",
        "This article is general information, not legal advice. A template, however good, is not a substitute for advice on a specific agreement.",
      ],
    },
    {
      heading: "A decision rule",
      paragraphs: [
        "Use a lawyer-drafted contract when the risk justifies it; a trade body template when your work is standard for a sector; a marketplace template when you can verify the jurisdiction and read the risk clauses; a generator when you will review the output and the terms are ordinary.",
        "Whatever the source, run the five checks: jurisdiction, scope fit, risk allocation, usability and maintenance. A template that passes all five is a starting point. A template that fails any of them is a liability with nice formatting.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Are free contract templates safe to use? They can be, if they are drafted for your jurisdiction and you read the risk clauses. Free templates often omit liability, IP or termination detail because those are the parts that take time to draft.",
        "Can I use the same template for every client? A baseline contract can be reused, but the scope, schedule and commercial terms must be adapted each time. Reusing the scope from another client is how the wrong deliverables end up in the agreement.",
        "Should I use a lawyer or a template? Use a template for ordinary work and a lawyer for significant risk. A one-off review of your standard contract is often the best value.",
        "How often should I update my contract template? At least annually, and whenever the law, your services or your client base changes. Keep the version and date so you know what you signed.",
        "Is a generated contract legally valid? A contract can be valid if it meets the legal requirements in the relevant jurisdiction, regardless of how it was produced. Validity is not the same as suitability; read it and get advice for significant work.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Choose the template by risk, not by price or convenience. Check jurisdiction, scope fit, risk allocation, usability and maintenance before you use it. A template is a draft with a head start, not a decision you can delegate.",
      ],
    },
  ],
};
