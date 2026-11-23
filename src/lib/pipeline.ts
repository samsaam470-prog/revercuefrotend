import { pipelineApi, type ExtractNote } from "../api/proposals";
import {
  applyBrief,
  applyOrganized,
  type Brief,
  type BriefPackage,
  type ResearchFacts,
} from "./brief";
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
  facts?: ResearchFacts;
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
    return { notes: parsed.notes ?? [], images: parsed.images ?? [], facts: parsed.facts };
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

function faqsFromPatterns(value: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(value)) return [];
  const faqs: { question: string; answer: string }[] = [];
  for (const item of value) {
    const record = item as Record<string, unknown>;
    const question = typeof record.question === "string" ? record.question.trim() : "";
    const answer = typeof record.answer === "string" ? record.answer.trim() : "";
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function packagesFromPatterns(value: unknown): BriefPackage[] {
  if (!Array.isArray(value)) return [];
  const packages: BriefPackage[] = [];
  for (const item of value) {
    const record = item as Record<string, unknown>;
    const name = typeof record.name === "string" ? record.name.trim() : "";
    if (!name) continue;
    const price = Number(record.price ?? 0);
    packages.push({
      name,
      price: Number.isFinite(price) ? price : 0,
      deliverables:
        typeof record.deliverables === "string"
          ? record.deliverables
          : typeof record.description === "string"
            ? record.description
            : undefined,
    });
  }
  return packages;
}

async function extractResearch(brief: Brief): Promise<Research> {
  const response = await pipelineApi.extract({
    client_name: brief.clientName && brief.clientName !== "the client" ? brief.clientName : undefined,
    industry: brief.industry || undefined,
    service: brief.service || undefined,
  });
  const data = (response.result ?? {}) as {
    notes?: ExtractNote[];
    images?: string[];
    business_name?: string;
    value_prop?: string;
    key_points?: string[];
    location?: string | null;
  };
  const notes: ExtractNote[] = data.notes ?? response.notes ?? [];
  const images: string[] = data.images ?? response.images ?? [];
  return {
    notes,
    images,
    facts: {
      business_name: data.business_name,
      value_prop: data.value_prop,
      key_points: data.key_points,
      location: data.location ?? undefined,
    },
  };
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
  let research = await waitForResearch(id, researchTimeoutMs);

  // When the brief form's research has not arrived (slow network, a reopened
  // draft), the draft asks the extract route itself instead of writing blind.
  if (!research.notes.length && !research.images.length) {
    try {
      research = await extractResearch(brief);
      saveResearch(id, research);
    } catch {
      /* the brief still produces a readable document */
    }
  }

  const enriched: Brief = {
    ...brief,
    heroImage: brief.heroImage || research.images[0],
    research: research.notes,
    facts: research.facts,
  };

  await stage("service");
  const sections = brief.sections.length
    ? brief.sections
    : ["Introduction", "Scope", "What is included", "Timeline", "Pricing", "Next Step"];
  enriched.sections = sections;

  let source: DraftPipelineResult["source"] = "pattern";
  let organized: Record<string, string> = {};

  // Layer 2 on the server: patterns, learned structure, and research-grounded
  // section copy. This is the copy the document actually uses.
  try {
    const response = await pipelineApi.organize({
      client_name: brief.clientName,
      industry: brief.industry,
      service: brief.service,
      tone: brief.tone || "formal",
      sections,
      research: { notes: research.notes, facts: research.facts },
      document: { blocks },
    });
    organized = response.sections ?? {};
    const result = response.result ?? {};
    if (!enriched.faqs.length) enriched.faqs = faqsFromPatterns(result.suggested_faqs);
    if (!enriched.packages.length) enriched.packages = packagesFromPatterns(result.suggested_packages);
    if (Object.keys(organized).length) source = "backend";
  } catch {
    /* patterns are optional; the brief's own prose still applies */
  }

  // The in-browser helper can rewrite the same sections in the chosen voice.
  // It wins where it returns copy, and the backend copy fills the rest.
  if (research.notes.length && isAvailable()) {
    try {
      const helper = await helperOrganize(research.notes, sections, brief.tone || "formal");
      if (Object.keys(helper).length) {
        organized = { ...organized, ...helper };
        source = "helper";
      }
    } catch {
      /* the backend copy is enough */
    }
  }
  if (Object.keys(organized).length) enriched.organized = organized;

  await stage("write");
  const written = applyOrganized(applyBrief(blocks, enriched), enriched);

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

  const subject = brief.service || brief.industry || "the work";
  if (intro && !blocks.some((block) => block.type === "image" && block.url)) {
    requests.push({ afterBlockId: intro.id, type: "image", kind: "image", query: subject, section_id: intro.id });
  }

  return requests;
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

    // Only a real asset becomes a visual. A chart drawn from invented bars is
    // worse than no chart: it looks like data when it is decoration.
    const visual: Block | null = url
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
