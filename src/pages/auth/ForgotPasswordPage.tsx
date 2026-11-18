import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";
import { AUTHACTION_DOMAIN } from "../../lib/authaction";

/**
 * AuthAction owns password recovery. Its hosted form exposes the
 * "Forgot password?" flow, and it publishes no public reset-code endpoint for
 * a custom frontend, so this page opens that flow instead of calling one.
 */
export function ForgotPasswordPage() {
  const sdk = useAuthAction();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const start = async () => {
    setError("");
    setLoading(true);
    try {
      await sdk.loginWithRedirect({ authorizationParams: { prompt: "login" } });
    } catch (cause) {
      setLoading(false);
      setError((cause as Error)?.message || "Could not open the password reset flow.");
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Password reset</p>
      <h1>Reset your Revercue password.</h1>
      <p className="lede">
        Revercue doesn&apos;t hold passwords, so the reset starts with AuthAction at{" "}
        <span className="auth-host">{AUTHACTION_DOMAIN}</span>. Open the secure form, choose
        &ldquo;Forgot password?&rdquo;, and AuthAction emails you a reset link.
      </p>
      <div className="auth-form">
        {error && (
          <p className="auth-form-error" role="alert">
            {error}
          </p>
        )}
        <Button onClick={start} loading={loading} fullWidth>
          <KeyRound size={16} aria-hidden="true" />
          Open secure password reset
        </Button>
      </div>
      <p className="auth-hint mt-4">
        Your new password is set with AuthAction. Nothing changes in Revercue until AuthAction
        confirms the reset.
      </p>
      <p className="auth-alt">
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
}
