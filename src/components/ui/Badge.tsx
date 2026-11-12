import type { ReactNode } from "react";

export type BadgeVariant = "default" | "gold" | "green" | "red" | "amber" | "muted";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return <span className={`badge badge-${variant} ${className}`.trim()}>{children}</span>;
}
