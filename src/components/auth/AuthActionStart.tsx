import { useState } from "react";
import { useAuthAction } from "@authaction/web-sdk/react";

/**
 * "Start Free" entry point. AuthAction owns sign-up, so this no longer routes
 * to a Revercue page: it opens the hosted AuthAction sign-up directly.
 */
export function AuthActionStart({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { loginWithRedirect } = useAuthAction();
  const [busy, setBusy] = useState(false);

  const start = async () => {
    onClick?.();
    if (busy) return;
    setBusy(true);
    try {
      await loginWithRedirect({ authorizationParams: { prompt: "signup" } });
    } catch {
      setBusy(false);
    }
  };

  return (
    <button type="button" className={className} onClick={() => void start()} disabled={busy}>
      {children}
    </button>
  );
}