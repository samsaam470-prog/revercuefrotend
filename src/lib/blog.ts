export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  body: { heading?: string; paragraphs: string[] }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-thread-is-the-product",
    title: "The thread is the product",
    excerpt:
      "A proposal in one app, a contract in another, an invoice in a third. The context is what gets lost.",
    date: "2026-10-28",
    readMinutes: 4,
    body: [
      {
        paragraphs: [
          "Most freelancers do not have a document problem. They have a thread problem. The proposal lives in a PDF, the contract in an e-sign tool, the requirements in an email chain, the invoice in an accounting app, and the client history in someone's head.",
          "Each tool is fine on its own. Together they break the one thing that matters: the connection between what was promised, what was agreed, what was asked, and what was paid.",
        ],
      },
      {
        heading: "One client, five links",
        paragraphs: [
          "The client feels it too. Five links, five formats, five places to reply. Every handoff is a chance for the context to thin out.",
          "A thread keeps one client in one place: the proposal that started it, the contract that sealed it, the form that collected the requirements, the invoice that closed it, and the record that holds all of it.",
        ],
      },
      {
        heading: "What we are not building",
        paragraphs: [
          "Revercue is not a CRM replacement, not a project manager, and not an accounting tool. It is the thread. If a feature does not strengthen the connection between those five documents, it does not belong here.",
        ],
      },
    ],
  },
  {
    slug: "links-not-pdfs",
    title: "Links, not PDFs",
    excerpt: "You cannot tell whether a PDF was read. A link tells you, and it can answer back.",
    date: "2026-10-12",
    readMinutes: 3,
    body: [
      {
        paragraphs: [
          "A PDF is a dead file. You send it, you wait, and you guess. Did they open it? Did they read the pricing section or stop at the scope? Which question made them hesitate?",
          "A link is a conversation. The client opens it without an account, expands the FAQs, answers an embedded question, selects a package, and asks something. You see the activity, and the client record updates itself.",
        ],
      },
      {
        heading: "The honest limits of tracking",
        paragraphs: [
          "Tracking is not surveillance. On Free you learn whether it was opened. On Starter, when. On Growth, roughly how long and what was clicked. On Scale, the session timeline and per-question time.",
          "Raw events are reduced to a time-spent total after five days. The summary stays; the timeline does not. That is a deliberate limit, not an oversight.",
        ],
      },
    ],
  },
  {
    slug: "patterns-not-magic",
    title: "Patterns, not magic",
    excerpt: "The suggestions are arithmetic on your own log. Here is exactly what that means.",
    date: "2026-09-30",
    readMinutes: 4,
    body: [
      {
        paragraphs: [
          "A suggestion that says \"follow up with Acme Co.\" is only useful if you can see why. Ours come from patterns in your own communication log: a proposal sent with no reply, a yes with no contract, a client who went quiet after a question.",
          "No model runs. No content leaves the account. The interest level is a base of fifty with plus and minus per signal, clamped to zero and one hundred, and the breakdown is always one click away.",
        ],
      },
      {
        heading: "Prompts, not actions",
        paragraphs: [
          "The suggestion is a button, never an automatic action. You click Do it, you create the document. You click Dismiss, and it stops appearing for that client.",
          "That is the whole design principle: the product should make the next step obvious without taking it for you.",
        ],
      },
    ],
  },
];

export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
