import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface PlanContextType { plan: string; hasFeature: (f: string) => boolean; }
const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const plan = user?.plan ?? 'free';
  const hasFeature = (f: string) => ['growth','scale','teams'].includes(plan);
  return <PlanContext.Provider value={{ plan, hasFeature }}>{children}</PlanContext.Provider>;
}

export function usePlan() { const ctx = useContext(PlanContext); if (!ctx) throw new Error('usePlan must be inside PlanProvider'); return ctx; }
