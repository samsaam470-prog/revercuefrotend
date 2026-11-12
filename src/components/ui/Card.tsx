import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}

export function Card({ children, padding = "md", className = "", ...rest }: CardProps) {
  return (
    <div className={`card card-${padding} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
