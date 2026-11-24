import { api } from "./client";
import type { PlanName, User } from "../types";

export interface TestAccountInfo {
  enabled: boolean;
  registered: boolean;
  page: string;
  email: string;
  login_email: string;
  password: string;
  plan: PlanName;
  plans: PlanName[];
  account: (Pick<User, "id" | "email" | "plan" | "onboarding_step"> & {
    name?: string | null;
    business_name?: string | null;
    onboarding_complete?: boolean;
  }) | null;
  note?: string;
}

export interface TestAccountSession {
  success: boolean;
  token: string;
  user: User;
  credentials: { email: string; password: string };
  environment?: {
    skipped: boolean;
    clients: number;
    proposals: number;
    contracts: number;
    forms: number;
    invoices: number;
    notifications: number;
    warnings: string[];
  };
}

/**
 * Review-environment endpoints. They are public by design (the account is a
 * fixed demo identity), so a rejected request is shown as a form error rather
 * than treated as an expired session.
 */
export const testAccountApi = {
  info: () => api.get<TestAccountInfo>("/api/test-account", { suppressUnauthorized: true }),

  login: (email: string, password: string) =>
    api.post<TestAccountSession>(
      "/api/test-account/login",
      { email, password },
      { suppressUnauthorized: true }
    ),

  signup: (email: string, plan: PlanName) =>
    api.post<TestAccountSession>(
      "/api/test-account/signup",
      { email, plan },
      { suppressUnauthorized: true }
    ),

  changePlan: (plan: PlanName) =>
    api.post<{ success: boolean; plan: PlanName; user: User; plans: PlanName[] }>(
      "/api/test-account/plan",
      { plan }
    ),

  reset: () =>
    api.post<{ success: boolean; environment: TestAccountSession["environment"] }>(
      "/api/test-account/reset"
    ),

  remove: () =>
    api.del<{ success: boolean; deleted: boolean; message: string; warnings: string[] }>(
      "/api/test-account"
    ),
};
