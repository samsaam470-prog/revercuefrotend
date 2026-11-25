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
      heading: "The threat you actually face",
      paragraphs: [
        "Freelancers tend to imagine two extremes: nothing at all, or a sophisticated attacker. The realistic risks sit in the ordinary middle, and they are all about copies and access rather than cryptography.",
        "An invoice forwarded to a bookkeeper with your bank details intact. A contract link still live a year after the project ended. A folder shared with the client's whole company because it was easier than picking two people. A proposal sent to the wrong client because the name in the subject line looked right. A laptop stolen with a folder of signed agreements in the downloads directory.",
        "Every one of those is fixed by the same three controls: fewer copies, narrower access, and the ability to switch something off. That is the standard to design for, and it is achievable without a security team.",
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
      heading: "Permissions by document type",
      paragraphs: [
        "A proposal is a sales document. Anyone with the link can read it; it should expire when the decision is made, or when the price changes. A contract is a record with personal data in it. It should require the client's email, be signed once, and stay available to both parties for as long as the agreement lasts.",
        "An invoice carries bank details and an amount. It should go to the person who pays, ideally with a unique link, and it should not be indexable or forwardable to anyone who asks. A brief or a deck is working material: readable by the project group, versioned, and replaceable.",
        "Writing those four rules down once takes ten minutes and stops the default everything-is-public link that most tools offer because it is the easiest to build.",
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
        "Send from a person, not a no-reply address. Clients reply to a person, and a reply in the same thread is the cheapest audit trail you will ever have.",
      ],
    },
    {
      heading: "When the client forwards the link",
      paragraphs: [
        "They will, and most of the time it is harmless: an assistant paying an invoice, a partner reading a proposal. The problem is only when the document contains something that should not travel, which is why the permission should match the content rather than the convenience of the moment.",
        "If a link that should have been scoped is forwarded, revoke it and send a fresh one to the right people with a one-line note: I have reissued the link so it is limited to your finance team. No accusation, no drama, and the record shows you manage access deliberately.",
      ],
    },
    {
      heading: "When you send it to the wrong person",
      paragraphs: [
        "It happens to almost everyone once: a proposal to the previous client with a similar name, an invoice to the wrong finance address, a contract attached to a reply-all. Act within the hour, and in this order. Revoke the link or recall the message. Tell the recipient plainly what they received and ask them to delete it. Tell the client whose information was involved, what was in it, and what you have done.",
        "Then write down what caused it and change one thing: the naming convention, the recipient check, or the habit of attaching files at all. The disclosure is uncomfortable for an hour; discovering it later from the client is uncomfortable for a year, and in some jurisdictions there are notification duties that make speed the only sensible option.",
      ],
    },
    {
      heading: "When a PDF is still right",
      paragraphs: [
        "When the client needs a file for their own records, when a legal process requires a fixed version, or when the recipient's systems cannot accept links. Send it as a final copy, name it with a date, and keep the link as the live version. The two are not in conflict as long as you say which is which.",
      ],
    },
    {
      heading: "A sharing policy you can write in ten minutes",
      paragraphs: [
        "Write four rules and keep them somewhere you will find them. One: proposals and contracts go as links, never as attachments. Two: bank details go in the invoice or on a call, never in an email body. Three: a client's folder is shared with named people, not with a link that anyone can forward. Four: access is removed when the project closes, on a date you diarise.",
        "Four rules are enough because they cover the failures that actually happen to a one-person business. A longer policy will not be read on the day you are in a hurry, and the day you are in a hurry is the day it matters. Keep it where you draft invoices, so the rule appears at the moment of the decision.",
      ],
    },
    {
      heading: "When the client's own systems are the constraint",
      paragraphs: [
        "Some clients work inside a procurement portal, a supplier platform or an intranet you cannot influence. Upload the document where they ask, and keep your own copy in your own place with the same version number. The client's system is their record; yours is the one you can search in March.",
        "If their portal strips links or converts files, name the version clearly in the filename and put the date in the document itself rather than only in the file properties. A contract that says version three in the footer is easier to identify than one that says version three in a filename somebody renamed.",
        "For clients like this, the link model still works for the parts you control: the proposal, the approval and the invoice reminder. Adopt their process for the documents they own, and keep your discipline for the ones you do.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is a link less secure than an attachment? Not inherently. A link you can revoke and scope is usually safer than a file you cannot recall, provided it is not public by default.",
        "Do I need encryption? Use the encryption your tools already provide in transit and at rest, and do not add a password to a PDF as your only control. A password sent in the same email is not a control.",
        "What about very small clients? The same model works; they get a link and no account. The habit costs you nothing and it scales when the clients get bigger.",
        "Should links expire? Yes, for proposals and one-off documents. Set a date that matches the decision, and renew it if the project is still live.",
        "Do I need a policy document? No, but a short note in your own files about how you handle client documents is useful if a client asks, and useful for you the day something goes wrong.",
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
