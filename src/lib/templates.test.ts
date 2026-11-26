import { describe, expect, it } from "vitest";
import type { BlockType } from "../types";
import { applyBrief, applyOrganized, normaliseKey, type Brief } from "./brief";
import {
  BUILT_IN_TEMPLATES,
  CONTRACT_TEMPLATES,
  DESIGN_FAMILIES,
  PROPOSAL_TEMPLATES,
  SECTION_SAMPLES,
  TEMPLATE_CATEGORIES,
  TEMPLATE_LIBRARY,
  blocksForTemplate,
  industriesFor,
  isBuiltIn,
  previewDocument,
  searchTemplates,
  templateById,
} from "./templates";
import type { LibraryTemplate } from "./templates";

const SUPPORTED_BLOCKS: BlockType[] = [
  "heading",
  "paragraph",
  "quote",
  "list",
  "image",
  "icon",
  "graph",
  "diagram",
  "svg",
  "pricing_table",
  "packages",
  "timeline",
  "faq",
  "question",
  "file_upload",
  "button",
  "divider",
  "spacer",
  "two_column",
  "three_column",
  "card",
  "signature",
  "next_step",
];

const ALL: LibraryTemplate[] = [...PROPOSAL_TEMPLATES, ...CONTRACT_TEMPLATES];

