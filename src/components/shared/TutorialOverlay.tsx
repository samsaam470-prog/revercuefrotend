import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { onboardingApi } from "../../api/onboarding";
import { useAuth } from "../../hooks/useAuth";

const STEPS = [
  { title: "Welcome", body: "This is the thread. Five modules, one client record. Ten short steps, then you are on your own." },
  { title: "New proposal", body: "Create proposal is always the gold button. It opens the requirement form, then the builder, then the share sheet." },
  { title: "New contract", body: "Contracts follow proposals. Approve, Decline or I Have Questions, then the next step in the thread." },
  { title: "New form", body: "Forms collect requirements. Branching is available on Growth and Scale." },
  { title: "New invoice", body: "Invoices are tables: line items, tax, payment link or account details with proof." },
  { title: "Recent activity", body: "The activity feed is the last card on the dashboard. Every open, answer and payment lands there." },
  { title: "Follow-ups due", body: "Follow-ups come from the communication log. Mark one done and it disappears from this count." },
  { title: "CRM", body: "The client record builds itself from the documents. There is nothing to type twice." },
  { title: "Settings", body: "Profile, plan, security, notifications, saved libraries and the transparency page." },
  { title: "Done", body: "That is the whole product. The Free plan is available now; the paid plans are invite-only." },
];

export function TutorialOverlay({ onFinish }: { onFinish?: () => void }) {
  const { user, refresh } = useAuth();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && user.tutorial_completed === false) setOpen(true);
  }, [user]);

  const finish = async (body: { completed: boolean } | { skipped: boolean }) => {
    try {
      await onboardingApi.tutorial(body);
      await refresh();
    } catch {
      /* the overlay closes regardless */
    }
    setOpen(false);
    onFinish?.();
  };

  if (!open) return null;

  const step = STEPS[index];
  const last = index === STEPS.length - 1;

  return (
    <Modal
      open={open}
      onClose={() => void finish({ skipped: true })}
      title={`${index + 1} of ${STEPS.length} — ${step.title}`}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={() => void finish({ skipped: true })}>
            Skip
          </Button>
          {index > 0 && (
            <Button variant="secondary" onClick={() => setIndex((value) => value - 1)}>
              Back
            </Button>
          )}
          {last ? (
            <Button onClick={() => void finish({ completed: true })}>Done</Button>
          ) : (
            <Button onClick={() => setIndex((value) => value + 1)}>Next</Button>
          )}
        </>
      }
    >
      <p className="muted">{step.body}</p>
      <p className="caption mt-4">
        The overlay stays until you finish or skip. Escape closes it, and the skip is recorded honestly.
      </p>
    </Modal>
  );
}
