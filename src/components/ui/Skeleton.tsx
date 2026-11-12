interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
}

export function Skeleton({ width = "100%", height = 16, radius = 4, className = "" }: SkeletonProps) {
  return (
    <span
      className={`skeleton ${className}`.trim()}
      style={{ display: "block", width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

export function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className="stack-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={14} width={index === 1 ? "80%" : index === 2 ? "60%" : "100%"} />
      ))}
    </div>
  );
}
