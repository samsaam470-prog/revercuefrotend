import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../../api/auth";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { safeReturnPath } from "../../lib/authaction";

export function LinkAccountPage() {
  const sdk = useAuthAction();
  const { refresh } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const returnTo = safeReturnPath((location.state as { returnTo?: string } | null)?.returnTo) || "/dashboard";

  const [email, setEmail] = useState(sdk.user?.email || "");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"start" | "confirm">("start");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const start = async () => {
    setLoading(true);
    try {
      const res = await authApi.linkStart({ email });
      setMessage(res.message || "A confirmation code was sent.");
      setStep("confirm");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const confirm = async () => {
    setLoading(true);
    try {
      await authApi.linkConfirm({ email, code });
      await refresh();
      toast.success("Account linked.");
      navigate(returnTo, { replace: true });
    } catch (e) {
      toast.error((e as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Link your Revercue account</h1>
      <p className="muted">
        Confirm control of your email to link this sign-in to your Revercue account.
      </p>
      {step === "start" ? (
        <>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={Boolean(sdk.user?.email)}
            />
          </label>
          {message && <p className="caption">{message}</p>}
          <Button onClick={start} loading={loading} disabled={!email}>
            Send confirmation code
          </Button>
        </>
      ) : (
        <>
          <label className="field">
            <span>6-digit code</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <Button onClick={confirm} loading={loading} disabled={code.length !== 6}>
            Verify and link
          </Button>
          <button type="button" className="btn-link" onClick={() => setStep("start")}>
            Use a different email
          </button>
        </>
      )}
    </div>
  );
}
