import type { Block } from "../../types";
import { normaliseKey } from "../brief";
import type {
  DesignFamily,
  DocumentTemplate,
  TemplateSection,
  TemplateTheme,
} from "./types";

export function titleCase(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

/* ------------------------------------------------------------- families */

export const DESIGN_FAMILIES: Record<
  DesignFamily,
  { label: string; description: string; theme: TemplateTheme }
> = {
  "modern-corporate": {
    label: "Modern corporate",
    description: "Clear blue accents, generous headings and a wide page for structured business documents.",
    theme: {
      brand_primary: "#1d4ed8",
      brand_secondary: "#0f172a",
      page_background: "#ffffff",
      max_width: 730,
      base_font_size: 16,
      page_padding: 56,
    },
  },
  "minimal-professional": {
    label: "Minimal professional",
    description: "Near-black type on white with a tight, quiet layout that keeps the words in charge.",
    theme: {
      brand_primary: "#111827",
      brand_secondary: "#4b5563",
      page_background: "#ffffff",
      max_width: 700,
      base_font_size: 16,
      page_padding: 60,
    },
  },
  "premium-consulting": {
    label: "Premium consulting",
    description: "Warm ivory page, brass accents and a narrow measure for partner-level consulting work.",
    theme: {
      brand_primary: "#8a6a2f",
      brand_secondary: "#111111",
      page_background: "#fbfaf6",
      max_width: 690,
      base_font_size: 16,
      page_padding: 62,
    },
  },
  "creative-agency": {
    label: "Creative agency",
    description: "Strong accent colour, wider page and bolder headings for pitch-led creative work.",
    theme: {
      brand_primary: "#d6336c",
      brand_secondary: "#191426",
      page_background: "#ffffff",
      max_width: 760,
      base_font_size: 16,
      page_padding: 54,
    },
  },
  technology: {
    label: "Technology",
    description: "Teal accents and cool whites with room for diagrams, phases and technical scope.",
    theme: {
      brand_primary: "#0e7490",
      brand_secondary: "#0b1220",
      page_background: "#fbfdff",
      max_width: 745,
      base_font_size: 15.5,
      page_padding: 52,
    },
  },
  editorial: {
    label: "Editorial",
    description: "Serif-leaning proportions, narrow measure and warm paper for research and content work.",
    theme: {
      brand_primary: "#7c2d12",
      brand_secondary: "#292524",
      page_background: "#fffdf8",
      max_width: 675,
      base_font_size: 17,
      page_padding: 64,
    },
  },
  institutional: {
    label: "Financial & institutional",
    description: "Deep navy, conservative spacing and a dense page for financial and corporate audiences.",
    theme: {
      brand_primary: "#123a63",
      brand_secondary: "#0b1f33",
      page_background: "#ffffff",
      max_width: 735,
      base_font_size: 15.5,
      page_padding: 58,
    },
  },
  engineering: {
    label: "Construction & engineering",
    description: "Industrial orange, firm rules and wide margins for schedules, materials and site work.",
    theme: {
      brand_primary: "#c2410c",
      brand_secondary: "#1c1917",
      page_background: "#fffdfb",
      max_width: 745,
      base_font_size: 16,
      page_padding: 54,
    },
  },
  legal: {
    label: "Clean legal",
    description: "Restrained slate type, numbered-looking clauses and a calm page built for reading.",
    theme: {
      brand_primary: "#2f3a45",
      brand_secondary: "#111827",
      page_background: "#ffffff",
      max_width: 700,
      base_font_size: 15.5,
      page_padding: 60,
    },
  },
};

/* --------------------------------------------------------------- tokens */

/**
 * Values the preview and the sample documents use. They are deliberate
 * placeholders, never claims about a real client.
 */
export const SAMPLE_TOKENS: Record<string, string> = {
  client_name: "Sample client",
  business_name: "Your business",
  business_website: "yourbusiness.com",
  project_title: "Your project",
  project_description: "A short description of the work agreed with the client.",
  effective_date: "Effective date to be confirmed",
  total_fee: "Fee to be confirmed",
  parties: "Sample client and Your business",
  governing_law: "Governing law to be confirmed",
  jurisdiction: "Jurisdiction to be confirmed",
  notice_period: "Notice period to be confirmed",
  hero_image: "",
  introduction: "An introduction written for this client.",
  next_step: "Approve this proposal to start the work.",
  payment_terms: "Payment terms to be confirmed.",
  pricing: "Investment to be confirmed",
};

/** Representative copy per section, used only by the picker preview. */
export const SECTION_SAMPLES: Record<string, string> = {
  introduction:
    "This proposal sets out the work recommended for the client, the approach, the timeline and the investment.",
  executive_summary:
    "A concise summary of the client's situation, the recommended work and the result it is intended to deliver.",
  client_background:
    "What the client does, the market it operates in and the people involved in this project.",
  understanding_requirements:
    "A restatement of the brief in the client's own terms, including constraints and priorities.",
  objectives: "The outcomes this engagement is intended to achieve, written as measurable objectives.",
  proposed_solution: "The recommended approach and why it fits the client's situation.",
  scope: "What is included in the engagement, and the boundaries of the work.",
  "what_is_included": "The specific outputs the client will receive.",
  methodology: "How the work will run: stages, review points and approvals.",
  "process": "The delivery process, review points and approval steps agreed for this project.",
  timeline: "The agreed start, milestones and delivery dates.",
  milestones: "The checkpoints where the client reviews and approves progress.",
  team: "Who will deliver the work and what each person is responsible for.",
  experience: "Relevant, verifiable experience that can be referenced for this client.",
  investment: "The investment for the scope described, with any options.",
  pricing: "The investment for the scope described, with any options.",
  payment_terms: "When and how invoices are issued and paid.",
  assumptions: "The conditions this proposal assumes to be true.",
  exclusions: "Work that is not included and would be quoted separately.",
  outcomes: "The changes the client can expect once the work is delivered.",
  next_step: "The single action that moves this proposal forward.",
  approval: "How the client approves the proposal and what happens next.",
  about: "A short, factual description of the business delivering the work.",
  risks: "Known risks, dependencies and how they will be managed.",
  governance: "Decision-makers, meeting rhythm and escalation.",
  support: "Ongoing support and response expectations after launch.",
  reporting: "What is reported, how often and in what format.",
  implementation: "The sequence for putting the recommended work into practice.",
  training: "Who is trained, on what, and how competence is confirmed.",
  audit: "What was reviewed, what was found and what is recommended.",
  research_questions: "The questions the study will answer.",
  budget: "The budget the proposal is built around and what it covers.",
  market_context: "The relevant market context, kept separate from claims about the client.",
  partnership_value: "The value each party brings and what the partnership is for.",
  creative_direction: "The visual and verbal direction proposed for the work.",
  channels: "The channels proposed, their role and expected effort.",
  "kpi": "The measures that will be used to judge success.",
  technical_approach: "The technical approach, standards and constraints.",
  security: "The security requirements and controls in scope.",
  compliance: "The legal or regulatory obligations that apply to the work.",
  logistics: "Venue, suppliers, scheduling and on-the-day responsibilities.",
  staffing: "The roles required and how they are covered.",
  maintenance: "The maintenance routine, response expectations and exclusions.",
  warranty: "The warranty period and what it covers.",
  site_survey: "What the site survey covers and what it found.",
  materials: "The specified materials and finishes.",
  curriculum: "The modules, order and time allocation for the programme.",
  assessment: "How learning or performance is assessed.",
  candidate_profile: "The profile, experience and attributes required for the role.",
  seo_findings: "The technical and content findings from the SEO review.",
  content_plan: "The content themes, formats and publishing rhythm.",
  campaign_plan: "The campaign structure, timing and budget allocation.",
  property_portfolio: "The properties in scope and the management approach for them.",
  management_scope: "The services included in the management agreement.",
  transition_plan: "How the service moves from the current provider to the new one.",
  governance_model: "The operating model, meetings and escalation route.",
  funding: "The funding requirement, use of funds and repayment approach.",
  saas_phases: "The phased rollout for the software implementation.",
  integration_plan: "The systems to be integrated and the data that will move.",
  it_roadmap: "The IT priorities and the sequence of work.",
  ai_opportunities: "The processes where automation is likely to help, and why.",
  app_platforms: "The platforms and devices the application will support.",
  qa_plan: "How quality will be tested and what counts as accepted.",
  safety: "The safety standards and responsibilities on site.",
  programme: "The construction programme and key dates.",
  engineering_approach: "The engineering approach, standards and calculations.",
  recruitment_process: "The search, screening and interview process.",
  bpo_governance: "Service levels, reporting and governance for the outsourced service.",
  delivery_model: "How the work is staffed, scheduled and reviewed.",
  "risk_management": "The principal risks and the controls that reduce them.",
  "change_management": "How changes are agreed, priced and recorded.",
  "data_and_reporting": "The data collected and the reports the client receives.",
  "scope_boundaries": "What ends at the edge of this engagement.",
  "success_criteria": "The agreed tests for a successful delivery.",
  "dependencies": "What the client and other suppliers must provide.",
  "quality_assurance": "The checks applied before anything is handed over.",
  "escalation": "The route and timing for raising an issue.",
  "confidentiality": "How confidential information will be handled.",
  "termination": "How the engagement can be ended by either party.",
  "legal_review": "A recommendation that the agreement is reviewed by a qualified lawyer.",
  strategic_priorities: "The priorities that will shape the plan and the decisions it has to settle.",
  current_position: "Where the organisation is now, based on the information the client provides.",
  discovery_questions: "The questions the planning work has to answer before a plan can be agreed.",
  workshop_programme: "The workshops, who attends and what each one produces.",
  growth_opportunity: "The commercial opportunity identified, with the evidence behind it.",
  partnership_structure: "How the partnership would be structured, owned and operated.",
  roles_and_responsibilities: "What each party contributes and who decides what.",
  commercial_terms: "The commercial basis of the partnership, including revenue and costs.",
  term_and_review: "The initial term, renewal and the review points built into it.",
  approval_and_signatures: "The approval this proposal requires and the signatures that record it.",
  recommended_strategy: "The strategy recommended for this client, and the reasoning behind it.",
  community_and_engagement: "How replies, comments and direct messages will be handled and escalated.",
  editorial_process: "The path from brief to approved copy, including who signs off what.",
  production_approach: "How the production is planned, shot, edited and delivered.",
  review_and_revisions: "How many review rounds are included and what counts as a revision.",
  typical_tasks: "The tasks normally covered, and the ones that need a separate arrangement.",
  usage_and_licensing: "Where the images may be used, for how long and by whom.",
  design_process: "The research, design and handover stages the work will follow.",
  workstreams: "The workstreams the engagement is organised into.",
  event_brief: "The purpose, audience and success measures for the event.",
  event_flow: "The run of show, from setup through to close.",
  training_outcomes: "What participants should be able to do after the programme.",
  replacement_guarantee: "What happens if a placement does not work out, and for how long.",
  services_in_scope: "The processes and activities the outsourced service covers.",
  financial_analysis: "The analysis to be carried out and the client information it depends on.",
  recruitment_fees: "How recruitment fees are calculated and when they are payable.",
  management_fees: "The management fee, what it covers and how it is invoiced.",
  parties: "The full legal names and details of each contracting party.",
  recitals: "The background to the agreement and why the parties are contracting.",
  definitions: "The defined terms used throughout this agreement.",
  obligations: "What each party must do to perform this agreement.",
  fees: "The fees payable for the services.",
  term: "When the agreement starts, how long it lasts and when it ends.",
  renewal: "Whether the agreement renews and how either party stops it renewing.",
  "intellectual_property": "Who owns the deliverables and any pre-existing material.",
  warranties: "The promises each party makes about its ability and the services.",
  liability: "The limits on each party's financial responsibility.",
  indemnification: "Which losses each party covers for the other.",
  "dispute_resolution": "The steps the parties follow if a dispute arises.",
  "governing_law": "The law that governs the agreement and where disputes are heard.",
  notices: "How formal notices must be sent, and to which addresses.",
  "general_provisions": "Standard terms about the whole agreement and changes to it.",
  schedules: "The schedules that form part of this agreement.",
  signatures: "The parties' signatures, names and dates.",
  "data_protection": "How personal data is handled and protected.",
  "service_levels": "The measured service targets and remedies for missing them.",
  "license_grant": "The licence granted, its scope and its limits.",
  restrictions: "What the licence does not permit.",
  subscription: "The subscription term, renewal and fees.",
  acceptance: "How deliverables are reviewed and accepted.",
  personnel: "The people assigned to the work and how changes are handled.",
  subcontracting: "Whether work can be subcontracted and on what terms.",
  insurance: "The insurance each party must hold.",
  "force_majeure": "What happens when events outside a party's control prevent performance.",
  assignment: "Whether either party can transfer its rights under the agreement.",
  commission: "How commission is calculated, earned and paid.",
  referral_fee: "How referrals are tracked and rewarded.",
  duties: "The role, responsibilities and reporting lines.",
  benefits: "Pay, benefits and expenses.",
  "working_hours": "Hours, location and flexibility.",
  leave: "Holiday, sickness and other leave.",
  "non_solicit": "Limits on approaching the other party's people after the agreement ends.",
  "non_compete": "Any restriction on competing work after the agreement ends.",
  equipment: "The equipment rented, its condition and its use.",
  cancellation: "How either party cancels and what is payable.",
  works: "The works to be carried out and the standard required.",
  variations: "How changes to the works are priced and approved.",
  defects: "The defects liability period and how defects are remedied.",
  retention: "Retention held from payments and when it is released.",
  instalments: "The payment instalments and what triggers each one.",
  default: "What happens if a payment is missed.",
  "third_party_ip": "Third-party software and assets used in the deliverables.",
  records: "The records each party keeps and for how long.",
  publicity: "Whether either party may publicise the relationship.",
  understanding_the_requirements: "What the client asked for, restated precisely, including priorities and constraints.",
  fees_and_payment: "The fees, the invoicing cycle and the payment terms.",
  amount_owed: "The balance being repaid and the arrangement it relates to.",
  appointment: "The appointment being made and the basis on which it is made.",
  areas_of_cooperation: "The areas where the parties intend to work together.",
  audit_rights: "When one party may inspect records, and on what notice.",
  authority: "The decisions the appointed party may make, and the limits on that authority.",
  backups: "What is backed up, how often and how restoration is tested.",
  brand_approvals: "Who approves use of each party's brand and in what form.",
  brand_use: "How the partner may use names, logos and other brand assets.",
  breach_notification: "How quickly a data breach must be reported and what must be included.",
  campaign_approval: "Which campaign materials require written approval before publication.",
  capital_and_profit_share: "What each partner contributes and how profit is divided.",
  care_of_equipment: "How the equipment must be stored, used and maintained during hire.",
  client_approvals: "The approvals the client must give, and the deadlines that apply.",
  client_materials: "The materials, access and information the client must provide.",
  client_responsibilities: "What the client must provide and when, so the work can proceed.",
  confidential_information: "The categories of information treated as confidential.",
  consideration: "What is given in exchange for the assignment.",
  copyright: "Who owns the copyright in the images and what licence the client receives.",
  costs: "Which costs each party bears under this memorandum.",
  credit: "Whether and how the author is credited on published work.",
  customer_obligations: "The customer's responsibilities for use, access and compliance.",
  damage_and_loss: "Who pays for loss or damage during the hire period.",
  data_return: "How data is returned or deleted when the agreement ends.",
  data_subject_rights: "How requests from individuals are handled and passed on.",
  decision_making: "Which decisions need unanimous or majority approval.",
  defects_liability: "The period during which defects must be put right, and at whose cost.",
  delivery: "When and where goods are delivered, and what happens if delivery is late.",
  development_process: "The development stages, including review and release points.",
  duration: "How long the arrangement and its confidentiality obligations last.",
  event_date_and_venue: "The agreed event date, times and venue.",
  exclusivity: "Whether the sponsor receives exclusivity, and in which category.",
  expenses: "Which expenses are reimbursable, at what rates and with what evidence.",
  further_assurance: "The extra documents each party will sign to complete the transfer.",
  image_storage: "How images are stored, for how long and how the client can retrieve them.",
  independent_contractor_status: "Confirmation that the relationship is not employment.",
  inspection: "When goods are inspected and what happens if they fail inspection.",
  late_payment: "What is charged or may be suspended when a payment is late.",
  model_releases: "How model, property or location releases are obtained and held.",
  moral_rights: "How moral rights are handled as far as the law allows.",
  no_licence: "Confirmation that disclosure grants no rights in the information.",
  non_binding_nature: "Which parts of the memorandum are binding and which are not.",
  non_solicitation: "Limits on approaching the other party's staff after the engagement.",
  orders_and_forecasts: "How orders are placed and what forecasts each party must give.",
  parts_and_materials: "How spare parts and materials are supplied, priced and replaced.",
  payment_of_commission: "When commission is paid and what evidence triggers payment.",
  payment_of_referral_fee: "When the referral fee is paid and how it is calculated.",
  payment_schedule: "The dates and amounts of each payment.",
  permitted_disclosures: "The limited circumstances in which information may be shared.",
  portfolio_use: "Whether the designer may display the work in a portfolio.",
  price_variation: "How and when prices may change during the agreement.",
  pricing_and_payment: "The prices the reseller pays and the payment cycle.",
  probation: "The probation period, its length and how it is reviewed.",
  processing_instructions: "The documented instructions for processing personal data.",
  product_standards: "The standards goods must meet and how compliance is checked.",
  property_scope: "The properties covered by the management appointment.",
  purpose: "Why the parties are entering this arrangement.",
  quality_control: "How quality and consistency of licensed material is maintained.",
  referral_process: "What makes a referral eligible and how it must be submitted.",
  remedies: "The remedies available if the obligations are breached.",
  remuneration: "The salary, fee or stipend payable and when it is paid.",
  rent_and_deposit: "The rental charge, deposit and refund arrangements.",
  reseller_obligations: "What the reseller must do to sell and support the product.",
  resources: "The staff, facilities or funding each party contributes.",
  response_targets: "The response times committed to for each priority level.",
  responsibilities: "What each party is responsible for delivering.",
  restrictive_covenants: "Any limits on competing or soliciting activity after the relationship ends.",
  return_and_destruction: "When information must be returned or destroyed, and how that is confirmed.",
  return_of_equipment: "When and where the equipment must be returned, and in what condition.",
  return_of_information: "What happens to confidential materials if discussions end.",
  review: "The review meetings, their frequency and what they cover.",
  revisions: "The number of revision rounds included and what counts as a revision.",
  rights_and_benefits: "The rights, visibility and benefits the sponsor receives.",
  risk_and_title: "When risk and ownership of goods pass to the buyer.",
  roles: "The role each party plays and who is responsible for what.",
  schedule: "The agreed dates, milestones and delivery points.",
  service_credits: "The credits or remedies applied when service levels are missed.",
  site_conditions: "The site conditions recorded before work begins and who bears the risk.",
  sponsorship_fee: "The fee payable for the sponsorship and its payment dates.",
  stipend: "The stipend or allowance payable during the placement.",
  supervision: "Who supervises the placement and how feedback is given.",
  support_hours: "The hours in which support is available and how requests are raised.",
  suspension: "When the service may be suspended and how it is restored.",
  taxes: "Which party is responsible for taxes on the fees paid.",
  territory_and_customers: "The territory and customer groups covered by the arrangement.",
  third_party_components: "Third-party software, assets or fonts included in the deliverables.",
  third_party_platforms: "Third-party platforms used to deliver the services and their terms.",
  warranty_period: "How long the warranty lasts and what it covers.",
};

/* -------------------------------------------------------- section helpers */

export const sectionKey = (title: string): string => normaliseKey(title);

export function p(title: string, sample?: string): TemplateSection {
  return { title, key: sectionKey(title), kind: "paragraph", ...(sample ? { sample } : {}) };
}

export function l(title: string, items?: string[], sample?: string): TemplateSection {
  return { title, key: sectionKey(title), kind: "list", items, ...(sample ? { sample } : {}) };
}

export function tm(title: string, items?: string[], sample?: string): TemplateSection {
  return { title, key: sectionKey(title), kind: "terms", items, ...(sample ? { sample } : {}) };
}

/**
 * A list section without supplied labels still needs something useful on the
 * page. It names the section and the slot, so the author knows what to replace
 * and a client never reads a stray token.
 */
function labelsFor(title: string, items?: string[]): string[] {
  if (!items?.length) {
    return [1, 2, 3].map((index) => `${title}: detail ${index} to be agreed.`);
  }
  const concrete = items.filter((item) => !/^\{\{\s*item_\d+\s*\}\}$/.test(item));
  if (!concrete.length) return [1, 2, 3].map((index) => `${title}: detail ${index} to be agreed.`);
  return concrete.map(sampleToken);
}

/** Timeline steps become labelled phases rather than raw tokens. */
function phasesFor(items?: string[]): { label: string; value: string }[] {
  const source = items?.length ? items : ["Phase 1", "Phase 2", "Phase 3", "Phase 4"];
  const labels = source.map((item) => {
    const phase = /^\{\{\s*phase_(\d+)\s*\}\}$/.exec(item.trim());
    if (phase) return `Phase ${phase[1]}`;
    return sampleToken(item);
  });
  return labels.filter(Boolean).map((label) => ({
    label,
    value: "Add the agreed dates and outcome",
  }));
}

/** A deliverables list filled from the packages entered in the brief. */
export function dl(title = "What is included"): TemplateSection {
  return {
    title,
    key: sectionKey(title),
    kind: "deliverables",
    items: ["{{deliverable_1}}", "{{deliverable_2}}", "{{deliverable_3}}", "{{deliverable_4}}"],
  };
}

/** A four-stage timeline that the copy stage can adjust. */
export function tl(
  title = "Timeline",
  items = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
): TemplateSection {
  return { title, key: sectionKey(title), kind: "timeline", items };
}

export function pr(title = "Investment"): TemplateSection {
  return { title, key: sectionKey(title), kind: "pricing" };
}

export function pt(title = "Fees"): TemplateSection {
  return { title, key: sectionKey(title), kind: "pricing_table" };
}

export function sg(title = "Signatures"): TemplateSection {
  return { title, key: sectionKey(title), kind: "signature" };
}

/* ----------------------------------------------------------- block build */

const LIST_DEFAULTS = ["{{item_1}}", "{{item_2}}", "{{item_3}}"];

/**
 * Turns a template's sections into editable, placeholder-driven blocks. Every
 * block type here is already supported by the canvas, BlockRenderer and the
 * PDF export; no template can introduce one the application cannot render.
 */
export function buildBlocks(template: DocumentTemplate): Block[] {
  const blocks: Block[] = [];
  const pid = (suffix: string) => `${template.id}_${suffix}`;

  if (template.hero) {
    blocks.push({
      id: pid("hero"),
      type: "image",
      alt: "{{hero_image}}",
      meta: { placeholder: "hero_image", visual: "image" },
    });
  }

  if (template.cover) {
    blocks.push({ id: pid("title"), type: "heading", level: "h1", text: template.name });
    blocks.push({
      id: pid("subtitle"),
      type: "paragraph",
      text: "Prepared for {{client_name}} by {{business_name}}",
    });
    blocks.push({ id: pid("cover_divider"), type: "divider" });
  } else if (template.type === "contract") {
    blocks.push({ id: pid("title"), type: "heading", level: "h1", text: template.name });
    blocks.push({
      id: pid("effective"),
      type: "paragraph",
      text: "Effective date: {{effective_date}}",
    });
  }

  template.sections.forEach((section, index) => {
    blocks.push({
      id: pid(`h${index}`),
      type: "heading",
      level: "h2",
      text: section.title,
    });
    const kind = section.kind ?? "paragraph";

    if (section.key === "next_step") {
      blocks.push({ id: pid(`next${index}`), type: "next_step", text: "{{next_step}}" });
      return;
    }

    if (kind === "list" || kind === "deliverables") {
      const labels = kind === "deliverables" ? section.items ?? LIST_DEFAULTS : labelsFor(section.title, section.items);
      blocks.push({
        id: pid(`list${index}`),
        type: "list",
        items: labels.map((label) => ({ label })),
      });
      return;
    }

    if (kind === "terms") {
      blocks.push({
        id: pid(`para${index}`),
        type: "paragraph",
        text: `{{${section.key}}}`,
        meta: { placeholder: section.key },
      });
      blocks.push({
        id: pid(`terms${index}`),
        type: "list",
        items: labelsFor(section.title, section.items).map((label) => ({ label })),
      });
      return;
    }

    if (kind === "timeline") {
      blocks.push({ id: pid(`timeline${index}`), type: "timeline", items: phasesFor(section.items) });
      return;
    }

    if (kind === "pricing") {
      blocks.push({
        id: pid(`pricing${index}`),
        type: "packages",
        items: [
          { label: "{{package_1}}", price: 0 },
          { label: "{{package_2}}", price: 0 },
          { label: "{{package_3}}", price: 0 },
        ],
      });
      return;
    }

    if (kind === "pricing_table") {
      blocks.push({
        id: pid(`table${index}`),
        type: "pricing_table",
        items: [
          { label: "{{line_item_1}}", price: 0, quantity: 1 },
          { label: "{{line_item_2}}", price: 0, quantity: 1 },
          { label: "{{line_item_3}}", price: 0, quantity: 1 },
        ],
      });
      return;
    }

    if (kind === "signature") {
      blocks.push({ id: pid(`sign${index}`), type: "signature" });
      return;
    }

    blocks.push({
      id: pid(`para${index}`),
      type: "paragraph",
      text: `{{${section.key}}}`,
      meta: { placeholder: section.key },
    });
  });

  const hasNextStep = template.sections.some((section) => section.key === "next_step");
  if (template.type === "proposal" && !hasNextStep) {
    blocks.push({ id: pid("next"), type: "next_step", text: "{{next_step}}" });
  }
  const hasSignature = template.sections.some((section) => section.kind === "signature");
  if (template.type === "contract" && !hasSignature) {
    blocks.push({ id: pid("sign"), type: "signature" });
  }

  return blocks;
}

/* --------------------------------------------------------------- preview */

export type PreviewKind =
  | "heading"
  | "paragraph"
  | "list"
  | "timeline"
  | "pricing"
  | "signature"
  | "hero"
  | "meta";

export interface PreviewBlock {
  kind: PreviewKind;
  text?: string;
  items?: string[];
}

export function sampleToken(value: string): string {
  return value.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_whole, key: string) => {
    const flat = normaliseKey(key);
    const sample = SAMPLE_TOKENS[flat];
    if (sample !== undefined) return sample;
    const phase = /^phase_(\d+)$/.exec(flat);
    if (phase) return `Phase ${phase[1]}`;
    return titleCase(key);
  });
}

