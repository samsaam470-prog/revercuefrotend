import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";
import { Checkbox } from "../../components/ui/Checkbox";
import { Fieldset } from "../../components/ui/Fieldset";
import { Button } from "../../components/ui/Button";
import { onboardingApi, type OnboardingProfile } from "../../api/onboarding";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { SERVICE_OPTIONS } from "../../lib/constants";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

const VOLUMES = ["1–3", "4–10", "11–20", "20+"].map((value) => ({ value, label: value }));
const AGENCY_SIZES = ["2–5", "6–10", "11–25", "25+"].map((value) => ({ value, label: value }));
const WEBSITE_TYPES = ["Portfolio", "Business site", "Store", "Blog", "None yet"].map((value) => ({
  value,
  label: value,
}));
const TIMELINES = ["This week", "This month", "No rush"].map((value) => ({ value, label: value }));

export function OnboardingStep2Page() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState(user?.name || "");
  const [business, setBusiness] = useState(user?.business_name || "");
  const [agencyName, setAgencyName] = useState("");
  const [agencySize, setAgencySize] = useState("2–5");
  const [services, setServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const [volume, setVolume] = useState("4–10");
  const [website, setWebsite] = useState(user?.website || "");
  const [fiverr, setFiverr] = useState(user?.fiverr_profile || "");
  const [brandPrimary, setBrandPrimary] = useState(user?.brand_primary || "#c9a961");
  const [brandSecondary, setBrandSecondary] = useState(user?.brand_secondary || "#1a1a1a");

  const [askWebsite, setAskWebsite] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpType, setHelpType] = useState("Portfolio");
  const [helpBusiness, setHelpBusiness] = useState("");
  const [helpTimeline, setHelpTimeline] = useState("This month");
  const [helpNotes, setHelpNotes] = useState("");
  const [helpSent, setHelpSent] = useState(false);

  const [error, setError] = useState("");
  const [servicesError, setServicesError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.onboarding_step && user.onboarding_step > 2) {
      navigate("/onboarding/step-4", { replace: true });
    }
  }, [user?.onboarding_step, navigate]);

  const isAgency = user?.account_type === "agency";

  const toggleService = (service: string) => {
    setServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    );
    setServicesError("");
  };

  const persist = async () => {
    if (!name.trim()) {
      setError("Your name is required.");
      return false;
    }
    if (services.length === 0) {
      setServicesError("Pick at least one service.");
      return false;
    }
    if (services.includes("Other") && !otherService.trim()) {
      setServicesError("Name the other service, or unselect Other.");
      return false;
    }
    const finalServices = services.includes("Other") && otherService.trim()
      ? [...services, otherService.trim()]
      : services;
    const businessName = (isAgency ? agencyName || business : business).trim();

    /*
     * Only send fields that carry a value. An empty string is not the same as an
     * absent field to the API: the optional columns expect a real value or
     * nothing at all, and a stray "" has been the cause of a 500 on this route.
     */
    const profile: OnboardingProfile = {
      name: name.trim(),
      services: finalServices,
      volume_per_month: volume,
      ...(businessName ? { business_name: businessName } : {}),
      ...(website.trim() ? { website: website.trim() } : {}),
      ...(fiverr.trim() ? { fiverr_profile: fiverr.trim() } : {}),
      ...(isAgency && agencyName.trim() ? { agency_name: agencyName.trim() } : {}),
      ...(isAgency ? { agency_size: agencySize } : {}),
      ...(brandPrimary ? { brand_primary: brandPrimary } : {}),
      ...(brandSecondary ? { brand_secondary: brandSecondary } : {}),
    };

    const minimal: OnboardingProfile = {
      name: profile.name,
      services: finalServices,
      volume_per_month: volume,
    };

    setLoading(true);
    setError("");
    try {
      try {
        await onboardingApi.step2(profile);
      } catch (cause) {
        const apiError = cause as ApiError;
        // A 5xx on the optional columns should not block onboarding: the three
        // documented core fields are enough to advance the step.
        if (apiError.status >= 500) {
          await onboardingApi.step2(minimal);
        } else {
          throw cause;
        }
      }
      sessionStorage.setItem("revercue_volume", volume);
      await refresh();
      navigate("/onboarding/step-4");
      return true;
    } catch (cause) {
      const apiError = cause as ApiError;
      const message = errorMessage(apiError.code, apiError.message);
      console.error("[onboarding/step-2] save failed", {
        status: apiError.status,
        code: apiError.code,
        message: apiError.message,
        details: apiError.details,
      });
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const onContinue = async () => {
    if (!website.trim()) {
      setAskWebsite(true);
      return;
    }
    await persist();
  };

  const sendWebsiteHelp = async () => {
    setLoading(true);
    try {
      await onboardingApi.websiteHelp({
        name,
        email: user?.email || "",
        website_type: helpType,
        business: helpBusiness || business || "Not specified",
        timeline: helpTimeline,
        notes: helpNotes || undefined,
      });
      setHelpSent(true);
      toast.success("Sent. The team will reach out about the site.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-card">
      <div className="steps-indicator">
        <span className="done" />
        <span className="done" />
        <span />
        <span />
      </div>
      <p className="eyebrow">Step 2 of 4</p>
      <h1>Tell us about your work.</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        This fills the builder defaults and decides which templates are marked Suggested.
      </p>

      <div className="stack-4">
        <Input id="ob-name" label="Your name" value={name} onChange={setName} required autoComplete="name" />
        {!isAgency ? (
          <Input
            id="ob-business"
            label="Business name"
            value={business}
            onChange={setBusiness}
            helper="Optional. It appears on client documents."
          />
        ) : (
          <>
            <Input id="ob-agency-name" label="Agency name" value={agencyName} onChange={setAgencyName} />
            <Select
              id="ob-agency-size"
              label="Agency size"
              value={agencySize}
              options={AGENCY_SIZES}
              onChange={setAgencySize}
            />
          </>
        )}

        <Input
          id="ob-email"
          label="Email"
          value={user?.email || ""}
          onChange={() => undefined}
          disabled
          helper="To change your email, contact support."
        />

        <Fieldset legend="Services you offer" error={servicesError} id="ob-services">
          {SERVICE_OPTIONS.map((service) => (
            <Checkbox
              key={service}
              id={`ob-service-${service}`}
              label={service}
              checked={services.includes(service)}
              onChange={() => toggleService(service)}
            />
          ))}
          {services.includes("Other") && (
            <Input
              id="ob-service-other"
              label="Which other service?"
              value={otherService}
              onChange={setOtherService}
            />
          )}
        </Fieldset>

        <Select
          id="ob-volume"
          label="Proposals per month"
          value={volume}
          options={VOLUMES}
          onChange={setVolume}
          helper="It decides the recommended plan, nothing else."
        />

        <Input
          id="ob-website"
          label="Website (optional)"
          type="url"
          value={website}
          onChange={(value) => {
            setWebsite(value);
            if (value) setAskWebsite(false);
          }}
          helper="Optional. Used on your client documents."
          placeholder="https://"
        />
        <Input
          id="ob-fiverr"
          label="Fiverr profile (optional)"
          type="url"
          value={fiverr}
          onChange={setFiverr}
          helper="Optional. Only if you take work there."
          placeholder="https://fiverr.com/"
        />

        {askWebsite && (
          <div className="card card-md stack-3" style={{ borderColor: "rgba(201,169,97,.4)" }}>
            <strong>You didn't add a website. Do you have one?</strong>
            <p className="caption">A link makes the client pages feel finished. It is optional.</p>
            <div className="inline">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setAskWebsite(false);
                  document.getElementById("ob-website")?.focus();
                }}
              >
                Add it
              </Button>
              <Button variant="ghost" size="sm" onClick={() => void persist()}>
                Skip
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setHelpOpen((value) => !value)}>
                I need help
              </Button>
            </div>
            {helpOpen && (
              <div className="stack-3" style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                {helpSent ? (
                  <p className="success" style={{ color: "var(--green)" }}>
                    Sent. The team will reach out about the site, and you can continue now.
                  </p>
                ) : (
                  <>
                    <Select
                      id="help-type"
                      label="Website type"
                      value={helpType}
                      options={WEBSITE_TYPES}
                      onChange={setHelpType}
                    />
                    <Input
                      id="help-business"
                      label="What is the business?"
                      value={helpBusiness}
                      onChange={setHelpBusiness}
                      helper="One sentence is enough."
                    />
                    <Select
                      id="help-timeline"
                      label="Timeline"
                      value={helpTimeline}
                      options={TIMELINES}
                      onChange={setHelpTimeline}
                    />
                    <Textarea
                      id="help-notes"
                      label="Anything else?"
                      value={helpNotes}
                      onChange={setHelpNotes}
                      rows={3}
                    />
                    <div>
                      <Button variant="secondary" size="sm" onClick={sendWebsiteHelp} loading={loading}>
                        Send to the team
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <div className="two-up">
          <div className="input-group">
            <label htmlFor="brand-primary">Brand primary</label>
            <input
              id="brand-primary"
              type="color"
              value={brandPrimary}
              onChange={(event) => setBrandPrimary(event.target.value)}
              style={{ height: 42, padding: 4 }}
            />
            <span className="helper">Used for the accent on your documents.</span>
          </div>
          <div className="input-group">
            <label htmlFor="brand-secondary">Brand secondary</label>
            <input
              id="brand-secondary"
              type="color"
              value={brandSecondary}
              onChange={(event) => setBrandSecondary(event.target.value)}
              style={{ height: 42, padding: 4 }}
            />
            <span className="helper">Used for the page background of your documents.</span>
          </div>
        </div>
      </div>

      {error && <p className="notice notice-red mt-6">{error}</p>}

      <div className="between mt-8">
        <span className="caption">Everything here can change later in Settings.</span>
        <Button onClick={onContinue} loading={loading} disabled={!name.trim()}>
          Continue
        </Button>
      </div>
    </div>
  );
}
