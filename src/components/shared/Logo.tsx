import { Link } from "react-router-dom";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="logo" aria-label="Revercue home">
      <span className="bracket">[R]</span>
      <span>Revercue</span>
    </Link>
  );
}
