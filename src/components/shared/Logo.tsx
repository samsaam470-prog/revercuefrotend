import { Link } from "react-router-dom";

/**
 * The lockup: the real RC monogram (public/logo-mark.png, a transparent crop of
 * the uploaded artwork) beside the REVERCUE wordmark in the gold token.
 */
export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="logo" aria-label="Revercue home">
      <img src="/logo-mark.png" alt="" className="logo-mark-img" width={51} height={28} />
      <span className="logo-word">REVERCUE</span>
    </Link>
  );
}
