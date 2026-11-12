import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondary,
  children,
}: EmptyStateProps) {
  return (
    <div className="empty">
      <Icon size={40} strokeWidth={1.5} aria-hidden="true" />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
      {(action || secondary) && (
        <div className="empty-actions">
          {action && (
            <button type="button" className="btn btn-primary" onClick={action.onClick}>
              {action.label}
            </button>
          )}
          {secondary && (
            <button type="button" className="btn btn-ghost" onClick={secondary.onClick}>
              {secondary.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
