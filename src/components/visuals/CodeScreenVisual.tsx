export function CodeScreenVisual({ scale = 0.6 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-label">Code Screen</div>
      <div className="code-visual-body" />
    </div>
  );
}
