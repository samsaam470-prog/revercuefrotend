export function SuggestionVisual({ scale = 1 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Suggestion</div>
      <div className="code-visual-body">
        <div className="suggestion-visual"><p>The client agreed to move forward. Create a contract?</p><div className="suggestion-actions"><button className="btn btn-primary">Create contract</button><button className="btn btn-ghost">Dismiss</button></div></div>
      </div>
    </div>
  );
}
