import { Badge, type BadgeVariant } from "../ui/Badge";
import type { DocStatus } from "../../types";

const MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  draft: { variant: "muted", label: "Draft" },
  published: { variant: "gold", label: "Published" },
  archived: { variant: "muted", label: "Archived" },
  approved: { variant: "green", label: "Approved" },
  declined: { variant: "red", label: "Declined" },
  closed: { variant: "muted", label: "Closed" },
  paid: { variant: "green", label: "Paid" },
  confirmed: { variant: "green", label: "Confirmed" },
  verified: { variant: "green", label: "Verified" },
  overdue: { variant: "red", label: "Overdue" },
  proof_submitted: { variant: "amber", label: "Proof submitted" },
  pending: { variant: "amber", label: "Pending" },
};

export function StatusBadge({ status }: { status: DocStatus | string }) {
  const entry = MAP[status] ?? { variant: "default" as BadgeVariant, label: status };
  return <Badge variant={entry.variant}>{entry.label}</Badge>;
}
