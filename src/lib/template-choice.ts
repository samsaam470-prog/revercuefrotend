import type { Block, DocContent } from "../types";
import type { LibraryTemplate } from "./templates";

/**
 * The template a document was started from. It keeps the blocks, the section
 * order and the page theme together, because the draft pipeline, the editor and
 * the canvas all need the same choice.
 */
export interface TemplateChoice {
  templateId: string;
  blocks: Block[];
  sections: string[];
  theme: Partial<DocContent>;
}

const choiceKey = (documentId: string) => `revercue_template_${documentId}`;

export function saveTemplateChoice(
  documentId: string,
  template: LibraryTemplate,
  blocks: Block[],
): TemplateChoice {
  const choice: TemplateChoice = {
    templateId: template.id,
    blocks,
    sections: template.sections.map((section) => section.title),
    theme: {
      brand_primary: template.theme.brand_primary,
      brand_secondary: template.theme.brand_secondary,
      page_background: template.theme.page_background,
      max_width: template.theme.max_width,
      base_font_size: template.theme.base_font_size,
      page_padding: template.theme.page_padding,
    },
  };
  try {
    sessionStorage.setItem(choiceKey(documentId), JSON.stringify(choice));
  } catch {
    /* the token budget is small; the page still opens with the generated skeleton */
  }
  return choice;
}

/** Reads the choice, including the bare block array the old picker stored. */
export function readTemplateChoice(documentId: string): TemplateChoice | null {
  try {
    const raw = sessionStorage.getItem(choiceKey(documentId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TemplateChoice | Block[];
    if (Array.isArray(parsed)) {
      return { templateId: "", blocks: parsed, sections: [], theme: {} };
    }
    return {
      templateId: typeof parsed.templateId === "string" ? parsed.templateId : "",
      blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
      sections: Array.isArray(parsed.sections) ? parsed.sections.filter((item) => typeof item === "string") : [],
      theme: parsed.theme && typeof parsed.theme === "object" ? parsed.theme : {},
    };
  } catch {
    return null;
  }
}

export function clearTemplateChoice(documentId: string): void {
  try {
    sessionStorage.removeItem(choiceKey(documentId));
  } catch {
    /* nothing to clear */
  }
}
