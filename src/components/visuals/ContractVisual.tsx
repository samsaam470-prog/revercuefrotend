/** The public contract view: sections and the three client actions. */
export function ContractVisual() {
  return (
    <div className="cv cv-light" aria-label="The public contract view with Approve, Decline and I Have Questions">
      <div className="cv-bar" style={{ borderColor: "#e5e1d8" }}>
        <span className="cv-brand">
          <span className="mark" style={{ background: "#1a1a1a", color: "#fff" }}>
            A
          </span>
          Acme Studio
        </span>
        <span>Contract · ref 4mQ81z</span>
      </div>
      <div className="cv-body">
        <div className="cv-doc-title" style={{ fontSize: 18 }}>
          Master Services Agreement
        </div>
        <span>Prepared for Acme Co.</span>
        {["Parties", "Scope", "Payment", "Revisions", "Signatures"].map((section) => (
          <div key={section}>
            <b style={{ fontSize: 10 }}>{section}</b>
            <div className="cv-line" style={{ height: 4, marginTop: 4 }} />
            <div className="cv-line" style={{ height: 4, marginTop: 3, width: "72%" }} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          <span className="cv-btn">Sign and approve</span>
          <span
            className="cv-btn ghost"
            style={{ borderColor: "#e0a0a0", color: "#a03030" }}
          >
            Decline
          </span>
          <span className="cv-btn ghost">I Have Questions</span>
        </div>
        <small>
          Signing is a typed full name plus an explicit consent tick, recorded with the date and the
          version. It is a simple electronic signature, not a certificate-based qualified one.
        </small>
      </div>
    </div>
  );
}
