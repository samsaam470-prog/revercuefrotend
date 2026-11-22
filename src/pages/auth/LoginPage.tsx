import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";
import { errorMessage } from "../../lib/errors";
import { useAuth } from "../../hooks/useAuth";
import { readReturnTo, rememberReturnTo } from "../../lib/authaction";
import { AuthActionStart } from "../../components/auth/AuthActionStart";

/**
 * Log in starts the AuthAction redirect on mount.
 *
 * There is no Revercue-hosted sign-in step in between: the hosted AuthAction
 * page is the only place a credential is entered, and AuthAction returns the
 * result to `/callback`. The card below is a loading state with a manual
 * fallback, not a second form.
 */
export function LoginPage() {
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
      await loginWithRedirect({ authorizationParams: { prompt: "login" } });
    } catch (cause) {
      starting.current = false;
      setBusy(false);
      setFormError((cause as Error)?.message || errorMessage(undefined, "Sign-in could not start."));
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
      <p className="eyebrow">Log in</p>
      <h1>Log in to Revercue.</h1>
      <p className="lede">
        One Revercue account for your proposals, contracts, forms and invoices. AuthAction checks
        your email and password on its own secure page and sends you straight back here.
      </p>

      <div className="auth-form" aria-live="polite">
        {formError ? (
          <p className="auth-form-error" role="alert">
            {formError}
          </p>
        ) : (
          <p className="muted">Taking you to AuthAction&apos;s secure login…</p>
        )}
        <Button type="button" fullWidth loading={busy} onClick={() => void start()}>
          Continue to secure login
        </Button>
      </div>

      <p className="auth-hint">
        Revercue never sees or stores your password. Your credentials are only ever handled by
        AuthAction.
      </p>

      <p className="auth-alt">
        New to Revercue?{" "}
        <AuthActionStart className="btn btn-text">
          Create an account
        </AuthActionStart>
      </p>
    </div>
  );
}
