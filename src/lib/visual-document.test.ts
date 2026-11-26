import { describe, expect, it } from "vitest";
import {
  assetToBlock,
  filterVisualSuggestions,
  insertVisuals,
  pipelineVisualCount,
  planVisualRequests,
  readChartSpec,
  readVisualAsset,
  readVisualAssets,
} from "./visual-document";
import type { Brief } from "./brief";
import type { Block } from "../types";

const brief: Brief = {
  clientName: "Acme Co.",
  businessName: "Studio Nine",
  industry: "retail",
  service: "website redesign",
  tone: "formal",
  currency: "USD",
  problem: "",
  cta: "",
  scope: "",
  parties: "",
  paymentTerms: "",
  revisions: "",
  cancellation: "",
  sections: ["Introduction", "What is included", "Process", "Timeline", "Pricing"],
  packages: [],
  faqs: [],
  questions: [],
  timeline: "Discovery, Design, Build, Launch",
};

const sectionDoc = (): Block[] => [
  { id: "h-intro", type: "heading", level: "h2", text: "Introduction" },
  { id: "p-intro", type: "paragraph", text: "Acme needs a faster storefront." },
  { id: "h-included", type: "heading", level: "h2", text: "What is included" },
  { id: "l-included", type: "list", items: [{ label: "Storefront design" }, { label: "Checkout build" }] },
  { id: "h-process", type: "heading", level: "h2", text: "Process" },
  { id: "p-process", type: "paragraph", text: "We work in four stages." },
  { id: "t-process", type: "timeline", items: [{ label: "Discovery" }, { label: "Design" }, { label: "Build" }, { label: "Launch" }] },
  { id: "h-pricing", type: "heading", level: "h2", text: "Pricing" },
  { id: "p-pricing", type: "paragraph", text: "Packages are confirmed below." },
];

describe("asset validation", () => {
  it("rejects malformed assets instead of trusting the payload", () => {
    expect(readVisualAsset(null)).toBeNull();
    expect(readVisualAsset({ type: "video", query: "clip" })).toBeNull();
    expect(readVisualAsset({ type: "image", query: "office", url: "javascript:alert(1)" })).toBeNull();
    expect(readVisualAsset({ type: "image", query: "office" })).toBeNull();
    expect(readVisualAsset({ type: "icon", query: "handshake", icon: "not an icon" })).toBeNull();
    expect(readVisualAsset({ type: "chart", query: "growth", chart: { labels: ["One"], values: [1] } })).toBeNull();
    expect(readVisualAsset({ type: "diagram", query: "process", diagram: { steps: ["One"] } })).toBeNull();
    expect(readVisualAsset({ type: "svg", query: "mark", svg: "<div>no</div>" })).toBeNull();
  });

  it("keeps every supported type, with its source and licence metadata", () => {
    expect(readVisualAsset({ type: "image", query: "office", url: "https://images.test/a.jpg", license: "cc0", creator: "Ann" }))
      .toMatchObject({ type: "image", license: "cc0", creator: "Ann" });
    expect(readVisualAsset({ type: "icon", query: "handshake", icon: "mdi:handshake" }))
      .toMatchObject({ type: "icon", icon: "mdi:handshake" });
    expect(readVisualAsset({ type: "chart", query: "revenue", chart: { labels: ["Q1", "Q2"], values: [10, 20] } }))
      .toMatchObject({ type: "chart", chart: { labels: ["Q1", "Q2"], values: [10, 20] } });
    expect(
      readVisualAsset({
        type: "diagram",
        query: "process",
        diagram: { steps: ["Audit", "Build"], mermaid: 'graph LR\n  N0["Audit"] --> N1["Build"]' },
      }),
    ).toMatchObject({ type: "diagram", diagram: { steps: ["Audit", "Build"] } });
    expect(readVisualAsset({ type: "svg", query: "mark", svg: '<svg xmlns="http://www.w3.org/2000/svg"></svg>' }))
      .toMatchObject({ type: "svg" });
  });

  it("reads the new items array and the legacy assets map, without duplicates", () => {
    const image = { id: "a#0", type: "image", query: "office", url: "https://images.test/a.jpg" };
    const chart = { id: "b#0", type: "chart", query: "revenue", chart: { labels: ["Q1", "Q2"], values: [1, 2] } };
    expect(readVisualAssets({ items: [image, chart, image] }).map((asset) => asset.type)).toEqual(["image", "chart"]);
    expect(readVisualAssets({ assets: { a: image } })).toHaveLength(1);
    expect(readVisualAssets({ items: "nonsense" })).toEqual([]);
    expect(readVisualAssets(undefined)).toEqual([]);
  });

  it("never accepts a chart with mismatched or missing numbers", () => {
    expect(readChartSpec({ labels: ["Q1", "Q2"], values: [1] })).toBeNull();
    expect(readChartSpec({ labels: ["Q1", ""], values: [1, 2] })).toBeNull();
    expect(readChartSpec({ labels: ["Q1", "Q2"], values: [1, Number.NaN] })).toBeNull();
  });
});

