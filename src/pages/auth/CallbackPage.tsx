import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../../api/auth";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { consumeReturnTo, isAccountLinkRequired, readReturnTo } from "../../lib/authaction";

/**
 * AuthAction reports a failed authorization on the callback URL itself
 * (`error` + `error_description`). The SDK provider swallows that rejection,
 * so the reason has to be read from the URL or the user is told nothing.
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
 * The AuthActionProvider exchanges the authorization code itself when the URL
 * contains `code` and `state`, and it swallows any failure (`.catch(() => {})`),
 * so the SDK state simply stays "not authenticated". This page therefore:
 *
 * - never declares failure on the first render, which happens before the
 *   provider's effect has even started the exchange (that used to latch an
 *   error and strand the user on "Sign-in failed"),
 * - waits for the exchange, then loads the Revercue record,
 * - retries once on a network blip, and routes an unlinked identity to the
 *   linking flow instead of treating it as an expired session,
 * - offers a real retry instead of a dead end if the exchange never lands.
 */
export function CallbackPage() {
  const { isAuthenticated, isLoading, error: sdkError, getAccessToken, loginWithRedirect } =
    useAuthAction();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [stalled, setStalled] = useState(false);
  const handled = useRef(false);
  const mounted = useRef(true);
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const providerError = readProviderError(window.location.search);
  const hasCode = params.has("code");

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  /* Opened directly rather than by AuthAction: nothing to finish. */
  useEffect(() => {
    if (!providerError && !hasCode) navigate("/login", { replace: true });
  }, [providerError, hasCode, navigate]);

  /* The provider never surfaces a rejected exchange, so bound the wait. */
  useEffect(() => {
    if (providerError || !hasCode || isAuthenticated) return;
    const timer = window.setTimeout(() => {
      if (mounted.current && !handled.current) setStalled(true);
    }, EXCHANGE_GRACE_MS);
    return () => window.clearTimeout(timer);
  }, [providerError, hasCode, isAuthenticated]);

  /* Once the provider has exchanged the code, finish the Revercue side. */
  useEffect(() => {
    if (providerError || !hasCode || handled.current || isLoading || !isAuthenticated) return;
    handled.current = true;

    void (async () => {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          const token = await getAccessToken();
          await authApi.me(token);
          if (mounted.current) navigate(consumeReturnTo(), { replace: true });
          return;
        } catch (cause) {
          const status = (cause as { status?: number }).status ?? 0;
          const code = (cause as { code?: string }).code;
          if (isAccountLinkRequired(status, code)) {
            if (mounted.current) {
              navigate("/link-account", { replace: true, state: { returnTo: consumeReturnTo() } });
            }
            return;
          }
          /* A dropped connection is not a failed sign-in: try once more. */
          if (status === 0 && attempt === 0) {
            await new Promise((resolve) => window.setTimeout(resolve, 1_200));
            continue;
          }
          if (mounted.current) {
            setError((cause as Error)?.message || "Sign-in failed.");
          }
          return;
        }
      }
    })();
  }, [providerError, hasCode, isLoading, isAuthenticated, getAccessToken, navigate]);

  const restart = async () => {
    setError(null);
    setStalled(false);
    handled.current = false;
    try {
      await loginWithRedirect({ authorizationParams: { prompt: "login" } });
    } catch (cause) {
      setError((cause as Error)?.message || "Could not restart sign-in.");
    }
  };

  const backTo = readReturnTo(window.location.search);

  if (providerError) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>Sign-in was not completed</h1>
        <p className="muted">{providerError}</p>
        <p className="auth-alt">
          <Link to="/login">Try again</Link>
        </p>
      </div>
    );
  }

  if (!hasCode) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }} aria-live="polite">
        <Spinner size={32} />
        <p className="muted mt-4">Opening the login page…</p>
      </div>
    );
  }

  if (error || sdkError) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>We couldn&apos;t finish signing you in</h1>
        <p className="muted">
          {(error || sdkError?.message) ?? "The sign-in response was not accepted."}
        </p>
        <p className="caption mt-4">
          You were authorised by AuthAction, but Revercue could not load your account. Your
          credentials were not affected.
        </p>
        <div className="auth-form mt-4">
          <Button onClick={() => void restart()}>Try signing in again</Button>
        </div>
        <p className="auth-alt">
          <Link to={`/login${backTo ? `?returnTo=${encodeURIComponent(backTo)}` : ""}`}>
            Back to log in
          </Link>
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
          <Link to="/login">Back to log in</Link>
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