export function sectionSample(section: TemplateSection): string {
  return sampleToken(
    section.sample ??
      SECTION_SAMPLES[section.key] ??
      `Add the agreed ${section.title.toLowerCase()} before sharing this document.`,
  );
}

/** The structural preview shown on a template card and in its preview panel. */
export function previewDocument(template: DocumentTemplate): PreviewBlock[] {
  const blocks: PreviewBlock[] = [];
  if (template.cover) {
    blocks.push({ kind: "heading", text: template.name });
    blocks.push({ kind: "meta", text: `Prepared for ${SAMPLE_TOKENS.client_name}` });
  } else if (template.type === "contract") {
    blocks.push({ kind: "heading", text: template.name });
    blocks.push({ kind: "meta", text: `Effective date: ${SAMPLE_TOKENS.effective_date}` });
  }
  if (template.hero) blocks.push({ kind: "hero", text: "Header image" });

  for (const section of template.sections) {
    blocks.push({ kind: "heading", text: section.title });
    const kind = section.kind ?? "paragraph";
    if (kind === "list" || kind === "deliverables") {
      const labels =
        kind === "deliverables"
          ? (section.items ?? LIST_DEFAULTS).map(sampleToken)
          : labelsFor(section.title, section.items);
      blocks.push({ kind: "list", items: labels });
      continue;
    }
    if (kind === "terms") {
      blocks.push({ kind: "paragraph", text: sectionSample(section) });
      blocks.push({ kind: "list", items: labelsFor(section.title, section.items) });
      continue;
    }
    if (kind === "timeline") {
      blocks.push({
        kind: "timeline",
        items: phasesFor(section.items).map((phase) => phase.label),
      });
      continue;
    }
    if (kind === "pricing") {
      blocks.push({
        kind: "pricing",
        items: ["Option one", "Option two", "Option three"],
      });
      continue;
    }
    if (kind === "pricing_table") {
      blocks.push({ kind: "pricing", items: ["Line item", "Line item", "Line item"] });
      continue;
    }
    if (kind === "signature") {
      blocks.push({ kind: "signature" });
      continue;
    }
    blocks.push({ kind: "paragraph", text: sectionSample(section) });
  }

  if (template.type === "proposal") {
    blocks.push({ kind: "meta", text: SAMPLE_TOKENS.next_step });
  }
  return blocks;
}
