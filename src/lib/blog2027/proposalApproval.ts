import type { BlogPost } from "../blog";

// GEO cluster — comparison. Approval evidence, not signing software.

export const PROPOSAL_APPROVAL_POST: BlogPost = {
  slug: "how-clients-approve-a-proposal",
  title: "How clients approve a proposal: five methods and the evidence each leaves",
  excerpt:
    "An email that says 'approved' is not the same record as a signed version. Five approval methods compared on evidence, friction and when each one is proportionate.",
  date: "2026-11-26",
  readMinutes: 8,
  links: [
    { label: "Is a proposal legally binding?", to: "/blog/is-a-proposal-legally-binding" },
    { label: "Contract version control", to: "/blog/contract-version-control" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "\"Approved — go ahead.\" It is the message every freelancer wants and one of the weakest records in a project. It does not say which version was approved, what the price was, or who had authority to agree it. When the scope is disputed six weeks later, the email proves enthusiasm, not terms.",
        "Approval is a spectrum. At one end is a verbal yes in a meeting; at the other is a signed, dated, versioned document with an audit trail. The right method is the lightest one that leaves enough evidence for the value and risk of the work.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "For small, prepaid work, a written email approval from the client's named contact is usually enough, provided it references the proposal version and the price. For work above a few thousand pounds, use a typed signature or an e-signature that records the signer, the date and the version. For procurement-led clients, a purchase order may be the approval that matters, but it should reference your terms.",
        "Whatever the method, the record needs four things: who approved, what they approved (version and price), when, and that they had authority. Missing any one of those turns a clear approval into a conversation.",
      ],
    },
    {
      heading: "1. Email approval",
      paragraphs: [
        "How it works: the client replies to the proposal email with words such as \"approved\" or \"please proceed\". Evidence: the sender's address, the timestamp, the quoted proposal and any attachments. Friction: almost none.",
        "What it misses: authority, version and sometimes price. If the email does not quote the version or the amount, it proves agreement to something, not to this. If the sender is a junior contact, it may not bind the company.",
        "Make it stronger: ask for a reply that confirms the version number and the total, from a named person with authority. \"Please reply confirming you approve version 3 at £7,000 and I will book the start date.\" That sentence converts a vague yes into a usable record.",
      ],
    },
    {
      heading: "2. Typed signature in the document",
      paragraphs: [
        "How it works: the proposal or contract has a signature block; the client types their full name, ticks a consent line and submits. Evidence: the name, the timestamp, the version signed and, if the system records it, the IP address and email.",
        "What it misses: identity verification. A typed name is not proof that the person typing is the person named, though the email or account used to sign narrows the gap.",
        "When it fits: ordinary commercial agreements where the parties know each other and the value does not justify a dedicated signing platform. It is the middle ground between an email and a formal e-signature.",
      ],
    },
    {
      heading: "3. E-signature platform",
      paragraphs: [
        "How it works: the document is uploaded or generated, fields are placed, recipients are added and the platform sends a signing link. Evidence: a completion certificate with names, emails, timestamps, IP addresses and a document hash, plus the signed PDF.",
        "What it misses: nothing important for most commercial work, but it adds friction and cost. The client may need to create an account, and the sender pays per seat or per envelope.",
        "When it fits: multi-stakeholder deals, procurement processes that expect a recognised vendor, or any agreement where a formal audit trail is worth the cost. For a two-page freelance contract, it is usually more machinery than the job needs.",
      ],
    },
    {
      heading: "4. Purchase order",
      paragraphs: [
        "How it works: the client's finance team issues a PO number, often after the proposal is approved internally. Evidence: the PO document, the approved amount and the reference number, plus the client's internal approval chain.",
        "What it misses: your terms. A PO authorises spend; it does not necessarily accept your scope, IP position or liability clauses. If the PO references its own terms, those may conflict with yours.",
        "When it fits: larger organisations where no invoice can be paid without a PO. Ask for the proposal or contract to be referenced on the PO, and check the amount and scope match. Do not start work on a PO alone if the terms have not been agreed.",
      ],
    },
    {
      heading: "5. Verbal or meeting approval",
      paragraphs: [
        "How it works: the client says yes on a call or in a meeting. Evidence: your notes, possibly a recording if consented to, and the memory of everyone present.",
        "What it misses: almost everything that matters in a dispute. There is no reliable record of the version, the price or the scope, and memories diverge quickly once money is involved.",
        "When it fits: as a precursor, not a conclusion. Follow every verbal yes with a written confirmation the same day: \"To confirm what we agreed on today's call: version 3, £7,000, start 2 December, two revision rounds. Please reply to confirm.\" The confirmation is the record; the call is the relationship.",
      ],
    },
    {
      heading: "The comparison",
      paragraphs: [
        "Evidence strength, from weakest to strongest: verbal, email, typed signature, purchase order (for spend, not terms), e-signature with a completion certificate. Friction, from lowest to highest: verbal, email, typed signature, purchase order, e-signature.",
        "The practical rule: choose the lightest method that records who, what, when and authority. For a £500 job paid upfront, email is proportionate. For a £15,000 engagement with two approvers, a typed signature or e-signature is proportionate. For a procurement-led client, the PO is necessary but not sufficient.",
      ],
    },
    {
      heading: "What to record, whatever the method",
      paragraphs: [
        "The version: a number and a date in the document footer, repeated in the approval message. Without it, you cannot prove which draft was accepted.",
        "The price: the total, the currency and the payment schedule. An approval that does not mention money is an approval of the idea, not the commercial terms.",
        "The approver: a name, a role and, where possible, confirmation that they can bind the client. A signature block should include \"position\" and \"authority to sign\".",
        "The scope: a reference to the attached statement of work or the scope section, not a paraphrase. If the approval message summarises the scope, check that the summary matches the document.",
        "The date and time: the approval date starts the clock on timelines, payment terms and cancellation rights. Record it in the project file, not only in your inbox.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "A freelancer sends a five-page proposal for a £7,000 website. The client's marketing manager replies \"looks great, go ahead\". The freelancer responds with a one-line confirmation: version 4, £7,000, 50% deposit, start 2 December, scope as attached. The manager replies \"confirmed\".",
        "That exchange is stronger than the original yes because it names the version, the price and the start date. It is still weaker than a signature, so for a project of that size the freelancer also sends a one-page agreement with a typed signature block. The client signs it before the deposit is paid.",
        "Both records sit in the project file. If the scope is questioned later, the signed agreement and the versioned scope answer the question. The email chain explains the intent; the signature records the commitment.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is an email approval legally binding? It can be, if it shows acceptance of certain terms and the other elements of a contract are present. It is weaker evidence than a signed document because it may not identify the version or the authority.",
        "Do I need a signature for a small project? Not always. A clear email approval that references the version and price is proportionate for small, prepaid work.",
        "What if the client's PO has different terms? Read it. If it conflicts with your contract, raise it before accepting the PO. The PO may govern payment, but it should not silently replace your scope or IP terms.",
        "Can I rely on a verbal yes? Only as a step towards a written confirmation. Send the confirmation the same day, before work starts.",
        "What should I do if the approver is not the budget holder? Ask who signs and get that person's approval in writing. A junior contact's enthusiasm is not authority to spend.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Approval is not a feeling; it is a record. Pick the method that fits the value, and make sure the record names the person, the version, the price and the date. A two-line confirmation is cheap; an unapproved scope is not.",
      ],
    },
  ],
};
