import { Badge, type BadgeVariant } from "../ui/Badge";
import { PLAN_LABEL } from "../../lib/constants";
import type { PlanName } from "../../types";

const VARIANTS: Record<PlanName, BadgeVariant> = {
  free: "muted",
  starter: "default",
  growth: "gold",
  scale: "green",
  teams: "amber",
};

export function PlanBadge({ plan }: { plan: PlanName }) {
  return <Badge variant={VARIANTS[plan]}>{PLAN_LABEL[plan]}</Badge>;
}
