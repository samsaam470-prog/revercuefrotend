import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { HostedAuthHandoff } from "../../components/auth/HostedAuthHandoff";
import { errorMessage } from "../../lib/errors";
import { useAuth } from "../../hooks/useAuth";
import { readReturnTo, rememberReturnTo } from "../../lib/authaction";

export function LoginPage() {
  const sdk = useAuthAction();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();

  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const returnTo = readReturnTo(location.search);

  useEffect(() => {
    rememberReturnTo(returnTo);
  }, [returnTo]);

  if (!authLoading && isAuthenticated) {
    return <Navigate to={returnTo || "/dashboard"} replace />;
  }

  const start = async () => {
    if (busy) return;
    setFormError("");
    setBusy(true);
    try {
      await sdk.loginWithRedirect({
        authorizationParams: { prompt: "login" },
      });
    } catch (cause) {
      setBusy(false);
      setFormError((cause as Error)?.message || errorMessage(undefined, "Sign-in could not start."));
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Log in</p>
      <h1>Log in to Revercue.</h1>
      <p className="lede">
        One Revercue account for your proposals, contracts, forms and invoices. Sign in with
        the email and password you use for Revercue — AuthAction checks them and sends you
        back here.
      </p>

      <HostedAuthHandoff
        actionLabel="Continue to secure login"
        methods={["Email and password", "A passkey", "Google, GitHub or Microsoft"]}
        busy={busy}
        error={formError}
        onContinue={() => void start()}
      />

      <div className="auth-row">
        <Link to="/forgot-password" className="auth-inline-link">
          Forgot password?
        </Link>
      </div>

      <p className="auth-alt">
        New to Revercue?{" "}
        <Link to={`/signup${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
