export function DashboardVisual({ scale = 0.5 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Dashboard</div>
      <div className="code-visual-body">
        <div className="stat-strip"><div className="stat-card"><span className="stat-num">12</span><span className="stat-label">Active documents</span></div><div className="stat-card"><span className="stat-num">8</span><span className="stat-label">Clients</span></div><div className="stat-card"><span className="stat-num">3</span><span className="stat-label">Follow-ups due</span></div><div className="stat-card"><span className="stat-num">$2,900</span><span className="stat-label">Revenue</span></div></div><div className="suggestion-card"><p>The client agreed to move forward. Create a contract?</p></div><div className="create-row"><button className="btn btn-primary">Create proposal</button><button className="btn btn-ghost">Create contract</button><button className="btn btn-ghost">Create invoice</button></div>
      </div>
    </div>
  );
}
