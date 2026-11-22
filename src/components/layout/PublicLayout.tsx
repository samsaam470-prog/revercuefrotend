import { Outlet, useLocation } from "react-router-dom";
import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";
import { StartFreeBand } from "../shared/StartFreeBand";

const NO_BAND = [
  "/privacy",
  "/terms",
  "/security",
  "/contact",
  "/beta",
  "/login",
];

export function PublicLayout() {
  const { pathname } = useLocation();
  const showBand = !NO_BAND.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  return (
    <>
      <PublicHeader />
      <main className="pub-main">
        <Outlet />
      </main>
      {showBand && <StartFreeBand />}
      <PublicFooter />
    </>
  );
}
