export function SuggestionVisual({ scale = 1 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-label">Suggestion</div>
      <div className="code-visual-body" />
    </div>
  );
}
