import { api } from "./client";
import type { Paginated } from "../types/api";
import type { DocumentSummary, Invoice, LineItem, PaymentArrangement } from "../types";

export interface InvoiceDraftPayload {
  client_id?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  linked_contract_id?: string;
  line_items: LineItem[];
  currency: string;
  tax?: number;
  tax_label?: string;
  total: number;
  payment_arrangement: PaymentArrangement;
  due_date: string;
  notes?: string;
}

export const invoicesApi = {
  list: (query: { status?: string; filter?: string; page?: number; limit?: number } = {}) =>
    api.get<Paginated<DocumentSummary>>("/api/invoices", { query }),

  draft: (body: InvoiceDraftPayload) =>
    api.post<{ success: true; id: string; status: string; invoice_number?: string }>(
      "/api/invoices/draft",
      body,
    ),

  get: (id: string) => api.get<{ invoice: Invoice }>(`/api/invoices/${id}`),

  update: (id: string, body: Partial<Invoice>) =>
    api.patch<{ success: true; updated_at?: string }>(`/api/invoices/${id}`, body),

  publish: (id: string) =>
    api.post<{ success: true; public_id: string; url: string }>(`/api/invoices/${id}/publish`),

  duplicate: (id: string) =>
    api.post<{ success: true; id: string; status: string }>(`/api/invoices/${id}/duplicate`, {}),

  archive: (id: string) => api.post<{ success: true; status: string }>(`/api/invoices/${id}/archive`),
  unarchive: (id: string) => api.post<{ success: true; status: string }>(`/api/invoices/${id}/unarchive`),
  share: (id: string, channel: string) =>
    api.post<{ success: true }>(`/api/invoices/${id}/share`, { channel }),

  confirmPayment: (id: string) =>
    api.post<{ success: true; status: string }>(`/api/invoices/${id}/confirm-payment`),

  remove: (id: string) => api.del<{ success: true }>(`/api/invoices/${id}`),
};
