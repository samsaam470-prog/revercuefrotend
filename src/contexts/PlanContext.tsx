import { createContext, useMemo, type ReactNode } from "react";
import { PLAN_LABEL, PLAN_LIMITS, planHasFeature, type Feature } from "../lib/constants";
import { useAuth } from "../hooks/useAuth";
import type { PlanName } from "../types";

export interface PlanState {
  plan: PlanName;
  label: string;
  limits: (typeof PLAN_LIMITS)[PlanName];
  hasFeature: (feature: Feature) => boolean;
  isFree: boolean;
  isPaid: boolean;
}

export const PlanContext = createContext<PlanState | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const plan: PlanName = user?.plan ?? "free";

  const value = useMemo<PlanState>(
    () => ({
      plan,
      label: PLAN_LABEL[plan],
      limits: PLAN_LIMITS[plan],
      hasFeature: (feature: Feature) => planHasFeature(plan, feature),
      isFree: plan === "free",
      isPaid: plan !== "free",
    }),
    [plan],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}
