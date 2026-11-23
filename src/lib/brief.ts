import type { Block, Contract, DocContent, Proposal } from "../types";

export interface BriefPackage {
  name: string;
  price?: number;
  deliverables?: string;
}

export interface BriefQuestion {
  id?: string;
  text?: string;
  type?: string;
}

export interface ResearchFacts {
  business_name?: string;
  value_prop?: string;
  key_points?: string[];
  location?: string;
  author_business_name?: string;
  author_description?: string;
  author_website?: string;
}

export interface Brief {
  clientName: string;
  currency: string;
  problem: string;
  sections: string[];
  timeline: string;
  tone: string;
  cta: string;
  industry: string;
  service: string;
  clientWebsite?: string;
  businessWebsite?: string;
  businessName?: string;
  targetAudience?: string;
  packages: BriefPackage[];
  faqs: { question: string; answer: string }[];
  questions: BriefQuestion[];
  /* contract clauses */
  scope: string;
  parties: string;
  paymentTerms: string;
  revisions: string;
  cancellation: string;
  heroImage?: string;
  /** Research from the extract call, so prose can quote what was found. */
  research?: { title: string; body: string; source?: string; kind?: "client" | "web" | "background" }[];
  facts?: ResearchFacts;
  /** Section-ready copy from the organize call, keyed by section name. */
  organized?: Record<string, string>;
}

type AnyDoc = Proposal | Contract;

/**
 * Reads a document's `content`. The API sends an object, but older rows and a
 * raw database read can hand back the JSON text, and a string has no `blocks`
 * — that is what made published documents render empty.
 */
export function parseDocContent(value: unknown): Partial<DocContent> & Record<string, unknown> {
  if (!value) return {};
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? (parsed as Partial<DocContent> & Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }
  return typeof value === "object" ? (value as Partial<DocContent> & Record<string, unknown>) : {};
}

/** The saved `content` object, which is where the brief is actually stored. */
export function contentOf(doc: AnyDoc | undefined | null): Partial<DocContent> & Record<string, unknown> {
  return parseDocContent(doc?.content);
}

function text(...candidates: unknown[]): string {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  }
  return "";
}

function packagesFrom(value: unknown): BriefPackage[] {
  if (!Array.isArray(value)) return [];
  const packages: BriefPackage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const name = text(record.name, record.label);
    if (!name) continue;
    const rawPrice = record.price;
    const price = rawPrice === undefined || rawPrice === null || rawPrice === "" ? undefined : Number(rawPrice);
    const deliverables = text(record.deliverables, record.detail, record.description);
    packages.push({
      name,
      price: price !== undefined && Number.isFinite(price) ? price : undefined,
      deliverables: deliverables || undefined,
    });
  }
  return packages;
}

