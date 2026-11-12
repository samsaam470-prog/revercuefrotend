import { api } from "./client";
import type { Paginated } from "../types/api";
import type { Contract, DocContent, DocumentSummary, Proposal } from "../types";

export interface RequirementPayload {
  client_id?: string;
  client_name?: string;
  client_email?: string;
  title?: string;
  problem?: string;
  sections?: string[];
  currency?: string;
  timeline_length?: string;
  tone?: string;
  faqs?: { question: string; answer: string }[];
  questions?: unknown[];
}

export const proposalsApi = {
  list: (query: { status?: string; page?: number; limit?: number } = {}) =>
    api.get<Paginated<DocumentSummary>>("/api/proposals", { query }),

  draft: (body: RequirementPayload) =>
    api.post<{ success: true; id: string; status: string; client_id?: string }>(
      "/api/proposals/draft",
      body,
    ),

  get: (id: string) => api.get<{ proposal: Proposal }>(`/api/proposals/${id}`),

  update: (id: string, body: Partial<Proposal> & { content?: DocContent }) =>
    api.patch<{ success: true; updated_at?: string }>(`/api/proposals/${id}`, body),

  publish: (id: string) =>
    api.post<{ success: true; public_id: string; url: string }>(`/api/proposals/${id}/publish`),

  duplicate: (id: string, client_id?: string) =>
    api.post<{ success: true; id: string; status: string }>(`/api/proposals/${id}/duplicate`, {
      client_id,
    }),

  archive: (id: string) =>
    api.post<{ success: true; status: string; archive_deletion_date?: string }>(
      `/api/proposals/${id}/archive`,
    ),

  unarchive: (id: string) =>
    api.post<{ success: true; status: string }>(`/api/proposals/${id}/unarchive`),

  share: (id: string, channel: string) =>
    api.post<{ success: true }>(`/api/proposals/${id}/share`, { channel }),

  password: (id: string, body: { password: string } | { remove: true }) =>
    api.post<{ success: true; password_protected: boolean; count?: string }>(
      `/api/proposals/${id}/password`,
      body,
    ),

  remove: (id: string) => api.del<{ success: true }>(`/api/proposals/${id}`),
};

export type { Contract };
