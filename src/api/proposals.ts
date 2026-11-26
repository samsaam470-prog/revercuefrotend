import { api } from "./client";
import type { Paginated } from "../types/api";
import type {
  Contract,
  DocContent,
  DocumentSummary,
  FormQuestion,
  Proposal,
} from "../types";

export interface PackageInput {
  name: string;
  price?: number;
  deliverables: string;
}

export interface RequirementPayload {
  client_id?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  title?: string;
  industry?: string;
  service?: string;
  client_website?: string;
  own_website?: string;
  business_name?: string;
  problem?: string;
  target_audience?: string;
  cta?: string;
  sections?: string[];
  packages?: PackageInput[];
  currency?: string;
  timeline_length?: string;
  tone?: string;
  scroll_length?: string;
  faqs?: { question: string; answer: string }[];
  questions?: FormQuestion[];
}

export interface ExtractPayload {
  client_name?: string;
  client_website?: string;
  user_website?: string;
  business_name?: string;
  industry?: string;
  service?: string;
  problem?: string;
  target_audience?: string;
}

export interface ExtractNote {
  title: string;
  body: string;
  source?: string;
  /** `client` is first-hand research; `web`/`background` is context only. */
  kind?: "client" | "web" | "background";
}

export interface ResearchFacts {
  business_name?: string;
  value_prop?: string;
  key_points?: string[];
  location?: string;
  author_business_name?: string;
  author_description?: string;
  author_website?: string;
}

export interface OrganizePayload {
  client_name?: string;
  business_name?: string;
  business_website?: string;
  business_description?: string;
  industry?: string;
  service?: string;
  research: { notes: ExtractNote[]; facts?: ResearchFacts };
  sections: string[];
  tone: string;
  document: { blocks: unknown[] };
  /** The brief's first-hand content: preferred over generic research. */
  brief?: {
    problem?: string;
    target_audience?: string;
    timeline?: string;
    cta?: string;
    /** A contract's own scope clause. */
    scope?: string;
    packages?: { name: string; price?: number; deliverables?: string }[];
  };
}

export interface VisualRequest {
  /** The id the backend returns this asset under. */
  id?: string;
  afterBlockId: string;
  /** `image` | `icon` | `chart` | `diagram` | `svg`. */
  type: string;
  kind?: string;
  query: string;
  section_id?: string;
  /** Chart series, diagram steps or SVG markup for the structured types. */
  data?: unknown;
}

export interface VisualAssetPayload {
  id?: string;
  type: string;
  query?: string;
  afterBlockId?: string;
  section_id?: string;
  url?: string;
  icon?: string;
  svg?: string;
  mermaid?: string;
  chart?: { kind?: "bar" | "line"; title?: string; unit?: string; source?: string; series: { label: string; value: number }[] };
  diagram?: { title?: string; source?: string; steps: { title: string; detail?: string }[] };
  license?: string | null;
  creator?: string | null;
  source?: string | null;
  attribution?: string | null;
}

export interface VisualRejection {
  id: string;
  type: string | null;
  query: string | null;
  reason: string;
}

export const proposalsApi = {
  list: (query: { status?: string; page?: number; limit?: number } = {}) =>
    api.get<Paginated<DocumentSummary>>("/api/proposals", { query }),

  draft: (body: RequirementPayload) =>
    api.post<{ success: true; id: string; status: string; client_id?: string }>(
      "/api/proposals/draft",
      body,
    ),

  get: (id: string) => api.get<{ proposal: Proposal }>(`/api/proposals/${id}`),

  update: (id: string, body: Partial<Proposal> & { content?: DocContent }) =>
    api.patch<{ success: true; updated_at?: string }>(`/api/proposals/${id}`, body),

  publish: (id: string) =>
    api.post<{ success: true; public_id: string; url: string }>(`/api/proposals/${id}/publish`),

  duplicate: (id: string, client_id?: string) =>
    api.post<{ success: true; id: string; status: string }>(`/api/proposals/${id}/duplicate`, {
      client_id,
    }),

  archive: (id: string) =>
    api.post<{ success: true; status: string; archive_deletion_date?: string }>(
      `/api/proposals/${id}/archive`,
    ),

  unarchive: (id: string) =>
    api.post<{ success: true; status: string }>(`/api/proposals/${id}/unarchive`),

  share: (id: string, channel: string) =>
    api.post<{ success: true }>(`/api/proposals/${id}/share`, { channel }),

  password: (id: string, body: { password: string } | { remove: true }) =>
    api.post<{ success: true; password_protected: boolean; count?: string }>(
      `/api/proposals/${id}/password`,
      body,
    ),

  remove: (id: string) => api.del<{ success: true }>(`/api/proposals/${id}`),

  pdf: (id: string) => api.get<Blob>(`/api/proposals/${id}/pdf`, { raw: true }),
};

/* Layer 1 (the research), Layer 3 (the pattern fix) and Layer 4 (the assets). */
export const pipelineApi = {
  extract: (body: ExtractPayload) =>
    api.post<{
      success?: boolean;
      notes?: ExtractNote[];
      images?: string[];
      result?: {
        notes?: ExtractNote[];
        images?: string[];
        business_name?: string;
        value_prop?: string;
        key_points?: string[];
        location?: string | null;
        author_business_name?: string;
        author_description?: string;
        author_website?: string;
      };
    }>("/api/extract", body),

  organize: (body: OrganizePayload) =>
    api.post<{
      success?: boolean;
      sections?: Record<string, string>;
      result?: {
        suggested_faqs?: { question?: string; answer?: string }[];
        suggested_packages?: { name?: string; price?: number; deliverables?: string; description?: string }[];
        learned_structure?: { sections?: string[] };
        organized_sections?: Record<string, string>;
        tone?: string;
      };
      provenance?: {
        source: "deterministic_patterns";
        client_specific_notes: number;
        background_notes: number;
        warnings: string[];
        missing_information: string[];
      };
    }>("/api/organize", body),

  visuals: (body: { document: unknown; requests: VisualRequest[] }) =>
    api.post<{
      success?: boolean;
      /** Keyed by the request id. */
      assets: Record<string, VisualAssetPayload>;
      items?: VisualAssetPayload[];
      rejected?: VisualRejection[];
      warnings?: string[];
    }>("/api/organize/visuals", body),

  extractVisuals: (body: { requests: VisualRequest[] }) =>
    api.post<{
      success?: boolean;
      assets: Record<string, VisualAssetPayload>;
      items?: VisualAssetPayload[];
      rejected?: VisualRejection[];
      warnings?: string[];
    }>("/api/extract/visuals", body),
};

export type { Contract };
