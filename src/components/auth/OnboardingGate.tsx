import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "../ui/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { OfflinePage } from "../../pages/utility";
import { isOnboardingComplete } from "../../lib/onboarding";

/**
 * The onboarding routes are protected like the app routes.
 *
 * Without this, an anonymous visitor could open a step page and only learn that
 * they are signed out when the first PATCH returned 401, and a finished user
 * could be shown the flow again. Completion comes from the backend record, not
 * from local state.
 */
export function OnboardingGate() {
  const { user, loading, offline } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="auth-split">
        <Spinner size={32} />
      </div>
    );
  }

  if (offline) {
    return <OfflinePage />;
  }

  if (!user) {
    const returnTo = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?returnTo=${returnTo}`} replace />;
  }

  if (isOnboardingComplete(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
