export function CodeScreenVisual({ scale = 0.6 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Code Screen</div>
      <div className="code-visual-body">
        <div className="code-screen"><div className="code-boxes"><span>_</span><span>_</span><span>_</span><span>_</span><span>_</span><span>_</span></div><p className="code-note">Check your inbox. FormSubmit will send you an activation email.</p></div>
      </div>
    </div>
  );
}
