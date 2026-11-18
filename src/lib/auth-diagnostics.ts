import { AUTHACTION_AUDIENCE, AUTHACTION_CLIENT_ID } from "./authaction";

/**
 * Sign-in diagnostics.
 *
 * A failed sign-in used to collapse into one generic sentence, which is why it
 * could not be diagnosed from a screenshot. Each step of the completion now
 * records what happened, and the rejection reason the API returns
 * (`details.reason`) is preserved for both the log and the screen.
 *
 * Nothing here can leak a credential: no function accepts or prints a token, an
 * authorization code, a refresh token or a password. Access tokens are decoded
 * and reduced to their non-secret claim shape; email addresses are masked.
 */

const PREFIX = "[revercue:auth]";

export type AuthStep =
  | "callback:start"
  | "callback:exchange"
  | "callback:token"
  | "callback:profile"
  | "callback:complete"
  | "callback:fail"
  | "context:refresh";

export interface ApiFailure {
  status: number | null;
  code: string | null;
  message: string;
  reason: string | null;
  linkRequired: boolean;
}

/** Reduces an unknown thrown value to the parts that are safe to log. */
export function describeApiFailure(error: unknown): ApiFailure {
  const candidate = error as
    | { status?: number; code?: string; message?: string; details?: Record<string, unknown> }
    | null
    | undefined;
  const details = candidate?.details ?? {};
  const status = typeof candidate?.status === "number" ? candidate.status : null;
  return {
    status,
    code: typeof candidate?.code === "string" ? candidate.code : null,
    message:
      typeof candidate?.message === "string" && candidate.message
        ? candidate.message
        : error instanceof Error
          ? error.message
          : String(error ?? "Unknown error"),
    reason: typeof details.reason === "string" ? details.reason : null,
    linkRequired: details.link_required === true,
  };
}

/** `someone@example.com` -> `s******@example.com`. Never returns the address. */
export function maskEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const at = value.lastIndexOf("@");
  if (at <= 0) return null;
  const local = value.slice(0, at);
  return `${local.slice(0, 1)}${"*".repeat(Math.min(Math.max(local.length - 1, 1), 6))}${value.slice(at)}`;
}

/** Progress is development detail; failures are always worth a console line. */
export function logAuthStep(step: AuthStep, data?: Record<string, unknown>): void {
  if (!import.meta.env.DEV) return;
  console.debug(PREFIX, step, data ?? {});
}

export function logAuthFailure(
  step: AuthStep,
  error: unknown,
  data?: Record<string, unknown>,
): ApiFailure {
  const failure = describeApiFailure(error);
  console.warn(PREFIX, `${step}: failed`, { ...failure, ...data });
  return failure;
}

export interface AccessTokenSummary {
  iss: string | null;
  aud: string | null;
  typ: string | null;
  tokenUse: string | null;
  hasIdTokenMarkers: boolean;
  audienceIsApi: boolean;
  audienceIsClientId: boolean;
  expiresInSeconds: number | null;
}

function decodeSegment(segment: string): Record<string, unknown> | null {
  try {
    const normalised = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalised + "=".repeat((4 - (normalised.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Reads the *claims* of an access token so a rejection can be explained without
 * ever handling the token itself. This does not verify anything — the API does
 * that — it only reports what the browser was given.
 */
export function inspectAccessToken(token: string | null | undefined): AccessTokenSummary | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const header = decodeSegment(parts[0]);
  const payload = decodeSegment(parts[1]);
  if (!header || !payload) return null;

  const audiences = Array.isArray(payload.aud)
    ? payload.aud.filter((value): value is string => typeof value === "string")
    : typeof payload.aud === "string"
      ? [payload.aud]
      : [];
  const exp = typeof payload.exp === "number" ? payload.exp : null;
  const nowSeconds = Math.floor(Date.now() / 1000);

  return {
    iss: typeof payload.iss === "string" ? payload.iss : null,
    aud: audiences.join(" ") || null,
    typ: typeof header.typ === "string" ? header.typ : null,
    tokenUse: typeof payload.token_use === "string" ? payload.token_use : null,
    hasIdTokenMarkers: Boolean(payload.at_hash ?? payload.nonce ?? payload.c_hash),
    audienceIsApi: audiences.includes(AUTHACTION_AUDIENCE),
    audienceIsClientId: audiences.includes(AUTHACTION_CLIENT_ID),
    expiresInSeconds: exp === null ? null : exp - nowSeconds,
  };
}
