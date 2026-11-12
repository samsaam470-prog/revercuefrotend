export function CrmVisual({ scale = 0.4 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">CRM</div>
      <div className="code-visual-body">
        <div className="crm-visual"><h3>Acme Co.</h3><div className="comm-log"><p>Proposal sent — 2 days ago</p><p>Client replied — 1 day ago</p></div><div className="docs"><p>Proposal: published</p><p>Contract: draft</p></div></div>
      </div>
    </div>
  );
}
