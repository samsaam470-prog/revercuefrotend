import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";

export function LoginPage() {
  const sdk = useAuthAction();
  return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <h1>Welcome back.</h1>
      <p className="muted">Sign in with your Revercue account.</p>
      <div style={{ marginTop: 24 }}>
        <Button onClick={() => sdk.loginWithRedirect()}>Continue with Revercue</Button>
      </div>
      <p className="caption mt-6">
        Sign-in is handled by Revercue’s authentication provider. Passkeys, email,
        Google, Microsoft and GitHub are supported there.
      </p>
    </div>
  );
}
