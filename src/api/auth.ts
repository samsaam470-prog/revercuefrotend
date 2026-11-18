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
 * the Revercue record for a verified AuthAction token, link an existing record
 * after mailbox verification, and end the Revercue session.
 */
export const authApi = {
  me: (token?: string) => api.get<{ user: User }>("/api/auth/me", { token }),

  logout: () => api.post<{ success: true }>("/api/auth/logout"),

  linkStart: (body: { email: string }) =>
    api.post<{ success: true; message?: string }>("/api/auth/link/start", body),

  linkConfirm: (body: { email: string; code: string }) =>
    api.post<{
      success: true;
      created: boolean;
      user: { id: string; email: string; plan: string } | null;
    }>("/api/auth/link/confirm", body),
};
