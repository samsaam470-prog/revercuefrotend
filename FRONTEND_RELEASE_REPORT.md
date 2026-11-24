# Revercue frontend — release report

## Summary
This release migrates authentication to AuthAction, removes retired FormSubmit references, wires the e-signature lifecycle end to end, adds an electronic-signature guide and FAQ, and completes the AI resource set. The production build passes.

## Update — 24 November 2026

**Feature pages (`/features`, `/features/<slug>`)**
- The Features page is now a summary that links to seven detail pages: proposals, contracts, requirement-forms, invoices, crm, builder, suggestions. Each detail page is long-form (about 6,000 to 8,000 characters), has its own SEO title, meta description, FAQPage and breadcrumb structured data, and a static prerendered HTML file. All seven URLs are in `public/sitemap.xml`.
- The content lives in `src/content/features/*.json` and is shared by the React pages and `scripts/prerender-seo.mjs`.
- The Features page has a founder note and a feature-request section that points to `/contact`.
- The requirement-forms page has a section on how adaptive branching works. It is written from `PublicFormPage.tsx`: a question with no rule is always shown, and a question stays hidden unless every rule that lists it is matched.
- The tracking section on the proposal, contract, requirement-form and invoice pages covers each plan (Free, Starter, Growth, Scale, Teams). Advanced tracking reduces to a time-spent total after five days.
- Feature pages use a larger, more spaced type scale, centred paragraphs and headings, and a two-column module grid on desktop (`.feature-doc` in `global.css`).

**Header feature wheel**
- `src/components/layout/FeatureWheel.tsx` adds a circular button to the public header. It opens over the current page with the seven feature pages around a central "Features" hub. It closes on Escape, on a backdrop click, or after a choice.

**Comparison pages (`src/lib/competitorResearch.ts`, `src/lib/criteria.ts`)**
- Pricing was checked against the vendors' own pages on 24 November 2026 for Bonsai, HoneyBook, Dubsado, Moxie, Plutio, Agiled and Google Workspace. Dubsado was corrected to the official annual prices ($335 Starter, $525 Premier).
- Microsoft 365 prices come from secondary sources and are labelled as such. The entry links to Google's own support page only.
- Unverified third-party review summaries were removed. Each comparison now says that independent reviews are pending.
- The criteria page still needs a line-by-line check of its roughly 80 feature ratings against each vendor's own site, with a last-verified date and source on each rating.

**Changelog and plan availability**
- `public/ai-changelog.html` states that on 22 November 2026 Revercue opened its paid plans through Whop checkout to everyone, and that Teams is in beta. The note appears at the top of the page and above the 22 November table. The Before/Now table is kept, and the invite-only wording is marked as superseded.
- The pricing visual's caption no longer says "Only Free is self-serve."

**Open items**
- Deployment `cadbc33` (another session) failed. Later deployments succeeded.
- Several commits from other sessions landed on `main` during this work (`205ca7d`, `0908ec5`, `55fbc84`, `cadbc33`, `24451a1`, `f2ce094`, `aff269c`). This report does not describe them.
- Heading and paragraph alignment on the feature pages was checked with a browser agent, and its reports disagreed. Verify it visually on the live site.

## Files changed (high level)
- `src/main.tsx`, `src/contexts/AuthContext.tsx`, `src/api/client.ts` — AuthAction provider, async token provider, identity-linking flow.
- `src/pages/auth/LoginPage.tsx`, `SignupPage.tsx`, new `CallbackPage.tsx`, `LinkAccountPage.tsx` — AuthAction redirect and linking.
- `src/pages/app/DashboardOverviewPage.tsx`, `SettingsPage.tsx` — removed FormSubmit activation UI.
- `src/pages/public/LegalPages.tsx` — removed FormSubmit processor references.
- `src/lib/constants.ts`, `faqs.ts`, `guides.ts` — removed FormSubmit copy; added email delivery note, e-signature guide (16 sections) and 12 signature FAQs.
- `src/api/contracts.ts`, `src/api/public.ts`, `src/api/proposals.ts` — signing, versions, events, tracking, signed-PDF link, extract visuals.
- `src/pages/builder/ContractBuilderPage.tsx`, `src/pages/client/PublicContractPage.tsx` — freelancer signing before publish; client signing via `/api/public/c/:id/sign`.
- `public/` AI resources (overview, demo, changelog, capabilities, access), sitemap, robots, llms, footer, CSS.
- `vite.preview.config.mjs` — local-only preview config (gitignored).

## APIs integrated
- Auth: `/api/auth/me`, `/api/auth/link/start`, `/api/auth/link/confirm`, `/api/auth/logout`.
- Contracts: `/api/contracts/:id/sign`, `/api/contracts/:id/publish`, `/api/contracts/:id/signed-pdf-link`, versions/events/tracking/pdf.
- Public contracts: `/api/public/c/:id/sign`, `/api/public/contracts/:id/signed-pdf`.
- Marketing: `/api/newsletter`, `/api/contact`, `/api/waitlist`, `/api/beta` (already wired).
- AI visuals: `/api/extract/visuals`, `/api/organize/visuals` (pipelineApi).

## Authentication changes
- Replaced password login/signup with AuthAction PKCE redirect (`@authaction/web-sdk`).
- Tenant `revercue.in.authaction.com`, client id `OXJC1YmE3BwYU03xKfrMblC2F8hr9AC4`, audience `revercue-api.samsaam470.workers.dev`.
- Callback route `/callback` completes the AuthAction redirect, loads or provisions the Revercue user, then routes to onboarding or the app.
- The account-linking route, the linking page and the `/auth/link/start` and `/auth/link/confirm` calls have been removed from the frontend. No frontend password handling exists.

## Signing workflow implemented
- Freelancer: name + explicit consent checkbox, then `signFreelancer` before publish; publish blocked until signed.
- Client: public signing page calls `signContract` with name, consent and email; no approval bypass.
- Signed-PDF download via authorized token.
- 409 version conflicts and 429 rate limits surface to the user.

## Legal and content updates
- Removed FormSubmit references from legal pages, settings, dashboard, signup transition, guides, FAQs.
- Added e-signature guide (>= 4000 characters) and 12 signature FAQs.
- Retention wording states invoices and fully signed contracts are not automatically deleted.

## Obsolete functionality removed
- FormSubmit activation API call, banner, settings card, FAQ group, CSS, type field.

## Tests and build results
- `npm run build` (`tsc --noEmit && vite build`) exits 0.
- JSON/XML/JS syntax checks pass for the AI resources.

## Remaining blockers / external configuration
- AuthAction callback URLs must be registered in the AuthAction dashboard for production and localhost.
- Live API verification of the linking and signing flows was not performed in this environment.
- Legal content should be reviewed by qualified counsel before being presented as approved.
- E-signature UI uses typed-name consent; drawn-signature capture and canvas-based signatures are not yet implemented.
- Dev-server preview config is local-only and gitignored.
EOF
echo done