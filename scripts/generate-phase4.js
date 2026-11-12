const fs = require('fs');
const path = require('path');

function render(template, data) {
  let out = template;
  for (const [k, v] of Object.entries(data)) {
    out = out.replace(new RegExp('{{' + k + '}}', 'g'), v ?? '');
  }
  return out;
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log('  ' + file);
}

const visualTpl = fs.readFileSync('templates/codevisual.hbs', 'utf8');
const builderTpl = fs.readFileSync('templates/builder.hbs', 'utf8');
const pageTpl = fs.readFileSync('templates/page-app.hbs', 'utf8');

// The 12 real CodeVisuals
const visuals = [
  { name: 'DashboardVisual', label: 'Dashboard', scale: 0.5, body: '<div className="stat-strip"><div className="stat-card"><span className="stat-num">12</span><span className="stat-label">Active documents</span></div><div className="stat-card"><span className="stat-num">8</span><span className="stat-label">Clients</span></div><div className="stat-card"><span className="stat-num">3</span><span className="stat-label">Follow-ups due</span></div><div className="stat-card"><span className="stat-num">$2,900</span><span className="stat-label">Revenue</span></div></div><div className="suggestion-card"><p>The client agreed to move forward. Create a contract?</p></div><div className="create-row"><button className="btn btn-primary">Create proposal</button><button className="btn btn-ghost">Create contract</button><button className="btn btn-ghost">Create invoice</button></div>' },
  { name: 'BuilderVisual', label: 'Proposal Builder', scale: 0.5, body: '<div className="builder-grid"><div className="builder-left"><p>Sections</p><p>Introduction</p><p>Scope</p><p>Pricing</p></div><div className="builder-center"><h3>Website Redesign for Acme Co.</h3><p>Introduction</p><p>We understand Acme Co. is an e-commerce business...</p></div><div className="builder-right"><p>Properties</p><p>Heading</p></div></div>' },
  { name: 'ProposalVisual', label: 'Proposal', scale: 0.4, body: '<div className="proposal-visual"><h3>Website Redesign for Acme Co.</h3><p>Prepared for Acme Co.</p><div className="packages"><div className="pkg">Basic $500</div><div className="pkg">Standard $1,200</div><div className="pkg">Premium $2,500</div></div></div>' },
  { name: 'InvoiceVisual', label: 'Invoice', scale: 0.4, body: '<div className="invoice-visual"><h3>INV-2026-0042</h3><p>Due: 2026-11-26</p><table><tr><td>Design</td><td>$800</td></tr><tr><td>Development</td><td>$400</td></tr></table><p><strong>Total: $1,200</strong></p><button className="btn btn-primary">Buy Now</button></div>' },
  { name: 'ContractVisual', label: 'Contract', scale: 0.4, body: '<div className="contract-visual"><h3>Service Agreement</h3><p>Scope: Website redesign</p><p>Payment: 50% upfront</p><div className="contract-actions"><button className="btn btn-primary">Approve</button><button className="btn btn-ghost">Decline</button><button className="btn btn-ghost">I Have Questions</button></div></div>' },
  { name: 'FormVisual', label: 'Form Editor', scale: 0.4, body: '<div className="form-visual"><div className="q-list"><p>Q1: What is your budget?</p><p>Q2: Timeline?</p><p>Q3: Deliverables?</p></div><div className="q-editor"><p>Question text</p><p>Type: short text</p></div></div>' },
  { name: 'CrmVisual', label: 'CRM', scale: 0.4, body: '<div className="crm-visual"><h3>Acme Co.</h3><div className="comm-log"><p>Proposal sent — 2 days ago</p><p>Client replied — 1 day ago</p></div><div className="docs"><p>Proposal: published</p><p>Contract: draft</p></div></div>' },
  { name: 'ChartVisual', label: 'Revenue', scale: 1, body: '<div className="chart-visual"><div className="bar" style={{ height: "60%" }} /><div className="bar" style={{ height: "80%" }} /><div className="bar" style={{ height: "40%" }} /><div className="bar" style={{ height: "90%" }} /></div>' },
  { name: 'SuggestionVisual', label: 'Suggestion', scale: 1, body: '<div className="suggestion-visual"><p>The client agreed to move forward. Create a contract?</p><div className="suggestion-actions"><button className="btn btn-primary">Create contract</button><button className="btn btn-ghost">Dismiss</button></div></div>' },
  { name: 'CodeScreenVisual', label: 'Code Screen', scale: 0.6, body: '<div className="code-screen"><div className="code-boxes"><span>_</span><span>_</span><span>_</span><span>_</span><span>_</span><span>_</span></div><p className="code-note">Check your inbox. FormSubmit will send you an activation email.</p></div>' },
  { name: 'SecurityVisual', label: 'What Revercue Knows', scale: 0.5, body: '<div className="security-visual"><h3>What Revercue knows about you</h3><table><tr><td>Email</td><td>you@example.com</td></tr><tr><td>Plan</td><td>Free</td></tr></table></div>' },
  { name: 'PricingVisual', label: 'Pricing', scale: 0.5, body: '<div className="pricing-visual"><table><thead><tr><th>Feature</th><th>Free</th><th>Growth</th><th>Scale</th></tr></thead><tbody><tr><td>Active docs</td><td>5</td><td>100</td><td>300</td></tr><tr><td>Retention</td><td>1 mo</td><td>12 mo</td><td>24 mo</td></tr></tbody></table></div>' },
];

