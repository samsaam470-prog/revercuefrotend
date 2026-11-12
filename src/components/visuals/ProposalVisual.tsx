export function ProposalVisual({ scale = 0.4 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Proposal</div>
      <div className="code-visual-body">
        <div className="proposal-visual"><h3>Website Redesign for Acme Co.</h3><p>Prepared for Acme Co.</p><div className="packages"><div className="pkg">Basic $500</div><div className="pkg">Standard $1,200</div><div className="pkg">Premium $2,500</div></div></div>
      </div>
    </div>
  );
}
