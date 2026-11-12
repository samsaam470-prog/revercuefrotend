const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'HomePage', template: 'home', out: 'src/pages/public/HomePage.tsx' },
  { name: 'FeaturesPage', title: 'Features', subtitle: 'Everything the thread needs. Nothing it doesn\'t.', out: 'src/pages/public/FeaturesPage.tsx' },
  { name: 'PricingPage', title: 'Pricing', subtitle: 'Start free. Upgrade when the thread pays for itself.', out: 'src/pages/public/PricingPage.tsx' },
  { name: 'ComparePage', title: 'Compare', subtitle: 'The thread vs. the stack of tools you\'re using now.', out: 'src/pages/public/ComparePage.tsx' },
  { name: 'GuidesPage', title: 'Guides', subtitle: 'How to run the thread, from proposal to payment.', out: 'src/pages/public/GuidesPage.tsx' },
  { name: 'GuideDetailPage', title: 'Guide', subtitle: 'How to run the thread.', out: 'src/pages/public/GuideDetailPage.tsx' },
  { name: 'AboutPage', title: 'About', subtitle: 'Why Revercue exists.', out: 'src/pages/public/AboutPage.tsx' },
  { name: 'ContactPage', title: 'Contact', subtitle: 'We read every message.', out: 'src/pages/public/ContactPage.tsx' },
  { name: 'BlogPage', title: 'Blog', subtitle: 'Notes on the thread.', out: 'src/pages/public/BlogPage.tsx' },
  { name: 'BlogPostPage', title: 'Post', subtitle: 'Notes on the thread.', out: 'src/pages/public/BlogPostPage.tsx' },
  { name: 'BetaPage', title: 'Beta', subtitle: 'Help shape the thread.', out: 'src/pages/public/BetaPage.tsx' },
  { name: 'PrivacyPage', title: 'Privacy', subtitle: 'What we collect, how we use it, who we share it with.', out: 'src/pages/public/PrivacyPage.tsx' },
  { name: 'TermsPage', title: 'Terms', subtitle: 'The service, your account, the acceptable use.', out: 'src/pages/public/TermsPage.tsx' },
  { name: 'SecurityPage', title: 'Security', subtitle: 'The encryption, the storage, the retention.', out: 'src/pages/public/SecurityPage.tsx' },
];

const visuals = [
  { name: 'DashboardVisual', label: 'Dashboard', scale: 0.5 },
  { name: 'BuilderVisual', label: 'Builder', scale: 0.5 },
  { name: 'ProposalVisual', label: 'Proposal', scale: 0.4 },
  { name: 'InvoiceVisual', label: 'Invoice', scale: 0.4 },
  { name: 'ContractVisual', label: 'Contract', scale: 0.4 },
  { name: 'FormVisual', label: 'Form', scale: 0.4 },
  { name: 'CrmVisual', label: 'CRM', scale: 0.4 },
  { name: 'ChartVisual', label: 'Chart', scale: 1 },
  { name: 'SuggestionVisual', label: 'Suggestion', scale: 1 },
  { name: 'CodeScreenVisual', label: 'Code Screen', scale: 0.6 },
  { name: 'SecurityVisual', label: 'Security', scale: 0.5 },
  { name: 'PricingVisual', label: 'Pricing', scale: 0.5 },
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

const homeTpl = fs.readFileSync('templates/home.hbs', 'utf8');
const pageTpl = fs.readFileSync('templates/page.hbs', 'utf8');
const visualTpl = fs.readFileSync('templates/visual.hbs', 'utf8');
const layoutTpl = fs.readFileSync('templates/layout.hbs', 'utf8');

console.log('Generating pages...');
for (const p of pages) {
  if (p.template === 'home') {
    write(p.out, homeTpl);
  } else {
    write(p.out, render(pageTpl, { NAME: p.name, TITLE: p.title, SUBTITLE: p.subtitle }));
  }
}

console.log('Generating visuals...');
for (const v of visuals) {
  write(`src/components/visuals/${v.name}.tsx`, render(visualTpl, { NAME: v.name, LABEL: v.label, SCALE: v.scale }));
}

console.log('Generating layouts...');
write('src/components/layout/PublicLayout.tsx', layoutTpl);
write('src/components/layout/PublicHeader.tsx', 'export function PublicHeader() { return (<header className="public-header"><a href="/" className="logo">[R] Revercue</a><nav><a href="/features">Features</a><a href="/pricing">Pricing</a><a href="/compare">Compare</a><a href="/guides">Guides</a><a href="/about">About</a><a href="/blog">Blog</a></nav><div><a href="/login" className="btn btn-ghost">Log in</a><a href="/signup" className="btn btn-primary">Start Free</a></div></header>); }');
write('src/components/layout/PublicFooter.tsx', 'export function PublicFooter() { return (<footer className="public-footer"><div className="footer-cols"><div><strong>[R] Revercue</strong><p>Your work should speak, not you.</p></div><div><strong>Product</strong><a href="/features">Features</a><a href="/pricing">Pricing</a><a href="/compare">Compare</a><a href="/guides">Guides</a></div><div><strong>Company</strong><a href="/about">About</a><a href="/blog">Blog</a><a href="/contact">Contact</a><a href="/beta">Beta</a></div><div><strong>Legal</strong><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/security">Security</a></div></div><div className="footer-bottom"><p>© 2026 Revercue.</p><div className="footer-ai"><span>Ask about Revercue on:</span><a href="https://chat.openai.com/?q=Explain+Revercue" target="_blank" rel="noopener">ChatGPT</a><a href="https://www.perplexity.ai/?q=Explain+Revercue" target="_blank" rel="noopener">Perplexity</a><a href="https://claude.ai/new?q=Explain+Revercue" target="_blank" rel="noopener">Claude</a><a href="https://gemini.google.com/app?q=Explain+Revercue" target="_blank" rel="noopener">Gemini</a></div></div></footer>); }');
write('src/components/layout/StartFreeBand.tsx', 'export function StartFreeBand() { return (<section className="start-free-band"><h2 className="headline">Ready to stop losing the thread?</h2><p className="body-secondary">One link. One thread. From proposal to payment.</p><div className="cta-row"><a href="/signup" className="btn btn-primary">Start Free</a><a href="/pricing" className="btn btn-ghost">See Pricing</a></div></section>); }');

console.log('Generating content...');
const faqs = Array.from({ length: 100 }, (_, i) => ({ q: 'Question ' + (i + 1), a: 'Answer for question ' + (i + 1) + '.' }));
write('src/data/faqs.ts', 'export const faqs = ' + JSON.stringify(faqs, null, 2) + ';');
write('src/data/guides.ts', 'export const guides = ' + JSON.stringify(Array.from({ length: 17 }, (_, i) => ({ slug: 'guide-' + (i + 1), title: 'Guide ' + (i + 1) })), null, 2) + ';');
write('src/data/blog.ts', 'export const posts = ' + JSON.stringify(Array.from({ length: 3 }, (_, i) => ({ slug: 'post-' + (i + 1), title: 'Post ' + (i + 1) })), null, 2) + ';');

console.log('Phase 1 generated.');
