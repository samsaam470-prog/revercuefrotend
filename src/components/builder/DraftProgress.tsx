import { Check, Circle, Loader2, Minus } from "lucide-react";
import { DRAFT_STAGES, type DraftStage, type DraftStageStatus } from "../../lib/pipeline";

const LABELS: Record<DraftStage, string> = {
  context: "Client and profile context",
  research: "Client and industry research",
  structure: "Document structure",
  writing: "Draft content",
  visuals: "Visual assets",
  checks: "Accuracy and editability checks",
};

const DEFAULT_DETAILS: Record<DraftStage, string> = {
  context: "Loading the brief and selected template",
  research: "Looking for relevant public sources",
  structure: "Organising sections for this document",
  writing: "Writing from the information provided",
  visuals: "Finding suitable real assets",
  checks: "Checking the draft before opening the editor",
};

export type DraftProgressState = Partial<Record<DraftStage, { status: DraftStageStatus; detail?: string }>>;

export function DraftProgress({
  stage,
  clientName,
  statuses,
  documentLabel = "document",
}: {
  stage: DraftStage;
  clientName: string;
  statuses?: DraftProgressState;
  documentLabel?: string;
}) {
  return (
    <div className="draft-progress" role="status" aria-live="polite">
      <div className="draft-progress-card">
        <p className="eyebrow">Preparing your draft</p>
        <h2 className="serif">Putting the {documentLabel} together for {clientName}.</h2>
        <p className="muted">These are the actual preparation steps. Your draft stays editable and is not shared or published.</p>
        <ol className="draft-progress-list">
          {DRAFT_STAGES.map((item) => {
            const status = statuses?.[item]?.status ?? (item === stage ? "running" : "pending");
            const detail = statuses?.[item]?.detail || DEFAULT_DETAILS[item];
            return (
              <li key={item} className={"draft-progress-item " + status}>
                <span className="draft-progress-mark" aria-hidden="true">
                  {status === "done" ? <Check size={13} />
                    : status === "running" ? <Loader2 size={13} className="spin" />
                      : status === "skipped" ? <Minus size={13} />
                        : <Circle size={8} />}
                </span>
                <span className="draft-progress-copy">
                  <strong>{LABELS[item]}</strong>
                  <small>{detail}</small>
                </span>
                <span className="draft-progress-state">
                  {status === "done" ? "Done" : status === "running" ? "Working" : status === "skipped" ? "Skipped" : "Waiting"}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
