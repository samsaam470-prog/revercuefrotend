import type { BlogPost } from "../blog";

// SEO cluster — document types. The clause-level checklist; article 1 covers
// which document to use, article 2 how to define delivery.

export const CONTRACT_CHECKLIST_POST: BlogPost = {
  slug: "freelance-contract-checklist",
  title: "Freelance contract checklist: 12 clauses to read before you sign",
  excerpt:
    "Most freelance contracts are fine until one clause is tested. This checklist covers the twelve that decide who gets paid, who owns the work and what happens when the project ends badly.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Proposal vs contract vs statement of work", to: "/blog/proposal-vs-contract-vs-statement-of-work" },
    { label: "Who owns the work in a freelance contract", to: "/blog/who-owns-the-work-in-a-freelance-contract" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A freelance contract does not need to be long. It needs to answer the questions that will be asked if the project goes wrong: who is paying whom, for what, by when, who owns the result, and what either side can do if the other stops performing.",
        "This checklist is for reading a contract, whether you wrote it, a client sent it, or you downloaded a template. It is general information, not legal advice. The law differs by jurisdiction and by the type of work, and a clause that is standard in one country can be unenforceable in another.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Read for twelve things: parties, scope, deliverables, fees, payment timing, expenses, IP ownership, confidentiality, warranties, liability, termination and dispute resolution. If a contract is missing any of the first seven, do not sign it until they are added or covered by an attached statement of work.",
        "The rest can be negotiated, but they should not be ignored. Liability and termination are the clauses that decide how much a failure costs.",
      ],
    },
    {
      heading: "1. The parties are correctly identified",
      paragraphs: [
        "Check the legal name, the entity type and the registered address, not just the trading name on the website. If you are contracting as a sole trader, your personal name is the party. If you have a limited company, the company is the party and you may be asked for a personal guarantee, which is a separate risk.",
        "The same applies to the client. A subsidiary, a parent company and a brand can be three different legal entities. The one that signs should be the one that can pay.",
      ],
    },
    {
      heading: "2. The scope is defined by reference",
      paragraphs: [
        "The contract should either contain the scope or incorporate a statement of work by name and date. \"Services as agreed from time to time\" is not a scope; it is an invitation to disagree.",
        "If the scope sits in a proposal or an email, attach it and name it. A schedule that is incorporated by reference is easier to update than a contract that restates the scope in three places.",
      ],
    },
    {
      heading: "3. Deliverables and acceptance are testable",
      paragraphs: [
        "Look for quantities and a definition of done. Five pages, two rounds, one workshop, a named approver. If the contract talks about \"the website\" or \"the design\" without a list, the acceptance conversation will be about taste.",
        "Acceptance matters because payment often depends on it. A clause that says the client will pay \"on acceptance\" without saying how acceptance is given or what happens if the client goes silent can hold your invoice hostage indefinitely.",
      ],
    },
    {
      heading: "4. Fees are unambiguous",
      paragraphs: [
        "The fee should be a number, a currency and a basis: fixed, hourly, daily or retainer. If it is hourly, the contract should say how hours are recorded and whether there is a cap. If it is a retainer, it should say what the retainer buys and what happens to unused time.",
        "Watch for quoted fees that exclude tax. \"£4,000\" means different things to a VAT-registered supplier and a client who assumed the figure was inclusive. State whether tax is included and who is responsible for it.",
      ],
    },
    {
      heading: "5. Payment timing and consequences",
      paragraphs: [
        "A payment schedule is more than a date. It should say when each amount is due, what triggers it, how it is paid and what happens if it is late. \"50% on signature, 50% on delivery\" is a schedule; \"payment on completion\" is a promise with no mechanism.",
        "Late-payment consequences are worth reading closely. Some contracts include interest, some include suspension rights, some include neither. If there is no consequence, the only remedy is a conversation or a claim, and both cost more than the interest would have.",
      ],
    },
    {
      heading: "6. Expenses and third-party costs",
      paragraphs: [
        "Say who pays for what. Software licences, stock images, fonts, printing, travel, hosting and subcontractors are the usual surprises. A good clause names which costs are included in the fee, which are rechargeable, and whether rechargeable costs need prior approval.",
        "If the client is supplying assets, the contract should say what happens if they arrive late or with unclear rights. An indemnity for third-party material the client provides is common, but it is only useful if the client understands it.",
      ],
    },
    {
      heading: "7. Intellectual property ownership",
      paragraphs: [
        "This is the clause freelancers most often misread. Copyright generally belongs to the creator unless it is assigned in writing, but the default differs by jurisdiction and employment status. A licence to use the work is not the same as ownership of the work.",
        "Check three things: what is assigned or licensed, when the transfer takes effect (often on final payment), and what rights you keep. Portfolio use, the right to reuse generic code or methods, and rights in pre-existing materials should be explicit. If the client expects full ownership, the price should reflect it.",
      ],
    },
    {
      heading: "8. Confidentiality",
      paragraphs: [
        "Confidentiality clauses should define what is confidential, how long the duty lasts, and what is excluded. Public information, information already known to you and information you are legally required to disclose are standard carve-outs.",
        "Read the duration. A two-year confidentiality period is normal for commercial information; an indefinite period covering everything the client ever tells you is broader and should be narrowed if possible.",
      ],
    },
    {
      heading: "9. Warranties and representations",
      paragraphs: [
        "Warranties are promises about the work: that it is original, that it does not infringe third-party rights, that it will be delivered with reasonable skill and care. They are usually reasonable and should not be removed without thought.",
        "Be careful with warranties that promise a business outcome. \"The website will increase conversions by 20%\" is not a delivery warranty; it is a guarantee of a result you do not control. Keep warranties about your work, not the client's market.",
      ],
    },
    {
      heading: "10. Liability and indemnities",
      paragraphs: [
        "Liability clauses decide how much a mistake can cost. Look for a cap, what it is a multiple of, and what is excluded from the cap. A cap tied to fees paid is common; unlimited liability for any breach is not a fair allocation for a small supplier.",
        "Indemnities are separate promises to cover the other side's losses. An IP indemnity for your own work is normal. An indemnity for the client's use of the deliverable, or for decisions the client made, is not. Read who indemnifies whom, and for what.",
      ],
    },
    {
      heading: "11. Termination and what happens after",
      paragraphs: [
        "Check the notice period, the grounds for termination, and the financial consequence. A client-friendly clause may allow termination for convenience with seven days' notice; a supplier-friendly clause may require payment for work done and a kill fee.",
        "The important part is the tail: what happens to work in progress, deposits, licence rights and confidential material when the contract ends. A termination clause that does not deal with work already done leaves you arguing about the invoice after the relationship has ended.",
      ],
    },
    {
      heading: "12. Dispute resolution and governing law",
      paragraphs: [
        "The contract should name the governing law and the forum for disputes. If it does not, you may end up arguing about which law applies before you argue about the actual problem.",
        "Look at whether disputes must go through negotiation, mediation or arbitration before court. These steps can be sensible, but they add time and cost. For a small claim, a mandatory arbitration clause in a distant jurisdiction can make the remedy worthless.",
        "This is general information, not legal advice. If the value of the deal is significant, have a lawyer in the relevant jurisdiction read the contract rather than relying on a checklist.",
      ],
    },
    {
      heading: "The three clauses people miss",
      paragraphs: [
        "Assignment and subcontracting: can the client transfer the contract to another entity, and can you use subcontractors? Without a clause, the answer may be unclear, and a change of ownership can leave you working for a company you never agreed to.",
        "Publicity and portfolio: can you name the client and show the work? Many contracts are silent, which creates an argument later. A short clause resolves it in one sentence.",
        "Survival: which clauses continue after termination? Confidentiality, IP and liability usually should; delivery obligations should not. A survival clause prevents the whole agreement from evaporating when the project ends.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Do I need a lawyer to review a freelance contract? Not for every small job. Use a checklist and a well-drafted template, and pay for a review when the value, the risk or the client's bargaining power is significant. This article is general information, not legal advice.",
        "What if the client sends a contract with unlimited liability? Ask for a cap tied to the fees, and explain why. If they refuse, decide whether the work is worth the exposure; for most freelance projects it is not.",
        "Can I just use a template? A template is a starting point, not a substitute for reading. Check that the parties, scope, payment terms and IP clauses match the actual deal and the jurisdiction.",
        "Does a contract have to be signed to be valid? Not always, but a signed, dated version is much easier to prove. Use a signature block and keep the final version.",
        "What should I do if a clause is unclear? Ask for it to be rewritten in plain language before signing. If the other side cannot explain it, that is information about the deal.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A contract is not a formality; it is the version of the project that exists when people disagree. Read the twelve clauses, fix the missing ones, and keep a signed copy with the scope it refers to. The ten minutes it takes is cheaper than the first argument it prevents.",
      ],
    },
  ],
};
