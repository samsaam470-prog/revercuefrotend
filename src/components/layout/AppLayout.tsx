import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { Spinner } from "../ui/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { OfflinePage } from "../../pages/utility";
import { isOnboardingComplete, onboardingResumePath } from "../../lib/onboarding";

/**
 * AuthAction now returns to `/callback`, and a tenant still registered on
 * `/dashboard` keeps working: any authorization response that arrives on an app
 * route is forwarded to `/callback` before this layout does anything else, so a
 * one-time code is never consumed by a spinner or a redirect.
 */
export function AppLayout() {
  const { user, loading, offline } = useAuth();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const hasAuthResponse = searchParams.has("code") || searchParams.has("error");

  if (hasAuthResponse) {
    return <Navigate to={`/callback${location.search}`} replace />;
  }

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
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  /*
   * Onboarding: new and returning-incomplete users resume at the step the
   * backend reports, so a refresh, a new tab or a manual URL cannot skip it.
   */
  if (!isOnboardingComplete(user) && !location.pathname.startsWith("/onboarding")) {
    return <Navigate to={onboardingResumePath(user)} replace />;
  }

  return (
    <>
      <AppHeader />
      <div className="app-body">
        <AppSidebar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
