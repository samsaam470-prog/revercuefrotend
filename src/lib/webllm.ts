/*
 * The helper.
 *
 * The product never names the engine, the runtime or the model. Everything here
 * is "the helper" to the interface: it organizes research, it visualizes a
 * document, it rewrites a sentence, it suggests a message, it summarizes a
 * record. When the environment cannot run it, the caller hides the affordance
 * instead of explaining the limitation.
 */

import type { Block, DocContent } from "../types";

const MODEL = "Qwen3-0.6B-q4f16_1-MLC";
const WARMUP_DELAY_MS = 60_000;

type Engine = {
  chat: {
    completions: {
      create: (request: {
        messages: { role: "system" | "user"; content: string }[];
        temperature?: number;
        max_tokens?: number;
      }) => Promise<{ choices: { message: { content?: string } }[] }>;
    };
  };
};

let enginePromise: Promise<Engine | null> | null = null;
let warmupTimer: ReturnType<typeof setTimeout> | null = null;

export function isAvailable(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean((navigator as Navigator & { gpu?: unknown }).gpu);
}

async function createEngine(): Promise<Engine | null> {
  if (!isAvailable()) return null;
  try {
    const webllm = await import("@mlc-ai/web-llm");
    const engine = await webllm.CreateMLCEngine(MODEL, { initProgressCallback: undefined });
    return engine as unknown as Engine;
  } catch {
    // A failed download is not an error the user needs to see: the helper is
    // simply unavailable for this session.
    return null;
  }
}

/**
 * Start the silent download. Called once, 60 seconds after mount, so the
 * first document that needs the helper finds it ready. There is no progress
 * UI: the work is invisible until a result appears.
 */
export function scheduleWarmup(): void {
  if (warmupTimer || !isAvailable()) return;
  warmupTimer = setTimeout(() => {
    void loadEngine();
  }, WARMUP_DELAY_MS);
}

export function loadEngine(): Promise<Engine | null> {
  if (!enginePromise) enginePromise = createEngine();
  return enginePromise;
}

async function complete(system: string, user: string, maxTokens = 700): Promise<string> {
  const engine = await loadEngine();
  if (!engine) return "";
  try {
    const response = await engine.chat.completions.create({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.4,
      max_tokens: maxTokens,
    });
    return response.choices[0]?.message?.content?.trim() ?? "";
  } catch {
    return "";
  }
}

export interface ResearchNote {
  title: string;
  body: string;
  source?: string;
}

/** Layer 2: turn the raw research into section-ready notes, in the chosen voice. */
export async function organize(
  rawResearch: ResearchNote[],
  sections: string[],
  tone: string,
): Promise<Record<string, string>> {
  const material = rawResearch
    .map((note) => `- ${note.title}: ${note.body}${note.source ? ` (${note.source})` : ""}`)
    .join("\n");

  const text = await complete(
    "You organize research for a client document. Write in the requested tone. Never invent facts that are not in the notes. Answer only as JSON.",
    `Tone: ${tone}\nSections: ${sections.join(", ")}\nNotes:\n${material}\n\nReturn JSON: {"sectionName": "two or three sentences"}.`,
    900,
  );

  if (!text) return {};
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    return JSON.parse(text.slice(start, end + 1)) as Record<string, string>;
  } catch {
    return {};
  }
}

export interface VisualRequest {
  blocks: Block[];
  sections: string[];
}

/** Layer 4: decide which visuals belong where, then ask the backend for them. */
export async function visualize(
  document: Pick<DocContent, "blocks">,
  sections: string[],
): Promise<Array<{ afterBlockId: string; kind: string; query: string }>> {
  const outline = document.blocks
    .map((block) => `${block.id}: ${block.type} — ${block.text || ""}`)
    .join("\n");

  const text = await complete(
    "You choose illustrations for a business document. Answer only as JSON. Prefer a chart for numbers, a diagram for process, an icon set for lists, and a photograph only for a place or a product.",
    `Sections: ${sections.join(", ")}\nBlocks:\n${outline}\n\nReturn JSON: [{"afterBlockId": "id", "kind": "image|chart|diagram|icon", "query": "short search phrase"}].`,
    500,
  );

  if (!text) return [];
  try {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    const parsed = JSON.parse(text.slice(start, end + 1));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** The inline "ask the helper" rewrite. */
export async function rewrite(text: string, instruction: string): Promise<string> {
  return complete(
    "You rewrite one passage of a client document. Keep every fact. Return only the rewritten passage, with no explanation.",
    `Instruction: ${instruction}\nPassage:\n${text}`,
    500,
  );
}

/** The writing area in the client record. */
export async function suggestMessage(context: string): Promise<string> {
  return complete(
    "You draft a short, warm, specific message to a client. Two or three sentences. No greeting formula, no signature, no emoji.",
    context,
    220,
  );
}

/** The 15-day summary on the client record. */
export async function summarize(text: string): Promise<string> {
  return complete(
    "You summarize a client relationship in three plain sentences: what was sent, what the client did, and what is next. No praise, no filler.",
    text,
    260,
  );
}
