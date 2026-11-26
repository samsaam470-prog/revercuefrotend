import type { Block } from "../../types";
import { buildBlocks, previewDocument } from "./blueprint";
import { CONTRACT_CATEGORIES, PROPOSAL_CATEGORIES } from "./factory";
import { BUSINESS_PROPOSALS } from "./proposals-a";
import {
  FREELANCE_PROPOSALS,
  OPERATIONS_PROPOSALS,
  SPECIALIST_PROPOSALS,
  TECHNOLOGY_PROPOSALS,
} from "./proposals-b";
import {
  COMMERCIAL_CONTRACTS,
  EMPLOYMENT_CONTRACTS,
  TECHNOLOGY_CONTRACTS,
} from "./contracts-b";
import { GENERAL_CONTRACTS, PROFESSIONAL_CONTRACTS } from "./contracts-a";
import type {
  BuiltInTemplate,
  DocumentTemplate,
  LibraryTemplate,
  TemplateComplexity,
  TemplateType,
} from "./types";

export * from "./types";
export { DESIGN_FAMILIES, previewDocument, SECTION_SAMPLES } from "./blueprint";
export type { PreviewBlock, PreviewKind } from "./blueprint";

const PROPOSALS: DocumentTemplate[] = [
  ...BUSINESS_PROPOSALS,
  ...TECHNOLOGY_PROPOSALS,
  ...FREELANCE_PROPOSALS,
  ...OPERATIONS_PROPOSALS,
  ...SPECIALIST_PROPOSALS,
];

const CONTRACTS: DocumentTemplate[] = [
  ...GENERAL_CONTRACTS,
  ...PROFESSIONAL_CONTRACTS,
  ...TECHNOLOGY_CONTRACTS,
  ...EMPLOYMENT_CONTRACTS,
  ...COMMERCIAL_CONTRACTS,
];

function withBlocks(templates: DocumentTemplate[]): LibraryTemplate[] {
  return templates.map((template) => ({ ...template, blocks: buildBlocks(template) }));
}

/** The source of truth for both libraries. */
export const TEMPLATE_LIBRARY: Record<TemplateType, LibraryTemplate[]> = {
  proposal: withBlocks(PROPOSALS),
  contract: withBlocks(CONTRACTS),
};

export const PROPOSAL_TEMPLATES = TEMPLATE_LIBRARY.proposal;
export const CONTRACT_TEMPLATES = TEMPLATE_LIBRARY.contract;

/** The shape the builder pages and the pipeline already consume. */
export const BUILT_IN_TEMPLATES: Record<TemplateType, BuiltInTemplate[]> = {
  proposal: PROPOSAL_TEMPLATES.map(({ blocks, ...template }) => ({
    id: template.id,
    name: template.name,
    description: template.description,
    suggested: template.suggested,
    type: "proposal",
    blocks,
  })),
  contract: CONTRACT_TEMPLATES.map(({ blocks, ...template }) => ({
    id: template.id,
    name: template.name,
    description: template.description,
    suggested: template.suggested,
    type: "contract",
    blocks,
  })),
};

export function isBuiltIn(id: string): boolean {
  return id.startsWith("builtin-");
}

export function templateById(type: TemplateType, id: string): LibraryTemplate | undefined {
  return TEMPLATE_LIBRARY[type].find((template) => template.id === id);
}

/** A copy with fresh block ids, so two documents never share block identity. */
export function blocksForTemplate(template: { blocks: Block[] }): Block[] {
  const stamp = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  return template.blocks.map((block, index) => ({
    ...block,
    id: `${stamp}_${index}`,
    items: block.items?.map((item) => ({ ...item })),
    columns: block.columns?.map((column) => [...column]),
    meta: block.meta ? { ...block.meta } : undefined,
  }));
}

export const TEMPLATE_CATEGORIES: Record<TemplateType, readonly string[]> = {
  proposal: PROPOSAL_CATEGORIES,
  contract: CONTRACT_CATEGORIES,
};

export const TEMPLATE_COMPLEXITIES: TemplateComplexity[] = ["simple", "standard", "detailed"];

export interface TemplateFilter {
  query?: string;
  category?: string;
  industry?: string;
  complexity?: TemplateComplexity | "";
}

/** Every industry present in a library, alphabetically. */
export function industriesFor(type: TemplateType): string[] {
  return [...new Set(TEMPLATE_LIBRARY[type].map((template) => template.industry))].sort((a, b) =>
    a.localeCompare(b),
  );
}

function score(template: LibraryTemplate, query: string): number {
  const needle = query.trim().toLowerCase();
  if (!needle) return 0;
  const terms = needle.split(/\s+/).filter(Boolean);
  const fields: { value: string; weight: number }[] = [
    { value: template.name, weight: 6 },
    { value: template.description, weight: 3 },
    { value: template.audience, weight: 2 },
    { value: template.useCase, weight: 2 },
    { value: template.category, weight: 2 },
    { value: template.industry, weight: 2 },
    { value: template.longDescription, weight: 1 },
    { value: template.businessTypes.join(" "), weight: 1 },
    { value: template.tags.join(" "), weight: 2 },
  ];
  let total = 0;
  for (const term of terms) {
    let best = 0;
    for (const field of fields) {
      const haystack = field.value.toLowerCase();
      if (!haystack.includes(term)) continue;
      const weight = haystack.startsWith(term) ? field.weight + 2 : field.weight;
      if (weight > best) best = weight;
    }
    if (best === 0) return 0;
    total += best;
  }
  return total;
}

/**
 * Filters a library by category, industry and complexity, then ranks the
 * remaining templates for a free-text query across name, industry, use case,
 * audience and tags.
 */
export function searchTemplates(type: TemplateType, filter: TemplateFilter = {}): LibraryTemplate[] {
  const { query = "", category, industry, complexity } = filter;
  const trimmed = query.trim();

  return TEMPLATE_LIBRARY[type]
    .filter((template) => {
      if (category && template.category !== category) return false;
      if (industry && template.industry !== industry) return false;
      if (complexity && template.complexity !== complexity) return false;
      if (trimmed && score(template, trimmed) === 0) return false;
      return true;
    })
    .sort((a, b) => {
      if (trimmed) {
        const difference = score(b, trimmed) - score(a, trimmed);
        if (difference !== 0) return difference;
      }
      if (Boolean(a.suggested) !== Boolean(b.suggested)) return a.suggested ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

/** The structure preview for a template, used by the cards and the modal. */
export function templatePreview(template: DocumentTemplate) {
  return previewDocument(template);
}
