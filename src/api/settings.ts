import { api } from "./client";
import type { BillingEntitlements, EntitlementSnapshot } from "../types/billing";
import type {
  PaymentRow,
  PlanName,
  SavedFaq,
  SavedPackage,
  SessionRow,
  User,
} from "../types";

export interface PlanUsage {
  plan: PlanName;
  expires_at?: string;
  renewal_date?: string;
  trial?: {
    access_plan: string;
    ends_at: string;
    days_left: number;
  } | null;
  active_documents?: number;
  storage_gb?: number;
  archive_count?: number;
  password_protected?: number;
  limits?: {
    active_documents: number | null;
    storage_gb: number;
    archive_count: number;
    password_protected: number;
    bonus_active?: boolean;
  };
  entitlements?: EntitlementSnapshot;
  payments: PaymentRow[];
}

export interface NotificationSettings {
  email_enabled?: boolean;
  proposal_opened?: boolean;
  proposal_answered?: boolean;
  contract_action?: boolean;
  form_submitted?: boolean;
  invoice_paid?: boolean;
  proof_uploaded?: boolean;
  newsletter_opt_in?: boolean;
}

export interface ProfilePayload {
  name: string;
  business_name?: string;
  website?: string;
  fiverr_profile?: string;
  services?: string[];
  brand_primary?: string;
  brand_secondary?: string;
}

