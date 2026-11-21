# Revercue frontend — release report

## Summary
This release migrates authentication to AuthAction, removes retired FormSubmit references, wires the e-signature lifecycle end to end, adds an electronic-signature guide and FAQ, and completes the AI resource set. The production build passes.

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