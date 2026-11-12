import { api } from "./client";
import type { AccountType, PlanName } from "../types";

export interface OnboardingProfile {
  name: string;
  business_name?: string;
  services: string[];
  volume_per_month?: string;
  website?: string;
  fiverr_profile?: string;
  agency_name?: string;
  agency_size?: string;
  brand_primary?: string;
  brand_secondary?: string;
}

export const onboardingApi = {
  step1: (account_type: AccountType) =>
    api.patch<{ success: true; onboarding_step: number }>("/api/onboarding/step-1", { account_type }),

  step2: (profile: OnboardingProfile) =>
    api.patch<{ success: true; onboarding_step: number }>("/api/onboarding/step-2", profile),

  websiteHelp: (body: {
    name: string;
    email: string;
    website_type: string;
    business: string;
    timeline: string;
    notes?: string;
  }) => api.post<{ success: true }>("/api/onboarding/website-help", body),

  step4: (body: { tos_accepted: true; newsletter_opt_in: boolean }) =>
    api.patch<{ success: true; onboarding_step: number }>("/api/onboarding/step-4", body),

  step5: (body: { plan: "free" | "waitlist"; plan_requested?: Exclude<PlanName, "free" | "teams"> }) =>
    api.patch<{ success: true; onboarding_step: number }>("/api/onboarding/step-5", body),

  tutorial: (body: { completed: boolean } | { skipped: boolean }) =>
    api.patch<{ success: true }>("/api/onboarding/tutorial", body),
};
