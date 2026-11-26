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
): Promise<Array<{ afterBlockId: string; kind: string; query: string; data?: unknown }>> {
  const outline = document.blocks
    .map((block) => {
      if (block.type === "chart" || block.type === "diagram") return `${block.id}: ${block.type} — already has a visual`;
      const label = block.text || block.items?.map((item) => item.label).join(", ") || "";
      return `${block.id}: ${block.type} — ${label}`;
    })
    .join("\n");

  const text = await complete(
    "You choose illustrations for a business document. Answer only as JSON. Prefer a chart for numbers that are already in the document, a diagram for a process that is already described, an icon for a single concept, and a photograph only for a place, product or team. Never invent figures or steps.",
    `Sections: ${sections.join(", ")}\nBlocks:\n${outline}\n\nReturn JSON: [{"afterBlockId": "id", "kind": "image|chart|diagram|icon", "query": "short search phrase"}]. ` +
      `For a chart add "data": {"title": "", "unit": "", "series": [{"label": "", "value": 0}]} using only numbers written in the document (at least two). ` +
      `For a diagram add "data": {"title": "", "steps": [{"title": "", "detail": ""}]} describing the process in this document (at least two steps). ` +
      `If the document has no numbers or no described process, do not request a chart or diagram. Return [] if no visual would help.`,
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

function sleep(ms: number): Promise<null> {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([promise, sleep(ms)]) as Promise<T | null>;
}

/* ----------------------------------------------------- the written rules */

const EXPAND_CONTRACTIONS: [RegExp, string][] = [
  [/\bcan't\b/gi, "cannot"],
  [/\bwon't\b/gi, "will not"],
  [/\bdon't\b/gi, "do not"],
  [/\bdoesn't\b/gi, "does not"],
  [/\bdidn't\b/gi, "did not"],
  [/\bisn't\b/gi, "is not"],
  [/\baren't\b/gi, "are not"],
  [/\bwasn't\b/gi, "was not"],
  [/\bweren't\b/gi, "were not"],
  [/\bwe're\b/gi, "we are"],
  [/\bthey're\b/gi, "they are"],
  [/\bit's\b/gi, "it is"],
  [/\bthat's\b/gi, "that is"],
  [/\bthere's\b/gi, "there is"],
  [/\bI'm\b/gi, "I am"],
  [/\bI've\b/gi, "I have"],
  [/\bI'll\b/gi, "I will"],
  [/\bwe've\b/gi, "we have"],
  [/\bwe'll\b/gi, "we will"],
  [/\byou're\b/gi, "you are"],
  [/\byou'll\b/gi, "you will"],
  [/\blet's\b/gi, "let us"],
];

const TIGHTEN_PHRASES: [RegExp, string][] = [
  [/\bin order to\b/gi, "to"],
  [/\bdue to the fact that\b/gi, "because"],
  [/\bat this point in time\b/gi, "now"],
  [/\ba large number of\b/gi, "many"],
  [/\bin the event that\b/gi, "if"],
  [/\bprior to\b/gi, "before"],
  [/\bsubsequent to\b/gi, "after"],
  [/\bwith regard to\b/gi, "about"],
  [/\bwith respect to\b/gi, "about"],
  [/\butilis(e|es|ed|ing)\b/gi, "use"],
  [/\butiliz(e|es|ed|ing)\b/gi, "use"],
  [/\bfacilitate(s|d)?\b/gi, "help"],
  [/\bcommenc(e|es|ed|ing)\b/gi, "start"],
  [/\bterminat(e|es|ed|ing)\b/gi, "end"],
  [/\bendeavour(s|ed)?\b/gi, "try"],
  [/\bapproximately\b/gi, "about"],
  [/\bdemonstrat(e|es|ed|ing)\b/gi, "show"],
  [/\bpurchase(s|d)?\b/gi, "buy"],
  [/\bobtain(s|ed)?\b/gi, "get"],
  [/\bassist(s|ed)?\b/gi, "help"],
  [/\bensure(s|d)?\b/gi, "make sure"],
  [/\ba considerable amount of\b/gi, "a lot of"],
  [/\ba number of\b/gi, "several"],
];

const WORDING: [RegExp, string][] = [
  [/\bimportant\b/gi, "essential"],
  [/\bprovide(s|d)?\b/gi, "give"],
  [/\brequire(s|d)?\b/gi, "need"],
  [/\badditional\b/gi, "extra"],
  [/\bhowever\b/gi, "but"],
  [/\btherefore\b/gi, "so"],
  [/\bfurthermore\b/gi, "also"],
  [/\bnevertheless\b/gi, "still"],
  [/\bcommence\b/gi, "begin"],
  [/\bregarding\b/gi, "about"],
];

const FILLER = /\b(very|really|quite|just|actually|basically|simply|definitely|literally|honestly|kind of|sort of|a bit)\s/gi;

function tidy(value: string): string {
  return value
    .replace(/[ \t]+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([,;:])(?=\S)/g, "$1 ")
    .replace(/\bi\b/g, "I")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function capitaliseSentences(value: string): string {
  return value.replace(/(^|[.!?]\s+|\n)([a-z])/g, (_match, lead: string, letter: string) => `${lead}${letter.toUpperCase()}`);
}

function grammar(value: string): string {
  const cleaned = tidy(value);
  if (!cleaned) return cleaned;
  const finished = /[.!?"')\]]$/.test(cleaned) ? cleaned : `${cleaned}.`;
  return capitaliseSentences(finished);
}

function applyRules(value: string, rules: [RegExp, string][]): string {
  return rules.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), value);
}

function shorten(value: string): string {
  return tidy(value.replace(FILLER, "")).replace(/\s+\n/g, "\n");
}

function splitLongSentences(value: string): string {
  return value
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => {
      if (sentence.split(/\s+/).length < 24) return sentence;
      return sentence
        .replace(/,\s+(and|but|so|which|while)\s+/g, ". ")
        .replace(/;\s+/g, ". ");
    })
    .join(" ");
}

function formal(value: string): string {
  let output = applyRules(value, EXPAND_CONTRACTIONS);
  output = output.replace(/!+/g, ".").replace(/\bhi\b(\s|,)/gi, "Dear$1").replace(/\bthanks\b/gi, "Thank you");
  return grammar(output);
}

function friendly(value: string): string {
  let output = value
    .replace(/\bdo not\b/gi, "don't")
    .replace(/\bcannot\b/gi, "can't")
    .replace(/\bwill not\b/gi, "won't")
    .replace(/\bit is\b/gi, "it's")
    .replace(/\bwe are\b/gi, "we're")
    .replace(/\bI am\b/gi, "I'm")
    .replace(/\bDear\b/g, "Hi")
    .replace(/\bThank you\b/gi, "Thanks");
  output = applyRules(output, TIGHTEN_PHRASES);
  return grammar(output);
}

function expand(value: string): string {
  const base = grammar(value);
  const sentences = base.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length >= 3) return base;
  return `${base} This keeps the scope, the price and the timing clear before any work starts.`;
}

/**
 * The rewrite without the engine: deterministic writing rules. This is what
 * the helper falls back to, so selecting a passage always produces a change
 * rather than a spinner that never resolves.
 */
export function localRewrite(text: string, instruction: string): string {
  const original = text.trim();
  if (!original) return original;
  const ask = instruction.toLowerCase();

  if (/formal|professional|business/.test(ask)) return formal(original);
  if (/friendly|warm|casual|softer/.test(ask)) return friendly(original);
  if (/concise|shorter|short|tight|trim|cut/.test(ask)) return grammar(shorten(original));
  if (/expand|longer|detail|elaborate/.test(ask)) return expand(original);
  if (/simple|plain|clear|readab/.test(ask)) return grammar(applyRules(splitLongSentences(original), TIGHTEN_PHRASES));
  if (/grammar|typo|proof|spelling|punctuat/.test(ask)) return grammar(original);
  if (/word|reword|rephrase|different/.test(ask)) return grammar(applyRules(original, WORDING));

  const tightened = grammar(applyRules(shorten(original), TIGHTEN_PHRASES));
  return tightened || grammar(original);
}

/** The inline "ask the helper" rewrite. */
export async function rewrite(text: string, instruction: string): Promise<string> {
  const engine = isAvailable() ? await withTimeout(loadEngine(), 1500) : null;
  if (engine) {
    const response = await withTimeout(
      engine.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You rewrite one passage of a client document. Keep every fact. Return only the rewritten passage, with no explanation.",
          },
          { role: "user", content: `Instruction: ${instruction}\nPassage:\n${text}` },
        ],
        temperature: 0.4,
        max_tokens: 500,
      }),
      12_000,
    ).catch(() => null);
    const written = response?.choices?.[0]?.message?.content?.trim();
    if (written) return written;
  }
  return localRewrite(text, instruction);
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
