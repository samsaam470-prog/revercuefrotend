import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../../api/auth";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../hooks/useToast";

export function LinkAccountPage() {
  const sdk = useAuthAction();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState(sdk.user?.email || "");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"start" | "confirm">("start");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const start = async () => {
    setLoading(true);
    try {
      const token = await sdk.getAccessToken();
      const res = await fetch(
        (import.meta.env.DEV ? "" : (import.meta.env.VITE_API_BASE_URL || "")) +
          "/api/auth/link/start",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Failed to send code.");
      setMessage(data.message || "A confirmation code was sent.");
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
      const token = await sdk.getAccessToken();
      const res = await fetch(
        (import.meta.env.DEV ? "" : (import.meta.env.VITE_API_BASE_URL || "")) +
          "/api/auth/link/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ email, code }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Verification failed.");
      toast.success("Account linked.");
      navigate("/app", { replace: true });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={sdk.user?.email ? true : false}
            />
          </label>
          {message && <p className="caption">{message}</p>}
          <Button onClick={start} loading={loading}>
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
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <Button onClick={confirm} loading={loading}>
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
