import type { BlogPost } from "../blog";

// Cluster C, article three: the clause itself, with plain-English wording.
// General information rather than legal advice.

export const OUT_OF_SCOPE_POST: BlogPost = {
  slug: "out-of-scope-clause",
  title: "The out-of-scope clause: what it should say and why it matters",
  excerpt:
    "The exclusions do more work than the inclusions. Here is what an out-of-scope clause should contain, a plain-English version you can adapt, and the three mistakes that make it useless when a client tests it.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "How to handle scope creep", to: "/blog/how-to-handle-scope-creep" },
    { label: "How to write a change request", to: "/blog/how-to-write-a-change-request" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Every proposal lists what is included. Very few list what is not, which is strange, because the exclusions are the part that gets used. An inclusion tells the client what they are buying; an exclusion tells both of you what happens on the day someone asks for something adjacent, which is the day the relationship is tested.",
        "An out-of-scope clause is not a warning. It is a map of the edges of the project, written while everyone is friendly, so that the conversation later is about a price rather than about intentions.",
        "It is also the cheapest piece of writing in the whole project. Four sentences, reused for every client, doing the work that would otherwise be done by an awkward email in week five.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "State the deliverables, the quantities, the number of revision rounds, who approves, and what is explicitly excluded, then name the mechanism for anything else: changes are priced and scheduled in writing before work begins. A clause without a mechanism is a list of things you will end up arguing about. A clause with one turns an awkward conversation into a routine step.",
      ],
    },
    {
      heading: "Why the exclusions matter more than the inclusions",
      paragraphs: [
        "Clients do not usually read a scope looking for loopholes. They read it once, at the start, and then work from their memory of the conversation. Memory is generous, and it tends to include the things that were mentioned as possibilities. The exclusions are the only part of the document that corrects that generosity without anyone having to be accused of anything.",
        "There is a second reason. Writing exclusions forces you to decide what you are actually selling. A scope that says five pages, two rounds, one approver is a product. A scope that says a website is an argument waiting for a deadline. The exercise of listing what is not included is usually where freelancers discover their own pricing is unclear.",
        "The third reason is quieter: exclusions protect the client too. A client who knows that copywriting is not included can budget for a copywriter, or ask you to quote for it before the design is built around placeholder text. Ambiguity feels flexible at the start and expensive at the end, and both parties usually pay.",
      ],
    },
    {
      heading: "Quantities: the quiet part",
      paragraphs: [
        "Most disputes are not about whether something was included. They are about how much of it. Two rounds becomes five. Five pages becomes eight. One revision becomes a redesign. So write numbers: five pages, two rounds of revision per page, one consolidated set of feedback per round, one named approver.",
        "Consolidated is the word that saves the most time. It means feedback arrives together rather than as a stream of messages from four people, and it gives you a reason to say: send it all in one go and I will turn it around by Thursday. Without it, rounds are counted by message rather than by pass, and no clause can survive that.",
        "Numbers also make the quote defensible. When a client asks why the price is what it is, five pages and two rounds is an answer. When the answer is a website, the conversation becomes about how long you think things take, which is a conversation you will lose to anyone with a cheaper opinion.",
      ],
    },
    {
      heading: "The change mechanism",
      paragraphs: [
        "One sentence is enough: anything not listed above is out of scope and will be quoted and scheduled in writing before it is started. That sentence does two things. It defines the default, which is that unlisted work is not free, and it defines the process, which is a written quote before work.",
        "Add a second sentence about the effect on dates: changes may move the delivery date, and the new date will be agreed before the change starts. Without it, the client can accept the cost and still expect the original date, which is the version of scope creep that hurts most because you have been paid and are still late.",
        "Add a third about what counts as approval, because approval is where the mechanism usually leaks: approval means a written reply from the named approver, and work begins when that reply arrives. A verbal yes on a call is a good sign, not an approval, and saying so in advance is much easier than saying it afterwards.",
      ],
    },
    {
      heading: "Assumptions and dependencies",
      paragraphs: [
        "Exclusions cover what you are not doing. Assumptions cover what has to be true for what you are doing to work. Both belong in the clause, because a project rarely fails on a missing feature; it fails on an assumption nobody said out loud.",
        "Write them as plain statements. The client supplies final copy before design begins. The client's existing platform supports the integrations described. Feedback is consolidated by one approver within three working days. Third-party licence costs are paid by the client. Each line converts an unspoken hope into something that can be checked, and checking is much cheaper than discovering.",
        "Dependencies are the same idea with a consequence attached: if the copy is late, the design date moves by the same number of days; if the platform cannot support the integration, the integration is a separate quote. A consequence is not a threat. It is what makes the assumption worth reading.",
      ],
    },
    {
      heading: "What a plain-English version looks like",
      paragraphs: [
        "Scope: design and build of five pages, two rounds of revision per page, one consolidated set of feedback per round, one approver. Not included: copywriting, photography, additional pages, logo design, ongoing support, third-party licence fees. Anything outside this list is a change: it will be priced and scheduled in writing before work starts, and may move the delivery date.",
        "That is four sentences, and it covers most of what goes wrong on a small project. It reads as clarity rather than suspicion, which matters because the clause will be read by a client who is deciding whether to trust you. The tone of the exclusions is part of the sales pitch, whether you intend it to be or not.",
      ],
    },
    {
      heading: "Three versions of the same clause",
      paragraphs: [
        "The short version, for small fixed-price projects: five pages, two rounds, one approver. Anything else is quoted in writing before it starts. That is two sentences, and on a small project it is usually enough.",
        "The standard version, for the projects most freelancers run: the four-sentence paragraph above, plus the three assumptions that matter most. Add a line that the delivery date depends on material arriving by the agreed date, because that single line explains most late deliveries before anyone has to explain them.",
        "The strict version, for larger projects or difficult clients: the standard version plus a statement that all work outside the scope is chargeable at a named hourly rate, with a minimum increment of an hour, and that the project may be paused if outstanding approvals or invoices are more than a set number of days overdue. Strict is not aggressive; it is specific, and specificity is what a finance or legal team will actually read.",
      ],
    },
    {
      heading: "How to enforce it the first time",
      paragraphs: [
        "The clause is only real once it has been used. The first request that arrives from outside the scope is the moment the document either becomes a working part of the project or becomes decoration. Answer it the same day, in the four-line format, with a price and a date consequence.",
        "Do it pleasantly, and do it once. The client is not testing you, and treating the first request as a test makes the relationship adversarial. But if you absorb it, you have taught the client that the clause is aspirational, and the second request will be larger.",
        "If the client apologises for asking, take the apology out of the conversation: no problem at all, this is exactly the sort of thing the change process is for. That reframes the clause as a service rather than a restriction, which is both true and much easier for a client to accept.",
      ],
    },
    {
      heading: "When their contract or process disagrees",
      paragraphs: [
        "Some clients will send their own contract or purchase order with their own scope wording, and it may conflict with yours. Read it before signing, and if the two documents disagree, say which one governs. Silence is read as agreement to theirs, and theirs was written by a lawyer for a company that expects disputes.",
        "Where their process is genuinely fixed, such as a statement of work with an hourly rate attached, use their mechanism rather than fighting it. The goal is not your clause; it is a written record of what is included and what a change costs. Any mechanism that produces that record is good enough.",
        "If the conflict is material and the amount is significant, have a professional read it once. This article is general information, not legal advice, and the value of a review is highest exactly when two documents disagree about money.",
      ],
    },
    {
      heading: "The mistakes that make the clause useless",
      paragraphs: [
        "The first is a clause with no mechanism, which lists exclusions but never says what happens when one is requested. The second is a clause with no numbers, which leaves every quantity to memory. The third is a clause you do not enforce, because the first time you absorb a change quietly, the document becomes decoration and the next conversation starts from a worse position.",
        "There is a fourth, and it is the most common: a clause written in language the client cannot parse. If the exclusions are buried in a paragraph of defined terms, they will not be read, and an unread clause protects nobody. Plain sentences in the same voice as the rest of the proposal are worth more than careful drafting nobody opens.",
      ],
    },
    {
      heading: "When the brief contradicts the scope",
      paragraphs: [
        "The brief is the document people open; the contract is the document people file. When they disagree, the project has two truths and every conversation becomes a choice between them. The fix is mechanical: whichever document changed last wins, and the change is recorded in the scope with a date.",
        "In practice that means one line in the project record each time the brief moves: brief updated on the 12th to add the pricing page, scope updated to match, date unchanged. Three seconds of typing, and the disagreement never gets a chance to exist.",
      ],
    },
    {
      heading: "What the client should take away",
      paragraphs: [
        "A good clause leaves the client feeling that they know exactly what they are buying and exactly what happens if they want more. That is a sales asset, not a legal formality. Clients hesitate when the edges are blurry, and they commit faster when the price is attached to something specific.",
        "So do not hide the exclusions in an appendix. Put them in the same visual weight as the inclusions, in the same plain voice, and say the mechanism out loud on the call: anything outside this gets a short quote before I start. That sentence, said early and cheerfully, is what turns a clause into an agreement.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is this legal advice? No. It is general information about how to write a clear scope. For anything large or unusual, have a professional read the contract once.",
        "Will exclusions put clients off? Clear ones usually help, because they show the price is for something specific. What puts clients off is discovering the boundary after they have crossed it.",
        "What if the client insists everything is included? Then the scope is not fixed and the price should not be either. Either price the uncertainty or move to a time-and-materials arrangement with a cap.",
        "Should the clause appear in the proposal as well as the contract? Yes, in the same words. The proposal is read by the decision-maker, and the decision-maker is the person whose memory matters later.",
        "How long should the clause be? Four sentences for the scope, three for the assumptions, one for the mechanism. If it runs to a page, it will be skimmed.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Write the exclusions, put numbers on the quantities, name the approver, and add the sentence that says unlisted work is quoted before it starts. Four sentences written while everyone is friendly will save you the conversation you would otherwise have in week five.",
      ],
    },
  ],
};
