import { Link, Outlet } from "react-router-dom";

export interface ClientBrand {
  name?: string;
  logoUrl?: string;
}

export function ClientLayout({ brand }: { brand?: ClientBrand }) {
  const name = brand?.name || "Acme Studio";
  return (
    <>
      <Outlet context={{ brand: { ...brand, name } }} />
    </>
  );
}

export function PoweredBy({ hidden }: { hidden?: boolean }) {
  if (hidden) return null;
  return (
    <div className="doc-foot">
      Powered by{" "}
      <Link to="/" className="mono" style={{ textDecoration: "underline" }}>
        Revercue
      </Link>
    </div>
  );
}
