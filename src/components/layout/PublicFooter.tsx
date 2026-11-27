import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../shared/Logo";
import {
  ChatGptIcon,
  ClaudeIcon,
  FacebookIcon,
  GeminiIcon,
  InstagramIcon,
  PerplexityIcon,
  ThreadsIcon,
  XIcon,
  YoutubeIcon,
} from "../shared/BrandIcons";
import { marketingApi } from "../../api/public";
import { emailSchema } from "../../lib/validators";
import { errorMessage } from "../../lib/errors";
import { PUBLIC_EMAILS, mailto } from "../../lib/contact";
import { ApiError } from "../../types/api";

type EnvKey =
  | "VITE_X_URL"
  | "VITE_IG_URL"
  | "VITE_FB_URL"
  | "VITE_THREADS_URL"
  | "VITE_YT_URL"
  | "VITE_CHATGPT_PROMPT_URL"
  | "VITE_PERPLEXITY_PROMPT_URL"
  | "VITE_CLAUDE_PROMPT_URL"
  | "VITE_GEMINI_PROMPT_URL";

function env(key: EnvKey): string {
  const value = import.meta.env[key] as string | undefined;
  return (value || "").trim();
}

const ASSISTANTS: { name: string; key: EnvKey; Icon: typeof ChatGptIcon }[] = [
  { name: "ChatGPT", key: "VITE_CHATGPT_PROMPT_URL", Icon: ChatGptIcon },
  { name: "Perplexity", key: "VITE_PERPLEXITY_PROMPT_URL", Icon: PerplexityIcon },
  { name: "Claude", key: "VITE_CLAUDE_PROMPT_URL", Icon: ClaudeIcon },
  { name: "Gemini", key: "VITE_GEMINI_PROMPT_URL", Icon: GeminiIcon },
];

const SOCIALS: { name: string; key: EnvKey; Icon: typeof XIcon }[] = [
  { name: "X", key: "VITE_X_URL", Icon: XIcon },
  { name: "Instagram", key: "VITE_IG_URL", Icon: InstagramIcon },
  { name: "Facebook", key: "VITE_FB_URL", Icon: FacebookIcon },
  { name: "Threads", key: "VITE_THREADS_URL", Icon: ThreadsIcon },
  { name: "YouTube", key: "VITE_YT_URL", Icon: YoutubeIcon },
];

export function PublicFooter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [doneMessage, setDoneMessage] = useState("You're subscribed.");
  const [error, setError] = useState("");

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setState("loading");
    try {
      const response = await marketingApi.newsletter(email);
      setDoneMessage(
        response.already_subscribed
          ? "You're already subscribed. Nothing else to do."
          : "You're subscribed. No confirmation email is needed.",
      );
      setState("done");
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(errorMessage(apiError.code, apiError.message));
      setState("idle");
    }
  };



  return (
    <footer className="pub-footer">
      <div className="foot-grid">
        <div className="foot-col">
          <div style={{ marginBottom: 16 }}>
            <Logo />
          </div>
          <p style={{ maxWidth: 250 }}>
            Your work should speak, not you. A thread, not disconnected workflows.
          </p>
          <a
            href={mailto(PUBLIC_EMAILS.hello)}
            style={{ display: "inline-block", marginTop: 14, fontSize: 14 }}
          >
            {PUBLIC_EMAILS.hello}
          </a>
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
          <Link to="/solutions">Solutions</Link>
          <Link to="/announcements">Announcements</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/beta">Beta</Link>
        </div>
        <div className="foot-col">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/security">Security</Link>
        </div>
        <div className="foot-col">
          <h4>Stay in the loop</h4>
          {state === "done" ? (
            <p className="caption" role="status">
              {doneMessage}
            </p>
          ) : (
            <form className="subscribe" onSubmit={subscribe} noValidate>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div style={{ flex: 1, minWidth: 0 }}>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "footer-email-error" : undefined}
                  required
                />
                {error && (
                  <span className="error" id="footer-email-error" role="alert">
                    {error}
                  </span>
                )}
              </div>
              <button type="submit" className="btn btn-secondary btn-sm" disabled={state === "loading"}>
                {state === "loading" ? "…" : "Subscribe"}
              </button>
            </form>
          )}
          <p className="caption" style={{ marginTop: 6 }}>
            Optional. Product updates only, never the activation emails.
          </p>

          <div style={{ marginTop: 20 }}>
            <h4>Explain Revercue with</h4>
            <div className="assistant-links">
              {ASSISTANTS.map((assistant) => {
                const href = env(assistant.key);
                const icon = <assistant.Icon size={18} />;
                return href ? (
                  <a
                    key={assistant.name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={assistant.name}
                    title={assistant.name}
                    className="assistant-link"
                  >
                    {icon}
                  </a>
                ) : (
                  <span
                    key={assistant.name}
                    className="assistant-link is-empty"
                    role="img"
                    aria-label={assistant.name}
                    title={`Set ${assistant.key} in the environment`}
                  >
                    {icon}
                  </span>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      <div className="foot-ai">
        <span className="foot-ai-label">For AI agents</span>
        <a href="/faqs-for-ai">AI FAQs</a>
        <a href="/rules-for-ai">Rules for AI</a>
        <a href="/ai-access">Access guide</a>
        <a href="/ai-overview">Product overview</a>
        <a href="/ai-demo">Demo and tutorial</a>
        <a href="/ai-changelog">Changelog</a>
        <a href="/ai-capabilities.json">Capabilities JSON</a>
        <a href="/llms.txt">llms.txt</a>
      </div>
      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} Revercue. Your data is yours.</span>
        <div className="socials">
          {SOCIALS.map((social) => {
            const href = env(social.key);
            const icon = <social.Icon size={18} />;
            return href ? (
              <a
                key={social.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="social"
              >
                {icon}
              </a>
            ) : (
              <span
                key={social.name}
                className="social is-empty"
                role="img"
                aria-label={social.name}
                title={`Set ${social.key} in the environment`}
              >
                {icon}
              </span>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
