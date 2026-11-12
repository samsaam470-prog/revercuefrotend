/** A sample bar chart. Used in the chart block, the pricing page and the revenue tab. */
export function ChartVisual({ title = "Revenue this month" }: { title?: string }) {
  const bars = [38, 56, 44, 72, 61, 88, 74, 96];
  return (
    <div className="cv" aria-label="A bar chart of revenue by week">
      <div className="cv-bar">
        <span>{title}</span>
        <span className="cv-pill green">+18%</span>
      </div>
      <div className="cv-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <b style={{ fontSize: 18, color: "var(--text-primary)" }}>$2,900</b>
          <span>Aug · 4 weeks</span>
        </div>
        <div className="cv-bars">
          {bars.map((height, index) => (
            <span
              key={index}
              style={{
                height: `${height}%`,
                animationDelay: `${index * 60}ms`,
                opacity: 0.45 + index * 0.07,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8 }}>
          {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((week) => (
            <span key={week}>{week}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
