/**
 * Revercue posts published on DEV Community, newest first.
 *
 * These are hosted on dev.to, so the cards on /blog link out instead of
 * rendering a local post. Covers live under /blog/covers so the card image and
 * the DEV cover image are the same file.
 */
export interface DevArticle {
  url: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  cover: string;
  series?: string;
}

export const DEV_SERIES = "The Client Thread";

export const DEV_ARTICLES: DevArticle[] = [
  {
    url: "https://dev.to/revercue/the-invoice-is-not-the-end-of-the-thread-4cng",
    title: "The invoice is not the end of the thread",
    excerpt:
      "Late invoices are usually administrative, not malicious. The reference scheme, the fields that stop a payment stalling, a four-touch cadence, and what to send after it is paid.",
    date: "2026-11-28",
    readMinutes: 8,
    cover: "/blog/covers/invoice-thread.jpg",
    series: DEV_SERIES,
  },
  {
    url: "https://dev.to/revercue/your-proposal-link-should-expire-plan-for-the-day-it-does-2jgo",
    title: "Your proposal link should expire — plan for the day it does",
    excerpt:
      "A link that lives forever quietly becomes an archive you never planned. Three clocks, a sensible default window, and what the client should see when the offer runs out.",
    date: "2026-11-28",
    readMinutes: 8,
    cover: "/blog/covers/link-expiry.jpg",
    series: DEV_SERIES,
  },
  {
    url: "https://dev.to/revercue/price-the-quick-change-before-you-do-it-40a5",
    title: "Price the quick change before you do it",
    excerpt:
      "\"Quick\" is how scope arrives. A triage rule, a six-field change request, a record you can query, and three ways to decline without losing the client.",
    date: "2026-11-28",
    readMinutes: 8,
    cover: "/blog/covers/change-request.jpg",
    series: DEV_SERIES,
  },
  {
    url: "https://dev.to/revercue/the-data-model-behind-a-freelancers-client-thread-5g93",
    title: "The data model behind a freelancer's client thread",
    excerpt:
      "Four documents, one client record, and the events worth storing. A small schema for proposals, contracts, forms and invoices that survives a year of scope changes.",
    date: "2026-11-27",
    readMinutes: 9,
    cover: "/blog/covers/client-thread-data-model.jpg",
    series: DEV_SERIES,
  },
  {
    url: "https://dev.to/revercue/tracked-document-links-without-an-analytics-stack-3cbg",
    title: "Tracked document links without an analytics stack",
    excerpt:
      "You need three events, not a pipeline. How to record opens, sections and selections with a signed link, a queue and a table you can actually query.",
    date: "2026-11-27",
    readMinutes: 9,
    cover: "/blog/covers/tracked-links.jpg",
    series: DEV_SERIES,
  },
  {
    url: "https://dev.to/revercue/designing-a-proposal-page-your-client-will-actually-read-33ig",
    title: "Designing a proposal page your client will actually read",
    excerpt:
      "The client's four questions, a block model for the document, honest package tables, and the print stylesheet that keeps the PDF crowd happy.",
    date: "2026-11-27",
    readMinutes: 8,
    cover: "/blog/covers/proposal-page-design.jpg",
    series: DEV_SERIES,
  },
  {
    url: "https://dev.to/revercue/the-freelance-paper-trail-keeping-a-project-from-proposal-to-payment-without-losing-the-thread-274d",
    title: "The freelance paper trail: keeping a project from proposal to payment",
    excerpt:
      "Six artefacts every project needs, a four-touch follow-up cadence that does not read as nagging, and an honest look at the tooling routes.",
    date: "2026-11-25",
    readMinutes: 7,
    cover: "/blog/covers/paper-trail.jpg",
    series: DEV_SERIES,
  },
];
