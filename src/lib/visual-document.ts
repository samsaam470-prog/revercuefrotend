import type { Block, ChartData, DiagramData } from "../types";
import type { Brief } from "./brief";
import type {
  ChartSpec,
  DiagramSpec,
  ResolvedVisualAsset,
  VisualAssetType,
  VisualRequestPayload,
} from "../types/visuals";

/**
 * Turning resolved assets into typed, editable document blocks.
 *
 * This module is deliberately free of React and network code so the rules can
 * be reasoned about (and exercised) on their own:
 *
 *  - an asset keeps its type: image, icon, chart, diagram, svg;
 *  - a chart is only a chart when it carries real numbers;
 *  - a diagram keeps its steps and its mermaid source;
 *  - placement is section-aware and inserts after an anchor, never over text.
 */

const VISUAL_TYPES: VisualAssetType[] = ["image", "icon", "chart", "diagram", "svg"];
const EXISTING_VISUAL_TYPES = new Set<string>(["image", "icon", "graph", "diagram", "svg"]);

/** Sections where a picture adds nothing a table or clause does not already say. */
const NO_VISUAL_SECTIONS = new Set([
  "pricing",
  "payment_terms",
  "cancellation",
  "revisions",
  "faq",
  "faqs",
  "signature",
  "next_step",
  "questions",
  "embedded_questions",
  "confidentiality",
]);

const IMAGE_SECTIONS = new Set(["introduction", "about", "overview"]);
const ICON_SECTIONS = new Set(["what_is_included", "deliverables", "services", "what_s_included"]);
const DIAGRAM_SECTIONS = new Set(["process", "how_it_works", "methodology", "approach", "timeline"]);

const MAX_REQUESTS = 6;

export function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function sectionKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function text(value: unknown, max = 200): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function readChartSpec(value: unknown): ChartData | null {
  if (!isRecord(value)) return null;
  const labelsRaw = value.labels;
  const valuesRaw = value.values;
  if (!Array.isArray(labelsRaw) || !Array.isArray(valuesRaw)) return null;
  if (labelsRaw.length < 2 || labelsRaw.length > 12 || labelsRaw.length !== valuesRaw.length) return null;
  const labels = labelsRaw.map((label) => text(label, 40));
  const values = valuesRaw.map((entry) => Number(entry));
  if (labels.some((label) => !label) || values.some((entry) => !Number.isFinite(entry))) return null;
  return {
    kind: value.kind === "line" ? "line" : "bar",
    labels,
    values,
    unit: text(value.unit, 12) || undefined,
    title: text(value.title, 120) || undefined,
  };
}

function stepsFromMermaid(mermaid: string): string[] {
  const steps: string[] = [];
  for (const match of mermaid.matchAll(/\["([^"]+)"\]/g)) {
    if (!steps.includes(match[1])) steps.push(match[1]);
  }
  return steps;
}

export function readDiagramSpec(value: unknown): DiagramSpec | null {
  if (!isRecord(value)) return null;
  const rawSteps = Array.isArray(value.steps) ? value.steps : [];
  let steps = rawSteps.map((step) => text(step, 80)).filter(Boolean);
  const mermaid = text(value.mermaid, 4000);
  if (!steps.length && mermaid) steps = stepsFromMermaid(mermaid);
  steps = Array.from(new Set(steps)).slice(0, 8);
  return steps.length >= 2 ? { steps, mermaid: mermaid || undefined } : null;
}

