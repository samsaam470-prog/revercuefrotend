interface SpinnerProps {
  size?: 16 | 20 | 24 | 32;
  color?: string;
  label?: string;
}

export function Spinner({ size = 16, color, label = "Loading" }: SpinnerProps) {
  return (
    <span
      className={size >= 32 ? "spinner spinner-lg" : "spinner"}
      role="status"
      aria-label={label}
      style={{
        width: size,
        height: size,
        ...(color ? { borderTopColor: color } : null),
      }}
    />
  );
}
