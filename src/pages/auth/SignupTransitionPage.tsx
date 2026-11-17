import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { EMAIL_DELIVERY_NOTE } from "../../lib/constants";

export function SignupTransitionPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const tick = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    const timer = window.setTimeout(() => navigate("/signup/code", { replace: true }), 5000);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <Spinner size={32} />
      <h1 style={{ marginTop: 20 }}>Setting up your thread.</h1>
      <p className="muted" style={{ fontSize: 14, lineHeight: 1.7 }}>
        {EMAIL_DELIVERY_NOTE}
      </p>
      <p className="caption mt-6">Continuing in {Math.max(seconds, 1)} seconds…</p>
    </div>
  );
}
