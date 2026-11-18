import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../../api/auth";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { consumeReturnTo, isAccountLinkRequired, readReturnTo } from "../../lib/authaction";
import {
  describeApiFailure,
  inspectAccessToken,
  logAuthFailure,
  logAuthStep,
  type ApiFailure,
} from "../../lib/auth-diagnostics";

/**
 * AuthAction reports a failed authorization on the redirect URL itself
 * (`error` + `error_description`). The SDK provider swallows that rejection
 * (`.catch(() => {})`), so the reason has to be read from the URL or the user is
 * told nothing.
 */
function readProviderError(search: string): string | null {
  const params = new URLSearchParams(search);
  const error = params.get("error");
  if (!error) return null;
  return params.get("error_description") || error;
}

/** How long the code exchange may take before we offer a way out. */
const EXCHANGE_GRACE_MS = 12_000;

/**
 * AuthAction's rejection reasons, in words a client can act on. The code itself
 * is still shown as a reference so the cause is never hidden again.
 */
const REASON_COPY: Record<string, string> = {
  wrong_audience:
    "AuthAction issued the sign-in token for a different audience, so the Revercue API refused it.",
  id_token_rejected:
    "AuthAction returned an identity token where the Revercue API needs an API access token.",
  wrong_issuer: "The sign-in token came from a different AuthAction tenant.",
  expired: "The sign-in token expired before Revercue could use it.",
  bad_signature: "Revercue could not verify the signature on the sign-in token.",
  bad_algorithm: "The sign-in token uses a signing algorithm Revercue does not accept.",
  malformed: "AuthAction's sign-in token could not be read.",
  missing_subject: "AuthAction's sign-in token carries no account identifier.",
  verification_failed: "Revercue could not verify AuthAction's sign-in token.",
  config_error: "Revercue's authentication is misconfigured on the server.",
  no_access_token: "AuthAction authorised the sign-in but returned no access token.",
};

/**
 * The single place a sign-in is completed.
 *
 * AuthAction redirects to `/dashboard` (the only URI registered on the tenant),
 * and `AppLayout` forwards that response here immediately. Keeping completion
 * off the guarded app routes is what stops a one-time authorization code from
 * being consumed by a spinner, an onboarding redirect or an expired-session
 * jump before it is exchanged.
 *
 * Order of operations: wait for the SDK's code exchange → read the access
 * token → load the Revercue record → only then navigate to the destination.
 */
