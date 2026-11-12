/** The "What Revercue knows" transparency page. */
export function SecurityVisual() {
  return (
    <div className="cv" aria-label="The transparency page listing account data and private data">
      <div className="cv-bar">
        <span>What Revercue knows</span>
        <span className="cv-pill">Scale</span>
      </div>
      <div className="cv-body">
        <div className="cv-box">
          <span className="cv-label">Account data · the team can see this</span>
          <table className="cv-table">
            <tbody>
              <tr>
                <td>Email</td>
                <td>you@studio.com</td>
              </tr>
              <tr>
                <td>Plan</td>
                <td>Scale</td>
              </tr>
              <tr>
                <td>Usage</td>
                <td>12 of unlimited documents</td>
              </tr>
              <tr>
                <td>Last login</td>
                <td>2 hours ago</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cv-box">
          <span className="cv-label">Private data · only you can see this</span>
          <div className="cv-grid-2">
            {[
              "Document content",
              "Client names and emails",
              "Communication log",
              "Notes",
              "Saved FAQs and packages",
              "Tracking data",
            ].map((item) => (
              <div className="cv-item" key={item} style={{ border: 0, padding: "3px 0" }}>
                <span style={{ color: "var(--green)" }}>●</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <span style={{ fontSize: 9 }}>
          We store your data so the product works. We do not read it. The team sees your account
          details, nothing more.
        </span>
      </div>
    </div>
  );
}
