/** The form editor: question list, question editor, settings. */
export function FormVisual() {
  const questions = [
    "What is your company name?",
    "What is the project budget?",
    "Describe the scope",
    "Which services?",
    "When do you need it?",
  ];
  return (
    <div className="cv" aria-label="The form editor with a question list, a question editor and branching">
      <div className="cv-bar">
        <span>← Back</span>
        <span style={{ color: "var(--text-primary)" }}>Project intake</span>
        <span className="cv-pill">Draft</span>
      </div>
      <div className="cv-split">
        <div>
          <span className="cv-label">5 questions · 2 required</span>
          {questions.map((question, index) => (
            <div className="cv-item" key={question} style={{ alignItems: "flex-start" }}>
              <span style={{ color: "var(--text-tertiary)" }}>⋮⋮</span>
              <span style={{ flex: 1 }}>Q{index + 1}. {question}</span>
              {index < 2 && <span style={{ color: "var(--gold)" }}>•</span>}
            </div>
          ))}
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <span className="cv-label">Question 2</span>
          <div className="cv-box" style={{ marginTop: 4 }}>
            <b>What is the project budget?</b>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
              {["Under $1k", "$1k – $5k", "Over $5k"].map((option) => (
                <div className="cv-item" key={option} style={{ border: 0, padding: 0 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      border: "1px solid var(--border-strong)",
                    }}
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cv-box" style={{ marginTop: 6 }}>
            <span className="cv-label">Branching · Growth and Scale</span>
            <div className="cv-item">
              <span>If answer is “Over $5k”</span>
              <span className="cv-pill">show Q3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
