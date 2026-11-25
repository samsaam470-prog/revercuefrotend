/** Billing and entitlement types shared by the API client and the billing UI. */

export type EntitlementStatus =
  | "free"
  | "plan"
  | "scale_bonus"
  | "combined_limits"
  | "paused"
  | "past_due"
  | "canceled";

export interface EntitlementLimits {
  active_documents: number;
  storage_mb: number;
  archive_count: number;
  password_protected: number;
  adaptive_forms: number;
  saved_faqs: number;
  custom_templates: number;
  saved_packages: number;
}

export interface EntitlementWindow {
  starts_at: string;
  ends_at: string;
  days_left: number;
  ending_soon: boolean;
}

export interface CombinedWindow extends EntitlementWindow {
  id: string;
  source_plan: string;
  extra: EntitlementLimits;
}

export interface ActiveAddon {
  id: string;
  offer_key: string;
  name: string;
  status: string;
  storage_gb: number;
  active_documents: number;
  billing_interval: string;
  amount_cents: number;
  currency: string;
  ends_at: string | null;
}

export interface EntitlementSnapshot {
  plan: string;
  purchased_plan: string;
  status: EntitlementStatus;
  limits: EntitlementLimits;
  base_limits: EntitlementLimits;
  bonus_limits: Partial<EntitlementLimits> & { label?: string };
  bonus: EntitlementWindow | null;
  combined: CombinedWindow | null;
  addons: ActiveAddon[];
  usage: { active_documents: number; storage_mb: number };
  over_limit: {
    any: boolean;
    active_documents: boolean;
    storage: boolean;
    over_by: { active_documents: number; storage_mb: number };
  };
  ending_soon: boolean;
}

export interface CapacityOffer {
  key: "protect" | "protect_plus" | string;
  name: string;
  summary: string;
  amount_cents: number;
  currency: string;
  interval: "one_time" | "month" | string;
  storage_gb: number;
  active_documents: number;
  configured: boolean;
}

export interface CapacityOptions {
  available: boolean;
  reason?: string;
  offers: CapacityOffer[];
  decline_notice: string | null;
  decline_behaviour?: {
    deletes_data: boolean;
    blocks_new_usage: boolean;
    keeps_read_and_download: boolean;
  };
  over_by?: { active_documents: number; storage_mb: number };
}

export interface SubscriptionTransition {
  id: string;
  kind: "upgrade" | "downgrade" | "capacity" | string;
  from_plan: string | null;
  to_plan: string;
  offer_key: string | null;
  status: string;
  whop_checkout_url: string | null;
  trial_days: number;
  starts_at: string | null;
  combined_ends_at: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface BillingEntitlements extends EntitlementSnapshot {
  capacity: CapacityOptions;
  transitions: SubscriptionTransition[];
  plans: {
    growth: { price: number; trial_plan_configured: boolean; checklist: string };
    scale: { price: number; plan_configured: boolean; note: string };
  };
}