export function sanitiseInlineSvg(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const svg = value.trim();
  if (!/^<svg[\s>]/i.test(svg) || svg.length > 20000) return null;
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

/** Runtime validation: malformed assets are skipped, never trusted. */
export function readVisualAsset(value: unknown): ResolvedVisualAsset | null {
  if (!isRecord(value)) return null;
  const type = String(value.type ?? "").toLowerCase() as VisualAssetType;
  if (!VISUAL_TYPES.includes(type)) return null;
  const asset: ResolvedVisualAsset = {
    id: text(value.id, 160) || `${text(value.afterBlockId, 120) || "document"}#0`,
    type,
    query: text(value.query),
    section_id: text(value.section_id, 120) || undefined,
    afterBlockId: text(value.afterBlockId, 120) || undefined,
    url: isHttpUrl(value.url) ? value.url : undefined,
    alt: text(value.alt, 200) || undefined,
    caption: text(value.caption, 240) || undefined,
    license: typeof value.license === "string" ? value.license : null,
    creator: typeof value.creator === "string" ? value.creator : null,
    source: typeof value.source === "string" ? value.source : null,
    attribution: typeof value.attribution === "string" ? value.attribution : null,
  };
  if (type === "image" && !asset.url) return null;
  if (type === "icon") {
    const icon = text(value.icon, 80);
    if (!/^[a-z0-9-]+:[a-z0-9-]+$/i.test(icon)) return null;
    asset.icon = icon;
  }
  if (type === "chart") {
    const chart = readChartSpec(value.chart);
    if (!chart) return null;
    asset.chart = chart;
  }
  if (type === "diagram") {
    const diagram = readDiagramSpec(value.diagram ?? (isRecord(value) ? value : null));
    if (!diagram) return null;
    asset.diagram = diagram;
  }
  if (type === "svg") {
    const svg = sanitiseInlineSvg(value.svg);
    if (svg) asset.svg = svg;
    else if (!asset.url || !asset.url.toLowerCase().includes(".svg")) return null;
  }
  return asset;
}

/** Reads `items` (new contract) and falls back to the legacy `assets` map. */
export function readVisualAssets(response: unknown): ResolvedVisualAsset[] {
  if (!isRecord(response)) return [];
  const source = Array.isArray(response.items)
    ? response.items
    : isRecord(response.assets)
      ? Object.values(response.assets)
      : [];
  const seen = new Set<string>();
  const assets: ResolvedVisualAsset[] = [];
  for (const entry of source) {
    const asset = readVisualAsset(entry);
    if (!asset) continue;
    const identity = assetIdentity(asset);
    if (seen.has(identity)) continue;
    seen.add(identity);
    assets.push(asset);
  }
  return assets;
}

export function assetIdentity(asset: ResolvedVisualAsset): string {
  return [
    asset.type,
    asset.url ?? "",
    asset.icon ?? "",
    asset.svg ? asset.svg.slice(0, 80) : "",
    asset.chart ? JSON.stringify(asset.chart) : "",
    asset.diagram ? asset.diagram.steps.join("|") : "",
  ].join("::");
}

export interface AssetBlock {
  block: Block;
  asset: ResolvedVisualAsset;
}

/** One asset, one correct block type. */
export function assetToBlock(asset: ResolvedVisualAsset, id: string): Block | null {
  const meta: Record<string, string | number | boolean> = {
    fromPipeline: asset.query || asset.type,
    visual: asset.type,
    pipelineAssetId: asset.id,
  };
  if (asset.license) meta.license = asset.license;
  if (asset.source) meta.source = asset.source;
  if (asset.creator) meta.creator = asset.creator;

  if (asset.type === "image" && asset.url) {
    return {
      id,
      type: "image",
      url: asset.url,
      alt: asset.alt || asset.query,
      caption: asset.attribution || asset.caption || undefined,
      meta,
    };
  }

  if (asset.type === "icon" && asset.icon) {
    return {
      id,
      type: "icon",
      icon: asset.icon,
      alt: asset.alt || asset.query,
      caption: asset.caption,
      meta: { ...meta, icon: asset.icon, size: 44 },
    };
  }

  if (asset.type === "chart" && asset.chart) {
    const chart = asset.chart;
    return {
      id,
      type: "graph",
      text: chart.title || asset.caption || asset.query,
      chart,
      caption: asset.caption !== chart.title ? asset.caption : undefined,
      meta: { ...meta, chartKind: chart.kind },
    };
  }

  if (asset.type === "diagram" && asset.diagram) {
    return {
      id,
      type: "diagram",
      text: asset.caption || asset.query,
      diagram: { steps: asset.diagram.steps, source: asset.diagram.mermaid },
      meta: { ...meta, mermaid: asset.diagram.mermaid ?? "" },
    };
  }

  if (asset.type === "svg" && (asset.svg || asset.url)) {
    return {
      id,
      type: "svg",
      svg: asset.svg,
      url: asset.url,
      alt: asset.alt || asset.query,
      caption: asset.caption,
      meta,
    };
  }

  return null;
}

/* ------------------------------------------------------------------ plan */

interface SectionInfo {
  key: string;
  title: string;
  headingIndex: number;
  endIndex: number;
  hasVisual: boolean;
}

function sectionsOf(blocks: Block[]): SectionInfo[] {
  const sections: SectionInfo[] = [];
  let current: SectionInfo | null = null;
  blocks.forEach((block, index) => {
    if (block.type === "heading") {
      if (current) current.endIndex = index;
      current = {
        key: sectionKey(block.text || ""),
        title: block.text || "",
        headingIndex: index,
        endIndex: blocks.length,
        hasVisual: false,
      };
      sections.push(current);
    } else if (current && EXISTING_VISUAL_TYPES.has(block.type)) {
      current.hasVisual = true;
    } else if (!current && EXISTING_VISUAL_TYPES.has(block.type)) {
      // A hero image before the first heading still counts.
      sections.push({ key: "", title: "", headingIndex: -1, endIndex: index, hasVisual: true });
    }
  });
  return sections;
}

function anchorIn(section: SectionInfo, blocks: Block[]): Block | null {
  if (section.headingIndex < 0) return null;
  for (let index = section.headingIndex + 1; index < section.endIndex; index += 1) {
    const block = blocks[index];
    if (block.type === "paragraph" || block.type === "list" || block.type === "timeline") return block;
  }
  return blocks[section.headingIndex] ?? null;
}

function timelineSteps(blocks: Block[], brief: Brief): string[] {
  for (const block of blocks) {
    if (block.type !== "timeline" || !block.items?.length) continue;
    const steps = block.items.map((item) => text(item.label, 80)).filter(Boolean);
    if (steps.length >= 2) return steps.slice(0, 8);
  }
  const fromBrief = (brief.timeline || "")
    .split(/\n|→|->|;|\|/)
    .map((step) => text(step, 80))
    .filter(Boolean);
  return fromBrief.length >= 2 ? fromBrief.slice(0, 8) : [];
}

/**
 * Deterministic plan first. The on-device helper may add suggestions, but only
 * ones that pass the same relevance and section rules.
 */
export function planVisualRequests(input: {
  blocks: Block[];
  brief: Brief;
  kind: "proposal" | "contract";
}): VisualRequestPayload[] {
  const { blocks, brief, kind } = input;
  const requests: VisualRequestPayload[] = [];
  const sections = sectionsOf(blocks);
  const hasImage = blocks.some((block) => block.type === "image");
  const steps = timelineSteps(blocks, brief);

  for (const section of sections) {
    if (!section.key || section.hasVisual || requests.length >= MAX_REQUESTS) continue;
    const anchor = anchorIn(section, blocks);
    if (!anchor) continue;

    if (kind === "contract") {
      if (DIAGRAM_SECTIONS.has(section.key) && steps.length >= 2) {
        requests.push({
          afterBlockId: anchor.id,
          section_id: anchor.id,
          type: "diagram",
          query: section.title,
          data: { steps },
        });
      }
      continue;
    }

    if (IMAGE_SECTIONS.has(section.key) && !hasImage) {
      const subject = text(brief.service, 120) || text(brief.industry, 120);
      if (subject) {
        requests.push({ afterBlockId: anchor.id, section_id: anchor.id, type: "image", query: subject });
      }
      continue;
    }

    if (ICON_SECTIONS.has(section.key)) {
      const listBlock = blocks
        .slice(section.headingIndex, section.endIndex)
        .find((block) => block.type === "list" && block.items?.length);
      const topic = text(listBlock?.items?.[0]?.label, 80) || text(brief.service, 80);
      if (topic) {
        requests.push({
          afterBlockId: (listBlock ?? anchor).id,
          section_id: anchor.id,
          type: "icon",
          query: topic,
        });
      }
      continue;
    }

    if (DIAGRAM_SECTIONS.has(section.key) && steps.length >= 2) {
      requests.push({
        afterBlockId: anchor.id,
        section_id: anchor.id,
        type: "diagram",
        query: section.title,
        data: { steps },
      });
    }
  }

  return requests.slice(0, MAX_REQUESTS);
}

/** Filters whatever the helper proposed through the same rules. */
export function filterVisualSuggestions(
  suggestions: unknown[],
  input: { blocks: Block[]; kind: "proposal" | "contract"; existing: VisualRequestPayload[] },
): VisualRequestPayload[] {
  const byId = new Map(input.blocks.map((block) => [block.id, block]));
  const sections = sectionsOf(input.blocks);
  const sectionOfBlock = (id: string): SectionInfo | null => {
    const index = input.blocks.findIndex((block) => block.id === id);
    if (index < 0) return null;
    return sections.find((section) => index >= section.headingIndex && index < section.endIndex) ?? null;
  };

  const accepted: VisualRequestPayload[] = [];
  const usedSections = new Set(input.existing.map((request) => sectionOfBlock(request.afterBlockId)?.title ?? ""));

  for (const raw of suggestions) {
    if (accepted.length >= 2) break;
    if (!isRecord(raw)) continue;
    const type = String(raw.type ?? raw.kind ?? "").toLowerCase() as VisualAssetType;
    if (!["image", "icon", "diagram"].includes(type)) continue;
    if (type === "diagram") continue; // A diagram needs real steps a model does not have.
    const afterBlockId = text(raw.afterBlockId ?? raw.section_id, 120);
    const block = byId.get(afterBlockId);
    if (!block) continue;
    const section = sectionOfBlock(afterBlockId);
    if (!section || !section.key || section.hasVisual) continue;
    if (NO_VISUAL_SECTIONS.has(section.key)) continue;
    if (usedSections.has(section.title)) continue;
    if (input.kind === "contract") continue;
    const query = text(raw.query, 120);
    if (query.length < 3) continue;
    accepted.push({ afterBlockId, section_id: afterBlockId, type, query });
    usedSections.add(section.title);
  }
  return accepted;
}

/* -------------------------------------------------------------- placement */

export interface InsertionResult {
  blocks: Block[];
  inserted: number;
  skipped: number;
}

/**
 * Inserts each typed visual after a suitable anchor in its own section.
 *
 * Rules: never overwrite a block; one generated visual per section; skip a
 * section the author already illustrated; never insert the same asset twice.
 */
export function insertVisuals(
  blocks: Block[],
  assets: ResolvedVisualAsset[],
  options: { stamp?: string } = {},
): InsertionResult {
  if (!assets.length) return { blocks, inserted: 0, skipped: 0 };
  const stamp = options.stamp ?? Date.now().toString(36);
  const next = [...blocks];
  const usedSections = new Set<string>();
  const usedIdentities = new Set<string>();
  let inserted = 0;
  let skipped = 0;

  assets.forEach((asset, index) => {
    const identity = assetIdentity(asset);
    if (usedIdentities.has(identity)) {
      skipped += 1;
      return;
    }

    const section = sectionsOf(next).find((entry) => {
      const anchorIndex = next.findIndex((block) => block.id === (asset.afterBlockId ?? asset.section_id));
      return anchorIndex >= entry.headingIndex && anchorIndex < entry.endIndex;
    });
    const anchorId = asset.afterBlockId || asset.section_id;
    const anchorIndex = anchorId ? next.findIndex((block) => block.id === anchorId) : -1;
    if (anchorIndex < 0) {
      skipped += 1;
      return;
    }

    const key = section?.key ?? "";
    if (section?.hasVisual || usedSections.has(key)) {
      skipped += 1;
      return;
    }
    if (NO_VISUAL_SECTIONS.has(key)) {
      skipped += 1;
      return;
    }

    const block = assetToBlock(asset, `vis_${stamp}_${index}`);
    if (!block) {
      skipped += 1;
      return;
    }

    // Insert after the anchor block, but never before the section heading.
    const at = Math.max(anchorIndex, section?.headingIndex ?? anchorIndex);
    next.splice(at + 1, 0, block);
    usedSections.add(key);
    usedIdentities.add(identity);
    inserted += 1;
  });

  return { blocks: next, inserted, skipped };
}

export function pipelineVisualCount(blocks: Block[]): number {
  return blocks.filter((block) => Boolean(block.meta?.fromPipeline) && EXISTING_VISUAL_TYPES.has(block.type)).length;
}
