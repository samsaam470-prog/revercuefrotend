export function ChartVisual({ scale = 1 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Revenue</div>
      <div className="code-visual-body">
        <div className="chart-visual"><div className="bar" style={{ height: "60%" }} /><div className="bar" style={{ height: "80%" }} /><div className="bar" style={{ height: "40%" }} /><div className="bar" style={{ height: "90%" }} /></div>
      </div>
    </div>
  );
}
