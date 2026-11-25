import type { PlanName } from "../types";

export interface PlanDefinition {
  id: PlanName;
  name: string;
  price: number | null;
  base?: number;
  role: string;
  status: "available" | "beta";
  statusLabel: string;
  features: string[];
  limits: {
    active_documents: number | null;
    retention_months: number;
    draft_retention_days: number;
    archive_count: number;
    archive_days: number;
    notes_per_client: number | null;
    custom_templates: number;
    saved_faqs: number;
    saved_packages: number;
    password_protected: number;
    adaptive_forms: number;
    storage_gb: number;
  };
}

export const PLANS: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    role: "Try the thread.",
    status: "available",
    statusLabel: "Available now",
    features: [
      "5 active documents",
      "1-month document retention",
      "Opened / not opened tracking",
      "3 notes per client",
      "Revercue branding on client pages",
    ],
    limits: {
      active_documents: 5,
      retention_months: 1,
      draft_retention_days: 10,
      archive_count: 5,
      archive_days: 15,
      notes_per_client: 3,
      custom_templates: 0,
      saved_faqs: 0,
      saved_packages: 0,
      password_protected: 0,
      adaptive_forms: 0,
      storage_gb: 0.05,
    },
  },
  {
    id: "starter",
    name: "Starter",
    price: 12,
    role: "Solo, light use.",
    status: "available",
    statusLabel: "Available now",
    features: [
      "20 active documents",
      "3-month document retention",
      "Opened-at timestamps",
      "10 notes per client",
      "Custom templates (3)",
    ],
    limits: {
      active_documents: 20,
      retention_months: 3,
      draft_retention_days: 30,
      archive_count: 15,
      archive_days: 30,
      notes_per_client: 10,
      custom_templates: 3,
      saved_faqs: 0,
      saved_packages: 0,
      password_protected: 0,
      adaptive_forms: 0,
      storage_gb: 0.1,
    },
  },
  {
    id: "growth",
    name: "Growth",
    price: 29,
    role: "Solo, power user.",
    status: "available",
    statusLabel: "Available now",
    features: [
      "14 days of Scale access free, then Growth",
      "100 active documents",
      "12-month document retention",
      "Time spent and button clicks",
      "Adaptive forms (3)",
      "No Revercue branding on client pages",
      "Custom templates (10), saved FAQs (10), saved packages (10)",
    ],
    limits: {
      active_documents: 100,
      retention_months: 12,
      draft_retention_days: 50,
      archive_count: 30,
      archive_days: 30,
      notes_per_client: null,
      custom_templates: 10,
      saved_faqs: 10,
      saved_packages: 10,
      password_protected: 15,
      adaptive_forms: 3,
      storage_gb: 1,
    },
  },
  {
    id: "scale",
    name: "Scale",
    price: 49,
    role: "Solo professional, full feature set.",
    status: "available",
    statusLabel: "Available now",
    features: [
      "300 active documents",
      "24-month document retention",
      "Advanced tracking and session timeline",
      "Interest level and expense categories",
      "Custom thank-you page",
      "Custom templates (15), saved FAQs (30), saved packages (15)",
    ],
    limits: {
      active_documents: 300,
      retention_months: 24,
      draft_retention_days: 80,
      archive_count: 30,
      archive_days: 30,
      notes_per_client: null,
      custom_templates: 15,
      saved_faqs: 30,
      saved_packages: 15,
      password_protected: 50,
      adaptive_forms: 15,
      storage_gb: 5,
    },
  },
  {
    id: "teams",
    name: "Teams",
    price: null,
    base: 99,
    role: "Agency team.",
    status: "beta",
    statusLabel: "In beta — join the beta",
    features: [
      "Everything on Scale",
      "Handoff Dashboard",
      "Roles and team attribution",
      "Bulk transfer",
      "Audit log",
    ],
    limits: {
      active_documents: 500,
      retention_months: 36,
      draft_retention_days: 80,
      archive_count: 30,
      archive_days: 30,
      notes_per_client: null,
      custom_templates: 999,
      saved_faqs: 999,
      saved_packages: 999,
      password_protected: 999,
      adaptive_forms: 999,
      storage_gb: 10,
    },
  },
];

export const PLAN_LABEL: Record<PlanName, string> = {
  free: "Free",
  starter: "Starter",
  growth: "Growth",
  scale: "Scale",
  teams: "Teams",
};

export const PLAN_LIMITS = Object.fromEntries(
  PLANS.map((plan) => [plan.id, plan.limits]),
) as Record<PlanName, PlanDefinition["limits"]>;

