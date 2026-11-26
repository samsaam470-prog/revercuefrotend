export type PlanName = "free" | "starter" | "growth" | "scale" | "teams";

export type AccountType = "freelancer" | "agency";

export type DocStatus =
  | "draft"
  | "published"
  | "archived"
  | "approved"
  | "declined"
  | "closed"
  | "proof_submitted"
  | "confirmed"
  | "verified"
  | "overdue";

export interface User {
  id: string;
  email: string;
  email_missing?: boolean;
  name?: string;
  plan: PlanName;
  /** The 14 days of Scale access included with a Growth purchase. */
  trial?: {
    access_plan: string;
    ends_at: string;
    days_left: number;
  } | null;
  onboarding_step: number;
  account_type?: AccountType;
  business_name?: string;
  website?: string;
  fiverr_profile?: string;
  brand_primary?: string;
  brand_secondary?: string;
  email_verified?: boolean;
  two_factor_enabled?: boolean;
  banner_dismissed?: boolean;
  tutorial_completed?: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  channel?: string;
  status?: string;
  interest_level?: number;
  last_message_at?: string;
  documents_count?: number;
  latest_status?: string;
}

export interface DocumentSummary {
  id: string;
  title: string;
  client_id?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  status: DocStatus;
  public_id?: string;
  total_time_spent_seconds?: number;
  created_at: string;
  last_activity_at?: string;
  after_approval?: string;
  submissions_count?: number;
  invoice_number?: string;
  total?: number;
  currency?: string;
  due_date?: string;
}

export interface Proposal extends DocumentSummary {
  problem?: string;
  sections?: string[];
  faqs?: { question: string; answer: string }[];
  questions?: publicQuestion[];
  currency?: string;
  timeline_length?: string;
  tone?: string;
  industry?: string;
  service?: string;
  cta?: string;
  packages?: { name?: string; price?: number; description?: string }[];
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  client_website?: string;
  target_audience?: string;
  drafted?: boolean;
  content?: DocContent;
  expiry_date?: string;
  brand_primary?: string;
  brand_secondary?: string;
  allow_pdf_download?: boolean;
  password_protected?: boolean;
  template_id?: string;
}

export interface Contract extends DocumentSummary {
  scope?: string;
  payment_terms?: string;
  timeline?: string;
  revisions?: string;
  cancellation?: string;
  after_approval?: "form" | "invoice" | "pdf_only";
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  industry?: string;
  currency?: string;
  sections?: string[];
  drafted?: boolean;
  content?: DocContent;
}

export interface Invoice extends DocumentSummary {
  line_items?: LineItem[];
  tax?: number;
  tax_label?: string;
  subtotal?: number;
  payment_arrangement?: PaymentArrangement;
  notes?: string;
  invoice_date?: string;
  linked_contract_id?: string;
  status: DocStatus;
}

export interface FormDoc extends DocumentSummary {
  description?: string;
  questions?: FormQuestion[];
  branching?: Record<string, string[]>;
  thank_you_config?: ThankYouConfig | null;
  page_mode?: "single" | "multi";
  expiry_date?: string;
}

export interface FormQuestion extends publicQuestion {
  id: string;
  explanation?: string;
  file_max_files?: number;
  file_max_size_mb?: number;
  branching_rules?: { option: string; show: string[] }[];
}

export type publicQuestion = {
  id: string;
  text: string;
  type:
    | "short_text"
    | "long_text"
    | "file_upload"
    | "single_choice"
    | "multiple_choice"
    | "combined"
    | "dropdown";
  options?: { code: string; label: string }[];
  required?: boolean;
  explanation?: string;
  allow_question?: boolean;
};

