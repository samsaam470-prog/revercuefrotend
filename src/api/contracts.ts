import { api } from "./client";
import type { Paginated } from "../types/api";
import type { Contract, DocContent, DocumentSummary } from "../types";

export interface ContractDraftPayload {
  client_id: string;
  linked_proposal_id?: string;
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
};
