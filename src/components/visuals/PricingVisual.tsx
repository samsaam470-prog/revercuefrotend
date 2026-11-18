/** The pricing comparison table. */
export function PricingVisual() {
  const rows = [
    { label: "Active documents", values: ["5", "20", "100", "300"] },
    { label: "Document retention", values: ["1 month", "3 months", "12 months", "24 months"] },
    { label: "Draft retention", values: ["10 days", "30 days", "50 days", "80 days"] },
    { label: "Archive", values: ["5 / 15d", "15 / 30d", "30 / 30d", "30 / 30d"] },
    { label: "Custom templates", values: ["—", "3", "10", "15"] },
    { label: "Saved FAQs", values: ["—", "—", "10", "30"] },
    { label: "Password-protected", values: ["—", "—", "15", "50"] },
    { label: "Interest level", values: ["—", "—", "—", "Yes"] },
  ];

  return (
    <div className="cv" aria-label="The pricing comparison table">
      <div className="cv-bar">
        <span>Compare the plans</span>
        <span>Only Free is self-serve</span>
      </div>
      <div className="cv-body">
        <table className="cv-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Free</th>
              <th>Starter</th>
              <th>Growth</th>
              <th>Scale</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                {row.values.map((value, index) => (
                  <td
                    key={index}
                    style={{ color: value === "—" ? "var(--text-tertiary)" : "var(--text-primary)" }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
