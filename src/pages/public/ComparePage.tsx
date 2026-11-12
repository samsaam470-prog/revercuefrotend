import { AlertTriangle, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

type Mark = "yes" | "no" | "partial";

const COLUMNS = ["Revercue", "PDF + email", "Notion"];
const ROWS: { job: string; values: [Mark, Mark, Mark] }[] = [
  { job: "Proposal", values: ["yes", "partial", "partial"] },
  { job: "Contract with three client actions", values: ["yes", "no", "no"] },
  { job: "Requirement form with branching", values: ["yes", "no", "partial"] },
  { job: "Invoice with pay-by-link or proof upload", values: ["yes", "no", "no"] },
  { job: "Client record built from the documents", values: ["yes", "no", "partial"] },
  { job: "Tracking: opened, time spent, answers", values: ["yes", "no", "no"] },
  { job: "Follow-ups due, per client", values: ["yes", "no", "partial"] },
  { job: "Suggestions from your own pattern", values: ["yes", "no", "no"] },
  { job: "One link for the whole thread", values: ["yes", "no", "no"] },
];

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes") return <Check size={16} className="check-cell" aria-label="Yes" />;
  if (mark === "partial")
    return <AlertTriangle size={16} className="warn-cell" aria-label="Partly" />;
  return <X size={16} className="cross-cell" aria-label="No" />;
}

export function ComparePage() {
  return (
    <div className="page">
      <div className="page-head">
        <p className="eyebrow">Compare</p>
        <h1>The thread vs. the stack of tools you're using now.</h1>
        <p>
          A factual comparison of the jobs a freelancer has to do. No competitor bashing: each tool
          is good at what it does, and none of them keeps the thread.
        </p>
      </div>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Job</th>
              {COLUMNS.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.job}>
                <td>{row.job}</td>
                {row.values.map((mark, index) => (
                  <td key={index}>
                    <MarkIcon mark={mark} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="section">
        <div className="card card-lg">
          <h2 className="serif" style={{ fontSize: 26, marginBottom: 12 }}>
            What Revercue is not.
          </h2>
          <p className="muted">
            Not a CRM replacement, not a project manager, not an accounting tool. It is the thread:
            proposal, contract, requirement form, invoice and client record, connected. If you already
            have a CRM you love, Revercue does not ask you to leave it — it asks you to stop
            copy-pasting between five tabs.
          </p>
          <p className="caption mt-4">
            Legends: check means the job is native, the warning means partial or manual, the cross
            means it is not what the tool is for.
          </p>
          <Link to="/signup" className="btn btn-primary mt-6">
            Start Free
          </Link>
        </div>
      </section>
    </div>
  );
}
