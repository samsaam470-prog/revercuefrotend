import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../shared/Logo";

export function AuthLayout() {
  return (
    <div className="auth-page">
      <div className="auth-top">
        <div className="inline">
          <Link to="/" className="btn-icon" aria-label="Back to home">
            <ArrowLeft size={18} />
          </Link>
          <Logo />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
