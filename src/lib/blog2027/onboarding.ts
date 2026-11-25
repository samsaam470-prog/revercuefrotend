import type { BlogPost } from "../blog";

export const ONBOARDING_POST: BlogPost = {
  slug: "client-onboarding-checklist",
  title: "Client onboarding checklist for freelancers: the twelve things to settle in week one",
  excerpt:
    "Most project problems are decided in the first week, before any work starts. Here is the checklist that settles access, approvals, payments, scope and communication while everyone is still being polite.",
  date: "2026-11-25",
  readMinutes: 12,
  links: [
    { label: "Requirement forms in Revercue", to: "/features/requirement-forms" },
    { label: "Questions to ask a new client", to: "/blog/questions-to-ask-a-new-client" },
    { label: "How to run a discovery call", to: "/blog/how-to-run-a-discovery-call" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "The first week of a project is the cheapest week you will ever spend on it. An hour spent confirming who approves the design, where the invoice goes and what the client means by a draft will save days later, when the same questions arrive as a blocked task or a disputed invoice. The problem is that week one is also the week everyone is most eager to start, and the paperwork feels like a delay.",
        "Onboarding is not paperwork. It is the process of converting a yes into a working relationship with known rules. The checklist below is the version that fits freelance work: twelve items, each with a sentence you can send, and none of them requiring a project manager. Run it once and it becomes the template for every client after.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Settle five areas before the first deliverable: the money, the approver, the material, the scope and the channel. Twelve items spread across those five areas covers almost every failure that shows up in week three. If a client cannot answer one of them, that is itself the most useful information you will get all month.",
        "The order matters. Settle the money first, because it is the easiest to postpone and the most expensive to leave open. Then the approver, because it determines how every decision will be made. Then the material and access, which determine whether you can start at all. Then the scope in writing, and finally the channel and rhythm of communication.",
      ],
    },
    {
      heading: "The money",
      paragraphs: [
        "One: the signed agreement and the deposit, before the start date. If the contract is not signed, the project has not started, however enthusiastic the emails are. If the deposit has not cleared, the start date is not reserved. Say it kindly and hold it: the calendar slot is held until both arrive, and after that it goes to the next project.",
        "Two: who approves the invoice, and where it goes. Ask for the name, the email address and any purchase order requirement. In a larger client, the person who approves the work is rarely the person who pays the invoice, and an invoice sent to the wrong inbox is late before it is opened.",
        "Three: the payment schedule and the due date, restated. Even if it is in the contract, repeat it in the kickoff message: 50 percent now, 50 percent on delivery, invoices due within 14 days. Repetition is not distrust; it is how a term becomes a habit on both sides.",
      ],
    },
    {
      heading: "The approver",
      paragraphs: [
        "Four: who signs off each type of decision, and who has final say. One name for the design, one for the copy, one for the budget. If the answer is the whole team, ask who breaks a tie. Projects with collective approval are the ones that stall, and knowing that in week one changes how you schedule feedback.",
        "Five: what the response time will be. Not a promise, an expectation: I will send drafts on Tuesdays and I plan for feedback by Thursday. If the client needs a week, the schedule reflects a week. Written down, this prevents the silent week that turns into a missed deadline you get blamed for.",
        "Six: the escalation route when something goes wrong. Who do you message if the approver is away, and what happens if a decision is needed within 24 hours. A client who cannot answer this is telling you that the project has one point of failure, and that point may go on holiday.",
      ],
    },
    {
      heading: "The material",
      paragraphs: [
        "Seven: access, in a list, with a date. Brand files, the current website, the analytics account, the domain registrar, the ad account, the shared drive. Send the list once and ask for it in one reply rather than five. Every missing access item is a day of waiting disguised as a task.",
        "Eight: the existing material and its state. What exists that can be reused, what must be rewritten, and who owns the rights. A client who assumes their old photography is usable may discover it was licensed to a previous agency, and that discovery usually happens the week before launch.",
        "Nine: the content the client must supply, with a deadline and a consequence. If the copy is coming from them, name the date and say what happens if it slips: the launch moves by the same number of days. The most common cause of a late project is client-supplied content arriving late, and the second most common is nobody saying so in advance.",
      ],
    },
    {
      heading: "The scope",
      paragraphs: [
        "Ten: the scope, the exclusions and the revision rounds, confirmed in writing. Not renegotiated, just acknowledged: this is what we agreed, these are the quantities, this is what happens if something new arrives. One reply that says confirmed is enough, and it prevents the week-six conversation about whether the extra page was included.",
        "Eleven: the definition of done for the first deliverable. What will the client see, in what format, and what are they being asked to judge. A first draft that is judged against an unstated ideal will always fail. A first draft that is judged against three named criteria can be approved.",
      ],
    },
    {
      heading: "The channel and the rhythm",
      paragraphs: [
        "Twelve: where the work lives and how often you speak. One channel for decisions, one place for files, one weekly update. If the client likes WhatsApp for quick questions and email for formal ones, agree that decisions made in WhatsApp get confirmed in the thread. Otherwise the decisions disappear into a chat history nobody searches.",
        "The weekly update is the cheapest habit in the list. Three lines on a Friday: what moved, what is waiting on the client, what happens next week. It takes five minutes, it removes most status meetings, and it creates a record that answers the question where are we without anyone having to ask.",
        "Set the rhythm explicitly in the kickoff message, and then keep it. A rhythm that starts in week one and stops in week three is worse than no rhythm, because the client notices the silence and fills it with worry.",
      ],
    },
    {
      heading: "How to run the checklist without a meeting",
      paragraphs: [
        "Send it as one message with numbered questions and a request for a single reply. Most clients answer twelve numbered questions in ten minutes, and the answers become a document you can refer to. A meeting to collect the same information costs an hour and produces no record unless you write one.",
        "If you use a requirement form, put the operational questions in it: the approver, the invoice address, the access list, the content owner, the deadline. A form is better than an email for this because the answers arrive structured, and structured answers are easier to check against the scope. Keep the relationship questions for the call, and the operational ones for the form.",
        "Then store the answers where you will look for them. The invoice address should be on the client record, not in the third email of the thread. The access list should be somewhere you can check off, not in your head. Onboarding only works if its output is findable in week six.",
      ],
    },
    {
      heading: "What good onboarding prevents",
      paragraphs: [
        "It prevents the invoice that goes to the wrong inbox. It prevents the design approved by someone who turns out not to have authority. It prevents the launch that slips because the copy arrived late and nobody agreed what would happen. It prevents the argument about whether the extra page was included. And it prevents the quiet resentment that builds when a freelancer carries risks that were never discussed.",
        "It also improves the client's experience, which is the part freelancers underestimate. A client who is asked twelve clear questions in week one concludes that they have hired someone organised. That impression buys patience in week four, when something genuinely goes wrong. Onboarding is not only protection; it is the first piece of work the client sees.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "How long should onboarding take? An hour of your time and one reply from the client. If it takes longer, the client is either very large or not ready, and both are worth knowing before you start.",
        "Should onboarding be a call or a form? The operational items work better as a form or a numbered email. The relationship items, such as what success looks like and what has gone wrong before, work better in a conversation.",
        "What if the client refuses to answer the money questions? That is a signal. A client who will not name an approver or an invoice address is likely to be slow to pay, and you can price or stage the work accordingly.",
        "Do I need this for a small project? A shortened version, yes. Even a two-day job needs a defined deliverable, a due date and an invoice address. The list shrinks; the principle does not.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Onboarding is twelve questions and one reply. Settle the money, the approver, the material, the scope and the channel in week one, write the answers down, and hold the start date until the contract and the deposit arrive. The clients who answer well become easy projects. The ones who cannot answer at all have just saved you a quarter of your year.",
      ],
    },
  ],
};
