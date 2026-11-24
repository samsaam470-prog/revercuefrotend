import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, X } from "lucide-react";
import { PLANS, formatStorage } from "../../lib/constants";
import { PUBLIC_EMAILS, mailto } from "../../lib/contact";
import { faqsByGroup } from "../../lib/faqs";
import { FAQItem } from "../../components/shared/FAQItem";
import { WaitlistModal } from "../../components/shared/WaitlistModal";
import type { PlanName } from "../../types";
import { AuthActionStart } from "../../components/auth/AuthActionStart";
import { useAuth } from "../../hooks/useAuth";
import { settingsApi } from "../../api/settings";

const ROWS: { label: string; key: keyof (typeof PLANS)[0]["limits"] | "password" | "interest" | "suggestions" | "brand" | "thankyou" | "revenue" | "expenses" | "expense_categories" }[] = [
  { label: "Active documents", key: "active_documents" },
  { label: "Document retention (months)", key: "retention_months" },
  { label: "Draft retention (days)", key: "draft_retention_days" },
  { label: "Archive (count / days)", key: "archive_count" },
  { label: "Storage", key: "storage_gb" },
  { label: "Notes per client", key: "notes_per_client" },
  { label: "Custom templates", key: "custom_templates" },
  { label: "Saved FAQs", key: "saved_faqs" },
  { label: "Saved packages", key: "saved_packages" },
  { label: "Password-protected documents", key: "password" },
  { label: "Adaptive forms", key: "adaptive_forms" },
  { label: "Revenue overview", key: "revenue" },
  { label: "Interest level", key: "interest" },
  { label: "Project expenses", key: "expenses" },
  { label: "Expense categorisation", key: "expense_categories" },
  { label: "Document suggestions", key: "suggestions" },
  { label: "No Revercue branding", key: "brand" },
  { label: "Custom thank-you page", key: "thankyou" },
];

function cell(plan: PlanName, key: (typeof ROWS)[0]["key"]): string {
  const definition = PLANS.find((plan_) => plan_.id === plan);
  if (!definition) return "—";
  switch (key) {
    case "password":
      return plan === "free" || plan === "starter" ? "—" : `${definition.limits.password_protected}`;
    case "revenue":
      return "Yes";
    case "interest":
      return plan === "scale" || plan === "teams" ? "Yes" : "—";
    case "expenses":
      return plan === "growth" || plan === "scale" || plan === "teams" ? "Yes" : "—";
    case "expense_categories":
      return plan === "scale" || plan === "teams" ? "Yes" : "—";
    case "suggestions":
      if (plan === "free" || plan === "starter") return "Basic";
      if (plan === "growth") return "Basic + saved";
      return "Advanced";
    case "brand":
      return plan === "free" || plan === "starter" ? "—" : "Yes";
    case "thankyou":
      return plan === "scale" || plan === "teams" ? "Yes" : "—";
    default: {
      const value = definition.limits[key];
      if (value === null) return "Unlimited";
      if (key === "storage_gb") return formatStorage(value);
      if (value >= 999) return "Unlimited";
      return String(value);
    }
  }
}

