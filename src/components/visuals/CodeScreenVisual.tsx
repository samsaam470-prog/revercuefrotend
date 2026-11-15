/** The verification code screen: six boxes, the message, the resend row. */
export function CodeScreenVisual() {
  return (
    <div className="cv" aria-label="The verification code screen with six boxes">
      <div className="cv-body">
        <span className="cv-label">Verify your email</span>
        <span style={{ fontSize: 9 }}>We sent a six-digit code to you@studio.com.</span>
        <div className="cv-code">
          {["4", "8", "1", "5", "", ""].map((digit, index) => (
            <i key={index} style={{ borderColor: index === 4 ? "var(--gold)" : undefined }}>
              {digit}
            </i>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9 }}>Code expires in 4:38</span>
          <span className="cv-btn">Verify</span>
        </div>
        <span style={{ fontSize: 8.5 }}>No code? Resend it.</span>
      </div>
    </div>
  );
}
