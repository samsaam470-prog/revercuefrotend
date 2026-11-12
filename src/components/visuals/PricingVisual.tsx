export function PricingVisual({ scale = 0.5 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Pricing</div>
      <div className="code-visual-body">
        <div className="pricing-visual"><table><thead><tr><th>Feature</th><th>Free</th><th>Growth</th><th>Scale</th></tr></thead><tbody><tr><td>Active docs</td><td>5</td><td>100</td><td>300</td></tr><tr><td>Retention</td><td>1 mo</td><td>12 mo</td><td>24 mo</td></tr></tbody></table></div>
      </div>
    </div>
  );
}
