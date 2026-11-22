/**
 * Per-route document metadata for the client-rendered site.
 *
 * The application shell is shared by every route, so the title and the
 * description are updated after navigation. The static pages under /public
 * (the AI pages, the FAQ and the rules) carry their own metadata in their own
 * HTML and do not depend on this module.
 */

interface RouteMeta {
  title: string;
  description: string;
}

/** The canonical public website. The API host is never a public page host. */
export const PUBLIC_ORIGIN = "https://revercue.co.uk";

/**
 * Application, auth, onboarding and client-document routes are never public
 * pages: they must not publish a canonical URL, and they are absent from the
 * sitemap. Everything else is a marketing page.
 */
const PRIVATE_ROUTES = [
  "/dashboard",
  "/settings",
  "/crm",
  "/proposals",
  "/contracts",
  "/forms",
  "/invoices",
  "/notifications",
  "/onboarding",
  "/callback",
  "/login",
  "/p",
  "/c",
  "/i",
  "/f",
  "/offline",
  "/session-expired",
  "/403",
  "/500",
];

function isUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function canonicalUrl(pathname: string): string | null {
  if (PRIVATE_ROUTES.some((prefix) => isUnder(pathname, prefix))) return null;
  return `${PUBLIC_ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
}

/** True for the routes that have their own public metadata (or a section). */
function isPublicPage(pathname: string): boolean {
  if (ROUTES[pathname]) return true;
  const section = "/" + pathname.split("/").filter(Boolean)[0];
  return Boolean(FALLBACK_BY_SECTION[section]);
}

export const DEFAULT_META: RouteMeta = {
  title: "Revercue — Your work should speak, not you.",
  description:
    "Revercue keeps every client project connected — proposal, contract, requirement form, invoice and client record in one thread.",
};

const ROUTES: Record<string, RouteMeta> = {
  "/": DEFAULT_META,
  "/features": {
    title: "Features — Revercue",
    description:
      "The five modules of the thread: proposals, contracts, requirement forms, invoices and the client record, built from interactive links rather than PDFs.",
  },
  "/pricing": {
    title: "Pricing — Revercue",
    description:
      "Free is available now. Starter, Growth and Scale are invite-only — join the waitlist. Teams is in beta. Every limit is listed, not summarised.",
  },
  "/compare": {
    title: "Compare — Revercue",
    description:
      "How Revercue compares with the separate tools a freelancer normally uses for proposals, contracts, forms, invoices and the client record.",
  },
  "/compare/criteria": {
    title: "Comparison criteria — Revercue",
    description:
      "The criteria Revercue uses on its comparison pages, and the evidence behind each one.",
  },
  "/guides": {
    title: "Guides — Revercue",
    description:
      "Step-by-step guides to the proposal builder, contract signing, forms, invoices, the CRM, retention and settings.",
  },
  "/about": {
    title: "About — Revercue",
    description:
      "Why Revercue exists: the thread between proposal and payment, built by a freelancer for freelancers.",
  },
  "/contact": {
    title: "Contact — Revercue",
    description:
      "Contact Revercue about general enquiries, support, billing, partnerships or the beta programme. The contact form reaches the team directly.",
  },
  "/beta": {
    title: "Beta programme — Revercue",
    description:
      "Teams is in beta. Apply to test the Handoff Dashboard, team roles, bulk transfer and audit log with a small group.",
  },
  "/blog": {
    title: "Blog — Revercue",
    description:
      "Notes on client work, proposals, contracts and why Revercue connects the thread instead of adding another tool.",
  },
  "/privacy": {
    title: "Privacy Policy — Revercue",
    description:
      "What Revercue collects, how it is used, who processes it, how long it is kept and what you can do with it.",
  },
  "/terms": {
    title: "Terms of Service — Revercue",
    description:
      "The terms that apply to a Revercue account and to the documents sent through it.",
  },
  "/security": {
    title: "Security — Revercue",
    description:
      "How Revercue encrypts data in transit and at rest, isolates client documents, stores files and handles retention.",
  },
  "/login": {
    title: "Log in — Revercue",
    description: "Log in to your Revercue account.",
  },
  "/faqs": {
    title: "Frequently asked questions — Revercue",
    description:
      "Every Revercue FAQ in one place: the product, plans, documents, tracking, data, the CRM, email, design and signatures. Search the questions or browse by category.",
  },
  "/dashboard": {
    title: "Dashboard — Revercue",
    description: "Your client work in one thread.",
  },
};

const FALLBACK_BY_SECTION: Record<string, RouteMeta> = {
  "/guides": ROUTES["/guides"],
  "/blog": ROUTES["/blog"],
  "/compare": ROUTES["/compare"],
};

export function routeMeta(pathname: string): RouteMeta {
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

  /*
   * One canonical tag in the shared shell, pointed at the public domain. It is
   * set for public pages only: an app route, a client document or an unknown
   * URL must not claim to be a canonical marketing page.
   */
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
