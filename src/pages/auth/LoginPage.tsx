import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useAuthAction } from "@authaction/web-sdk/react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthSocialButtons, type SocialProvider } from "../../components/auth/AuthSocialButtons";
import { emailSchema } from "../../lib/validators";
import { errorMessage } from "../../lib/errors";
import { useAuth } from "../../hooks/useAuth";
import { readReturnTo, rememberReturnTo, type AuthMethod } from "../../lib/authaction";

export function LoginPage() {
  const sdk = useAuthAction();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState<AuthMethod | null>(null);

  const returnTo = readReturnTo(location.search);

  useEffect(() => {
    rememberReturnTo(returnTo);
  }, [returnTo]);

  if (!authLoading && isAuthenticated) {
    return <Navigate to={returnTo || "/dashboard"} replace />;
  }

  const start = async (method: AuthMethod, address?: string) => {
    setFormError("");
    if (address !== undefined) {
      const parsed = emailSchema.safeParse(address);
      if (!parsed.success) {
        setEmailError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
        return;
      }
    }
    setEmailError("");
    setBusy(method);
    try {
      await sdk.loginWithRedirect({
        appState: { method, returnTo: returnTo || undefined },
        authorizationParams: { prompt: "login" },
      });
    } catch (cause) {
      setBusy(null);
      setFormError((cause as Error)?.message || errorMessage(undefined, "Sign-in could not start."));
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    void start("email", email);
  };

  const selectProvider = (provider: SocialProvider) => {
    if (busy) return;
    void start(provider);
  };

  const socialBusy: SocialProvider | null =
    busy === "google" || busy === "github" || busy === "microsoft" ? busy : null;

  return (
    <div className="auth-card auth-card-wide">
      <p className="eyebrow">Sign in</p>
      <h1>Welcome back.</h1>
      <p className="lede">Log in to your Revercue account.</p>

      <Button
        type="button"
        variant="secondary"
        fullWidth
        loading={busy === "passkey"}
        disabled={busy !== null && busy !== "passkey"}
        onClick={() => void start("passkey")}
      >
        <KeyRound size={16} aria-hidden="true" />
        Sign in with a passkey
      </Button>
      <p className="auth-hint">
        Passkeys are verified on Revercue&apos;s secure sign-in page. We never register or
        check a credential ourselves.
      </p>

      <form className="auth-form" onSubmit={submit} noValidate>
        <Input
          id="login-email"
          label="Email address"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setEmailError("");
            setFormError("");
          }}
          error={emailError}
          autoComplete="email"
          inputMode="email"
          required
        />
        {formError && (
          <p className="auth-form-error" role="alert">
            {formError}
          </p>
        )}
        <Button
          type="submit"
          fullWidth
          loading={busy === "email"}
          disabled={busy !== null && busy !== "email"}
        >
          Continue
        </Button>
      </form>

      <p className="auth-hint auth-hint-tight">
        <ShieldCheck size={14} aria-hidden="true" />
        Your password is entered on AuthAction&apos;s secure page. Revercue never receives it.
      </p>

      <div className="auth-row">
        <Link to="/forgot-password" className="auth-inline-link">
          Forgot password?
        </Link>
      </div>

      <div className="auth-divider" role="separator" aria-label="Or continue with a provider">
        OR CONTINUE WITH
      </div>

      <AuthSocialButtons onSelect={selectProvider} disabled={busy !== null} busy={socialBusy} />

      <p className="auth-alt">
        New to Revercue? <Link to={`/signup${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}>Sign up</Link>
      </p>
    </div>
  );
}
