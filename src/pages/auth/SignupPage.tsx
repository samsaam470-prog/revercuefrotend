import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";
import { errorMessage } from "../../lib/errors";
import { useAuth } from "../../hooks/useAuth";
import { readReturnTo, rememberReturnTo } from "../../lib/authaction";

/**
 * Start Free starts the AuthAction sign-up redirect on mount. AuthAction is the
 * only credential store and the only sign-up form; a new account is provisioned
 * by the Revercue API when `/callback` loads the application record.
 */
export function SignupPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { loginWithRedirect } = useAuthAction();
  const location = useLocation();

  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const started = useRef(false);
  const starting = useRef(false);

  const returnTo = readReturnTo(location.search);

  useEffect(() => {
    rememberReturnTo(returnTo);
  }, [returnTo]);

  const start = useCallback(async () => {
    if (starting.current) return;
    starting.current = true;
    setFormError("");
    setBusy(true);
    try {
      await loginWithRedirect({ authorizationParams: { prompt: "signup" } });
    } catch (cause) {
      starting.current = false;
      setBusy(false);
      setFormError((cause as Error)?.message || errorMessage(undefined, "Sign-up could not start."));
    }
  }, [loginWithRedirect]);

  useEffect(() => {
    if (authLoading || isAuthenticated || started.current) return;
    started.current = true;
    void start();
  }, [authLoading, isAuthenticated, start]);

  if (!authLoading && isAuthenticated) {
    return <Navigate to={returnTo || "/dashboard"} replace />;
  }

  return (
    <div className="auth-card">
      <p className="eyebrow">Create account</p>
      <h1>Create your Revercue account.</h1>
      <p className="lede">
        Pick your email and password once, then use them for every Revercue document you send.
        AuthAction stores the credentials and confirms your email address, then brings you back
        here to finish setting up your workspace.
      </p>

      <div className="auth-form" aria-live="polite">
        {formError ? (
          <p className="auth-form-error" role="alert">
            {formError}
          </p>
        ) : (
          <p className="muted">Taking you to AuthAction&apos;s secure sign-up…</p>
        )}
        <Button type="button" fullWidth loading={busy} onClick={() => void start()}>
          Continue to secure sign-up
        </Button>
      </div>

      <p className="auth-hint">
        No credit card. Revercue never sees or stores your password — AuthAction handles it.
      </p>

      <p className="auth-alt">
        Already have an account?{" "}
        <Link to={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}>
          Log in
        </Link>
      </p>
    </div>
  );
}
