import { Activity, Clock, DollarSign, FileText, Users } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";

function StatValue({ value, money }: { value: number; money?: boolean }) {
  const display = useCountUp(value);
  return (
    <b className="cv-stat" style={{ marginTop: 4 }}>
      {money ? `$${display.toLocaleString("en-US")}` : display}
    </b>
  );
}

/** The dashboard shell: stat strip, suggested actions, create row, activity feed. */
export function DashboardVisual() {
  const stats = [
    { value: 12, label: "Active documents", icon: FileText },
    { value: 8, label: "Clients", icon: Users },
    { value: 3, label: "Follow-ups due", icon: Clock },
    { value: 2900, label: "Total revenue", icon: DollarSign, money: true },
  ];
  const activity = [
    "Acme Co. opened the proposal · 2h ago",
    "Beta Ltd. approved the contract · 5h ago",
    "Acme Co. submitted the requirement form · 1d ago",
    "Northwind paid INV-2026-0041 · 2d ago",
    "Beta Ltd. asked a question · 3d ago",
  ];

  return (
    <div className="cv" aria-label="Revercue dashboard with stat strip, suggested actions and recent activity">
      <div className="cv-bar">
        <span className="cv-brand">
          <span className="mark">R</span> Revercue
        </span>
        <span>Dashboard</span>
      </div>
      <div className="cv-body">
        <div className="cv-grid-4">
          {stats.map((stat) => (
            <div key={stat.label} className="cv-box">
              <stat.icon size={11} color="var(--gold)" />
              <StatValue value={stat.value} money={stat.money} />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="cv-grid-2">
          <div className="cv-box">
            <span className="cv-label">Suggested actions</span>
            {["Follow up with Acme Co.", "Create the contract for Beta Ltd.", "Acme Co. is 72% interested"].map(
              (item) => (
                <div className="cv-item" key={item}>
                  <Activity size={10} color="var(--gold)" />
                  <span style={{ flex: 1 }}>{item}</span>
                  <span className="cv-pill">Do it</span>
                </div>
              ),
            )}
          </div>
          <div className="cv-box">
            <span className="cv-label">Create</span>
            <div className="cv-item" style={{ gap: 6 }}>
              <span className="cv-btn">Create proposal</span>
            </div>
            <div className="cv-item" style={{ gap: 6, flexWrap: "wrap" }}>
              <span className="cv-btn ghost">Contract</span>
              <span className="cv-btn ghost">Invoice</span>
              <span className="cv-btn ghost">Form</span>
            </div>
            <span className="cv-label" style={{ marginTop: 6 }}>
              Pending payments: $4,200 (3 invoices)
            </span>
          </div>
        </div>
        <div className="cv-box">
          <span className="cv-label">Recent activity</span>
          {activity.map((item) => (
            <div className="cv-item" key={item}>
              <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--gold)" }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
