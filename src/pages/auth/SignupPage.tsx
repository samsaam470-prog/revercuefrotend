import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "../../components/ui/Checkbox";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import { GoogleButton } from "../../components/shared/GoogleButton";
import { preAuthStore } from "../../lib/storage";
import { emailSchema, passwordStrength, passwordSchema, strengthLabel } from "../../lib/validators";
import { errorMessage, fieldErrors } from "../../lib/errors";
import { ApiError } from "../../types/api";

export function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tos, setTos] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const score = passwordStrength(password);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!emailSchema.safeParse(email).success) nextErrors.email = "Enter a valid email address.";
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) nextErrors.password = passwordResult.error.issues[0].message;
    if (!tos) nextErrors.tos = "You must accept the Terms and Privacy Policy.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setFormError("");
    try {
      const response = await authApi.signup({
        email,
        password,
        tos_accepted: true,
        newsletter_opt_in: newsletter,
      });
      if (response.token) preAuthStore.set(response.token);
      sessionStorage.setItem("revercue_signup_email", email);
      navigate("/signup/transition");
    } catch (cause) {
      const apiError = cause as ApiError;
      if (apiError.code === "invalid_payload") {
        setErrors(fieldErrors(apiError.details));
      }
      if (apiError.code === "conflict") {
        setErrors({ email: "This email is already registered. Log in instead?" });
      }
      setFormError(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Start free</p>
      <h1>Your thread starts here.</h1>
      <p className="lede">Five active documents, one-month retention, the whole thread.</p>

      <form className="auth-form" onSubmit={submit} noValidate>
        <Input
          id="signup-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
          required
        />
        <div>
          <Input
            id="signup-password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            helper="At least 8 characters. A passphrase is best."
            autoComplete="new-password"
            required
          />
          {password && (
            <div className="strength" data-level={score} aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
          )}
          {password && <p className="caption">{strengthLabel(score)} password</p>}
        </div>

        <GoogleButton />

        <Checkbox
          id="signup-tos"
          label={
            <>
              I agree to the{" "}
              <Link to="/terms" target="_blank" style={{ color: "var(--gold)" }}>
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" target="_blank" style={{ color: "var(--gold)" }}>
                Privacy Policy
              </Link>
            </>
          }
          checked={tos}
          onChange={(value) => {
            setTos(value);
            if (value) setErrors((current) => ({ ...current, tos: "" }));
          }}
          error={errors.tos}
        />
        <Checkbox
          id="signup-newsletter"
          label="Send me product updates (optional)"
          checked={newsletter}
          onChange={setNewsletter}
        />

        {formError && <p className="notice notice-red">{formError}</p>}

        <Button type="submit" loading={loading} disabled={!tos} fullWidth>
          Create account
        </Button>
      </form>

      <p className="auth-alt">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
