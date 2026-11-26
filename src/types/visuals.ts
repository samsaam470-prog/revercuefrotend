/**
 * The visual asset contract shared by the API client, the pipeline and the
 * document renderer. The backend returns the same shapes from
 * `/api/organize/visuals`.
 */

export type VisualAssetType = "image" | "icon" | "chart" | "diagram" | "svg";

export interface ChartSpec {
  kind: "bar" | "line";
  labels: string[];
  values: number[];
  unit?: string;
  title?: string;
}

export interface DiagramSpec {
  steps: string[];
  /** Mermaid source is optional: older payloads only carried steps. */
  mermaid?: string;
}

export interface ResolvedVisualAsset {
  id: string;
  type: VisualAssetType;
  query: string;
  section_id?: string;
  afterBlockId?: string;
  url?: string;
  alt?: string;
  caption?: string;
  license?: string | null;
  creator?: string | null;
  source?: string | null;
  attribution?: string | null;
  icon?: string;
  svg?: string;
  chart?: ChartSpec;
  diagram?: DiagramSpec;
}

export interface VisualRequestPayload {
  afterBlockId: string;
  section_id?: string;
  type: VisualAssetType;
  query: string;
  data?: unknown;
}

export interface RejectedVisual {
  request: unknown;
  reason: string;
}

export interface VisualsResponse {
  success?: boolean;
  assets?: Record<string, unknown>;
  items?: unknown;
  rejected?: RejectedVisual[];
}
