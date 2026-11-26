import type { Brief } from "./brief";
import { isVisualBlock, isVisualType, type VisualType } from "./visuals";
import type { Block } from "../types";

/**
 * Where a visual belongs, and whether one is justified at all.
 *
 * This module is deliberately free of network and browser APIs: it is the
 * decision layer, and it can be reasoned about (and exercised) on its own.
 * The rules are conservative — a section already holding a visual is left
 * alone, pricing keeps its table, and a chart or diagram without real data is
 * refused rather than drawn for decoration.
 */

export interface SectionRange {
  /** Normalised heading text, used to judge what the section is for. */
  key: string;
  heading: Block;
  blocks: Block[];
  /** The last content block: a visual belongs after it, not above the heading. */
  anchor: Block;
}

export function sectionKey(value: string | undefined): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

export function sectionsOf(blocks: Block[]): SectionRange[] {
  const out: SectionRange[] = [];
  let current: SectionRange | null = null;
  for (const block of blocks) {
    if (block.type === "heading") {
      current = { key: sectionKey(block.text), heading: block, blocks: [], anchor: block };
      out.push(current);
      continue;
    }
    if (!current) {
      current = { key: "", heading: block, blocks: [], anchor: block };
      out.push(current);
    }
    current.blocks.push(block);
    if (!isVisualBlock(block)) current.anchor = block;
  }
  return out;
}

/** A section gets one visual at most, and pricing already has its table. */
const IMAGE_SECTIONS = /intro|about|company|who_we|overview|approach/;
const PRICING_SECTIONS = /pricing|price|package|cost|investment|fee|budget/;
const PROCESS_SECTIONS = /process|method|how_it_works|approach|workflow|delivery/;
export const MAX_VISUALS = 4;

export interface PlannedVisual {
  id: string;
  type: VisualType;
  query: string;
  anchorId: string;
  sectionId: string;
  data?: unknown;
}

function chartDataOf(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  return record.chart ?? (Array.isArray(record.series) ? raw : undefined);
}

function diagramDataOf(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  return record.diagram ?? (Array.isArray(record.steps) ? raw : undefined);
}

/** A chart needs two or more real figures; anything less is decoration. */
export function hasChartData(raw: unknown): boolean {
  const candidate = chartDataOf(raw);
  if (!candidate || typeof candidate !== "object") return false;
  const series = (candidate as { series?: unknown }).series;
  if (!Array.isArray(series) || series.length < 2) return false;
  return series.every((point) => {
    const record = point as Record<string, unknown> | null;
    return Boolean(record) && typeof record?.label === "string" && Number.isFinite(Number(record?.value));
  });
}

export function hasDiagramData(raw: unknown): boolean {
  const candidate = diagramDataOf(raw);
  if (!candidate || typeof candidate !== "object") return false;
  const steps = (candidate as { steps?: unknown }).steps;
  if (!Array.isArray(steps) || steps.length < 2) return false;
  return steps.every((step) => typeof (step as { title?: unknown } | null)?.title === "string");
}

export function sectionHasVisual(blocks: Block[], anchorId: string): boolean {
  const anchor = blocks.findIndex((block) => block.id === anchorId);
  if (anchor < 0) return false;
  let start = anchor;
  while (start >= 0 && blocks[start].type !== "heading") start -= 1;
  for (let index = Math.max(start, 0); index < blocks.length; index += 1) {
    if (index > start && blocks[index].type === "heading") break;
    if (isVisualBlock(blocks[index])) return true;
  }
  return false;
}

/**
 * Chooses the visuals a document actually needs.
 *
 * The helper's suggestions are preferred because it can read the whole
 * document, but they are held to the same rules: an existing visual in the
 * section wins, a chart or diagram without real data is refused, and one
 * subject is never requested twice. Without a helper, a single licensed
 * photograph is requested for the introduction — never a stock image per
 * section, and never a chart invented from a heading.
 */
export function planVisuals(
  blocks: Block[],
  brief: Brief,
  suggestions: Array<Record<string, unknown>>,
): { planned: PlannedVisual[]; notes: string[] } {
  const sections = sectionsOf(blocks);
  const planned: PlannedVisual[] = [];
  const notes: string[] = [];
  const usedSections = new Set<string>();
  const usedQueries = new Set<string>();

  for (const suggestion of suggestions) {
    if (planned.length >= MAX_VISUALS) break;
    const type = String(suggestion?.type ?? suggestion?.kind ?? "");
    if (!isVisualType(type)) {
      notes.push(`${type || "unknown"} is not a supported visual type`);
      continue;
    }
    const afterBlockId = typeof suggestion?.afterBlockId === "string" ? suggestion.afterBlockId : "";
    const section = sections.find(
      (candidate) =>
        candidate.heading.id === afterBlockId || candidate.blocks.some((block) => block.id === afterBlockId),
    );
    if (!section) continue;
    if (usedSections.has(section.heading.id)) continue;
    if (section.blocks.some(isVisualBlock) || sectionHasVisual(blocks, section.anchor.id)) continue;

    const query = String(suggestion?.query ?? "").trim().slice(0, 200);
    if (!query) continue;

    // Never fabricate the content behind a visual.
    if (type === "chart" && !hasChartData(suggestion?.data)) {
      notes.push("a chart was skipped because the document has no figures for it");
      continue;
    }
    if (type === "diagram" && !hasDiagramData(suggestion?.data)) {
      notes.push("a process diagram was skipped because no real steps were supplied");
      continue;
    }
    if (type === "svg" && !suggestion?.data) {
      notes.push("an SVG was skipped because no markup was supplied");
      continue;
    }
    if (PRICING_SECTIONS.test(section.key) && type !== "chart") continue;

    const signature = `${type}:${query.toLowerCase()}`;
    if (usedQueries.has(signature)) continue;
    usedQueries.add(signature);
    usedSections.add(section.heading.id);
    planned.push({
      id: `visual_${planned.length}`,
      type,
      query,
      anchorId: section.anchor.id,
      sectionId: section.heading.id,
      data: suggestion?.data,
    });
  }

  // The fallback is one photograph, and only for a document that has no visual
  // at all. A template's hero image already counts as one.
  if (planned.length === 0 && !blocks.some(isVisualBlock)) {
    const subject = (brief.service || brief.industry || "").trim();
    const target = sections.find(
      (section) =>
        IMAGE_SECTIONS.test(section.key) &&
        !PRICING_SECTIONS.test(section.key) &&
        !PROCESS_SECTIONS.test(section.key) &&
        !section.blocks.some(isVisualBlock),
    );
    if (!subject) {
      notes.push("no visual was requested because the brief names no service or industry to search for");
    } else if (target) {
      planned.push({
        id: "visual_0",
        type: "image",
        query: subject,
        anchorId: target.anchor.id,
        sectionId: target.heading.id,
      });
    }
  }

  return { planned, notes };
}
