import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";

/**
 * AuthAction owns password recovery. Its hosted sign-in page exposes the
 * "Forgot password?" flow, so this page starts the hosted flow rather than
 * calling the retired Revercue reset-code endpoints.
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
      <h1>Reset your password.</h1>
      <p className="lede">
        Password resets are handled by Revercue&apos;s authentication provider. Open the
        secure sign-in page and choose &ldquo;Forgot password?&rdquo; to receive a reset link.
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
      <p className="caption mt-4">
        Revercue never sees your password, and a reset is not complete until AuthAction
        confirms it.
      </p>
      <p className="auth-alt">
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
}
