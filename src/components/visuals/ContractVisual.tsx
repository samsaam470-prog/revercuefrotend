export function ContractVisual({ scale = 0.4 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Contract</div>
      <div className="code-visual-body">
        <div className="contract-visual"><h3>Service Agreement</h3><p>Scope: Website redesign</p><p>Payment: 50% upfront</p><div className="contract-actions"><button className="btn btn-primary">Approve</button><button className="btn btn-ghost">Decline</button><button className="btn btn-ghost">I Have Questions</button></div></div>
      </div>
    </div>
  );
}
