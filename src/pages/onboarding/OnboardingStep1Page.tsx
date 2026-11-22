import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, User } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { onboardingApi } from "../../api/onboarding";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { errorMessage } from "../../lib/errors";
import { onboardingResumePath } from "../../lib/onboarding";
import { ApiError } from "../../types/api";
import type { AccountType } from "../../types";

export function OnboardingStep1Page() {
  const [choice, setChoice] = useState<AccountType | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refresh, user } = useAuth();
  const toast = useToast();

  /* A returning user must resume where the backend says, not redo step 1. */
  useEffect(() => {
    if ((user?.onboarding_step ?? 0) > 1) {
      navigate(onboardingResumePath(user), { replace: true });
    }
  }, [user, navigate]);

  const submit = async () => {
    if (!choice) return;
    if (user?.email_missing && !email.trim()) {
      setError("Enter the email address for this account.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onboardingApi.step1(choice, user?.email_missing ? email.trim() || undefined : undefined);
      await refresh();
      navigate("/onboarding/step-2");
    } catch (cause) {
      const apiError = cause as ApiError;
      const message = apiError.message || errorMessage(apiError.code, apiError.message);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-card">
      <div className="steps-indicator">
        <span className="done" />
        <span />
        <span />
        <span />
      </div>
      <p className="eyebrow">Step 1 of 4</p>
      <h1>Which kind of work is this?</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        It changes the profile fields and the plan recommendation. You can change it later.
      </p>

      {user?.email_missing && (
        <div style={{ marginBottom: 24 }}>
          <Input
            id="onboarding-email"
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            required
            helper="AuthAction did not provide an email for this account. Add one so we can send documents and receipts."
          />
        </div>
      )}

      <div className="choice-grid">
        <button
          type="button"
          className={`choice-card${choice === "freelancer" ? " selected" : ""}`}
          onClick={() => setChoice("freelancer")}
          aria-pressed={choice === "freelancer"}
        >
          <User size={22} color="var(--gold)" />
          <b>Freelancer</b>
          <small>You, your services, your clients.</small>
        </button>
        <button
          type="button"
          className={`choice-card${choice === "agency" ? " selected" : ""}`}
          onClick={() => setChoice("agency")}
          aria-pressed={choice === "agency"}
        >
          <Building2 size={22} color="var(--gold)" />
          <b>Agency</b>
          <small>A team, a studio, or a small agency.</small>
        </button>
      </div>

      {error && <p className="notice notice-red mt-6">{error}</p>}

      <div className="between mt-8">
        <span className="caption">You can stop and come back; the step is saved at each Continue.</span>
        <Button onClick={submit} loading={loading} disabled={!choice}>
          Continue
        </Button>
      </div>
    </div>
  );
}
