import type { BlogPost } from "../blog";

// Cluster B, article two: the clause-level detail. Keep the caveat that this is
// general information, not legal advice.

export const PAYMENT_TERMS_POST: BlogPost = {
  slug: "freelance-payment-terms",
  title: "Freelance payment terms: how to write them so clients pay on time",
  excerpt:
    "Net 30 is a default, not a strategy. Here is what the abbreviations mean, the four terms that actually change behaviour, and the clause to put in front of a client who says they always pay late.",
  date: "2026-11-25",
  readMinutes: 8,
  links: [
    { label: "Invoices in Revercue", to: "/features/invoices" },
    { label: "Contracts in Revercue", to: "/features/contracts" },
    { label: "How much deposit to ask for", to: "/blog/how-much-deposit-should-a-freelancer-ask-for" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "Most freelance payment terms are inherited rather than chosen. A template says net 30, the client's finance team says net 30, and nobody asks whether 30 days is a reasonable amount of time to wait for money you have already earned. Then the invoice arrives late, the follow-up starts, and the terms turn out to have been a wish rather than a rule.",
        "Good terms are short, specific and boring. They say when the invoice is issued, when it is due, what happens if it is not paid, and what you will do about it. Four sentences can carry all of that, and they will do more for your cash flow than any reminder email.",
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        "Choose the shortest term your client's finance team will actually process, state it in days rather than as an abbreviation, and attach a consequence to missing it. Net 14 is better than net 30 for a small business, because smaller businesses pay faster and 30 days is a habit rather than a rule. If the client insists on 30 or 60 days, price the wait or ask for a deposit that covers it.",
      ],
    },
    {
      heading: "What the abbreviations mean",
      paragraphs: [
        "Net 30 means the full amount is due 30 days after the invoice date, with no discount. Due on receipt means immediately. 2/10 net 30 means a 2 percent discount if paid within 10 days, otherwise the full amount in 30; it is a real incentive for large invoices and rarely worth it for small ones. End of month terms, sometimes written EOM, mean the clock starts at the end of the month of invoicing, which can add another 30 days. If a client's purchase order says EOM, your 30 days is really 45 to 60.",
        "Two more worth knowing: net 7, which is short enough to signal that you are a small supplier with real costs, and a payment run, which is not a term at all but the date on which a finance department pays everything it owes. Knowing the payment run is often more useful than negotiating the term, because it tells you when the money will actually move.",
      ],
    },
    {
      heading: "The four terms that do the work",
      paragraphs: [
        "The due date, stated in days from the invoice date and repeated on the invoice itself. The late fee, a fixed amount or a percentage, applied automatically after a stated grace period. Interest on overdue balances, which in many jurisdictions commercial clients are liable for even without a clause, though the detail varies by country. And suspension: the right to pause work if an invoice is unpaid, which is the term that changes behaviour fastest because it has an immediate cost the client can feel.",
        "Two of those four are usually enough. A due date with no consequence is a suggestion, but a due date plus suspension is a rule. Pick the consequence you will actually apply, because a term you never enforce teaches the client that none of them are real.",
      ],
    },
    {
      heading: "Writing the clause",
      paragraphs: [
        "Invoices are issued on the first working day of the month and are payable within 14 days. Work on the next milestone begins once the previous invoice is settled. Balances more than seven days overdue carry a late fee of 2 percent per month and may result in work being paused. That is the whole clause, and it is enough for most projects.",
        "Notice what it does not do. It does not threaten, it does not moralise, and it does not depend on the client remembering anything. Each sentence is a fact about how you work, written before the first invoice exists, which is the only time it is easy to agree to.",
      ],
    },
    {
      heading: "Making the invoice say the same thing",
      paragraphs: [
        "Terms that live only in the contract get forgotten. Put the due date on the invoice as a date, not a term: due 9 December, rather than net 14. Include the bank details, a reference the client's finance team can match, and a single line about who to contact if something is wrong. An invoice that requires an email to be understood will sit in a queue while someone composes that email.",
        "If you use software, set the terms once in the template and let every invoice inherit them, and turn on automatic reminders at seven days before and after the due date. Reminders that are part of the system do not feel personal, which is exactly why they work.",
      ],
    },
    {
      heading: "Choosing net 14 or net 30",
      paragraphs: [
        "For small businesses and individuals, net 14 is usually fine and often paid in a week. For larger organisations, finance runs on payment cycles and net 30 or net 45 is the honest answer; asking for 14 will not make them pay in 14, it will just make the invoice overdue on paper sooner. The useful move there is to ask when their payment run is and date the invoice so it lands before it.",
        "If the client needs 60 days and you cannot carry it, say so and price it: a deposit that covers the first month, or a small percentage for extended terms. That is not aggressive; it is the same thing every supplier does.",
      ],
    },
    {
      heading: "The first time an invoice is late",
      paragraphs: [
        "The first late invoice sets the pattern for the account, which is why it deserves attention even when the amount is small. The escalation has four steps, each a day or two apart. Day one after the due date: a short, warm message confirming the invoice details and asking whether anything is needed. Day four: the same message with the due date restated and a named person copied.",
        "Day eight: a message that names the consequence in the terms, calmly: the invoice is now a week overdue, and per our terms I will need to pause the next milestone until it clears, which moves the date by the same number of days. Day fourteen: pause, and say so in writing. If the work stops without a message, the client remembers a silent freelancer; if it stops after three clear messages, the client remembers a process.",
        "Almost every late payment is resolved before the third step, and the ones that are not are the accounts you want to know about early. What you must not do is send the final warning first, or absorb three late invoices and then become suddenly strict, because that change reads as a crisis rather than a rule.",
      ],
    },
    {
      heading: "When their purchase order overrides your terms",
      paragraphs: [
        "A purchase order often carries its own terms, and it may say 60 days, or payment on completion, or payment after their own client pays. Read it before you sign or accept it, and if it conflicts with your terms say which one applies. Silence is treated as acceptance.",
        "Where their terms are fixed and the amount is modest, the practical answer is usually to date the invoice early in their cycle and to keep the exposure small with milestones. Where the amount is large, ask for a deposit or a shorter first phase, and get the payment route agreed in writing before the work begins.",
        "This article is general information, not legal advice. Late payment law differs by country and by whether the client is a business or a consumer, so if an amount is large enough to hurt, have a professional read the terms once rather than relying on a template.",
      ],
    },
    {
      heading: "Terms for retainers and small jobs",
      paragraphs: [
        "A retainer is paid in advance for the month, on a fixed date, and the work happens inside it. Say what happens if the month is not paid by that date: the retainer pauses, the hours do not roll over, and the slot is released after a stated grace period. Retainers fail when the payment date is vague, because the whole product is availability and availability has a calendar.",
        "Small jobs are the opposite problem: the paperwork costs more than the terms are worth. For anything under a few hundred, invoice on delivery with a seven-day term, and skip the late fee. The goal there is speed, not enforcement.",
      ],
    },
    {
      heading: "What to avoid",
      paragraphs: [
        "Avoid terms that depend on approval you cannot see, such as payable on client sign-off, because sign-off can be postponed forever. Avoid discounts offered after the fact to get paid, which train the client to be late. Avoid clauses copied from another country's template without checking them, and avoid any sentence you would not be willing to enforce on the day it matters.",
        "Avoid, too, the habit of invoicing late. If the terms say invoices go out on the first working day, then a project delivered on the 20th still gets invoiced on the first, for the work completed. A freelancer who invoices when the work is finished has quietly extended their own payment terms by however long the work took.",
      ],
    },
    {
      heading: "A checklist before you accept a purchase order",
      paragraphs: [
        "Read the purchase order before the work, not after. Check the amount matches your quote including tax, the payment term, whether it requires a signed contract as well, and whether it mentions pay-when-paid or payment on client acceptance. Those four items are where the surprises live.",
        "Check the entity too: a purchase order from a parent company with an invoice addressed to a subsidiary is a quiet way to delay payment while everyone works out who owes what. If the names differ, ask which entity is contracting and invoice that one.",
        "Finally, check the reference number and put it on the invoice exactly as written, including spaces and punctuation. Finance systems match on references, and a reference that is nearly right is a payment that sits in a suspense account until someone calls you about it.",
      ],
    },
    {
      heading: "When a client asks for 90 days",
      paragraphs: [
        "Say yes to the relationship and no to the risk, separately. The relationship answer is that you are happy to work with their process. The risk answer is that 90 days means you finance three months of work, so the schedule changes: a larger deposit, monthly milestones, or a small percentage for extended terms.",
        "Most clients asking for 90 days have never been told what it costs a small supplier, and the conversation is usually short and reasonable. The ones who refuse every adjustment are telling you something worth hearing before you start, which is cheaper to learn now than in the third month.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "Is net 30 legally required? No, it is a convention. Many jurisdictions set a default or a maximum for commercial payments, and some allow interest on late payment by law, but the specifics vary. This is general information, not legal advice.",
        "Should I charge a late fee? Yes, if you will apply it. A fee you waive every time is worse than no fee, because it tells the client the terms are decorative.",
        "Can I pause work over one late invoice? If your terms say so, yes, and a short message is better than a silent stoppage: the invoice is nine days overdue, so I am pausing until it clears, and here is what that does to the dates.",
        "Should I ask for a deposit as well as terms? Yes, for project work. Terms govern the balance; the deposit limits how much of the balance exists before you are paid anything.",
        "What if the client pays late but always pays? Then they are a good client with a cash-flow cost, and the answer is a price or a schedule that reflects it, not a fight every month.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "Write four sentences before the project starts: when invoices go out, when they are due, what happens when they are late, and what you will pause. Print the due date on every invoice. Then enforce the clause once, early, and the rest of the project gets easier.",
      ],
    },
  ],
};
