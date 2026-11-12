import { api } from "./client";
import type { Paginated } from "../types/api";

/** Admin routes are documented in api.txt Part 13. No admin.txt blueprint exists yet. */
export const adminApi = {
  login: (username: string, password: string) =>
    api.post<{ success: true; token: string }>("/api/admin/login", { username, password }, { token: null }),
  overview: () => api.get<Record<string, number>>("/api/admin/overview"),
  users: (query: { search?: string; plan?: string } = {}) =>
    api.get<Paginated<Record<string, unknown>>>("/api/admin/users", { query }),
  user: (id: string) => api.get<Record<string, unknown>>(`/api/admin/users/${id}`),
  setPlan: (id: string, body: { plan: string; expires_at?: string; amount?: number; reference?: string }) =>
    api.patch<{ success: true }>(`/api/admin/users/${id}/plan`, body),
  waitlist: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/waitlist"),
  betaTesters: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/beta-testers"),
  contactMessages: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/contact-messages"),
  websiteHelp: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/website-help"),
  payments: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/payments"),
  feedback: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/feedback"),
  templates: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/templates"),
  health: () => api.get<Record<string, unknown>>("/api/admin/health"),
  notes: () => api.get<Paginated<Record<string, unknown>>>("/api/admin/notes"),
  addNote: (body: { user_id?: string; note: string }) =>
    api.post<{ success: true }>("/api/admin/notes", body),
};
