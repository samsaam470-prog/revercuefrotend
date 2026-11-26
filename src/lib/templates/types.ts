import type { Block } from "../../types";

export type TemplateType = "proposal" | "contract";

/** The visual family a template belongs to. Families share page settings. */
export type DesignFamily =
  | "modern-corporate"
  | "minimal-professional"
  | "premium-consulting"
  | "creative-agency"
  | "technology"
  | "editorial"
  | "institutional"
  | "engineering"
  | "legal";

export type TemplateComplexity = "simple" | "standard" | "detailed";

/**
 * How a section appears on the page. Every kind maps to a block type the
 * canvas, the renderer and the PDF export already understand.
 */
export type SectionKind =
  | "paragraph"
  | "list"
  | "deliverables"
  | "timeline"
  | "pricing"
  | "pricing_table"
  | "terms"
  | "signature";

export interface TemplateSection {
  /** The heading the client reads. */
  title: string;
  /**
   * The pipeline key for this section. It is also the placeholder that receives
   * the written copy, so it must equal the normalised title.
   */
  key: string;
  kind?: SectionKind;
  /** Item text for list, timeline and terms sections. `{{tokens}}` allowed. */
  items?: string[];
  /** Representative copy used only in the picker's preview. */
  sample?: string;
}

/** Page settings a template applies to a new document. */
export interface TemplateTheme {
  brand_primary: string;
  brand_secondary: string;
  page_background: string;
  max_width: number;
  base_font_size: number;
  page_padding: number;
}

export interface DocumentTemplate {
  id: string;
  type: TemplateType;
  name: string;
  category: string;
  industry: string;
  /** One line for the template card. */
  description: string;
  /** A fuller paragraph for the preview panel. */
  longDescription: string;
  audience: string;
  useCase: string;
  complexity: TemplateComplexity;
  businessTypes: string[];
  tags: string[];
  design: DesignFamily;
  theme: TemplateTheme;
  sections: TemplateSection[];
  /** A research image sits above the opening, when one is available. */
  hero?: boolean;
  /** Opens with the document title and the parties, like a cover page. */
  cover?: boolean;
  suggested?: boolean;
}

/** A template with the blocks the editor actually receives. */
export interface LibraryTemplate extends DocumentTemplate {
  blocks: Block[];
}

/** The shape the builder pages and the pipeline already understand. */
export interface BuiltInTemplate {
  id: string;
  name: string;
  description: string;
  suggested?: boolean;
  type: TemplateType;
  blocks: Block[];
}
