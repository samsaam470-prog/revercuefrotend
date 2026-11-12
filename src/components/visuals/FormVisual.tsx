export function FormVisual({ scale = 0.4 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-label">Form</div>
      <div className="code-visual-body" />
    </div>
  );
}
