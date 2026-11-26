import { DESIGN_FAMILIES } from "./blueprint";
import type { DesignFamily, DocumentTemplate } from "./types";

export interface TemplateSpec extends Omit<DocumentTemplate, "type" | "theme"> {
  design: DesignFamily;
}

/** A proposal with the page settings of its design family. */
export function proposalTemplate(spec: TemplateSpec): DocumentTemplate {
  return { ...spec, type: "proposal", theme: DESIGN_FAMILIES[spec.design].theme };
}

/** A contract with the page settings of its design family. */
export function contractTemplate(spec: TemplateSpec): DocumentTemplate {
  return { ...spec, type: "contract", theme: DESIGN_FAMILIES[spec.design].theme };
}

export const PROPOSAL_CATEGORIES = [
  "Business & professional services",
  "Marketing & creative",
  "Technology & software",
  "Freelance & independent",
  "Construction & operations",
  "Commercial & specialist",
] as const;

export const CONTRACT_CATEGORIES = [
  "General business",
  "Freelance & professional services",
  "Technology & intellectual property",
  "Employment & collaboration",
  "Commercial & operational",
] as const;
