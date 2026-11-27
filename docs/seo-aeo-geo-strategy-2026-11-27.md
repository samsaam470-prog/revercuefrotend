# Revercue SEO, AEO and GEO strategy — batch four (27 November 2026)

This is the fourth content batch. It adds fifteen articles in the same five-per-discipline shape as batch three: five for classic search demand (SEO), five written as direct answers to a question (AEO), and five built as citable reference pages for generative engines (GEO). It extends `docs/seo-aeo-geo-strategy-2027.md`, `docs/seo-aeo-geo-strategy-2027-batch2.md` and `docs/seo-aeo-geo-strategy-2026-11-26.md` without repeating their slugs or intents.

## Status

- **Existing:** 41 posts before this batch (26 from batches one and two, 15 from batch three).
- **Added:** 15 articles in `blog2027/`, one module per article, dated 2026-11-27, `readMinutes: 8` (the blog adds two, so each displays as a ten-minute read).
- **Body length:** roughly 1,050–1,600 words per article. Ten minutes is the ceiling, not a target to pad towards.
- **Product mentions:** zero in every body in this batch; the `links` array carries navigation to product pages. Deliberately below the five per cent ceiling.
- **Rendering:** the blog prerender now emits every article as HTML in the initial response, with `BlogPosting`, `BreadcrumbList` and `FAQPage` JSON-LD built from visible copy.
- **Sitemap:** blog URLs now use the trailing-slash form the host serves, so each sitemap entry matches its canonical instead of redirecting.
- **Not verified:** search volume, keyword difficulty and AI-assistant citations. No volume tool or answer-engine monitoring is connected, so no numbers are estimated. Priority comes from the shape of the results page and the question's intent.

## The gap this batch fills

Batch three covered the documents underneath a project: proposal, contract, statement of work, glossary, approval, versions. Batch four covers the **edges** of the engagement, where freelancers have the least written guidance:

1. **Starting and ending.** What to do when a signature never arrives, and how to end a project that has already started. Both are procedural, both are usually handled by improvisation.
2. **The commercial conversation.** Raising rates, answering a discount request, and bringing in help. These are the moments where a freelancer's pricing becomes either credible or negotiable forever.
3. **The administrative layer that decides payment.** Invoice contents, purchase orders, retention and handover. None of it is interesting, all of it decides whether a project is paid and closed cleanly.

Each article is useful without buying anything. That is the condition for being linked to and quoted.

## The five SEO topics

| # | Working title | Primary query | Intent | Why it can rank |
|---|---|---|---|---|
| 1 | What to include on a freelance invoice | what should a freelance invoice include / freelance invoice template | Template-seeking, administrative | High-volume query dominated by software landing pages and PDF templates; few plain field lists with the matching problem explained |
| 2 | How to cancel a freelance project | how to cancel a freelance project / freelancer cancellation policy | How-to, risk management | Commercial and legal-adjacent; most results are law-firm explainers without the process or the calculation |
| 3 | How to raise your freelance rates | how to raise freelance rates / rate increase email | Commercial investigation | Money-adjacent with strong internal-link fit; results are generic advice without the client-by-client handling |
| 4 | A client asked for a discount | freelance discount request / should I lower my price | Commercial investigation | Narrow, high-intent query with thin practical coverage; connects to the pricing and proposal articles |
| 5 | Hiring a subcontractor as a freelancer | freelance subcontractor agreement / subcontractor contract | Pre-purchase, how-to | Template intent with weak free guidance; flow-down clauses are rarely explained outside legal blogs |

## The five AEO questions

| # | Question | Answer in one line | Why it earns the box |
|---|---|---|---|
| 6 | What happens if a client never signs the contract? | You can often start on written approval, but what you can enforce depends on what the messages say | Resolves a real ambiguity with conditions and a next step, not a disclaimer |
| 7 | What should a freelance contract include for international clients? | Everything a domestic contract has, plus currency, fees, tax, governing law, payment route, time zones and data | Question-shaped, multi-part answer that is easy to extract as a list |
| 8 | How do you ask a client for a testimonial? | Ask within a week of a visible result, offer a draft, and get attribution consent in the same message | Practical question with a precise timing answer; almost every result is a marketing tool page |
| 9 | How long should a client take to give feedback? | Two to three working days for one approver, five for several; agree it before the work starts | Precise range plus a rule, and a remedy when the window slips |
| 10 | Do you need a purchase order to invoice? | Not legally in most jurisdictions, but often practically — find out before the work starts | Corrects a common assumption and separates the legal position from the finance process |

## The five GEO reference pages

| # | Page | Format that gets cited | What makes it quotable |
|---|---|---|---|
| 11 | Freelance project statuses | Nine statuses, each with a definition, entry condition and action | A complete taxonomy with one meaning per term |
| 12 | Freelance project handover checklist | Categorised close-out list with the common omissions named | A reproducible artefact a model can lift as a checklist |
| 13 | What to record in a client communication log | Field list, cadence, exclusions | A specification, not an opinion |
| 14 | How long should freelancers keep client documents? | Category-by-category retention reference with the deciding questions | Stable categories plus an explicit jurisdiction caveat |
| 15 | Freelance client folder structure | A numbered eight-folder tree with naming and version rules | A method with a reproducible artefact, like contract version control |

## Cannibalisation rules

