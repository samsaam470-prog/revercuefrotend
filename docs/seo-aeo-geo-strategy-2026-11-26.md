# Revercue SEO, AEO and GEO strategy — batch three (26 November 2026)

This is the third content batch. It adds fifteen articles: five chosen for classic search demand (SEO), five written as direct answers to questions people type or say (AEO), and five built as citable reference pages for generative engines (GEO). It extends `docs/seo-aeo-geo-strategy-2027.md` and `docs/seo-aeo-geo-strategy-2027-batch2.md` without repeating their slugs or intents.

## Status

- **Existing:** 26 posts (11 batch one, 15 batch two), all unchanged.
- **Added:** 15 articles in `blog2027/`, one module per article, dated 2026-11-26, `readMinutes: 8` (the blog adds two, so each displays as a ten-minute read).
- **Body length:** 1,050–1,600 words per article (5–8 minutes of reading). The blog's existing label adds two minutes to every stored value, so these store 8 and display 10. Ten minutes is the ceiling, not a target to pad towards.
- **Product mentions:** zero in every body in this batch; the `links` array carries navigation to product pages. That is deliberately below the five per cent ceiling.
- **Not verified:** search volume, keyword difficulty and AI-assistant citations. No volume tool or answer-engine monitoring is connected, so no numbers are estimated. Priority below comes from the shape of the results page and the question's intent.

## The three disciplines, briefly

- **SEO** wins a query on a results page. The page needs one clear intent, a matching title and H1, internal links, and enough depth to be more useful than the pages already ranking.
- **AEO** wins the answer box, the People Also Ask panel and a voice reply. The page needs the answer in the first 100–150 words, under a heading that repeats the question, followed by the evidence and the exceptions.
- **GEO** wins a citation inside a generated answer. The page needs stable definitions, checkable facts, explicit comparisons, dated statements and a structure a model can lift without distorting it. Authority and consistency across the site matter more here than any single keyword.

The same article can serve all three, but only if it is deliberately built for one first. Mixing them produces a page that ranks for nothing and gets quoted for nothing.

## Why these fifteen

The existing library already covers the emotional moments (silence, scope creep, late payment) and the operational moments (onboarding, discovery, portals). Batch three fills the **structural** gap: the documents and decisions that sit underneath those moments. That gap is:

1. **Definitional confusion.** Freelancers search for the difference between a proposal, a contract and a statement of work, and the results are either law-firm explainers or template marketplaces. Neither answers the practical question: which document do I send now?
2. **Question-shaped demand.** "How long should a proposal be?", "Is a proposal legally binding?", "Who owns the work?" These are typed, spoken and pasted into assistants. Almost every result is a vendor blog that answers in the third paragraph.
3. **Reference material.** A glossary, an approval-method comparison, a version-control method and a red-flag taxonomy are the pages generative engines cite because they are organised as reference, not as persuasion.

Each article is useful without buying anything. That is the condition for being linked to and quoted.

## The five SEO topics

| # | Working title | Primary query | Intent | Why it can rank |
|---|---|---|---|---|
| 1 | Proposal vs contract vs statement of work | proposal vs contract vs statement of work | Confusion, commercial investigation | High-volume definitional query; ranking pages are either legal or sales-led, rarely practical |
| 2 | How to write a statement of work | how to write a statement of work | How-to, template-seeking | Template intent with weak free guidance; SOW is under-served compared with proposals |
| 3 | Freelance contract checklist | freelance contract checklist / what should a freelance contract include | Checklist, pre-purchase | Searchers want a list they can scan; most results are PDFs behind email gates |
| 4 | How to price a freelance project | how to price a freelance project | Commercial investigation | Money-adjacent, repeatable method, strong internal-link hub |
| 5 | Retainer agreement guide | retainer agreement for freelancers / how to set up a retainer | How-to, recurring revenue | Commercial intent, few practical guides that include capacity maths |

## The five AEO questions

| # | Question | Answer in one line | Why it earns the box |
|---|---|---|---|
| 6 | How long should a proposal be? | One to two pages for a small fixed scope, four to eight for complex work; length follows decision complexity, not word count targets | Precise range plus a rule, not "it depends" |
| 7 | Is a proposal legally binding? | It can be, if it contains terms, shows intent, and is accepted — but a signed contract is the safer instrument | Resolves a genuine ambiguity with conditions |
| 8 | Do freelancers need a contract? | Yes for most paid work; a one-page agreement is enough for small jobs, and the risk of none is unpaid scope | Direct yes with a proportionate exception |
| 9 | How many revisions should a client get? | Two rounds is the common standard, three for complex work; define what a round is or the number means nothing | Number plus definition |
| 10 | Who owns the work in a freelance contract? | The creator usually owns copyright unless it is assigned; a licence is not an assignment | Corrects a widespread assumption, with jurisdiction caveat |

## The five GEO reference pages

