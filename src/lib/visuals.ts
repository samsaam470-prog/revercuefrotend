import { z } from "zod";
import type { Block, ChartSpec, DiagramSpec, IconSpec } from "../types";

/**
 * The visual contract shared with the backend.
 *
 * A visual is not "a URL that happens to exist". Each asset arrives with its
 * type, its structure (chart data, diagram steps, SVG markup, icon id) and its
 * provenance, and is converted into the block type that can render and edit it.
 * Anything that does not validate is refused rather than guessed at.
 */

export const VISUAL_TYPES = ["image", "icon", "chart", "diagram", "svg"] as const;
export type VisualType = (typeof VISUAL_TYPES)[number];

const chartPointSchema = z.object({
  label: z.string().trim().min(1).max(80),
  value: z.number().finite(),
});

export const chartSpecSchema = z.object({
  kind: z.enum(["bar", "line"]).optional(),
  title: z.string().trim().max(120).optional(),
  unit: z.string().trim().max(24).optional(),
  source: z.string().trim().max(200).optional(),
  series: z.array(chartPointSchema).min(2).max(24),
});

export const diagramSpecSchema = z.object({
  title: z.string().trim().max(120).optional(),
  source: z.string().trim().max(200).optional(),
  steps: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(120),
        detail: z.string().trim().max(240).optional(),
      }),
    )
    .min(2)
    .max(12),
  mermaid: z.string().max(4000).optional(),
});

export const iconSpecSchema = z.object({
  name: z.string().trim().min(1).max(120),
  svg: z.string().max(20000).optional(),
  label: z.string().trim().max(120).optional(),
  color: z.string().trim().max(20).optional(),
});

export const visualAssetSchema = z.object({
  id: z.string().max(120).optional(),
  type: z.enum(VISUAL_TYPES),
  query: z.string().max(200).optional(),
  afterBlockId: z.string().max(120).optional(),
  section_id: z.string().max(120).optional(),
  /** Photos. */
  url: z.string().max(2048).optional(),
  /** Icons: the Iconify identifier. */
  icon: z.string().max(120).optional(),
  /** Icons and graphics: their own markup. */
  svg: z.string().max(20000).optional(),
  mermaid: z.string().max(4000).optional(),
  chart: chartSpecSchema.optional(),
  diagram: diagramSpecSchema.optional(),
  license: z.string().max(120).nullable().optional(),
  creator: z.string().max(200).nullable().optional(),
  source: z.string().max(200).nullable().optional(),
  attribution: z.string().max(300).nullable().optional(),
});

export type VisualAsset = z.infer<typeof visualAssetSchema>;

