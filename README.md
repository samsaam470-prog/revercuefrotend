# Revercue frontend

React 18 + TypeScript + Vite implementation of the Revercue client-work OS.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `VITE_API_BASE_URL` to the API Worker URL documented in `api.txt` if it differs from the default.

## Implemented in this milestone

- Public marketing landing page, signup, login, email verification, onboarding and guarded workspace.
- Dashboard metrics and activity feed; proposals, contracts, requirement forms and invoice list/create/detail workflows.
- Document draft creation, editing against the API document payload, publish/share, duplicate, archive and invoice payment confirmation.
- CRM client list, create, search, export, client detail, communication and notes.
- Notifications, profile, plan request, security, saved libraries, revision settings, revenue/expenses, templates and account deletion controls.
- Public proposal, contract, invoice and form routes with password unlock and client actions.

## Boundaries

This frontend uses only endpoints declared in `api.txt`. Backend behavior, plan entitlements, email delivery, payment processing and storage are provided by the separate API Worker. Builder editing uses a structured JSON editing surface; the advanced visual drag-and-drop canvas, template-rendered block editor, PDF generation/download, native share sheet, complete branching form designer, and all 49 public FAQ entries are not represented as complete in this milestone. Teams features remain MVP 2.0. Revercue does not use an AI model.

Build verification should be run with `npm run build` after installing dependencies.
