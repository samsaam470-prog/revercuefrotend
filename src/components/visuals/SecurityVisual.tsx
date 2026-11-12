export function SecurityVisual({ scale = 0.5 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">What Revercue Knows</div>
      <div className="code-visual-body">
        <div className="security-visual"><h3>What Revercue knows about you</h3><table><tr><td>Email</td><td>you@example.com</td></tr><tr><td>Plan</td><td>Free</td></tr></table></div>
      </div>
    </div>
  );
}
