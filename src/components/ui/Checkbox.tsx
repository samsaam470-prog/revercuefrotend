import { ReactNode } from 'react';

export interface CheckboxProps {
  children?: ReactNode;
  className?: string;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function Checkbox({ children, className = '', variant = 'default', disabled = false, loading = false }: CheckboxProps) {
  const classes = ['checkbox', `variant-${variant}`, className, disabled ? 'is-disabled' : '', loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  return (
    <div className={classes} data-variant={variant} aria-disabled={disabled}>
      {loading ? <span className="spinner" /> : children}
    </div>
  );
}
