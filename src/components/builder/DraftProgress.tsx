import { Check, Loader2 } from "lucide-react";
import { DRAFT_STAGES, type DraftStage } from "../../lib/pipeline";

const LABELS: Record<DraftStage, string> = {
  brief: "Reading your brief",
  industry: "Searching industries",
  service: "Taking a look at your service",
  write: "Making the draft",
  visuals: "Adding visuals",
  render: "Rendering the page",
};

/**
 * The staged screen between the template choice and the canvas. Each line
 * appears when that stage actually starts, and stays marked until the next
 * one does; the canvas replaces this only once the last stage is done.
 */
export function DraftProgress({ stage, clientName }: { stage: DraftStage; clientName: string }) {
  const currentIndex = Math.max(0, DRAFT_STAGES.indexOf(stage));

  return (
    <div className="draft-progress" role="status" aria-live="polite">
      <div className="draft-progress-card">
        <p className="eyebrow">First draft</p>
        <h2 className="serif">Writing the first draft for {clientName}.</h2>
        <p className="muted">This takes a few seconds. Everything it writes stays editable.</p>

        <ol className="draft-progress-list">
          {DRAFT_STAGES.map((item, index) => {
            if (index > currentIndex) return null;
            const done = index < currentIndex;
            return (
              <li key={item} className={done ? "done" : "active"}>
                <span className="draft-progress-mark" aria-hidden="true">
                  {done ? <Check size={12} /> : <Loader2 size={12} className="spin" />}
                </span>
                {LABELS[item]}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
