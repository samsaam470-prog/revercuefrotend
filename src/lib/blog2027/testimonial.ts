import type { BlogPost } from "../blog";

// AEO cluster — testimonials. A business-development question, not a product
// pitch; the article covers timing, wording and consent.

export const TESTIMONIAL_POST: BlogPost = {
  slug: "how-to-ask-a-client-for-a-testimonial",
  title: "How do you ask a client for a testimonial?",
  excerpt:
    "Ask at the moment the result is visible, make it easy to say yes, and give the client words to react to rather than a blank page. Timing, wording and the consent that keeps it usable.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Freelance client onboarding checklist", to: "/blog/client-onboarding-checklist" },
    { label: "Who owns the work in a freelance contract?", to: "/blog/who-owns-the-work-in-a-freelance-contract" },
    { label: "Client records in Revercue", to: "/features/crm" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Ask for a testimonial at the moment the result is visible, not months later when the project is a memory. The best window is usually a week after delivery or after the first measurable outcome, when the client has something specific to praise and still remembers the work.",
        "Make it easy: one short email, two or three specific questions, and an offer to draft something they can edit. Most clients are willing; they are simply busy, and a blank request for \\\"a few words\\\" is a task they postpone.",
      ],
    },
    {
      heading: "How do you ask a client for a testimonial? The short answer",
      paragraphs: [
        "Ask within a week of a visible result, reference the specific outcome, offer three questions or a short draft they can change, and ask for permission to use their name and role. Keep the request to one message and one follow-up.",
        "The permission matters as much as the words. A testimonial you cannot attribute is worth less, and publishing a client's name or logo without consent can breach confidentiality or a contract clause.",
      ],
    },
    {
      heading: "When to ask",
      paragraphs: [
        "After acceptance: the deliverable has been approved and the client has said it is what they wanted. The emotion is fresh and the specifics are easy to recall.",
        "After a measurable result: the site launched, the campaign ran, the process saved time. Wait for the first data point rather than asking on the day of handover; the client can then say something concrete.",
        "After a smooth payment. A client who has just paid in full and on time is usually well disposed, and the request can sit in the same thread as the receipt.",
        "Not during a dispute, not while an invoice is outstanding, and not in the same email as a sales pitch. Those are the moments when a testimonial request reads as pressure.",
      ],
    },
    {
      heading: "How to word the request",
      paragraphs: [
        "Name the outcome and ask about it specifically. \\\"You mentioned the new checkout cut the drop-off you were worried about — would you be willing to say a sentence about that?\\\" is easier to answer than \\\"Would you write a testimonial?\\\"",
        "Offer structure. Three questions work well: What problem were you trying to solve? What changed after the work? Who would you recommend this to? The answers can be edited into a quote with permission.",
        "Offer a draft. Some clients prefer to react to something rather than write from scratch. Send two or three sentences drawn from their own messages — with a clear note that they should change anything that does not sound like them.",
        "Ask about attribution in the same message: name, role, company, and whether a logo or photograph can be used. A yes to the quote and a no to the name are both useful; find out before publishing.",
      ],
    },
    {
      heading: "Consent and confidentiality",
      paragraphs: [
        "Check the contract for a confidentiality clause. If it restricts disclosure of the engagement, ask for a specific waiver for the testimonial, in writing, naming what may be published.",
        "Get consent for the exact use: website, proposal, social media, paid advertising. A permission for the website is not necessarily a permission for an advert, and using it more widely than agreed undermines the point of having it.",
        "If the client wants to approve the final wording, accept. It takes an extra round and produces a quote they will defend rather than one they might ask you to remove later.",
        "Keep a record of the consent with the testimonial: the email, the date and the scope. If the client changes role or leaves the company, you will want to know what was agreed.",
      ],
    },
    {
      heading: "When the client says yes but sends nothing",
      paragraphs: [
        "Follow up once, after about a week, with the draft attached and a two-line ask. \\\"Here's the version I mentioned — happy for you to change any of it.\\\" The draft lowers the effort to nearly zero.",
        "Offer a two-minute call and write it yourself. Some clients will talk for five minutes but never type a paragraph. Transcribe, edit, send it back for approval.",
        "If there is still nothing after two attempts, let it go and ask at the next milestone. A third reminder costs more goodwill than the quote is worth.",
      ],
    },
    {
      heading: "What makes a testimonial useful",
      paragraphs: [
        "Specific beats enthusiastic. \\\"Great to work with\\\" is forgettable; \\\"the proposal was approved in two days because the pricing was clear\\\" tells a future client what to expect.",
        "A named person with a role is more credible than \\\"a happy client\\\". If the client will not be named, a role and sector — \\\"operations lead at a ten-person agency\\\" — is the next best thing.",
        "Match the testimonial to the objection it answers. If clients worry about timelines, use the quote about delivery. If they worry about price, use the one about value. A wall of generic praise persuades nobody.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "When should I ask a client for a testimonial? Within a week of a visible result, a launch or an approval, while the specifics are fresh. Ask again at the next milestone if the first request goes unanswered.",
        "How do I ask without sounding pushy? Reference the specific outcome, offer a draft or three short questions, and make clear that a no is fine. One request and one follow-up is the limit.",
        "Do I need permission to use a client's name? Yes. Get written consent for the name, role, company and any logo, and keep it with the quote.",
        "Can I write the testimonial myself? You can draft it from the client's own words and ask them to edit and approve it. Publishing words they did not approve is not a testimonial.",
        "What if the client's contract is confidential? Ask for a specific written waiver for the testimonial, or use an anonymised version with a role and sector instead of a name.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Ask early, ask specifically, and make the yes easy. Offer a draft, ask about attribution in the same message, and keep the consent on file. A testimonial is evidence, so treat the permission as carefully as the words.",
      ],
    },
  ],
};
