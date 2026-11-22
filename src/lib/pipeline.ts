import { pipelineApi } from "../api/proposals";
import { applyBrief, type Brief } from "./brief";
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

/** The stages the draft screen names, in order. */
export type DraftStage = "brief" | "industry" | "service" | "write" | "visuals" | "render";

export const DRAFT_STAGES: DraftStage[] = ["brief", "industry", "service", "write", "visuals", "render"];

export interface DraftPipelineInput {
  id: string;
  blocks: Block[];
  brief: Brief;
  kind: "proposal" | "contract";
  withVisuals?: boolean;
  onStage?: (stage: DraftStage) => Promise<void> | void;
  /** How long to wait for the brief's research before drafting without it. */
  researchTimeoutMs?: number;
}

export interface DraftPipelineResult {
  blocks: Block[];
  source: "helper" | "backend" | "pattern";
  notes: number;
  visuals: number;
  brief: Brief;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** The research request starts on the brief form; give it a moment to land. */
async function waitForResearch(id: string, timeoutMs: number): Promise<Research> {
  const deadline = Date.now() + timeoutMs;
  let research = readResearch(id);
  while (!research.notes.length && !research.images.length && Date.now() < deadline) {
    await sleep(350);
    research = readResearch(id);
  }
  return research;
}

/**
 * The first draft: research → the brief written into the template's blocks →
 * the visuals → the blocks on the canvas. Every stage is reported so the
 * loading screen can name the work in progress, and a failure at any point
 * still leaves a readable document.
 */
export async function runDraftPipeline(input: DraftPipelineInput): Promise<DraftPipelineResult> {
  const { id, blocks, brief, withVisuals = true, onStage, researchTimeoutMs = 4000 } = input;
  const stage = async (name: DraftStage) => {
    if (onStage) await onStage(name);
  };

  await stage("brief");
  await stage("industry");
  const research = await waitForResearch(id, researchTimeoutMs);

  const enriched: Brief = {
    ...brief,
    heroImage: brief.heroImage || research.images[0],
  };

  await stage("service");

  let source: DraftPipelineResult["source"] = "pattern";
  if (research.notes.length && isAvailable()) {
    try {
      const organized = await helperOrganize(research.notes, brief.sections, brief.tone || "formal");
      if (Object.keys(organized).length) source = "helper";
    } catch {
      /* the brief itself is enough to write the draft */
    }
  }

  await stage("write");
  const written = applyBrief(blocks, enriched);

  await stage("visuals");
  const visuals = withVisuals ? await placeVisuals(id, written, enriched) : written;

  await stage("render");

  return {
    blocks: visuals,
    source,
    notes: research.notes.length,
    visuals: visuals.filter((block) => block.meta?.fromPipeline).length,
    brief: enriched,
  };
}

/** A deterministic visual plan, used when the helper cannot decide. */
function patternRequests(blocks: Block[], brief: Brief) {
  const requests: { afterBlockId: string; kind: string; type?: string; query: string; section_id?: string }[] = [];
  const intro = blocks.find((block) => block.type === "paragraph");
  const pricing = blocks.find((block) => block.type === "packages" || block.type === "pricing_table");
  const timeline = blocks.find((block) => block.type === "timeline");

  const subject = brief.service || brief.industry || "the work";
  if (intro && !blocks.some((block) => block.type === "image" && block.url)) {
    requests.push({ afterBlockId: intro.id, type: "image", kind: "image", query: subject, section_id: intro.id });
  }
  if (pricing && brief.packages.length) {
    requests.push({ afterBlockId: pricing.id, type: "chart", kind: "chart", query: "the price breakdown", section_id: pricing.id });
  }
  if (timeline) {
    requests.push({ afterBlockId: timeline.id, type: "chart", kind: "chart", query: "the delivery process", section_id: timeline.id });
  }

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
async function placeVisuals(id: string, blocks: Block[], brief: Brief): Promise<Block[]> {
  let requests = isAvailable() ? await visualize({ blocks }, brief.sections) : [];
  if (!requests.length) requests = patternRequests(blocks, brief);
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
    /* the draft still stands without the extra visuals */
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

    // A chart or a diagram is drawn from the numbers we already have. An image
    // only lands when there is a real asset, so no empty dashed box appears.
    const visual: Block | null =
      kind === "chart" || kind === "diagram"
        ? {
            id: `${stamp}_v${index}`,
            type: "graph",
            text: request.query,
            meta: { fromPipeline: request.query, visual: kind },
          }
        : url
          ? {
              id: `${stamp}_v${index}`,
              type: "image",
              url,
              alt: request.query,
              meta: { fromPipeline: request.query, visual: kind },
            }
          : null;

    if (visual) next.splice(at + 1, 0, visual);
  });

  return next.map((block) => ({ ...block, meta: { ...block.meta, pipelineId: id } }));
}
