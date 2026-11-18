import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { Spinner } from "../ui/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { OfflinePage } from "../../pages/utility";
import { CallbackPage } from "../../pages/auth";

/**
 * AuthAction returns to `/dashboard`, so the authorization response arrives on
 * an authenticated route. Until it has been exchanged the layout must show the
 * completion screen instead of redirecting to /login, which would throw the
 * one-time code away.
 */
const AUTH_RESPONSE_PARAMS = [
  "code",
  "state",
  "error",
  "error_description",
  "session_state",
  "iss",
] as const;

export function AppLayout() {
  const { user, loading, offline, linkingRequired } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const hasAuthResponse = searchParams.has("code") || searchParams.has("error");

  /* Drop the spent response from the URL once the session exists, so a refresh
   * or a shared link cannot replay a code that has already been used. */
  useEffect(() => {
    if (!user || !hasAuthResponse) return;
    const params = new URLSearchParams(location.search);
    AUTH_RESPONSE_PARAMS.forEach((key) => params.delete(key));
    const search = params.toString();
    navigate(
      { pathname: location.pathname, search: search ? `?${search}` : "", hash: location.hash },
      { replace: true },
    );
  }, [user, hasAuthResponse, location.pathname, location.search, location.hash, navigate]);

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
    if (hasAuthResponse) return <CallbackPage />;
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
