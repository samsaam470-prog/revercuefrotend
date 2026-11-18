import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { HostedAuthHandoff } from "../../components/auth/HostedAuthHandoff";
import { errorMessage } from "../../lib/errors";
import { useAuth } from "../../hooks/useAuth";
import { readReturnTo, rememberReturnTo } from "../../lib/authaction";

export function SignupPage() {
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
        authorizationParams: { prompt: "signup" },
      });
    } catch (cause) {
      setBusy(false);
      setFormError((cause as Error)?.message || errorMessage(undefined, "Sign-up could not start."));
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Create account</p>
      <h1>Create your account.</h1>
      <p className="lede">
        Revercue accounts are created on AuthAction&apos;s secure page, which also confirms
        your email address.
      </p>

      <HostedAuthHandoff
        actionLabel="Continue to secure sign-up"
        methods={["Email and password", "A passkey", "Google, GitHub or Microsoft"]}
        busy={busy}
        error={formError}
        onContinue={() => void start()}
      />

      <p className="auth-alt">
        Already have an account?{" "}
        <Link to={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}>
          Log in
        </Link>
      </p>
    </div>
  );
}
