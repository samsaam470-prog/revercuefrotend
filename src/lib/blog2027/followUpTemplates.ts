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
        "They also share a shape worth remembering when you write without a template: context in one clause, new information in one sentence, a small request in one question, and a default if nobody answers. Four moves, four sentences, and the message stops being a chase.",
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
      heading: "Template 6: the answer to a no",
      paragraphs: [
        "Subject: Thanks, and one thing. Body: Thanks for telling me, that is genuinely more useful than silence. If it is not confidential, was it the price, the scope or the timing? I ask because it changes what I do next, not to reopen it. Either way, if something smaller comes up later, the door is open. Why it works: it asks one precise question, makes clear you are not negotiating, and leaves the client feeling good about having said no. A client who answers that question once is a client who refers you twice.",
      ],
    },
    {
      heading: "A thread, end to end",
      paragraphs: [
        "Seeing them in sequence helps, because the failure mode is not a bad sentence; it is five versions of the same message. Day zero: the proposal, with a line naming the decision date. Day two: template one, adding a fact and offering a call. Day nine: template two or a smaller package, naming the likely objection.",
        "Day eighteen: template four, with an exit. Day twenty-five: template five, closing the loop. Five touches over three and a half weeks, each one different, each one ending with something the client can do in a single reply. The client's inbox sees a professional managing a pipeline, which is a very different impression from someone waiting to be noticed.",
      ],
    },
    {
      heading: "Subject lines that get opened",
      paragraphs: [
        "The subject has one job: to say what the message is about without making the client feel chased. Specific beats clever. The website proposal — one thing I should have said is specific. Quick question is not; it could be anything, and it smells like a sales email. Avoid urgency you cannot support, because final reminder implies a consequence that usually does not exist and clients learn to ignore it. If there is a real date, put it in the subject: Holding the 8th until Friday. A deadline that can be checked is more persuasive than a dramatic word.",
        "Reply in the original thread where you can. The proposal subject is already in the client's head, the history is attached, and the message arrives as part of a conversation rather than as a new demand on their attention.",
      ],
    },
    {
      heading: "Making a template sound like you",
      paragraphs: [
        "Change four things and the message becomes yours: the greeting, which should match how you already write to that client; the one added fact, which should come from this project rather than a generic claim; the rhythm, which should be the sentence length you use when you are not trying; and the sign-off. Then read it out loud. The most common offender is enthusiasm with nowhere to go. Replace it with a fact, because the most persuasive line in a follow-up is usually the smallest true one.",
        "The second most common offender is length. If a draft runs past 150 words, it is usually carrying an explanation of why the client should reply, which is the part that makes it feel like pressure. Cut the explanation and keep the fact.",
      ],
    },
    {
      heading: "When not to use a template",
      paragraphs: [
        "Do not use one when the client has given you a real reason for the delay. If they wrote to say a parent is ill or a funding round collapsed, the next message is a human sentence, not a structure with a slot for new information. The same applies after a difficult call: a template at that moment reads as indifference.",
        "Do not use one for the first message after a referral. Referred clients arrive with a warm introduction behind them, and the follow-up should sound like the person who was recommended rather than a process. Those two exceptions aside, the structures will serve you for years, which is exactly why they are worth learning rather than pasting.",
      ],
    },
    {
      heading: "When the reply is hostile",
      paragraphs: [
        "Occasionally a follow-up lands badly. The client writes back that they are busy, that they never asked for three messages, or that they have already said no to somebody. The instinct is to apologise at length or to defend the process, and both make it worse.",
        "Reply once, briefly, and take the temperature out: understood, I will stop chasing and leave the proposal with you. If anything changes, reply here and I will pick it up. No explanation of why you wrote, no summary of the value you offer, no question that requires another answer. You have achieved the thing the follow-up was for, which is clarity about where the decision stands.",
        "Then change one thing on your side. If the client felt chased, the messages were probably too frequent or too similar, which is exactly the pattern these structures exist to break. A hostile reply is useful feedback about the rhythm, even when it is unfair about the content.",
      ],
    },
    {
      heading: "Which template actually works",
      paragraphs: [
        "Track them for a quarter and the pattern is usually blunt. The day-two message gets read and rarely answered, because nothing is at stake yet. The decision date gets answered, because it contains a real consequence. The graceful close gets answered more than any other, because it removes an obligation rather than adding one.",
        "The nudge after silence is the weakest, and it is the one freelancers send most often. It asks the client to explain themselves without offering anything in return, which is why it sits in inboxes. If you only keep two, keep the decision date and the close, and use the day-two message to add a fact rather than to ask for attention.",
        "Write the result in your notes each time: which message, which client, what came back, how many days. Ten proposals later you will know your own reply rate better than any article can tell you, and you can delete the templates that never work for your clients.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Should the follow-up include the proposal again? If it is a link, yes, in one line, because it removes a search. If it is an attachment, no, unless delivery failed; a second PDF makes the thread heavier.",
        "How long should a follow-up be? Under 120 words. If it needs more, it is a new proposal rather than a follow-up, and it should be sent as one.",
        "Can I reuse the same template for every client? Use the same structure and change the specific sentence. The structure is what makes it work; the specific sentence is what makes it credible.",
        "What if English is not the client's first language? Keep the sentences shorter and drop the idioms. The structures survive translation better than the phrasing does.",
        "Do emojis help? Not in a proposal follow-up. They read as either overfamiliar or nervous, and the message has to do a job that neither improves.",
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
