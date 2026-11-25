import type { BlogPost } from "../blog";

export const SECURE_SHARING_POST: BlogPost = {
  slug: "how-to-share-documents-with-clients",
  title: "How to share documents with clients securely, without email attachments",
  excerpt:
    "Attachments get forwarded, sit in inboxes for years and tell you nothing. Here is a practical alternative, the six things that actually make sharing safer, and the cases where a PDF is still the right answer.",
  date: "2026-11-25",
  readMinutes: 11,
  links: [
    { label: "Do freelancers need a client portal?", to: "/blog/do-freelancers-need-a-client-portal" },
    { label: "Portal, drive or PDF", to: "/blog/client-portal-vs-shared-drive" },
    { label: "Security at Revercue", to: "/security" },
    { label: "Features", to: "/features" },
  ],
  body: [
    {
      paragraphs: [
        "The default way freelancers share a proposal is a PDF attached to an email. It works, in the sense that the client receives a file. It fails in three quieter ways: the client cannot act on it without replying, you cannot tell whether it was opened, and the file will be forwarded to three people you never hear about.",
        "None of that is catastrophic for a two-page proposal. It becomes a problem when the same method carries a contract, a signed agreement, a client's requirement document or an invoice with bank details. Those documents have different risks, and the sharing method should reflect them. This article covers a practical alternative and the specific things that make sharing safer.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Share a link, not an attachment, for anything a client needs to read or act on. Make the link unguessable, avoid putting client names or project details in the URL, and set an expiry where the tool allows it. Keep the original file somewhere you control, and keep a record of what was sent and when.",
        "For documents with bank details or identity information, do not send them by email at all if you can avoid it. A link with a password, or a payment method that does not require you to publish account numbers, is a better default. This is basic practice rather than a compliance programme, and it is enough for most freelance work.",
      ],
    },
    {
      heading: "Why attachments fail the test",
      paragraphs: [
        "An attachment is a copy, not a record. Once it is sent, you have no idea where it goes, whether it was opened, or which version is current. The client who says I am looking at the version from last month is usually telling the truth, because there are now four versions in their downloads folder.",
        "It is also a version-control problem for you. A proposal amended after feedback becomes a second file with a different name, and the client's team may be reading the first. Links solve this by pointing at one current version, which is the single biggest practical improvement in client document sharing.",
        "And it is a security problem in a small way. Attachments are scanned by mail servers, stored in inboxes indefinitely, and forwarded freely. For a public proposal that is acceptable. For a contract with a client's address or an invoice with your bank details, it is a copy you can no longer track.",
      ],
    },
    {
      heading: "The link model, in practice",
      paragraphs: [
        "A shareable link is a page at an address that is long enough to be unguessable. The client opens it in a browser, on any device, without an account. You can update the page and the client sees the current version. You can see whether it was opened and, depending on the tool, which sections were read.",
        "The important design decision is what the link exposes. A URL that contains the client's name or a sequential number is a small privacy leak and a small security risk: someone can guess the next one. A random identifier avoids both, at the cost of a link that looks meaningless, which is fine because nobody types it.",
        "The second decision is whether the link expires. For a proposal, an expiry tied to the validity date is useful and honest. For a contract, an expiry can be a problem after signature, so the tool should keep the executed copy separately and permanently. For an invoice, the link should live at least until payment clears, and longer if the client's finance team is slow.",
      ],
    },
    {
      heading: "Six things that actually improve security",
      paragraphs: [
        "One: use HTTPS, and check that the domain in the link is the one you expect. This sounds basic and it is still the most common failure, usually because a link was forwarded through a redirect or shortened.",
        "Two: keep client names and project details out of the URL. A link that says /client/acme-merger/proposal is a disclosure if it ever leaks, and it is trivially guessable.",
        "Three: put a password on documents that contain sensitive information, and send the password by a different channel. A password sent in the same email as the link is a lock with the key taped to it.",
        "Four: do not publish bank details in an invoice PDF that will be forwarded. Use a payment link, or send the account details in a separate message when the client asks. Invoice fraud usually starts with a real invoice that has been altered in transit.",
        "Five: revoke access when the relationship ends. A link that stays live forever is a document you have published, not one you have shared.",
        "Six: keep the original. A link is a view of a document; the document should also exist somewhere you control and can export, so that losing access to a tool does not lose the record.",
        "Seven, and the one most freelancers skip: decide how long you keep things. A client's requirement document may contain personal details, a signed contract may need to be kept for years for tax reasons, and a proposal may be worth keeping only until the decision is made. Write the retention down rather than leaving it to the tool's default, and check that the tool will actually delete what you ask it to. Storing less is the simplest security improvement available, and it costs nothing but a decision.",
      ],
    },
    {
      heading: "What to say to the client",
      paragraphs: [
        "Most clients do not care about the mechanism, and a long explanation of your security practice creates worry rather than confidence. One sentence is enough: the proposal is at the link below, it opens on your phone without an account, and you can choose a package and ask questions on the page.",
        "For a contract or a document with a password, be explicit about the two-step delivery: the link is below, and I will send the password by message. That framing tells the client this is normal practice, not a sign that something unusual is happening.",
        "If a client insists on a PDF, send one. Some organisations cannot open external links, some legal teams require a file, and some clients simply prefer it. The answer is to send both: the link for reading and acting, the PDF for their records. What you should not do is accept the PDF as the only version and lose the ability to see what happened.",
      ],
    },
    {
      heading: "The email that carries the link",
      paragraphs: [
        "Keep the email short and put the value in the first line. The proposal for the rebuild is ready, with two packages and a start date in January. Then the link, then one line about what to do next, then a date. Everything else belongs on the page, where it can be updated.",
        "Do not attach the same document as well. Two versions in one email is the fastest way to make the client read the wrong one. If you must attach for a specific reason, say why in the message: the PDF is for your records; please use the link to choose a package.",
        "Use your own domain if the tool allows it. A link on a domain the client recognises is opened more often than a link on a tool's domain, and it is also less likely to be filtered as promotional. Custom domains are usually a paid feature, and for a freelancer they are one of the better uses of a subscription.",
      ],
    },
    {
      heading: "When a PDF is still right",
      paragraphs: [
        "When the counterparty requires a signed file, when the document is going into a procurement system, when the client's IT blocks external links, or when the document is a final deliverable rather than something to act on. A finished brand guideline should be a PDF; a proposal should not.",
        "The rule is about action. If the client needs to read and respond, a link is better because the response can happen on the page. If the client needs to archive and share internally, a PDF is better because it is a fixed artefact. Most projects need both at different stages, and the mistake is using one for the other's job.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is emailing a proposal as a PDF unsafe? Not unsafe in the way a data breach is. It is just untrackable and version-prone. The risk rises when the attachment contains personal or financial data.",
        "Should I password-protect every document? No. Passwords add friction, and friction reduces opens. Protect documents with sensitive information, and send the password separately.",
        "What about WhatsApp or Slack for documents? They are fine for low-sensitivity files and terrible for anything that needs to be found later. Use them to notify, not to store.",
        "How long should a link stay live? Until the decision is made, plus a stated validity period. For contracts and invoices, until the obligation is settled and the record is archived.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Send a link for anything the client needs to read or act on, keep the original, and put a password on the documents that contain information you would not want forwarded. Use a PDF for the thing that must be archived. The method is not about sounding secure; it is about knowing what was sent, to whom, and what happened next.",
      ],
    },
  ],
};
