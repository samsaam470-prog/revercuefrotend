import { useContext } from "react";
import { PlanContext, type PlanState } from "../contexts/PlanContext";

export function usePlanGate(): PlanState {
  const value = useContext(PlanContext);
  if (!value) throw new Error("usePlanGate must be used inside PlanProvider");
  return value;
}
