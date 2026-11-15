import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import { emailSchema } from "../../lib/validators";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError("");
    setFormError("");
    setLoading(true);
    try {
      await authApi.requestPasswordReset(email);
      sessionStorage.setItem("revercue_reset", JSON.stringify({ email, step: "code" }));
      navigate("/forgot-password/code");
    } catch (cause) {
      const apiError = cause as ApiError;
      setFormError(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Password reset</p>
      <h1>Reset your password.</h1>
      <p className="lede">
        Enter your email. If the account exists, we send a reset code by email. We answer the same way
        whether or not the address is registered.
      </p>
      <form className="auth-form" onSubmit={submit} noValidate>
        <Input
          id="forgot-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          error={error}
          autoComplete="email"
          required
        />
        {formError && <p className="notice notice-red">{formError}</p>}
        <Button type="submit" loading={loading} disabled={!email} fullWidth>
          Send reset code
        </Button>
      </form>
      <p className="auth-alt">
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
}