export interface LineItem {
  id?: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export type PaymentArrangement =
  | { type: "link"; url: string }
  | {
      type: "account";
      details: {
        bank_name?: string;
        account_number?: string;
        iban?: string;
        swift?: string;
        account_holder?: string;
      };
      allow_proof: boolean;
    };

export interface ThankYouConfig {
  heading?: string;
  body?: string;
  button_text?: string;
  button_url?: string;
  logo_url?: string;
}

export interface CommunicationEntry {
  id: string;
  entry_type:
    | "message_sent"
    | "reply_received"
    | "follow_up"
    | "follow_up_done"
    | "document_created"
    | "document_shared";
  direction?: "outgoing" | "incoming";
  channel?: string;
  message_text?: string;
  estimated_time?: string;
  linked_document_type?: string;
  linked_document_id?: string;
  linked_document_title?: string;
  next_step?: string;
  follow_up_date?: string;
  follow_up_done?: boolean;
  created_at: string;
}

export interface Note {
  id: string;
  note: string;
  created_at: string;
}

export interface ClientRequirement {
  id: string;
  form_id: string;
  form_title?: string;
  answers: Record<string, unknown>;
  service_type?: string;
  status: string;
  created_at: string;
}

export interface ClientDetail extends Client {
  communication: CommunicationEntry[];
  notes: Note[];
  documents: {
    proposals: DocumentSummary[];
    contracts: DocumentSummary[];
    invoices: DocumentSummary[];
    forms: DocumentSummary[];
  };
  requirements?: ClientRequirement[];
}

export interface Notification {
  id: string;
  type?: string;
  title: string;
  body?: string;
  link?: string;
  read?: boolean;
  created_at: string;
}

export interface Suggestion {
  id: string;
  type: string;
  client_id?: string;
  document_id?: string;
  title: string;
  body: string;
  action_url: string;
}

export interface Activity {
  id: string;
  event_type: string;
  client_id?: string;
  document_id?: string;
  title: string;
  created_at: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  suggested?: boolean;
  type?: string;
  thumbnail_url?: string;
}

export interface SavedFaq {
  id: string;
  question: string;
  answer: string;
  last_used_at?: string;
  deletion_warning?: boolean;
}

export interface SavedPackage {
  id: string;
  name: string;
  price: number;
  deliverables?: string;
  description?: string;
  recommended?: boolean;
  deleted_in_days?: number;
  last_used_at?: string;
}

export interface SessionRow {
  id: string;
  device: string;
  browser: string;
  ip?: string;
  last_active_at: string;
  location?: string;
}

export interface PaymentRow {
  id: string;
  date: string;
  plan: string;
  amount: number;
  method?: string;
  reference?: string;
  status: string;
}

export interface Summary {
  active_documents: number;
  clients: number;
  follow_ups_due: number;
  revenue_total: number;
  /** Older API builds returned the all-time total under this name. */
  revenue_this_month?: number;
  pending_total: number;
  pending_count: number;
  overdue_total?: number;
  overdue_count?: number;
  unread_notifications: number;
  profit?: number;
}

/* ---------- Document builder blocks ---------- */

export type BlockType =
  | "heading"
  | "paragraph"
  | "quote"
  | "list"
  | "image"
  | "icon"
  | "chart"
  | "diagram"
  | "svg"
  | "graph"
  | "shape"
  | "pricing_table"
  | "packages"
  | "timeline"
  | "faq"
  | "question"
  | "file_upload"
  | "button"
  | "divider"
  | "spacer"
  | "two_column"
  | "three_column"
  | "card"
  | "signature"
  | "next_step";

/** One labelled figure. Charts hold real data or they are not charts. */
export interface ChartPoint {
  label: string;
  value: number;
}

export interface ChartSpec {
  kind?: "bar" | "line";
  title?: string;
  unit?: string;
  source?: string;
  series: ChartPoint[];
}

/** A step in a process diagram. The title is what the reader sees. */
export interface DiagramStep {
  title: string;
  detail?: string;
}

export interface DiagramSpec {
  title?: string;
  source?: string;
  steps: DiagramStep[];
  /** Portable source, kept so the flow can be re-rendered or exported. */
  mermaid?: string;
}

export interface IconSpec {
  /** Iconify identifier, e.g. `mdi:calendar-check`. */
  name: string;
  /** The icon's own markup, kept so it renders without another request. */
  svg?: string;
  label?: string;
  color?: string;
}

export interface Block {
  id: string;
  type: BlockType;
  text?: string;
  level?: "h1" | "h2" | "h3";
  color?: string;
  align?: "left" | "center" | "right";
  items?: { label: string; value?: string; price?: number; quantity?: number }[];
  url?: string;
  alt?: string;
  caption?: string;
  faqs?: { question: string; answer: string }[];
  question?: publicQuestion;
  columns?: string[][];
  /** Structured visual payloads. Each keeps its own type and editability. */
  chart?: ChartSpec;
  diagram?: DiagramSpec;
  icon?: IconSpec;
  svg?: string;
  /** Where the visual came from and what its licence allows. */
  attribution?: string;
  source?: string;
  meta?: Record<string, string | number | boolean>;
}

export interface DocContent {
  blocks: Block[];
  /** The brief fields and settings travel inside the document content. */
  drafted?: boolean;
  problem?: string;
  sections?: string[];
  packages?: { name?: string; price?: number; description?: string }[];
  currency?: string;
  timeline?: string;
  tone?: string;
  faqs?: { question: string; answer: string }[];
  questions?: publicQuestion[];
  call_to_action?: string;
  target_audience?: string;
  scope?: string;
  payment_terms?: string;
  revisions?: string;
  cancellation?: string;
  brand_primary?: string;
  brand_secondary?: string;
  page_background?: string;
  max_width?: number;
  font_family?: string;
  base_font_size?: number;
  page_padding?: number;
}
