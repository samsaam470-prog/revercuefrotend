import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, Mail, MessageSquare, Phone, Plus } from "lucide-react";
import { crmApi } from "../../api/crm";
import { formsApi } from "../../api/forms";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Modal } from "../../components/ui/Modal";
import { Tabs } from "../../components/ui/Tabs";
import { Skeleton } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/EmptyState";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useToast } from "../../hooks/useToast";
import { CHANNELS, PLAN_LIMITS } from "../../lib/constants";
import { downloadBlob, documentFilename } from "../../lib/download";
import { formatCurrency, formatDate, formatDateTime, formatRelative } from "../../lib/formatters";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { CommunicationEntry, DocumentSummary } from "../../types";

const TABS = ["Overview", "Documents", "Notes", "Follow-ups", "Requirements", "Revenue"];

function answerText(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Not answered";
  if (Array.isArray(value)) return value.map((item) => answerText(item)).join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") || "Overview";
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { hasFeature } = usePlanGate();

  const [commsOpen, setCommsOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const [deleteComms, setDeleteComms] = useState<CommunicationEntry | null>(null);

  const [entryType, setEntryType] = useState<"message_sent" | "follow_up">("message_sent");
  const [channel, setChannel] = useState("Email");
  const [message, setMessage] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const query = useQuery({
    queryKey: ["client", id],
    queryFn: () => crmApi.get(id as string),
    enabled: Boolean(id),
  });
  const interest = useQuery({
    queryKey: ["client", id, "interest"],
    queryFn: () => crmApi.interest(id as string),
    enabled: Boolean(id) && interestOpen && hasFeature("interest_level"),
  });

  const client = query.data;
  const allDocuments: DocumentSummary[] = client
    ? [
        ...client.documents.proposals,
        ...client.documents.contracts,
        ...client.documents.invoices,
        ...client.documents.forms,
      ].sort((a, b) => (b.last_activity_at || b.created_at).localeCompare(a.last_activity_at || a.created_at))
    : [];

  const invoices = client?.documents.invoices ?? [];
  const paid = invoices.filter((invoice) => ["confirmed", "verified"].includes(invoice.status));
  const pending = invoices.filter((invoice) => !["confirmed", "verified", "archived"].includes(invoice.status));

  const addCommunication = async () => {
    if (!message.trim() && entryType === "message_sent") {
      toast.error("Write the message you sent.");
      return;
    }
    setBusy(true);
    try {
      await crmApi.addCommunication(id as string, {
        entry_type: entryType,
        direction: entryType === "message_sent" ? "outgoing" : undefined,
        channel,
        message_text: message,
        estimated_time: estimatedTime || undefined,
        next_step: nextStep || undefined,
        follow_up_date: entryType === "follow_up" ? followUpDate : undefined,
      });
      await queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast.success("Added to the log.");
      setCommsOpen(false);
      setMessage("");
      setNextStep("");
      setFollowUpDate("");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setBusy(false);
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;
    setBusy(true);
    try {
      await crmApi.addNote(id as string, note);
      await queryClient.invalidateQueries({ queryKey: ["client", id] });
      setNote("");
      setNoteOpen(false);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setBusy(false);
    }
  };

  if (query.isLoading) {
    return (
      <div className="stack-4">
        <Skeleton height={24} width="35%" />
        <Skeleton height={120} />
        <Skeleton height={220} />
      </div>
    );
  }

  if (!client) {
    return (
      <EmptyState
        title="Client not found."
        description={errorMessage((query.error as ApiError)?.code)}
        action={{ label: "Back to clients", onClick: () => navigate("/crm") }}
      />
    );
  }

  return (
    <>
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigate("/crm")} style={{ marginBottom: 12 }}>
        <ArrowLeft size={14} /> All clients
      </button>

      <div className="page-top">
        <div>
          <div className="inline">
            <h1>{client.name}</h1>
            {client.status && <Badge variant="muted">{client.status.replace(/_/g, " ")}</Badge>}
          </div>
          <div className="inline muted" style={{ marginTop: 6, fontSize: 13 }}>
            <span className="inline">
              <Mail size={13} /> {client.email}
            </span>
            {client.phone && (
              <span className="inline">
                <Phone size={13} /> {client.phone}
              </span>
            )}
            {client.company && <span>{client.company}</span>}
            {client.channel && <span className="inline"><MessageSquare size={13} /> {client.channel}</span>}
          </div>
        </div>
        <div className="inline">
          {hasFeature("interest_level") && (
            <Button variant="secondary" onClick={() => setInterestOpen(true)}>
              Interest {client.interest_level != null ? `${client.interest_level}%` : "—"}
            </Button>
          )}
          <Button variant="secondary" onClick={() => setCommsOpen(true)}>
            <Plus size={15} /> Add communication
          </Button>
          <Button onClick={() => navigate(`/proposals/new?client=${client.id}`)}>Create</Button>
        </div>
      </div>

      <div className="filters" style={{ marginBottom: 20 }}>
        <div className="tabs">
          <Tabs
            tabs={TABS.filter((item) => item !== "Revenue" || hasFeature("revenue_tracker")).map((item) => ({
              label: item,
              value: item,
            }))}
            value={tab}
            onChange={(value) => setParams(value === "Overview" ? {} : { tab: value })}
          />
        </div>
      </div>

      {tab === "Overview" && (
        <div className="two-col">
          <div className="card card-lg">
            <div className="between" style={{ marginBottom: 16 }}>
              <h2 className="serif" style={{ fontSize: 20 }}>
                Communication
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setCommsOpen(true)}>
                Add entry
              </Button>
            </div>
            {client.communication.length === 0 ? (
              <EmptyState
                title="Nothing logged yet."
                description="Log a message you sent, a reply you got, or a follow-up you scheduled. You don't have to paste the whole message."
                action={{ label: "Add communication", onClick: () => setCommsOpen(true) }}
              />
            ) : (
              <div className="timeline">
                {client.communication.map((entry) => (
                  <div className="timeline-item" key={entry.id}>
                    <div className="between">
                      <strong style={{ fontSize: 13 }}>
                        {entry.entry_type.replace(/_/g, " ")}
                        {entry.channel ? ` · ${entry.channel}` : ""}
                      </strong>
                      <span className="caption">{formatDateTime(entry.created_at)}</span>
                    </div>
                    {entry.message_text && <p style={{ fontSize: 13, marginTop: 4 }}>{entry.message_text}</p>}
                    <div className="inline caption" style={{ marginTop: 6 }}>
                      {entry.estimated_time && <span>~{entry.estimated_time}</span>}
                      {entry.next_step && <span>Next: {entry.next_step}</span>}
                      {entry.follow_up_date && <span>Follow up {formatDate(entry.follow_up_date)}</span>}
                      {entry.linked_document_title && (
                        <span className="inline">
                          <ArrowUpRight size={12} /> {entry.linked_document_title}
                        </span>
                      )}
                    </div>
                    <div className="inline" style={{ marginTop: 8 }}>
                      {entry.follow_up_date && !entry.follow_up_done && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            await crmApi.updateCommunication(entry.id, { follow_up_done: true });
                            await queryClient.invalidateQueries({ queryKey: ["client", id] });
                          }}
                        >
                          Mark follow-up done
                        </Button>
                      )}
                      <button
                        type="button"
                        className="btn btn-text btn-sm"
                        style={{ color: "var(--red)" }}
                        onClick={() => setDeleteComms(entry)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="stack-4">
            <div className="card card-md">
              <div className="between">
                <h3 className="serif" style={{ fontSize: 17 }}>
                  Interest breakdown
                </h3>
                {hasFeature("interest_level") ? (
                  <Button variant="ghost" size="sm" onClick={() => setInterestOpen(true)}>
                    View
                  </Button>
                ) : (
                  <Badge variant="gold">Scale</Badge>
                )}
              </div>
              <p className="caption mt-2">
                {hasFeature("interest_level")
                  ? "Estimated from opens, reading time, questions, and replies — not what the client says."
                  : `Interest scoring is part of Scale. It is estimated from opens, reading time, questions and replies.`}
              </p>
              <div className="mt-4">
                <div className="meter">
                  <span style={{ width: `${client.interest_level ?? 0}%` }} />
                </div>
                <p className="caption mt-2">
                  {client.interest_level != null ? `${client.interest_level}% · a hypothesis` : "No signals yet."}
                </p>
              </div>
            </div>

            <div className="card card-md">
              <h3 className="serif" style={{ fontSize: 17 }}>
                Documents
              </h3>
              <div className="stack-2 mt-2">
                <div className="between">
                  <span>Proposals</span>
                  <span className="mono">{client.documents.proposals.length}</span>
                </div>
                <div className="between">
                  <span>Contracts</span>
                  <span className="mono">{client.documents.contracts.length}</span>
                </div>
                <div className="between">
                  <span>Invoices</span>
                  <span className="mono">{client.documents.invoices.length}</span>
                </div>
                <div className="between">
                  <span>Forms</span>
                  <span className="mono">{client.documents.forms.length}</span>
                </div>
              </div>
            </div>

            <div className="card card-md">
              <div className="between">
                <h3 className="serif" style={{ fontSize: 17 }}>
                  Notes
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setNoteOpen(true)}>
                  Add
                </Button>
              </div>
              {client.notes.length === 0 ? (
                <p className="caption mt-2">Private notes about this client. Only you can see them.</p>
              ) : (
                <div className="stack-2 mt-2">
                  {client.notes.slice(0, 3).map((row) => (
                    <p key={row.id} style={{ fontSize: 13 }}>
                      {row.note}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "Documents" && (
        <div className="card card-lg">
          <div className="between" style={{ marginBottom: 12 }}>
            <h2 className="serif" style={{ fontSize: 20 }}>
              Every document
            </h2>
            <Button size="sm" onClick={() => navigate(`/proposals/new?client=${client.id}`)}>
              <Plus size={14} /> New document
            </Button>
          </div>
          {allDocuments.length === 0 ? (
            <EmptyState
              title="No documents yet."
              description="Proposals, contracts, invoices and forms for this client appear here."
              action={{ label: "Create a proposal", onClick: () => navigate(`/proposals/new?client=${client.id}`) }}
            />
          ) : (
            <div className="stack-2">
              {allDocuments.map((document) => (
                <Link
                  key={document.id}
                  to={documentPath(document)}
                  className="row-link between"
                  style={{ padding: "10px 0" }}
                >
                  <span>
                    <strong style={{ fontSize: 13 }}>{document.title}</strong>
                    <span className="caption" style={{ marginLeft: 8 }}>
                      {formatRelative(document.last_activity_at || document.created_at)}
                    </span>
                  </span>
                  <StatusBadge status={document.status} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "Notes" && (
        <div className="card card-lg">
          <div className="between" style={{ marginBottom: 12 }}>
            <h2 className="serif" style={{ fontSize: 20 }}>
              Notes
            </h2>
            <Button size="sm" onClick={() => setNoteOpen(true)}>
              <Plus size={14} /> Add note
            </Button>
          </div>
          {client.notes.length === 0 ? (
            <EmptyState
              title="No notes yet."
              description="Write what you learned in the call: budget, decision-maker, constraints."
              action={{ label: "Add note", onClick: () => setNoteOpen(true) }}
            />
          ) : (
            <div className="stack-4">
              {client.notes.map((row) => (
                <div key={row.id} className="note-row">
                  <p style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{row.note}</p>
                  <span className="caption">{formatDateTime(row.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "Follow-ups" && (
        <div className="card card-lg">
          <h2 className="serif" style={{ fontSize: 20 }}>
            Follow-ups
          </h2>
          <p className="caption" style={{ marginBottom: 16 }}>
            Every follow-up you scheduled with this client. Due ones also appear on the dashboard.
          </p>
          {client.communication.filter((entry) => entry.follow_up_date).length === 0 ? (
            <EmptyState
              title="No follow-ups scheduled."
              description="Add a follow_up entry to the communication log with a date."
              action={{ label: "Add communication", onClick: () => setCommsOpen(true) }}
            />
          ) : (
            <div className="stack-2">
              {client.communication
                .filter((entry) => entry.follow_up_date)
                .map((entry) => (
                  <div className="between" key={entry.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <strong style={{ fontSize: 13 }}>{entry.next_step || "Follow up"}</strong>
                      <p className="caption">{formatDate(entry.follow_up_date as string)}</p>
                    </div>
                    <div className="inline">
                      {entry.follow_up_done ? (
                        <Badge variant="green">Done</Badge>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={async () => {
                            await crmApi.updateCommunication(entry.id, { follow_up_done: true });
                            await queryClient.invalidateQueries({ queryKey: ["client", id] });
                          }}
                        >
                          Mark done
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {tab === "Requirements" && (
        <div className="card card-lg">
          <h2 className="serif" style={{ fontSize: 20 }}>
            Requirements
          </h2>
          <p className="caption" style={{ marginBottom: 16 }}>
            What this client answered on your requirement forms. The answers are the source for every
            later document.
          </p>
          {(client.requirements ?? []).length === 0 ? (
            <EmptyState
              title="No requirement answers yet."
              description="Share a form with this client. When they submit it, the answers appear here."
              action={{ label: "Create a form", onClick: () => navigate(`/forms/new?client=${client.id}`) }}
            />
          ) : (
            <div className="stack-4">
              {client.requirements?.map((requirement) => (
                <div key={requirement.id} className="card card-md">
                  <div className="between" style={{ marginBottom: 8 }}>
                    <div>
                      <strong style={{ fontSize: 14 }}>{requirement.form_title || "Requirement form"}</strong>
                      <p className="caption">
                        {formatDateTime(requirement.created_at)}
                        {requirement.service_type ? ` · ${requirement.service_type}` : ""}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        try {
                          const blob = await formsApi.submissionMarkdown(
                            requirement.form_id,
                            requirement.id,
                          );
                          downloadBlob(
                            blob,
                            documentFilename(requirement.form_title, requirement.id, "md"),
                          );
                        } catch (cause) {
                          const apiError = cause as ApiError;
                          toast.error(errorMessage(apiError.code, apiError.message));
                        }
                      }}
                    >
                      Download
                    </Button>
                  </div>
                  <div className="stack-2">
                    {Object.entries(requirement.answers ?? {}).map(([label, value]) => (
                      <div key={label} className="between" style={{ fontSize: 13, gap: 16 }}>
                        <span className="muted">{label}</span>
                        <span style={{ textAlign: "right" }}>{answerText(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "Revenue" && hasFeature("revenue_tracker") && (
        <div className="two-col">
          <div className="card card-lg">
            <h2 className="serif" style={{ fontSize: 20 }}>
              Revenue
            </h2>
            <div className="stat-grid mt-4">
              <div className="stat">
                <span className="stat-label">Paid</span>
                <span className="stat-value">
                  {formatCurrency(
                    paid.reduce((sum, invoice) => sum + (invoice.total || 0), 0),
                    paid[0]?.currency || "USD",
                  )}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Pending</span>
                <span className="stat-value">
                  {formatCurrency(
                    pending.reduce((sum, invoice) => sum + (invoice.total || 0), 0),
                    pending[0]?.currency || "USD",
                  )}
                </span>
              </div>
            </div>
            <p className="caption mt-4">
              Paid means you marked the payment received. Revercue does not connect to a bank.
            </p>
          </div>
          <div className="card card-lg">
            <h3 className="serif" style={{ fontSize: 17 }}>
              Invoices
            </h3>
            <div className="stack-2 mt-2">
              {invoices.length === 0 && <p className="caption">No invoices for this client.</p>}
              {invoices.map((invoice) => (
                <Link key={invoice.id} to={`/invoices/${invoice.id}/edit`} className="between row-link" style={{ padding: "8px 0" }}>
                  <span style={{ fontSize: 13 }}>{invoice.title}</span>
                  <span className="mono">{formatCurrency(invoice.total || 0, invoice.currency)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={commsOpen}
        onClose={() => setCommsOpen(false)}
        title="Add communication"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCommsOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={addCommunication} loading={busy}>
              Save entry
            </Button>
          </>
        }
      >
        <div className="stack-4">
          <div className="segmented">
            <button type="button" aria-pressed={entryType === "message_sent"} onClick={() => setEntryType("message_sent")}>
              Message sent
            </button>
            <button type="button" aria-pressed={entryType === "follow_up"} onClick={() => setEntryType("follow_up")}>
              Follow-up
            </button>
          </div>
          <Select
            id="comm-channel"
            label="Channel"
            value={channel}
            options={CHANNELS.map((value) => ({ value, label: value }))}
            onChange={setChannel}
          />
          <Textarea
            id="comm-message"
            label="What did you send?"
            value={message}
            onChange={setMessage}
            rows={5}
            helper="The gist is enough. You don't need to paste the whole message."
          />
          <div className="inline">
            {client.phone && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  window.open(
                    `https://wa.me/${client.phone!.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                disabled={!message.trim()}
              >
                Open in WhatsApp
              </button>
            )}
            {client.email && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  window.open(
                    `mailto:${encodeURIComponent(client.email)}?body=${encodeURIComponent(message)}`,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                disabled={!message.trim()}
              >
                Open in Email
              </button>
            )}
          </div>
          <Input
            id="comm-time"
            label="Estimated time spent"
            value={estimatedTime}
            onChange={setEstimatedTime}
            placeholder="15 minutes"
            helper="Optional. Used for the effort view."
          />
          <Input id="comm-next" label="Next step" value={nextStep} onChange={setNextStep} placeholder="Wait for reply" />
          {entryType === "follow_up" && (
            <div className="input-group">
              <label htmlFor="comm-date">Follow-up date</label>
              <input
                id="comm-date"
                type="date"
                className="input"
                value={followUpDate}
                onChange={(event) => setFollowUpDate(event.target.value)}
              />
              <span className="helper">It appears on the dashboard on that date.</span>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
        title="Add a note"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setNoteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNote} loading={busy} disabled={!note.trim()}>
              Save note
            </Button>
          </>
        }
      >
        <Textarea
          id="client-note"
          label="Note"
          value={note}
          onChange={setNote}
          rows={6}
          helper="Private to your account."
        />
      </Modal>

      <Modal open={interestOpen} onClose={() => setInterestOpen(false)} title="Interest breakdown" size="md">
        {interest.isLoading && <Skeleton height={120} />}
        {interest.data && (
          <div className="stack-4">
            <div className="between">
              <span className="stat-value">{interest.data.score}%</span>
              <Badge variant="gold">{interest.data.label}</Badge>
            </div>
            <p className="caption">A hypothesis, not a fact. Based on behaviour, never on what the client says.</p>
            <div className="stack-2">
              {interest.data.signals.map((signal) => (
                <div className="between" key={signal.label} style={{ fontSize: 13 }}>
                  <span>
                    {signal.label} {signal.value && <span className="caption">· {signal.value}</span>}
                  </span>
                  <span className="mono">{signal.contribution > 0 ? `+${signal.contribution}` : signal.contribution}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {interest.isError && <p className="caption">{errorMessage((interest.error as ApiError)?.code)}</p>}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteComms)}
        onClose={() => setDeleteComms(null)}
        onConfirm={async () => {
          if (deleteComms) await crmApi.removeCommunication(deleteComms.id);
          await queryClient.invalidateQueries({ queryKey: ["client", id] });
        }}
        title="Delete this entry?"
        description="The entry is removed from the communication log. This cannot be undone."
        confirmLabel="Delete entry"
      />
    </>
  );
}

function documentPath(document: DocumentSummary): string {
  if (document.invoice_number || document.due_date) return `/invoices/${document.id}/edit`;
  if (typeof document.total === "number") return `/invoices/${document.id}/edit`;
  if (document.submissions_count != null) return `/forms/${document.id}/edit`;
  return `/proposals/${document.id}/edit`;
}
