export function FormVisual({ scale = 0.4 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Form Editor</div>
      <div className="code-visual-body">
        <div className="form-visual"><div className="q-list"><p>Q1: What is your budget?</p><p>Q2: Timeline?</p><p>Q3: Deliverables?</p></div><div className="q-editor"><p>Question text</p><p>Type: short text</p></div></div>
      </div>
    </div>
  );
}
