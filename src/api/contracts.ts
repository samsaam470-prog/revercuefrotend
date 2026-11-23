import type { Paginated } from "../types/api";
import type { Contract, DocContent, DocumentSummary } from "../types";

export interface ContractDraftPayload {
  client_id?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  linked_proposal_id?: string;
  client_website?: string;
  user_website?: string;
  business_name?: string;
  title: string;
  scope: string;
  payment_terms: string;
  timeline?: string;
  revisions: string;
  cancellation: string;
  after_approval: "form" | "invoice" | "pdf_only";
  currency: string;
  sections?: string[];
}

export const contractsApi = {
  list: (query: { status?: string; page?: number; limit?: number } = {}) =>
    api.get<Paginated<DocumentSummary>>("/api/contracts", { query }),

  draft: (body: ContractDraftPayload) =>
    api.post<{ success: true; id: string; status: string; client_id?: string }>(
      "/api/contracts/draft",
      body,
    ),

  get: (id: string) => api.get<{ contract: Contract }>(`/api/contracts/${id}`),

  update: (id: string, body: Partial<Contract> & { content?: DocContent }) =>
    api.patch<{ success: true; updated_at?: string }>(`/api/contracts/${id}`, body),

  signFreelancer: (id: string, body: { signature: string; consent: boolean; name: string; expected_version_id?: string; expected_content_hash?: string }) =>
    api.post<{ success: true; status?: string; version_id?: string }>(`/api/contracts/${id}/sign`, body),

  publish: (id: string) =>
    api.post<{ success: true; public_id: string; url: string }>(`/api/contracts/${id}/publish`),

  duplicate: (id: string, client_id?: string) =>
    api.post<{ success: true; id: string; status: string }>(`/api/contracts/${id}/duplicate`, {
      client_id,
    }),

  archive: (id: string) => api.post<{ success: true; status: string }>(`/api/contracts/${id}/archive`),
  unarchive: (id: string) => api.post<{ success: true; status: string }>(`/api/contracts/${id}/unarchive`),

  share: (id: string, channel: string) =>
    api.post<{ success: true }>(`/api/contracts/${id}/share`, { channel }),

  remove: (id: string) => api.del<{ success: true }>(`/api/contracts/${id}`),

  versions: (id: string) => api.get<{ versions: unknown[] }>(`/api/contracts/${id}/versions`),
  events: (id: string) => api.get<{ events: unknown[] }>(`/api/contracts/${id}/events`),
  tracking: (id: string) => api.get<{ tracking: unknown[] }>(`/api/contracts/${id}/tracking`),
  signedPdfLink: (id: string) =>
    api.get<{ success: true; token: string; expires_at: string; url: string }>(`/api/contracts/${id}/signed-pdf-link`),
  pdf: (id: string) => api.get<Blob>(`/api/contracts/${id}/pdf`, { raw: true }),
};
