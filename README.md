# Revercue frontend

React 18 + TypeScript + Vite implementation, following the product and architecture blueprints in this repository.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `VITE_API_BASE_URL` to the deployed Revercue API Worker URL when it differs from the default.

## Current implementation slice

- React Router application shell and responsive dark/gold design foundation.
- API client using the documented API base URL, bearer-token auth, JSON/multipart handling, and normalized API errors.
- Signup, login, email verification, and first two onboarding steps.
- Authenticated workspace shell, dashboard summary/activity, proposal and CRM read views.
- Contracts, requirement forms, invoices, full builders, public document views, notifications, settings, billing, and remaining onboarding flows are subsequent implementation slices. The backend contract is treated as the source of truth; endpoints are not invented.

No AI service or third-party model is used by this frontend.