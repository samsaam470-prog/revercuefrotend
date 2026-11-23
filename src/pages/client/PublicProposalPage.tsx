import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { publicApi } from "../../api/public";
import { BlockRenderer } from "../../components/builder/BlockRenderer";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Checkbox } from "../../components/ui/Checkbox";
import { Modal } from "../../components/ui/Modal";
import { Spinner } from "../../components/ui/Spinner";
import { PasswordWall } from "./PasswordWall";
import { ClosedPage } from "./ClosedPage";
import { errorMessage } from "../../lib/errors";
import { parseDocContent } from "../../lib/brief";
import { formatCurrency } from "../../lib/formatters";
import { ApiError } from "../../types/api";

export function PublicProposalPage() {
  const { publicId } = useParams<{ publicId: string }>();
  const [token, setToken] = useState(sessionStorage.getItem(`rc_public_${publicId}`) || undefined);
  const [wallError, setWallError] = useState("");
  const [questionOpen, setQuestionOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pickedPackage, setPickedPackage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [approved, setApproved] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [declineReason, setDeclineReason] = useState("");

  const query = useQuery({
    queryKey: ["public", "proposal", publicId, token],
    queryFn: () => publicApi.getProposal(publicId as string, token),
    enabled: Boolean(publicId),
    retry: false,
  });

  const proposal = query.data?.proposal;

  useEffect(() => {
    if (!publicId) return;
    void publicApi
      .proposalEvent(publicId, { session_token: token, event_type: "viewed" })
      .catch(() => undefined);
  }, [publicId, token]);

  const locked = useMemo(() => {
    const cause = query.error as ApiError | null;
    return cause?.status === 401 && Boolean((cause.details as { password_wall?: boolean })?.password_wall);
  }, [query.error]);

  const unlock = async (password: string) => {
    setWallError("");
    try {
      const response = await publicApi.unlockProposal(publicId as string, password);
      sessionStorage.setItem(`rc_public_${publicId}`, response.session_token);
      setToken(response.session_token);
    } catch (cause) {
      const apiError = cause as ApiError;
      setWallError(
        apiError.code === "invalid_password" ? "That password is not right." : errorMessage(apiError.code, apiError.message),
      );
    }
  };

  const act = async (action: "approve" | "decline") => {
    setBusy(true);
    setError("");
    try {
      await publicApi.proposalAction(publicId as string, {
        action,
        name: signerName || proposal?.client_name || undefined,
        reason: action === "decline" ? declineReason || undefined : undefined,
        package: action === "approve" ? pickedPackage ?? undefined : undefined,
        session_token: token,
      });
      if (action === "approve") {
        setApproved(true);
        setApproveOpen(false);
      } else {
        setDeclined(true);
        setDeclineOpen(false);
      }
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(errorMessage(apiError.code, apiError.message));
    } finally {
      setBusy(false);
    }
  };

  if (query.isLoading) {
    return (
      <div className="client-wrap">
        <Spinner size={32} />
      </div>
    );
  }

  if (locked) {
    return <PasswordWall title="A proposal" brandName="Revercue" onSubmit={unlock} error={wallError} />;
  }

  if (!proposal) {
    return <ClosedPage reason="expired" />;
  }

  const content = parseDocContent(proposal.content);
  const blocks = Array.isArray(content.blocks) ? content.blocks : [];
  const brand = content?.brand_primary || proposal.brand_primary || "#c9a961";

  return (
    <div className="doc-shell">
      <div className="doc-page" style={{ borderTop: `3px solid ${brand}`, maxWidth: content?.max_width || 760 }}>
        <div className="doc-brand">
          <span className="mark" style={{ background: content?.brand_secondary || "#1a1a1a" }}>
            {(proposal.client_name || "C").charAt(0)}
          </span>
          {proposal.client_name ? `Prepared for ${proposal.client_name}` : "Proposal"}
          <span className="mono" style={{ marginLeft: "auto" }}>
            ref {proposal.public_id?.slice(0, 8)}
          </span>
        </div>

        <h1>{proposal.title}</h1>

        {blocks.length === 0 && proposal.problem && <p>{proposal.problem}</p>}

        {blocks.map((block) => {
          if (block.type === "packages") {
            return (
              <div className="canvas-packages" key={block.id}>
                {(block.items ?? []).map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`canvas-package${pickedPackage === item.label ? " selected" : ""}`}
                    onClick={() => setPickedPackage(item.label)}
                    style={pickedPackage === item.label ? { borderColor: brand } : undefined}
                  >
                    <b>{item.label}</b>
                    <span className="amount">{formatCurrency(item.price ?? 0, proposal.currency || "USD")}</span>
                    <span className="caption">{pickedPackage === item.label ? "Selected" : "Choose"}</span>
                  </button>
                ))}
              </div>
            );
          }
          if (block.type === "question" && block.question) {
            const q = block.question;
            return (
              <div className="question-block" key={block.id}>
                <label htmlFor={`q-${q.id}`}>
                  {q.text}
                  {q.required && <span aria-hidden="true"> *</span>}
                </label>
                {q.explanation && <span className="helper">{q.explanation}</span>}
                {q.type === "long_text" ? (
                  <textarea
                    id={`q-${q.id}`}
                    className="field-textarea"
                    rows={4}
                    value={answers[q.id] || ""}
                    onChange={(event) => setAnswers({ ...answers, [q.id]: event.target.value })}
                  />
                ) : q.options?.length ? (
                  q.options.map((option) => (
                    <label key={option.code} className="checkbox">
                      <input
                        type={q.type === "multiple_choice" ? "checkbox" : "radio"}
                        name={q.id}
                        value={option.label}
                        checked={answers[q.id] === option.label}
                        onChange={() => setAnswers({ ...answers, [q.id]: option.label })}
                      />
                      <span className="box" />
                      <span>{option.label}</span>
                    </label>
                  ))
                ) : (
                  <input
                    id={`q-${q.id}`}
                    className="input"
                    value={answers[q.id] || ""}
                    onChange={(event) => setAnswers({ ...answers, [q.id]: event.target.value })}
                  />
                )}
                {q.allow_question && (
                  <button type="button" className="btn btn-text btn-sm" onClick={() => setQuestionOpen(true)}>
                    <HelpCircle size={13} /> Ask a question
                  </button>
                )}
              </div>
            );
          }
          return <BlockRenderer key={block.id} documentType="proposal" block={block} brandPrimary={brand} />;
        })}

        {error && <p className="error-text">{error}</p>}

        {proposal.status === "published" && !approved && !declined && (
          <div className="doc-actions" style={{ justifyContent: "flex-start", gap: 10 }}>
            <Button onClick={() => setApproveOpen(true)}>Accept this proposal</Button>
            <Button variant="ghost" onClick={() => setDeclineOpen(true)}>Decline</Button>
          </div>
        )}

        {(approved || String(proposal.status) === "accepted") && (
          <p className="doc-foot">Accepted. The freelancer has been notified and will send the next step.</p>
        )}
        {(declined || proposal.status === "declined") && (
          <p className="doc-foot">This proposal was declined. The freelancer has been notified.</p>
        )}

        <div className="doc-actions">
          <button type="button" className="btn btn-text btn-sm" onClick={() => setQuestionOpen(true)}>
            Ask a question
          </button>
        </div>

        <p className="doc-foot">
          This is a proposal, not a contract. Accepting tells the freelancer to send the contract.
        </p>
        {(proposal as any).show_credit !== false && (
          <div className="doc-foot">
            Powered by{" "}
            <Link to="/" style={{ textDecoration: "underline" }}>
              Revercue
            </Link>
          </div>
        )}
      </div>

      <Modal
        open={questionOpen}
        onClose={() => setQuestionOpen(false)}
        title="Ask a question"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setQuestionOpen(false)}>
              Cancel
            </Button>
            <Button
              loading={busy}
              disabled={!question.trim()}
              onClick={async () => {
                setBusy(true);
                try {
                  await publicApi.askQuestion(publicId as string, {
                    session_token: token,
                    question_text: question,
                  });
                  setQuestion("");
                  setQuestionOpen(false);
                } catch (cause) {
                  const apiError = cause as ApiError;
                  setError(errorMessage(apiError.code, apiError.message));
                } finally {
                  setBusy(false);
                }
              }}
            >
              Send question
            </Button>
          </>
        }
      >
        <Textarea
          id="client-question"
          label="Your question"
          value={question}
          onChange={setQuestion}
          rows={4}
          helper="The freelancer answers by email or in the document."
        />
      </Modal>

      <Modal
        open={approveOpen}
        onClose={() => setApproveOpen(false)}
        title="Accept this proposal"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setApproveOpen(false)}>Cancel</Button>
            <Button loading={busy} onClick={() => void act("approve")}>Accept</Button>
          </>
        }
      >
        <div className="stack-3">
          <p className="muted">
            This records your acceptance and tells the freelancer to send the next step. It is not a
            contract signature.
          </p>
          <Input
            id="approve-name"
            label="Your name"
            value={signerName}
            onChange={setSignerName}
            helper="Optional. The freelancer sees who accepted."
          />
          {pickedPackage && <p className="caption">Selected package: {pickedPackage}</p>}
        </div>
      </Modal>

      <Modal
        open={declineOpen}
        onClose={() => setDeclineOpen(false)}
        title="Decline this proposal"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeclineOpen(false)}>Cancel</Button>
            <Button loading={busy} onClick={() => void act("decline")}>Decline</Button>
          </>
        }
      >
        <Textarea
          id="decline-reason"
          label="Reason (optional)"
          value={declineReason}
          onChange={setDeclineReason}
          rows={3}
          helper="A reason helps the freelancer fix what did not fit."
        />
      </Modal>
    </div>
  );
}

export { CheckCircle2 };
