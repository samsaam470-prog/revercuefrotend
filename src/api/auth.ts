import { api } from "./client";
import type { User } from "../types";

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  requires_2fa?: boolean;
  pre_2fa_token?: string;
  email_verified?: boolean;
  cooldown_seconds?: number;
}

export interface LinkStartResponse {
  success: true;
  /** Masked address the code was sent to (never the full address). */
  email?: string;
  expires_in?: number;
  /** False when Revercue could not deliver the code. Never assume success. */
  email_sent?: boolean;
  message?: string;
}

export interface LinkConfirmResponse {
  success: true;
  created: boolean;
  user: { id: string; email: string; plan: string } | null;
}

/**
 * Identity authentication is owned by AuthAction. These endpoints only load
 * the Revercue record for a verified AuthAction token, link an existing record
 * after mailbox verification, and end the Revercue session.
 *
 * Every request here runs before a Revercue session exists, so a 401 is a
 * result to interpret (`account_link_required`, a rejected token, a missing
 * link) and must never be converted into the global "session expired" jump by
 * `suppressUnauthorized`.
 */
export const authApi = {
  me: (token?: string | null) =>
    api.get<{ user: User }>("/api/auth/me", { token, suppressUnauthorized: true }),

  logout: () => api.post<{ success: true }>("/api/auth/logout", undefined, {
    suppressUnauthorized: true,
  }),

  linkStart: (body: { email: string }) =>
    api.post<LinkStartResponse>("/api/auth/link/start", body, { suppressUnauthorized: true }),

  linkConfirm: (body: { email: string; code: string }) =>
    api.post<LinkConfirmResponse>("/api/auth/link/confirm", body, {
      suppressUnauthorized: true,
    }),
};
