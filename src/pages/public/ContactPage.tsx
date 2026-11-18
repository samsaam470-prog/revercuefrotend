import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { marketingApi } from "../../api/public";
import { emailSchema } from "../../lib/validators";
import { errorMessage } from "../../lib/errors";
import { PUBLIC_EMAILS, mailto } from "../../lib/contact";
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
            <p className="eyebrow">Email us directly</p>
            <ul className="contact-channels">
              <li>
                <span className="contact-channel-role">General enquiries</span>
                <a href={mailto(PUBLIC_EMAILS.hello)}>{PUBLIC_EMAILS.hello}</a>
              </li>
              <li>
                <span className="contact-channel-role">Customer support</span>
                <a href={mailto(PUBLIC_EMAILS.support)}>{PUBLIC_EMAILS.support}</a>
              </li>
              <li>
                <span className="contact-channel-role">Business and collaboration</span>
                <a href={mailto(PUBLIC_EMAILS.marketing)}>{PUBLIC_EMAILS.marketing}</a>
              </li>
              <li>
                <span className="contact-channel-role">Billing enquiries</span>
                <a href={mailto(PUBLIC_EMAILS.billing)}>{PUBLIC_EMAILS.billing}</a>
              </li>
            </ul>
            <p className="caption" style={{ marginTop: 12 }}>
              The form is still the fastest route: it reaches the team with the context to answer
              properly, and it is the only route into the support dashboard.
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
              Use this form for a bug report, or the feedback form in Settings → Feedback if you are
              signed in, so we get the account details with the report.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