export function CallbackPage() {
  const { isAuthenticated, isLoading, getAccessToken, loginWithRedirect } = useAuthAction();
  const { refresh } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  /* React Router keeps the query string even after the SDK rewrites the URL
     with history.replaceState, so this is the reliable copy. */
  const [search] = useState(() => location.search || window.location.search);
  const providerError = useMemo(() => readProviderError(search), [search]);
  const hasCode = useMemo(() => new URLSearchParams(search).has("code"), [search]);

  const [failure, setFailure] = useState<ApiFailure | null>(null);
  const [stalled, setStalled] = useState(false);
  const handled = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    logAuthStep("callback:start", { hasCode, providerError: Boolean(providerError) });
  }, [hasCode, providerError]);

  /* The provider never surfaces a rejected exchange, so bound the wait. */
  useEffect(() => {
    if (providerError || failure || isAuthenticated) return;
    const timer = window.setTimeout(() => {
      if (mounted.current && !handled.current) setStalled(true);
    }, EXCHANGE_GRACE_MS);
    return () => window.clearTimeout(timer);
  }, [providerError, failure, isAuthenticated]);

  /* Opened directly, with nothing to finish and no session to restore. */
  useEffect(() => {
    if (providerError || failure || hasCode || isLoading || isAuthenticated) return;
    navigate("/login", { replace: true });
  }, [providerError, failure, hasCode, isLoading, isAuthenticated, navigate]);

  /* Complete the Revercue side exactly once per sign-in. */
  useEffect(() => {
    if (handled.current || providerError || failure || isLoading || !isAuthenticated) return;
    handled.current = true;
    const target = consumeReturnTo();

    void (async () => {
      logAuthStep("callback:exchange", { authenticated: true });

      let token: string | null = null;
      try {
        token = await getAccessToken();
      } catch (cause) {
        logAuthFailure("callback:token", cause);
      }
      const claims = inspectAccessToken(token);
      logAuthStep("callback:token", { hasToken: Boolean(token), claims });

      if (!token) {
        if (mounted.current) {
          setFailure({
            status: null,
            code: "no_access_token",
            reason: "no_access_token",
            linkRequired: false,
            message: REASON_COPY.no_access_token,
          });
        }
        return;
      }

      /*
       * Populate the app session through the context rather than navigating
       * with an empty one: the dashboard guard would otherwise bounce a
       * successful sign-in to /login while `/me` was still in flight.
       */
      const user = await refresh();
      if (user) {
        logAuthStep("callback:complete", { onboardingStep: user.onboarding_step });
        if (mounted.current) navigate(target, { replace: true });
        return;
      }

      /* refresh() keeps the session but not the reason, so ask once more. */
      let lastError: unknown = null;
      let lastFailure: ApiFailure | null = null;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          await authApi.me(token);
          logAuthStep("callback:profile", { ok: true });
          if (mounted.current) navigate(target, { replace: true });
          return;
        } catch (cause) {
          lastError = cause;
          lastFailure = describeApiFailure(cause);
          /* A dropped connection is not a failed sign-in: try once more. */
          if (lastFailure.status === 0 && attempt === 0) {
            await new Promise((resolve) => window.setTimeout(resolve, 1_200));
            continue;
          }
          break;
        }
      }

      if (
        lastFailure &&
        isAccountLinkRequired(lastFailure.status ?? 0, lastFailure.code ?? undefined)
      ) {
        logAuthStep("callback:complete", { linked: false });
        if (mounted.current) {
          navigate("/link-account", { replace: true, state: { returnTo: target } });
        }
        return;
      }

      const described = logAuthFailure("callback:fail", lastError, { claims });
      if (mounted.current) {
        setFailure(lastFailure ?? described);
      }
    })();
  }, [
    providerError,
    failure,
    isLoading,
    isAuthenticated,
    getAccessToken,
    refresh,
    navigate,
  ]);

  const restart = async () => {
    setFailure(null);
    setStalled(false);
    handled.current = false;
    try {
      await loginWithRedirect({ authorizationParams: { prompt: "login" } });
    } catch (cause) {
      setFailure(describeApiFailure(cause));
    }
  };

  const backTo = readReturnTo(search);
  const loginHref = `/login${backTo ? `?returnTo=${encodeURIComponent(backTo)}` : ""}`;

  if (providerError) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>Sign-in was not completed</h1>
        <p className="muted">{providerError}</p>
        <p className="auth-alt">
          <Link to={loginHref}>Try again</Link>
        </p>
      </div>
    );
  }

  if (failure) {
    const detail = (failure.reason && REASON_COPY[failure.reason]) || failure.message;
    const reference = [failure.status ? `HTTP ${failure.status}` : null, failure.reason || failure.code]
      .filter(Boolean)
      .join(" · ");
    return (
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>We couldn&apos;t finish signing you in</h1>
        <p className="muted">{detail}</p>
        {reference && <p className="caption mt-4">Sign-in reference: {reference}</p>}
        <p className="caption mt-4">
          You were authorised by AuthAction, but Revercue could not load your account. Your
          credentials were not affected.
        </p>
        <div className="auth-form mt-4">
          <Button onClick={() => void restart()}>Try signing in again</Button>
        </div>
        <p className="auth-alt">
          <Link to={loginHref}>Back to log in</Link>
        </p>
      </div>
    );
  }

  if (stalled) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }} aria-live="polite">
        <h1>This is taking longer than expected</h1>
        <p className="muted">
          AuthAction has not sent the sign-in result back yet. Starting again opens a fresh
          secure sign-in and fixes the usual cause: an expired or missing sign-in session.
        </p>
        <div className="auth-form mt-4">
          <Button onClick={() => void restart()}>Start sign-in again</Button>
        </div>
        <p className="auth-alt">
          <Link to={loginHref}>Back to log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-card" style={{ textAlign: "center" }} aria-live="polite">
      <Spinner size={32} />
      <p className="muted mt-4">Completing sign-in…</p>
    </div>
  );
}
