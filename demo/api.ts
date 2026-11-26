import type { Block } from "../src/types";

export interface DemoBrief {
  businessName: string;
  clientName: string;
  title: string;
  industry: string;
  service: string;
  problem: string;
  requirements: string;
  scope: string;
  deliverables: string;
  timeline: string;
  budget: string;
  paymentTerms: string;
  tone: "Formal" | "Friendly" | "Direct" | "Consultative";
  sections: string[];
  packages: { name: string; price?: number; deliverables: string }[];
  targetAudience?: string;
  additional?: string;
}

export interface DemoDocument {
  title: string;
  blocks: Block[];
  meta: {
    model: string;
    sections: string[];
    visuals: number;
    warnings: string[];
    generatedAt: string;
  };
}

export type RefineAction =
  | "improve"
  | "professional"
  | "persuasive"
  | "simplify"
  | "expand"
  | "shorten"
  | "summary"
  | "scope"
  | "value"
  | "pricing";

const BASE = ((import.meta.env.VITE_DEMO_API_BASE as string | undefined) || "https://api.revercue.co.uk").replace(/\/+$/, "");

export class DemoApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly retryable: boolean;

  constructor(code: string, message: string, status: number, retryable = true) {
    super(message);
    this.name = "DemoApiError";
    this.code = code;
    this.status = status;
    this.retryable = retryable;
  }
}

async function post<T>(path: string, body: unknown, timeoutMs: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let response: Response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timer);
    if ((error as Error)?.name === "AbortError") {
      throw new DemoApiError("timeout", "Generation took too long. Your details are kept in the form, so you can retry.", 0);
    }
    throw new DemoApiError("network_error", `The proposal service could not be reached at ${BASE}. Check your connection and retry.`, 0);
  } finally {
    clearTimeout(timer);
  }

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    if (response.status === 404 && path.startsWith("/api/demo")) {
      throw new DemoApiError(
        "demo_api_not_deployed",
        "The demo API is not live on api.revercue.co.uk yet. The Worker needs the new /api/demo routes deployed.",
        404,
        false
      );
    }
    throw new DemoApiError(
      String(data.error ?? "request_failed"),
      String(data.message ?? `Request failed (${response.status}).`),
      response.status,
      data.retryable !== false
    );
  }
  return data as T;
}

export async function generateProposal(brief: DemoBrief): Promise<DemoDocument> {
  const result = await post<{ document: DemoDocument }>("/api/demo/proposal", brief, 120_000);
  return result.document;
}

export async function refineText(input: {
  text: string;
  action: RefineAction;
  tone?: string;
  context?: string;
}): Promise<string> {
  const result = await post<{ text: string }>("/api/demo/refine", input, 40_000);
  return result.text;
}

export async function regenerateVisual(input: {
  type: "image" | "icon" | "chart" | "diagram";
  query: string;
  data?: unknown;
}): Promise<Block> {
  const result = await post<{ block: Block | null; reason?: string | null }>("/api/demo/visual", input, 30_000);
  if (!result.block) {
    throw new DemoApiError("no_visual", `No usable ${input.type} was found (${String(result.reason ?? "unavailable").replace(/_/g, " ")}).`, 200);
  }
  return result.block;
}
