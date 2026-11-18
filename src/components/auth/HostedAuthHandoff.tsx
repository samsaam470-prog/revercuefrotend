import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";
import { AUTHACTION_DOMAIN } from "../../lib/authaction";

/**
 * Why this page does not render its own email + password fields
 * ------------------------------------------------------------
 * AuthAction is the identity provider and the only credential store, and it
 * exposes no supported way for our React code to submit a password:
 *
 * - `@authaction/web-sdk@0.1.8` exports only the OIDC redirect/popup surface:
 *   `loginWithRedirect`, `loginWithPopup`, `handleRedirectCallback`,
 *   `getAccessToken`, `logout`, `removeUser` (see dist/index.d.ts). The built
 *   bundle contains no password, signup or database-connection code at all.
 * - The tenant discovery document
 *   (`https://revercue.in.authaction.com/.well-known/openid-configuration`)
 *   advertises `authorization_code`, `client_credentials`, `refresh_token`,
 *   token-exchange and WhatsApp grants. There is no `password` grant, so the
 *   Resource Owner Password flow cannot be used from the browser.
 * - `/dbconnections/signup` and `/dbconnections/change_password` (the Auth0
 *   style public signup/reset endpoints) return 404 on the tenant, and the
 *   documented API reference lists no equivalent. The Management API's
 *   "create user" endpoint needs an M2M token and client secret, so it must
 *   never be called from the SPA.
 * - The documented `/oauth2/authorize` parameters are `prompt=login|signup`,
 *   `ui_locales` and the standard OIDC values. There is no `login_hint` or
 *   `password`, so an email typed here could not be carried across.
 *
 * Collecting a password here without one of the above would mean either
 * proxying it through the Revercue backend or faking authentication, both of
 * which are ruled out. The form therefore stays on AuthAction's hosted page,
 * and this panel states that plainly instead of pretending to be a login form.
 */
export function HostedAuthHandoff({
  actionLabel,
  methods,
  busy,
  error,
  onContinue,
}: {
  actionLabel: string;
  methods: string[];
  busy: boolean;
  error: string;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="auth-form">
        {error && (
          <p className="auth-form-error" role="alert">
            {error}
          </p>
        )}
        <Button type="button" fullWidth loading={busy} onClick={onContinue}>
          {actionLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>

      <div className="auth-handoff">
        <p className="auth-handoff-label">
          The email and password form opens on{" "}
          <span className="auth-host">{AUTHACTION_DOMAIN}</span>, the identity provider that
          stores Revercue sign-ins.
        </p>
        <ol className="auth-step-list">
          <li>You enter your Revercue email and password on AuthAction&apos;s secure form.</li>
          <li>AuthAction checks them and confirms the details it holds for you.</li>
          <li>You come straight back to Revercue, signed in to your workspace.</li>
        </ol>
        <p className="auth-handoff-label auth-handoff-methods">You can sign in with:</p>
        <ul className="auth-method-list">
          {methods.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
        <p className="auth-hint">
          <ShieldCheck size={14} aria-hidden="true" />
          Revercue never sees or stores your password, so there is no password field on this
          page. Your credentials are only ever handled by AuthAction.
        </p>
      </div>
    </>
  );
}
