# Revercue SEO, AEO and GEO strategy — batch two (research date: 25 November 2026)

This document extends `docs/seo-aeo-geo-strategy-2027.md`. It records the second content batch: five new keyword clusters, fifteen articles, and the on-page, internal-link, structured-data and distribution plan that holds them together.

## Status

- **Published:** the eleven articles from batch one, unchanged.
- **Added in this batch:** fifteen articles, three per cluster, each 10,100–11,850 characters of body copy, in `src/lib/blog2027/` — one module per article.
- **Revised 25 November 2026:** bodies were extended from the 4,840–6,210 character trim to 10,090–11,852 (10,768 average, 1,830–2,113 words) so the text itself fills the ten-minute read the label promises, rather than the label carrying the length. The extension was written, not padded: each piece gained the section its topic was missing — a week-one plan and form fields for onboarding, scripts and a worked example for scope creep, clause variants and assumptions for the out-of-scope piece, four-line variants and failure modes for the change request, red flags and a recap template for the new-client questions, a day-after test and a phone variant for the discovery call, full follow-up copy and a thread end to end, milestone and refund handling for deposits, a late-invoice escalation ladder with a call script, permissions by document type and a sharing policy, portal thresholds and a two-week trial, and migration order plus a decision table for the comparison.
- **Label logic unchanged:** every post stores `readMinutes: 8`, and `BLOG_POSTS` adds two, so each displays a ten-minute read.
- **Wired:** all fifteen are in `BLOG_POSTS`, so they appear on `/blog` and at `/blog/<slug>`, and all fifteen are in `public/sitemap.xml`.
- **Not verified:** search volume, keyword difficulty and any AI-assistant citation of Revercue. The tools used for this research return search results and page text, not volume data or answer-engine placements. Those fields are left empty rather than estimated. The evidence cited below is SERP shape (what kind of page ranks), competitor FAQ coverage, and the questions the pages themselves answer.

## Why these five clusters

Batch one targeted buyers comparing tools. That intent is valuable and crowded: ranked listicles dominate, and a young brand competes poorly against them. Batch two targets the moments *before* the buying decision, where a freelancer has a problem and is looking for a method, not a product. Those pages are:

1. cheaper to rank, because the competition is general advice rather than vendors;
2. more linkable, because they are useful without buying anything;
3. the raw material that answer engines quote, because they answer a specific question in the first sentence;
4. honest to write, because Revercue only has to be relevant at the end, not throughout.

Each cluster is one recurring freelance failure with a clear search demand behind it, and each maps onto one part of the thread (proposal → payment → contract → form → client record). That mapping is what makes the internal links natural rather than bolted on.

## The five opportunities

| # | Discipline | Cluster | Primary keyword / question | Intent | Evidence | Articles |
|---|---|---|---|---|---|---|
| 1 | AEO + SEO | The silent client | how to follow up on a proposal / why do clients go quiet | Problem-aware, mid-funnel | Advice pages and agency blogs rank; almost nothing answers "why" with named causes | 3 |
| 2 | SEO + AEO | Deposits, terms, late payment | how much deposit should a freelancer ask for / freelance payment terms / client won't pay | High-intent, money-adjacent | Finance and legal-adjacent blogs rank with ranges (25–50%), net terms and late-fee guidance; UK statutory late-payment rules are widely cited | 3 |
| 3 | SEO + AEO | Scope creep and change control | how to handle scope creep / change request / out-of-scope clause | Problem-aware, contract-adjacent | Project-management and agency blogs rank; the clause-level queries are answered thinly | 3 |
| 4 | AEO + SEO | Client onboarding and discovery | client onboarding checklist / questions to ask a new client / discovery call | Problem-aware, process-seeking | Checklist and template pages rank; vendor pages answer the operational half badly | 3 |
| 5 | GEO + SEO | Sharing client work | do freelancers need a client portal / share documents securely / portal vs drive vs PDF | Comparison and definition | "Client portal" is dominated by SaaS vendors; the honest, category-level comparison is missing | 3 |

## The fifteen articles

