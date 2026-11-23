import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { proposalsApi, pipelineApi, type PackageInput } from "../../api/proposals";
import { saveResearch } from "../../lib/pipeline";
import { crmApi } from "../../api/crm";
import { settingsApi } from "../../api/settings";
import { ApiError } from "../../types/api";
import { errorMessage } from "../../lib/errors";
import {
  CURRENCIES,
  INDUSTRY_OPTIONS,
  SCROLL_LENGTHS,
  SECTION_OPTIONS,
  SERVICE_OPTIONS,
  TONES,
} from "../../lib/constants";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useToast } from "../../hooks/useToast";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { Fieldset } from "../ui/Fieldset";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import type { FormQuestion } from "../../types";

const blankPackages = (): PackageInput[] => [{ name: "", price: undefined, deliverables: "" }];

export function ProposalRequirementForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { limits, hasFeature } = usePlanGate();
  const canPrefillPackages = hasFeature("saved_packages");
  const canPrefillFaqs = hasFeature("saved_faqs");
  const [mode, setMode] = useState<"existing" | "new">("new");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [otherIndustry, setOtherIndustry] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [clientWebsite, setClientWebsite] = useState("");
  const [ownWebsite, setOwnWebsite] = useState("");
  const [problem, setProblem] = useState("");
  const [audience, setAudience] = useState("");
  const [cta, setCta] = useState("");
  const [sections, setSections] = useState<string[]>(["Introduction", "Scope", "Pricing"]);
  const [packages, setPackages] = useState<PackageInput[]>(blankPackages);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [questions, setQuestions] = useState<FormQuestion[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [timeline, setTimeline] = useState("");
  const [tone, setTone] = useState("Formal");
  const [scrollLength, setScrollLength] = useState("Medium");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [limitOpen, setLimitOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const savedPackages = useQuery({
    queryKey: ["settings", "saved-packages", "prefill"],
    queryFn: () => settingsApi.savedPackages(),
    enabled: canPrefillPackages,
  });
  const savedFaqsQuery = useQuery({
    queryKey: ["settings", "saved-faqs", "prefill"],
    queryFn: () => settingsApi.savedFaqs(),
    enabled: canPrefillFaqs,
  });

  const clients = useQuery({
    queryKey: ["crm", "clients", "picker"],
    queryFn: () => crmApi.list({ limit: 100 }),
  });
  const profile = useQuery({ queryKey: ["settings", "profile"], queryFn: settingsApi.getProfile });

  useEffect(() => {
    const website = profile.data?.profile.website;
    if (!ownWebsite.trim() && website) setOwnWebsite(website);
  }, [profile.data, ownWebsite]);

  const prefilled = useRef({ packages: false, faqs: false });

  /* Saved packages and saved FAQs are part of Growth and Scale; below that the
     rows stay blank and the helper says so. */
  useEffect(() => {
    if (!canPrefillPackages || prefilled.current.packages) return;
    const rows = savedPackages.data?.data ?? [];
    if (rows.length === 0) return;
    prefilled.current.packages = true;
    setPackages(
      rows.map((row) => ({
        name: row.name,
        price: row.price,
        deliverables: row.deliverables || row.description || "",
      })),
    );
  }, [canPrefillPackages, savedPackages.data]);

  useEffect(() => {
    if (!canPrefillFaqs || prefilled.current.faqs) return;
    const rows = savedFaqsQuery.data?.data ?? [];
    if (rows.length === 0) return;
    prefilled.current.faqs = true;
    setFaqs(rows.map((row) => ({ question: row.question, answer: row.answer })));
  }, [canPrefillFaqs, savedFaqsQuery.data]);

  const toggleSection = (section: string) => {
    setSections((current) =>
      current.includes(section) ? current.filter((item) => item !== section) : [...current, section],
    );
    setErrors((current) => ({ ...current, sections: "" }));
  };

  const submit = async () => {
    const next: Record<string, string> = {};
    if (mode === "existing" && !clientId) next.client = "Choose a client.";
    if (mode === "new" && !clientName.trim()) next.clientName = "Enter the client's name.";
    if (!clientEmail.trim() && !clientPhone.trim()) next.clientEmail = "Enter the client's email or phone.";
    if (!industry.trim()) next.industry = "Pick an industry, or type your own.";
    if (!service.trim()) next.service = "Pick the service you are selling.";
    if (problem.trim().length < 10) next.problem = "One or two sentences, at least 10 characters.";
    if (sections.length === 0) next.sections = "Pick at least one section.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const selectedClient = mode === "existing" ? clients.data?.data.find((client) => client.id === clientId) : undefined;
    const clientLabel = selectedClient?.name || clientName.trim() || "Client";
    const resolvedClientWebsite = clientWebsite.trim() || (selectedClient as unknown as { website_url?: string } | undefined)?.website_url || "";

    setLoading(true);
    try {
      const response = await proposalsApi.draft({
        client_id: mode === "existing" ? clientId : undefined,
        client_name: mode === "new" ? clientName.trim() : undefined,
        client_email: clientEmail.trim() || undefined,
        client_phone: clientPhone.trim() || undefined,
        title: `${clientLabel} — Proposal`,
        industry: industry === "Other" && otherIndustry.trim() ? otherIndustry.trim() : industry,
        service,
        client_website: clientWebsite.trim() || undefined,
        own_website: ownWebsite.trim() || undefined,
        business_name: profile.data?.profile.business_name || undefined,
        problem: problem.trim(),
        target_audience: audience.trim() || undefined,
        cta: cta.trim() || undefined,
        sections,
        packages: sections.includes("Pricing")
          ? packages.filter((item) => item.name.trim())
          : undefined,
        currency,
        timeline_length: timeline.trim() || undefined,
        tone,
        scroll_length: scrollLength,
        faqs: sections.includes("FAQs") ? faqs.filter((faq) => faq.question && faq.answer) : undefined,
        questions: sections.includes("Embedded Questions")
          ? questions.filter((question) => question.text.trim())
          : undefined,
      });

      /* The research runs alongside the template choice; a failure there never blocks the builder. */
      void pipelineApi
        .extract({
          client_name: clientLabel !== "Client" ? clientLabel : undefined,
          client_website: resolvedClientWebsite || undefined,
          user_website: ownWebsite.trim() || undefined,
          business_name: profile.data?.profile.business_name || undefined,
          industry,
          service,
          problem: problem.trim(),
          target_audience: audience.trim() || undefined,
        })
        .then((result: any) => {
          const data = result?.result ?? result ?? {};
          saveResearch(response.id, {
            notes: data.notes ?? result?.notes ?? [],
            images: data.images ?? result?.images ?? [],
            facts: {
              business_name: data.business_name,
              value_prop: data.value_prop,
              key_points: data.key_points,
              location: data.location ?? undefined,
              author_business_name: data.author_business_name ?? undefined,
              author_description: data.author_description ?? undefined,
              author_website: data.author_website ?? undefined,
            },
          });
        })
        .catch(() => undefined);

      navigate(`/proposals/${response.id}/edit?step=template`);
    } catch (cause) {
      const apiError = cause as ApiError;
      if (apiError.code === "plan_limit_reached") setLimitOpen(true);
      else toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card" style={{ maxWidth: 780 }}>
        <div className="form-meta">
          <p className="eyebrow">New proposal</p>
          <span className="caption">Step 1 of 3 — the brief</span>
        </div>
        <h1>Tell us about this proposal.</h1>
        <p className="muted" style={{ marginBottom: 28 }}>
          The answers fill the template, the tone and the defaults. Nothing here is permanent.
        </p>

        <div className="form-section">
          <p className="form-section-title">Client</p>
          <div>
            <span className="field-label">Who is this for?</span>
            <div className="segmented" style={{ marginTop: 8 }}>
              <button
                type="button"
                aria-pressed={mode === "existing"}
                onClick={() => setMode("existing")}
              >
                Existing client
              </button>
              <button type="button" aria-pressed={mode === "new"} onClick={() => setMode("new")}>
                New client
              </button>
            </div>
          </div>
          {mode === "existing" && (
            <Select
              id="req-client"
              label="Client"
              value={clientId}
              placeholder="Choose a client"
              options={(clients.data?.data ?? []).map((client) => ({
                value: client.id,
                label: `${client.name} — ${client.email}`,
              }))}
              onChange={(value) => {
                setClientId(value);
                setClientEmail("");
                setErrors((current) => ({ ...current, client: "" }));
              }}
              error={errors.client}
              required
            />
          )}
          {mode === "new" && (
            <Input
              id="req-client-name"
              label="Client name"
              value={clientName}
              onChange={(value) => {
                setClientName(value);
                setErrors((current) => ({ ...current, clientName: "" }));
              }}
              error={errors.clientName}
              required
            />
          )}
          <Input
            id="req-client-email"
            label="Client email"
            type="email"
            value={clientEmail}
            onChange={(value) => {
              setClientEmail(value);
              setErrors((current) => ({ ...current, clientEmail: "" }));
            }}
            error={errors.clientEmail}
            helper={
              mode === "new"
                ? "The CRM record is created from it."
                : "Confirm the address this proposal is sent to."
            }
          />
          <Input
            id="req-client-phone"
            label="Client phone (optional)"
            type="tel"
            value={clientPhone}
            onChange={(value) => {
              setClientPhone(value);
              setErrors((current) => ({ ...current, clientEmail: "" }));
            }}
            helper="WhatsApp number, with country code. Used to share the document."
          />
        </div>

        <div className="form-section">
          <p className="form-section-title">The work</p>
          <div className="two-up">
            <Select
              id="req-industry"
              label="Industry"
              value={industry}
              placeholder="Choose an industry"
              options={INDUSTRY_OPTIONS}
              onChange={(value) => {
                setIndustry(value);
                setErrors((current) => ({ ...current, industry: "" }));
              }}
              error={errors.industry}
              required
            />
            <Select
              id="req-service"
              label="Service"
              value={service}
              options={SERVICE_OPTIONS.map((value) => ({ value, label: value }))}
              onChange={setService}
              error={errors.service}
              required
            />
          </div>
          {industry === "Other" && (
            <Input
              id="req-industry-other"
              label="Which industry?"
              value={otherIndustry}
              onChange={setOtherIndustry}
              helper="Free text is fine."
            />
          )}
          <div className="two-up">
            <Input
              id="req-client-website"
              label="Client website"
              type="url"
              value={clientWebsite}
              onChange={setClientWebsite}
              placeholder="https://"
              helper="Optional. Read for the title, the description and the headings."
            />
            <Input
              id="req-own-website"
              label="Your website"
              type="url"
              value={ownWebsite}
              onChange={setOwnWebsite}
              placeholder="https://"
              helper="Optional. Fills the About You section."
            />
          </div>
          <Textarea
            id="req-problem"
            label="Problem you're solving"
            value={problem}
            onChange={(value) => {
              setProblem(value);
              setErrors((current) => ({ ...current, problem: "" }));
            }}
            error={errors.problem}
            helper="What is the client's problem? One or two sentences."
            rows={4}
            required
          />
          <div className="two-up">
            <Input
              id="req-audience"
              label="Target audience"
              value={audience}
              onChange={setAudience}
              helper="Optional. Who does the client serve?"
            />
            <Input
              id="req-cta"
              label="Call to action"
              value={cta}
              onChange={setCta}
              placeholder="Book a call"
              helper="Optional. The last line the client reads."
            />
          </div>
        </div>

        <div className="form-section">
          <p className="form-section-title">Structure</p>
          <Fieldset legend="Which sections do you want?" error={errors.sections}>
            {SECTION_OPTIONS.map((section) => (
              <Checkbox
                key={section}
                id={`section-${section}`}
                label={section}
                checked={sections.includes(section)}
                onChange={() => toggleSection(section)}
              />
            ))}
          </Fieldset>
        </div>

        {sections.includes("Pricing") && (
          <div className="form-section">
            <p className="form-section-title">Packages</p>
            {!canPrefillPackages && (
              <p className="helper">
                Saved packages fill this on Growth and Scale. Add them here for now.
              </p>
            )}
            <div className="form-stack">
              {packages.map((item, index) => (
                <div className="card card-md stack-3" key={index}>
                  <div className="two-up">
                    <Input
                      id={`pkg-name-${index}`}
                      label={`Package ${index + 1}`}
                      value={item.name}
                      onChange={(value) =>
                        setPackages((current) =>
                          current.map((row, i) => (i === index ? { ...row, name: value } : row)),
                        )
                      }
                    />
                    <Input
                      id={`pkg-price-${index}`}
                      label="Price"
                      type="number"
                      value={item.price === undefined ? "" : String(item.price)}
                      onChange={(value) =>
                        setPackages((current) =>
                          current.map((row, i) =>
                            i === index ? { ...row, price: value.trim() ? Number(value) : undefined } : row,
                          ),
                        )
                      }
                    />
                  </div>
                  <Textarea
                    id={`pkg-deliverables-${index}`}
                    label="Deliverables"
                    value={item.deliverables}
                    rows={2}
                    onChange={(value) =>
                      setPackages((current) =>
                        current.map((row, i) => (i === index ? { ...row, deliverables: value } : row)),
                      )
                    }
                    helper="One per line."
                  />
                </div>
              ))}
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setPackages((current) => [...current, { name: "", price: undefined, deliverables: "" }])
                  }
                >
                  + Add a package
                </Button>
              </div>
            </div>
          </div>
        )}

        {sections.includes("FAQs") && (
          <div className="form-section">
            <p className="form-section-title">FAQs</p>
            {!canPrefillFaqs && (
              <p className="helper">
                Saved FAQs fill this on Growth and Scale. Write them here for now.
              </p>
            )}
            <div className="form-stack">
              {faqs.map((faq, index) => (
                <div className="card card-md stack-3" key={index}>
                  <Input
                    id={`req-faq-q-${index}`}
                    label={`Question ${index + 1}`}
                    value={faq.question}
                    onChange={(value) =>
                      setFaqs((current) =>
                        current.map((row, i) => (i === index ? { ...row, question: value } : row)),
                      )
                    }
                  />
                  <Textarea
                    id={`req-faq-a-${index}`}
                    label="Answer"
                    value={faq.answer}
                    rows={2}
                    onChange={(value) =>
                      setFaqs((current) =>
                        current.map((row, i) => (i === index ? { ...row, answer: value } : row)),
                      )
                    }
                  />
                </div>
              ))}
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setFaqs((current) => [...current, { question: "", answer: "" }])}
                >
                  + Add an FAQ
                </Button>
              </div>
            </div>
          </div>
        )}

        {sections.includes("Embedded Questions") && (
          <div className="form-section">
            <p className="form-section-title">Embedded questions</p>
            <div className="form-stack">
              {questions.map((question, index) => (
                <div className="card card-md stack-3" key={question.id}>
                  <Input
                    id={`req-q-${index}`}
                    label={`Question ${index + 1}`}
                    value={question.text}
                    onChange={(value) =>
                      setQuestions((current) =>
                        current.map((row, i) => (i === index ? { ...row, text: value } : row)),
                      )
                    }
                  />
                  <div className="two-up">
                    <Select
                      id={`req-q-type-${index}`}
                      label="Type"
                      value={question.type}
                      options={[
                        { value: "short_text", label: "Short text" },
                        { value: "long_text", label: "Long text" },
                        { value: "single_choice", label: "Single choice" },
                        { value: "multiple_choice", label: "Multiple choice" },
                        { value: "file_upload", label: "File upload" },
                      ]}
                      onChange={(value) =>
                        setQuestions((current) =>
                          current.map((row, i) =>
                            i === index ? { ...row, type: value as FormQuestion["type"] } : row,
                          ),
                        )
                      }
                    />
                    {question.type.includes("choice") && (
                      <Input
                        id={`req-q-options-${index}`}
                        label="Options"
                        value={(question.options ?? []).map((option) => option.label).join(", ")}
                        onChange={(value) =>
                          setQuestions((current) =>
                            current.map((row, i) =>
                              i === index
                                ? {
                                    ...row,
                                    options: value
                                      .split(",")
                                      .map((label) => label.trim())
                                      .filter(Boolean)
                                      .map((label, position) => ({
                                        code: `o${position + 1}`,
                                        label,
                                      })),
                                  }
                                : row,
                            ),
                          )
                        }
                        helper="Separate with commas."
                      />
                    )}
                  </div>
                  <Textarea
                    id={`req-q-explanation-${index}`}
                    label="Explanation"
                    value={question.explanation || ""}
                    rows={2}
                    onChange={(value) =>
                      setQuestions((current) =>
                        current.map((row, i) => (i === index ? { ...row, explanation: value } : row)),
                      )
                    }
                    helper="Optional. Shown behind an info icon."
                  />
                  <Checkbox
                    id={`req-q-required-${index}`}
                    label="The client must answer it"
                    checked={Boolean(question.required)}
                    onChange={(checked) =>
                      setQuestions((current) =>
                        current.map((row, i) => (i === index ? { ...row, required: checked } : row)),
                      )
                    }
                  />
                  <Checkbox
                    id={`req-q-ask-${index}`}
                    label="Let the client ask a question instead"
                    checked={Boolean(question.allow_question)}
                    onChange={(checked) =>
                      setQuestions((current) =>
                        current.map((row, i) =>
                          i === index ? { ...row, allow_question: checked } : row,
                        ),
                      )
                    }
                  />
                </div>
              ))}
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setQuestions((current) => [
                      ...current,
                      {
                        id: `q_${current.length + 1}`,
                        text: "",
                        type: "short_text",
                        required: false,
                        allow_question: false,
                      },
                    ])
                  }
                >
                  + Add a question
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="form-section">
          <p className="form-section-title">Voice and shape</p>
          <div className="two-up">
            <Select
              id="req-currency"
              label="Currency"
              value={currency}
              options={CURRENCIES.map((value) => ({ value, label: value }))}
              onChange={setCurrency}
              required
            />
            <Input
              id="req-timeline"
              label="Timeline length"
              value={timeline}
              onChange={setTimeline}
              placeholder="4–6 weeks"
              helper="Optional."
            />
          </div>
          <div>
            <span className="field-label">Tone</span>
            <div className="segmented" style={{ marginTop: 8 }}>
              {TONES.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={tone === option}
                  onClick={() => setTone(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="helper">It changes the default wording, not the facts.</p>
          </div>
          <div>
            <span className="field-label">Length</span>
            <div className="segmented" style={{ marginTop: 8 }}>
              {SCROLL_LENGTHS.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={scrollLength === option}
                  onClick={() => setScrollLength(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="helper">Short keeps the sections tight; long allows the full narrative.</p>
          </div>
        </div>

        <div className="between mt-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={submit} loading={loading}>
            Choose a template
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={limitOpen}
        onClose={() => setLimitOpen(false)}
        onConfirm={() => navigate("/proposals")}
        title="You reached your active-document limit"
        description={`Your plan allows ${limits.active_documents ?? "unlimited"} active documents. Archive or delete one to create a proposal.`}
        confirmLabel="Manage documents"
        destructive={false}
      />
    </div>
  );
}
