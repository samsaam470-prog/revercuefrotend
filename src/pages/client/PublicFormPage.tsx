import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "../../api/public";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { PasswordWall } from "./PasswordWall";
import { ClosedPage } from "./ClosedPage";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { FormQuestion, ThankYouConfig } from "../../types";
import { RichText } from "../../components/builder/RichText";

const PER_PAGE = 3;

export function PublicFormPage() {
  const { publicId } = useParams<{ publicId: string }>();
  const [token, setToken] = useState(sessionStorage.getItem(`rc_public_${publicId}`) || undefined);
  const [wallError, setWallError] = useState("");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [page, setPage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [thankYou, setThankYou] = useState<ThankYouConfig | null | undefined>(undefined);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["public", "form", publicId, token],
    queryFn: () => publicApi.getForm(publicId as string, token),
    enabled: Boolean(publicId),
    retry: false,
  });

  const form = query.data?.form;
  const locked =
    (query.error as ApiError | null)?.status === 401 &&
    Boolean(((query.error as ApiError | null)?.details as { password_wall?: boolean })?.password_wall);

  const unlock = async (password: string) => {
    setWallError("");
    try {
      const response = await publicApi.unlockForm(publicId as string, password);
      sessionStorage.setItem(`rc_public_${publicId}`, response.session_token);
      setToken(response.session_token);
    } catch (cause) {
      setWallError(errorMessage((cause as ApiError).code));
    }
  };

  const visible = useMemo(() => {
    const questions = form?.questions ?? [];
    if (!form?.branching) return questions;
    const hidden = new Set<string>();
    for (const question of questions) {
      const rules = question.branching_rules ?? [];
      for (const rule of rules) {
        const answer = answers[question.id];
        const matches = Array.isArray(answer) ? answer.includes(rule.option) : answer === rule.option;
        if (!matches) rule.show.forEach((id) => hidden.add(id));
      }
    }
    return questions.filter((question) => !hidden.has(question.id));
  }, [form, answers]);

  const totalPages = form?.page_mode === "multi" ? Math.ceil(visible.length / PER_PAGE) : 1;
  const pageQuestions = form?.page_mode === "multi" ? visible.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE) : visible;

  const missing = pageQuestions.filter((question) => {
    if (!question.required) return false;
    const value = answers[question.id];
    return value == null || value === "" || (Array.isArray(value) && value.length === 0);
  });

  const submit = async () => {
    if (missing.length > 0) {
      setError("A few required questions are still blank.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await publicApi.submitForm(publicId as string, { answers });
      setThankYou(response.thank_you_config ?? form?.thank_you_config ?? null);
    } catch (cause) {
      setError(errorMessage((cause as ApiError).code));
    } finally {
      setBusy(false);
    }
  };

  if (query.isLoading) {
    return (
      <div className="client-wrap">
        <SkeletonLines count={6} />
      </div>
    );
  }

  if (locked) return <PasswordWall title="A form" brandName="Revercue" onSubmit={unlock} error={wallError} />;
  if (!form) return <ClosedPage reason="expired" />;

  if (thankYou !== undefined) {
    return (
      <div className="client-wrap">
        <div className="client-card stack-4" style={{ textAlign: "center" }}>
          <p className="eyebrow">{form.client_name || "Thank you"}</p>
          <h1 className="serif" style={{ fontSize: 28 }}>
            {thankYou?.heading || "Thank you."}
          </h1>
          <p className="muted">
            {thankYou?.body || "Your answers are with the freelancer. They'll be in touch."}
          </p>
          {thankYou?.button_url && (
            <a href={thankYou.button_url} className="btn btn-primary btn-lg">
              {thankYou.button_text || "Continue"}
            </a>
          )}
          {(form as any).show_credit !== false && (
            <div className="doc-foot">
              Powered by{" "}
              <Link to="/" style={{ textDecoration: "underline" }}>
                Revercue
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="doc-shell">
      <div className="doc-page" style={{ maxWidth: 680 }}>
        <p className="eyebrow">{form.client_name ? `For ${form.client_name}` : "A few questions"}</p>
        <h1>{form.title}</h1>
        {form.description && (
          <p className="muted">
            <RichText value={form.description} />
          </p>
        )}
        {form.page_mode === "multi" && totalPages > 1 && (
          <p className="caption">
            Page {page + 1} of {totalPages}
          </p>
        )}

        <div className="stack-4 mt-6">
          {pageQuestions.map((question) => (
            <QuestionField
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => setAnswers({ ...answers, [question.id]: value })}
              onUpload={async (file) => {
                setUploadingId(question.id);
                try {
                  const response = await publicApi.formUpload(publicId as string, question.id, file);
                  setAnswers({ ...answers, [question.id]: response.url || response.file_id || file.name });
                } catch (cause) {
                  setError(errorMessage((cause as ApiError).code));
                } finally {
                  setUploadingId(null);
                }
              }}
              uploading={uploadingId === question.id}
            />
          ))}
        </div>

        {error && <p className="error-text mt-4">{error}</p>}

        <div className="doc-actions">
          {page > 0 && (
            <Button variant="ghost" onClick={() => setPage((value) => value - 1)}>
              Back
            </Button>
          )}
          {page < totalPages - 1 ? (
            <Button
              size="lg"
              onClick={() => {
                if (missing.length > 0) setError("A few required questions are still blank.");
                else {
                  setError("");
                  setPage((value) => value + 1);
                }
              }}
            >
              Continue
            </Button>
          ) : (
            <Button size="lg" onClick={submit} loading={busy}>
              Submit
            </Button>
          )}
        </div>

        <p className="doc-foot">
          Your answers go straight to the freelancer. Revercue does not share them with anyone else.
        </p>
      </div>
    </div>
  );
}

function QuestionField({
  question,
  value,
  onChange,
  onUpload,
  uploading,
}: {
  question: FormQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const id = `fq-${question.id}`;
  const stringValue = typeof value === "string" ? value : "";
  const listValue = Array.isArray(value) ? (value as string[]) : [];

  return (
    <div className="question-block">
      <label htmlFor={id}>
        {question.text}
        {question.required && <span aria-hidden="true"> *</span>}
      </label>
      {question.explanation && <span className="helper">{question.explanation}</span>}

      {question.type === "long_text" && (
        <textarea
          id={id}
          className="field-textarea"
          rows={4}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {question.type === "short_text" && (
        <input id={id} className="input" value={stringValue} onChange={(event) => onChange(event.target.value)} />
      )}

      {question.type === "dropdown" && (
        <select id={id} className="field-select" value={stringValue} onChange={(event) => onChange(event.target.value)}>
          <option value="">Choose one</option>
          {(question.options ?? []).map((option) => (
            <option key={option.code} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {(question.type === "single_choice" || question.type === "multiple_choice") &&
        (question.options ?? []).map((option) => (
          <label className="checkbox" key={option.code}>
            <input
              type={question.type === "multiple_choice" ? "checkbox" : "radio"}
              name={id}
              checked={
                question.type === "multiple_choice" ? listValue.includes(option.label) : stringValue === option.label
              }
              onChange={() =>
                onChange(
                  question.type === "multiple_choice"
                    ? listValue.includes(option.label)
                      ? listValue.filter((item) => item !== option.label)
                      : [...listValue, option.label]
                    : option.label,
                )
              }
            />
            <span className="box" />
            <span>{option.label}</span>
          </label>
        ))}

      {question.type === "combined" && (
        <div className="stack-3">
          <input
            id={id}
            className="input"
            placeholder="Add a detail"
            value={stringValue}
            onChange={(event) => onChange(event.target.value)}
          />
          {(question.options ?? []).map((option) => (
            <label className="checkbox" key={option.code}>
              <input
                type="radio"
                name={id}
                checked={stringValue === option.label}
                onChange={() => onChange(option.label)}
              />
              <span className="box" />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "file_upload" && (
        <div className="input-group">
          <input
            id={id}
            type="file"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUpload(file);
            }}
          />
          <span className="helper">
            {uploading
              ? "Uploading…"
              : `Up to ${question.file_max_files || 1} file${(question.file_max_files || 1) > 1 ? "s" : ""}, ${question.file_max_size_mb || 5} MB each.`}
          </span>
          {stringValue && <span className="helper">Attached: {stringValue}</span>}
        </div>
      )}
    </div>
  );
}
