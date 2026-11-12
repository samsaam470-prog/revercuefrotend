import type { ReactNode } from "react";
import { DashboardVisual } from "./DashboardVisual";
import { BuilderVisual } from "./BuilderVisual";
import { ProposalVisual } from "./ProposalVisual";
import { InvoiceVisual } from "./InvoiceVisual";
import { ContractVisual } from "./ContractVisual";
import { FormVisual } from "./FormVisual";
import { CrmVisual } from "./CrmVisual";
import { ChartVisual } from "./ChartVisual";
import { SuggestionVisual } from "./SuggestionVisual";
import { CodeScreenVisual } from "./CodeScreenVisual";
import { SecurityVisual } from "./SecurityVisual";
import { PricingVisual } from "./PricingVisual";

export type VisualName =
  | "DashboardVisual"
  | "BuilderVisual"
  | "ProposalVisual"
  | "InvoiceVisual"
  | "ContractVisual"
  | "FormVisual"
  | "CrmVisual"
  | "ChartVisual"
  | "SuggestionVisual"
  | "CodeScreenVisual"
  | "SecurityVisual"
  | "PricingVisual";

const REGISTRY: Record<VisualName, () => ReactNode> = {
  DashboardVisual: () => <DashboardVisual />,
  BuilderVisual: () => <BuilderVisual />,
  ProposalVisual: () => <ProposalVisual />,
  InvoiceVisual: () => <InvoiceVisual />,
  ContractVisual: () => <ContractVisual />,
  FormVisual: () => <FormVisual />,
  CrmVisual: () => <CrmVisual />,
  ChartVisual: () => <ChartVisual />,
  SuggestionVisual: () => <SuggestionVisual />,
  CodeScreenVisual: () => <CodeScreenVisual />,
  SecurityVisual: () => <SecurityVisual />,
  PricingVisual: () => <PricingVisual />,
};

/**
 * The public site's visual: a real product component, never a screenshot.
 * `scale` is kept for the blueprint's API; the components are responsive instead
 * of transformed, so nothing clips on a phone.
 */
export function CodeVisual({
  name,
  scale = 1,
  className = "",
}: {
  name: VisualName;
  scale?: number;
  className?: string;
}) {
  const render = REGISTRY[name];
  return (
    <div
      className={className}
      style={scale !== 1 ? { zoom: scale } : undefined}
      data-visual={name}
    >
      {render()}
    </div>
  );
}

export {
  DashboardVisual,
  BuilderVisual,
  ProposalVisual,
  InvoiceVisual,
  ContractVisual,
  FormVisual,
  CrmVisual,
  ChartVisual,
  SuggestionVisual,
  CodeScreenVisual,
  SecurityVisual,
  PricingVisual,
};
