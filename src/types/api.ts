export interface ApiErrorShape {
  error: string;
  message: string;
  details?: Record<string, unknown>;
}

export class ApiError extends Error {
  status: number;
  code: string;
  details: Record<string, unknown>;
  constructor(status: number, code: string, message: string, details: Record<string, unknown> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface Paginated<T> {
  data: T[];
  pagination: Pagination;
}

export interface SuccessResponse {
  success: true;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string | null;
  query?: Record<string, string | number | boolean | undefined | null>;
  raw?: boolean;
  /**
   * Leave 401 handling to the caller instead of running the global sign-out
   * handler. The sign-in completion and account-link requests use this: they
   * run before a session exists, so a 401 is information ("not linked yet",
   * "token rejected") rather than an expired session.
   */
  suppressUnauthorized?: boolean;
}
