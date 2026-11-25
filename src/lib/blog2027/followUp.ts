import type { BlogPost } from "../blog";

// Cluster A — the silent client.
// Search intent: people who have sent a proposal and are now waiting, or who
// have lost work to silence and want to know why. These are not buyer queries,
// so the product is mentioned once, at the end, and only where it is relevant.

export const FOLLOW_UP_POSTS: BlogPost[] = [
  {
    slug: "how-to-follow-up-on-a-proposal-without-being-annoying",
    title: "How to follow up on a proposal without being annoying",
    excerpt:
      "A follow-up is not a reminder that you exist. It is a small piece of help that makes the decision easier. Here is the schedule, the wording and the stopping rule, plus what to do when the silence is really a no.",
    date: "2026-11-25",
    readMinutes: 11,
    links: [
      { label: "Proposals in Revercue", to: "/features/proposals" },
      { label: "How to make your proposal speak for you", to: "/blog/how-to-make-your-proposal-speak-for-you" },
      { label: "Why clients go quiet after a proposal", to: "/blog/why-clients-go-quiet-after-a-proposal" },
      { label: "Pricing and plans", to: "/pricing" },
    ],
    body: [
      {
        paragraphs: [
          "You sent the proposal on Tuesday. It is Thursday. You have read it three times, changed nothing, and are now composing the fourth version of a message that says, in effect, did you see it. This is the moment most freelance work is lost, and it is lost to a follow-up problem rather than a pricing problem. The client did not decide against you. They did not decide at all, and the message you are about to send will either give them a reason to decide or give them a reason to avoid you.",
          "The good news is that following up well is a skill with a small number of rules, and none of them require you to be pushy or to pretend to be casual when you are not. The rules are about timing, about what you add in each message, and about knowing when to stop. This guide covers all three, with wording you can adapt rather than scripts to copy.",
        ],
      },
      {
        heading: "The short answer",
        paragraphs: [
          "Follow up three times over about three weeks, and make every message add something the client did not have before: an answer to the question they are most likely to be asking, a smaller first step, or a clear date after which you will assume the timing is wrong. Then stop, and say that you are stopping. A follow-up that only asks whether they have read the proposal transfers the work of deciding back to the client without giving them anything new, which is why it feels annoying to send and reads as pressure to receive.",
          "The single most useful change most freelancers can make is to move from asking a question to offering a decision. Instead of asking whether they have had a chance to look, say what happens next and when. A concrete next step is easier to answer than an open question, because it can be accepted, amended or declined in one line.",
        ],
      },
      {
        heading: "The follow-up is usually not the problem",
        paragraphs: [
          "Before you write another message, separate two failures that look identical from your side. The first is a decision that has not happened: the client is busy, the proposal is sitting in a queue, and a well-timed message will move it. The second is a decision that has happened and has not been communicated: the price was too high, the scope was not what they wanted, or the work went to someone else. The first is fixed by the next message. The second is only fixed by the next proposal.",
          "You can normally tell the difference by what the client did rather than what they said. A client who opened the proposal twice, expanded the pricing section and asked one question is still deciding. A client who never opened it is not deciding about your proposal at all. A client who opened it once for eleven seconds three weeks ago has probably decided something, and the polite follow-up is really a request to be told what. Knowing which case you are in changes the tone of the message entirely, and it is the reason a proposal that reports views is worth more than a PDF attachment that reports nothing.",
        ],
      },
      {
        heading: "A schedule you can keep",
        paragraphs: [
          "Day zero is the send. The proposal goes out with a sentence that names the next step and a date: I will check in on Thursday, or the price holds until the 14th. That single line does more for your reply rate than any follow-up, because it tells the client that a decision is expected and when. Most silence begins with a proposal that ended with let me know if you have any questions, which is an invitation to never reply.",
          "Day two or three is the first follow-up. Keep it short, add one useful thing, and do not ask for a status update. The useful thing can be an answer to the question you expect, a note about availability, or a link to one relevant piece of work. Two or three sentences is the whole message. This is the message that most often earns a reply, because it arrives while the proposal is still recent and it costs the client nothing to answer.",
          "Day seven to ten is the second follow-up. This is where you narrow the ask. Instead of asking for a decision on the whole project, offer the smallest version that is still useful: a call to talk through the scope, a revised package, or a start date later in the month. A smaller question is easier to answer than a large one, and it keeps the thread alive without another round of did you see it.",
          "Day fourteen to twenty-one is the last one, and it closes the loop. Say plainly that you are assuming the timing is not right, that you will keep the proposal on file, and that they are welcome to come back when it is. Then actually stop. This message gets more replies than any other, because it is the first one where doing nothing has a consequence. It also protects your own attention, which is the resource the whole schedule is really about.",
        ],
      },
      {
        heading: "What every follow-up should contain",
        paragraphs: [
          "A follow-up has three jobs, and a message that does all three can be three lines long. First, it should re-establish the decision that is being asked for, in one clause: the proposal for the website rebuild, the two packages at 4,200 and 6,800. Second, it should add something: a date, an answer, a smaller option, a relevant example. Third, it should make replying easy by naming a default. If I do not hear back by Friday I will assume the timing has moved, and pick it up in the new year.",
          "What it should not do is apologise for existing. Phrases such as sorry to bother you, just checking in, and I know you are busy all signal that the message has no value, and they invite the client to treat it as noise. You are not interrupting a client who asked you for a price. You are continuing a commercial conversation that they started, and the tone should reflect that without becoming cold.",
          "It should also not contain a new decision for the client to make. If your follow-up introduces a discount, a new package, a different timeline and a question, you have replaced one open decision with four. The message that gets answered is the one with a single, small, clearly stated next step.",
        ],
      },
      {
        heading: "Email, WhatsApp or LinkedIn",
        paragraphs: [
          "Use the channel the client used to ask for the proposal. If they messaged you on WhatsApp, a formal email three days later reads as a different relationship, and it may not be read at all. If they emailed, stay in email, in the same thread, so the proposal and the conversation sit together. If the introduction came through a platform, keep the conversation there until the client moves it.",
          "Do not use a second channel to escalate before the first has had a fair chance. A WhatsApp message, an email and a LinkedIn note within forty-eight hours does not read as diligence; it reads as three people chasing one invoice. One channel, one thread, one clear next step per message. If you must move channels, say why in one line: I am sending this by email so the proposal and the reply are in one place.",
          "Timing within the day matters less than people think, but it is not nothing. A message that arrives on a Monday morning sits at the top of an inbox that is being cleared. A message that arrives on a Friday afternoon sits under the weekend. If the client is in a different time zone, send it at the start of their working day, not the end.",
        ],
      },
      {
        heading: "Reading silence correctly",
        paragraphs: [
          "Silence is data, but it is ambiguous data, and most freelancers resolve the ambiguity in the least useful direction: they assume the work is gone and stop, or they assume the client is rude and get angry. Neither is usually true. The most common cause of silence is that the decision moved to someone else, or that the decision competes with something more urgent that is also unpaid.",
          "A useful habit is to write one line in your own notes when a proposal goes quiet: what you sent, when, what the client did with it, and what you would change next time. After ten proposals you will have a pattern rather than a feeling. If most silences follow proposals above a certain price, the price is the variable. If they follow a certain type of client, the qualification is the variable. If they follow proposals sent on a Friday to a generic address, the delivery is the variable.",
          "The hardest case is the client who replies warmly and then disappears. That is rarely a rejection; it is usually a project that has lost its internal sponsor or its budget. The follow-up that works there is not another reminder about the proposal. It is a question about the project: has the timeline changed, and would it help to split this into a smaller first phase. That gives the client a way to say what actually happened without admitting that the budget disappeared.",
        ],
      },
      {
        heading: "The stopping rule",
        paragraphs: [
          "Three follow-ups over three weeks is a reasonable default for a proposal of ordinary size. Stop earlier if the client tells you the timing is wrong, and stop immediately if they say no. Stop later only if the client has given you a real date: we decide after the board meeting on the 12th. A stated date is an invitation to follow up on the 13th; silence is not.",
          "When you stop, say so. The closing message is short: I am going to close this out for now so it is not sitting in your inbox. The proposal stays valid until the end of the month if the timing changes. That message does two things at once. It removes the pressure that made the client avoid the thread, and it leaves a door open that the client can walk through later without embarrassment. A surprising number of projects come back through that door, months later, with a new budget.",
        ],
      },
      {
        heading: "What good follow-up looks like in practice",
        paragraphs: [
          "A proposal that is a link rather than an attachment changes the follow-up, because you can see whether it was opened and what was read. That does not mean you should mention the views. It means the message can be specific without being accusatory: I saw you looked at the Growth package, so I have added a note on what changes if we start in January. Specific help is not creepy; a message that says I know you opened this at 9:41 is.",
          "The wider point is that follow-up is part of the proposal, not a separate chore that happens afterwards. A proposal that ends with a date, a clear next step and one way to ask a question produces fewer silences than a better-written document that ends with nothing. If you fix only one thing this month, fix the last paragraph of the proposal, and the follow-up problem gets smaller on its own.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "How soon should I follow up after sending a proposal? Two or three working days for the first message, then roughly a week later, then a final message around day fourteen to twenty-one. If the client named a date, follow up the day after that date instead.",
          "Is it unprofessional to send three follow-ups? No, if each one adds something and each one is short. Three messages over three weeks is less contact than a single newsletter, and the client asked you for a price. What reads as unprofessional is repetition without value.",
          "Should I ever lower the price in a follow-up? Only if you have learned something that justifies it, such as a reduced scope. A discount sent into silence teaches the client that waiting produces a better price, and it makes the next proposal harder.",
          "What if the client asks a question I already answered in the proposal? Answer it again, in one line, and point to the section. They did not read it closely, which is normal, and correcting them is not the job. Answering the question is.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Follow-up is not chasing. It is the part of the sale where you make the decision cheap to make. Send fewer messages, make each one useful, name a date, and close the loop out loud when you stop. The client who was never going to reply will not start because of a better message. The client who was going to reply eventually will reply sooner, and the client who was quietly stuck will tell you why, which is the information you actually needed.",
        ],
      },
    ],
  },
  {
    slug: "why-clients-go-quiet-after-a-proposal",
    title: "Why clients go quiet after a proposal: nine reasons and what to change",
    excerpt:
      "Silence after a proposal is almost never about you personally. It is one of nine ordinary situations, each with a different fix. Here is how to tell them apart, and what to change before the next proposal goes out.",
    date: "2026-11-25",
    readMinutes: 12,
    links: [
      { label: "Follow-up that is not annoying", to: "/blog/how-to-follow-up-on-a-proposal-without-being-annoying" },
      { label: "How to make your proposal speak for you", to: "/blog/how-to-make-your-proposal-speak-for-you" },
      { label: "Proposals in Revercue", to: "/features/proposals" },
      { label: "Client management software guide", to: "/blog/freelance-client-management-software" },
    ],
    body: [
      {
        paragraphs: [
          "A proposal goes out and nothing comes back. There is no rejection email, no counter-offer, no thanks but we went another way. Just silence, and the longer it lasts the more it feels like a verdict on your work. In practice, silence is one of the least informative signals in a freelance business, because nine very different situations all produce the same empty inbox.",
          "This article separates those nine situations, says how to recognise each one from the evidence you already have, and gives the fix that belongs in your next proposal rather than your next follow-up. The aim is not to explain away lost work. It is to stop you from changing your price because of a delay, and stop you from changing your process because of a budget.",
        ],
      },
      {
        heading: "The short answer",
        paragraphs: [
          "Clients go quiet for one of three underlying reasons: the decision is not theirs to make alone, the decision is competing with something more urgent, or the proposal did not give them enough to decide with. Everything else is a variation. The first two are about the client's situation and can only be waited out with a well-timed message. The third is about your document and is the only one you can fix before the next send.",
          "That distinction matters because most advice about silence treats it as a persuasion problem. More urgency, more scarcity, more calls. If the decision is sitting with a finance director who is on leave, none of that helps. If the proposal never stated what the client gets for the money, none of that helps either. The useful move is to diagnose before you write another word.",
        ],
      },
      {
        heading: "1. The decision moved to someone else",
        paragraphs: [
          "You were talking to a marketing manager. The budget belongs to a finance director. The manager liked the proposal and forwarded it, and now it is in a queue you cannot see. This is the most common cause of silence on proposals above a certain size, and it looks identical to being ignored.",
          "How to recognise it: the person you spoke to was enthusiastic, asked detailed questions, and then stopped replying after a date when they said they would discuss it internally. There was a moment in the conversation when they said I will need to check, and you did not ask what happens after that check.",
          "What to change: ask early who signs, who pays, and what the approval path looks like. Then write the proposal so it can survive being forwarded to someone who never met you. That means stating the problem in the client's own words on the first screen, naming the outcome in business terms, and putting the price in a table that can be read without context. A proposal that only makes sense in a conversation will not survive the forward.",
        ],
      },
      {
        heading: "2. The price was higher than the budget, and nobody wanted to say so",
        paragraphs: [
          "Almost no client replies with the sentence your price is too high for us. It is an awkward thing to write, and it invites a negotiation the client may not want to have. So the email goes unwritten, and the freelancer concludes that the client was never serious.",
          "How to recognise it: the client engaged heavily before the price, went quiet immediately after, and did not ask a single question about the proposal itself. If they never opened the pricing section, this is less likely; if they opened it repeatedly and then stopped, it is very likely.",
          "What to change: give the client a way to say the budget is the issue without rejecting you. A single line near the price: if the total is outside the range you had in mind, say so and I will show you what changes at a lower number. That sentence costs nothing and recovers a surprising share of stalled proposals, because it moves the conversation from yes or no to what fits.",
        ],
      },
      {
        heading: "3. The project lost its urgency",
        paragraphs: [
          "The website was urgent in September. In November, the person who cared about it changed role, or a bigger project landed on top of it, or the business had a quiet quarter. Nothing was decided, and nothing will be decided until something else creates a deadline.",
          "How to recognise it: the client was responsive until a specific week, then stopped, and the proposal was not the last thing you sent them. If your other messages also went unanswered, it is not about your proposal.",
          "What to change: propose a smaller first step with its own deadline, such as a one-page audit or a single landing page. A small piece of paid work keeps the relationship warm and often becomes the entry point for the full project when the budget returns. Do not discount the full project to create urgency; that teaches the client that urgency is a pricing tactic.",
        ],
      },
      {
        heading: "4. The scope was not what they thought they were buying",
        paragraphs: [
          "The client asked for a website. Your proposal describes a design system, a content migration, an analytics setup and a training session. Each of those is reasonable, and together they read as a different, larger project than the one in the client's head. The client is not sure whether they are being sold more than they need, and rather than ask, they wait.",
          "How to recognise it: the client asked few or no questions, and the proposal's first screen is about your process rather than their outcome. Or the client replied with a question about one small line item and nothing else.",
          "What to change: lead with the client's words. The first paragraph should restate what they said they wanted, in the terms they used. Put the extras in a clearly optional section with prices attached, so the core offer stays the size the client expected. A proposal that lets the client buy less is easier to say yes to than one that only offers everything.",
        ],
      },
      {
        heading: "5. They are comparing, and the comparison is not finished",
        paragraphs: [
          "Your proposal is one of three. The client is waiting for the third, or waiting for a partner to read all three, or waiting for a call with a competitor that keeps being rescheduled. From your side this looks like silence, and it may last two weeks.",
          "How to recognise it: the client told you they were speaking to others, or the project type is one that usually attracts three quotes. The client's questions are unusually generic, the kind you ask when you are building a comparison rather than planning the work.",
          "What to change: make comparison easy in your favour by being specific where others are vague. State what is included, what is not, what happens if the project changes, and when you can start. A comparison table the client has to build themselves will favour whichever proposal is cheapest to read, which is rarely the best one.",
        ],
      },
      {
        heading: "6. They never really read it",
        paragraphs: [
          "This is uncomfortable and common. The proposal arrived as an attachment, the client opened it on a phone, saw a wall of text and a price, and closed it with the intention of reading it properly later. Later did not come.",
          "How to recognise it: the document is long, the format is a PDF or a long email, and the client's next message, if any, asks something that is answered on page one. If you can see views, a single short view is the signature.",
          "What to change: shorten the first screen to a paragraph and a price. Put the detail behind headings. If you can send a link instead of an attachment, do, because a link opens in the browser in one tap and can be read in sections on a phone without downloading anything. The format is not decoration; it decides whether the document is read at all.",
        ],
      },
      {
        heading: "7. The ask was too large for the moment",
        paragraphs: [
          "You asked for a decision on a six-month engagement with a large deposit, in the same week the client was closing a funding round. The proposal is not wrong; the timing of the ask is. Clients postpone large commitments during uncertain weeks, and the postponement is rarely communicated.",
          "How to recognise it: the client's public signals, such as a launch, a hiring freeze or a funding announcement, coincide with the silence. Or the client told you the timing was difficult and you sent the proposal anyway.",
          "What to change: offer a phased version with a decision that is small enough to make now. A paid discovery week, a single deliverable, or a first milestone with a separate price. The point is to give the client a way to start without committing to the whole number in a week when they cannot.",
        ],
      },
      {
        heading: "8. They decided no, and nobody wants to write the email",
        paragraphs: [
          "Some silence is a decision that has been made and not delivered. The client feels awkward about saying no, or assumes you will work it out, or simply forgets. This is the case where further follow-up has the lowest return, and where a graceful closing message has the highest.",
          "How to recognise it: a long period of silence after a proposal that was clearly read, combined with no response to a direct question about timing. After two follow-ups with no answer, assume the decision has been made and behave accordingly.",
          "What to change: send the closing message and mean it. Thank them, say the proposal stays on file until a stated date, and stop. Then put the same energy into the pipeline. The one thing not to do is send a fourth message that implies the client owes you an answer, because that converts a soft no into a relationship you cannot reopen.",
        ],
      },
      {
        heading: "9. The proposal arrived at the wrong address",
        paragraphs: [
          "It went to a personal inbox that the client checks weekly, or to an address that routes to an assistant, or into a spam folder because it had an attachment and a link. The client is not ignoring you; the client never saw it.",
          "How to recognise it: no views at all, no reply to any message, and a client who was warm in the conversation. If the proposal is a link, the absence of a single open is strong evidence.",
          "What to change: confirm the address in the conversation before sending, and send from a person rather than a no-reply. If the proposal is a link, the first follow-up can include it again in one line, without comment. A surprising number of silent proposals are simply undelivered.",
        ],
      },
      {
        heading: "Telling them apart before you write",
        paragraphs: [
          "You do not need certainty to choose a follow-up; you need a hypothesis. Use three pieces of evidence. Did the client open the document, and how much of it? Did they ask a question before the proposal, and what kind? And what has happened publicly in their business since? Those three answers narrow nine possibilities to two or three, and the message that fits two possibilities is much better than the message that fits none.",
          "Then write one line in your notes: the hypothesis, the date, and the next action. Over a quarter, the pattern that emerges is your actual conversion problem. If most silences are undelivered proposals, fix delivery. If most are budget shocks, fix qualification. If most are unread documents, fix the format. The feeling of being ignored is not a metric; the pattern is.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "Should I follow up after a client says they will get back to me? Yes, once, after the date they named. If they did not name a date, ask for one in your reply: when should I check in? A date converts an open loop into a scheduled one.",
          "Does a proposal with a deadline get more replies? In practice, a stated validity date gives the client a reason to respond and gives you a clean reason to close the loop. Keep it honest: if the price still holds next month, do not pretend otherwise.",
          "How many proposals should I have open at once? Enough that one silence does not decide your month. The healthy number depends on your close rate, but if a single unanswered proposal can ruin a week, the pipeline is the problem rather than the follow-up.",
          "Is silence ever a reason to lower the price? No. Silence tells you nothing about willingness to pay. Lower the price when you have evidence about the budget, the scope or the competition, not when you are anxious.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Silence is a symptom with nine ordinary causes, and only one of them is about the quality of your work. Diagnose with the evidence you already have, send the message that fits, and then change the one part of your process that produced the silence. The proposal that cannot be forwarded, cannot be read on a phone, or cannot be declined gracefully will keep producing the same empty inbox, no matter how good the follow-up is.",
        ],
      },
    ],
  },
  {
    slug: "proposal-follow-up-email-templates",
    title: "Proposal follow-up email templates that get a reply",
    excerpt:
      "Five short templates for the five moments that matter, with the reasoning behind each line and the changes that stop them reading like templates. Copy the structure, not the words.",
    date: "2026-11-25",
    readMinutes: 11,
    links: [
      { label: "How to follow up without being annoying", to: "/blog/how-to-follow-up-on-a-proposal-without-being-annoying" },
      { label: "Why clients go quiet", to: "/blog/why-clients-go-quiet-after-a-proposal" },
      { label: "Proposals in Revercue", to: "/features/proposals" },
      { label: "Pricing and plans", to: "/pricing" },
    ],
    body: [
      {
        paragraphs: [
          "Templates are useful for the same reason a checklist is useful in a cockpit: they stop you from forgetting the thing that matters when you are busy or nervous. They are dangerous for the same reason. A template that sounds like a template tells the client that they are one of many, which is exactly the impression a follow-up cannot afford to give.",
          "So this is not a list of messages to paste. It is five structures for the five moments that actually occur, with a note on why each line exists and what to change so the message sounds like you. Use the structure, rewrite the sentences, and keep the length. Short is the point.",
        ],
      },
      {
        heading: "What all five templates have in common",
        paragraphs: [
          "Every message below is under 120 words, names the specific proposal, contains exactly one request, and ends with a date or a default. Those four properties do most of the work. Length signals effort you did not ask the client to match; a second request splits the decision; no date leaves the loop open forever.",
          "None of them begin with an apology. None of them use the word just. None of them ask whether the client has had a chance to look, because that question asks the client to admit they have not, which is a small social cost that many people avoid by not replying at all. The replacement is a statement plus a small question, which is easier to answer.",
        ],
      },
      {
        heading: "Template 1: the day-two check-in",
        paragraphs: [
          "Subject: The website proposal — one thing I should have said",
          "Hi Sam. The proposal for the rebuild is at the link below, in case it is easier to open than the previous version. One thing I should have said in it: the content migration is the part that usually delays a launch, so I have kept it in week one rather than week four. If Thursday still works for a fifteen-minute call, I can walk you through the two packages and you can decide on the call. If not, reply with a day that does.",
          "Why it works: it assumes a normal relationship, adds one piece of information, and offers a call as the smallest next step. It does not ask whether the proposal was read. Offering a specific time is easier to accept or decline than an open question, and it gives the client a reason to reply even if the answer is later.",
        ],
      },
      {
        heading: "Template 2: after they opened the pricing",
        paragraphs: [
          "Subject: A note on the two packages",
          "Hi Sam. I noticed you spent some time on the pricing section, so I wanted to make the difference between the two packages clearer than the proposal does. The 4,200 option covers the design and build of five pages. The 6,800 option adds the copywriting and the photography day, which is usually what decides whether the site launches on time. If the number is the issue rather than the scope, tell me the range you are working with and I will show you what fits inside it.",
          "Why it works: it uses what you know without accusing anyone, and it gives the client a way to raise the budget without rejecting you. That last sentence recovers a meaningful share of stalled proposals. Do not say how you know what they read; if the client asks, the answer is that the link reports views, which is true and unremarkable.",
        ],
      },
      {
        heading: "Template 3: the decision date",
        paragraphs: [
          "Subject: Holding your start date until Friday",
          "Hi Sam. I have a start date on the 8th and one on the 22nd. I can hold the 8th for you until Friday, after which I will offer it to the next project in the queue. If the rebuild is still going ahead, reply with the package you want and I will send the contract the same day. If the timing has moved, tell me roughly when and I will hold the proposal instead of the slot.",
          "Why it works: it is honest about capacity rather than inventing scarcity, and it separates two decisions that are usually tangled, whether to go ahead and when to start. Only use a date you will actually enforce. A held slot that is never released teaches clients that your dates are decorative.",
        ],
      },
      {
        heading: "Template 4: the nudge after silence",
        paragraphs: [
          "Subject: Still useful?",
          "Hi Sam. No reply needed if the timing is wrong. I am tidying my pipeline this week and wanted to check whether the rebuild is still live. If it is, tell me the one thing that is holding the decision and I will either fix it or tell you honestly that I am not the right fit. If it is not, I will close it out and keep the proposal on file until March.",
          "Why it works: it offers an exit, which paradoxically produces more replies than another reminder. The phrase tell me the one thing that is holding the decision invites the client to name the real objection, which is the information you cannot get from silence. Keep the tone level; no guilt, no joke, no emoji.",
        ],
      },
      {
        heading: "Template 5: the graceful close",
        paragraphs: [
          "Subject: Closing this out",
          "Hi Sam. I am closing this out so it is not sitting in your inbox. The proposal stays valid until the end of March, and the link will keep working. If the project comes back, reply to this email and we will pick it up from the same place. Thanks for the conversation either way, and good luck with the launch.",
          "Why it works: it removes the obligation that was making the client avoid you, and it leaves a reopenable door. Do not use it as a bluff. If the client replies after the close, you are allowed to be pleased and to re-open the thread; the message was about removing pressure, not about punishing them.",
        ],
      },
      {
        heading: "Subject lines that get opened",
        paragraphs: [
          "The subject line has one job: to tell the client what the message is about without making them feel chased. Specific beats clever. The website proposal — one thing I should have said is specific. Quick question is not; it could be anything, and it smells like a sales email.",
          "Avoid urgency you cannot support. Final reminder implies a consequence that usually does not exist, and clients learn to ignore it. If there is a real date, put the date in the subject: Holding the 8th until Friday. A real deadline is more persuasive than a dramatic word, because it can be checked.",
          "Keep the thread. Reply to the email that contained the proposal rather than starting a new one, so the client sees the history and does not have to search. If the proposal was sent through a platform, send the follow-up from your own address with the link, and say why: so the thread is in your inbox.",
        ],
      },
      {
        heading: "Making a template sound like you",
        paragraphs: [
          "Change four things and the message becomes yours. The greeting, which should match how you already write to that client. The one added fact, which should come from the actual project rather than a generic claim. The sentence rhythm, which should be the length of sentence you use when you are not trying. And the sign-off, which should be the one you always use, not the one a template suggested.",
          "Then read it out loud. If a sentence makes you wince, it will make the client wince. The most common offender is enthusiasm that has nowhere to go: I would absolutely love to get started on this. Replace it with a fact. The most persuasive line in a follow-up is usually the smallest true one, such as the content migration is the part that delays the launch.",
          "Finally, keep a note of which template produced which reply. After twenty proposals you will know whether your clients respond to a call offer, a date or a question about the budget. That is more useful than any general advice, including this article.",
        ],
      },
      {
        heading: "What not to send",
        paragraphs: [
          "Do not send a message that only says checking in. Do not send a screenshot of the proposal with a question mark. Do not send three channels in one day. Do not forward the client their own email with the words any update? above it. Do not use the phrase per my last email, which is a small act of aggression dressed as professionalism.",
          "And do not send a follow-up on a Sunday night. It signals that you are working when you should not be, it puts the message at the top of a Monday inbox that is being triaged in a hurry, and it makes the reply feel like a chore. Tuesday morning is better than Sunday night, every time.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "Should the follow-up include the proposal again? If the proposal is a link, yes, in one line, because it removes a search. If it is an attachment, no, unless delivery failed; a second PDF makes the thread heavier and suggests the first was lost.",
          "How long should a follow-up be? Under 120 words is a good target. If it needs more than that, it is probably a new proposal rather than a follow-up, and it should be sent as one.",
          "Can I use the same template for every client? Use the same structure. Change the specific sentence. The structure is what makes the message work; the specific sentence is what makes it credible.",
          "What if the client replies with a question instead of a decision? Answer the question in one message and end with the next step. A question is progress, and it should be treated as such rather than as another delay.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "A follow-up is a small, specific, low-cost request. Templates help you keep it small and specific; rewriting them keeps it from sounding like everybody else's. Write five, keep them under 120 words, put a date in each one, and let the last message close the loop rather than reopen the guilt. The clients who reply will reply sooner, and the ones who do not will stop costing you attention.",
        ],
      },
    ],
  },
];
