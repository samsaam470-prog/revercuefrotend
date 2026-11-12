import { api } from "./client";
import type { Paginated } from "../types/api";
import type { Notification } from "../types";

export const notificationsApi = {
  unreadCount: () => api.get<{ count: number }>("/api/notifications/unread-count"),
  list: (query: { limit?: number; page?: number; filter?: "all" | "unread" | "client" | "system" } = {}) =>
    api.get<Paginated<Notification>>("/api/notifications", { query }),
  read: (id: string) => api.patch<{ success: true }>(`/api/notifications/${id}/read`),
  readAll: () => api.patch<{ success: true }>("/api/notifications/read-all"),
  remove: (id: string) => api.del<{ success: true }>(`/api/notifications/${id}`),
};
