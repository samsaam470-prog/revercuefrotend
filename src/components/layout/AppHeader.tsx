import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { NotificationBell } from "../shared/NotificationBell";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../lib/formatters";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/proposals", label: "Proposals" },
  { to: "/contracts", label: "Contracts" },
  { to: "/forms", label: "Forms" },
  { to: "/invoices", label: "Invoices" },
  { to: "/crm", label: "CRM" },
  { to: "/settings", label: "Settings" },
];

export function AppHeader() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  return (
    <header className="app-header">
      <Link to="/dashboard" className="logo" aria-label="Revercue dashboard">
        <span className="bracket">[R]</span>
        <span>Revercue</span>
      </Link>
      <nav className="app-nav" aria-label="Application">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="app-header-right">
        <NotificationBell />
        <div style={{ position: "relative" }} ref={wrapRef}>
          <button
            type="button"
            className="avatar"
            aria-label="Account menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {initials(user?.name, user?.email)}
          </button>
          {menuOpen && (
            <div className="dropdown">
              <div style={{ padding: "8px 10px 10px" }}>
                <div style={{ fontSize: 12, color: "var(--text-primary)" }}>
                  {user?.name || "Your account"}
                </div>
                <div className="caption">{user?.email}</div>
              </div>
              <Link to="/settings/profile" onClick={() => setMenuOpen(false)}>
                <UserIcon size={14} /> Profile
              </Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)}>
                <Settings size={14} /> Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  void signOut().then(() => navigate("/login"));
                }}
              >
                <LogOut size={14} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
