import type { User } from "../types";

/**
 * The onboarding contract, read from the backend's own `onboarding_step`.
 *
 * Step 6 means the flow is complete. A record created before onboarding
 * existed reports no step but does carry an `account_type`; it must not be
 * forced through the flow again. Nothing is inferred from local state, so a
 * refresh cannot reset the user to the beginning.
 */
const STEP_PATHS: Record<number, string> = {
  1: "/onboarding/step-1",
  2: "/onboarding/step-2",
  3: "/onboarding/step-4",
  4: "/onboarding/step-4",
  5: "/onboarding/step-5",
};

export function isOnboardingComplete(user: User | null | undefined): boolean {
  if (!user) return false;
  const step = user.onboarding_step ?? 0;
  if (step >= 6) return true;
  return step === 0 && Boolean(user.account_type);
}

/** The page a user must see next, from the record the backend returned. */
export function onboardingResumePath(user: User | null | undefined): string {
  if (!user) return "/onboarding/step-1";
  if (isOnboardingComplete(user)) return "/dashboard";
  const step = user.onboarding_step ?? 0;
  return STEP_PATHS[step] ?? "/onboarding/step-1";
}
