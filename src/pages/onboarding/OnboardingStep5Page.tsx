import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { onboardingApi } from "../../api/onboarding";
import { PLANS } from "../../lib/constants";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { WaitlistModal } from "../../components/shared/WaitlistModal";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { PlanName } from "../../types";

const RECOMMENDED: Record<string, PlanName> = {
  "1–3": "free",
  "4–10": "starter",
  "11–20": "growth",
  "20+": "scale",
};

export function OnboardingStep5Page() {
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const toast = useToast();
  const [plan, setPlan] = useState<PlanName>("free");
  const [waitlistPlan, setWaitlistPlan] = useState<PlanName | null>(null);
  const [requested, setRequested] = useState<PlanName | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const volume = sessionStorage.getItem("revercue_volume") || "4–10";
  const recommended = RECOMMENDED[volume] ?? "free";

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      if (requested) {
        await onboardingApi.step5({
          plan: "waitlist",
          plan_requested: requested as "starter" | "growth" | "scale",
        });
      } else {
        await onboardingApi.step5({ plan: "free" });
      }
      await refresh();
      navigate("/dashboard?tutorial=1", { replace: true });
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(errorMessage(apiError.code, apiError.message));
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-card">
      <div className="steps-indicator">
        <span className="done" />
        <span className="done" />
        <span className="done" />
        <span className="done" />
      </div>
      <p className="eyebrow">Step 4 of 4</p>
      <h1>Pick a plan to start on.</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        Free is available now, no invitation needed. Starter, Growth and Scale are invite-only: join
        the waitlist and the team reaches out when a spot opens. Teams is in beta.
      </p>

      <div className="plan-mini-grid">
        {PLANS.map((option) => {
          const isSelected = plan === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={`plan-mini${isSelected ? " selected" : ""}`}
              onClick={() => {
                setPlan(option.id);
                setRequested(option.status === "waitlist" || option.status === "beta" ? option.id : null);
                if (option.status !== "available") setWaitlistPlan(option.id);
              }}
              aria-pressed={isSelected}
            >
              <b>{option.name}</b>
              {option.price === null ? `$${option.base} base` : option.price === 0 ? "Free" : `$${option.price}/mo`}
              <span style={{ display: "block", marginTop: 4 }}>
                {option.status === "available" ? "available now" : option.status === "beta" ? "in beta" : "waitlist"}
              </span>
              {recommended === option.id && (
                <span className="badge badge-gold" style={{ marginTop: 6 }}>
                  Recommended
                </span>
              )}
              {isSelected && <Check size={14} color="var(--gold)" style={{ marginTop: 6 }} />}
            </button>
          );
        })}
      </div>

      <p className="caption mt-4">
        {requested
          ? `You will start on Free today and keep your place on the ${requested} waitlist.`
          : "You will start on Free today. You can request a plan later from Settings → Plan."}
      </p>

      {error && <p className="notice notice-red mt-6">{error}</p>}

      <div className="between mt-8">
        <span className="caption">No credit card. Nothing is charged today.</span>
        <Button onClick={submit} loading={loading}>
          Continue to the dashboard
        </Button>
      </div>

      <WaitlistModal
        open={Boolean(waitlistPlan)}
        onClose={() => setWaitlistPlan(null)}
        plan={waitlistPlan ?? undefined}
      />
    </div>
  );
}