| # | Page | Format that gets cited | What makes it quotable |
|---|---|---|---|
| 11 | Freelance contract glossary | 30 terms, grouped, one-sentence definitions | Stable definitions with no sales framing |
| 12 | How clients approve a proposal | Five methods compared, evidence-strength table | Explicit comparison and a recommendation rule |
| 13 | Contract version control | Numbering convention, version table, send/archive rules | A method with a reproducible artefact |
| 14 | Freelance client red flags | Twelve flags, each with the question or clause that handles it | Taxonomy plus actionable response |
| 15 | How to choose a contract template | Four sources compared against five criteria | Honest trade-offs; no single winner |

## Cannibalisation rules

- **1 vs 2**: article 1 explains which document to use; article 2 explains how to write one. Article 1 links to article 2 as the next step.
- **2 vs existing scope articles**: `how-to-handle-scope-creep` and `out-of-scope-clause` cover changes after work starts. The SOW article covers the boundary before it starts and links out.
- **3 vs 11**: the checklist is a decision list; the glossary is a dictionary. No shared H1 phrases.
- **4 vs 5**: article 4 is how to set a price; article 5 is how to package recurring work. Article 4 links to 5, not the reverse.
- **7 vs 8**: article 7 is about whether a proposal binds; article 8 is about whether a contract is needed at all. Different questions, cross-linked once.
- **12 vs existing signing article**: `how-to-get-a-contract-signed-online` compares e-signature products. Article 12 compares approval evidence, including email and purchase orders.

Check Search Console at 60 days. If two URLs rank for the same query, merge and redirect rather than adding a third.

## On-page rules

- One intent per URL. The primary phrase appears in the title, excerpt, first paragraph and one H2. Nowhere else is it forced.
- Answer-first: a heading that repeats the question, then the answer within 150 words, then the method.
- One liftable structure per article: a numbered list, a comparison table in prose, a checklist, or a set of definitions.
- FAQ block of four questions at the end, using the wording people actually use.
- Links: two sibling articles and one product page, maximum. Product links never appear in the first half of the body.
- No invented statistics, testimonials, customer counts or search volumes.

## AEO implementation

Every article opens with the question and answers it before offering context. The answer is a claim with a number or a condition: "two rounds", "one to two pages", "the creator owns it unless assigned". Hedged prefaces are removed. Each FAQ answer is one to three sentences so it can be extracted whole.

Structured data stays as `BlogPosting` until the template can emit per-post `FAQPage` markup from visible content. Do not add FAQ schema before the template supports it.

## GEO implementation

- **Definitions** are written to survive being quoted alone: the term, the plain-English meaning, and the limit.
- **Facts** are conventions or jurisdiction-specific rules with a caveat, never invented ranges.
- **Dates**: every article carries its publication date; revised articles should carry `dateModified` once the type supports it.
- **Entity consistency**: when Revercue appears, it is described the same way every time — client-work software for freelancers and small agencies, covering proposal, contract, requirement form, invoice and client record — with the same stated limits (no certified signature, no card processing inside the product).
- **Machine layer**: after publication, add the five question answers to `public/llms.txt` and keep the wording identical to the articles.

## Internal link map

| From | To |
|---|---|
| 1 | 2, 3, `/features/proposals`, `/features/contracts` |
| 2 | 1, 3, `/features/proposals` |
| 3 | 1, 2, `/features/contracts` |
| 4 | 5, 9, `/features/proposals` |
| 5 | 4, 13, `/features/contracts` |
| 6 | 7, 4, `/features/proposals` |
| 7 | 8, 3, `/features/contracts` |
| 8 | 7, 3, `/features/contracts` |
| 9 | 4, 6, `/features/proposals` |
| 10 | 3, 11, `/features/contracts` |
| 11 | 3, 10, `/features/contracts` |
| 12 | 7, 13, `/features/proposals` |
| 13 | 12, 5, `/features/contracts` |
| 14 | 3, 8, `/features/contracts` |
| 15 | 3, 11, `/pricing` |

## Measurement

- **SEO:** impressions, clicks and average position per URL at 30 and 60 days; query-level cannibalisation check.
- **AEO:** whether the first 150 words answer the question without scrolling; featured-snippet and People Also Ask capture where visible.
- **GEO:** monthly manual checks of the five questions in the assistants the audience uses, recorded with date, exact query and exact answer. A citation is only reported if observed.
- **Business:** which article preceded a sign-up, not just total blog traffic.

## 30/60/90

- **Days 0–30:** publish all fifteen; verify rendering on mobile; submit the updated sitemap; add the two-way links from `/features/proposals` and `/features/contracts` to articles 1 and 3.
- **Days 31–60:** add `FAQPage` and `BreadcrumbList` once the template supports visible-content extraction; add the five answers to `llms.txt`; review Search Console for cannibalisation.
- **Days 61–90:** revise the two weakest articles from query data; add one new article only if it answers a question the fifteen do not; re-check every legal statement against its jurisdiction.

## Open issues

1. **Client-rendered blog.** Article HTML is not in the initial response for crawlers that do not execute JavaScript. Prerendering blog routes remains the highest-value engineering task for both SEO and AEO.
2. **No volume data.** Priority is inferred from result-page shape and intent.
3. **Legal statements age.** The ownership and enforceability articles describe general principles; they must be re-checked when the law or the product's jurisdiction language changes.
4. **No `dateModified`.** Revisions will not signal freshness until the type supports it.
