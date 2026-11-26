import { useState } from "react";
import type { DemoBrief } from "./api";

const INDUSTRIES = [
  "SaaS",
  "E-commerce",
  "Agency",
  "Professional services",
  "Restaurant & hospitality",
  "Real estate",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Non-profit",
  "Other",
];

const SERVICES = [
  "Web design",
  "Web development",
  "Brand identity",
  "SEO",
  "Content & copywriting",
  "Video production",
  "Marketing strategy",
  "Consulting",
  "Other",
];

const TONES: DemoBrief["tone"][] = ["Formal", "Friendly", "Direct", "Consultative"];

const SECTION_CHOICES = [
  "Executive Summary",
  "Understanding Your Goals",
  "Proposed Approach",
  "Scope of Work",
  "Deliverables",
  "Timeline",
  "Investment",
  "Next Steps",
];

const DEFAULT_SECTIONS = [
  "Executive Summary",
  "Understanding Your Goals",
  "Proposed Approach",
  "Scope of Work",
  "Deliverables",
  "Timeline",
  "Investment",
  "Next Steps",
];

export function emptyBrief(): DemoBrief {
  return {
    businessName: "",
    clientName: "",
    title: "",
    industry: "",
    service: "",
    problem: "",
    requirements: "",
    scope: "",
    deliverables: "",
    timeline: "",
    budget: "",
    paymentTerms: "",
    tone: "Formal",
    sections: DEFAULT_SECTIONS,
    packages: [],
    targetAudience: "",
    additional: "",
  };
}

export function validateBrief(brief: DemoBrief): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!brief.clientName.trim()) errors.clientName = "Add the client's or company's name.";
  if (!brief.problem.trim() || brief.problem.trim().length < 10) {
    errors.problem = "Describe the client's situation in at least 10 characters.";
  }
  if (!brief.service.trim()) errors.service = "Say what you are proposing.";
  if (brief.sections.length === 0) errors.sections = "Choose at least one section.";
  return errors;
}

