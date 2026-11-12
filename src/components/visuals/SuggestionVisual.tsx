/** The suggestion card. */
export function SuggestionVisual() {
  return (
    <div className="cv" aria-label="A suggestion card asking whether to create a contract">
      <div className="cv-body" style={{ gap: 8 }}>
        <span className="cv-pill">Suggested action</span>
        <b style={{ fontSize: 13, color: "var(--text-primary)" }}>
          The client agreed to move forward. Create a contract?
        </b>
        <span>
          Acme Co. replied “looks good, let’s start” 1 day after you sent the proposal.
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <span className="cv-btn">Create contract</span>
          <span className="cv-btn ghost">Dismiss</span>
        </div>
        <span style={{ fontSize: 9 }}>
          This is a pattern in your communication log, not a model. You click, you create.
        </span>
      </div>
    </div>
  );
}
