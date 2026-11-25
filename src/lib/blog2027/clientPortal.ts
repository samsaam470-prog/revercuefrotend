import type { BlogPost } from "../blog";

// Cluster E — sharing. This is the buyer-adjacent piece in the cluster, so the
// product appears at the end with a clear statement of what it is not.

export const CLIENT_PORTAL_POST: BlogPost = {
  slug: "do-freelancers-need-a-client-portal",
  title: "Do freelancers need a client portal? The honest answer for a one-person business",
  excerpt:
    "A portal is not a status symbol and it is not a substitute for a process. Here are the three problems it genuinely solves, the four it does not, and the smaller version that works when you are not ready to buy one.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Sharing documents with clients", to: "/blog/how-to-share-documents-with-clients" },
    { label: "Portal, drive or PDF", to: "/blog/client-portal-vs-shared-drive" },
    { label: "Features", to: "/features" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The case for a client portal is usually made in the language of professionalism: look established, keep everything in one place, give clients a home. None of that is wrong, and none of it is a reason to pay for software. A portal is a tool for three specific problems, and if you do not have those problems it will mostly be a second inbox you have to check.",
        "This is a decision guide rather than a review. It sets out what a portal does that a shared folder does not, what it will not fix no matter how much it costs, and the version you can build in an afternoon if the answer is not yet.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "You need some form of portal when clients regularly ask where something is, when approvals happen over email and get lost, or when the work involves documents a client has to act on rather than read. You do not need one when you have a handful of clients, one deliverable type, and a system that already works. In that case a single well-named folder and a clear email will do more than a subscription.",
      ],
    },
    {
      heading: "The three problems a portal actually solves",
      paragraphs: [
        "The first is findability. A client who has to search their inbox for the invoice, the contract and the brief will ask you for all three, usually in the week you are busiest. A portal replaces the search with a link, and the link is the same every time.",
        "The second is action. Reading a PDF is passive; approving a proposal, signing a contract or filling a requirement form is an event with a timestamp. When the document is interactive, the approval is a record rather than a reply you have to interpret later.",
        "The third is continuity. A client who can see the current status without asking is a client who interrupts less. That is less about the software's features than about the habit it enforces: everything in one place, with one link, and a visible next step.",
      ],
    },
    {
      heading: "What a portal does not fix",
      paragraphs: [
        "It does not fix an unclear scope, a late invoice or a client who will not decide. A portal makes a good process visible and a bad process faster to expose. It does not replace a written agreement, and it is not a substitute for saying the awkward thing on a call.",
        "It also does not fix adoption. If the client will not open a link, the portal becomes an empty room with your files in it. The most common failure is buying the tool before agreeing the habit: one link, one channel, everything goes there.",
      ],
    },
    {
      heading: "Portal versus shared link",
      paragraphs: [
        "A shared folder is cheap, familiar and good enough for files that do not need an action. A portal is better when the client has to do something, because each document can be approved, signed or completed rather than downloaded and returned. If your projects are mostly deliverable files, a folder wins on cost and habit. If they are mostly decisions, a portal wins on the record.",
        "The middle option most freelancers miss is a single page per project, with the current status, the documents and one next step. That is 80 percent of the value of a portal and it costs nothing but discipline.",
      ],
    },
    {
      heading: "The questions to ask before you buy",
      paragraphs: [
        "Does the client need an account? Every login is a reason not to open the link. What does the client see on a phone, in ten seconds? Can a proposal be approved, or only read? What happens to the history when you stop paying? And does it connect to the invoicing you already do, or does it create a second place to keep money?",
        "Price the time as well as the subscription. A tool that saves three client emails a week is worth a monthly fee; one that saves nothing but looks tidy is a cost you will rationalise for a year and then cancel.",
      ],
    },
    {
      heading: "A smaller version that works",
      paragraphs: [
        "One link per project, containing five things: the brief, the proposal, the contract, the invoice and the current status. Name it consistently, put it in your email signature, and never send a document as an attachment again unless the client asks. Review it every Friday and update the status line, even when nothing has changed.",
        "That habit is what a portal is trying to sell you. If you can keep it for a month without software, you will know whether you need the software or just the habit. If you cannot keep it, buying the tool will not keep it for you.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is a portal unprofessional for a one-person business? No, but neither is a folder. Clients care that they can find the document and that the next step is clear, not which tool produced it.",
        "Do clients actually use portals? Some do, most use whatever is easiest to open. Test yours on a phone before you roll it out; if it needs an app, expect resistance.",
        "What if I already use a shared drive? Keep it for files and add one page per project for status and decisions. That covers the action problem without migrating everything.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A portal is worth paying for when clients cannot find things, approvals live in email, or documents need action rather than reading. If none of that is true yet, build the one-link habit first. Software makes a working process easier; it does not create one.",
      ],
    },
  ],
};
