import { pipelineApi } from "../api/proposals";
import { isAvailable, organize as helperOrganize, visualize } from "./webllm";
import type { Block } from "../types";

export interface ResearchNote {
  title: string;
  body: string;
  source?: string;
}

export interface Research {
  notes: ResearchNote[];
  images: string[];
}

const researchKey = (id: string) => `revercue_research_${id}`;
const doneKey = (id: string) => `revercue_pipeline_${id}`;

/** The research extracted after the brief: notes and images from the backend. */
export function readResearch(id: string): Research {
  try {
    const raw = sessionStorage.getItem(researchKey(id));
    if (!raw) return { notes: [], images: [] };
    const parsed = JSON.parse(raw) as Research | ResearchNote[];
    if (Array.isArray(parsed)) return { notes: parsed, images: [] };
    return { notes: parsed.notes ?? [], images: parsed.images ?? [] };
  } catch {
    return { notes: [], images: [] };
  }
}

export function saveResearch(id: string, research: Research): void {
  try {
    sessionStorage.setItem(researchKey(id), JSON.stringify(research));
  } catch {
    /* the notes are a convenience, not a requirement */
  }
}

export function pipelineDone(id: string): boolean {
  try {
    return sessionStorage.getItem(doneKey(id)) === "1";
  } catch {
    return false;
  }
}

export function markPipelineDone(id: string): void {
  try {
    sessionStorage.setItem(doneKey(id), "1");
  } catch {
    /* nothing to do */
  }
}

const PLACEHOLDER = /^\{\{([a-zA-Z0-9_]+)\}\}$/;

function resolve(value: string | undefined, fills: Record<string, string>): string | undefined {
  if (!value) return value;
  const match = PLACEHOLDER.exec(value.trim());
  if (!match) return value;
  return fills[match[1]] ?? value;
}

function normaliseSections(sections: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(sections)) {
    if (typeof value !== "string") continue;
    out[key.toLowerCase().replace(/[^a-z0-9]+/g, "_")] = value;
  }
  return out;
}

export interface DraftPipelineInput {
  id: string;
  blocks: Block[];
  sections: string[];
  tone: string;
  /** What we already know from the requirement form, keyed by placeholder. */
  fills: Record<string, string>;
  packages?: { label: string; price: number }[];
  industry?: string;
  withVisuals?: boolean;
}

export interface DraftPipelineResult {
  blocks: Block[];
  source: "helper" | "backend" | "pattern";
  notes: number;
  visuals: number;
}

/**
 * The first draft: research → organized sections → the template's placeholders,
 * then the visual requests → backend assets → blocks on the canvas. Everything
 * here is best effort; a failure leaves the placeholder for the author.
 */
export async function runDraftPipeline(input: DraftPipelineInput): Promise<DraftPipelineResult> {
  const { id, sections, tone, fills, packages, industry, withVisuals = true } = input;
  const research = readResearch(id);

  let organized: Record<string, string> = {};
  let source: DraftPipelineResult["source"] = "pattern";

  if (research.notes.length) {
    if (isAvailable()) {
      const fromHelper = await helperOrganize(research.notes, sections, tone || "formal");
      if (Object.keys(fromHelper).length) {
        organized = normaliseSections(fromHelper);
        source = "helper";
      }
    }
    if (!Object.keys(organized).length) {
      try {
        const response = await pipelineApi.organize({
          research: research.notes,
          sections,
          tone: tone || "formal",
          document: { blocks: input.blocks },
        });
        if (response.sections && Object.keys(response.sections).length) {
          organized = normaliseSections(response.sections);
          source = "backend";
        }
      } catch {
        /* the pattern fills below still run */
      }
    }
  }

  const merged: Record<string, string> = { ...fills };
  for (const [key, value] of Object.entries(organized)) {
    if (value.trim()) merged[key] = value;
  }

  const filled = applyFills(input.blocks, merged, packages);
  const blocks = withVisuals ? await placeVisuals(id, filled, sections, industry) : filled;

  return {
    blocks,
    source,
    notes: research.notes.length,
    visuals: blocks.filter((block) => block.meta?.fromPipeline).length,
  };
}

