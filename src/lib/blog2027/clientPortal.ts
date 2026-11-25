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
        "Nor does it fix your own side of the habit. A portal with three versions of the same contract, an invoice that was superseded and a brief nobody updated is less useful than a folder, because it looks authoritative while being wrong.",
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
      heading: "When to move from folder to portal",
      paragraphs: [
        "Three thresholds are worth watching. The first is more than five active clients, because the folder naming that works for three becomes a filing system nobody maintains at eight. The second is more than two document types per client that need a decision, such as a proposal, a contract and a form, because those are the three that get lost in email.",
        "The third is a client asking the same question twice, which is the clearest signal that the information exists but is not visible. If all three are true, the subscription is probably cheaper than the time you are spending on status updates. If none of them are true, a portal is a way of feeling organised rather than being organised.",
      ],
    },
    {
      heading: "The questions to ask before you buy",
      paragraphs: [
        "Does the client need an account? Every login is a reason not to open the link. What does the client see on a phone, in ten seconds? Can a proposal be approved, or only read? What happens to the history when you stop paying? And does it connect to the invoicing you already do, or does it create a second place to keep money?",
        "Price the time as well as the subscription. A tool that saves three client emails a week is worth a monthly fee; one that saves nothing but looks tidy is a cost you will rationalise for a year and then cancel.",
        "Ask one more question that vendors rarely volunteer: what does the client see when they are not logged in? If the answer is a login wall, you are buying a tool your client has to adopt rather than a link they can open. For a one-person business, the link is almost always the better product.",
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
      heading: "What good looks like from the client's side",
      paragraphs: [
        "One link, opening without an account. The first screen says what this project is, what stage it is at, and what the client needs to do next. The documents are named in the client's language rather than your internal codes, and the most recent thing is at the top.",
        "A phone is the real test. Most clients will open your link on a phone, in a queue, with one hand. If the proposal needs pinch-and-zoom to read the price, the client will close it and mean to come back. Open your own link on a phone once a month and check the three things above.",
        "The last piece is the exit. A client who finishes a project should be able to download what they paid for without asking you. If the portal keeps their documents hostage to your subscription, it is not a client portal; it is a filing cabinet with a lock.",
      ],
    },
    {
      heading: "Where Revercue fits, plainly",
      paragraphs: [
        "Revercue is built around the client thread rather than a file drive: proposals, contracts, requirement forms, invoices and a client record that links them, with documents shared as links rather than attachments. A client can ask a question on the page, and you can see whether a document was opened, with how much detail depending on your plan.",
        "It is not a project management tool. There are no task boards, no time tracking and no shared file drive, and it does not yet connect to your inbox, calendar or accounting software. There is no public API, and a contract is signed with a typed name, consent and a recorded date rather than a certified electronic signature. Payment runs through the link or bank details you provide, and you confirm it in the product rather than the platform moving money for you.",
        "Plans are Free, Starter at $12 a month, Growth at $29 and Scale at $49, with Teams in beta, and the revenue overview is on every plan. If you need a portal that holds working files or replaces a project tracker, look elsewhere and use this article as the checklist. If the problem you actually have is that decisions and money are scattered across email, that is the problem this is built for.",
      ],
    },
    {
      heading: "What a portal should not become",
      paragraphs: [
        "A portal should not become the place you do your thinking. Drafts, half-written proposals and internal notes belong in your own workspace, not in front of a client. The clean rule is that anything visible in the portal is finished enough to be judged.",
        "It should not become a second inbox either. If clients can message inside it, decide whether that channel is monitored daily or not used at all, and tell them which. A portal with a comment thread nobody reads is worse than email, because it looks attended.",
        "And it should not become the only copy of anything that matters. Keep an export, a PDF or a folder of the signed documents you would need if the subscription lapsed tomorrow. Portability is a feature you only notice when it is missing.",
      ],
    },
    {
      heading: "A two-week trial before you commit",
      paragraphs: [
        "Run one real project through the tool before you move anything else. Week one: send a proposal from it to a client who is genuinely deciding, and watch whether they open it, whether they ask you for a PDF, and whether the approval arrives without a follow-up. Week two: issue an invoice from the same place and see whether the payment lands with less admin than usual.",
        "At the end, answer three questions honestly. Did the client have to ask you where anything was? Did you spend less time on status updates than before? Could you produce the full history for that project in under a minute? Two yeses out of three is a tool worth paying for; one is a tool you are keeping because it looks tidy.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is a portal unprofessional for a one-person business? No, but neither is a folder. Clients care that they can find the document and that the next step is clear, not which tool produced it.",
        "Do clients actually use portals? Some do, most use whatever is easiest to open. Test yours on a phone before you roll it out; if it needs an app, expect resistance.",
        "What if I already use a shared drive? Keep it for files and add one page per project for status and decisions. That covers the action problem without migrating everything.",
        "Should the portal have my branding? A little goes a long way: your name, your colours, a sensible project title. Beyond that, the client wants the document, not the design.",
        "What happens when a project ends? Archive it, keep the link working for a stated period, and tell the client how long that is. Documents that vanish without warning undo the trust the portal was meant to build.",
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
