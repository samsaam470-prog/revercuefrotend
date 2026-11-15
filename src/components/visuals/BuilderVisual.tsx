/** The three-panel builder: sections left, canvas center, properties right. */
export function BuilderVisual() {
  return (
    <div className="cv" aria-label="The proposal builder with sections, the document canvas and the properties panel">
      <div className="cv-bar">
        <span>← Back</span>
        <span style={{ color: "var(--text-primary)" }}>Website Redesign for Acme Co.</span>
        <span style={{ color: "var(--green)" }}>Saved</span>
      </div>
      <div className="cv-split">
        <div>
          <span className="cv-label">Sections</span>
          {["Introduction", "Scope", "Pricing"].map((section, index) => (
            <div
              key={section}
              className="cv-item"
              style={{ color: index === 2 ? "var(--text-primary)" : undefined }}
            >
              <span style={{ color: "var(--text-tertiary)" }}>⋮⋮</span>
              <span>{section}</span>
            </div>
          ))}
          <span className="cv-label" style={{ display: "block", marginTop: 10 }}>
            Blocks
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {["Heading", "Paragraph", "Pricing", "FAQ"].map((block) => (
              <span
                key={block}
                className="cv-box"
                style={{ fontSize: 9, padding: "4px 5px", textAlign: "center" }}
              >
                {block}
              </span>
            ))}
          </div>
        </div>
        <div style={{ background: "#f4f1ea", padding: 10, position: "relative", overflow: "hidden" }}>
          <span className="cv-cursor" aria-hidden="true" />
          <div
            style={{
              background: "#fff",
              borderRadius: 4,
              padding: 10,
              color: "#2c2c2c",
              boxShadow: "0 2px 10px rgba(0,0,0,.2)",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#111" }}>
              Website Redesign for Acme Co.
            </div>
            <div style={{ fontSize: 8, color: "#8a857a", margin: "4px 0 8px" }}>
              Prepared for Acme Co. · REF-8KP92 · 6 min read
            </div>
            <div style={{ border: "1px solid var(--gold)", borderRadius: 3, padding: 4, fontSize: 9 }}>
              <b style={{ color: "#111" }}>Introduction</b>
              <div style={{ height: 3, background: "#eee9df", marginTop: 4, borderRadius: 2 }} />
              <div style={{ height: 3, background: "#eee9df", marginTop: 3, width: "80%", borderRadius: 2 }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 9, color: "#111" }}>
              <b>Scope</b>
              <div style={{ height: 3, background: "#eee9df", marginTop: 4, borderRadius: 2 }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 9, color: "#111" }}>
              <b>Pricing</b>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, color: "#8a6d2f" }}>
                <span>Basic</span>
                <span>$500</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#8a6d2f" }}>
                <span>Standard</span>
                <span>$1,200</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="cv-label">Properties</span>
          <div style={{ fontSize: 9, marginTop: 4 }} className="cv-selected-property">
            Heading
          </div>
          <div className="cv-line" style={{ height: 16, marginTop: 4 }} />
          <span className="cv-label" style={{ display: "block", marginTop: 8 }}>
            Level
          </span>
          <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
            {["H1", "H2", "H3"].map((level, index) => (
              <span
                key={level}
                className="cv-btn ghost"
                style={{ padding: "2px 6px", background: index === 1 ? "var(--gold-soft)" : undefined }}
              >
                {level}
              </span>
            ))}
          </div>
          <span className="cv-label" style={{ display: "block", marginTop: 8 }}>
            Alignment
          </span>
          <div className="cv-line" style={{ height: 12, marginTop: 3 }} />
        </div>
      </div>
    </div>
  );
}
