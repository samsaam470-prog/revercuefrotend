import { api } from "./client";

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: string;
  image_url?: string | null;
  link_url?: string | null;
  published_at?: string | null;
  created_at: string;
  seen?: boolean;
}

export const announcementsApi = {
  list: () => api.get<{ data: Announcement[] }>("/api/announcements"),
  seen: (id: string) => api.post<{ success: true }>(`/api/announcements/${id}/seen`),
  dismiss: (id: string) => api.post<{ success: true }>(`/api/announcements/${id}/dismiss`),
};
