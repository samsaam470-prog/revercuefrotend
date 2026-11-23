import type { Block, Contract, DocContent, Proposal } from "../types";

export interface BriefPackage {
  name: string;
  price: number;
  deliverables?: string;
}

export interface BriefQuestion {
  id?: string;
  text?: string;
  type?: string;
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
}

type AnyDoc = Proposal | Contract;

/** The saved `content` object, which is where the brief is actually stored. */
export function contentOf(doc: AnyDoc | undefined | null): Partial<DocContent> & Record<string, unknown> {
  const content = doc?.content as (Partial<DocContent> & Record<string, unknown>) | undefined;
  return content && typeof content === "object" ? content : {};
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
    const price = Number(record.price ?? 0);
    const deliverables = text(record.deliverables, record.detail, record.description);
    packages.push({
      name,
      price: Number.isFinite(price) ? price : 0,
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

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
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

export function introductionFor(brief: Brief): string {
  if (brief.problem) {
    return `${sentence(brief.problem)} This document sets out what I will do, what it costs and when it lands.`;
  }
  return `${brief.clientName} asked about ${subject(brief)}. This document sets out what the work covers, what it costs and when it lands.`;
}

export function scopeFor(brief: Brief): string {
  const sections = brief.sections.filter(
    (section) => !["Pricing", "Next Step", "FAQs", "Embedded Questions", "About You"].includes(section),
  );
  const first = sections.length
    ? `We will work through ${list(sections.map((section) => section.toLowerCase()))}, in this order, and nothing is billed until you approve this proposal.`
    : `We will agree the exact scope before any work starts, and nothing is billed until you approve this proposal.`;
  const context = [brief.clientName !== "the client" ? `for ${brief.clientName}` : "", brief.industry]
    .filter(Boolean)
    .join(" in ");
  return context ? `The work is ${context}. ${first}` : first;
}

export function deliverablesFor(brief: Brief): string[] {
  const fromPackages = brief.packages
    .map((item) => item.deliverables)
    .flatMap((value) => (value ? value.split(/\r?\n|;|•/).map((line) => line.trim()) : []))
    .filter(Boolean);

  if (fromPackages.length) return fromPackages.slice(0, 4);

  const sections = brief.sections.filter(
    (section) => !["Pricing", "Next Step", "FAQs", "Embedded Questions", "About You"].includes(section),
  );
  if (sections.length) {
    return sections.slice(0, 4).map((section) => `${section}: planned, written and delivered.`);
  }
  return [
    `${subject(brief)} planned before anything is built.`,
    "Every deliverable reviewed with you before it ships.",
    "One point of contact from kickoff to handover.",
  ];
}

export function timelineFor(brief: Brief): string {
  if (brief.timeline) return sentence(brief.timeline);
  return "The schedule is agreed at kickoff: you see the plan, the dates and the checkpoints before the first payment.";
}

export function nextStepFor(brief: Brief): string {
  return brief.cta || "Reply on this link with a yes, and I will send the contract the same day.";
}

export function partiesFor(brief: Brief): string {
  if (brief.parties) return sentence(brief.parties);
  return `${brief.clientName} (the client) and the freelancer signing below.`;
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
      : "The fee and schedule are agreed in writing before work starts.",
    revisions: brief.revisions
      ? sentence(brief.revisions)
      : "Two rounds of revisions are included. Further rounds are quoted separately.",
    cancellation: brief.cancellation
      ? sentence(brief.cancellation)
      : "Either party may cancel with 14 days' written notice; work already delivered is billed.",
    hero_image: brief.heroImage || "",
    pricing: "Pricing",
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
  if (deliverable) return `Deliverable ${deliverable[1]} of the work, reviewed with you before it ships.`;
  const packageKey = /^(package|tier|line_item)_(\d+)$/.exec(key);
  if (packageKey) return `Option ${packageKey[2]}`;
  if (key === "hero_image") return "";
  if (key === "pricing") return "Pricing";
  if (key === "next_step") return "Next step";
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

    if (patched.type === "image" && brief.heroImage && !patched.url) {
      patched.url = brief.heroImage;
    }

    if (PACKAGE_TYPES.has(block.type)) {
      if (brief.packages.length) {
        patched.items = brief.packages.slice(0, 4).map((item) => ({
          label: item.name,
          price: item.price,
          quantity: 1,
        }));
      } else {
        next.push({
          id: `${block.id}_pricing`,
          type: "paragraph",
          text: "The fee is agreed with you before anything is billed, and it is written into the contract we both sign.",
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
    para("payment", brief.paymentTerms ? sentence(brief.paymentTerms) : "The fee and schedule are agreed in writing before work starts.");
    if (brief.timeline) {
      heading("h4", "Timeline");
      para("timeline", timelineFor(brief));
    }
    heading("h5", "Revisions");
    para("revisions", brief.revisions ? sentence(brief.revisions) : "Two rounds of revisions are included. Further rounds are quoted separately.");
    heading("h6", "Cancellation");
    para("cancellation", brief.cancellation ? sentence(brief.cancellation) : "Either party may cancel with 14 days' written notice; work already delivered is billed.");
    blocks.push({ id: id("sign"), type: "signature" });
    return blocks;
  }

  const sections = brief.sections.length
    ? brief.sections
    : ["Introduction", "Scope", "Timeline", "Pricing", "Next Step"];

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
        para(`p_${index}`, "The fee is agreed with you before anything is billed, and it is written into the contract we both sign.");
      }
      return;
    }
    if (key === "faqs" || key === "faq") {
      const faqs = brief.faqs.length
        ? brief.faqs
        : [{ question: "What is included?", answer: deliverablesFor(brief)[0] }];
      faqs.slice(0, 5).forEach((faq, faqIndex) => {
        blocks.push({ id: id(`faq_${index}_${faqIndex}`), type: "faq", faqs: [faq] });
      });
      return;
    }
    if (key === "embedded_questions" || key === "questions") {
      brief.questions.forEach((question, questionIndex) => {
        blocks.push({
          id: id(`q_${questionIndex}`),
          type: "question",
          question: {
            id: question.id || `q${questionIndex + 1}`,
            text: question.text || "A question for the client",
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
    if (key === "about_you") {
      para(`a_${index}`, `${brief.clientName} works with a freelancer who plans, writes and delivers the work end to end.`);
      return;
    }
    const intro = key === "introduction";
    const scope = key === "scope";
    para(
      `b_${index}`,
      intro ? introductionFor(brief) : scope ? scopeFor(brief) : timelineFor(brief),
    );
  });

  if (!blocks.some((block) => block.type === "next_step")) {
    blocks.push({ id: id("n_end"), type: "next_step", text: nextStepFor(brief) });
  }

  return blocks;
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
