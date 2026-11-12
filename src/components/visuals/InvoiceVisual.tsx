/** The public invoice view. */
export function InvoiceVisual() {
  return (
    <div className="cv cv-light" aria-label="The public invoice view with line items, total and the Buy Now button">
      <div className="cv-bar" style={{ borderColor: "#e5e1d8" }}>
        <span className="cv-brand">
          <span className="mark" style={{ background: "#1a1a1a", color: "#fff" }}>
            A
          </span>
          Acme Studio
        </span>
        <span className="mono">INV-2026-0042</span>
      </div>
      <div className="cv-body">
        <div className="cv-meta" style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="cv-doc-title" style={{ fontSize: 18 }}>
              Invoice for Acme Co.
            </div>
            <span>Billed to Acme Co. · due 12 Dec 2026</span>
          </div>
          <span className="cv-pill">Published</span>
        </div>
        <table className="cv-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th style={{ textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Website redesign — design phase</td>
              <td>1</td>
              <td style={{ textAlign: "right" }}>$700</td>
            </tr>
            <tr>
              <td>Frontend build</td>
              <td>1</td>
              <td style={{ textAlign: "right" }}>$500</td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
          <span>Subtotal $1,200 · Tax $0</span>
          <b style={{ fontSize: 13 }}>Total $1,200</b>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span className="cv-btn">Buy Now</span>
          <span>Pay by card, or bank transfer with proof</span>
        </div>
      </div>
    </div>
  );
}
