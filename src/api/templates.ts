import { api } from "./client";
import type { Template } from "../types";

export const templatesApi = {
  list: (type?: "proposal" | "contract") =>
    api.get<{ built_in: Template[]; custom: Template[] }>("/api/templates", { query: { type } }),

  get: (id: string) => api.get<{ template: Template; html: string }>(`/api/templates/${id}`),

  upload: (body: { file?: File; url?: string; name: string; type: "proposal" | "contract"; tags?: string[] }) => {
    const form = new FormData();
    if (body.file) form.append("file", body.file);
    if (body.url) form.append("url", body.url);
    form.append("name", body.name);
    form.append("type", body.type);
    if (body.tags?.length) form.append("tags", body.tags.join(","));
    return api.upload<{ success: true; id: string; b2_key?: string }>("/api/templates/upload", form);
  },

  remove: (id: string) => api.del<{ success: true }>(`/api/templates/${id}`),

  /**
   * Built-in library shares carry a signed token instead of a database row.
   * The link only works for a signed-in Revercue user: a shared template is a
   * reference layout, not a client document.
   */
  shareLibraryTemplate: (body: { template_type: "proposal" | "contract"; template_id: string }) =>
    api.post<{ success: true; token: string; path: string }>("/api/templates/library/share", body),

  sharedTemplate: (token: string) =>
    api.get<{ template_type: "proposal" | "contract"; template_id: string; shared_by: string | null }>(
      `/api/templates/library/shared/${encodeURIComponent(token)}`,
    ),
};
