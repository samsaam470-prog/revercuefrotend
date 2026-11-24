import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";
import { errorMessage } from "../../lib/errors";
import { useAuth } from "../../hooks/useAuth";
import { readReturnTo, rememberReturnTo } from "../../lib/authaction";
import { AuthActionStart } from "../../components/auth/AuthActionStart";
import { api } from "../../api/client";
import type { User } from "../../types";
import { Input } from "../../components/ui/Input";

/**
 * Log in starts the AuthAction redirect on mount.
 *
 * There is no Revercue-hosted sign-in step in between: the hosted AuthAction
 * page is the only place a credential is entered, and AuthAction returns the
 * result to `/callback`. The card below is a loading state with a manual
 * fallback, not a second form.
 */
export function LoginPage() {
  const { isAuthenticated, loading: authLoading, setSession } = useAuth();
  const isStaging = import.meta.env.VITE_STAGING_MODE === "true";
  const { loginWithRedirect } = useAuthAction();
  const location = useLocation();

  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stagingEmail, setStagingEmail] = useState("qa@revercue.test");
  const [stagingPassword, setStagingPassword] = useState("");
  const started = useRef(false);
  const starting = useRef(false);

  const returnTo = readReturnTo(location.search);

  useEffect(() => {
    rememberReturnTo(returnTo);
  }, [returnTo]);

  const start = useCallback(async () => {
    if (isStaging || starting.current) return;
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
  }, [loginWithRedirect, isStaging]);

  useEffect(() => {
    if (isStaging || authLoading || isAuthenticated || started.current) return;
    started.current = true;
    void start();
  }, [authLoading, isAuthenticated, start, isStaging]);

  if (!authLoading && isAuthenticated) {
    return <Navigate to={returnTo || "/dashboard"} replace />;
  }

  if (isStaging) {
    const submitStaging = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); setFormError(""); setBusy(true);
      try {
        const result = await api.post<{ token: string; user: User }>("/api/staging/session", { email: stagingEmail, password: stagingPassword });
        setSession(result.token, result.user); navigate(returnTo || "/dashboard", { replace: true });
      } catch (cause) { setFormError((cause as Error)?.message || "The staging sign-in failed."); }
      finally { setBusy(false); }
    };
    return (
      <div className="auth-card">
        <p className="eyebrow">Isolated staging</p><h1>Revercue QA workspace.</h1>
        <p className="lede">This workspace uses a disposable staging database. No production customer records or live billing are connected.</p>
        <form className="auth-form" onSubmit={(event) => void submitStaging(event)}>
          <Input id="staging-email" label="Staging email" type="email" value={stagingEmail} onChange={setStagingEmail} required />
          <Input id="staging-password" label="Staging password" type="password" value={stagingPassword} onChange={setStagingPassword} required />
          {formError ? <p className="auth-form-error" role="alert">{formError}</p> : null}
          <Button type="submit" fullWidth loading={busy}>Open staging workspace</Button>
        </form>
        <p className="auth-hint">Temporary QA access only. This account is not a real customer account.</p>
      </div>
    );
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
