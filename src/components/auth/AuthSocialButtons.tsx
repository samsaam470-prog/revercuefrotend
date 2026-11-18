import { Github } from "lucide-react";
import { GoogleIcon } from "../shared/BrandIcons";
import { Button } from "../ui/Button";

export type SocialProvider = "google" | "github" | "microsoft";

function MicrosoftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="9" height="9" fill="#f25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
      <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
      <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

/**
 * AuthAction's authorize endpoint exposes no documented provider selector, so
 * these buttons start the hosted sign-in where the enabled providers are
 * shown. The caption below the group says so explicitly.
 */
export function AuthSocialButtons({
  onSelect,
  disabled,
  busy,
}: {
  onSelect: (provider: SocialProvider) => void;
  disabled?: boolean;
  busy?: SocialProvider | null;
}) {
  return (
    <div className="auth-socials">
      <Button
        type="button"
        variant="secondary"
        fullWidth
        loading={busy === "google"}
        disabled={disabled}
        onClick={() => onSelect("google")}
      >
        <GoogleIcon size={16} />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="secondary"
        fullWidth
        loading={busy === "github"}
        disabled={disabled}
        onClick={() => onSelect("github")}
      >
        <Github size={16} aria-hidden="true" />
        Continue with GitHub
      </Button>
      <Button
        type="button"
        variant="secondary"
        fullWidth
        loading={busy === "microsoft"}
        disabled={disabled}
        onClick={() => onSelect("microsoft")}
      >
        <MicrosoftIcon size={16} />
        Continue with Microsoft
      </Button>
      <p className="auth-provider-note">
        These open Revercue&apos;s secure sign-in, where Google, GitHub and Microsoft are
        available.
      </p>
    </div>
  );
}
