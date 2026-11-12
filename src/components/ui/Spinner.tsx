import { ReactNode } from 'react';

export interface SpinnerProps {
  children?: ReactNode;
  className?: string;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function Spinner({ children, className = '', variant = 'default', disabled = false, loading = false }: SpinnerProps) {
  const classes = ['spinner', `variant-${variant}`, className, disabled ? 'is-disabled' : '', loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  return (
    <div className={classes} data-variant={variant} aria-disabled={disabled}>
      {loading ? <span className="spinner" /> : children}
    </div>
  );
}