console.log('Generating the real visuals...');
for (const v of visuals) {
  write(`src/components/visuals/${v.name}.tsx`, render(visualTpl, { NAME: v.name, LABEL: v.label, SCALE: v.scale, BODY: v.body }));
}

// The builder components
const builderComponents = [
  { name: 'Canvas', css: 'canvas' },
  { name: 'BlockLibrary', css: 'block-library' },
  { name: 'PropertyPanel', css: 'property-panel' },
  { name: 'TopBar', css: 'builder-topbar' },
  { name: 'ShareModal', css: 'share-modal' },
  { name: 'PreviewPane', css: 'preview-pane' },
  { name: 'TemplatePicker', css: 'template-picker' },
];

console.log('Generating the builder components...');
for (const b of builderComponents) {
  write(`src/components/builder/${b.name}.tsx`, render(builderTpl, { NAME: b.name, CSS_CLASS: b.css }));
}

// The app pages
const appPages = [
  { name: 'DashboardOverviewPage', title: 'Dashboard', subtitle: 'What needs your attention today.' },
  { name: 'ProposalsListPage', title: 'Proposals', subtitle: 'Your proposals.' },
  { name: 'ContractsListPage', title: 'Contracts', subtitle: 'Your contracts.' },
  { name: 'FormsListPage', title: 'Forms', subtitle: 'Your forms.' },
  { name: 'InvoicesListPage', title: 'Invoices', subtitle: 'Your invoices.' },
  { name: 'SettingsPage', title: 'Settings', subtitle: 'Your account and your plan.' },
  { name: 'NotificationsPage', title: 'Notifications', subtitle: 'Your activity.' },
];

console.log('Generating the app pages...');
for (const p of appPages) {
  write(`src/pages/app/${p.name}.tsx`, render(pageTpl, { NAME: p.name, TITLE: p.title, SUBTITLE: p.subtitle }));
}

// The builder pages
const builderPages = [
  { name: 'ProposalBuilderPage', title: 'Proposal Builder', subtitle: 'Build the proposal.' },
  { name: 'ContractBuilderPage', title: 'Contract Builder', subtitle: 'Build the contract.' },
  { name: 'FormEditorPage', title: 'Form Editor', subtitle: 'Build the form.' },
  { name: 'InvoiceBuilderPage', title: 'Invoice Builder', subtitle: 'Build the invoice.' },
];

console.log('Generating the builder pages...');
for (const p of builderPages) {
  write(`src/pages/builder/${p.name}.tsx`, render(pageTpl, { NAME: p.name, TITLE: p.title, SUBTITLE: p.subtitle }));
}

// The CRM pages
const crmPages = [
  { name: 'CrmListPage', title: 'Clients', subtitle: 'Your clients.' },
  { name: 'ClientDetailPage', title: 'Client', subtitle: 'The client record.' },
];

console.log('Generating the CRM pages...');
for (const p of crmPages) {
  write(`src/pages/crm/${p.name}.tsx`, render(pageTpl, { NAME: p.name, TITLE: p.title, SUBTITLE: p.subtitle }));
}

// The client-facing pages (the no-auth pages)
const clientPages = [
  { name: 'PublicProposalPage', title: 'Proposal', subtitle: 'Review the proposal.' },
  { name: 'PublicContractPage', title: 'Contract', subtitle: 'Review the contract.' },
  { name: 'PublicInvoicePage', title: 'Invoice', subtitle: 'Review the invoice.' },
  { name: 'PublicFormPage', title: 'Form', subtitle: 'Complete the form.' },
  { name: 'PasswordWall', title: 'Protected', subtitle: 'Enter the password.' },
  { name: 'ClosedPage', title: 'Closed', subtitle: 'This document is closed.' },
  { name: 'ProofUploadPage', title: 'Payment Proof', subtitle: 'Upload your payment proof.' },
];

console.log('Generating the client-facing pages...');
for (const p of clientPages) {
  write(`src/pages/client/${p.name}.tsx`, render(pageTpl, { NAME: p.name, TITLE: p.title, SUBTITLE: p.subtitle }));
}

