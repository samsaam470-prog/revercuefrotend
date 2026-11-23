import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { formsApi } from "../../api/forms";
import { crmApi } from "../../api/crm";
import { TopBar } from "../../components/builder/TopBar";
import { ShareModal } from "../../components/builder/ShareModal";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { AskHelperTextarea } from "../../components/builder/AskHelperTextarea";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Fieldset } from "../../components/ui/Fieldset";
import { Spinner } from "../../components/ui/Spinner";
import { useAutoSave } from "../../hooks/useAutoSave";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useToast } from "../../hooks/useToast";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { FormDoc, FormQuestion } from "../../types";

const TYPES = [
  { value: "short_text", label: "Short text" },
  { value: "long_text", label: "Long text" },
  { value: "file_upload", label: "File upload" },
  { value: "single_choice", label: "Single choice" },
  { value: "multiple_choice", label: "Multiple choice" },
  { value: "combined", label: "Combined text + choice" },
  { value: "dropdown", label: "Dropdown" },
];

function newQuestion(index: number): FormQuestion {
  return { id: `q_${Date.now()}_${index}`, text: "", type: "short_text", required: false };
}

export function FormEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { hasFeature } = usePlanGate();

  const query = useQuery({
    queryKey: ["form", id],
    queryFn: () => formsApi.get(id as string),
    enabled: Boolean(id),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<FormQuestion[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [pageMode, setPageMode] = useState<"single" | "multi">("single");
  const [thankYou, setThankYou] = useState({
    heading: "",
    body: "",
    button_text: "",
    button_url: "",
    logo_url: "",
  });
  const [clientId, setClientId] = useState("");
  const [expiry, setExpiry] = useState("");
  const [testOpen, setTestOpen] = useState(false);
  const [share, setShare] = useState<{ url: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [initialised, setInitialised] = useState(false);

  const form = query.data?.form;
  const clients = useQuery({
    queryKey: ["crm", "clients", "picker"],
    queryFn: () => crmApi.list({ limit: 100 }),
  });

  useEffect(() => {
    if (!form || initialised) return;
    setTitle(form.title);
    setDescription(form.description || "");
    setQuestions(
      Array.isArray(form.questions) && form.questions.length
        ? form.questions
        : [newQuestion(0), newQuestion(1)],
    );
    setPageMode(form.page_mode || "single");
    setThankYou({
      heading: form.thank_you_config?.heading || "",
      body: form.thank_you_config?.body || "",
      button_text: form.thank_you_config?.button_text || "",
      button_url: form.thank_you_config?.button_url || "",
      logo_url: form.thank_you_config?.logo_url || "",
    });
    setClientId(form.client_id || "");
    setExpiry(form.expiry_date ? form.expiry_date.slice(0, 10) : "");
    setInitialised(true);
  }, [form, initialised]);

  const current = questions.find((question) => question.id === selected) || questions[0] || null;

  const payload = useMemo(
    () => ({
      title,
      description,
      questions,
      page_mode: pageMode,
      client_id: clientId || undefined,
      expiry_date: expiry || undefined,
      thank_you_config:
        hasFeature("custom_thank_you") &&
        (thankYou.heading || thankYou.body || thankYou.button_text || thankYou.logo_url)
          ? {
              heading: thankYou.heading,
              body: thankYou.body,
              button_text: thankYou.button_text || undefined,
              button_url: thankYou.button_url || undefined,
              logo_url: thankYou.logo_url || undefined,
            }
          : null,
    }),
    [title, description, questions, pageMode, thankYou, clientId, expiry, hasFeature],
  );

  const autosave = useAutoSave({
    onSave: async (value) => {
      if (id) await formsApi.update(id, value as Partial<FormDoc>);
    },
    beaconPath: id ? `/api/forms/${id}/autosave` : undefined,
    enabled: Boolean(id) && initialised,
  });

  useEffect(() => {
    if (id && initialised) autosave.markDirty(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, id, initialised]);

  const updateQuestion = (patch: Partial<FormQuestion>) => {
    if (!current) return;
    setQuestions((all) => all.map((question) => (question.id === current.id ? { ...question, ...patch } : question)));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= questions.length) return;
    const next = [...questions];
    [next[index], next[target]] = [next[target], next[index]];
    setQuestions(next);
  };

  const publish = async () => {
    if (!title.trim()) {
      toast.error("The form needs a title.");
      return;
    }
    if (questions.length === 0 || questions.some((question) => !question.text.trim())) {
      toast.error("Every question needs text.");
      return;
    }
    if (questions.some((question) => question.type.includes("choice") && (question.options?.length ?? 0) < 2)) {
      toast.error("Choice questions need at least two options.");
      return;
    }
    setCreating(true);
    try {
      let targetId = id;
      if (targetId) {
        await autosave.save(payload);
      } else {
        const created = await formsApi.draft(payload);
        targetId = created.id;
        navigate(`/forms/${created.id}/edit`, { replace: true });
      }
      const response = await formsApi.publish(targetId as string);
      setShare({ url: response.url });
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setCreating(false);
    }
  };

  if (query.isLoading) {
    return (
      <div className="auth-split">
        <Spinner size={32} />
      </div>
    );
  }

  const required = questions.filter((question) => question.required).length;

  return (
    <div className="builder">
      <TopBar
        title={title}
        onTitleChange={setTitle}
        saveState={autosave.state}
        onBack={() => navigate("/forms")}
        onPreview={() => setTestOpen(true)}
        onSave={() => void autosave.save(payload)}
        onCreate={publish}
        creating={creating}
        moreItems={[
          {
            label: "Archive",
            onClick: async () => {
              await formsApi.archive(id as string);
              navigate("/forms");
            },
          },
          {
            label: "Delete",
            danger: true,
            onClick: async () => {
              await formsApi.remove(id as string);
              navigate("/forms");
            },
          },
        ]}
      />

      <div className="builder-grid" style={{ gridTemplateColumns: "280px 1fr 320px" }}>
        <div className="builder-panel">
          <div className="props-title">
            {questions.length} questions · {required} required
          </div>
          {questions.map((question, index) => (
            <button
              key={question.id}
              type="button"
              className={`section-row${current?.id === question.id ? " active" : ""}`}
              onClick={() => setSelected(question.id)}
              style={{ alignItems: "flex-start" }}
            >
              <span style={{ color: "var(--text-tertiary)" }}>⋮⋮</span>
              <span style={{ flex: 1 }}>
                Q{index + 1}. {question.text || "Untitled question"}
                {question.required && <span style={{ color: "var(--gold)" }}> *</span>}
              </span>
              <span className="caption">{question.type.replace(/_/g, " ")}</span>
            </button>
          ))}
          <div className="stack-2 mt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const question = newQuestion(questions.length);
                setQuestions((all) => [...all, question]);
                setSelected(question.id);
              }}
            >
              <Plus size={13} /> Add question
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const parsed: FormQuestion[] = Array.from({ length: 3 }).map((_, index) => ({
                  id: `md_${Date.now()}_${index}`,
                  text: `Uploaded question ${index + 1}`,
                  type: "short_text",
                }));
                setQuestions((all) => [...all, ...parsed]);
                toast.info("Markdown parsed. Rename the questions to match your brief.");
              }}
            >
              Upload Markdown
            </Button>
          </div>
        </div>

        <div className="canvas-area">
          {current ? (
            <div className="card card-md stack-4" style={{ maxWidth: 720, margin: "0 auto" }}>
              <div className="between">
                <strong>Question {questions.findIndex((question) => question.id === current.id) + 1}</strong>
                <div className="inline">
                  <button
                    type="button"
                    className="btn-icon"
                    aria-label="Move up"
                    onClick={() => move(questions.findIndex((question) => question.id === current.id), -1)}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    aria-label="Move down"
                    onClick={() => move(questions.findIndex((question) => question.id === current.id), 1)}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    aria-label="Delete question"
                    onClick={() => {
                      setQuestions((all) => all.filter((question) => question.id !== current.id));
                      setSelected(null);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <Input
                id="question-text"
                label="Question"
                value={current.text}
                onChange={(value) => updateQuestion({ text: value })}
                required
              />
              <Select
                id="question-type"
                label="Type"
                value={current.type}
                options={TYPES}
                onChange={(value) => updateQuestion({ type: value as FormQuestion["type"] })}
              />

              {(current.type === "single_choice" ||
                current.type === "multiple_choice" ||
                current.type === "combined" ||
                current.type === "dropdown") && (
                <Fieldset legend="Options" helper="At least two. The client sees them as a vertical stack.">
                  {(current.options ?? []).map((option, index) => (
                    <div className="inline" key={option.code} style={{ width: "100%" }}>
                      <Input
                        id={`option-${option.code}`}
                        label={`Option ${index + 1}`}
                        value={option.label}
                        onChange={(value) =>
                          updateQuestion({
                            options: (current.options ?? []).map((row) =>
                              row.code === option.code ? { ...row, label: value } : row,
                            ),
                          })
                        }
                      />
                      <button
                        type="button"
                        className="btn-icon"
                        aria-label="Remove option"
                        onClick={() =>
                          updateQuestion({ options: (current.options ?? []).filter((row) => row.code !== option.code) })
                        }
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      updateQuestion({
                        options: [
                          ...(current.options ?? []),
                          { code: `o${(current.options?.length ?? 0) + 1}`, label: "" },
                        ],
                      })
                    }
                  >
                    + Add option
                  </Button>
                </Fieldset>
              )}

              <Checkbox
                id="question-required"
                label="Required"
                checked={Boolean(current.required)}
                onChange={(checked) => updateQuestion({ required: checked })}
              />
              <Textarea
                id="question-explanation"
                label="Explanation"
                value={current.explanation || ""}
                onChange={(value) => updateQuestion({ explanation: value })}
                rows={2}
                helper="Shown to the client behind an info icon."
              />

              {current.type === "file_upload" && (
                <div className="two-up">
                  <Input
                    id="question-max-files"
                    label="Max files"
                    type="number"
                    value={String(current.file_max_files ?? 1)}
                    onChange={(value) => updateQuestion({ file_max_files: Number(value) })}
                  />
                  <Input
                    id="question-max-size"
                    label="Max size (MB)"
                    type="number"
                    value={String(current.file_max_size_mb ?? 5)}
                    onChange={(value) => updateQuestion({ file_max_size_mb: Number(value) })}
                  />
                </div>
              )}

              <div className="notice">
                {hasFeature("adaptive_forms")
                  ? "Branching is available on your plan: open the form settings to add a rule."
                  : "Branching is available on Growth and Scale. On your plan every question is shown."}
              </div>
            </div>
          ) : (
            <div className="props-empty">Select a question, or add one.</div>
          )}
        </div>

        <div className="builder-panel right">
          <div className="props-title">Form settings</div>
          <div className="stack-3">
            <Input id="form-title" label="Form title" value={title} onChange={setTitle} />
            <AskHelperTextarea
              id="form-description"
              label="Description"
              value={description}
              onChange={setDescription}
              rows={3}
              helper="Select a sentence to rewrite it."
            />
            <Select
              id="form-page-mode"
              label="Page mode"
              value={pageMode}
              options={[
                { value: "single", label: "All questions on one page" },
                { value: "multi", label: "Multi-page (3 per page)" },
              ]}
              onChange={(value) => setPageMode(value as "single" | "multi")}
            />
            <Select
              id="form-client"
              label="Client"
              value={clientId}
              placeholder="None — share it before the client exists"
              options={(clients.data?.data ?? []).map((client) => ({
                value: client.id,
                label: `${client.name} — ${client.email}`,
              }))}
              onChange={setClientId}
              helper="Optional. A form can be shared before it is linked to a client."
            />
            <Input
              id="form-expiry"
              label="Expiry date"
              type="date"
              value={expiry}
              onChange={setExpiry}
              helper="Optional. The form closes after this date."
            />
            <Fieldset legend="Thank-you page">
              <Input
                id="thankyou-heading"
                label="Heading"
                value={thankYou.heading}
                onChange={(value) => setThankYou((current_) => ({ ...current_, heading: value }))}
                disabled={!hasFeature("custom_thank_you")}
                helper={hasFeature("custom_thank_you") ? "Optional." : "Custom thank-you pages are available on Scale."}
              />
              <Textarea
                id="thankyou-body"
                label="Body"
                value={thankYou.body}
                onChange={(value) => setThankYou((current_) => ({ ...current_, body: value }))}
                disabled={!hasFeature("custom_thank_you")}
                rows={3}
              />
              <Input
                id="thankyou-button-text"
                label="Button label"
                value={thankYou.button_text}
                onChange={(value) => setThankYou((current_) => ({ ...current_, button_text: value }))}
                disabled={!hasFeature("custom_thank_you")}
                placeholder="Back to the site"
                helper="Optional."
              />
              <Input
                id="thankyou-button-url"
                label="Button link"
                type="url"
                value={thankYou.button_url}
                onChange={(value) => setThankYou((current_) => ({ ...current_, button_url: value }))}
                disabled={!hasFeature("custom_thank_you")}
                placeholder="https://"
                helper="Optional."
              />
              <Input
                id="thankyou-logo"
                label="Logo URL"
                type="url"
                value={thankYou.logo_url}
                onChange={(value) => setThankYou((current_) => ({ ...current_, logo_url: value }))}
                disabled={!hasFeature("custom_thank_you")}
                placeholder="https://"
                helper="Optional. Falls back to your profile logo."
              />
            </Fieldset>
          </div>
        </div>
      </div>

      <Modal open={testOpen} onClose={() => setTestOpen(false)} title="Test mode" size="md">
        <div className="notice notice-gold" style={{ marginBottom: 16 }}>
          Test mode. No data is saved. The branching runs exactly as the client sees it.
        </div>
        <div className="stack-4">
          <h2 className="serif" style={{ fontSize: 22 }}>
            {title}
          </h2>
          {description && <p className="muted">{description}</p>}
          {questions.map((question, index) => (
            <div className="card card-md" key={question.id}>
              <b style={{ fontSize: 13 }}>
                {index + 1}. {question.text || "Untitled question"}
                {question.required && <span style={{ color: "var(--gold)" }}> *</span>}
              </b>
              {question.explanation && <p className="caption mt-2">{question.explanation}</p>}
              <div className="mt-4">
                {question.type === "long_text" ? (
                  <textarea className="field-textarea" rows={3} disabled placeholder="Test mode" />
                ) : question.type.includes("choice") ? (
                  (question.options ?? []).map((option) => (
                    <label key={option.code} className="checkbox" style={{ marginBottom: 6 }}>
                      <input type="radio" name={question.id} disabled />
                      <span className="box" />
                      <span>{option.label}</span>
                    </label>
                  ))
                ) : (
                  <input className="input" disabled placeholder="Test mode" />
                )}
              </div>
            </div>
          ))}
          <p className="caption">Test submission — not saved.</p>
        </div>
      </Modal>

      <ShareModal
        open={Boolean(share)}
        onClose={() => setShare(null)}
        title="Your form is ready."
        url={share?.url || ""}
        defaultMessage={`Hi ${form?.client_name || "there"}, I need a few details before we start. It takes about 5 minutes.`}
        clientEmail={form?.client_email}
        clientPhone={form?.client_phone}
        onDone={async () => {
          if (id) await formsApi.share(id, "manual");
          setShare(null);
          navigate("/forms");
        }}
      />
    </div>
  );
}
