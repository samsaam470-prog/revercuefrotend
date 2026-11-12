export function ChartVisual({ scale = 1 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-label">Chart</div>
      <div className="code-visual-body" />
    </div>
  );
}