export type Feature =
  | "custom_templates"
  | "password_protected"
  | "email_notifications"
  | "adaptive_forms"
  | "basic_suggestions"
  | "advanced_tracking"
  | "interest_level"
  | "revenue_tracker"
  | "expense_entry"
  | "price_suggestion"
  | "what_revercue_knows"
  | "custom_thank_you"
  | "no_branding"
  | "saved_faqs"
  | "saved_packages";

const FEATURE_MIN_PLAN: Record<Feature, PlanName> = {
  custom_templates: "starter",
  password_protected: "growth",
  email_notifications: "growth",
  adaptive_forms: "growth",
  basic_suggestions: "free",
  advanced_tracking: "scale",
  interest_level: "scale",
  revenue_tracker: "free",
  expense_entry: "growth",
  price_suggestion: "scale",
  what_revercue_knows: "scale",
  custom_thank_you: "scale",
  no_branding: "growth",
  saved_faqs: "growth",
  saved_packages: "growth",
};

const PLAN_ORDER: PlanName[] = ["free", "starter", "growth", "scale", "teams"];

export function planHasFeature(plan: PlanName, feature: Feature): boolean {
  return PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf(FEATURE_MIN_PLAN[feature]);
}

/**
 * The commercial facts about the Scale bonus, kept in one place so the pricing
 * page, the billing screen and the guide cannot drift. These mirror
 * revercuebackend/src/config/billing.ts.
 */
export const SCALE_BONUS = {
  days: 14,
  growthPrice: 29,
  scalePrice: 49,
  shortCycleDays: 5,
  protectPrice: 5,
  protectPlusPrice: 12,
  protectPlusStorageGb: 2,
  protectPlusDocuments: 100,
  guidePath: "/guides/14-days-of-scale",
} as const;

export const SUBSCRIPTION_CREDIT = "Revercue";
export const TOS_VERSION = "2026-01";

export const EMAIL_DELIVERY_NOTE =
  "Revercue sends its own transactional email: proposal opened, contract approved, invoice paid, security alerts and account notices. No separate activation is required. The newsletter is separate and off unless you opt in.";

export const TAGLINE = "Your work should speak, not you.";
export const THESIS = "A thread, not disconnected workflows.";

export const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "INR", "NGN", "AED"];

export const SERVICE_OPTIONS = [
  "Web Design",
  "Development",
  "SEO",
  "Video",
  "Copywriting",
  "Consulting",
  "Other",
];

export const INDUSTRY_OPTIONS = [
  { value: "Restaurant", label: "Restaurant" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "SaaS", label: "SaaS" },
  { value: "Agency", label: "Agency" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Other", label: "Other" },
];

export const SECTION_OPTIONS = [
  "Introduction",
  "Scope",
  "Timeline",
  "Pricing",
  "Terms",
  "FAQs",
  "Embedded Questions",
  "About You",
  "Next Step",
];

export const CONTRACT_SECTIONS = [
  "Parties",
  "Scope",
  "Payment",
  "Timeline",
  "Revisions",
  "Cancellation",
  "Liability",
  "Signatures",
];

export const TONES = ["Formal", "Friendly", "Concise"];
export const SCROLL_LENGTHS = ["Short", "Medium", "Long"];

export const CHANNELS = ["Email", "WhatsApp", "Phone", "In-person", "Other"];

export const FAQ_BATCH_FIRST = 12;

export const FOOTER_ASSISTANT_PROMPT =
  "Explain Revercue: a freelancer tool for the thread from proposal to contract to invoice to CRM. The tagline is 'Your work should speak, not you.' The thesis is 'a thread, not disconnected workflows.' Free is available now; Starter, Growth and Scale subscriptions use Whop checkout; Teams is in beta. The optional Ask the helper feature rewrites text the user selects, locally in the browser, only when they invoke it; it does not change documents without their choice. Other suggestions use patterns. Client invoice payments are currently external payment links or bank transfer with proof where enabled; built-in invoice card payments and payouts are not available yet. Answer in 2–3 sentences.";

export function formatStorage(gb: number | null | undefined): string {
  if (gb == null) return "Unlimited";
  if (gb >= 1) {
    return Number.isInteger(gb)
      ? `${gb} GB (${(gb * 1024).toLocaleString("en-US")} MB)`
      : `${gb.toFixed(2)} GB`;
  }
  return `${Math.round(gb * 1000)} MB`;
}
