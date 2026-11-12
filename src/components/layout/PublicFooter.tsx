import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../shared/Logo";
import { FOOTER_ASSISTANT_PROMPT } from "../../lib/constants";

const ASSISTANTS = [
  { name: "ChatGPT", url: "https://chat.openai.com/", slug: "ChatGPT" },
  { name: "Perplexity", url: "https://www.perplexity.ai/", slug: "Perplexity" },
  { name: "Claude", url: "https://claude.ai/", slug: "Claude" },
  { name: "Gemini", url: "https://gemini.google.com/", slug: "Gemini" },
];

export function PublicFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="pub-footer">
      <div className="foot-grid">
        <div className="foot-col">
          <div style={{ marginBottom: 16 }}>
            <Logo />
          </div>
          <p style={{ maxWidth: 240 }}>
            Your work should speak, not you. A thread, not disconnected workflows.
          </p>
        </div>
        <div className="foot-col">
          <h4>Product</h4>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/guides">Guides</Link>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/beta">Beta</Link>
        </div>
        <div className="foot-col">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/security">Security</Link>
          <a href="mailto:hello@revercue.com">hello@revercue.com</a>
        </div>
        <div className="foot-col">
          <h4>Stay in the loop</h4>
          {subscribed ? (
            <p className="caption">Thanks. You're in.</p>
          ) : (
            <form
              className="subscribe"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email) return;
                setSubscribed(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@studio.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                Subscribe
              </button>
            </form>
          )}
          <div style={{ marginTop: 20 }}>
            <h4>Explain Revercue with</h4>
            <div className="inline">
              {ASSISTANTS.map((assistant) => (
                <a
                  key={assistant.slug}
                  className="caption"
                  href={`${assistant.url}?q=${encodeURIComponent(FOOTER_ASSISTANT_PROMPT)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={`Open ${assistant.name} with a pre-filled prompt`}
                >
                  {assistant.name}
                </a>
              ))}
            </div>
            <p className="caption" style={{ marginTop: 8 }}>
              These open an external tool with a prompt we wrote. The answer comes from the tool, not
              from Revercue.
            </p>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} Revercue. Your data is yours.</span>
        <div className="socials">
          <a href="https://x.com" target="_blank" rel="noreferrer noopener" aria-label="X">
            X
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