describe("template library", () => {
  it("contains at least 30 genuinely separate templates in each library", () => {
    expect(PROPOSAL_TEMPLATES.length).toBeGreaterThanOrEqual(30);
    expect(CONTRACT_TEMPLATES.length).toBeGreaterThanOrEqual(30);
    expect(new Set(PROPOSAL_TEMPLATES.map((template) => template.id)).size).toBe(
      PROPOSAL_TEMPLATES.length,
    );
    expect(new Set(CONTRACT_TEMPLATES.map((template) => template.id)).size).toBe(
      CONTRACT_TEMPLATES.length,
    );
  });

  it("keeps each library in its own categories", () => {
    const proposalCategories = new Set(PROPOSAL_TEMPLATES.map((template) => template.category));
    const contractCategories = new Set(CONTRACT_TEMPLATES.map((template) => template.category));
    expect([...proposalCategories].sort()).toEqual([...TEMPLATE_CATEGORIES.proposal].sort());
    expect([...contractCategories].sort()).toEqual([...TEMPLATE_CATEGORIES.contract].sort());
    expect([...proposalCategories].some((category) => contractCategories.has(category))).toBe(false);
  });

  it("gives every template complete, meaningful metadata", () => {
    for (const template of ALL) {
      expect(template.id.startsWith("builtin-"), template.id).toBe(true);
      expect(template.name.length, template.id).toBeGreaterThan(8);
      expect(template.description.length, template.id).toBeGreaterThan(40);
      expect(template.longDescription.length, template.id).toBeGreaterThan(80);
      expect(template.audience.length, template.id).toBeGreaterThan(10);
      expect(template.useCase.length, template.id).toBeGreaterThan(10);
      expect(template.businessTypes.length, template.id).toBeGreaterThan(0);
      expect(template.tags.length, template.id).toBeGreaterThanOrEqual(3);
      expect(DESIGN_FAMILIES[template.design], template.id).toBeTruthy();
      expect(template.theme.brand_primary, template.id).toMatch(/^#[0-9a-f]{6}$/i);
      expect(template.theme.page_background, template.id).toMatch(/^#[0-9a-f]{6}$/i);
      expect(template.theme.max_width, template.id).toBeGreaterThanOrEqual(600);
    }
  });

  it("uses distinct structures rather than the same outline retitled", () => {
    const outlines = ALL.map((template) =>
      template.sections.map((section) => section.key).join(">"),
    );
    expect(new Set(outlines).size).toBe(outlines.length);
    for (const template of ALL) {
      expect(template.sections.length, template.id).toBeGreaterThanOrEqual(6);
      expect(new Set(template.sections.map((section) => section.key)).size, template.id).toBe(
        template.sections.length,
      );
    }
  });

  it("matches every section key to its normalised heading", () => {
    for (const template of ALL) {
      for (const section of template.sections) {
        expect(section.key, `${template.id}: ${section.title}`).toBe(normaliseKey(section.title));
      }
    }
  });

  it("can preview every section without exposing a raw token", () => {
    const missing = ALL.flatMap((template) =>
      template.sections
        .filter((section) => !SECTION_SAMPLES[section.key])
        .map((section) => `${template.id}:${section.key}`),
    );
    expect(missing).toEqual([]);
    for (const template of ALL) {
      const preview = previewDocument(template);
      expect(preview.length, template.id).toBeGreaterThan(3);
      for (const block of preview) {
        expect(JSON.stringify(block)).not.toContain("{{");
        expect(JSON.stringify(block)).not.toContain("}}");
      }
    }
  });

  it("builds blocks the renderer, editor and PDF export already support", () => {
    for (const template of ALL) {
      expect(template.blocks.length, template.id).toBeGreaterThan(4);
      expect(new Set(template.blocks.map((block) => block.id)).size, template.id).toBe(
        template.blocks.length,
      );
      for (const block of template.blocks) {
        expect(SUPPORTED_BLOCKS, `${template.id}: ${block.type}`).toContain(block.type);
        expect(block.id, template.id).toBeTruthy();
        if (block.type === "heading") expect(block.text, template.id).toBeTruthy();
        if (block.type === "paragraph") expect(block.text, template.id).toBeTruthy();
        if (block.type === "list") expect(block.items?.length, template.id).toBeGreaterThan(0);
        if (block.type === "timeline") expect(block.items?.length, template.id).toBeGreaterThan(0);
      }
      const types = template.blocks.map((block) => block.type);
      if (template.type === "proposal") {
        expect(types, template.id).toContain("next_step");
      } else {
        expect(types, template.id).toContain("signature");
        expect(types, template.id).toContain("heading");
      }
    }
  });

  it("uses pricing blocks only where the structure asks for pricing", () => {
    for (const template of ALL) {
      const pricingSections = template.sections.filter(
        (section) => section.kind === "pricing" || section.kind === "pricing_table",
      ).length;
      const pricingBlocks = template.blocks.filter(
        (block) => block.type === "packages" || block.type === "pricing_table",
      ).length;
      expect(pricingBlocks, template.id).toBe(pricingSections);
    }
  });

  it("gives contracts a governing-law section and a signature block", () => {
    for (const template of CONTRACT_TEMPLATES) {
      expect(
        template.sections.some((section) => section.key === "governing_law"),
        template.id,
      ).toBe(true);
      expect(template.sections.some((section) => section.kind === "signature"), template.id).toBe(
        true,
      );
    }
  });

  it("exposes both libraries and finds templates by id", () => {
    expect(BUILT_IN_TEMPLATES.proposal.length).toBe(PROPOSAL_TEMPLATES.length);
    expect(BUILT_IN_TEMPLATES.contract.length).toBe(CONTRACT_TEMPLATES.length);
    expect(TEMPLATE_LIBRARY.proposal.every((template) => template.blocks.length > 0)).toBe(true);
    const first = PROPOSAL_TEMPLATES[0];
    expect(templateById("proposal", first.id)?.name).toBe(first.name);
    expect(templateById("contract", first.id)).toBeUndefined();
    expect(isBuiltIn(first.id)).toBe(true);
    expect(isBuiltIn("tpl_uploaded")).toBe(false);
  });

  it("copies blocks with fresh ids so documents never share block identity", () => {
    const template = PROPOSAL_TEMPLATES[0];
    const first = blocksForTemplate(template);
    const second = blocksForTemplate(template);
    expect(first).toHaveLength(template.blocks.length);
    expect(first[0].id).not.toBe(template.blocks[0].id);
    expect(first[1].id).not.toBe(second[1].id);
    for (const block of first) {
      expect(template.blocks.some((source) => source.id === block.id)).toBe(false);
    }
    const listIndex = template.blocks.findIndex((block) => block.items && block.items.length > 0);
    if (listIndex >= 0) {
      const source = template.blocks[listIndex];
      const copied = first[listIndex];
      expect(copied.items).not.toBe(source.items);
      expect(copied.items?.[0]).not.toBe(source.items?.[0]);
    }
  });
});

describe("template drafting", () => {
  const briefFor = (template: LibraryTemplate): Brief => ({
    clientName: "Northwind Trading",
    currency: "GBP",
    problem: "The current process is manual and slow.",
    sections: template.sections.map((section) => section.title),
    timeline: "eight weeks from kickoff",
    tone: "formal",
    cta: "Approve the proposal to book the kickoff.",
    industry: "Retail",
    service: "a new marketing website",
    clientWebsite: "https://northwind.example",
    businessWebsite: "https://studio.example",
    businessName: "Revercue Studio",
    targetAudience: "independent retailers",
    packages: [
      { name: "Essential", price: 1200, deliverables: "Design system; Five pages" },
      { name: "Growth", price: 2400, deliverables: "Design system; Ten pages; Training" },
    ],
    faqs: [],
    questions: [],
    scope: "Design, build and launch a five-page marketing website.",
    parties: "Northwind Trading and Reverte Studio",
    paymentTerms: "GBP 2400, 50% on signature and 50% on launch",
    revisions: "Two rounds of revisions per page.",
    cancellation: "Thirty days written notice.",
    organized: Object.fromEntries(
      template.sections.map((section) => [section.key, SECTION_SAMPLES[section.key]]),
    ),
  });

  it("fills every template from the brief and the organised section copy", () => {
    for (const template of ALL) {
      const brief = briefFor(template);
      const blocks = applyOrganized(applyBrief(template.blocks, brief), brief);
      expect(blocks.length, template.id).toBeGreaterThan(0);
      expect(JSON.stringify(blocks), template.id).not.toContain("{{");

      for (const section of template.sections) {
        const block = blocks.find((candidate) => candidate.meta?.placeholder === section.key);
        if (!block) continue;
        expect(block.text, `${template.id}: ${section.key}`).toBe(SECTION_SAMPLES[section.key]);
      }

      for (const block of blocks) {
        if (block.type === "heading") {
          expect(block.text, template.id).not.toContain("add the agreed details");
        }
        for (const item of block.items ?? []) {
          expect(item.label, template.id).not.toContain("{{");
        }
      }
    }
  });

  it("keeps the template's section order and headings in the rendered blocks", () => {
    for (const template of ALL) {
      const brief = briefFor(template);
      const blocks = applyOrganized(applyBrief(template.blocks, brief), brief);
      const headings = blocks.filter((block) => block.type === "heading").map((block) => block.text);
      for (const section of template.sections) {
        expect(headings, template.id).toContain(section.title);
      }
    }
  });

  it("replaces the legacy template ids", () => {
    const ids = Object.values(BUILT_IN_TEMPLATES).flat().map((template) => template.id);
    for (const legacy of [
      "builtin-thread",
      "builtin-letter",
      "builtin-agreement",
      "builtin-engagement",
    ]) {
      expect(ids).not.toContain(legacy);
    }
  });
});

describe("template search", () => {
  it("filters by category, industry and complexity", () => {
    const marketing = searchTemplates("proposal", { category: "Marketing & creative" });
    expect(marketing.length).toBeGreaterThanOrEqual(6);
    expect(marketing.every((template) => template.category === "Marketing & creative")).toBe(true);

    const marketingIndustry = industriesFor("proposal").find((industry) => industry === "Marketing");
    if (marketingIndustry) {
      expect(searchTemplates("proposal", { industry: marketingIndustry }).length).toBeGreaterThan(0);
    }

    const simple = searchTemplates("contract", { complexity: "simple" });
    expect(simple.length).toBeGreaterThan(0);
    expect(simple.every((template) => template.complexity === "simple")).toBe(true);
  });

  it("finds templates by name, industry, use case and tag", () => {
    expect(searchTemplates("proposal", { query: "seo" })[0]?.name).toContain("SEO");
    expect(searchTemplates("proposal", { query: "construction" }).length).toBeGreaterThan(0);
    expect(searchTemplates("contract", { query: "nda" })[0]?.name).toContain("Non-Disclosure");
    expect(searchTemplates("contract", { query: "software licensing" }).length).toBeGreaterThan(0);
    expect(searchTemplates("proposal", { query: "retainer" }).length).toBeGreaterThan(1);
    expect(searchTemplates("proposal", { query: "unicorn farming" })).toHaveLength(0);
  });

  it("ranks name matches above description matches and keeps suggested first", () => {
    const results = searchTemplates("proposal", { query: "proposal" });
    expect(results.length).toBeGreaterThan(0);
    const branded = searchTemplates("proposal", { query: "branding" });
    expect(branded[0].name).toContain("Branding");
    const unfiltered = searchTemplates("contract");
    expect(unfiltered[0].suggested).toBe(true);
  });
});
