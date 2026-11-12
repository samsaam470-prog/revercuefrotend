/** The public proposal view in the freelancer's brand. */
export function ProposalVisual() {
  return (
    <div className="cv cv-light" aria-label="The public proposal view with packages and an expanded FAQ">
      <div className="cv-bar" style={{ borderColor: "#e5e1d8" }}>
        <span className="cv-brand">
          <span className="mark" style={{ background: "#1a1a1a", color: "#fff" }}>
            A
          </span>
          Acme Studio
        </span>
        <span>ref 8Kp92xQ</span>
      </div>
      <div className="cv-body">
        <div>
          <span className="cv-label">Prepared for Acme Co. · 6 min read</span>
          <div className="cv-doc-title" style={{ marginTop: 3 }}>
            Website Redesign for Acme Co.
          </div>
        </div>
        <div>
          <b style={{ fontSize: 11 }}>Introduction</b>
          <div className="cv-line" style={{ height: 4, marginTop: 4 }} />
          <div className="cv-line" style={{ height: 4, marginTop: 3, width: "78%" }} />
        </div>
        <div>
          <b style={{ fontSize: 11 }}>Choose a package</b>
          <div className="cv-grid-3" style={{ marginTop: 5 }}>
            {[
              { name: "Basic", price: "$500" },
              { name: "Standard", price: "$1,200" },
              { name: "Premium", price: "$2,500" },
            ].map((pkg, index) => (
              <div
                key={pkg.name}
                className="cv-box"
                style={{
                  borderColor: index === 1 ? "#c9a961" : "#e5e1d8",
                  boxShadow: index === 1 ? "0 0 0 2px rgba(201,169,97,.2)" : undefined,
                }}
              >
                <b style={{ fontSize: 10 }}>{pkg.name}</b>
                <span style={{ color: "#8a6d2f", fontFamily: "var(--font-mono)" }}>{pkg.price}</span>
                <small style={{ marginTop: 3 }}>Deliverables included</small>
              </div>
            ))}
          </div>
        </div>
        <div
          className="cv-box"
          style={{ borderColor: "#e5e1d8", background: "#faf8f4" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
            <b>What is included in the Standard package?</b>
            <span>⌃</span>
          </div>
          <div style={{ fontSize: 9, color: "#4a4a4a", marginTop: 4 }}>
            The full site build, two revision rounds, and the brand guide.
          </div>
        </div>
      </div>
    </div>
  );
}
