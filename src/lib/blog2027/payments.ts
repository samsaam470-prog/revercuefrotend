import type { BlogPost } from "../blog";

// Cluster B — deposits, payment terms and late payment.
// General information only: the articles say so, cite where the convention
// comes from, and send legal questions to a qualified adviser.

export const PAYMENT_POSTS: BlogPost[] = [
  {
    slug: "how-much-deposit-should-a-freelancer-ask-for",
    title: "How much deposit should a freelancer ask for?",
    excerpt:
      "There is no universal percentage, but there is a shape that fits: 25 to 50 percent is the common range, and the right number is the one that stops you carrying more than one unpaid stage. Here is how to choose it and how to ask without losing the work.",
    date: "2026-11-25",
    readMinutes: 12,
    links: [
      { label: "Invoices in Revercue", to: "/features/invoices" },
      { label: "Freelance payment terms", to: "/blog/freelance-payment-terms" },
      { label: "What to do when a client does not pay", to: "/blog/when-a-client-does-not-pay-an-invoice" },
      { label: "Pricing and plans", to: "/pricing" },
    ],
    body: [
      {
        paragraphs: [
          "The question sounds like it has a correct answer, and the internet does not help: one article says fifty percent, another says a third, a third says deposits are a sign of distrust and you should simply invoice on delivery. All of them are describing a convention, not a rule. There is no law that sets a freelance deposit, and no professional body that will audit yours.",
          "What there is, is a principle that turns the convention into a decision you can defend: at any point in the project, the amount you are owed for work already done should be small enough that losing it would annoy you rather than damage you. The percentage is whatever achieves that for your project size, your client type and your cash flow. This article walks through how to find that number, and how to ask for it in a way that does not read as suspicion.",
          "This is general information, not legal or financial advice. Deposit rules, consumer protection and late-payment law differ by country and by whether your client is a business or a consumer, so check the position where you work.",
        ],
      },
      {
        heading: "The short answer",
        paragraphs: [
          "For fixed-fee project work, 25 to 50 percent up front is the commonly reported range, with the balance on delivery or split across milestones. Smaller projects tend to sit at the top of that range, larger ones at the bottom, because a large deposit is harder for a client to approve and easier to replace with milestones.",
          "A workable default set, adapted from what several freelance finance guides recommend, looks like this: under about 1,000, ask for the full amount or 50 percent; between 1,000 and 5,000, ask for 50 percent; between 5,000 and 20,000, ask for a third up front with the rest on milestones; above 20,000, ask for 20 to 30 percent but break the remainder into frequent stages. For ongoing work, bill monthly in advance, which makes the first month the deposit.",
          "The numbers are a starting point. The rule behind them is the one to keep: never be more than one stage ahead of payment.",
        ],
      },
      {
        heading: "Why a deposit is not about trust",
        paragraphs: [
          "Freelancers often resist asking for a deposit because it feels like an accusation. It is not. A deposit is a scheduling commitment. When you reserve three weeks for one client, you turn down other work for those weeks, and the deposit is what makes that reservation real for both sides. A client who pays a deposit has bought a place in your calendar, which is exactly what they asked for.",
          "Seen that way, the deposit also improves the work. Projects that start with money committed tend to produce faster approvals, because the person who approved the budget is already engaged. Projects that start on a promise tend to produce the opposite: the scope drifts while the client decides how serious they are, and the freelancer absorbs the cost of that indecision.",
          "The trust argument cuts both ways, too. A client who refuses any upfront payment for a project that requires you to begin work is asking you to carry all the risk. That is a legitimate business preference for them, and it is a legitimate reason for you to decline, or to restructure the work into something smaller that you can deliver before being paid.",
        ],
      },
      {
        heading: "The rule that matters more than the percentage",
        paragraphs: [
          "Imagine the project has four stages and the client stops paying after stage two. How much work have you done that you have not been paid for? If the answer is three weeks, the payment structure is wrong, whatever the deposit percentage is. If the answer is a few days, the structure is working.",
          "This is why milestones matter more than the headline number. A 20 percent deposit on a 30,000 project sounds cautious until you realise the first milestone is 40 percent of the work. A 30 percent deposit on a 6,000 project sounds aggressive until you see that the client pays the rest at two clearly defined points and never carries more than a week of your time.",
          "The practical test is to draw the project as a timeline and mark where money changes hands. If any stretch between two payments is longer than two or three weeks of your work, add a stage. That is the whole method, and it works at every size.",
        ],
      },
      {
        heading: "Choosing a number for your situation",
        paragraphs: [
          "New client, no history: lean towards the higher end of the range. The deposit is your only evidence that the client will pay the balance, and it costs nothing to be cautious with someone you have not worked with. Existing client with a clean payment record: a smaller deposit is reasonable, because the history is the security.",
          "Large organisation: the finance department may have rules that make a 50 percent deposit difficult, not because the company is unwilling but because procurement does not work that way. In that case, keep the deposit modest and add more milestones, or ask for the first invoice to be raised on signature with payment due before the kickoff call.",
          "Cash-flow pressure: if you need the money to start, say so and price accordingly. A deposit that covers your actual upfront costs, such as stock photography, software or a subcontractor, is easy to justify in a sentence: the deposit covers the costs I incur before the first draft.",
          "Long projects: the deposit is less important than the rhythm. Monthly billing in advance is usually better for both sides than a large upfront sum, because the client pays for work as it is scheduled and you are never financing a quarter of your own time.",
        ],
      },
      {
        heading: "How to ask without making it awkward",
        paragraphs: [
          "Put the deposit in the proposal, not in a separate message. A payment schedule on the same page as the price is a term of the offer, not a request. The sentence can be as plain as: 50 percent on acceptance to reserve the dates, 50 percent on delivery before the final files are handed over. Nobody has to negotiate it, because it is part of what they are buying.",
          "If the client pushes back, do not defend the percentage; ask what would work. A client who says 50 percent is impossible may be perfectly comfortable with 30 percent now and 30 percent at the midpoint. A client who says no to any upfront payment is telling you something about how they value the commitment, and you can respond with a smaller first piece of work rather than a discount.",
          "Never call it a deposit if it is really the first instalment of a fee and you intend to refund it on cancellation. Decide in advance whether it is refundable, and say so. A common position is that the deposit becomes non-refundable once work begins, because at that point it is paying for time you have already spent. Whatever you choose, write it in the contract, not in the email thread.",
        ],
      },
      {
        heading: "What the deposit does not fix",
        paragraphs: [
          "A deposit does not protect you from a client who disappears halfway through a project that is bigger than the deposit. It does not protect you from scope creep, which is a contract problem. And it does not replace a written agreement, because the deposit is only enforceable if the terms around it are clear.",
          "It also does not solve a qualification problem. If you are regularly taking deposits from clients who then stall, the issue is not the size of the deposit; it is that you are selling to people who cannot approve the spend. Raising the deposit to 70 percent will simply reduce the number of clients who say yes, which may be the right outcome, but it will not make the wrong ones right.",
          "The honest summary is that a deposit is one of four protections, alongside a written scope, staged delivery and a payment term you actually enforce. Used alone it creates a false sense of security, which is worse than no deposit at all.",
        ],
      },
      {
        heading: "What to put in writing",
        paragraphs: [
          "Five facts belong in the agreement, whatever the percentage. The amount of the deposit and when it is due. Whether it is refundable, and from what point. What triggers the next payment, in terms of a deliverable rather than a date. The number of days the client has to pay each invoice. And what happens if a payment is late, including whether you can pause work.",
          "That last one is the clause most freelancers leave out, and it is the one that matters when something goes wrong. You do not need an aggressive clause; you need a clear one: if an invoice is more than fourteen days overdue, work pauses until it is paid, and the schedule moves accordingly. That sentence turns a difficult conversation into an automatic consequence, which is much easier to enforce than a decision you have to make while angry.",
          "Then keep the record. The deposit, the date it arrived and the invoice it was applied to should live on the client record, not in your memory or a bank statement. When a client disputes what they owe six months later, the record is the argument.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "Is a 50 percent deposit too much to ask? No. It is at the top of the common range and entirely normal for small and mid-sized projects. Explain what it covers and offer milestones if the client needs a lower entry point.",
          "Should the deposit be a percentage or a fixed amount? A percentage is easier to explain and scales with the project. A fixed amount is useful when the early work is identical regardless of project size, for example a discovery phase.",
          "What if the client cancels after paying the deposit? That depends on what the agreement says. If the deposit becomes non-refundable once work begins, say so in the contract and keep a record of the work done. If it is refundable, say under what conditions.",
          "Do I need a deposit for a retainer? Not in the same way. Bill the first month in advance, and the first payment functions as the commitment. For a long retainer, a notice period matters more than a deposit.",
          "Can I ask for the full amount up front? For small projects, yes, and many freelancers do. For larger ones, a client may reasonably refuse, and staged payments are usually better for both sides.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Pick a percentage inside the common range, then check it against the rule that actually protects you: at no point should you be carrying more than one unpaid stage. Put the schedule in the proposal, make the refund position explicit in the contract, and add a pause clause so a late payment has a consequence that does not depend on your mood. The number is a convention. The structure is the protection.",
        ],
      },
    ],
  },
  {
    slug: "freelance-payment-terms",
    title: "Freelance payment terms: how to write them so clients pay on time",
    excerpt:
      "Payment terms are not a formality at the bottom of an invoice. They decide when money arrives. Here is what to state, which defaults work, and the clauses that turn a late payment into a solvable problem.",
    date: "2026-11-25",
    readMinutes: 13,
    links: [
      { label: "Invoices in Revercue", to: "/features/invoices" },
      { label: "Contracts in Revercue", to: "/features/contracts" },
      { label: "How much deposit to ask for", to: "/blog/how-much-deposit-should-a-freelancer-ask-for" },
      { label: "Pricing and plans", to: "/pricing" },
    ],
    body: [
      {
        paragraphs: [
          "Most payment problems are set up weeks before the invoice is sent. The client was never told when payment was due, the invoice arrived without a number, the person who approves it was on holiday, and the terms in the contract did not match the terms on the invoice. By the time the money is late, the freelancer is negotiating from a weaker position than they would have been in if one paragraph had been written properly at the start.",
          "Payment terms are that paragraph. They are the written rules for how and when you are paid: the fee, the deposit, the instalments, the due date, the accepted methods, the currency, and what happens if the date passes. They belong in the agreement and on the invoice, and they should say the same thing in both places.",
          "This is general information rather than legal advice. Late-payment law, statutory interest and consumer rules vary by country, so confirm the position where you and your client are based before relying on any clause.",
        ],
      },
      {
        heading: "The short answer",
        paragraphs: [
          "State four things and most of the ambiguity disappears: the amount, the date it is due counted from the invoice date, the method of payment, and the consequence of missing the date. Choose a short term for small clients and accept a longer one only when the client is large enough to justify it. Then make the invoice match the contract word for word.",
          "A sensible default is net 14 for small and mid-sized clients, net 30 for larger organisations that require it, a deposit before work starts, and a pause clause if an invoice goes more than two weeks past due. Every extra day you grant is an interest-free loan, and the terms are the only place you get to decide the length of that loan.",
        ],
      },
      {
        heading: "What the abbreviations mean",
        paragraphs: [
          "Net 30 means the invoice is due 30 days after the invoice date. Net 15 means 15 days. Due on receipt means immediately, which in practice means the next payment run. 2/10 net 30 is an early-payment discount: two percent off if paid within ten days, otherwise the full amount at thirty.",
          "In the UK, the statutory default for business-to-business invoices is 30 days, and there is a statutory right to charge interest on late commercial payments, currently set at 8 percent above the Bank of England base rate, plus fixed compensation that scales with the invoice value. That right exists whether or not your contract mentions it, but you still have to invoke it, and invoking it is easier when your terms already pointed at it.",
          "None of these are universal. If your client is a consumer rather than a business, different rules apply, and in some jurisdictions a consumer has stronger protections than a business does. When the amounts are significant, ask an accountant or a solicitor in your jurisdiction rather than trusting a blog, including this one.",
        ],
      },
      {
        heading: "The four terms that do the work",
        paragraphs: [
          "The due date, stated as a number of days from the invoice date rather than a calendar date. Calendar dates drift when an invoice is reissued, and a term that says due on the 30th of the month creates arguments about which month. Fifteen days from the invoice date is unambiguous.",
          "The trigger for the clock. This is where vague contracts fail. If the invoice is due on satisfactory completion, the client controls when the clock starts, and the clock may never start. Tie the invoice to a deliverable you control, such as delivery of the final files or the end of a milestone, not to a feeling.",
          "The payment method and who pays the fees. Name the account, the currency and who absorbs transfer costs, especially for international clients. A three percent currency spread on a large invoice is real money, and if it is not agreed it comes out of your side.",
          "The consequence. A term without a consequence is a suggestion. The consequence can be modest: work pauses, future deliverables are withheld, or an agreed late fee applies from the day after the due date. What matters is that it was agreed before the invoice, and that you actually apply it.",
        ],
      },
      {
        heading: "Writing the clause",
        paragraphs: [
          "It does not need to be long. A clause that reads clearly is better than one that sounds legal. Something like: the fee is payable 50 percent on acceptance and 50 percent on delivery of the final files. Invoices are due within 14 days of the invoice date. If an invoice is more than 14 days overdue, work on all projects may be paused until it is paid, and the schedule will move by at least the length of the delay. Payment is by bank transfer to the account on the invoice, in the currency stated.",
          "Notice what that clause does. It sets two stages, a due date, a pause right and a method. It does not threaten, and it does not require a lawyer to understand. A client reading it knows exactly what they are agreeing to, which is the point: ambiguity is the friend of the client who pays late.",
          "If you want a late fee, add it explicitly and keep it defensible: an agreed monthly percentage on the outstanding balance, or the statutory rate if that is higher, with a grace period if you want to be generous. A late fee that was never agreed is very difficult to add after the fact, and inventing one during a dispute damages your position rather than strengthening it.",
        ],
      },
      {
        heading: "Making the invoice say the same thing",
        paragraphs: [
          "The invoice is where terms are tested. If the contract says net 14 and the invoice says due on receipt, the client will follow whichever is easier. Put the due date on the invoice as a date and as the term: due within 14 days, by 9 December. Put the invoice number, the PO number if the client uses one, your tax details and the exact amount including any tax.",
          "Send it to the right address. In larger companies the person who approves the work is not the person who pays the invoice, and an invoice sent to the wrong inbox is late before it is received. Ask during onboarding: who approves this, where does the invoice go, and is there a purchase order process. Those three questions prevent more late payments than any clause.",
          "Then invoice promptly. The day you deliver is the day to invoice, not the end of the month. Every day between delivery and invoice is a day the client forgets what the invoice is for, and a day added to the payment cycle. If you cannot invoice immediately, note the date you delivered on the invoice so the client can match it.",
        ],
      },
      {
        heading: "Choosing net 14 or net 30",
        paragraphs: [
          "Net 14 is better for your cash flow, and it is easy to justify for small and mid-sized clients who pay their own bills. Net 30 is often a requirement of larger organisations, whose payment runs are monthly and whose procurement rules are not going to change for a freelancer. Accepting net 30 from a client worth the wait is reasonable; accepting it from a small client who simply prefers it is a gift you did not agree to give.",
          "A useful compromise is to price for the difference. If a client needs 60 days, that is a financing cost, and it is legitimate to reflect it in the fee or to ask for a larger deposit. What is not legitimate is agreeing to a long term and then being surprised by the cash-flow gap, because the gap was visible in the clause.",
          "For ongoing work, the cleanest term is monthly in advance. You invoice on the first for the month ahead, and the client pays before the work is delivered. That is normal for retainers, it removes the arrears problem entirely, and it makes the first month function as a deposit without anyone calling it one.",
        ],
      },
      {
        heading: "The onboarding questions that prevent late payment",
        paragraphs: [
          "Ask them before the contract is signed, and write the answers down on the client record. Who signs the contract? Who approves the invoice? Who processes payment, and in which system? Is there a purchase order number, and does the invoice need to reference it? What is the standard payment run, and does the date of receipt change which run you land in?",
          "Those questions do two things. They give you the information you need, and they signal that you run your business with a process. Clients pay process-driven suppliers faster, not because they respect them more but because the invoice arrives in the form their system expects.",
          "The answers also belong in the client record, not in an email you will search for in three months. When the invoice is late, the first question is usually whether it reached the right person, and the record should answer it without a search.",
        ],
      },
      {
        heading: "What to avoid",
        paragraphs: [
          "Avoid payment tied to client approval, satisfaction or acceptance of work you cannot define. Those words sound reasonable and they hand the clock to the client. If approval is required, define what approval means and what happens if no response arrives within a stated number of days.",
          "Avoid unlimited revisions in the same clause as payment. A contract that promises endless changes and payment on approval is a contract where the work never ends and the invoice never triggers. Put a revision limit in the scope and a deemed-acceptance period in the terms.",
          "Avoid accepting a term you cannot enforce. If you are not prepared to pause work or chase an overdue invoice, agreeing to a consequence you will not apply is worse than agreeing to none, because it teaches the client that your terms are decorative.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "Is net 30 standard for freelancers? It is common, especially with larger clients, but it is not required. Net 14 is a better default for small clients, and many freelancers use net 7 or due on receipt for small amounts.",
          "Should payment terms be in the contract or on the invoice? Both. The contract sets the terms, and the invoice restates them. If they disagree, the client will follow the one that suits them.",
          "Can I charge interest on a late invoice? In many jurisdictions, yes, either under statute or under a clause you agreed in advance. The rules differ, and the amount must be defensible, so check the position where you work.",
          "What if the client's procurement system cannot pay in 14 days? Accept a longer term for that client if the work is worth it, and price or stage the work accordingly. A large client with a slow payment run is a financing decision, not a moral one.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Payment terms are a design decision, not a formality. State the amount, the trigger, the due date counted from the invoice, the method and the consequence, and make the invoice repeat them. Then ask the three onboarding questions that decide whether the invoice reaches the right desk. A clear paragraph at the start is worth more than any amount of chasing at the end.",
        ],
      },
    ],
  },
  {
    slug: "when-a-client-does-not-pay-an-invoice",
    title: "What to do when a client does not pay an invoice",
    excerpt:
      "A late invoice is a process problem before it is a legal one. Here is a calm sequence from day one to day sixty, the wording for each step, and the point at which you stop working and start escalating.",
    date: "2026-11-25",
    readMinutes: 12,
    links: [
      { label: "Invoices in Revercue", to: "/features/invoices" },
      { label: "Freelance payment terms", to: "/blog/freelance-payment-terms" },
      { label: "How much deposit to ask for", to: "/blog/how-much-deposit-should-a-freelancer-ask-for" },
      { label: "Pricing and plans", to: "/pricing" },
    ],
    body: [
      {
        paragraphs: [
          "An unpaid invoice produces two reactions at once: the practical question of how to get the money, and the emotional question of what it means. The emotional question is usually louder, and it is usually wrong. Most late payments are administrative. The invoice went to the wrong inbox, the approver changed role, the purchase order number was missing, or the client's payment run is monthly and yours arrived the day after it.",
          "That does not make the delay acceptable, and it does not mean you should wait quietly. It means the first response should be a process response rather than a confrontation, because a process response recovers more money than an angry one. This guide sets out a sequence from the day after the due date to the point where you escalate, with wording for each step.",
          "This is general information, not legal advice. The options available to you, the interest you can charge and the deadlines that apply depend on your jurisdiction and on what your contract says, so take advice before starting any formal claim.",
        ],
      },
      {
        heading: "The short answer",
        paragraphs: [
          "Chase in writing, in one thread, on a schedule, and escalate one step at a time. The day after the due date, a friendly reminder that assumes an oversight. A week later, a firm reminder with the amount, the original due date and a new date. Two weeks after that, a final notice that states exactly what you will do next. Then do it.",
          "At the same time, apply the contract. If the terms allow you to pause work, pause it, and say so in the same message. If they allow a late fee, apply it once and tell the client. The point of the sequence is that the client always knows what happens next, which is what separates a professional follow-up from a series of increasingly irritated emails.",
        ],
      },
      {
        heading: "Day one: check before you chase",
        paragraphs: [
          "Before you send anything, confirm four things. That the invoice was sent to the address the client specified. That it contains every reference their system needs, including a purchase order number if one was requested. That the amount and the bank details are correct. And that nothing in the thread suggests the client disputed the work.",
          "A surprising share of late invoices fail one of those checks. A missing PO number can hold an invoice for weeks in a large organisation, and the client may not think to tell you. A wrong digit in an account number produces a payment that bounces back silently. Fixing the invoice before you chase is not weakness; it is the fastest route to being paid.",
          "If the invoice needs reissuing, reissue it and say so in one line, with the new invoice number and the due date restated. Do not apologise at length, and do not restart the clock without saying that you are doing so.",
        ],
      },
      {
        heading: "Day one to three: the reminder that assumes an oversight",
        paragraphs: [
          "Subject: Invoice 1042 — due yesterday",
          "Hi Sam. Invoice 1042 for 2,400 was due yesterday. I am assuming it is in the queue, but I wanted to flag it in case it needs a purchase order number or a different address. If it has already been scheduled, ignore this and thank you. If not, could you confirm the date it will be paid?",
          "Why this works: it states the facts without accusing anyone, it offers the two most common administrative explanations, and it asks for a date rather than a payment. A date is a small commitment that is easy to give, and it tells you whether the client is in control of the process. If the answer is it is with finance, you have learned something useful. If the answer is silence, you have learned something more useful.",
        ],
      },
      {
        heading: "Day seven to ten: the firm reminder",
        paragraphs: [
          "Subject: Invoice 1042 — now 10 days overdue",
          "Hi Sam. Invoice 1042 for 2,400 was due on 9 November and is now 10 days overdue. I have attached it again and copied the bank details below. Could you confirm today whether it has been approved, and if not, who I should speak to about it? I would like to resolve this without pausing the December work, which is what our terms allow if an invoice is more than 14 days late.",
          "Why this works: it adds a specific consequence without threatening, and it gives the client a person to point you towards. The mention of the pause clause is not aggression; it is the clause doing its job. If the client is embarrassed, this message gives them a way to fix it quietly. If the client is avoiding you, this message tells them you are keeping a record.",
          "Keep every message in one thread with the invoice attached. If you also telephone, follow up with an email summarising what was agreed. The written record is what you will rely on later if the invoice becomes a dispute.",
        ],
      },
      {
        heading: "Day twenty-one to thirty: the final notice",
        paragraphs: [
          "Subject: Final notice — invoice 1042",
          "Hi Sam. Invoice 1042 for 2,400 was due on 9 November. It is now 21 days overdue and I have not received a payment date. As set out in our agreement, work on the December milestones is paused from today, and the schedule will move by at least the length of the delay. If the invoice is paid by 6 December I will restart immediately. If it is not, I will apply the late-payment terms in our agreement and consider the options available to recover the debt.",
          "Why this works: it is specific about the amount, the date and the consequence, and it names a date by which the situation can still be resolved cheaply. It does not insult the client, which matters if you want the relationship afterwards. It does state plainly that there is a next step, which is the part most freelancers leave out and then resent having to say later.",
          "Then pause the work. A consequence you do not apply is a bluff, and clients who pay late are often the clients who test whether a bluff is real. Pausing is also the protection you built into the contract, so use it rather than absorbing the cost of continuing.",
        ],
      },
      {
        heading: "Day thirty to sixty: escalation options",
        paragraphs: [
          "If the invoice is still unpaid, the options depend on where you are and how much is owed. A formal letter before action, a statutory demand in some jurisdictions, a small-claims process, a debt collection agency, or a solicitor's letter are the common routes. Each has costs, timelines and risks, and the amount owed should decide how far you go. A 300 invoice rarely justifies a solicitor; a 12,000 invoice usually does.",
          "Before any of those, send one letter that sets out the facts in a form a court or an agency could use: the contract, the invoice, the delivery, the reminders, the amount, and the date by which you expect payment. That letter is often enough on its own, because it shows the client that the file is complete. It also becomes the basis for whatever you do next.",
          "If you are in the UK and the client is a business, the statutory late-payment regime gives you a right to interest and fixed compensation on commercial debts, and there are free routes to a county court judgment for smaller amounts. If you are elsewhere, the equivalent exists in most jurisdictions but the thresholds and processes differ. This is exactly the point at which a single hour with an accountant or solicitor is worth the fee.",
        ],
      },
      {
        heading: "Protecting the relationship, or deciding not to",
        paragraphs: [
          "Some late-paying clients are worth keeping. They pay eventually, the work is good, and the delay is a feature of their industry rather than a sign of contempt. With those clients, the right response is to change the terms rather than the relationship: bill more often, take a larger deposit, or move to monthly payments in advance.",
          "Other clients are not worth keeping. A client who has to be chased past thirty days, who never gives a date, and who goes silent when asked a direct question is telling you what the next project will be like. Ending the relationship is a legitimate business decision, and it is cheaper than another three months of the same.",
          "The middle case is the client who is embarrassed and disorganised. Those clients often become excellent ones after a clear conversation about process, because they did not know what your process needed. That conversation is much easier to have when you can point to a written term rather than a feeling.",
        ],
      },
      {
        heading: "Preventing the next one",
        paragraphs: [
          "Invoice the day you deliver. Send to the address the client specified, with the reference their system needs. State the due date on the invoice as a date and as a term. Agree a pause clause in the contract. Keep a record of who approves and who pays. And follow up on day one rather than day thirty, because the earlier a late invoice is raised, the more likely it is an oversight rather than a policy.",
          "The record matters more than people expect. If the proposal, the contract, the form answers, the invoice and the reminders all sit in one thread for that client, then a payment problem is a single page of evidence rather than an afternoon of searching. That is the practical value of keeping client work connected, and it is the difference between a freelancer who can escalate confidently and one who cannot find the email.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "How long should I wait before chasing? Not at all. Follow up the day after the due date with a message that assumes an oversight. Waiting a week signals that your due date is approximate.",
          "Should I stop working when an invoice is late? If your contract allows it, yes, once the invoice is meaningfully overdue. Continuing to work for a client who is not paying converts a payment problem into a bigger payment problem.",
          "Can I add a late fee after the invoice is overdue? Only if it was agreed before, in the contract or in the terms on the invoice. Inventing a fee during a dispute weakens your position.",
          "Is it worth using a debt collector? For a large invoice from a client who has stopped responding, sometimes. For a small one, the cost and the time usually exceed the recovery, and a formal letter plus a small-claims process is often faster.",
          "What if the client says the work was not delivered? Go back to the record. The delivery date, the files, the messages and the contract scope should answer it. This is why the thread matters more than the invoice alone.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "A late invoice is best handled as a sequence rather than an event. Check the invoice, remind, state the consequence, apply it, and escalate in writing if nothing changes. Keep every message in one thread and every fact on one record. Most late payments resolve at step two. The ones that do not were never really about the invoice.",
        ],
      },
    ],
  },
];
