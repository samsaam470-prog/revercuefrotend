import { FORMSUBMIT_COPY } from "../../lib/constants";

/** The FormSubmit code screen: six boxes, the prominent message, the disclaimer. */
export function CodeScreenVisual() {
  return (
    <div className="cv" aria-label="The verification code screen with six boxes and the FormSubmit message">
      <div className="cv-body">
        <span className="cv-label">Verify your email</span>
        <div className="cv-code">
          {["4", "8", "1", "5", "", ""].map((digit, index) => (
            <i key={index} style={{ borderColor: index === 4 ? "var(--gold)" : undefined }}>
              {digit}
            </i>
          ))}
        </div>
        <div
          className="cv-box"
          style={{ borderColor: "rgba(201,169,97,.55)", background: "var(--gold-soft)" }}
        >
          <span style={{ color: "var(--text-secondary)", fontSize: 8.5, lineHeight: 1.5 }}>
            {FORMSUBMIT_COPY}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9 }}>Code expires in 4:38</span>
          <span className="cv-btn">Verify</span>
        </div>
        <span style={{ fontSize: 8.5 }}>
          The activation is for transactional emails, app notifications and security alerts. It does
          not opt you in to the newsletter.
        </span>
      </div>
    </div>
  );
}
