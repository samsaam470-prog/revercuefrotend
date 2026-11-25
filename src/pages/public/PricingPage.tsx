import { useState } from "react";
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
      return plan === "growth" || plan === "scale" || plan === "teams" ? "Yes" : "—";
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
      <div className="pricing-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Start free. Upgrade when the thread pays for itself.</h1>
        <p className="pricing-hero-sub">
          Free forever, or from $12 a month. Every plan is available today except Teams, which is in beta.
        </p>
      </div>

      <div className="pricing-trial-banner">
        <span className="trial-badge">
          <span className="trial-badge-dot" />
          Growth welcome
        </span>
        <div className="pricing-trial-banner-copy">
          <strong>14 days of Scale access, free with Growth</strong>
          <p>
            Growth opens with the full Scale feature set — interest level, advanced tracking and the custom thank-you
            page — then continues as Growth at $29/month. No extra charge for the trial.
          </p>
        </div>
      </div>

      <div className="plan-grid">
        {PLANS.filter((plan) => plan.id !== "teams").map((plan) => {
          const features = plan.id === "growth" ? plan.features.slice(1, 6) : plan.features.slice(0, 5);
          return (
            <div key={plan.id} className={`plan-card${plan.id === "growth" ? " featured" : ""}`}>
              <div className="plan-card-heading">
                <strong>{plan.name}</strong>
                {plan.id === "growth" && <span className="plan-ribbon">14 days of Scale free</span>}
              </div>

              <div className="plan-price">
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
                <p className="role">{plan.role}</p>
              </div>

              <ul>
                {features.map((feature) => (
                  <li key={feature}>
                    <Check size={13} /> <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="plan-card-foot">
                <span
                  className={`badge plan-status-badge ${plan.status === "available" ? "badge-green" : "badge-amber"}`}
                >
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
                    className="btn btn-primary btn-sm btn-full pricing-cta"
                    disabled={checkingOut}
                    onClick={() => void startCheckout(plan.id)}
                  >
                    {checkingOut ? "Starting..." : `Choose ${plan.name}`}
                  </button>
                ) : (
                  <AuthActionStart className="btn btn-primary btn-sm btn-full pricing-cta">
                    Choose {plan.name}
                  </AuthActionStart>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="plan-beta-strip">
        <div className="plan-beta-strip-copy">
          <strong>Teams</strong>
          <p>
            Everything on Scale plus the handoff dashboard, roles and attribution, bulk transfer and audit log. In beta
            and free while it stays in beta.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm pricing-cta pricing-cta-secondary"
          onClick={() => setWaitlist({ plan: "teams" })}
        >
          Join the beta
        </button>
      </div>

      <p className="pricing-footnote">
        Prices are in US dollars, billed monthly through Whop. Cancel any time; downgrades take effect at the end of the
        cycle. Teams is free while it stays in beta.
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