describe("asset to block", () => {
  it("maps each type to the block that can actually be edited", () => {
    const image = assetToBlock(
      { id: "a", type: "image", query: "office", url: "https://images.test/a.jpg", attribution: "Ann · cc0" },
      "v1",
    );
    expect(image).toMatchObject({ id: "v1", type: "image", url: "https://images.test/a.jpg", caption: "Ann · cc0" });

    const icon = assetToBlock({ id: "b", type: "icon", query: "handshake", icon: "mdi:handshake" }, "v2");
    expect(icon).toMatchObject({ type: "icon", icon: "mdi:handshake" });
    expect(icon?.url).toBeUndefined();

    const chart = assetToBlock(
      { id: "c", type: "chart", query: "revenue", chart: { kind: "bar", labels: ["Q1", "Q2"], values: [10, 20] } },
      "v3",
    );
    expect(chart).toMatchObject({ type: "graph", chart: { labels: ["Q1", "Q2"], values: [10, 20] } });

    const diagram = assetToBlock(
      { id: "d", type: "diagram", query: "process", diagram: { steps: ["Design", "Build"], mermaid: "graph LR" } },
      "v4",
    );
    expect(diagram).toMatchObject({ type: "diagram", diagram: { steps: ["Design", "Build"], source: "graph LR" } });

    const svg = assetToBlock(
      { id: "e", type: "svg", query: "mark", svg: '<svg xmlns="http://www.w3.org/2000/svg"></svg>' },
      "v5",
    );
    expect(svg).toMatchObject({ type: "svg" });
  });

  it("still maps a legacy chart URL to nothing rather than a fake image", () => {
    expect(assetToBlock({ id: "x", type: "chart", query: "invented", url: "https://quickchart.io/chart?c=..." }, "v6")).toBeNull();
  });
});

describe("visual planning", () => {
  it("proposes a section-appropriate image, icon and diagram, never a pricing image", () => {
    const requests = planVisualRequests({ blocks: sectionDoc(), brief, kind: "proposal" });
    expect(requests.map((request) => request.type)).toEqual(["image", "icon", "diagram"]);
    expect(requests[0].afterBlockId).toBe("p-intro");
    expect(requests[1].afterBlockId).toBe("l-included");
    expect(requests[2].afterBlockId).toBe("p-process");
    expect(requests.every((request) => !request.afterBlockId.includes("pricing"))).toBe(true);
    expect(requests[2].data).toEqual({ steps: ["Discovery", "Design", "Build", "Launch"] });
  });

  it("does not add a second cover image when the document already has one", () => {
    const blocks = [{ id: "hero", type: "image" as const, url: "https://images.test/hero.jpg" }, ...sectionDoc()];
    const requests = planVisualRequests({ blocks, brief, kind: "proposal" });
    expect(requests.some((request) => request.type === "image")).toBe(false);
  });

  it("skips a diagram when there are no real steps", () => {
    const blocks = sectionDoc().filter((block) => block.type !== "timeline");
    const requests = planVisualRequests({ blocks, brief: { ...brief, timeline: "" }, kind: "proposal" });
    expect(requests.some((request) => request.type === "diagram")).toBe(false);
  });

  it("restricts contract visuals to a diagram built from real milestones", () => {
    const requests = planVisualRequests({ blocks: sectionDoc(), brief, kind: "contract" });
    expect(requests.every((request) => request.type === "diagram")).toBe(true);
    expect(requests.every((request) => Array.isArray((request.data as { steps?: string[] }).steps))).toBe(true);
  });

  it("filters helper suggestions that are irrelevant, anchorless or decorative", () => {
    const existing = planVisualRequests({ blocks: sectionDoc(), brief, kind: "proposal" });
    const accepted = filterVisualSuggestions(
      [
        { afterBlockId: "missing", kind: "image", query: "modern office" },
        { afterBlockId: "p-pricing", kind: "image", query: "pricing" },
        { afterBlockId: "p-intro", kind: "image", query: "another photo" },
        { afterBlockId: "p-process", kind: "chart", query: "invented numbers" },
        { afterBlockId: "p-process", kind: "diagram", query: "process" },
      ],
      { blocks: sectionDoc(), kind: "proposal", existing },
    );
    expect(accepted).toEqual([]);
  });
});

