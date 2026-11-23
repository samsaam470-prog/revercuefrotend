import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Fieldset } from "../../components/ui/Fieldset";
import { Button } from "../../components/ui/Button";
import { marketingApi } from "../../api/public";
import { emailSchema } from "../../lib/validators";
import { SERVICE_OPTIONS } from "../../lib/constants";
import { PUBLIC_EMAILS, mailto } from "../../lib/contact";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

const ACCOUNT_TYPES = [
  { value: "freelancer", label: "Freelancer" },
  { value: "agency", label: "Agency" },
];
const VOLUMES = ["1–3", "4–10", "11–20", "20+"].map((value) => ({ value, label: value }));

export function BetaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("freelancer");
  const [services, setServices] = useState<string[]>([]);
  const [volume, setVolume] = useState("4–10");
  const [whatToTest, setWhatToTest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const toggleService = (service: string) => {
    setServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    );
  };

  const valid = name.trim() && emailSchema.safeParse(email).success && services.length > 0;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Enter your name.";
    if (!emailSchema.safeParse(email).success) nextErrors.email = "Enter a valid email address.";
    if (services.length === 0) nextErrors.services = "Pick at least one service.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setFormError("");
    try {
      await marketingApi.beta({
        name,
        email,
        account_type: accountType,
        services,
        proposals_per_month: volume,
        what_to_test: whatToTest || undefined,
      });
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
        <p className="eyebrow">Beta</p>
        <h1>Help shape the thread.</h1>
        <p>
          Teams is in beta. The team is testing the team features with a small group and will reach
          out when a spot opens.
        </p>
      </div>

      <section className="card card-lg stack-3" style={{ marginBottom: 24 }}>
        <p className="eyebrow">A message from the founder</p>
        <h2 className="serif" style={{ fontSize: 26 }}>Why Teams is in beta</h2>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          I spent 21 months freelancing and saw how quickly client work becomes difficult when a
          small team has to hand work over, approve decisions, and keep context in sync. I do not
          want to guess what teams need from a distance. I want to learn from real teams using the
          workflow.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          This beta is where we test the practical details: joining a team, roles and permissions,
          shared proposals and contracts, and the points where a handoff slows work down. Teams is
          not finished. Some capabilities are being tested; others are still being shaped by what
          we learn.
        </p>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          Applying does not automatically start a paid subscription, and your account will not be
          changed without hearing from us first. If you join, tell us how your team works, what gets
          stuck, and what would make the workflow genuinely useful. Your feedback will help decide
          what we build next.
        </p>
        <p className="caption">— Founder, Revercue</p>
      </section>

      <div className="two-up" style={{ alignItems: "start" }}>
        {sent ? (
          <div className="card card-lg stack-3">
            <CheckCircle2 size={28} color="var(--green)" />
            <h2 className="serif" style={{ fontSize: 24 }}>
              Thanks. We review every application.
            </h2>
            <p className="muted">
              If you're a fit, you'll hear from us within 5 business days.
            </p>
          </div>
        ) : (
          <form className="card card-lg stack-4" onSubmit={submit} noValidate>
            <Input
              id="beta-name"
              label="Name"
              value={name}
              onChange={setName}
              error={errors.name}
              required
              autoComplete="name"
            />
            <Input
              id="beta-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required
              autoComplete="email"
            />
            <Select
              id="beta-account"
              label="Account type"
              value={accountType}
              options={ACCOUNT_TYPES}
              onChange={setAccountType}
            />
            <Fieldset legend="Services you offer" error={errors.services} id="beta-services">
              {SERVICE_OPTIONS.map((service) => (
                <Checkbox
                  key={service}
                  id={`beta-service-${service}`}
                  label={service}
                  checked={services.includes(service)}
                  onChange={() => toggleService(service)}
                />
              ))}
            </Fieldset>
            <Select
              id="beta-volume"
              label="Proposals per month"
              value={volume}
              options={VOLUMES}
              onChange={setVolume}
            />
            <Textarea
              id="beta-notes"
              label="What do you want to test?"
              helper="Optional. One or two sentences is plenty."
              value={whatToTest}
              onChange={setWhatToTest}
              rows={3}
            />
            {formError && <p className="notice notice-red">{formError}</p>}
            <Button type="submit" loading={loading} disabled={!valid} fullWidth>
              Apply for beta
            </Button>
          </form>
        )}

        <div className="stack-4">
          <div className="card card-md stack-3">
            <h3>Beta enquiries</h3>
            <p className="muted" style={{ fontSize: 14 }}>
              Questions about the beta programme before you apply? Email{" "}
              <a href={mailto(PUBLIC_EMAILS.beta)}>{PUBLIC_EMAILS.beta}</a>.
            </p>
            <p className="caption">
              The email is for questions only. Applications are still submitted with the form on
              this page, and they are reviewed from the beta queue in the admin dashboard.
            </p>
          </div>
          <div className="card card-md stack-3">
            <h3>What the beta is</h3>
            <p className="muted" style={{ fontSize: 14 }}>
              Teams is the agency plan: the Handoff Dashboard, the team roles, the bulk transfer, the
              audit log and the team attribution. The team is testing those features with a small
              group before they open the plan.
            </p>
            <p className="muted" style={{ fontSize: 14 }}>
              You can join from this page. If a spot is free, the team reaches out with the next
              steps. Free is available now, no invitation needed.
            </p>
          </div>
          <p className="caption">
            Team seats are handled manually while Teams is in beta, so an application is a
            conversation, not a checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
