/**
 * Per-route metadata for Revercue's client-rendered public site.
 */
interface RouteMeta { title: string; description: string; }
export const PUBLIC_ORIGIN = "https://revercue.co.uk";

const PRIVATE_ROUTES = [
  "/dashboard", "/settings", "/crm", "/proposals", "/contracts", "/forms",
  "/invoices", "/notifications", "/onboarding", "/callback", "/login",
  "/p", "/c", "/i", "/f", "/offline", "/session-expired", "/403", "/500",
];

function isUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function canonicalUrl(pathname: string): string | null {
  if (PRIVATE_ROUTES.some((prefix) => isUnder(pathname, prefix))) return null;
  return `${PUBLIC_ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
}

export const DEFAULT_META: RouteMeta = {
  title: "Revercue — Your work should speak, not you.",
  description: "Revercue keeps every client project connected — proposal, contract, requirement form, invoice and client record in one thread.",
};

const ROUTES: Record<string, RouteMeta> = {
  "/": DEFAULT_META,
  "/features": { title: "Features — Revercue", description: "Explore Revercue's connected proposal, contract, requirement form, invoice and client management tools for freelancers." },
  "/pricing": { title: "Pricing — Revercue", description: "Explore Revercue plans for freelancers. Start with the free plan and see every limit clearly." },
  "/compare": { title: "Compare freelance business tools — Revercue", description: "Compare Revercue with the separate tools freelancers use for proposals, contracts, forms, invoices and client management." },
  "/compare/criteria": { title: "Comparison criteria — Revercue", description: "The criteria Revercue uses on its comparison pages, and the evidence behind each one." },
  "/guides": { title: "Freelancer workflow guides — Revercue", description: "Step-by-step guides to proposals, contracts, forms, invoices, CRM and client workflows." },
  "/about": { title: "About — Revercue", description: "Why Revercue exists: the thread between proposal and payment, built by a freelancer for freelancers." },
  "/contact": { title: "Contact — Revercue", description: "Contact Revercue about general enquiries, support, billing, partnerships or the beta programme." },
  "/beta": { title: "Beta programme — Revercue", description: "Teams is in beta. Apply to test the Handoff Dashboard, team roles, bulk transfer and audit log." },
  "/blog": { title: "Freelance business blog — Revercue", description: "Practical notes on client work, proposals, contracts, invoicing and running a freelance business." },
  "/privacy": { title: "Privacy Policy — Revercue", description: "What Revercue collects, how it is used, who processes it and what you can do with it." },
  "/terms": { title: "Terms of Service — Revercue", description: "The terms that apply to a Revercue account and to the documents sent through it." },
  "/security": { title: "Security — Revercue", description: "How Revercue encrypts data in transit and at rest, isolates client documents and handles retention." },
  "/login": { title: "Log in — Revercue", description: "Log in to your Revercue account." },
  "/faqs": { title: "Frequently asked questions — Revercue", description: "Answers about Revercue plans, proposals, contracts, forms, invoices, client management and signatures." },
  "/dashboard": { title: "Dashboard — Revercue", description: "Your client work in one thread." },
};

const SOLUTION_META: Record<string, RouteMeta> = {
  "proposal-software": { title: "Proposal Software for Freelancers | Revercue", description: "Create interactive freelance proposals with packages, FAQs and client questions. Share one link and move accepted work into contracts and invoices with Revercue." },
  "client-management": { title: "Freelance Client Management Software | Revercue", description: "Manage freelance clients, communication history, proposals, documents and follow-ups in one connected workspace with Revercue." },
  "invoice-contract-software": { title: "Invoice and Contract Software for Freelancers | Revercue", description: "Create client contracts, collect typed-name signatures and send invoices with payment instructions in the same freelance workflow." },
  "freelance-business-management": { title: "All-in-One Business Management for Freelancers | Revercue", description: "Connect proposals, contracts, requirement forms, invoices and client records in one freelance business workflow." },
  "proposal-and-invoice-tool": { title: "Proposal and Invoice Tool for Freelancers | Revercue", description: "Connect client proposals to contracts and invoices. Keep project details and payment status together with Revercue." },
};

const FALLBACK_BY_SECTION: Record<string, RouteMeta> = {
  "/guides": ROUTES["/guides"],
  "/blog": ROUTES["/blog"],
  "/compare": ROUTES["/compare"],
  "/solutions": { title: "Freelancer workflow solutions — Revercue", description: "Explore Revercue tools for proposals, client management, contracts and invoices." },
};

function isPublicPage(pathname: string): boolean {
  if (ROUTES[pathname]) return true;
  const section = "/" + pathname.split("/").filter(Boolean)[0];
  return Boolean(FALLBACK_BY_SECTION[section]);
}

export function routeMeta(pathname: string): RouteMeta {
  const solutionSlug = pathname.startsWith("/solutions/") ? pathname.split("/")[2] : "";
  if (solutionSlug && SOLUTION_META[solutionSlug]) return SOLUTION_META[solutionSlug];
  const direct = ROUTES[pathname];
  if (direct) return direct;
  const section = "/" + pathname.split("/").filter(Boolean)[0];
  return FALLBACK_BY_SECTION[section] ?? DEFAULT_META;
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function applyRouteMetadata(pathname: string) {
  const meta = routeMeta(pathname);
  document.title = meta.title;
  setMeta("name", "description", meta.description);
  setMeta("property", "og:title", meta.title);
  setMeta("property", "og:description", meta.description);
  setMeta("name", "twitter:title", meta.title);
  setMeta("name", "twitter:description", meta.description);

  const canonical = isPublicPage(pathname) ? canonicalUrl(pathname) : null;
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    if (existing) existing.remove();
    const ogUrl = document.head.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.remove();
    return;
  }
  setMeta("property", "og:url", canonical);
  const link = existing ?? document.createElement("link");
  if (!existing) {
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", canonical);
}
