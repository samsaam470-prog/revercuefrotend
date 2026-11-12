import { api } from "./client";
import type { Activity, Suggestion, Summary } from "../types";

export const dashboardApi = {
  summary: () => api.get<Summary>("/api/dashboard/summary"),
  suggestions: () => api.get<{ suggestions: Suggestion[] }>("/api/dashboard/suggestions"),
  activity: (limit = 10) => api.get<{ activity: Activity[] }>("/api/dashboard/activity", { query: { limit } }),
  dismissSuggestion: (id: string) =>
    api.post<{ success: true }>(`/api/dashboard/suggestions/${id}/dismiss`),
};
