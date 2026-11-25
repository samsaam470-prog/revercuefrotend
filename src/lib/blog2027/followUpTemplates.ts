import type { BlogPost } from "../blog";

// Cluster A, article three: the practical artefact. Five structures rather
// than scripts, because a template that sounds like a template defeats itself.

export const FOLLOW_UP_TEMPLATES_POST: BlogPost = {
  slug: "proposal-follow-up-email-templates",
  title: "Proposal follow-up email templates that get a reply",
  excerpt:
    "Five short templates for the five moments that matter, with the reasoning behind each line and the changes that stop them reading like templates. Copy the structure, not the words.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "How to follow up without being annoying", to: "/blog/how-to-follow-up-on-a-proposal-without-being-annoying" },
    { label: "Why clients go quiet", to: "/blog/why-clients-go-quiet-after-a-proposal" },
    { label: "Proposals in Revercue", to: "/features/proposals" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Templates are useful for the same reason a checklist is useful in a cockpit: they stop you forgetting the thing that matters when you are busy or nervous. They are dangerous for the same reason. A message that sounds like a template tells the client they are one of many, which is the one impression a follow-up cannot afford.",
        "So these are not messages to paste. They are five structures for the five moments that actually occur, each with the reasoning behind the lines and the changes that make it yours. Keep the length. Short is the point.",
      ],
    },
    {
      heading: "What all five have in common",
      paragraphs: [
        "Every one is under 120 words, names the specific proposal, contains exactly one request, and ends with a date or a default. None begins with an apology, none uses the word just, and none asks whether the client has had a chance to look. That question asks the client to admit they have not, which is a small social cost many people avoid by not replying at all. The replacement is a statement plus a small question.",
      ],
    },
    {
      heading: "Template 1: the day-two check-in",
      paragraphs: [
        "Subject: The website proposal — one thing I should have said. Body: I have put the proposal at the link below, in case that is easier than the previous version. One thing I should have said in it: the content migration is what usually delays a launch, so I have kept it in week one rather than week four. If Thursday still works for fifteen minutes, I can walk you through the two packages and you can decide on the call. If not, reply with a day that does. Why it works: it assumes a normal relationship, adds one fact, and offers a call as the smallest next step. Offering a time is easier to accept or decline than an open question.",
      ],
    },
    {
      heading: "Template 2: after they opened the pricing",
      paragraphs: [
        "Subject: A note on the two packages. Body: I noticed you spent some time on the pricing, so I wanted to make the difference clearer than the proposal does. The 4,200 option covers design and build of five pages. The 6,800 option adds copywriting and a photography day, which is usually what decides whether the site launches on time. If the number is the issue rather than the scope, tell me the range you are working with and I will show you what fits inside it. Why it works: it uses what you know without accusing anyone, and it lets the client raise the budget without rejecting you. Do not say how you know what they read; if asked, the link reports views, which is true and unremarkable.",
      ],
    },
    {
      heading: "Template 3: the decision date",
      paragraphs: [
        "Subject: Holding your start date until Friday. Body: I have a start date on the 8th and one on the 22nd. I can hold the 8th for you until Friday, after which I will offer it to the next project in the queue. If the rebuild is going ahead, reply with the package you want and I will send the contract the same day. If the timing has moved, tell me roughly when and I will hold the proposal instead of the slot. Why it works: it is honest about capacity rather than inventing scarcity, and it separates whether to go ahead from when to start. Only use a date you will enforce; a slot that is never released teaches clients that your dates are decorative.",
      ],
    },
    {
      heading: "Template 4: the nudge after silence",
      paragraphs: [
        "Subject: Still useful? Body: No reply needed if the timing is wrong. I am tidying my pipeline this week and wanted to check whether the rebuild is still live. If it is, tell me the one thing holding the decision and I will either fix it or tell you honestly that I am not the right fit. If it is not, I will close it out and keep the proposal on file until March. Why it works: it offers an exit, which paradoxically produces more replies than another reminder, and it invites the client to name the real objection.",
      ],
    },
    {
      heading: "Template 5: the graceful close",
      paragraphs: [
        "Subject: Closing this out. Body: I am closing this out so it is not sitting in your inbox. The proposal stays valid until the end of March and the link will keep working. If the project comes back, reply to this email and we will pick it up from the same place. Thanks for the conversation either way, and good luck with the launch. Why it works: it removes the obligation that was making the client avoid you, and leaves a door that can reopen. Do not use it as a bluff. If they reply after the close, you are allowed to be pleased.",
      ],
    },
    {
      heading: "Subject lines that get opened",
      paragraphs: [
        "The subject has one job: to say what the message is about without making the client feel chased. Specific beats clever. The website proposal — one thing I should have said is specific. Quick question is not; it could be anything, and it smells like a sales email. Avoid urgency you cannot support, because final reminder implies a consequence that usually does not exist and clients learn to ignore it. If there is a real date, put it in the subject: Holding the 8th until Friday. A deadline that can be checked is more persuasive than a dramatic word.",
      ],
    },
    {
      heading: "Making a template sound like you",
      paragraphs: [
        "Change four things and the message becomes yours: the greeting, which should match how you already write to that client; the one added fact, which should come from this project rather than a generic claim; the rhythm, which should be the sentence length you use when you are not trying; and the sign-off. Then read it out loud. The most common offender is enthusiasm with nowhere to go. Replace it with a fact, because the most persuasive line in a follow-up is usually the smallest true one.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Should the follow-up include the proposal again? If it is a link, yes, in one line, because it removes a search. If it is an attachment, no, unless delivery failed; a second PDF makes the thread heavier.",
        "How long should a follow-up be? Under 120 words. If it needs more, it is a new proposal rather than a follow-up, and it should be sent as one.",
        "Can I reuse the same template for every client? Use the same structure and change the specific sentence. The structure is what makes it work; the specific sentence is what makes it credible.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A follow-up is a small, specific, low-cost request. Templates keep it small and specific; rewriting them keeps it from sounding like everybody else's. Keep them under 120 words, put a date in each, and let the last message close the loop rather than reopen the guilt.",
      ],
    },
  ],
};