export const settingsApi = {
  getProfile: () => api.get<{ profile: User }>("/api/settings/profile"),
  updateProfile: (body: ProfilePayload) => api.patch<{ success: true }>("/api/settings/profile", body),
  uploadLogo: (file: File) => {
    const form = new FormData();
    form.append("logo", file);
    return api.upload<{ success: true; url?: string }>("/api/settings/logo", form);
  },

  getPlan: () => api.get<PlanUsage>("/api/settings/plan"),
  upgradeRequest: (plan: PlanName) =>
    api.post<{ success: true }>("/api/settings/plan/upgrade-request", { plan }),
  downgrade: (keep_document_ids: string[]) =>
    api.post<{ success: true }>("/api/settings/plan/downgrade", { keep_document_ids }),
  receipt: (paymentId: string) => api.get<Blob>(`/api/settings/plan/receipt/${paymentId}`, { raw: true }),

  billingSubscription: () => api.get<any>("/api/settings/billing/subscription"),
  billingCheckout: (plan: string) =>
    api.post<{
      checkout_id: string;
      checkout_url: string;
      trial: boolean;
      trial_days?: number;
      trial_access_plan?: string | null;
    }>("/api/settings/billing/checkout", { plan }),
  billingCancel: () => api.post<{ success: true }>("/api/settings/billing/cancel", {}),
  billingReactivate: () => api.post<{ success: true }>("/api/settings/billing/reactivate", {}),
  billingChangePlan: (plan: string) => api.post<{ success: true; scheduled: boolean }>("/api/settings/billing/change-plan", { plan }),
  billingPayments: () => api.get<{ payments: any[] }>("/api/settings/billing/payments"),

  billingEntitlements: () => api.get<BillingEntitlements>("/api/settings/billing/entitlements"),
  billingUpgrade: (plan: string) =>
    api.post<{
      success: true;
      transition_id: string;
      checkout_url: string;
      trial_days: number;
      mode: "immediate" | "short_cycle";
      starts_at: string;
      combined_ends_at: string | null;
    }>("/api/settings/billing/upgrade", { plan }),
  billingDowngrade: (plan: string) =>
    api.post<{ success: true; transition_id: string; checkout_url: string; canceled_membership: boolean }>(
      "/api/settings/billing/downgrade",
      { plan },
    ),
  billingVerify: (transition_id: string, membership_id?: string, payment_id?: string) =>
    api.post<{ verified: boolean; pending: boolean }>("/api/settings/billing/verify", {
      transition_id,
      membership_id,
      payment_id,
    }),
  billingCancelTransition: (id: string) =>
    api.post<{ success: true }>(`/api/settings/billing/transition/${id}/cancel`, {}),
  billingPause: (until?: string) =>
    api.post<{ success: true; paused: boolean; resume_at: string | null }>("/api/settings/billing/pause", { until }),
  billingResume: () => api.post<{ success: true; paused: boolean }>("/api/settings/billing/resume", {}),
  billingCapacityCheckout: (offer: string) =>
    api.post<{ success: true; addon_id: string; transition_id: string; checkout_url: string }>(
      "/api/settings/billing/capacity/checkout",
      { offer },
    ),

  changePassword: (body: { current_password: string; new_password: string }) =>
    api.post<{ success: true }>("/api/settings/security/change-password", body),
  sessions: () => api.get<{ data: SessionRow[] }>("/api/settings/security/sessions"),
  logoutSession: (id: string) =>
    api.post<{ success: true }>(`/api/settings/security/sessions/${id}/logout`),
  logoutAll: () => api.post<{ success: true }>("/api/settings/security/sessions/logout-all"),

  getNotifications: () => api.get<NotificationSettings>("/api/settings/notifications"),
  updateNotifications: (body: NotificationSettings) =>
    api.patch<{ success: true }>("/api/settings/notifications", body),
  savedFaqs: () => api.get<{ data: SavedFaq[] }>("/api/settings/saved-faqs"),
  createSavedFaq: (body: { question: string; answer: string }) =>
    api.post<{ success: true; id: string }>("/api/settings/saved-faqs", body),
  updateSavedFaq: (id: string, body: { question?: string; answer?: string }) =>
    api.patch<{ success: true }>(`/api/settings/saved-faqs/${id}`, body),
  deleteSavedFaq: (id: string) => api.del<{ success: true }>(`/api/settings/saved-faqs/${id}`),
  keepSavedFaq: (id: string) => api.post<{ success: true }>(`/api/settings/saved-faqs/${id}/keep`),

  savedPackages: () => api.get<{ data: SavedPackage[] }>("/api/settings/saved-packages"),
  createSavedPackage: (body: Partial<SavedPackage>) =>
    api.post<{ success: true; id: string }>("/api/settings/saved-packages", body),
  updateSavedPackage: (id: string, body: Partial<SavedPackage>) =>
    api.patch<{ success: true }>(`/api/settings/saved-packages/${id}`, body),
  deleteSavedPackage: (id: string) => api.del<{ success: true }>(`/api/settings/saved-packages/${id}`),
  keepSavedPackage: (id: string) => api.post<{ success: true }>(`/api/settings/saved-packages/${id}/keep`),

  revisionPrices: () =>
    api.get<{ data: { id: string; category: string; price: number | null }[] }>(
      "/api/settings/revision-prices",
    ),
  updateRevisionPrices: (body: { data: { category: string; price: number | null }[] }) =>
    api.patch<{ success: true }>("/api/settings/revision-prices", body),

  revenue: () =>
    api.get<{
      earned: number;
      sent?: number;
      sent_count?: number;
      remaining_pending?: number;
      spent?: number;
      profit?: number;
      all_time_profit?: number;
      by_client?: { client_id: string; name: string; earned: number; spent: number; profit: number }[];
      pending_total: number;
      pending_count: number;
      expenses: { id: string; date: string; category: string; platform?: string; amount: number; note?: string }[];
      price_suggestion?: string;
    }>("/api/settings/revenue"),

  addExpense: (body: {
    client_id?: string;
    date: string;
    category: string;
    platform?: string;
    amount: number;
    note?: string;
  }) => api.post<{ success: true; id: string }>("/api/settings/expenses", body),

  whatRevercueKnows: () =>
    api.get<{
      account: { label: string; value: string }[];
      private: string[];
      team_can_see: string[];
      encrypted: string[];
      third_parties: { name: string; role: string }[];
      your_controls: string[];
      not_known: string[];
    }>("/api/settings/what-revercue-knows"),

  deleteAccount: (email_confirmation: string) =>
    api.post<{ success: true; deletion_date?: string }>("/api/settings/delete-account", {
      email_confirmation,
    }),
  cancelDeletion: () => api.post<{ success: true }>("/api/settings/cancel-deletion"),
};
