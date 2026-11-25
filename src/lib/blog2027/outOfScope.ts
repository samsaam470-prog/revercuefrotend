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
      ],
    },
    {
      heading: "Quantities: the quiet part",
      paragraphs: [
        "Most disputes are not about whether something was included. They are about how much of it. Two rounds becomes five. Five pages becomes eight. One revision becomes a redesign. So write numbers: five pages, two rounds of revision per page, one consolidated set of feedback per round, one named approver.",
        "Consolidated is the word that saves the most time. It means feedback arrives together rather than as a stream of messages from four people, and it gives you a reason to say: send it all in one go and I will turn it around by Thursday. Without it, rounds are counted by message rather than by pass, and no clause can survive that.",
      ],
    },
    {
      heading: "The change mechanism",
      paragraphs: [
        "One sentence is enough: anything not listed above is out of scope and will be quoted and scheduled in writing before it is started. That sentence does two things. It defines the default, which is that unlisted work is not free, and it defines the process, which is a written quote before work.",
        "Add a second sentence about the effect on dates: changes may move the delivery date, and the new date will be agreed before the change starts. Without it, the client can accept the cost and still expect the original date, which is the version of scope creep that hurts most because you have been paid and are still late.",
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
      heading: "Where it belongs",
      paragraphs: [
        "In the proposal, in the contract, and in the project brief the client sees after signing, in the same words. Repetition is not redundancy here: the proposal is read once by a decision-maker, the contract is filed, and the brief is what people actually open in week three. If the three disagree, the one people open wins.",
        "Keep the clause short enough to survive being skimmed. A two-page schedule of exclusions will not be read, and an unread clause has the same effect as no clause, except that it makes you feel protected.",
      ],
    },
    {
      heading: "The mistakes that make the clause useless",
      paragraphs: [
        "The first is a clause with no mechanism, which lists exclusions but never says what happens when one is requested. The second is a clause with no numbers, which leaves every quantity to memory. The third is a clause you do not enforce, because the first time you absorb a change quietly, the document becomes decoration and the next conversation starts from a worse position.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is this legal advice? No. It is general information about how to write a clear scope. For anything large or unusual, have a professional read the contract once.",
        "Will exclusions put clients off? Clear ones usually help, because they show the price is for something specific. What puts clients off is discovering the boundary after they have crossed it.",
        "What if the client insists everything is included? Then the scope is not fixed and the price should not be either. Either price the uncertainty or move to a time-and-materials arrangement with a cap.",
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
