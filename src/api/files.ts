import { api } from "./client";
import { API_BASE_URL } from "./client";
import { tokenStore } from "../lib/storage";

export const filesApi = {
  upload: (file: File, purpose = "attachment") => {
    const form = new FormData();
    form.append("file", file);
    form.append("purpose", purpose);
    return api.upload<{ success: true; key: string; url?: string }>("/api/files/upload", form);
  },
  url: (key: string) => `${API_BASE_URL}/api/files/${key}`,
  /** The session-end autosave beacon; sendBeacon cannot set headers. */
  beacon: (path: string, payload: unknown): boolean => {
    if (typeof navigator === "undefined" || !navigator.sendBeacon) return false;
    const token = tokenStore.get() || "";
    const url = `${API_BASE_URL}${path}?token=${encodeURIComponent(token)}`;
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    return navigator.sendBeacon(url, blob);
  },
};
