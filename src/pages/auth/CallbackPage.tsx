import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../../api/auth";
import { Spinner } from "../../components/ui/Spinner";

export function CallbackPage() {
  const sdk = useAuthAction();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await sdk.handleRedirectCallback();
        const token = await sdk.getAccessToken();
        try {
          await authApi.me(token);
          if (!cancelled) navigate("/app", { replace: true });
        } catch (cause) {
          const code = (cause as { code?: string }).code;
          if (code === "account_link_required") {
            if (!cancelled) navigate("/link-account", { replace: true });
          } else {
            if (!cancelled) setError((cause as Error).message || "Sign-in failed.");
          }
        }
      } catch (cause) {
        if (!cancelled) setError((cause as Error).message || "Sign-in failed.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sdk, navigate]);

  if (error) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>Sign-in failed</h1>
        <p className="muted">{error}</p>
        <a href="/login">Back to sign in</a>
      </div>
    );
  }
  return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <Spinner size={32} />
      <p className="muted mt-4">Completing sign-in…</p>
    </div>
  );
}