export function DemoForm({
  brief,
  onChange,
  onSubmit,
  busy,
}: {
  brief: DemoBrief;
  onChange: (next: DemoBrief) => void;
  onSubmit: () => void;
  busy: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMore, setShowMore] = useState(false);

  const set = <K extends keyof DemoBrief>(key: K, value: DemoBrief[K]) => {
    onChange({ ...brief, [key]: value });
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const toggleSection = (section: string) => {
    set(
      "sections",
      brief.sections.includes(section)
        ? brief.sections.filter((item) => item !== section)
        : SECTION_CHOICES.filter((item) => item === section || brief.sections.includes(item))
    );
  };

  const updatePackage = (index: number, patch: Partial<DemoBrief["packages"][number]>) => {
    set(
      "packages",
      brief.packages.map((item, at) => (at === index ? { ...item, ...patch } : item))
    );
  };

  const submit = () => {
    const next = validateBrief(brief);
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit();
  };

  const field = (label: string, key: keyof DemoBrief, placeholder: string, opts: { area?: boolean; hint?: string } = {}) => (
    <label className="demo-field">
      <span>{label}</span>
      {opts.area ? (
        <textarea
          rows={3}
          value={String(brief[key] ?? "")}
          placeholder={placeholder}
          onChange={(event) => set(key, event.target.value as never)}
        />
      ) : (
        <input
          value={String(brief[key] ?? "")}
          placeholder={placeholder}
          onChange={(event) => set(key, event.target.value as never)}
        />
      )}
      {opts.hint && <small>{opts.hint}</small>}
      {errors[key] && <small className="demo-error">{errors[key]}</small>}
    </label>
  );

  return (
    <form
      className="demo-form"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="demo-field-row">
        {field("Client or company", "clientName", "Northwind Studio")}
        {field("Your business", "businessName", "Aster & Co.")}
      </div>
      {errors.clientName && <p className="demo-error">{errors.clientName}</p>}

      <label className="demo-field">
        <span>Industry</span>
        <select value={brief.industry} onChange={(event) => set("industry", event.target.value)}>
          <option value="">Choose an industry</option>
          {INDUSTRIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <div className="demo-field-row">
        <label className="demo-field">
          <span>What are you proposing?</span>
          <select value={brief.service} onChange={(event) => set("service", event.target.value)}>
            <option value="">Choose a service</option>
            {SERVICES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.service && <small className="demo-error">{errors.service}</small>}
        </label>
        <label className="demo-field">
          <span>Tone</span>
          <select value={brief.tone} onChange={(event) => set("tone", event.target.value as DemoBrief["tone"])}>
            {TONES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {field(
        "The client's situation",
        "problem",
        "What is the client trying to fix, launch or grow? What does success look like?",
        { area: true, hint: "Required. The more specific this is, the less generic the proposal." }
      )}

      {field("Scope you have in mind", "scope", "What work is in scope, and what is explicitly out of scope?", { area: true })}

      <fieldset className="demo-sections">
        <legend>Sections</legend>
        <div className="demo-chips">
          {SECTION_CHOICES.map((section) => {
            const active = brief.sections.includes(section);
            return (
              <button
                type="button"
                key={section}
                className={"demo-chip " + (active ? "is-on" : "")}
                aria-pressed={active}
                onClick={() => toggleSection(section)}
              >
                {section}
              </button>
            );
          })}
        </div>
        {errors.sections && <p className="demo-error">{errors.sections}</p>}
      </fieldset>

      {showMore && (
        <div className="demo-more">
          {field("Client requirements and objectives", "requirements", "Objectives, must-haves, constraints, deadlines.", { area: true })}
          {field("Deliverables", "deliverables", "What the client receives, in their words.", { area: true })}
          {field("Timeline and milestones", "timeline", "One milestone per line, e.g. 'Week 1 — discovery'.\nWeek 1 — discovery", { area: true, hint: "Real milestones become a diagram in the document." })}
          <div className="demo-field-row">
            {field("Budget", "budget", "£8,000 total")}
            {field("Payment terms", "paymentTerms", "50% deposit, 50% on delivery")}
          </div>
          {field("Audience", "targetAudience", "Who inside the client reads this?")}
          {field("Anything else", "additional", "Context that should shape the writing.", { area: true })}

          <div className="demo-packages">
            <div className="demo-packages-head">
              <span>Packages (optional)</span>
              <button
                type="button"
                className="demo-link"
                onClick={() => set("packages", [...brief.packages, { name: "", price: undefined, deliverables: "" }])}
              >
                Add a package
              </button>
            </div>
            {brief.packages.map((pkg, index) => (
              <div className="demo-package-row" key={index}>
                <input
                  aria-label={`Package ${index + 1} name`}
                  placeholder="Name"
                  value={pkg.name}
                  onChange={(event) => updatePackage(index, { name: event.target.value })}
                />
                <input
                  aria-label={`Package ${index + 1} price`}
                  placeholder="Price"
                  inputMode="decimal"
                  value={pkg.price ?? ""}
                  onChange={(event) => {
                    const raw = event.target.value.replace(/[^0-9.]/g, "");
                    updatePackage(index, { price: raw ? Number(raw) : undefined });
                  }}
                />
                <input
                  aria-label={`Package ${index + 1} deliverables`}
                  placeholder="What is included"
                  value={pkg.deliverables}
                  onChange={(event) => updatePackage(index, { deliverables: event.target.value })}
                />
                <button
                  type="button"
                  className="demo-link"
                  onClick={() => set("packages", brief.packages.filter((_, at) => at !== index))}
                >
                  Remove
                </button>
              </div>
            ))}
            {brief.packages.some((pkg) => pkg.name.trim() && typeof pkg.price === "number") && (
              <small>Prices you add here may appear in a chart. Nothing is invented.</small>
            )}
          </div>
        </div>
      )}

      <div className="demo-form-actions">
        <button type="button" className="demo-link" onClick={() => setShowMore((value) => !value)}>
          {showMore ? "Hide optional detail" : "Add optional detail"}
        </button>
        <button type="submit" className="demo-button demo-button-primary" disabled={busy}>
          {busy ? "Generating…" : "Generate my proposal"}
        </button>
      </div>

      <p className="demo-note">
        Do not paste confidential client information, passwords, bank details or sensitive personal data. This public demo
        stores nothing on our servers; the draft lives in this tab only.
      </p>
    </form>
  );
}
