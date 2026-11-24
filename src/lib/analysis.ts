import type { Block } from "../types";
import { isAvailable, rewrite } from "./webllm";

export type IssueSource = "Document structure" | "Document content" | "Client context" | "Writing quality";

export interface ReviewIssue {
  source: IssueSource;
  text: string;
}

export interface Review {
  score: number;
  issues: ReviewIssue[];
  helperUsed: boolean;
}

interface ReviewInput {
  blocks: Block[];
  sections?: string[];
  tone?: string;
  hasClient?: boolean;
}

const textOf = (block: Block): string => {
  if (block.text) return block.text;
  if (block.faqs?.length) return block.faqs.map((faq) => `${faq.question} ${faq.answer}`).join(" ");
  if (block.items?.length) return block.items.map((item) => item.label).join(" ");
  if (block.columns?.length) return block.columns.flat().join(" ");
  return "";
};

/**
 * The post-document review. The pattern engine checks the structure, the
 * helper checks the prose when it can run, and the two produce one score and
 * one list. Nothing here blocks publishing.
 */
export async function analyzeDocument({ blocks, sections = [], tone, hasClient }: ReviewInput): Promise<Review> {
  const issues: ReviewIssue[] = [];
  let score = 100;

  const body = blocks.map(textOf).join(" ").trim();
  const words = body ? body.split(/\s+/).length : 0;
  const types = new Set(blocks.map((block) => block.type));

  if (blocks.length === 0) {
    issues.push({ source: "Writing quality", text: "The document has no blocks yet." });
    return { score: 0, issues, helperUsed: false };
  }

  if (sections.length > 0) {
    const present = sections.filter((section) =>
      blocks.some((block) => (block.text || "").toLowerCase().includes(section.toLowerCase())),
    );
    const missing = sections.filter((section) => !present.includes(section));
    if (missing.length > 0) {
      score -= Math.min(30, missing.length * 10);
      issues.push({
        source: "Writing quality",
        text: `These sections are empty: ${missing.join(", ")}.`,
      });
    }
  }

  if (!types.has("pricing_table") && !types.has("packages")) {
    score -= 12;
    issues.push({
      source: "Writing quality",
      text: "There is no pricing block. Add the agreed price or packages if this document needs them.",
    });
  }

  if (!types.has("next_step") && !types.has("button")) {
    score -= 10;
    issues.push({
      source: "Writing quality",
      text: "There is no next step or button. Tell the client what to do after reading.",
    });
  }

  if (words < 120) {
    score -= 12;
    issues.push({
      source: "Document content",
      text: `The document is short (${words} words). Add enough detail for the client to understand the offer.`,
    });
  }

  const paragraphs = blocks.filter((block) => block.type === "paragraph");
  const longParagraph = paragraphs.find((block) => (block.text || "").split(/\s+/).length > 140);
  if (longParagraph) {
    score -= 6;
    issues.push({
      source: "Writing quality",
      text: "One paragraph runs past 140 words. Splitting it may make the document easier to read.",
    });
  }

  const sentences = body.split(/[.!?]\s+/).filter((sentence) => sentence.split(/\s+/).length > 34);
  if (sentences.length > 0) {
    score -= 5;
    issues.push({
      source: "Writing quality",
      text: `${sentences.length} sentence${sentences.length > 1 ? "s run" : " runs"} past 34 words.`,
    });
  }

  const duplicated = body
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 40);
  const seen = new Set<string>();
  const repeated = duplicated.filter((line) => (seen.has(line) ? true : (seen.add(line), false)));
  if (repeated.length > 0) {
    score -= 4;
    issues.push({ source: "Writing quality", text: "A sentence repeats in two places." });
  }

  if (!hasClient) {
    score -= 8;
    issues.push({
      source: "Document content",
      text: "The document is not linked to a client record yet. Link it if you want it associated with a client.",
    });
  }

  if (tone === "Formal" && /\b(don't|can't|won't|it's|we're|you're)\b/i.test(body)) {
    score -= 3;
    issues.push({
      source: "Writing quality",
      text: "The tone is set to Formal, and the text uses contractions.",
    });
  }

  let helperUsed = false;
  if (isAvailable() && body.length > 80) {
    const note = await rewrite(
      body.slice(0, 1200),
      "Reply with one sentence naming the clarity problem only. No praise, no rewrite.",
    );
    if (note) {
      helperUsed = true;
      issues.push({ source: "Writing quality", text: note.split("\n")[0].slice(0, 240) });
    }
  }

  return { score: Math.max(0, Math.min(100, score)), issues, helperUsed };
}

export function scoreBand(score: number): string {
  if (score >= 80) return "Ready.";
  if (score >= 50) return "Good, with a few improvements.";
  return "Not ready yet.";
}
