export function BuilderVisual({ scale = 0.5 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-label">Builder</div>
      <div className="code-visual-body" />
    </div>
  );
}
