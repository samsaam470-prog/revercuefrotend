import { useAuthAction } from "@authaction/web-sdk/react";
import { Button } from "../../components/ui/Button";

export function SignupPage() {
  const sdk = useAuthAction();
  return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <h1>Create your account.</h1>
      <p className="muted">Sign up with Revercue’s authentication provider.</p>
      <div style={{ marginTop: 24 }}>
        <Button onClick={() => sdk.loginWithRedirect()}>Continue to sign up</Button>
      </div>
      <p className="caption mt-6">
        Account creation, email verification and password rules are handled by the
        authentication provider. Revercue never receives your password.
      </p>
    </div>
  );
}
