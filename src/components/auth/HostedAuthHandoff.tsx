import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

/**
 * AuthAction owns every credential form. Email + password, passkey and the
 * social providers all live on its hosted page, and the documented authorize
 * parameters are limited to `prompt=login|signup`, `ui_locales` and the standard
 * OIDC values. There is no documented `login_hint`, `connection` or embedded
 * password API, so an email typed here could not be carried across the redirect.
 *
 * This component therefore collects nothing. It states which methods the secure
 * page offers and hands the user over in one step.
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
        <p className="auth-handoff-label">On AuthAction&apos;s secure page you can use:</p>
        <ul className="auth-method-list">
          {methods.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
        <p className="auth-hint">
          <ShieldCheck size={14} aria-hidden="true" />
          Revercue never sees or stores your password, passkey or provider password, and
          you come straight back here when AuthAction finishes.
        </p>
      </div>
    </>
  );
}
