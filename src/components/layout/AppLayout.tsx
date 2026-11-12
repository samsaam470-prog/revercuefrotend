import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { Spinner } from "../ui/Spinner";
import { useAuth } from "../../hooks/useAuth";

export function AppLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="auth-split">
        <Spinner size={32} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (user.onboarding_step > 0 && user.onboarding_step < 6 && !location.pathname.startsWith("/onboarding")) {
    const step = [1, 2, 4, 5].find((candidate) => candidate >= user.onboarding_step) ?? 5;
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
