import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { scoreBand, type Review } from "../../lib/analysis";

export interface DocumentReviewProps {
  review: Review | null;
  onClose: () => void;
  onPublishAnyway: () => void;
  publishing?: boolean;
}

export function DocumentReview({ review, onClose, onPublishAnyway, publishing = false }: DocumentReviewProps) {
  return (
    <Modal open={Boolean(review)} onClose={onClose} title="The review" size="md">
      {review && (
        <div className="stack-4">
          <div className="review-score">
            <span className="review-number">{review.score}</span>
            <div>
              <p className="review-band">{scoreBand(review.score)}</p>
              <p className="caption">
                Automated structure and writing checks. This is a guide, not a fact-check or a publishing gate.
              </p>
            </div>
          </div>

          {review.issues.length === 0 ? (
            <p className="muted">No issues were flagged by these checks. Review the facts, scope and figures yourself before publishing.</p>
          ) : (
            <ul className="review-issues">
              {review.issues.map((issue, index) => (
                <li key={`${issue.source}-${index}`}>
                  <span className="review-tag">{issue.source}</span>
                  <span className="muted">{issue.text}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="between">
            <Button variant="ghost" onClick={onClose}>
              Keep editing
            </Button>
            <Button onClick={onPublishAnyway} disabled={publishing}>Publish anyway</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
