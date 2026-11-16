import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { scoreBand, type Review } from "../../lib/analysis";

export interface DocumentReviewProps {
  review: Review | null;
  onClose: () => void;
  onPublishAnyway: () => void;
}

export function DocumentReview({ review, onClose, onPublishAnyway }: DocumentReviewProps) {
  return (
    <Modal open={Boolean(review)} onClose={onClose} title="The review" size="md">
      {review && (
        <div className="stack-4">
          <div className="review-score">
            <span className="review-number">{review.score}</span>
            <div>
              <p className="review-band">{scoreBand(review.score)}</p>
              <p className="caption">
                The structure and the prose, read once. It is a signal, not a gate.
              </p>
            </div>
          </div>

          {review.issues.length === 0 ? (
            <p className="muted">Nothing stood out. The sections, the pricing and the close are in place.</p>
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

          {review.helperUsed && (
            <p className="caption">
              The readability pass ran on this device. The text did not leave the browser.
            </p>
          )}

          <div className="between">
            <Button variant="ghost" onClick={onClose}>
              Keep editing
            </Button>
            <Button onClick={onPublishAnyway}>Publish anyway</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
