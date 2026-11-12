import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function NotFoundPage() {
  const { user } = useAuth();
  return (
    <div className="page page-narrow">
      <p className="eyebrow">404</p>
      <h1 className="serif" style={{ fontSize: 36, margin: "12px 0" }}>
        This page doesn't exist.
      </h1>
      <p className="muted">The link may be broken, or the page may have been moved.</p>
      <div className="inline mt-6">
        <Link to={user ? "/dashboard" : "/"} className="btn btn-primary">
          {user ? "Go to dashboard" : "Go to home"}
        </Link>
        <Link to="/contact" className="btn btn-ghost">
          Need help? Contact us.
        </Link>
      </div>
    </div>
  );
}

export function ForbiddenPage({ planGated = false }: { planGated?: boolean }) {
  const { user } = useAuth();
  return (
    <div className="page page-narrow">
      <p className="eyebrow">403</p>
      <h1 className="serif" style={{ fontSize: 36, margin: "12px 0" }}>
        You don't have access to this.
      </h1>
      <p className="muted">
        You may need to log in, or this feature may not be available on your plan.
      </p>
      <div className="inline mt-6">
        {!user ? (
          <Link to="/login" className="btn btn-primary">
            Log in
          </Link>
        ) : planGated ? (
          <Link to="/settings/plan" className="btn btn-primary">
            Upgrade plan
          </Link>
        ) : (
          <Link to="/dashboard" className="btn btn-primary">
            Go to dashboard
          </Link>
        )}
        <Link to="/dashboard" className="btn btn-ghost">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}

export function ServerErrorPage() {
  const reference = `RV-${Date.now().toString().slice(-6)}`;
  return (
    <div className="page page-narrow">
      <p className="eyebrow">500</p>
      <h1 className="serif" style={{ fontSize: 36, margin: "12px 0" }}>
        Something went wrong.
      </h1>
      <p className="muted">We've been notified. Try again in a moment.</p>
      <div className="inline mt-6">
        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
          Try again
        </button>
        <Link to="/dashboard" className="btn btn-ghost">
          Go to dashboard
        </Link>
      </div>
      <p className="caption mt-6 mono">Reference: {reference}</p>
    </div>
  );
}

export function OfflinePage() {
  return (
    <div className="page page-narrow">
      <p className="eyebrow">OFFLINE</p>
      <h1 className="serif" style={{ fontSize: 36, margin: "12px 0" }}>
        You're offline.
      </h1>
      <p className="muted">Check your connection and try again. Your work is saved.</p>
      <div className="inline mt-6">
        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
      <p className="caption mt-6">
        If you were in the middle of editing, your draft is saved locally.
      </p>
    </div>
  );
}

export function SessionExpiredPage() {
  const returnTo = new URLSearchParams(window.location.search).get("returnTo") || "/dashboard";
  return (
    <div className="page page-narrow">
      <p className="eyebrow">SESSION EXPIRED</p>
      <h1 className="serif" style={{ fontSize: 36, margin: "12px 0" }}>
        You've been logged out.
      </h1>
      <p className="muted">Your session expired for security. Log in again to continue.</p>
      <div className="inline mt-6">
        <Link to={`/login?returnTo=${encodeURIComponent(returnTo)}`} className="btn btn-primary">
          Log in
        </Link>
      </div>
    </div>
  );
}
