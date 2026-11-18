import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";
import { AUTHACTION_DOMAIN } from "../../lib/authaction";

/**
 * AuthAction owns password recovery.
 *
 * The hosted reset page (`/oauth2/forgot-password`) is only reachable with the
 * `state` token that `/oauth2/authorize` mints for an in-flight sign-in, so it
 * cannot be deep-linked from here — a request without `state` returns the
 * tenant's error page. This page therefore starts the hosted sign-in, and the
 * user chooses "Forgot password?" on that page, which opens the same flow with
 * a valid state. Nothing here claims an email was sent, because nothing here
 * can know that.
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
        Revercue doesn&apos;t hold passwords, so the reset is handled by AuthAction at{" "}
        <span className="auth-host">{AUTHACTION_DOMAIN}</span>. Sign-in opens on AuthAction&apos;s
        page: choose &ldquo;Forgot password?&rdquo; under the email field. If that address has an
        account, AuthAction sends the reset link itself.
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
        The reset email comes from AuthAction, not from Revercue — check the spam folder too.
        Your new password is set with AuthAction; nothing changes in Revercue until AuthAction
        confirms the reset.
      </p>
      <p className="auth-alt">
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
}
