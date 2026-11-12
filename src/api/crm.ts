import { api } from "./client";
import type { Paginated } from "../types/api";
import type { Client, ClientDetail, CommunicationEntry, Note } from "../types";

export interface CommunicationPayload {
  entry_type: CommunicationEntry["entry_type"];
  direction?: "outgoing" | "incoming";
  channel?: string;
  message_text?: string;
  estimated_time?: string;
  linked_document_type?: string;
  linked_document_id?: string;
  next_step?: string;
  follow_up_date?: string;
}

export const crmApi = {
  list: (query: { search?: string; filter?: string; sort?: string; page?: number; limit?: number } = {}) =>
    api.get<Paginated<Client>>("/api/crm/clients", { query }),

  create: (body: { name: string; email: string; company?: string; phone?: string; channel?: string }) =>
    api.post<{ success: true; id: string }>("/api/crm/clients", body),

  get: (id: string) => api.get<ClientDetail>(`/api/crm/clients/${id}`),

  update: (id: string, body: Partial<Client>) =>
    api.patch<{ success: true }>(`/api/crm/clients/${id}`, body),

  remove: (id: string, keep_documents = true) =>
    api.del<{ success: true }>(`/api/crm/clients/${id}`, { query: { keep_documents } }),

  addNote: (id: string, note: string) =>
    api.post<{ success: true; id: string }>(`/api/crm/clients/${id}/notes`, { note }),

  communication: (id: string) => api.get<{ data: CommunicationEntry[] }>(`/api/crm/clients/${id}/communication`),

  addCommunication: (id: string, body: CommunicationPayload) =>
    api.post<{ success: true; id: string }>(`/api/crm/clients/${id}/communication`, body),

  updateCommunication: (
    id: string,
    body: { follow_up_done?: boolean; message_text?: string; next_step?: string },
  ) => api.patch<{ success: true }>(`/api/crm/communication/${id}`, body),

  removeCommunication: (id: string) => api.del<{ success: true }>(`/api/crm/communication/${id}`),

  exportCsv: () => api.raw<Blob>("/api/crm/clients/export", { raw: true }),

  interest: (id: string) =>
    api.get<{ score: number; label: string; signals: { label: string; value?: string; contribution: number }[] }>(
      `/api/crm/clients/${id}/interest`,
    ),
};

export type { Client, ClientDetail, Note };
