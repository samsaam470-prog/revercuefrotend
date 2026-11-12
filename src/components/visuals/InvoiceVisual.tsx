export function InvoiceVisual({ scale = 0.4 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Invoice</div>
      <div className="code-visual-body">
        <div className="invoice-visual"><h3>INV-2026-0042</h3><p>Due: 2026-11-26</p><table><tr><td>Design</td><td>$800</td></tr><tr><td>Development</td><td>$400</td></tr></table><p><strong>Total: $1,200</strong></p><button className="btn btn-primary">Buy Now</button></div>
      </div>
    </div>
  );
}
