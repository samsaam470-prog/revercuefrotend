/** The CRM client detail: communication log, documents, notes, interest. */
export function CrmVisual() {
  return (
    <div className="cv" aria-label="The CRM client record with the communication log, documents and notes">
      <div className="cv-bar">
        <span className="cv-brand">
          <span className="mark">R</span> Revercue
        </span>
        <span>CRM</span>
      </div>
      <div className="cv-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <b style={{ fontSize: 13 }}>Acme Co.</b>
            <span style={{ display: "block" }}>hello@acme.co · Email</span>
          </div>
          <span className="cv-pill green">72% interested</span>
        </div>
        <div className="cv-grid-2">
          <div className="cv-box">
            <span className="cv-label">Communication log</span>
            {[
              "Sent the proposal · 2d ago",
              "Reply: looks good, one question · 1d ago",
              "Follow-up scheduled · today",
              "Shared the contract · today",
              "Opened the proposal · 4h ago",
              "Answered 2 embedded questions · 4h ago",
            ].map((entry) => (
              <div className="cv-item" key={entry}>
                <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--gold)" }} />
                <span>{entry}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="cv-box">
              <span className="cv-label">Documents</span>
              <div className="cv-item">
                <span style={{ flex: 1 }}>Website Redesign</span>
                <span className="cv-pill">Published</span>
              </div>
              <div className="cv-item">
                <span style={{ flex: 1 }}>MSA Agreement</span>
                <span className="cv-pill green">Approved</span>
              </div>
              <div className="cv-item">
                <span style={{ flex: 1 }}>INV-2026-0042</span>
                <span className="cv-pill">Pending</span>
              </div>
            </div>
            <div className="cv-box">
              <span className="cv-label">Notes</span>
              <div className="cv-item">Prefers WhatsApp for follow-ups.</div>
              <div className="cv-item">Budget confirmed at $1,200.</div>
            </div>
            <div className="cv-box">
              <span className="cv-label">Revenue · Scale</span>
              <b>$1,200</b>
              <span>Earned from this client</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
