import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { marketingApi } from "../../api/public";
import { emailSchema } from "../../lib/validators";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

const TOPICS = [
  { value: "question", label: "Question" },
  { value: "feedback", label: "Feedback" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("question");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const valid = name.trim() && email.trim() && message.trim() && emailSchema.safeParse(email).success;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Enter your name.";
    if (!emailSchema.safeParse(email).success) nextErrors.email = "Enter a valid email address.";
    if (!message.trim()) nextErrors.message = "Tell us what you need.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setFormError("");
    try {
      await marketingApi.contact({ name, email, topic, message });
      setSent(true);
    } catch (cause) {
      const apiError = cause as ApiError;
      setFormError(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-narrow">
      <div className="page-head">
        <p className="eyebrow">Contact</p>
        <h1>We read every message.</h1>
      </div>

      <div className="two-up" style={{ alignItems: "start" }}>
        {sent ? (
          <div className="card card-lg stack-3">
            <CheckCircle2 size={28} color="var(--green)" />
            <h2 className="serif" style={{ fontSize: 24 }}>
              Thanks. We read every message.
            </h2>
            <p className="muted">We'll reply to {email} within 1 business day.</p>
            <div>
              <Button variant="ghost" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          </div>
        ) : (
          <form className="card card-lg stack-4" onSubmit={submit} noValidate>
            <Input
              id="contact-name"
              label="Name"
              value={name}
              onChange={setName}
              error={errors.name}
              required
              autoComplete="name"
            />
            <Input
              id="contact-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              helper="We reply to this address."
              required
              autoComplete="email"
            />
            <Select
              id="contact-topic"
              label="Topic (optional)"
              value={topic}
              options={TOPICS}
              onChange={setTopic}
              helper="Optional. It helps us route the message."
            />
            <Textarea
              id="contact-message"
              label="Message"
              value={message}
              onChange={setMessage}
              error={errors.message}
              rows={6}
              required
            />
            {formError && <p className="notice notice-red">{formError}</p>}
            <Button type="submit" loading={loading} disabled={!valid} fullWidth>
              Send message
            </Button>
          </form>
        )}

        <div className="stack-4">
          <div>
            <p className="eyebrow">How to reach us</p>
            <p className="muted" style={{ fontSize: 14 }}>
              This form is the way in. It reaches the same inbox as everything else, and it gives us
              the context to answer properly. There is no public email address to copy.
            </p>
          </div>
          <div>
            <p className="eyebrow">Response time</p>
            <p className="muted" style={{ fontSize: 14 }}>
              Within 1 business day.
            </p>
          </div>
          <div>
            <p className="eyebrow">Bug reports</p>
            <p className="muted" style={{ fontSize: 14 }}>
              Use the feedback form in Settings → Feedback, so we get the account details with the
              report.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
