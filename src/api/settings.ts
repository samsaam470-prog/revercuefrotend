import { api } from "./client";
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
  active_documents?: number;
  storage_gb?: number;
  archive_count?: number;
  password_protected?: number;
  limits?: {
    active_documents: number | null;
    storage_gb: number;
    archive_count: number;
    password_protected: number;
  };
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

  changePassword: (body: { current_password: string; new_password: string }) =>
    api.post<{ success: true }>("/api/settings/security/change-password", body),
  toggle2fa: (body: { enabled: boolean; current_password: string }) =>
    api.post<{ success: true }>("/api/settings/security/2fa", body),
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
      spent: number;
      profit: number;
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
