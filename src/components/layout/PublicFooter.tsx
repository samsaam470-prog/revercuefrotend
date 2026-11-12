import { FooterButtons } from '../shared/FooterButtons';

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
