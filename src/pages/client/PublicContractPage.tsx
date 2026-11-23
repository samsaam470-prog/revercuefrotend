import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import { ApiError } from "../../types/api";

export function PublicContractPage() {
  const { publicId } = useParams<{ publicId: string }>();
  const [token, setToken] = useState(sessionStorage.getItem(`rc_public_${publicId}`) || undefined);
  const [wallError, setWallError] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const [reason, setReason] = useState("");
  const [question, setQuestion] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [done, setDone] = useState<"approve" | "decline" | null>(null);
  const [nextStep, setNextStep] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["public", "contract", publicId, token],
    queryFn: () => publicApi.getContract(publicId as string, token),
    enabled: Boolean(publicId),
    retry: false,
  });

  const contract = query.data?.contract;
  const locked =
    (query.error as ApiError | null)?.status === 401 &&
    Boolean(((query.error as ApiError | null)?.details as { password_wall?: boolean })?.password_wall);

  const unlock = async (password: string) => {
    setWallError("");
    try {
      const response = await publicApi.unlockContract(publicId as string, password);
      sessionStorage.setItem(`rc_public_${publicId}`, response.session_token);
      setToken(response.session_token);
    } catch (cause) {
      setWallError(errorMessage((cause as ApiError).code));
    }
  };

  const sign = async () => {
    setBusy(true);
    setError("");
    try {
      await publicApi.signContract(publicId as string, {
        signature: name,
        consent: agree,
        name,
        email: (contract as { client_email?: string } | undefined)?.client_email || undefined,
      });
      setNextStep(undefined);
      setDone("approve");
      setApproveOpen(false);
    } catch (cause) {
      setError(errorMessage((cause as ApiError).code, (cause as ApiError).message));
    } finally {
      setBusy(false);
    }
  };

  const act = async (action: "approve" | "decline" | "question") => {
    setBusy(true);
    setError("");
    try {
      const response = await publicApi.contractAction(publicId as string, {
        action,
        session_token: token,
        question: action === "question" ? question : undefined,
        reason: action === "decline" ? reason : undefined,
      });
      if (action === "question") {
        setQuestion("");
        setQuestionOpen(false);
      } else {
        setNextStep(response.next_step);
        setDone(action);
      }
    } catch (cause) {
      setError(errorMessage((cause as ApiError).code));
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

  if (locked) return <PasswordWall title="A contract" brandName="Revercue" onSubmit={unlock} error={wallError} />;

  if (!contract) return <ClosedPage reason="expired" />;

  if (done === "approve" || contract.status === "approved") {
    return (
      <div className="client-wrap">
        <div className="client-card stack-4" style={{ textAlign: "center" }}>
          <p className="eyebrow">{contract.client_name}</p>
          <h1 className="serif" style={{ fontSize: 28 }}>
            Contract signed.
          </h1>
          <p className="muted">
            {nextStep === "form"
              ? "The next step is a short form. It appears once the freelancer shares it."
              : nextStep === "invoice"
                ? "The next step is an invoice. It appears once the freelancer shares it."
                : "The freelancer has your signature and will send the next step."}
          </p>
          {(contract as any).show_credit !== false && (
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

  if (done === "decline" || contract.status === "declined") return <ClosedPage reason="declined" />;

  const content = parseDocContent(contract.content);
  const blocks = Array.isArray(content.blocks) ? content.blocks : [];
  const brand = content?.brand_primary || "#c9a961";

  return (
    <div className="doc-shell">
      <div className="doc-page" style={{ borderTop: `3px solid ${brand}`, maxWidth: content?.max_width || 760 }}>
        <div className="doc-brand">
          <span className="mark" style={{ background: content?.brand_secondary || "#1a1a1a" }}>
            {(contract.client_name || "C").charAt(0)}
          </span>
          {contract.client_name ? `Between ${contract.client_name} and the freelancer` : "Contract"}
          <span className="mono" style={{ marginLeft: "auto" }}>
            ref {contract.public_id?.slice(0, 8)}
          </span>
        </div>

        <h1>{contract.title}</h1>

        {blocks.length === 0 ? (
          <div className="stack-4">
            <section>
              <h2>Scope</h2>
              <p>{contract.scope}</p>
            </section>
            <section>
              <h2>Payment</h2>
              <p>{contract.payment_terms}</p>
            </section>
            {contract.timeline && (
              <section>
                <h2>Timeline</h2>
                <p>{contract.timeline}</p>
              </section>
            )}
            <section>
              <h2>Revisions</h2>
              <p>{contract.revisions}</p>
            </section>
            <section>
              <h2>Cancellation</h2>
              <p>{contract.cancellation}</p>
            </section>
            <BlockRenderer block={{ id: "signature", type: "signature" }} brandPrimary={brand} />
          </div>
        ) : (
          blocks.map((block) => <BlockRenderer key={block.id} block={block} brandPrimary={brand} />)
        )}

        {error && <p className="error-text">{error}</p>}

        <div className="doc-actions">
          <Button size="lg" onClick={() => setApproveOpen(true)}>
            Sign and approve
          </Button>
          <Button variant="ghost" onClick={() => setDeclineOpen(true)}>
            Decline
          </Button>
          <button type="button" className="btn btn-text btn-sm" onClick={() => setQuestionOpen(true)}>
            Ask a question
          </button>
        </div>

        <p className="doc-foot">
          Typing your name is your signature on this document. It is recorded with the date.
        </p>
        {(contract as any).show_credit !== false && (
          <div className="doc-foot">
            Powered by{" "}
            <Link to="/" style={{ textDecoration: "underline" }}>
              Revercue
            </Link>
          </div>
        )}
      </div>

      <Modal
        open={approveOpen}
        onClose={() => setApproveOpen(false)}
        title="Sign this contract"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setApproveOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={() => void sign()} loading={busy} disabled={!agree || !name.trim()}>
              Sign contract
            </Button>
          </>
        }
      >
        <div className="stack-3">
          <Input id="sign-name" label="Full name" value={name} onChange={setName} required />
          <Checkbox
            id="sign-agree"
            label="I have read this contract and agree to it. I understand typing my name is my signature."
            checked={agree}
            onChange={setAgree}
          />
        </div>
      </Modal>

      <Modal
        open={declineOpen}
        onClose={() => setDeclineOpen(false)}
        title="Decline this contract"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeclineOpen(false)}>
              Keep reading
            </Button>
            <Button variant="danger" onClick={() => void act("decline")} loading={busy} disabled={!reason.trim()}>
              Decline
            </Button>
          </>
        }
      >
        <Textarea
          id="contract-decline"
          label="What would you change?"
          value={reason}
          onChange={setReason}
          rows={4}
          helper="The freelancer can revise and send a new link."
        />
      </Modal>

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
            <Button onClick={() => void act("question")} loading={busy} disabled={!question.trim()}>
              Send
            </Button>
          </>
        }
      >
        <Textarea
          id="contract-question"
          label="Your question"
          value={question}
          onChange={setQuestion}
          rows={4}
          helper="The freelancer answers by email."
        />
      </Modal>
    </div>
  );
}
