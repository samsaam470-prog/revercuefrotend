import { CodeVisual, type VisualName } from "./index";

/**
 * A cover is a screenshot of the screen the piece is about: the real product
 * component, mounted in a window frame on warm paper. Not stock photography,
 * not abstract art — the same UI the reader will meet inside the app.
 */
const ROUTE: Record<VisualName, string> = {
  DashboardVisual: "revercue.com/dashboard",
  BuilderVisual: "revercue.com/builder",
  ProposalVisual: "revercue.com/p/acme",
  InvoiceVisual: "revercue.com/inv/0041",
  ContractVisual: "revercue.com/c/ref-4m",
  FormVisual: "revercue.com/f/intake",
  CrmVisual: "revercue.com/crm/acme",
  ChartVisual: "revercue.com/insights",
  SuggestionVisual: "revercue.com/suggest",
  CodeScreenVisual: "revercue.com/activate",
  SecurityVisual: "revercue.com/security",
  PricingVisual: "revercue.com/pricing",
};

const TAG: Record<VisualName, string> = {
  DashboardVisual: "Dashboard",
  BuilderVisual: "Builder",
  ProposalVisual: "Proposal",
  InvoiceVisual: "Invoice",
  ContractVisual: "Contract",
  FormVisual: "Form",
  CrmVisual: "Client",
  ChartVisual: "Insights",
  SuggestionVisual: "Suggestions",
  CodeScreenVisual: "Activation",
  SecurityVisual: "Security",
  PricingVisual: "Plans",
};

/** Notes get the screen that carries their argument. */
const BLOG_VISUALS: Record<string, VisualName> = {
  "how-to-get-a-contract-signed-online": "ContractVisual",
  "the-thread-is-the-product": "DashboardVisual",
  "links-not-pdfs": "ProposalVisual",
  "patterns-not-magic": "SuggestionVisual",
  "the-client-record-builds-itself": "CrmVisual",
  "what-a-proposal-is-for": "ContractVisual",
};

export function blogVisual(slug: string): VisualName {
  return BLOG_VISUALS[slug] ?? "BuilderVisual";
}

export function ProductCover({
  visual,
  label,
  variant = "card",
  className = "",
}: {
  visual: VisualName;
  label?: string;
  variant?: "card" | "hero" | "sm";
  className?: string;
}) {
  return (
    <div
      className={`cover-shot cover-shot-${variant} ${className}`}
      role="img"
      aria-label={label ?? `${TAG[visual]} screen`}
      data-shot={visual}
    >
      <div className="cover-shot-window" aria-hidden="true">
        <div className="cover-shot-bar">
          <span className="cover-shot-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="cover-shot-url">{ROUTE[visual]}</span>
          <span className="cover-shot-tag">{TAG[visual]}</span>
        </div>
        <div className="cover-shot-screen">
          <CodeVisual name={visual} />
        </div>
      </div>
    </div>
  );
}
