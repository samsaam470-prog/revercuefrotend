import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { authApi } from "../../api/auth";
import { preAuthStore } from "../../lib/storage";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { FORMSUBMIT_COPY } from "../../lib/constants";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import { passwordSchema } from "../../lib/validators";

type Mode = "signup" | "2fa" | "reset";

interface ResetState {
  email: string;
  step: "code" | "password";
  code?: string;
}

export function CodeScreenPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const toast = useToast();

  const mode: Mode = location.pathname.startsWith("/login/code")
    ? "2fa"
    : location.pathname.startsWith("/forgot-password")
      ? "reset"
      : "signup";

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [expiresIn, setExpiresIn] = useState(300);
  const [resetState, setResetState] = useState<ResetState>(() => {
    try {
      const raw = sessionStorage.getItem("revercue_reset");
      return raw ? (JSON.parse(raw) as ResetState) : { email: "", step: "code" };
    } catch {
      return { email: "", step: "code" };
    }
  });
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const code = digits.join("");
  const preAuthToken = preAuthStore.get();
  const pre2faToken = sessionStorage.getItem("revercue_pre_2fa") || "";

  const title = useMemo(() => {
    if (mode === "2fa") return "Enter your login code.";
    if (mode === "reset") return resetState.step === "password" ? "Choose a new password." : "Enter your reset code.";
    return "Verify your email.";
  }, [mode, resetState.step]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCooldown((value) => (value > 0 ? value - 1 : 0));
      setExpiresIn((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((current) => {
      const next = [...current];
      next[index] = clean;
      return next;
    });
    if (clean && index < 5) inputs.current[index + 1]?.focus();
  };

  const onPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    const next = pasted.split("");
    setDigits(Array.from({ length: 6 }, (_, index) => next[index] || ""));
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const verify = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const response = await authApi.verifyEmail(preAuthToken || "", code);
        if (response.token && response.user) {
          setSession(response.token, response.user);
          preAuthStore.clear();
          navigate("/onboarding/step-1", { replace: true });
        } else if (response.token) {
          setSession(response.token);
          preAuthStore.clear();
          navigate("/onboarding/step-1", { replace: true });
        }
      } else if (mode === "2fa") {
        const response = await authApi.verify2fa(code, pre2faToken);
        if (response.token && response.user) {
          setSession(response.token, response.user);
          sessionStorage.removeItem("revercue_pre_2fa");
          const returnTo = sessionStorage.getItem("revercue_return_to") || "/dashboard";
          navigate(returnTo, { replace: true });
        }
      } else if (resetState.step === "code") {
        const nextState: ResetState = { ...resetState, step: "password", code };
        setResetState(nextState);
        sessionStorage.setItem("revercue_reset", JSON.stringify(nextState));
        setDigits(["", "", "", "", "", ""]);
      }
    } catch (cause) {
      const apiError = cause as ApiError;
      const attempts = apiError.details?.attempts_remaining;
      setError(
        apiError.code === "invalid_code" && typeof attempts === "number"
          ? `Incorrect code. ${attempts} attempts remaining.`
          : errorMessage(apiError.code, apiError.message),
      );
    } finally {
      setLoading(false);
    }
  };

  const savePassword = async () => {
    const parsed = passwordSchema.safeParse(newPassword);
    if (!parsed.success) {
      setPasswordError(parsed.error.issues[0].message);
      return;
    }
    setPasswordError("");
    setLoading(true);
    try {
      await authApi.verifyPasswordReset({
        email: resetState.email,
        code: resetState.code || "",
        new_password: newPassword,
      });
      sessionStorage.removeItem("revercue_reset");
      toast.success("Password updated. Log in with the new one.");
      navigate("/login", { replace: true });
    } catch (cause) {
      const apiError = cause as ApiError;
      setPasswordError(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    setError("");
    try {
      const response =
        mode === "2fa" ? await authApi.resend2fa(pre2faToken) : await authApi.resendVerification(preAuthToken || "");
      setCooldown(response.cooldown_seconds || 90);
      setExpiresIn(300);
      toast.success("Code sent. Check your inbox.");
    } catch (cause) {
      const apiError = cause as ApiError;
      const retry = apiError.details?.retry_after;
      if (apiError.code === "cooldown_active" && typeof retry === "number") setCooldown(retry);
      else setError(errorMessage(apiError.code, apiError.message));
    }
  };

  if (mode === "reset" && resetState.step === "password") {
    return (
      <div className="auth-card">
        <p className="eyebrow">Password reset</p>
        <h1>{title}</h1>
        <p className="lede">All other sessions will be revoked when the password changes.</p>
        <div className="auth-form">
          <Input
            id="reset-password"
            label="New password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            error={passwordError}
            helper="At least 8 characters."
            autoComplete="new-password"
          />
          <Button onClick={savePassword} loading={loading} disabled={!newPassword} fullWidth>
            Save new password
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <p className="eyebrow">
        {mode === "signup" ? "One more step" : mode === "2fa" ? "Two-factor" : "Password reset"}
      </p>
      <h1>{title}</h1>
      <p className="lede">
        {mode === "signup"
          ? "We sent a six-digit code to your email."
          : mode === "2fa"
            ? "We sent a six-digit code to your email."
            : `We sent a six-digit code to ${resetState.email || "your email"}.`}
      </p>

      {mode === "signup" && (
        <div className="formsubmit-card" style={{ marginBottom: 20 }}>
          <strong>FormSubmit activation</strong>
          {FORMSUBMIT_COPY}
        </div>
      )}

      <div className="code-boxes" onPaste={onPaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            className="code-box"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            value={digit}
            onChange={(event) => setDigit(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digits[index] && index > 0) {
                inputs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </div>

      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}

      <p className="caption" style={{ margin: "12px 0 20px" }}>
        {expiresIn > 0
          ? `Code expires in ${Math.floor(expiresIn / 60)}:${String(expiresIn % 60).padStart(2, "0")}`
          : "The code expired. Click Resend code."}
      </p>

      <div className="stack-3">
        <Button onClick={verify} loading={loading} disabled={code.length !== 6} fullWidth>
          Verify
        </Button>
        <Button variant="ghost" onClick={resend} disabled={cooldown > 0} fullWidth>
          {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
        </Button>
      </div>

      <p className="auth-foot">
        The activation email lets us know you are open to transactional emails, app notifications and
        security alerts. It does not opt you in to the newsletter.
      </p>
      <p className="auth-alt">
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
}