| # | Slug | Cluster | Primary target | Answer-first section |
|---|---|---|---|---|
| 1 | `how-to-follow-up-on-a-proposal-without-being-annoying` | 1 | how to follow up on a proposal | "The short answer" |
| 2 | `why-clients-go-quiet-after-a-proposal` | 1 | why do clients go quiet after a proposal | Nine numbered causes |
| 3 | `proposal-follow-up-email-templates` | 1 | proposal follow up email template | Five structures, not scripts |
| 4 | `how-much-deposit-should-a-freelancer-ask-for` | 2 | how much deposit should a freelancer ask for | 25–50% range plus the "one unpaid stage" rule |
| 5 | `freelance-payment-terms` | 2 | freelance payment terms | Four terms that do the work |
| 6 | `when-a-client-does-not-pay-an-invoice` | 2 | client won't pay invoice | Day-by-day sequence |
| 7 | `how-to-handle-scope-creep` | 3 | how to handle scope creep | Choice, not refusal |
| 8 | `how-to-write-a-change-request` | 3 | how to write a change request | The four-line format |
| 9 | `out-of-scope-clause` | 3 | out of scope clause | Three jobs of the clause |
| 10 | `client-onboarding-checklist` | 4 | client onboarding checklist | Twelve items, five areas |
| 11 | `questions-to-ask-a-new-client` | 4 | questions to ask a new client | Four questions first |
| 12 | `how-to-run-a-discovery-call` | 4 | how to run a discovery call | 5/10/5 minute structure |
| 13 | `do-freelancers-need-a-client-portal` | 5 | do freelancers need a client portal | Three problems a portal solves |
| 14 | `how-to-share-documents-with-clients` | 5 | how to share documents with clients securely | Link, not attachment |
| 15 | `client-portal-vs-shared-drive` | 5 | client portal vs shared drive vs PDF | Match the method to the job |

Secondary targets are carried in the bodies and headings rather than in a separate field: for example "proposal follow up schedule", "client ghosting after proposal", "freelance deposit percentage", "net 30 vs net 14", "late payment interest UK", "scope creep examples", "change request template", "revision rounds", "freelance onboarding process", "client intake questions", "discovery call questions", "client portal for freelancers", "send large files to clients", "client document sharing".

## SEO plan

**On-page.** One primary intent per URL, never two. Each article opens with the question it answers, uses question-style H2s, and repeats the primary phrase in the title, the excerpt (which becomes the meta description), the first paragraph and at least one H2. No keyword stuffing: the phrase appears where a person would write it.

**Cannibalisation.** Cluster 1 and the batch-one article `how-to-make-your-proposal-speak-for-you` both touch proposals. The split is deliberate: batch one is about writing the document, cluster 1 is about what happens after it is sent. Every new article links to the batch-one article with that distinction in the anchor text, so the two reinforce rather than compete. Check Search Console at 60 days; if both rank for the same query, merge and redirect.

**Sitemap and indexing.** Fifteen URLs added to `public/sitemap.xml` with `lastmod` 2026-11-25, `changefreq` monthly and priority 0.7. They will be prerendered at the next build. Submit the sitemap in Search Console once it is connected; until then, the XML is the canonical list.

**Internal links.** Every article links to two or more sibling articles in its own cluster and to one product page (`/features/...` or `/pricing`), using descriptive anchors. Every product page that matches a cluster should link back to its cluster's first article: `/features/proposals` → article 1, `/features/invoices` → article 4, `/features/contracts` → article 7, `/features/requirement-forms` → article 10. That two-way link is the part most content plans skip, and it is what moves a cluster from "some posts" to "a section".

**Cadence.** Publish all fifteen as one batch so the clusters are complete and internally linked from day one. Then add one article a month that answers a question raised in Search Console, rather than expanding a cluster that is already covered.

## AEO plan

**Answer first.** Each article answers its question in the first 150 words, under a heading that repeats the question. The shorter bodies make this stricter, not looser: the answer now arrives before the end of the first screen on a phone. The answer is a claim, not a preface: "Follow up three times over about three weeks" rather than "follow-up is an important part of the sales process."

**Citable units.** Every article contains at least one list, table or numbered sequence that an answer engine can lift without losing meaning: nine causes, twelve checklist items, four lines of a change request, five templates, a decision table. Prose is harder to quote than structure, and structure is what gets cited.

**FAQ blocks.** Every article ends with four questions and short answers, written as a person would ask them. These are the passages most likely to be extracted into an AI answer, and they are also the raw material for FAQPage structured data.

**Structured data.** The blog template currently renders `BlogPosting` metadata through `src/lib/seo.ts`. The next step is to add `FAQPage` and `BreadcrumbList` to article pages once the template can emit per-post FAQ entities safely. Do not add FAQPage markup to posts whose FAQ text is not visible on the page; Google's guidance requires the content to be present.

**Entity consistency.** Every article names Revercue the same way, describes it the same way ("client-work software for freelancers and small agencies", "the thread: proposal, contract, requirement form, invoice, client record") and states the same limits (no public API, no certified signature, no card processing inside the product). Repetition is what makes an entity stable across a corpus.

## GEO plan

**Facts that can be checked.** The payment articles give ranges and name where the convention comes from, and they say plainly that the ranges are conventions rather than rules. The UK statutory position (30-day default for business-to-business invoices, interest at 8% above the Bank of England base rate plus fixed compensation) is stated as a jurisdiction-specific fact with a "check your jurisdiction" caveat. Nothing is invented; nothing is presented as legal advice.

