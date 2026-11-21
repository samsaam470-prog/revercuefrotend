const MESSAGES: Record<string, string> = {
  invalid_payload: "Check the form and try again.",
  invalid_credentials: "That email and password combination does not match.",
  unauthorized: "Your session expired. Log in again.",
  forbidden: "You do not have access to this.",
  not_found: "We could not find that.",
  conflict: "That already exists.",
  rate_limited: "Too many attempts. Try again in a minute.",
  plan_limit_reached: "You reached your plan limit. Archive or delete a document, or upgrade.",
  plan_not_allowed: "This feature is not available on your plan.",
  config_error: "Something is misconfigured on our side. We have been notified.",
  internal_server_error: "Something went wrong. Try again in a moment.",
  invalid_code: "Incorrect code.",
  code_expired: "The code expired. Request a new one.",
  too_many_attempts: "Too many attempts. Try again in 15 minutes.",
  cooldown_active: "Please wait before requesting another code.",
  invalid_password: "Incorrect password.",
  invalid_google_token: "Google sign-in failed. Try again.",
  archive_limit_reached: "You reached your archive limit.",
  network_error: "You appear to be offline. Check your connection.",
  email_verification_required:
    "Verify your email address with AuthAction, then sign in again.",
};

export function errorMessage(code: string | undefined, fallback?: string): string {
  if (code && MESSAGES[code]) return MESSAGES[code];
  return fallback || "Something went wrong. Try again.";
}

export function fieldErrors(details: Record<string, unknown> | undefined): Record<string, string> {
  if (!details) return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(details)) {
    if (typeof value === "string") out[key] = value;
    else if (Array.isArray(value) && typeof value[0] === "string") out[key] = value[0];
  }
  return out;
}

export const NETWORK_MESSAGE = MESSAGES.network_error;
