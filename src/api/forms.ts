import { api } from "./client";
import type { Paginated } from "../types/api";
import type { DocumentSummary, FormDoc, FormQuestion, ThankYouConfig } from "../types";

export interface FormDraftPayload {
  client_id?: string;
  title: string;
  description?: string;
  questions: FormQuestion[];
  branching?: Record<string, string[]>;
  thank_you_config?: ThankYouConfig | null;
  page_mode?: "single" | "multi";
  expiry_date?: string;
}

export const formsApi = {
  list: (query: { status?: string; page?: number; limit?: number } = {}) =>
    api.get<Paginated<DocumentSummary>>("/api/forms", { query }),

  draft: (body: FormDraftPayload) =>
    api.post<{ success: true; id: string; status: string; client_id?: string }>("/api/forms/draft", body),

  get: (id: string) => api.get<{ form: FormDoc }>(`/api/forms/${id}`),

  update: (id: string, body: Partial<FormDoc>) =>
    api.patch<{ success: true; updated_at?: string }>(`/api/forms/${id}`, body),

  publish: (id: string) =>
    api.post<{ success: true; public_id: string; url: string }>(`/api/forms/${id}/publish`),

  duplicate: (id: string) =>
    api.post<{ success: true; id: string; status: string }>(`/api/forms/${id}/duplicate`, {}),

  archive: (id: string) => api.post<{ success: true; status: string }>(`/api/forms/${id}/archive`),
  unarchive: (id: string) => api.post<{ success: true; status: string }>(`/api/forms/${id}/unarchive`),
  share: (id: string, channel: string) => api.post<{ success: true }>(`/api/forms/${id}/share`, { channel }),
  remove: (id: string) => api.del<{ success: true }>(`/api/forms/${id}`),
};