- **1 vs 10**: the invoice article covers what goes on the invoice; the PO article covers whether a PO is needed and how it interacts with the invoice. Each links to the other once.
- **2 vs 6**: article 2 is ending a project that has started; article 6 is starting one that was never signed. Different moments, cross-linked once.
- **3 vs 4**: article 3 is the proactive increase; article 4 is the reactive discount request. Each links to the other, neither repeats the other's sequence.
- **2 vs existing deposit and payment articles**: the cancellation article covers what is owed on ending; deposits and payment terms cover how money is scheduled. It links out rather than re-explaining.
- **11 vs 12**: statuses describe where a project is; handover describes what to transfer when it closes. The status article links to the handover checklist for the closing step.
- **15 vs `contract-version-control`**: version control is about contract versions; the folder structure is about where every project file lives. Cross-linked, different H1s.
- **14 vs `freelance-contract-glossary`**: retention is about how long to keep records; the glossary defines terms. No overlap.

Check Search Console at 60 days. If two URLs rank for the same query, merge and redirect rather than adding a third.

## On-page rules

- One intent per URL. The primary phrase appears in the title, excerpt, first paragraph and one H2. Nowhere else is it forced.
- Answer-first: a heading that repeats the question, then the answer within 150 words, then the method.
- One liftable structure per article: a numbered list, a comparison in prose, a checklist, or a set of definitions.
- FAQ block of four or five questions at the end, using the wording people actually use.
- Links: two sibling articles and one product page, maximum. Product links never appear in the first half of the body.
- No invented statistics, testimonials, customer counts or search volumes.
- Legal, tax and retention statements are general principles with an explicit "not legal advice" caveat and a jurisdiction pointer.

## AEO implementation

Every AEO article opens with the question, answers it before the context, and names the conditions in the same paragraph. Answers are claims with a number or a condition: "two to three working days", "written approval that names the document", "not legally, but often practically". FAQ answers are one to three sentences so they can be extracted whole.

The prerender builds `FAQPage` markup only from FAQ paragraphs that are visible on the page, so the structured data matches the content.

## GEO implementation

- **Definitions** survive being quoted alone: the term, the plain meaning, the limit.
- **Facts** are conventions or jurisdiction-specific rules with a caveat, never invented ranges.
- **Dates**: every article carries its publication date; the prerender emits it as `datePublished` and `dateModified`.
- **Entity consistency**: when Revercue appears, it is described the same way every time — client-work software for freelancers and small agencies, covering proposal, contract, requirement form, invoice and client record — with the same stated limits (no certified signature, no card processing inside the product).
- **Machine layer**: after publication, add the five question answers to `public/llms.txt` and keep the wording identical to the articles.

## Internal link map

| From | To |
|---|---|
| 1 | 10, `freelance-payment-terms`, `/features/invoices` |
| 2 | `freelance-contract-checklist`, `unpaid-invoice`, `/features/contracts` |
| 3 | `how-to-price-a-freelance-project`, 4, `/features/proposals` |
| 4 | `how-to-price-a-freelance-project`, 3, `/features/proposals` |
| 5 | `freelance-contract-checklist`, `who-owns-the-work`, `/features/contracts` |
| 6 | `do-freelancers-need-a-contract`, `is-a-proposal-legally-binding`, `/features/contracts` |
| 7 | `freelance-contract-checklist`, `freelance-payment-terms`, `/features/contracts` |
| 8 | `client-onboarding-checklist`, `who-owns-the-work`, `/features/crm` |
| 9 | `how-many-revisions-should-a-client-get`, `how-to-handle-scope-creep`, `/features/proposals` |
| 10 | 1, `freelance-payment-terms`, `/features/invoices` |
| 11 | `client-onboarding-checklist`, 12, `/features/crm` |
| 12 | 11, `how-to-share-documents-with-clients`, `/features/crm` |
| 13 | `questions-to-ask-a-new-client`, `freelance-client-red-flags`, `/features/crm` |
| 14 | 12, 1, `/security` |
| 15 | 12, `contract-version-control`, `/features/crm` |

## Measurement

- **SEO:** impressions, clicks and average position per URL at 30 and 60 days; query-level cannibalisation check.
- **AEO:** whether the first 150 words answer the question without scrolling; featured-snippet and People Also Ask capture where visible.
- **GEO:** monthly manual checks of the five questions in the assistants the audience uses, recorded with date, exact query and exact answer. A citation is only reported if observed.
- **Business:** which article preceded a sign-up, not just total blog traffic.

## 30/60/90

- **Days 0–30:** publish all fifteen; verify the prerendered HTML and `FAQPage` markup; submit the updated sitemap; confirm every sitemap blog URL matches its canonical.
- **Days 31–60:** add the five answers to `llms.txt`; review Search Console for cannibalisation between 3/4 and 2/6; check whether the reference pages are being cited.
- **Days 61–90:** revise the two weakest articles from query data; re-check every legal, tax and retention statement against the jurisdiction it describes.

## Open issues

1. **No volume data.** Priority is inferred from result-page shape and intent.
2. **Legal and tax statements age.** The cancellation, international, subcontractor and retention articles describe general principles; they need periodic review.
3. **Retention periods are jurisdiction-specific.** The article deliberately gives categories and questions rather than one number; keep it that way.
4. **`llms.txt` is not yet updated** with this batch's question answers.
