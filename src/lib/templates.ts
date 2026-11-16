import type { Block } from "../types";

export interface BuiltInTemplate {
  id: string;
  name: string;
  description: string;
  suggested?: boolean;
  type: "proposal" | "contract";
  blocks: Block[];
}

export type TemplateType = "proposal" | "contract";

/**
 * Templates carry placeholders, not content. A placeholder block holds the key
 * the pipeline fills (the key lives in `meta.placeholder`), and the text stays a
 * visible {{key}} until the first draft organizes the research into it. A block
 * the pipeline cannot fill keeps its placeholder so the author can write it.
 */
const para = (id: string, key: string, text: string): Block => ({
  id,
  type: "paragraph",
  text,
  meta: { placeholder: key },
});

const heading = (id: string, text: string): Block => ({ id, type: "heading", level: "h2", text });

const PROPOSAL_THREAD: BuiltInTemplate = {
  id: "builtin-thread",
  name: "The thread",
  description: "The full proposal: a hero visual, scope, deliverables, timeline, packages and a close.",
  suggested: true,
  type: "proposal",
  blocks: [
    { id: "tpl-hero", type: "image", alt: "{{hero_image}}", meta: { placeholder: "hero_image", visual: "image" } },
    heading("tpl-h1", "Introduction"),
    para("tpl-intro", "introduction", "{{introduction}}"),
    heading("tpl-h2", "Scope"),
    para("tpl-scope", "scope", "{{scope}}"),
    heading("tpl-h3", "What is included"),
    { id: "tpl-list", type: "list", items: [{ label: "{{deliverable_1}}" }, { label: "{{deliverable_2}}" }, { label: "{{deliverable_3}}" }] },
    heading("tpl-h4", "Timeline"),
    para("tpl-time", "timeline", "{{timeline}}"),
    heading("tpl-h5", "Pricing"),
    { id: "tpl-packages", type: "packages", items: [{ label: "{{package_1}}", price: 0 }, { label: "{{package_2}}", price: 0 }, { label: "{{package_3}}", price: 0 }] },
    { id: "tpl-next", type: "next_step", text: "{{next_step}}" },
  ],
};

const PROPOSAL_LETTER: BuiltInTemplate = {
  id: "builtin-letter",
  name: "The short letter",
  description: "Two screens: the problem, the scope, one price and the close. For a client who already said yes.",
  type: "proposal",
  blocks: [
    heading("tpl-l1", "Introduction"),
    para("tpl-l-intro", "introduction", "{{introduction}}"),
    heading("tpl-l2", "Scope"),
    para("tpl-l-scope", "scope", "{{scope}}"),
    { id: "tpl-l-table", type: "pricing_table", items: [{ label: "{{line_item_1}}", price: 0, quantity: 1 }, { label: "{{line_item_2}}", price: 0, quantity: 1 }] },
    { id: "tpl-l-next", type: "next_step", text: "{{next_step}}" },
  ],
};

const CONTRACT_STANDARD: BuiltInTemplate = {
  id: "builtin-agreement",
  name: "The standard agreement",
  description: "Parties, scope, payment, timeline, revisions, cancellation and the two signature lines.",
  suggested: true,
  type: "contract",
  blocks: [
    heading("tpl-c1", "Parties"),
    para("tpl-c-parties", "parties", "{{parties}}"),
    heading("tpl-c2", "Scope"),
    para("tpl-c-scope", "scope", "{{scope}}"),
    heading("tpl-c3", "Payment"),
    para("tpl-c-pay", "payment_terms", "{{payment_terms}}"),
    heading("tpl-c4", "Timeline"),
    para("tpl-c-time", "timeline", "{{timeline}}"),
    heading("tpl-c5", "Revisions"),
    para("tpl-c-rev", "revisions", "{{revisions}}"),
    heading("tpl-c6", "Cancellation"),
    para("tpl-c-cancel", "cancellation", "{{cancellation}}"),
    { id: "tpl-c-sign", type: "signature" },
  ],
};

const CONTRACT_SHORT: BuiltInTemplate = {
  id: "builtin-engagement",
  name: "The engagement letter",
  description: "A one-page letter: scope, fee, revisions and the signatures. For small, well-understood work.",
  type: "contract",
  blocks: [
    heading("tpl-e1", "Scope"),
    para("tpl-e-scope", "scope", "{{scope}}"),
    heading("tpl-e2", "Fee"),
    para("tpl-e-pay", "payment_terms", "{{payment_terms}}"),
    heading("tpl-e3", "Revisions"),
    para("tpl-e-rev", "revisions", "{{revisions}}"),
    { id: "tpl-e-sign", type: "signature" },
  ],
};

export const BUILT_IN_TEMPLATES: Record<TemplateType, BuiltInTemplate[]> = {
  proposal: [PROPOSAL_THREAD, PROPOSAL_LETTER],
  contract: [CONTRACT_STANDARD, CONTRACT_SHORT],
};

export function isBuiltIn(id: string): boolean {
  return id.startsWith("builtin-");
}

export function templateById(type: TemplateType, id: string): BuiltInTemplate | undefined {
  return BUILT_IN_TEMPLATES[type].find((template) => template.id === id);
}

/** A copy with fresh block ids, so two documents never share block identity. */
export function blocksForTemplate(template: BuiltInTemplate): Block[] {
  const stamp = Date.now().toString(36);
  return template.blocks.map((block, index) => ({
    ...block,
    id: `${stamp}_${index}`,
    items: block.items?.map((item) => ({ ...item })),
    columns: block.columns?.map((column) => [...column]),
    meta: block.meta ? { ...block.meta } : undefined,
  }));
}
