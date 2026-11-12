import { ReactNode } from 'react';

export interface CodeVisualProps {
  children?: ReactNode;
  className?: string;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function CodeVisual({ children, className = '', variant = 'default', disabled = false, loading = false }: CodeVisualProps) {
  const classes = ['code-visual', `variant-${variant}`, className, disabled ? 'is-disabled' : '', loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  return (
    <div className={classes} data-variant={variant} aria-disabled={disabled}>
      {loading ? <span className="spinner" /> : children}
    </div>
  );
}