function faqsFrom(value: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(value)) return [];
  const faqs: { question: string; answer: string }[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const question = text(record.question, record.text);
    const answer = text(record.answer, record.body);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function questionsFrom(value: unknown): BriefQuestion[] {
  if (!Array.isArray(value)) return [];
  const questions: BriefQuestion[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const question = text(record.text, record.question, record.label);
    if (!question) continue;
    questions.push({
      id: text(record.id) || undefined,
      text: question,
      type: text(record.type) || "short_text",
    });
  }
  return questions;
}

export function briefOf(doc: AnyDoc, researchImages: string[] = []): Brief {
  const content = contentOf(doc);
  const sections = Array.isArray(doc.sections)
    ? doc.sections
    : Array.isArray(content.sections)
      ? (content.sections as string[])
      : [];

  const clientName = text(doc.client_name) || "the client";
  const flat = doc as unknown as Record<string, unknown>;
  const industry = text(content.industry, flat.industry);
  const service = text(content.service, flat.service);

  const proposal = doc as Proposal;
  const contract = doc as Contract;

  return {
    clientName,
    currency: text(doc.currency, content.currency, "USD"),
    problem: text(proposal.problem, content.problem),
    sections,
    timeline: text(
      proposal.timeline_length,
      content.timeline as string | undefined,
      contract.timeline,
    ),
    tone: text(proposal.tone, content.tone, "formal"),
    cta: text(proposal.cta, content.call_to_action),
    industry,
    service,
    clientWebsite: text(proposal.client_website, content.client_website, flat.client_website) || undefined,
    businessWebsite: text(content.user_website, content.own_website, flat.user_website) || undefined,
    businessName: text(content.business_name, flat.business_name) || undefined,
    targetAudience:
      text(proposal.target_audience, content.target_audience as string | undefined) || undefined,
    packages: packagesFrom(proposal.packages ?? content.packages),
    faqs: faqsFrom(proposal.faqs ?? content.faqs),
    questions: questionsFrom(proposal.questions ?? content.questions),
    scope: text(contract.scope, content.scope as string | undefined),
    parties: text(content.parties as string | undefined),
    paymentTerms: text(contract.payment_terms, content.payment_terms as string | undefined),
    revisions: text(contract.revisions, content.revisions as string | undefined),
    cancellation: text(contract.cancellation, content.cancellation as string | undefined),
    heroImage: researchImages[0],
  };
}

/* --------------------------------------------------------------- prose */

function sentence(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function subject(brief: Brief): string {
  return brief.service || brief.industry || "the work";
}

function list(values: string[]): string {
  const clean = values.filter(Boolean);
  if (clean.length === 0) return "";
  if (clean.length === 1) return clean[0];
  return `${clean.slice(0, -1).join(", ")} and ${clean[clean.length - 1]}`;
}

function phrase(value: string): string {
  return value.trim().replace(/[.]+$/, "");
}

/** Only client-classified research can be used as a statement about the client. */
function researchLine(brief: Brief): string {
  const valueProp = brief.facts?.value_prop?.trim();
  if (valueProp) return ` The client's public materials describe the business as: ${sentence(valueProp)}`;
  const note = brief.research?.find((item) => item.kind === "client" && item.body && item.body.trim().length > 40);
  if (!note) return "";
  const body = note.body.replace(/https?:\\/\\/\\S+/g, "").replace(/\\s+/g, " ").trim();
  const first = body.match(/[^.!?]+[.!?]/)?.[0]?.trim() ?? body.slice(0, 220);
  return first ? ` The client's public materials state: ${first.replace(/[.!?]+$/, "")}.` : "";
}

export function introductionFor(brief: Brief): string {
  const who = brief.clientName && brief.clientName !== "the client" ? brief.clientName : "the client";
  const topic = brief.service || brief.industry;
  const opening = topic ? `This proposal outlines ${topic} for ${who}.` : `This proposal is prepared for ${who}.`;
  const author = brief.businessName ? ` Prepared by ${brief.businessName}${brief.businessWebsite ? ` (${brief.businessWebsite})` : ""}.` : "";
  const authorDescription = brief.facts?.author_description ? ` The business website describes its work as: ${sentence(brief.facts.author_description)}` : "";
  const problem = brief.problem ? ` ${sentence(brief.problem)}` : "";
  return `${opening}${author}${authorDescription}${problem}${researchLine(brief)} Add or confirm the agreed scope, deliverables, and commercial details before sharing.`;
}

/** The organized copy for a heading, if the organize call returned any. */
export function organizedFor(section: string, brief: Brief): string {
  const map = brief.organized;
  if (!map) return "";
  const key = normaliseKey(section);
  const direct = map[key] ?? map[section];
  if (typeof direct === "string" && direct.trim()) return direct.trim();
  for (const [name, value] of Object.entries(map)) {
    if (normaliseKey(name) === key && typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export function scopeFor(brief: Brief): string {
  if (brief.scope.trim()) return sentence(brief.scope);
  const deliverables = deliverablesFor(brief);
  return deliverables.length
    ? `The scope details supplied so far are: ${list(deliverables.slice(0, 6).map(phrase))}. Confirm the complete scope before sharing.`
    : "Add the agreed scope of work and deliverables before sharing this document.";
}

export function deliverablesFor(brief: Brief): string[] {
  return brief.packages
    .map((item) => item.deliverables)
    .flatMap((value) => (value ? value.split(/\\r?\\n|;|•/).map((line) => line.trim()) : []))
    .filter(Boolean)
    .slice(0, 6);
}

export function timelineFor(brief: Brief): string {
  if (brief.timeline) return `The timeline provided for this project is ${phrase(sentence(brief.timeline))}. Confirm any dates and milestones before sharing.`;
  return "Add the agreed start date, milestones, and delivery date before sharing.";
}

export function nextStepFor(brief: Brief): string {
  if (brief.cta) return sentence(brief.cta);
  return "Add the specific next step and approval action you want the client to take.";
}

/** Prose for any section/** Prose for any section, so no section inherits another section's paragraph. */
export function sectionCopy(section: string, brief: Brief): string {
  const organized = organizedFor(section, brief);
  if (organized) return organized;
  const key = normaliseKey(section);
  if (key === "introduction") return introductionFor(brief);
  if (key === "scope") return scopeFor(brief);
  if (key === "what_is_included" || key === "deliverables" || key === "included") {
    const deliverables = deliverablesFor(brief);
    return deliverables.length
      ? `The deliverables supplied are ${list(deliverables.map(phrase))}. Confirm the final list before sharing.`
      : "Add the agreed deliverables before sharing.";
  }
  if (key === "timeline" || key === "schedule") return timelineFor(brief);
  if (key === "process" || key === "how_it_works") return "Describe the delivery process, review points, and approval steps agreed for this project.";
  if (key === "about_you" || key === "about") {
    return `This proposal is prepared for ${brief.clientName}${brief.industry ? `, in the ${brief.industry} industry` : ""}.${brief.businessName ? ` Prepared by ${brief.businessName}${brief.businessWebsite ? ` (${brief.businessWebsite})` : ""}.` : ""}${brief.facts?.author_description ? ` The business website describes its work as: ${sentence(brief.facts.author_description)}` : ""}${brief.problem ? ` ${sentence(brief.problem)}` : ""}${researchLine(brief)}`;
  }
  if (key === "next_step") return nextStepFor(brief);
  return `Add the agreed details for ${section.toLowerCase()} before sharing this document.`;
}

export function partiesFor(brief: Brief): string {
  if (brief.parties) return sentence(brief.parties);
  return "Add the full legal names and required details of every contracting party before signing.";
}

/* -------------------------------------------------------------- fills */

const KEY_ALIASES: Record<string, string> = {
  intro: "introduction",
  hero: "hero_image",
  heroimage: "hero_image",
  price: "pricing",
  fees: "payment_terms",
  fee: "payment_terms",
  payment: "payment_terms",
  nextstep: "next_step",
  scope_of_work: "scope",
};

export function normaliseKey(key: string): string {
  const flat = key.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return KEY_ALIASES[flat] ?? flat;
}

export function fillsFor(brief: Brief): Record<string, string> {
  const deliverables = deliverablesFor(brief);
  const fills: Record<string, string> = {
    introduction: introductionFor(brief),
    scope: brief.scope ? sentence(brief.scope) : scopeFor(brief),
    timeline: timelineFor(brief),
    next_step: nextStepFor(brief),
    parties: partiesFor(brief),
    payment_terms: brief.paymentTerms
      ? sentence(brief.paymentTerms)
      : "Add the agreed fee, payment schedule, due dates, and payment method.",
    revisions: brief.revisions
      ? sentence(brief.revisions)
      : "Add the agreed revision allowance and any charges for additional revisions.",
    cancellation: brief.cancellation
      ? sentence(brief.cancellation)
      : "Add the agreed cancellation, notice, and payment-on-termination terms.",
    hero_image: brief.heroImage || "",
    pricing: "Add confirmed pricing before sharing.",
  };

  deliverables.slice(0, 4).forEach((value, index) => {
    fills[`deliverable_${index + 1}`] = value;
  });

  brief.packages.slice(0, 4).forEach((item, index) => {
    fills[`package_${index + 1}`] = item.name;
    fills[`line_item_${index + 1}`] = item.name;
    fills[`tier_${index + 1}`] = item.name;
  });

  return fills;
}

/* --------------------------------------------------------- block work */

const PACKAGE_TYPES = new Set(["packages", "pricing_table"]);

function resolveToken(value: string | undefined, fills: Record<string, string>): string | undefined {
  if (!value) return value;
  return value.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (whole, rawKey: string) => {
    const key = normaliseKey(rawKey);
    const filled = fills[key];
    if (filled && filled.trim()) return filled;
    return fallbackForKey(key, rawKey);
  });
}

/** Last resort so a raw {{token}} is never shown to the author or the client. */
function fallbackForKey(key: string, rawKey: string): string {
  const deliverable = /^deliverable_(\d+)$/.exec(key);
  if (deliverable) return `Add confirmed details for deliverable ${deliverable[1]}.`;
  const packageKey = /^(package|tier|line_item)_(\d+)$/.exec(key);
  if (packageKey) return `Option ${packageKey[2]}`;
  if (key === "hero_image") return "";
  if (key === "pricing") return "Add confirmed pricing";
  if (key === "next_step") return "Add the next step";
  const words = rawKey.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "";
}

function isUnresolvedHeroImage(block: Block): boolean {
  const placeholder = typeof block.meta?.placeholder === "string" ? block.meta.placeholder : "";
  return block.type === "image" && (normaliseKey(placeholder) === "hero_image" || block.alt === "{{hero_image}}");
}

/**
 * Writes the brief into a template's blocks. Every placeholder is replaced;
 * blocks that cannot be filled sensibly are turned into something readable
 * rather than left as a dashed box or a zero price.
 */
export function applyBrief(blocks: Block[], brief: Brief): Block[] {
  const fills = fillsFor(brief);
  const next: Block[] = [];

  for (const block of blocks) {
    if (isUnresolvedHeroImage(block) && !brief.heroImage) {
      continue;
    }

    const copy = (value: string | undefined) => resolveToken(value, fills);

    const patched: Block = {
      ...block,
      text: copy(block.text),
      alt: copy(block.alt),
      caption: copy(block.caption),
      items: block.items?.map((item) => ({
        ...item,
        label: copy(item.label) ?? item.label,
        value: copy(item.value),
      })),
      columns: block.columns?.map((column) => column.map((line) => copy(line) ?? line)),
      faqs: block.faqs?.map((faq) => ({
        question: copy(faq.question) ?? faq.question,
        answer: copy(faq.answer) ?? faq.answer,
      })),
    };

    const placeholder = typeof block.meta?.placeholder === "string" ? block.meta.placeholder : "";
    const organized = placeholder ? organizedFor(placeholder, brief) : "";
    if (organized && patched.type === "paragraph") patched.text = organized;

    if (patched.type === "image" && brief.heroImage && !patched.url) {
      patched.url = brief.heroImage;
    }

    if (PACKAGE_TYPES.has(block.type)) {
      if (brief.packages.length) {
        patched.items = brief.packages.slice(0, 4).map((item) => ({
          label: item.name,
          ...(item.price !== undefined ? { price: item.price } : {}),
        }));
      } else {
        next.push({
          id: `${block.id}_pricing`,
          type: "paragraph",
          text: "Add confirmed package names, prices, and deliverables before sharing this proposal.",
        });
        continue;
      }
    }

    next.push(patched);
  }

  return next;
}

/** A readable skeleton with no placeholders, used for blank starts and old drafts. */
export function skeletonForBrief(brief: Brief, kind: "proposal" | "contract"): Block[] {
  const blocks: Block[] = [];
  const stamp = Date.now().toString(36);
  const id = (suffix: string) => `${stamp}_${suffix}`;
  const heading = (suffix: string, label: string) =>
    blocks.push({ id: id(suffix), type: "heading", level: "h2", text: label });
  const para = (suffix: string, value: string) =>
    blocks.push({ id: id(suffix), type: "paragraph", text: value });

  if (kind === "contract") {
    heading("h1", "Parties");
    para("parties", partiesFor(brief));
    heading("h2", "Scope");
    para("scope", brief.scope ? sentence(brief.scope) : scopeFor(brief));
    heading("h3", "Payment");
    para("payment", brief.paymentTerms ? sentence(brief.paymentTerms) : "Add the agreed fee, payment schedule, due dates, and payment method.");
    if (brief.timeline) {
      heading("h4", "Timeline");
      para("timeline", timelineFor(brief));
    }
    heading("h5", "Revisions");
    para("revisions", brief.revisions ? sentence(brief.revisions) : "Add the agreed revision allowance and any charges for additional revisions.");
    heading("h6", "Cancellation");
    para("cancellation", brief.cancellation ? sentence(brief.cancellation) : "Add the agreed cancellation, notice, and payment-on-termination terms.");
    blocks.push({ id: id("sign"), type: "signature" });
    return blocks;
  }

  const sections = brief.sections.length
    ? brief.sections
    : ["Introduction", "Scope", "What is included", "Timeline", "Pricing", "Next Step"];

  if (brief.heroImage) {
    blocks.push({
      id: id("hero"),
      type: "image",
      url: brief.heroImage,
      alt: `${subject(brief)} for ${brief.clientName}`,
    });
  }

  sections.forEach((section, index) => {
    heading(`h_${index}`, section);
    const key = normaliseKey(section);
    if (key === "pricing") {
      if (brief.packages.length) {
        blocks.push({
          id: id(`p_${index}`),
          type: "packages",
          items: brief.packages.slice(0, 4).map((item) => ({ label: item.name, price: item.price, quantity: 1 })),
        });
      } else {
        para(`p_${index}`, "Add confirmed package names, prices, and deliverables before sharing this proposal.");
      }
      return;
    }
    if (key === "faqs" || key === "faq") {
      brief.faqs.slice(0, 5).forEach((faq, faqIndex) => {
        blocks.push({ id: id(`faq_${index}_${faqIndex}`), type: "faq", faqs: [faq] });
      });
      if (!brief.faqs.length) para(`faq_${index}`, "Add approved client questions and answers here.");
      return;
    }
    if (key === "embedded_questions" || key === "questions") {
      brief.questions.forEach((question, questionIndex) => {
        blocks.push({
          id: id(`q_${questionIndex}`),
          type: "question",
          question: {
            id: question.id || `q${questionIndex + 1}`,
            text: question.text || "Add the question you want the client to answer.",
            type: (question.type as NonNullable<Block["question"]>["type"]) || "short_text",
          },
        });
      });
      return;
    }
    if (key === "next_step") {
      blocks.push({ id: id(`n_${index}`), type: "next_step", text: nextStepFor(brief) });
      return;
    }
    if (key === "timeline" || key === "schedule") {
      para(`t_${index}`, organizedFor(section, brief) || timelineFor(brief));
      return;
    }
    if (key === "what_is_included" || key === "deliverables" || key === "included") {
      const values = deliverablesFor(brief).slice(0, 6);
      if (values.length) {
        blocks.push({ id: id(`d_${index}`), type: "list", items: values.map((label) => ({ label })) });
        return;
      }
    }
    para(`b_${index}`, sectionCopy(section, brief));
  });

  if (!blocks.some((block) => block.type === "next_step")) {
    blocks.push({ id: id("n_end"), type: "next_step", text: nextStepFor(brief) });
  }

  return blocks;
}

/**
 * Writes the organized copy under each heading. Only the first paragraph of a
 * section is replaced: later paragraphs (a caveat, a list note) stay as they
 * were written.
 */
export function applyOrganized(blocks: Block[], brief: Brief): Block[] {
  if (!brief.organized || Object.keys(brief.organized).length === 0) return blocks;
  const seen = new Set<string>();
  let section = "";
  return blocks.map((block) => {
    if (block.type === "heading") {
      section = block.text ?? "";
      return block;
    }
    if (!section || block.type !== "paragraph") return block;
    const key = normaliseKey(section);
    if (seen.has(key)) return block;
    const copy = organizedFor(section, brief);
    if (!copy) return block;
    seen.add(key);
    return { ...block, text: copy };
  });
}

/** Wording older drafts were generated with, before the brief was readable. */
const LEGACY_FILLER = /write the .{1,40} section here|summarize the client's problem|a new heading/i;

/** True when a block still carries a template token or old filler prose. */
export function hasPlaceholders(blocks: Block[]): boolean {
  return blocks.some(
    (block) =>
      (typeof block.text === "string" && LEGACY_FILLER.test(block.text)) ||
      (block.items ?? []).some((item) => LEGACY_FILLER.test(item.label || "")),
  ) || blocks.some(
    (block) =>
      (typeof block.text === "string" && /\{\{/.test(block.text)) ||
      (typeof block.alt === "string" && /\{\{/.test(block.alt)) ||
      (block.items ?? []).some(
        (item) => /\{\{/.test(item.label || "") || /\{\{/.test(item.value || ""),
      ),
  );
}