function applyFills(blocks: Block[], fills: Record<string, string>, packages?: { label: string; price: number }[]): Block[] {
  return blocks.map((block) => {
    const next: Block = {
      ...block,
      text: resolve(block.text, fills),
      alt: resolve(block.alt, fills),
      items: block.items?.map((item) => ({
        ...item,
        label: resolve(item.label, fills) ?? item.label,
      })),
      columns: block.columns?.map((column) => column.map((line) => resolve(line, fills) ?? line)),
    };

    if (block.type === "packages" && packages?.length && block.items?.length) {
      next.items = block.items.map((item, index) => {
        const chosen = packages[index];
        return chosen ? { ...item, label: chosen.label, price: chosen.price } : item;
      });
    }

    return next;
  });
}

/** A deterministic visual plan, used when the helper cannot decide. */
function patternRequests(blocks: Block[], industry?: string) {
  const requests: { afterBlockId: string; kind: string; type?: string; query: string; section_id?: string }[] = [];
  const intro = blocks.find((block) => block.type === "paragraph");
  const pricing = blocks.find((block) => block.type === "packages" || block.type === "pricing_table");
  const timeline = blocks.find((block) => block.type === "timeline");

  if (intro) requests.push({ afterBlockId: intro.id, type: "image", kind: "image", query: industry || "the work", section_id: intro.id });
  if (pricing) requests.push({ afterBlockId: pricing.id, type: "chart", kind: "chart", query: "the price breakdown", section_id: pricing.id });
  if (timeline) requests.push({ afterBlockId: timeline.id, type: "diagram", kind: "diagram", query: "the delivery process", section_id: timeline.id });

  return requests.slice(0, 3);
}

function assetUrl(asset: unknown): string | undefined {
  if (typeof asset === "string") return asset || undefined;
  if (!asset || typeof asset !== "object") return undefined;
  const record = asset as Record<string, unknown>;
  for (const key of ["url", "src", "image_url", "imageUrl", "file_url"]) {
    const value = record[key];
    if (typeof value === "string" && value) return value;
  }
  return undefined;
}

/** Ask the backend's element engine for the visuals, then place them. */
async function placeVisuals(id: string, blocks: Block[], sections: string[], industry?: string): Promise<Block[]> {
  let requests = isAvailable() ? await visualize({ blocks }, sections) : [];
  if (!requests.length) requests = patternRequests(blocks, industry);
  if (!requests.length) return blocks;

  const normalized: any[] = requests.map((r: any) => ({
    afterBlockId: r.afterBlockId,
    type: r.type || r.kind,
    kind: r.kind || r.type,
    query: r.query,
    section_id: r.afterBlockId,
  }));
  let assets: Record<string, unknown> = {};
  try {
    const response = await pipelineApi.visuals({ document: { blocks }, requests: normalized });
    assets = response.assets ?? {};
  } catch {
    /* the requests still place a labelled element the author can fill */
  }

  const stamp = Date.now().toString(36);
  const next = [...blocks];

  normalized.forEach((request, index) => {
    if (!request.afterBlockId) return;
    const at = next.findIndex((block) => block.id === request.afterBlockId);
    if (at < 0) return;
    if (next.some((block) => block.meta?.fromPipeline === request.query)) return;

    const url = assetUrl(assets[request.afterBlockId]);
    const kind = request.kind || request.type;
    const visual: Block =
      kind === "chart"
        ? {
            id: `${stamp}_v${index}`,
            type: "graph",
            text: request.query,
            meta: { fromPipeline: request.query, visual: kind },
          }
        : {
            id: `${stamp}_v${index}`,
            type: "image",
            url: url ?? "",
            alt: request.query,
            meta: { fromPipeline: request.query, visual: kind },
          };

    next.splice(at + 1, 0, visual);
  });

  return next.map((block) => ({ ...block, meta: { ...block.meta, pipelineId: id } }));
}
