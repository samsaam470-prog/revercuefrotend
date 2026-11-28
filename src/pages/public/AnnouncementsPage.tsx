import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ANNOUNCEMENTS } from "./announcementData";
import { formatDate } from "../../lib/formatters";
import { marketingApi } from "../../api/public";
import { emailSchema } from "../../lib/validators";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

export function AnnouncementsPage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [doneMessage, setDoneMessage] = useState("You're subscribed.");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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
          : "You're subscribed. New announcements will reach this address.",
      );
      setState("done");
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(errorMessage(apiError.code, apiError.message));
      setState("idle");
    }
  };

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: "var(--space-12)",
        }}
      >
        <div className="page-head" style={{ marginBottom: 0, maxWidth: 760 }}>
          <p className="eyebrow">Announcements</p>
          <h1>What changed at Revercue, and when.</h1>
          <p>Dated notes on releases, plans, checkout and what is still in beta or planning. Newest first.</p>
        </div>

        <div style={{ position: "relative", flexShrink: 0, marginLeft: "auto" }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            aria-expanded={open}
            aria-controls="announcements-subscribe"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Subscribe"}
          </button>

          {open && (
            <>
              <div
                aria-hidden="true"
                onClick={() => setOpen(false)}
                style={{ position: "fixed", inset: 0, zIndex: 190 }}
              />
              <div
                id="announcements-subscribe"
                className="card"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 10px)",
                  width: 320,
                  maxWidth: "calc(100vw - 40px)",
                  padding: 16,
                  zIndex: 191,
                  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.18)",
                }}
              >
                {state === "done" ? (
                  <p className="caption" role="status" style={{ margin: 0 }}>
                    {doneMessage}
                  </p>
                ) : (
                  <form className="subscribe" onSubmit={subscribe} noValidate>
                    <label htmlFor="announcements-email" className="sr-only">
                      Email address
                    </label>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <input
                        ref={inputRef}
                        id="announcements-email"
                        type="email"
                        placeholder="you@studio.com"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setError("");
                        }}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "announcements-email-error" : undefined}
                        required
                      />
                      {error && (
                        <span className="error" id="announcements-email-error" role="alert">
                          {error}
                        </span>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm" disabled={state === "loading"}>
                      {state === "loading" ? "…" : "Subscribe"}
                    </button>
                  </form>
                )}
                <p className="caption" style={{ margin: "8px 0 0" }}>
                  Product updates only. No confirmation email needed.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card-grid">
        {ANNOUNCEMENTS.map((item) => (
          <Link key={item.slug} to={`/announcements/${item.slug}`} className="link-card">
            <span className="badge badge-gold">{item.status}</span>
            <h3 style={{ marginTop: 12 }}>{item.title}</h3>
            <p>{item.summary.slice(0, 220)}…</p>
            <p className="caption mt-4">{formatDate(item.date)} · Read more</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
