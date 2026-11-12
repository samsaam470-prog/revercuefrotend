const fs = require('fs');
const path = require('path');

const uiComponents = [
  { name: 'Button', css: 'btn' },
  { name: 'Input', css: 'input' },
  { name: 'Textarea', css: 'textarea' },
  { name: 'Select', css: 'select' },
  { name: 'Checkbox', css: 'checkbox' },
  { name: 'Fieldset', css: 'fieldset' },
  { name: 'Card', css: 'card' },
  { name: 'Badge', css: 'badge' },
  { name: 'Modal', css: 'modal' },
  { name: 'Table', css: 'table' },
  { name: 'Toast', css: 'toast' },
  { name: 'Spinner', css: 'spinner' },
  { name: 'EmptyState', css: 'empty-state' },
  { name: 'Skeleton', css: 'skeleton' },
  { name: 'CodeVisual', css: 'code-visual' },
];

const layouts = [
  { name: 'PublicLayout', body: 'public', inner: '<PublicHeader /><main>{children}</main><PublicFooter />' },
  { name: 'AuthLayout', body: 'auth', inner: '<main className="auth-main">{children}</main>' },
  { name: 'AppLayout', body: 'app', inner: '<AppHeader /><div className="app-body"><AppSidebar /><main>{children}</main></div>' },
  { name: 'ClientLayout', body: 'client', inner: '<main className="client-main">{children}</main>' },
  { name: 'AdminLayout', body: 'admin', inner: '<AdminHeader /><div className="admin-body"><AdminSidebar /><main>{children}</main></div>' },
  { name: 'AppSidebar', body: 'sidebar', inner: '<nav>{children}</nav>' },
];

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

const uiTpl = fs.readFileSync('templates/ui.hbs', 'utf8');
const layoutTpl = fs.readFileSync('templates/layout.hbs', 'utf8');

console.log('Generating the design system...');
for (const c of uiComponents) {
  write(`src/components/ui/${c.name}.tsx`, render(uiTpl, { NAME: c.name, CSS_CLASS: c.css }));
}
write('src/components/ui/index.ts', uiComponents.map((c) => `export { ${c.name} } from './${c.name}';`).join('\n') + '\n');

console.log('Generating the layouts...');
for (const l of layouts) {
  if (l.name === 'PublicLayout') {
    write('src/components/layout/PublicLayout.tsx', "import { ReactNode } from 'react';\nimport { PublicHeader } from './PublicHeader';\nimport { PublicFooter } from './PublicFooter';\n\nexport function PublicLayout({ children }: { children: ReactNode }) {\n  return (<div className=\"public-layout\"><PublicHeader /><main>{children}</main><PublicFooter /></div>);\n}\n");
  } else {
    write(`src/components/layout/${l.name}.tsx`, render(layoutTpl, { NAME: l.name, CSS_CLASS: l.body, BODY: l.inner }));
  }
}

console.log('Generating the shared components...');
write('src/components/shared/Logo.tsx', 'export function Logo() { return (<a href="/" className="logo">[R] Revercue</a>); }\n');
write('src/components/shared/FAQItem.tsx', 'export function FAQItem({ q, a }: { q: string; a: string }) { return (<details className="faq-item"><summary>{q}</summary><p>{a}</p></details>); }\n');
write('src/components/shared/NotificationBell.tsx', 'export function NotificationBell({ count = 0 }: { count?: number }) { return (<button className="bell" aria-label="Notifications">{count > 0 && <span className="badge">{count}</span>}</button>); }\n');
write('src/components/shared/StatusBadge.tsx', 'export function StatusBadge({ status }: { status: string }) { return <span className={`status status-${status}`}>{status}</span>; }\n');
write('src/components/shared/PlanBadge.tsx', 'export function PlanBadge({ plan }: { plan: string }) { return <span className={`plan plan-${plan}`}>{plan}</span>; }\n');

console.log('Generating the footer (the four external AI buttons)...');
write('src/components/layout/PublicFooter.tsx', `import { FooterButtons } from '../shared/FooterButtons';

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="footer-cols">
        <div><strong>[R] Revercue</strong><p>Your work should speak, not you.</p></div>
        <div><strong>Product</strong><a href="/features">Features</a><a href="/pricing">Pricing</a><a href="/compare">Compare</a><a href="/guides">Guides</a></div>
        <div><strong>Company</strong><a href="/about">About</a><a href="/blog">Blog</a><a href="/contact">Contact</a><a href="/beta">Beta</a></div>
        <div><strong>Legal</strong><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/security">Security</a></div>
      </div>
      <FooterButtons />
      <div className="footer-bottom"><p>© 2026 Revercue. All rights reserved.</p></div>
    </footer>
  );
}
`);

write('src/components/shared/FooterButtons.tsx', `const PROMPT = encodeURIComponent("Explain Revercue: a freelancer tool for the thread from proposal to contract to invoice to CRM. The tagline is 'Your work should speak, not you.' The thesis is 'a thread, not disconnected workflows.' The Free plan is available now. The paid plans (Starter, Growth, Scale) are invite-only — join the waitlist. Teams is in beta — join the beta. The product does not use AI; it uses patterns. Answer in 2-3 sentences.");

export function FooterButtons() {
  return (
    <div className="footer-ai">
      <span>Ask about Revercue on your AI tool:</span>
      <a href={\`https://chat.openai.com/?q=\${PROMPT}\`} target="_blank" rel="noopener noreferrer">ChatGPT</a>
      <a href={\`https://www.perplexity.ai/?q=\${PROMPT}\`} target="_blank" rel="noopener noreferrer">Perplexity</a>
      <a href={\`https://claude.ai/new?q=\${PROMPT}\`} target="_blank" rel="noopener noreferrer">Claude</a>
      <a href={\`https://gemini.google.com/app?q=\${PROMPT}\`} target="_blank" rel="noopener noreferrer">Gemini</a>
    </div>
  );
}
`);

console.log('Generating the content data...');
const faqs = Array.from({ length: 100 }, (_, i) => ({ q: 'Question ' + (i + 1), a: 'Answer for question ' + (i + 1) + '.' }));
write('src/data/faqs.ts', 'export const faqs = ' + JSON.stringify(faqs, null, 2) + ';\n');
write('src/data/guides.ts', 'export const guides = ' + JSON.stringify(Array.from({ length: 17 }, (_, i) => ({ slug: 'guide-' + (i + 1), title: 'Guide ' + (i + 1), excerpt: 'How to run the thread.' })), null, 2) + ';\n');
write('src/data/blog.ts', 'export const posts = ' + JSON.stringify(Array.from({ length: 3 }, (_, i) => ({ slug: 'post-' + (i + 1), title: 'Post ' + (i + 1), date: '2026-11-12', excerpt: 'Notes on the thread.' })), null, 2) + ';\n');

console.log('Phase 3 generated.');
