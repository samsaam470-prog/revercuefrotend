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

/**
 * Identity authentication is owned by AuthAction. These endpoints only load
 * the Revercue application record for a verified AuthAction token and end the
 * Revercue session.
 *
 * Every request here runs before a Revercue session exists, so a 401 is a
 * result to interpret (a rejected token, an unprovisioned account) and must
 * never be converted into the global "session expired" jump by
 * `suppressUnauthorized`.
 */
export const authApi = {
  me: (token?: string | null) =>
    api.get<{ user: User }>("/api/auth/me", { token, suppressUnauthorized: true }),

  logout: () => api.post<{ success: true }>("/api/auth/logout", undefined, {
    suppressUnauthorized: true,
  }),
};