export function PricingPage() {
  const { isAuthenticated, refresh } = useAuth();
  const [waitlist, setWaitlist] = useState<{ plan: PlanName } | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const billingFaqs = faqsByGroup(["plans"]);

  const startCheckout = async (planId: PlanName) => {
    setCheckingOut(true);
    try {
      const res = await settingsApi.billingCheckout(planId);
      setCheckoutUrl(res.checkout_url);
    } catch (e) {
      alert("Could not start checkout. Please sign in and try again.");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="page page-wide">
      <div className="page-head text-center" style={{ margin: "0 auto 48px" }}>
        <p className="eyebrow">Pricing</p>
        <h1>Start free. Upgrade when the thread pays for itself.</h1>
        <p>
          Free is available now. Starter, Growth and Scale are available through Whop checkout. Growth includes a
          limited-time 14-day free trial. Teams is in beta.
        </p>
      </div>

      <div className="plan-grid">
        {PLANS.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`plan-card${plan.status === "beta" ? " dimmed" : ""}${plan.id === "growth" ? " featured" : ""}`}
            >
              <div className="plan-card-heading">
                <strong>{plan.name}</strong>
                {plan.id === "growth" && (
                  <span className="trial-badge">
                    <span className="trial-badge-dot" />
                    14-day free trial
                  </span>
                )}
              </div>
              <div>
                <div className="price">
                  {plan.price == null ? (
                    <>
                      Base ${plan.base ?? 0}
                      <span className="caption"> /mo</span>
                    </>
                  ) : (
                    <>
                      ${plan.price}
                      <span className="caption">{plan.price === 0 ? " free forever" : " /mo"}</span>
                    </>
                  )}
                </div>
                <div className="role">{plan.role}</div>
                <p className="plan-availability">
                  {plan.id === "growth"
                    ? "Try every Growth feature free for 14 days."
                    : plan.status === "available"
                      ? "Ready to use today"
                      : "Early access — join the beta"}
                </p>
              </div>
              <ul>
                {plan.features.slice(0, 5).map((feature) => (
                  <li key={feature}>
                    <Check size={13} /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="stack-2">
                <span className={`badge plan-status-badge ${plan.status === "available" ? "badge-green" : plan.status === "beta" ? "badge-amber" : "badge-muted"}`}>
                  {plan.statusLabel}
                </span>
                {plan.id === "free" ? (
                  <AuthActionStart className="btn btn-primary btn-sm btn-full pricing-cta">
                    Start free
                  </AuthActionStart>
                ) : plan.id === "teams" ? (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm btn-full pricing-cta pricing-cta-secondary"
                    onClick={() => setWaitlist({ plan: plan.id })}
                  >
                    Join the beta
                  </button>
                ) : isAuthenticated ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-full"
                    disabled={checkingOut}
                    onClick={() => void startCheckout(plan.id)}
                  >
                    {checkingOut ? "Starting..." : `Choose ${plan.name}`}
                  </button>
                ) : (
                  <AuthActionStart className="btn btn-primary btn-sm btn-full">
                    Choose {plan.name}
                  </AuthActionStart>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="caption text-center" style={{ marginTop: 16 }}>
        Prices are in US dollars, per month. Starter, Growth and Scale are available via Whop checkout.
        Growth includes a limited-time 14-day free trial. Teams is in beta; no charge applies while it remains in beta.
      </p>

      <section className="section">
        <div className="section-head">
          <h2>Compare every gate.</h2>
          <p>The full table, not a highlight reel.</p>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Feature</th>
                {PLANS.map((plan) => (
                  <th key={plan.id}>{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  {PLANS.map((plan) => {
                    const value = cell(plan.id, row.key);
                    return (
                      <td key={plan.id}>
                        {value === "Yes" ? (
                          <Check size={15} className="check-cell" />
                        ) : value === "—" ? (
                          <Minus size={15} className="cross-cell" />
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Billing questions.</h2>
        </div>
        <div className="faq-list">
          {billingFaqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <p className="caption text-center mt-6">
          <X size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> No refunds. Downgrades
          take effect at the end of the cycle and archive the documents above the new limit.
        </p>
        <p className="caption text-center">
          Billing and subscription questions:{" "}
          <a href={mailto(PUBLIC_EMAILS.billing)}>{PUBLIC_EMAILS.billing}</a>. Include the email on
          your account so we can find it.
        </p>
      </section>

      {checkoutUrl && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => {
            setCheckoutUrl(null);
            void refresh();
          }}
        >
          <div
            style={{ width: "90%", maxWidth: 520, height: "80vh", background: "#fff", borderRadius: 12, overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe src={checkoutUrl} title="Checkout" style={{ width: "100%", height: "100%", border: 0 }} />
          </div>
        </div>
      )}

      <WaitlistModal
        open={Boolean(waitlist)}
        onClose={() => setWaitlist(null)}
        plan={waitlist?.plan}
      />
    </div>
  );
}
