import { ReactNode } from 'react';

export interface EmptyStateProps {
  children?: ReactNode;
  className?: string;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function EmptyState({ children, className = '', variant = 'default', disabled = false, loading = false }: EmptyStateProps) {
  const classes = ['empty-state', `variant-${variant}`, className, disabled ? 'is-disabled' : '', loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  return (
    <div className={classes} data-variant={variant} aria-disabled={disabled}>
      {loading ? <span className="spinner" /> : children}
    </div>
  );
}
