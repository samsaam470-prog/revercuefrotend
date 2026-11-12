import { api } from "./client";
import type { Contract, FormDoc, Invoice, Proposal } from "../types";

/**
 * Client-facing routes. No auth header; the public_id is the access token.
 * A password wall answers 401 with { password_wall: true } — handled by the caller.
 */
export const publicApi = {
  getProposal: (publicId: string, token?: string) =>
    api.get<{ proposal: Proposal }>(`/api/public/p/${publicId}`, {
      token: token ?? null,
      query: { session: token },
    }),

  unlockProposal: (publicId: string, password: string) =>
    api.post<{ success: true; session_token: string }>(
      `/api/public/p/${publicId}/unlock`,
      { password },
      { token: null },
    ),

  proposalEvent: (publicId: string, body: { session_token?: string; event_type: string; event_data?: unknown }) =>
    api.post<{ success: true }>(`/api/public/p/${publicId}/events`, body, { token: null }),

  askQuestion: (
    publicId: string,
    body: { session_token?: string; question_id?: string; question_text: string },
  ) => api.post<{ success: true }>(`/api/public/p/${publicId}/question`, body, { token: null }),

  getContract: (publicId: string, token?: string) =>
    api.get<{ contract: Contract }>(`/api/public/c/${publicId}`, {
      token: token ?? null,
      query: { session: token },
    }),

  unlockContract: (publicId: string, password: string) =>
    api.post<{ success: true; session_token: string }>(
      `/api/public/c/${publicId}/unlock`,
      { password },
      { token: null },
    ),

  contractAction: (
    publicId: string,
    body: { action: "approve" | "decline" | "question"; question?: string; reason?: string; session_token?: string },
  ) => api.post<{ success: true; next_step?: string }>(`/api/public/c/${publicId}/action`, body, { token: null }),

  getInvoice: (publicId: string, token?: string) =>
    api.get<{ invoice: Invoice }>(`/api/public/i/${publicId}`, {
      token: token ?? null,
      query: { session: token },
    }),

  unlockInvoice: (publicId: string, password: string) =>
    api.post<{ success: true; session_token: string }>(
      `/api/public/i/${publicId}/unlock`,
      { password },
      { token: null },
    ),

  buyNow: (publicId: string) =>
    api.post<{ success: true; redirect?: string; show_account_details?: boolean }>(
      `/api/public/i/${publicId}/buy-now`,
      {},
      { token: null },
    ),

  uploadProof: (publicId: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return api.upload<{ success: true; status?: string }>(`/api/public/i/${publicId}/proof`, form, {
      token: null,
    });
  },

  getForm: (publicId: string, token?: string) =>
    api.get<{ form: FormDoc }>(`/api/public/f/${publicId}`, {
      token: token ?? null,
      query: { session: token },
    }),

  unlockForm: (publicId: string, password: string) =>
    api.post<{ success: true; session_token: string }>(`/api/public/f/${publicId}/unlock`, { password }, { token: null }),

  submitForm: (publicId: string, body: { service_type?: string; answers: Record<string, unknown> }) =>
    api.post<{ success: true; generated_prompt?: string; thank_you_config?: FormDoc["thank_you_config"] }>(
      `/api/public/f/${publicId}/submit`,
      body,
      { token: null },
    ),
};