export function parseVisualAsset(raw: unknown): VisualAsset | null {
  const parsed = visualAssetSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

/** Confirms the markup is a standalone SVG and removes executable content. */
export function sanitiseSvg(markup: string | undefined): string | undefined {
  const source = String(markup ?? "").trim();
  if (!source || source.length > 20000) return undefined;
  if (!/^<svg[\s>]/i.test(source)) return undefined;
  if (!/<\/svg>\s*$/i.test(source)) return undefined;
  const cleaned = source
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|xlink:href)\s*=\s*("|')javascript:[^"']*\2/gi, "")
    .replace(/(href|xlink:href)\s*=\s*("|')https?:\/\/[^"']*\2/gi, "");
  return cleaned.length > 10 ? cleaned : undefined;
}

export const VISUAL_BLOCK_TYPES: VisualType[] = ["image", "icon", "chart", "diagram", "svg"];

export function isVisualType(type: string): type is VisualType {
  return (VISUAL_TYPES as readonly string[]).includes(type);
}

export function isVisualBlock(block: Block): boolean {
  return isVisualType(block.type);
}

/** The text a visual contributes to the document body. */
export function visualText(block: Block): string {
  if (block.type === "chart") return block.chart?.title ?? "";
  if (block.type === "diagram") return block.diagram?.title ?? "";
  if (block.type === "icon") return block.icon?.label ?? block.icon?.name ?? "";
  return block.alt ?? block.caption ?? "";
}

/** The stable identity of an asset, used to keep one image out of two sections. */
export function visualIdentity(asset: VisualAsset): string {
  if (asset.type === "image") return `image:${asset.url ?? ""}`;
  if (asset.type === "icon") return `icon:${asset.icon ?? asset.svg ?? ""}`;
  if (asset.type === "svg") return `svg:${(asset.svg ?? "").length}:${(asset.svg ?? "").slice(0, 64)}`;
  if (asset.type === "chart") return `chart:${JSON.stringify(asset.chart?.series ?? [])}`;
  if (asset.type === "diagram") return `diagram:${JSON.stringify(asset.diagram?.steps ?? [])}`;
  return `${asset.type}:${asset.query ?? ""}`;
}

function isFetchableUrl(value: string | undefined): value is string {
  if (!value) return false;
  return /^(https:\/\/|\/|data:image\/)/i.test(value);
}

export interface VisualBlockContext {
  id: string;
  /** The query the visual was planned from; it becomes the alt text. */
  query: string;
  /** Extra layout carried over when an asset replaces an existing visual. */
  meta?: Block["meta"];
}

/**
 * Converts a validated asset into the block type that matches it. Returns null
 * when the asset cannot be represented honestly (no URL, no data, no steps),
 * so the caller can report a skip instead of inserting an empty frame.
 */
export function visualBlockFromAsset(asset: VisualAsset, context: VisualBlockContext): Block | null {
  const meta: NonNullable<Block["meta"]> = {
    ...(context.meta ?? {}),
    visual: asset.type,
    fromPipeline: context.query,
  };
  if (asset.license) meta.license = asset.license;
  if (asset.source) meta.source = asset.source;
  if (asset.creator) meta.creator = asset.creator;

  const provenance = {
    ...(asset.attribution ? { attribution: asset.attribution } : {}),
    ...(asset.source ? { source: asset.source } : {}),
  };

  if (asset.type === "image") {
    if (!isFetchableUrl(asset.url)) return null;
    return {
      id: context.id,
      type: "image",
      url: asset.url,
      alt: context.query,
      caption: asset.attribution ?? undefined,
      meta,
      ...provenance,
    };
  }

  if (asset.type === "icon") {
    const name = asset.icon ?? "";
    const svg = sanitiseSvg(asset.svg);
    if (!name && !svg) return null;
    const icon: IconSpec = { name: name || "custom", svg, label: context.query };
    return {
      id: context.id,
      type: "icon",
      icon,
      alt: context.query,
      meta,
      ...provenance,
    };
  }

  if (asset.type === "chart") {
    const chart = asset.chart;
    if (!chart || chart.series.length < 2) return null;
    const spec: ChartSpec = {
      kind: chart.kind ?? "bar",
      title: chart.title,
      unit: chart.unit,
      source: chart.source ?? asset.source ?? undefined,
      series: chart.series,
    };
    return {
      id: context.id,
      type: "chart",
      chart: spec,
      caption: spec.title ?? context.query,
      alt: [spec.title ?? context.query, spec.source ? `Source: ${spec.source}` : ""].filter(Boolean).join(". "),
      meta,
      ...provenance,
    };
  }

  if (asset.type === "diagram") {
    const diagram = asset.diagram;
    if (!diagram || diagram.steps.length < 2) return null;
    const spec: DiagramSpec = {
      title: diagram.title,
      source: diagram.source ?? asset.source ?? undefined,
      steps: diagram.steps,
      mermaid: asset.mermaid ?? diagram.mermaid,
    };
    return {
      id: context.id,
      type: "diagram",
      diagram: spec,
      caption: spec.title ?? context.query,
      alt: spec.steps.map((step) => step.title).join(" → "),
      meta,
      ...provenance,
    };
  }

  const svg = sanitiseSvg(asset.svg);
  if (!svg) return null;
  return {
    id: context.id,
    type: "svg",
    svg,
    alt: context.query,
    meta,
    ...provenance,
  };
}

/**
 * Replaces the contents of an existing visual block with another asset of the
 * same kind, keeping its id, position and layout. Returns null when the asset
 * is not compatible, so the editor never swaps a chart for a photo silently.
 */
export function replaceVisualContent(block: Block, asset: VisualAsset): Block | null {
  if (block.type !== asset.type) return null;
  const rebuilt = visualBlockFromAsset(asset, {
    id: block.id,
    query: block.alt || block.meta?.fromPipeline?.toString() || asset.query || "Visual",
    meta: block.meta,
  });
  if (!rebuilt) return null;
  return { ...rebuilt, id: block.id };
}
