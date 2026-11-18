import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { Spinner } from "../ui/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { OfflinePage } from "../../pages/utility";

/**
 * AuthAction returns to `/dashboard`, so the authorization response arrives on
 * an app route. It is forwarded to `/callback` before anything else in this
 * layout runs — the spinner, the sign-out handler, the linking redirect and the
 * onboarding gate must never see a one-time code, or the sign-in is consumed
 * without ever being exchanged.
 */
export function AppLayout() {
  const { user, loading, offline, linkingRequired } = useAuth();
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

  /* A verified AuthAction identity with no Revercue record goes through linking. */
  if (linkingRequired) {
    return <Navigate to="/link-account" replace state={{ returnTo: location.pathname }} />;
  }

  if (!user) {
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  /*
   * Onboarding: a new sign-up starts at step 1, whether the API reports
   * onboarding_step = 1 or 0. Step 6 means the flow is complete, and a record
   * that already has an account_type is treated as having started it.
   */
  const onboardingStep = user.onboarding_step ?? 0;
  const onboardingIncomplete = onboardingStep < 6 && (onboardingStep >= 1 || !user.account_type);
  if (onboardingIncomplete && !location.pathname.startsWith("/onboarding")) {
    const step = [1, 2, 4, 5].find((candidate) => candidate >= onboardingStep) ?? 5;
    return <Navigate to={`/onboarding/step-${step}`} replace />;
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
