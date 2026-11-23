import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { marketingApi } from "../../api/public";
import { emailSchema } from "../../lib/validators";
import { ApiError } from "../../types/api";
import { errorMessage } from "../../lib/errors";
import { useToast } from "../../hooks/useToast";

export interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  plan?: string;
  title?: string;
  description?: string;
  cta?: string;
}

export function WaitlistModal({
  open,
  onClose,
  plan,
  title,
  description,
  cta = "Join the beta",
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const toast = useToast();

  const submit = async () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await marketingApi.waitlist({ email, plan });
      setDone(true);
      toast.success("You're on the list. We'll be in touch.");
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setDone(false);
      setEmail("");
      setError("");
    }, 200);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={title || (plan === "teams" ? "Join the beta" : "Join the beta")}
      size="sm"
      footer={
        done ? (
          <Button onClick={close}>Done</Button>
        ) : (
          <>
            <Button variant="ghost" onClick={close} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={submit} loading={loading} disabled={!email}>
              {cta}
            </Button>
          </>
        )
      }
    >
      {done ? (
        <div className="stack-3">
          <p>
            You're on the list. We'll be in touch.
            {plan === "teams"
              ? " Teams is in beta. The team is testing the team features with a small group and will reach out when a spot opens."
              : " Starter, Growth and Scale are now publicly available via checkout. This form is only for the Teams beta."}
          </p>
          <p className="caption">The Free plan is available now, no invitation needed.</p>
        </div>
      ) : (
        <div className="stack-4">
          <p className="muted">
            {description ||
              "Teams is in beta. Leave your email to join the Teams beta. Starter, Growth and Scale are publicly available via checkout."}
          </p>
          <Input
            id="waitlist-email"
            label="Email address"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              if (error) setError("");
            }}
            error={error}
            helper="One email when a spot opens. Nothing else."
            onKeyDown={(event) => {
              if (event.key === "Enter") void submit();
            }}
            autoComplete="email"
          />
        </div>
      )}
    </Modal>
  );
}
