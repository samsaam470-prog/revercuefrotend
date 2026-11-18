import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../../api/auth";
import { Spinner } from "../../components/ui/Spinner";
import { consumeReturnTo, isAccountLinkRequired } from "../../lib/authaction";

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

/**
 * The AuthActionProvider already exchanges the authorization code when the
 * callback URL contains `code` and `state`, so this page waits for that to
 * finish instead of calling `handleRedirectCallback()` a second time.
 */
export function CallbackPage() {
  const sdk = useAuthAction();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handled = useRef(false);
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const providerError = readProviderError(window.location.search);
  const hasCode = params.has("code");

  useEffect(() => {
    /*
     * Opened directly rather than by AuthAction: there is no authorization
     * response to finish, so this is not a failed sign-in. Send the visitor to
     * the login page, which forwards an already signed-in session to the
     * dashboard.
     */
    if (!providerError && !hasCode) {
      navigate("/login", { replace: true });
      return;
    }
    if (providerError || sdk.isLoading || handled.current) return;

    if (!sdk.isAuthenticated) {
      setError(sdk.error?.message || "Sign-in did not complete. Start again from the login page.");
      return;
    }

    handled.current = true;
    let cancelled = false;

    (async () => {
      try {
        const token = await sdk.getAccessToken();
        await authApi.me(token);
        if (!cancelled) navigate(consumeReturnTo(), { replace: true });
      } catch (cause) {
        if (cancelled) return;
        const status = (cause as { status?: number }).status ?? 0;
        const code = (cause as { code?: string }).code;
        if (isAccountLinkRequired(status, code)) {
          navigate("/link-account", { replace: true, state: { returnTo: consumeReturnTo() } });
          return;
        }
        setError((cause as Error).message || "Sign-in failed.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sdk.isLoading, sdk.isAuthenticated, sdk.error, sdk, navigate, providerError, hasCode]);

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

  if (error) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>Sign-in failed</h1>
        <p className="muted">{error}</p>
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
