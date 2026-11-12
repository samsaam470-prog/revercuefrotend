import { Link } from "react-router-dom";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export type ClosedReason = "approved" | "declined" | "expired" | "paid" | "submitted";

const COPY: Record<ClosedReason, { icon: typeof CheckCircle2; title: string; body: string }> = {
  approved: {
    icon: CheckCircle2,
    title: "This document is closed.",
    body: "You already approved it. The freelancer has your answer.",
  },
  declined: {
    icon: XCircle,
    title: "This document is closed.",
    body: "It was declined. If that was a mistake, contact the freelancer and they can share a new link.",
  },
  expired: {
    icon: Clock,
    title: "This link has expired.",
    body: "Ask the freelancer for a new link. Nothing you did was lost.",
  },
  paid: {
    icon: CheckCircle2,
    title: "This invoice is closed.",
    body: "The payment was confirmed. Thank you.",
  },
  submitted: {
    icon: CheckCircle2,
    title: "You already submitted this form.",
    body: "The freelancer has your answers. They'll be in touch.",
  },
};

export function ClosedPage({ reason, brandName }: { reason: ClosedReason; brandName?: string }) {
  const entry = COPY[reason];
  const Icon = entry.icon;

  return (
    <div className="client-wrap">
      <div className="client-card stack-4" style={{ textAlign: "center" }}>
        <span className="client-mark" style={{ margin: "0 auto" }}>
          <Icon size={18} />
        </span>
        <p className="eyebrow">{brandName || "Revercue"}</p>
        <h1 className="serif" style={{ fontSize: 28 }}>
          {entry.title}
        </h1>
        <p className="muted">{entry.body}</p>
        <div className="doc-foot" style={{ marginTop: 8 }}>
          Powered by{" "}
          <Link to="/" style={{ textDecoration: "underline" }}>
            Revercue
          </Link>
        </div>
      </div>
    </div>
  );
}
