import { GoogleIcon } from "./BrandIcons";
import { Button } from "../ui/Button";

const CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) || "";

export const GOOGLE_CALLBACK_PATH = "/login?google=1";

/** True when the build has a Google client id; the button stays visible either way. */
export function googleConfigured(): boolean {
  return Boolean(CLIENT_ID);
}

export function GoogleButton({
  label = "Continue with Google",
  onUnavailable,
  disabled,
}: {
  label?: string;
  onUnavailable?: () => void;
  disabled?: boolean;
}) {
  const start = () => {
    if (!CLIENT_ID) {
      onUnavailable?.();
      return;
    }
    const nonce = Math.random().toString(36).slice(2);
    sessionStorage.setItem("revercue_google_nonce", nonce);
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: `${window.location.origin}${GOOGLE_CALLBACK_PATH}`,
      response_type: "id_token",
      scope: "openid email profile",
      nonce,
      prompt: "select_account",
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <div className="google-wrap">
      <Button
        type="button"
        variant="secondary"
        fullWidth
        onClick={start}
        disabled={disabled}
        aria-label={label}
      >
        <GoogleIcon size={16} />
        {label}
      </Button>
    </div>
  );
}