describe("placement", () => {
  const assets = [
    { id: "a#0", type: "image" as const, query: "website redesign", afterBlockId: "p-intro", url: "https://images.test/a.jpg" },
    { id: "b#0", type: "icon" as const, query: "Storefront design", afterBlockId: "l-included", icon: "mdi:storefront" },
    {
      id: "c#0",
      type: "chart" as const,
      query: "Revenue",
      afterBlockId: "p-process",
      chart: { kind: "bar" as const, labels: ["Q1", "Q2"], values: [1, 2] },
    },
  ];

  it("inserts after the anchor and never loses or reorders the text", () => {
    const blocks = sectionDoc();
    const result = insertVisuals(blocks, assets, { stamp: "t" });
    expect(result.inserted).toBe(3);
    const types = result.blocks.map((block) => block.type);
    expect(types).toEqual([
      "heading", "paragraph", "image",
      "heading", "list", "icon",
      "heading", "paragraph", "graph",
      "timeline",
      "heading", "paragraph",
    ]);
    const originalIds = new Set(blocks.map((block) => block.id));
    expect(result.blocks.filter((block) => originalIds.has(block.id))).toHaveLength(blocks.length);
    expect(result.blocks.find((block) => block.id === "p-intro")?.text).toBe("Acme needs a faster storefront.");
  });

  it("keeps only one generated visual per section", () => {
    const result = insertVisuals(
      sectionDoc(),
      [
        assets[0],
        { ...assets[0], id: "a#1", type: "icon", icon: "mdi:web", url: undefined },
      ],
      { stamp: "t" },
    );
    expect(result.inserted).toBe(1);
    expect(result.skipped).toBe(1);
  });

  it("skips sections the author already illustrated", () => {
    const blocks: Block[] = [
      { id: "h", type: "heading", level: "h2", text: "Introduction" },
      { id: "img", type: "image", url: "https://images.test/authored.jpg" },
      { id: "p", type: "paragraph", text: "Text" },
    ];
    const result = insertVisuals(blocks, [{ ...assets[0], afterBlockId: "p" }], { stamp: "t" });
    expect(result.inserted).toBe(0);
  });

  it("refuses a visual in a pricing section", () => {
    const result = insertVisuals(sectionDoc(), [{ ...assets[0], afterBlockId: "p-pricing" }], { stamp: "t" });
    expect(result.inserted).toBe(0);
  });

  it("leaves the document untouched when the response was empty or failed", () => {
    const blocks = sectionDoc();
    const result = insertVisuals(blocks, []);
    expect(result.blocks).toEqual(blocks);
    expect(result.inserted).toBe(0);
    expect(pipelineVisualCount(result.blocks)).toBe(0);
  });

  it("keeps structured visual data through a save and reopen (JSON round trip)", () => {
    const result = insertVisuals(sectionDoc(), [assets[2]], { stamp: "t" });
    const reopened = JSON.parse(JSON.stringify(result.blocks)) as Block[];
    const chart = reopened.find((block) => block.type === "graph");
    expect(chart?.chart).toEqual({ kind: "bar", labels: ["Q1", "Q2"], values: [1, 2] });
    expect(chart?.meta?.fromPipeline).toBe("Revenue");
    expect(pipelineVisualCount(reopened)).toBe(1);
  });
});