// The utility pages
const utilityPages = [
  { name: 'NotFoundPage', title: '404', subtitle: 'This page does not exist.' },
  { name: 'ForbiddenPage', title: '403', subtitle: 'You do not have access.' },
  { name: 'ServerErrorPage', title: '500', subtitle: 'Something went wrong.' },
  { name: 'OfflinePage', title: 'Offline', subtitle: 'Check your connection.' },
  { name: 'SessionExpiredPage', title: 'Session Expired', subtitle: 'Log in again.' },
];

console.log('Generating the utility pages...');
for (const p of utilityPages) {
  write(`src/pages/utility/${p.name}.tsx`, render(pageTpl, { NAME: p.name, TITLE: p.title, SUBTITLE: p.subtitle }));
}

// The contexts
console.log('Generating the contexts...');
write('src/contexts/AuthContext.tsx', "import { createContext, useContext, useState, ReactNode } from 'react';\nimport { User } from '../types';\n\ninterface AuthContextType { user: User | null; token: string | null; login: (u: User, t: string) => void; logout: () => void; }\nconst AuthContext = createContext<AuthContextType | null>(null);\n\nexport function AuthProvider({ children }: { children: ReactNode }) {\n  const [user, setUser] = useState<User | null>(null);\n  const [token, setToken] = useState<string | null>(typeof window !== 'undefined' ? sessionStorage.getItem('revercue_token') : null);\n  const login = (u: User, t: string) => { setUser(u); setToken(t); sessionStorage.setItem('revercue_token', t); };\n  const logout = () => { setUser(null); setToken(null); sessionStorage.removeItem('revercue_token'); };\n  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;\n}\n\nexport function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be inside AuthProvider'); return ctx; }\n");
write('src/contexts/ToastContext.tsx', "import { createContext, useContext, useState, ReactNode } from 'react';\n\ninterface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }\ninterface ToastContextType { toasts: Toast[]; toast: (message: string, type?: Toast['type']) => void; }\nconst ToastContext = createContext<ToastContextType | null>(null);\n\nexport function ToastProvider({ children }: { children: ReactNode }) {\n  const [toasts, setToasts] = useState<Toast[]>([]);\n  const toast = (message: string, type: Toast['type'] = 'info') => { const id = crypto.randomUUID(); setToasts((t) => [...t, { id, message, type }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000); };\n  return <ToastContext.Provider value={{ toasts, toast }}>{children}</ToastContext.Provider>;\n}\n\nexport function useToast() { const ctx = useContext(ToastContext); if (!ctx) throw new Error('useToast must be inside ToastProvider'); return ctx; }\n");
write('src/contexts/PlanContext.tsx', "import { createContext, useContext, ReactNode } from 'react';\nimport { useAuth } from './AuthContext';\n\ninterface PlanContextType { plan: string; hasFeature: (f: string) => boolean; }\nconst PlanContext = createContext<PlanContextType | null>(null);\n\nexport function PlanProvider({ children }: { children: ReactNode }) {\n  const { user } = useAuth();\n  const plan = user?.plan ?? 'free';\n  const hasFeature = (f: string) => ['growth','scale','teams'].includes(plan);\n  return <PlanContext.Provider value={{ plan, hasFeature }}>{children}</PlanContext.Provider>;\n}\n\nexport function usePlan() { const ctx = useContext(PlanContext); if (!ctx) throw new Error('usePlan must be inside PlanProvider'); return ctx; }\n");

// The hooks
console.log('Generating the hooks...');
write('src/hooks/useAutoSave.ts', "import { useEffect, useRef } from 'react';\n\nexport function useAutoSave(save: () => void, intervalMs = 60000) {\n  const saved = useRef(save);\n  saved.current = save;\n  useEffect(() => { const id = setInterval(() => saved.current(), intervalMs); return () => clearInterval(id); }, [intervalMs]);\n}\n");
write('src/hooks/useDebounce.ts', "import { useEffect, useState } from 'react';\n\nexport function useDebounce<T>(value: T, delay = 300): T { const [v, setV] = useState(value); useEffect(() => { const id = setTimeout(() => setV(value), delay); return () => clearTimeout(id); }, [value, delay]); return v; }\n");
write('src/hooks/useNotifications.ts', "import { useState, useEffect } from 'react';\nimport { notificationsApi } from '../api/notifications';\n\nexport function useNotifications() {\n  const [count, setCount] = useState(0);\n  useEffect(() => { notificationsApi.unreadCount().then((r: any) => setCount(r.count ?? 0)).catch(() => {}); }, []);\n  return { count, setCount };\n}\n");
write('src/hooks/usePlanGate.ts', "import { usePlan } from '../contexts/PlanContext';\n\nexport function usePlanGate(feature: string) { const { hasFeature } = usePlan(); return hasFeature(feature); }\n");

console.log('Phase 4 generated.');
