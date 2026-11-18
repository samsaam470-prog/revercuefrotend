import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../../api/auth";
import { Spinner } from "../../components/ui/Spinner";
import { consumeReturnTo, isAccountLinkRequired } from "../../lib/authaction";

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

  useEffect(() => {
    if (sdk.isLoading || handled.current) return;

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
  }, [sdk.isLoading, sdk.isAuthenticated, sdk.error, sdk, navigate]);

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
