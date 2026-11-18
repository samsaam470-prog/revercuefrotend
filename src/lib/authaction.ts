/**
 * AuthAction configuration and small redirect helpers.
 *
 * The Client ID is a public SPA identifier (not a secret). It is build-time
 * configuration: changing `.env.example` does not change a deployed build.
 */
export const AUTHACTION_DOMAIN =
  (import.meta.env.VITE_AUTHACTION_DOMAIN as string | undefined)?.trim() ||
  "revercue.in.authaction.com";

export const AUTHACTION_CLIENT_ID =
  (import.meta.env.VITE_AUTHACTION_CLIENT_ID as string | undefined)?.trim() ||
  "OXJC1YmE3BwYU03xKfrMblC2F8hr9AC4";

/** The Revercue API identifier, never the SPA client ID. */
export const AUTHACTION_AUDIENCE =
  (import.meta.env.VITE_AUTHACTION_AUDIENCE as string | undefined)?.trim() ||
  "revercue-api.samsaam470.workers.dev";

export type AuthPrompt = "login" | "signup";
export type AuthMethod = "email" | "passkey" | "google" | "github" | "microsoft";

const RETURN_TO_KEY = "revercue_return_to";

/** Only same-origin absolute paths are accepted as return destinations. */
export function safeReturnPath(value: string | null | undefined): string | null {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

export function readReturnTo(search: string): string | null {
  try {
    return safeReturnPath(new URLSearchParams(search).get("returnTo"));
  } catch {
    return null;
  }
}

/** Persist the intended destination across the AuthAction redirect. */
export function rememberReturnTo(path: string | null): void {
  if (!path) return;
  try {
    sessionStorage.setItem(RETURN_TO_KEY, path);
  } catch {
    /* storage unavailable */
  }
}

/** Read and clear the intended destination. Defaults to the dashboard. */
export function consumeReturnTo(): string {
  try {
    const stored = sessionStorage.getItem(RETURN_TO_KEY);
    sessionStorage.removeItem(RETURN_TO_KEY);
    return safeReturnPath(stored) || "/dashboard";
  } catch {
    return "/dashboard";
  }
}

/** Drop a persisted destination without navigating to it (e.g. after sign-out). */
export function clearReturnTo(): void {
  try {
    sessionStorage.removeItem(RETURN_TO_KEY);
  } catch {
    /* storage unavailable */
  }
}

/**
 * `account_link_required` is a first-class authentication state, not an
 * expired session. The API client must not run its global sign-out handler
 * for it, or the callback can never reach the linking flow.
 */
export function isAccountLinkRequired(status: number, code: string | undefined): boolean {
  return status === 401 && code === "account_link_required";
}
