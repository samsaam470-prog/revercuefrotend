export function BuilderVisual({ scale = 0.5 }: { scale?: number }) {
  return (
    <div className="code-visual" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div className="code-visual-header">Proposal Builder</div>
      <div className="code-visual-body">
        <div className="builder-grid"><div className="builder-left"><p>Sections</p><p>Introduction</p><p>Scope</p><p>Pricing</p></div><div className="builder-center"><h3>Website Redesign for Acme Co.</h3><p>Introduction</p><p>We understand Acme Co. is an e-commerce business...</p></div><div className="builder-right"><p>Properties</p><p>Heading</p></div></div>
      </div>
    </div>
  );
}
