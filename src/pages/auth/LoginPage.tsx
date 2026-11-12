import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
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
