import type { BlogPost } from "../blog";

// Cluster E, article two: practical security for people who are not security
// professionals. No fear, no theatre — the six changes that actually help.

export const SECURE_SHARING_POST: BlogPost = {
  slug: "how-to-share-documents-with-clients",
  title: "How to share documents with clients securely, without email attachments",
  excerpt:
    "Most freelancers share contracts and invoices as attachments because it is easy, not because it is safe. Here is the link model, the six habits that actually improve security, and the email wording that stops clients asking for a PDF instead.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Do freelancers need a client portal?", to: "/blog/do-freelancers-need-a-client-portal" },
    { label: "Portal, drive or PDF", to: "/blog/client-portal-vs-shared-drive" },
    { label: "Security at Revercue", to: "/security" },
    { label: "Features", to: "/features" },
  ],
  body: [
    {
      paragraphs: [
        "An attachment is a copy. Once you send a contract as a PDF, you no longer know where it is: the client's downloads folder, a forwarded email, a shared drive, a personal phone. That is usually acceptable for a menu and rarely acceptable for something containing bank details, a signature or a client's unpublished plans.",
        "The alternative is not complicated and does not require an enterprise tool. It is a link you control, a permission you can change, and a habit of sending the link rather than the file. What follows is what that looks like in practice, and what to say when a client asks for the attachment anyway.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Send a link, not a file. Put the document somewhere you can revoke access, set the narrowest permission that still works, and keep the sensitive detail (bank details, signatures, personal data) out of the body of the email. Then say in one line what the link is and when it expires, so the client does not forward it out of habit.",
      ],
    },
    {
      heading: "Why attachments fail the test",
      paragraphs: [
        "An attachment cannot be revoked, cannot be versioned, and cannot tell you whether it was opened. If you send version three and the client works from version two, nobody finds out until the work is wrong. If you send the wrong file, you cannot take it back.",
        "There is a delivery problem too. Attachments get blocked, filtered or quarantined, especially from a new domain, which is why a surprising number of proposals are never read at all. A link is smaller, more likely to arrive, and opens in the browser on a phone without a download.",
      ],
    },
    {
      heading: "The link model, in practice",
      paragraphs: [
        "One place for client documents, one link per project, permissions set per document. A proposal can be viewable by anyone with the link; a contract should require the client's email; an invoice should be visible to the person who pays and not forwarded to the whole team. If your tool cannot do that, the tool is the problem.",
        "Revocation matters more than encryption for most freelancers. The realistic risk is not a sophisticated attacker; it is a link forwarded to a supplier, a document left accessible after the project ends, or an old version still live six months later. Being able to switch it off is the control you will actually use.",
      ],
    },
    {
      heading: "Six things that actually improve security",
      paragraphs: [
        "Use a password manager, so every client folder or account has a different password. Turn on two-factor authentication on email, banking and your document tool, because email is the master key to everything else. Never put bank details in an email body; put them in the document or read them out on a call.",
        "Keep client files out of personal sync folders, and remove access when a project ends rather than when you remember. Name versions so the current one is obvious: proposal-v3-2026-11-25, not proposal-final-final. And check the recipient before sending anything with a client's name in the subject line, because the wrong-client forward is the most common breach in a one-person business.",
      ],
    },
    {
      heading: "What to say to the client",
      paragraphs: [
        "The link is in the email below; it opens in the browser and the contract needs your email address to view. That single sentence removes most of the friction. Clients do not resist links because they distrust them; they resist because they do not know whether they will need an account, an app or a password.",
        "If the client asks for a PDF, give them one and say why you sent a link first: I sent the link so I can update it if anything changes, but here is a PDF for your files. Do not turn a preference into an argument. The goal is that the current version is the one they use, not that they adopt your workflow.",
      ],
    },
    {
      heading: "The email that carries the link",
      paragraphs: [
        "Subject: Contract for the rebuild — link inside. Short body: the contract is at the link, it takes about four minutes to read, and it needs your signature on page three. The invoice is in the same place and is due on the 9th. Reply here if anything is unclear. Nothing else: no summary of the terms, no bank details, no attachment.",
        "Keeping the email short is a security decision as well as a readability one. The more detail in the body, the more likely it is forwarded, screenshotted or quoted in a thread where it does not belong.",
      ],
    },
    {
      heading: "When a PDF is still right",
      paragraphs: [
        "When the client needs a file for their own records, when a legal process requires a fixed version, or when the recipient's systems cannot accept links. Send it as a final copy, name it with a date, and keep the link as the live version. The two are not in conflict as long as you say which is which.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is a link less secure than an attachment? Not inherently. A link you can revoke and scope is usually safer than a file you cannot recall, provided it is not public by default.",
        "Do I need encryption? Use the encryption your tools already provide in transit and at rest, and do not add a password to a PDF as your only control. A password sent in the same email is not a control.",
        "What about very small clients? The same model works; they get a link and no account. The habit costs you nothing and it scales when the clients get bigger.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Links you can revoke, permissions that match the document, sensitive details out of email bodies, and a sentence that tells the client what to expect. That is most of document security for a freelance business, and none of it requires a security team.",
      ],
    },
  ],
};