**Category-level honesty.** Cluster 5 is where a generative engine is most likely to need an answer, because the question is a definition ("do I need a portal"). Those articles answer for the category first and mention the product once, at the end. A page that only promotes itself does not get quoted; a page that answers the question does.

**What the AI-facing pages should say next.** Once these articles are live, add the five cluster answers to `public/llms.txt` and to `/ai-overview` as short, dated summaries, so the machine-readable layer and the human layer agree. Keep the wording identical; divergence between the two is what makes entity claims unstable.

**Distribution.** Third-party listings and reviews remain the weakest part of the plan and are still a task rather than an article (batch one, item 15). Do not claim an AI assistant recommends Revercue unless it has been tested and recorded with a date and the exact query.

## Content standards used in this batch

- Every article is roughly 10,000–11,900 characters of body copy, measured on the paragraph text alone, which is 1,830–2,110 words and about ten minutes at ordinary reading speed. The blog adds two minutes to each post's stored `readMinutes`, so these posts store 8 and display 10.
- Every article is useful without the product: the method stands on its own, and the product appears as one option near the end, with its limits stated.
- Every factual claim is either a convention attributed to a category of sources, a jurisdiction-specific rule with a caveat, or a description of Revercue's own behaviour.
- No invented statistics, no invented testimonials, no invented customer counts.
- No article promises a feature Revercue does not have. Where the product is mentioned, the article says what it does not do (no public API, no certified signature, no inbox integration, no card processing).
- Tone matches the existing palette: plain sentences, no superlatives, no growth-hack vocabulary.

## Internal link map

| From | To |
|---|---|
| 1 | 2, 3, `/features/proposals`, `/pricing` |
| 2 | 1, `/blog/how-to-make-your-proposal-speak-for-you`, `/blog/freelance-client-management-software` |
| 3 | 1, 2, `/features/proposals`, `/pricing` |
| 4 | 5, 6, `/features/invoices`, `/pricing` |
| 5 | 4, 6, `/features/contracts`, `/pricing` |
| 6 | 4, 5, `/features/invoices`, `/pricing` |
| 7 | 8, 9, `/features/contracts`, `/pricing` |
| 8 | 7, 9, `/features/contracts`, `/pricing` |
| 9 | 7, 8, `/features/contracts`, `/pricing` |
| 10 | 11, 12, `/features/requirement-forms`, `/pricing` |
| 11 | 10, 12, `/features/requirement-forms`, `/pricing` |
| 12 | 10, 11, `/features/proposals`, `/pricing` |
| 13 | 14, 15, `/features`, `/pricing` |
| 14 | 13, 15, `/security`, `/features` |
| 15 | 13, 14, `/compare`, `/pricing` |

## Measurement

Do not record baselines until the tools are connected. When they are:

- **SEO:** indexed pages, impressions and clicks per URL, and position for the fifteen primary targets, from Search Console.
- **AEO:** whether each targeted question is answered in the first 150 words; referral traffic from answer engines where it is identifiable.
- **GEO:** a monthly manual check of the five cluster questions in the assistants that matter to the audience, recorded with date, query and exact answer. Never report a recommendation that was not observed.
- **Business:** sign-ups attributed to `/blog/*` landing pages, and which article preceded the sign-up.

## 30/60/90 roadmap

- **Days 0–30:** publish the batch; confirm all fifteen render on mobile and that internal links resolve; add the two-way links from the four feature pages; submit the sitemap.
- **Days 31–60:** add FAQPage and BreadcrumbList structured data; add the cluster answers to `llms.txt` and `/ai-overview`; review Search Console for the first impressions and fix any query where a different URL of ours ranks higher.
- **Days 61–90:** start third-party distribution (directories, review sites, communities) following each site's rules; write one article from the query data rather than from this plan; re-check every price and every statutory figure against its source.

## Open issues

1. **No volume data.** Cluster priority is based on SERP shape and intent, not on measured demand. Reorder once Search Console has 60 days of impressions.
2. **The blog template is client-rendered.** Article HTML is not in the initial response for crawlers that do not execute JavaScript. The sitemap and metadata are correct, but full prerendering of blog routes would materially improve both SEO and AEO. This is the highest-value engineering task connected to this plan.
3. **No `dateModified` per post.** `BlogPosting` metadata uses the post date. If articles are revised, add a modified date so freshness is visible to both crawlers and answer engines.
4. **Pricing statements age.** The plan tiers referenced in articles must be re-checked whenever `/pricing` changes; one stale price undermines the "verified facts" positioning.
