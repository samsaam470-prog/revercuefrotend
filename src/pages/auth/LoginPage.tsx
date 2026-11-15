import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { GoogleButton } from "../../components/shared/GoogleButton";
import { authApi } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { emailSchema } from "../../lib/validators";
import { errorMessage, fieldErrors } from "../../lib/errors";
import { ApiError } from "../../types/api";

export function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const returnTo = params.get("returnTo") || "/dashboard";

  // Google returns the id_token in the URL hash; exchange it once, then clean the URL.
  useEffect(() => {
    if (params.get("google") !== "1") return;
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const idToken = hash.get("id_token");
    if (!idToken) {
      const reason = hash.get("error");
      setFormError(reason ? "Google sign-in was cancelled. Try again or use your password." : "");
      window.history.replaceState(null, "", "/login");
      return;
    }
    setLoading(true);
    authApi
      .google(idToken)
      .then(async (response) => {
        if (response.token && response.user) {
          setSession(response.token, response.user);
          navigate(returnTo, { replace: true });
        } else if (response.requires_2fa && response.pre_2fa_token) {
          sessionStorage.setItem("revercue_pre_2fa", response.pre_2fa_token);
          navigate("/login/code");
        } else {
          setFormError("Google sign-in did not return a session. Try again.");
        }
      })
      .catch((cause: ApiError) => setFormError(errorMessage(cause.code, cause.message)))
      .finally(() => {
        setLoading(false);
        window.history.replaceState(null, "", "/login");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!emailSchema.safeParse(email).success) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setFormError("");
    try {
      const response = await authApi.login({ email, password });
      if (response.requires_2fa && response.pre_2fa_token) {
        sessionStorage.setItem("revercue_pre_2fa", response.pre_2fa_token);
        sessionStorage.setItem("revercue_return_to", returnTo);
        navigate("/login/code");
        return;
      }
      if (response.token && response.user) {
        setSession(response.token, response.user);
        navigate(returnTo, { replace: true });
      }
    } catch (cause) {
      const apiError = cause as ApiError;
      if (apiError.status === 0) {
        navigate("/offline", { replace: true });
        return;
      }
      if (apiError.code === "invalid_payload") setErrors(fieldErrors(apiError.details));
      setFormError(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Log in</p>
      <h1>Pick the thread back up.</h1>
      <p className="lede">Your documents, your clients, your log.</p>

      <GoogleButton />
      <p className="auth-divider">or use your email</p>

      <form className="auth-form" onSubmit={submit} noValidate>
        <Input
          id="login-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Input
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
          required
        />
        <div className="between">
          <Link to="/forgot-password" className="caption" style={{ color: "var(--gold)" }}>
            Forgot password?
          </Link>
        </div>
        {formError && <p className="notice notice-red">{formError}</p>}
        <Button type="submit" loading={loading} disabled={!email || !password} fullWidth>
          Log in
        </Button>
      </form>

      <p className="auth-alt">
        New here? <Link to="/signup">Start free.</Link>
      </p>
    </div>
  );
}
