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

export const authApi = {
  signup: (body: { email: string; password: string; tos_accepted: true; newsletter_opt_in: boolean }) =>
    api.post<AuthResponse>("/api/auth/signup", body, { token: null }),

  login: (body: { email: string; password: string }) =>
    api.post<AuthResponse>("/api/auth/login", body, { token: null }),

  google: (id_token: string) => api.post<AuthResponse>("/api/auth/google", { id_token }, { token: null }),

  me: (token?: string) => api.get<{ user: User }>("/api/auth/me", { token }),

  logout: () => api.post<{ success: true }>("/api/auth/logout"),

  verifyEmail: (token: string, code: string) =>
    api.post<AuthResponse>("/api/auth/verify-email", { code }, { token }),

  resendVerification: (token: string) =>
    api.post<{ success: true; cooldown_seconds: number }>("/api/auth/resend-verification", {}, { token }),

  verify2fa: (code: string, pre_2fa_token: string) =>
    api.post<AuthResponse>("/api/auth/2fa/verify", { code, pre_2fa_token }, { token: null }),

  resend2fa: (pre_2fa_token: string) =>
    api.post<{ success: true; cooldown_seconds: number }>(
      "/api/auth/2fa/resend",
      { pre_2fa_token },
      { token: null },
    ),

  requestPasswordReset: (email: string) =>
    api.post<{ success: true }>("/api/auth/password-reset/request", { email }, { token: null }),

  verifyPasswordReset: (body: { email: string; code: string; new_password: string }) =>
    api.post<{ success: true }>("/api/auth/password-reset/verify", body, { token: null }),
};
