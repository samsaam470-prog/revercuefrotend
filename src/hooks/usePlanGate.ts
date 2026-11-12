import { usePlan } from '../contexts/PlanContext';

export function usePlanGate(feature: string) { const { hasFeature } = usePlan(); return hasFeature(feature); }
