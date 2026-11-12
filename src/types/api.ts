export interface ApiError {
  error: string;
  message: string;
  details?: Record<string, unknown>;
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
