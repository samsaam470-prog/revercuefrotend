import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../shared/Logo";

const LINKS = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/compare", label: "Compare" },
  { to: "/guides", label: "Guides" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isHome = location.pathname === "/";

  return (
    <>
      <header className={`pub-header${scrolled ? " scrolled" : ""}`}>
        <Logo />
        <nav className="pub-nav" aria-label="Main">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="pub-actions">
          <Link to="/login" className="btn btn-ghost btn-sm">
            Log in
          </Link>
          <Link to="/signup" className={`btn btn-sm ${isHome ? "btn-secondary" : "btn-primary"}`}>
            Start Free
          </Link>
          <button
            type="button"
            className="btn-icon menu-btn"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      {open && (
        <div className="mobile-nav">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="mobile-actions">
            <Link to="/login" className="btn btn-secondary" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link to="/signup" className="btn btn-primary" onClick={() => setOpen(false)}>
              Start Free
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
