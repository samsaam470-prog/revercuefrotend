import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "../../components/ui/Checkbox";
import { Button } from "../../components/ui/Button";
import { onboardingApi } from "../../api/onboarding";
import { useAuth } from "../../hooks/useAuth";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

export function OnboardingStep4Page() {
  const [tos, setTos] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      await onboardingApi.step4({ tos_accepted: true, newsletter_opt_in: newsletter });
      await refresh();
      navigate("/onboarding/step-5");
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(errorMessage(apiError.code, apiError.message));
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
        <span />
      </div>
      <p className="eyebrow">Step 3 of 4</p>
      <h1>Two consents, stated plainly.</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        The Terms are required. The newsletter is not, and it is separate from the emails about your
        account.
      </p>

      <div className="stack-4">
        <Checkbox
          id="ob-tos"
          label={
            <>
              I accept the{" "}
              <Link to="/terms" target="_blank" style={{ color: "var(--gold)" }}>
                Terms
              </Link>{" "}
              and the{" "}
              <Link to="/privacy" target="_blank" style={{ color: "var(--gold)" }}>
                Privacy Policy
              </Link>
              .
            </>
          }
          checked={tos}
          onChange={setTos}
        />
        <Checkbox
          id="ob-newsletter"
          label="Send me product updates (optional)"
          checked={newsletter}
          onChange={setNewsletter}
        />
        {!tos && (
          <p className="notice notice-red">You must accept the Terms to continue.</p>
        )}
      </div>

      {error && <p className="notice notice-red mt-6">{error}</p>}

      <div className="between mt-8">
        <span className="caption">You can change the newsletter choice in Settings.</span>
        <Button onClick={submit} loading={loading} disabled={!tos}>
          Continue
        </Button>
      </div>
    </div>
  );
}
