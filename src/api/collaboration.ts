import { api } from "./client";
import type { DocContent } from "../types";

/** Document builders that support Shareable Builder and Offline Builder. */
export type CollabDocumentType = "proposal" | "contract" | "invoice" | "form";

export type EditingStateName =
  | "normal_online_editing"
  | "contributor_invited"
  | "contributor_editing"
  | "offline_preparing"
  | "offline_editing"
  | "offline_completed"
  | "syncing"
  | "sync_failed"
  | "conflict_review";

export interface EditingState {
  state: EditingStateName;
  authority_kind: "owner" | "contributor" | "offline";
  authority_id: string | null;
  last_saved_at: string | null;
  cloud_version: string | null;
  offline_session_id: string | null;
  updated_at: string;
}

export interface Invitation {
  id: string;
  contributor_email: string;
  status: "pending" | "active" | "completed" | "revoked" | "expired";
  expires_at: string;
  created_at: string;
  completed_at: string | null;
  last_saved_at: string | null;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  author: "owner" | "contributor";
  body: string;
  created_at: string;
}

export interface CollabOverview {
  state: EditingState;
  can_edit: boolean;
  invitations: Invitation[];
  previous_contributors: { contributor_email: string; last_used: string }[];
}

export interface ContributorSession {
  session: {
    invitation_id: string;
    contributor_email: string;
    document_type: CollabDocumentType;
    document_id: string;
    expires_at: string;
    last_saved_at: string | null;
  };
  document: { id: string; title: string; type: CollabDocumentType; content: Record<string, unknown> };
  permissions: { edit: boolean; publish: boolean; send: boolean; invite: boolean; view_tracking: boolean };
}

const base = (type: string, id: string) => `/api/collaboration/${type}/${id}`;

export const collaborationApi = {
  overview: (type: string, id: string) => api.get<CollabOverview & { success: true }>(base(type, id)),

  invite: (type: string, id: string, email: string) =>
    api.post<{ success: true; invitation: { id: string; contributor_email: string; expires_at: string; url: string } }>(
      `${base(type, id)}/invitation`,
      { email },
    ),

  revoke: (type: string, id: string) => api.del<{ success: true }>(`${base(type, id)}/invitation`),

  complete: (type: string, id: string) => api.post<{ success: true }>(`${base(type, id)}/complete`, {}),

  preview: (type: string, id: string) =>
    api.get<{ success: true; document: { title: string; content: DocContent }; state: EditingState }>(
      `${base(type, id)}/preview`,
    ),

  messages: (type: string, id: string, after?: string | null) =>
    api.get<{ data: ChatMessage[]; session_active: boolean }>(`${base(type, id)}/messages`, {
      query: after ? { after } : undefined,
    }),

  sendMessage: (type: string, id: string, body: string) =>
    api.post<{ success: true; message: ChatMessage }>(`${base(type, id)}/messages`, { body }),

  startOffline: (type: string, id: string, deviceId: string, cloudVersion: string | null) =>
    api.post<{ success: true; sessionId: string; lockToken: string; document: unknown; prepared_at: string }>(
      `${base(type, id)}/offline/start`,
      { device_id: deviceId, cloud_version: cloudVersion },
    ),

  completeOffline: (type: string, id: string, sessionId: string) =>
    api.post<{ success: true; completed_at: string }>(`${base(type, id)}/offline/complete`, { session_id: sessionId }),

  reopenOffline: (type: string, id: string, sessionId: string) =>
    api.post<{ success: true }>(`${base(type, id)}/offline/reopen`, { session_id: sessionId }),

  syncOffline: (
    type: string,
    id: string,
    payload: { session_id: string; lock_token: string; expected_version: string | null; content: Record<string, unknown> },
  ) => api.post<{ success: true; cloud_version: string }>(`${base(type, id)}/offline/sync`, payload),

  releaseOffline: (type: string, id: string) =>
    api.post<{ success: true }>(`${base(type, id)}/offline/release`, { confirm: true }),
};

/** Contributor calls: the invitation token is the only credential. */
export const contributorApi = {
  open: (token: string) =>
    api.post<{ success: true } & ContributorSession>(`/api/collaboration/contributor/open`, { token }, { token: null }),

  save: (token: string, content: Record<string, unknown>) =>
    api.post<{ success: true; saved_at: string }>(
      `/api/collaboration/contributor/${encodeURIComponent(token)}/save`,
      { content },
      { token: null },
    ),

  complete: (token: string) =>
    api.post<{ success: true; already?: boolean }>(
      `/api/collaboration/contributor/${encodeURIComponent(token)}/complete`,
      {},
      { token: null },
    ),

  state: (token: string) =>
    api.get<{ status: string; state: EditingStateName | null; last_saved_at: string | null; expires_at: string }>(
      `/api/collaboration/contributor/${encodeURIComponent(token)}/state`,
      { token: null },
    ),

  messages: (token: string, after?: string | null) =>
    api.get<{ data: ChatMessage[] }>(`/api/collaboration/contributor/${encodeURIComponent(token)}/messages`, {
      token: null,
      query: after ? { after } : undefined,
    }),

  sendMessage: (token: string, body: string) =>
    api.post<{ success: true; message: ChatMessage }>(
      `/api/collaboration/contributor/${encodeURIComponent(token)}/messages`,
      { body },
      { token: null },
    ),
};
