import { ApiError } from "../types/api";
import type { RequestOptions } from "../types/api";
import { tokenStore } from "../lib/storage";
import { NETWORK_MESSAGE } from "../lib/errors";

const BASE = (
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "https://revercue-api.samsaam470.workers.dev"
).replace(/\/$/, "");

let unauthorizedHandler: (() => void) | null = null;

/** The AuthContext registers the 401 handler once, at mount. */
export function setUnauthorizedHandler(handler: (() => void) | null): void {
  unauthorizedHandler = handler;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(BASE + path);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, token, headers, query, raw, ...rest } = options;
  const authToken = token === undefined ? tokenStore.get() : token;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(isFormData ? {} : body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...((headers as Record<string, string>) || {}),
  };

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      ...rest,
      headers: finalHeaders,
      body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "network_error", NETWORK_MESSAGE);
  }

  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    let payload: { error?: string; message?: string; details?: Record<string, unknown> } = {};
    if (contentType.includes("application/json")) {
      payload = await response.json().catch(() => ({}));
    }
    const error = new ApiError(
      response.status,
      payload.error || (response.status === 403 ? "forbidden" : "internal_server_error"),
      payload.message || `Request failed (${response.status}).`,
      payload.details || {},
    );
    if (response.status === 401 && unauthorizedHandler) unauthorizedHandler();
    throw error;
  }

  if (response.status === 204) return undefined as T;
  if (raw) return response as unknown as T;
  if (contentType.includes("application/json")) return (await response.json()) as T;
  return (await response.blob()) as unknown as T;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
  del: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
  upload: <T>(path: string, form: FormData, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body: form }),
  raw: request,
};

export { BASE as API_BASE_URL };
