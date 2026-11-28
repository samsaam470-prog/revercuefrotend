import { Link, NavLink, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { usePlanGate } from "../../hooks/usePlanGate";

const FILTERS: Record<string, { base: string; items: string[]; create: { to: string; label: string } }> = {
  proposals: {
    base: "/proposals",
    items: ["All", "Drafts", "Published", "Archived"],
    create: { to: "/proposals/new", label: "Create proposal" },
  },
  contracts: {
    base: "/contracts",
    items: ["All", "Drafts", "Published", "Approved", "Declined", "Archived"],
    create: { to: "/contracts/new", label: "Create contract" },
  },
  forms: {
    base: "/forms",
    items: ["All", "Drafts", "Published", "Closed", "Archived"],
    create: { to: "/forms/new", label: "Create form" },
  },
  invoices: {
    base: "/invoices",
    items: ["All", "Drafts", "Published", "Paid", "Pending", "Overdue"],
    create: { to: "/invoices/new", label: "Create invoice" },
  },
  crm: {
    base: "/crm",
    items: ["All", "Active", "Archived", "Not interested"],
    create: { to: "/crm?add=1", label: "+ Add client" },
  },
};

const SETTINGS_NAV = [
  { to: "/settings/profile", label: "Profile" },
  { to: "/settings/appearance", label: "Appearance" },
  { to: "/settings/plan", label: "Plan & Billing" },
  { to: "/settings/security", label: "Security" },
  { to: "/settings/notifications", label: "Notifications" },
  { to: "/settings/saved-faqs", label: "Saved FAQs" },
  { to: "/settings/saved-packages", label: "Saved Packages" },
  { to: "/settings/template-library", label: "Template Library" },
  { to: "/settings/templates", label: "Custom Templates" },
  { to: "/settings/revision-prices", label: "Revision Prices" },
  { to: "/settings/revenue", label: "Revenue & Expenses" },
  { to: "/settings/what-revercue-knows", label: "What Revercue Knows" },
  { to: "/settings/delete-account", label: "Delete Account" },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { plan } = usePlanGate();
  const section = pathname.split("/")[1];
  const config = FILTERS[section];

  if (pathname.startsWith("/dashboard")) return null;

  if (section === "settings") {
    return (
      <aside className="app-sidebar">
        <div className="sidebar-title">Settings</div>
        {SETTINGS_NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>
    );
  }

  if (!config) return null;

  return (
    <aside className="app-sidebar">
      <div className="sidebar-title">{section === "crm" ? "Clients" : "Filters"}</div>
      {config.items.map((item) => (
        <Link
          key={item}
          to={`${config.base}?status=${encodeURIComponent(item.toLowerCase())}`}
          className="sidebar-link"
        >
          {item}
        </Link>
      ))}
      <div className="sidebar-create">
        <Link to={config.create.to} className="btn btn-primary btn-sm btn-full">
          <Plus size={14} /> {config.create.label}
        </Link>
        {section === "crm" && plan === "scale" && (
          <p className="caption" style={{ marginTop: 10 }}>
            Interest level is shown on Scale.
          </p>
        )}
      </div>
    </aside>
  );
}
