import { pipelineApi, type ExtractNote } from "../api/proposals";
import {
  applyBrief,
  applyOrganized,
  type Brief,
  type BriefPackage,
  type ResearchFacts,
} from "./brief";
import { isAvailable, organize as helperOrganize, visualize } from "./webllm";
import { parseVisualAsset, visualBlockFromAsset, visualIdentity } from "./visuals";
import { planVisuals, sectionHasVisual } from "./visualPlan";
import type { Block } from "../types";

export interface ResearchNote {
  title: string;
  body: string;
  source?: string;
  kind?: "client" | "web" | "background";
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
export type DraftStage = "context" | "research" | "structure" | "writing" | "visuals" | "checks";
export type DraftStageStatus = "pending" | "running" | "done" | "skipped";
export const DRAFT_STAGES: DraftStage[] = ["context", "research", "structure", "writing", "visuals", "checks"];

export interface DraftPipelineInput {
  id: string;
  blocks: Block[];
  brief: Brief;
  kind: "proposal" | "contract";
  withVisuals?: boolean;
  onStage?: (stage: DraftStage, status: DraftStageStatus, detail?: string) => Promise<void> | void;
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
    const rawPrice = record.price;
    const price = rawPrice === undefined || rawPrice === null || rawPrice === "" ? undefined : Number(rawPrice);
    packages.push({
      name,
      price: price !== undefined && Number.isFinite(price) ? price : undefined,
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
    client_website: brief.clientWebsite,
    user_website: brief.businessWebsite,
    business_name: brief.businessName,
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
    author_business_name?: string;
    author_description?: string;
    author_website?: string;
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
      author_business_name: data.author_business_name ?? undefined,
      author_description: data.author_description ?? undefined,
      author_website: data.author_website ?? undefined,
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
  const stage = async (name: DraftStage, status: DraftStageStatus, detail?: string) => {
    if (onStage) await onStage(name, status, detail);
  };

  await stage("context", "running", "Using the brief and selected template.");
  const enriched: Brief = { ...brief };
  await stage("context", "done", "Brief and template loaded.");

  await stage("research", "running", "Checking client, industry, and business-profile sources.");
  let research = await waitForResearch(id, researchTimeoutMs);

  // When the brief form's research has not arrived (slow network, a reopened
  // draft), the draft asks the extract route itself instead of writing blind.
  if (!research.notes.length && !research.images.length) {
    try {
      research = await extractResearch(brief);
      saveResearch(id, research);
    } catch {
      research = { notes: [], images: [] };
    }
  }

  const hasResearch = research.notes.length > 0 || research.images.length > 0 || Boolean(research.facts?.value_prop || research.facts?.author_business_name || research.facts?.author_description);
  const clientNoteCount = research.notes.filter((note) => note.kind === "client").length;
  const backgroundNoteCount = research.notes.filter((note) => note.kind === "background" || note.kind === "web").length;
  enriched.heroImage = enriched.heroImage || research.images[0];
  enriched.research = research.notes;
  enriched.facts = research.facts;
  enriched.businessName = enriched.businessName || research.facts?.author_business_name;
  enriched.businessWebsite = enriched.businessWebsite || research.facts?.author_website;
  await stage("research", hasResearch ? "done" : "skipped", hasResearch
    ? `Found ${clientNoteCount} client-source notes, ${backgroundNoteCount} background notes, and ${research.images.length} image candidates.`
    : "No usable public research was found; the draft will use only the supplied brief.");

  await stage("structure", "running", "Organising sections for this document type.");
  const sections = brief.sections.length
    ? brief.sections
    : ["Introduction", "Scope", "What is included", "Timeline", "Pricing", "Next Step"];
  enriched.sections = sections;
  await stage("structure", "done", `${sections.length} editable sections prepared.`);

  await stage("writing", "running", "Building section copy from the brief and verified context.");
  let source: DraftPipelineResult["source"] = "pattern";
  let organized: Record<string, string> = {};
  let organizeWarnings: string[] = [];

  // Layer 2 on the server: patterns, learned structure, and research-grounded
  // section copy. This is the copy the document actually uses.
  try {
    const response = await pipelineApi.organize({
      client_name: brief.clientName,
      business_name: brief.businessName || research.facts?.author_business_name,
      business_website: brief.businessWebsite || research.facts?.author_website,
      business_description: research.facts?.author_description,
      industry: brief.industry,
      service: brief.service,
      tone: brief.tone || "formal",
      sections,
      research: { notes: research.notes, facts: research.facts },
      document: { blocks },
      brief: {
        problem: brief.problem || undefined,
        target_audience: brief.targetAudience || undefined,
        timeline: brief.timeline || undefined,
        cta: brief.cta || undefined,
        scope: brief.scope || undefined,
        packages: brief.packages.length ? brief.packages : undefined,
      },
    });
    organized = response.sections ?? {};
    organizeWarnings = response.provenance?.warnings ?? [];
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

  const written = applyOrganized(applyBrief(blocks, enriched), enriched);
  const writingDetail = source === "helper"
    ? "Draft copy organised from your brief and available research."
    : source === "backend"
      ? "Draft copy organised with backend patterns and supplied facts."
      : "Draft copy assembled locally with deterministic patterns.";
  await stage("writing", "done", organizeWarnings.length ? `${writingDetail} ${organizeWarnings.join(" ")}` : writingDetail);

  await stage("visuals", "running", "Choosing visuals that match each section; charts and diagrams need real data.");
  let visualBlocks = written;
  let visualCount = 0;
  let visualDetail = "Contracts are a legal record, so no visuals are inserted into them.";
  if (withVisuals) {
    const placed = await placeVisuals(id, written, enriched);
    visualBlocks = placed.blocks;
    visualCount = placed.inserted;
    visualDetail = placed.detail;
  }
  // The stage only claims success when an editable visual block actually landed.
  await stage("visuals", visualCount > 0 ? "done" : "skipped", visualDetail);

  await stage("checks", "running", "Checking editable blocks and preserving missing facts as prompts.");
  const finalBlocks = visualBlocks.length ? visualBlocks : written;
  const validBlocks = finalBlocks.filter((block) => Boolean(block.id && block.type));
  await stage("checks", validBlocks.length === finalBlocks.length && finalBlocks.length > 0 ? "done" : "skipped",
    `${validBlocks.length} editable blocks checked. Review missing client-specific details before sharing.`);

  return {
    blocks: finalBlocks.map((block) => ({ ...block, meta: { ...block.meta, pipelineId: id } })),
    source,
    notes: research.notes.length,
    visuals: visualCount,
    brief: enriched,
  };
}

export interface PlacedVisuals {
  blocks: Block[];
  inserted: number;
  skipped: number;
  detail: string;
}

/**
 * Asks the backend for the planned visuals, then inserts each one after the
 * content of its own section. A failed request leaves the document untouched,
 * and nothing is inserted twice.
 */
async function placeVisuals(id: string, blocks: Block[], brief: Brief): Promise<PlacedVisuals> {
  let suggestions: Array<Record<string, unknown>> = [];
  if (isAvailable()) {
    try {
      const raw = await visualize({ blocks }, brief.sections);
      suggestions = Array.isArray(raw) ? (raw as Array<Record<string, unknown>>) : [];
    } catch {
      // The helper is optional: the deterministic plan below still applies.
    }
  }

  const { planned, notes } = planVisuals(blocks, brief, suggestions);
  if (planned.length === 0) {
    return { blocks, inserted: 0, skipped: 0, detail: notes[0] ?? "No section needed a visual." };
  }

  let assets: Record<string, unknown> = {};
  const rejectionNotes: string[] = [];
  try {
    const response = await pipelineApi.visuals({
      document: { blocks },
      requests: planned.map((plan) => ({
        id: plan.id,
        afterBlockId: plan.anchorId,
        section_id: plan.sectionId,
        type: plan.type,
        kind: plan.type,
        query: plan.query,
        data: plan.data,
      })),
    });
    assets = response.assets ?? {};
    for (const rejected of response.rejected ?? []) {
      if (rejected && typeof rejected.reason === "string") rejectionNotes.push(rejected.reason.replace(/_/g, " "));
    }
  } catch {
    return {
      blocks,
      inserted: 0,
      skipped: planned.length,
      detail: "The visual service could not be reached; the document was left unchanged.",
    };
  }

  const stamp = Date.now().toString(36);
  const next = [...blocks];
  const usedIdentities = new Set<string>();
  let inserted = 0;
  let skipped = 0;

  planned.forEach((plan, index) => {
    // The asset is keyed by request id; the block ids are accepted too so an
    // older backend that keys by section still resolves correctly.
    const raw = assets[plan.id] ?? assets[plan.anchorId] ?? assets[plan.sectionId];
    const asset = parseVisualAsset(raw);
    if (!asset) {
      skipped += 1;
      return;
    }
    const identity = visualIdentity(asset);
    if (usedIdentities.has(identity)) {
      skipped += 1;
      return;
    }
    if (sectionHasVisual(next, plan.anchorId)) {
      skipped += 1;
      return;
    }
    const at = next.findIndex((block) => block.id === plan.anchorId);
    if (at < 0) {
      skipped += 1;
      return;
    }
    const block = visualBlockFromAsset(asset, { id: `${stamp}_v${index}`, query: plan.query });
    if (!block) {
      skipped += 1;
      return;
    }
    usedIdentities.add(identity);
    next.splice(at + 1, 0, block);
    inserted += 1;
  });

  const detail =
    inserted > 0
      ? `${inserted} visual${inserted === 1 ? "" : "s"} added${
          skipped > 0 ? `; ${skipped} request${skipped === 1 ? "" : "s"} had no usable asset and were left out` : ""
        }.`
      : `No usable visual came back, so the document stays text-first${
          rejectionNotes.length ? ` (${rejectionNotes[0]})` : ""
        }.`;

  return { blocks: next.map((block) => ({ ...block, meta: { ...block.meta, pipelineId: id } })), inserted, skipped, detail };
}
