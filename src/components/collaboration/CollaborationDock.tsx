import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CloudOff, Copy, RefreshCw, Users, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
import { CollaborationChat } from "./CollaborationChat";
import {
  collaborationApi,
  type ChatMessage,
  type CollabDocumentType,
  type CollabOverview,
  type EditingStateName,
} from "../../api/collaboration";
import { ApiError } from "../../types/api";
import { deviceId, saveOfflineSession } from "../../lib/offline-store";

const ROUTE_PATTERNS: { pattern: RegExp; type: CollabDocumentType }[] = [
  { pattern: /^\/proposals\/([^/]+)\/edit$/, type: "proposal" },
  { pattern: /^\/contracts\/([^/]+)\/edit$/, type: "contract" },
  { pattern: /^\/invoices\/([^/]+)\/edit$/, type: "invoice" },
  { pattern: /^\/forms\/([^/]+)\/edit$/, type: "form" },
];

function documentFromPath(pathname: string): { type: CollabDocumentType; id: string } | null {
  for (const entry of ROUTE_PATTERNS) {
    const match = entry.pattern.exec(pathname);
    if (match) return { type: entry.type, id: decodeURIComponent(match[1]) };
  }
  return null;
}


function messageOf(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error && err.message) return err.message;
  return "Something went wrong. Try again.";
}

const STATE_COPY: Record<string, string> = {
  normal_online_editing: "You are editing",
  contributor_invited: "Invitation sent, waiting for the contributor",
  contributor_editing: "Contributor is editing",
  offline_preparing: "Preparing Offline Mode",
  offline_editing: "Offline Mode is active",
  offline_completed: "Offline editing completed, waiting to sync",
  syncing: "Syncing offline changes",
  sync_failed: "Sync failed",
  conflict_review: "Review needed",
};

/**
 * One dock, every builder. It is mounted once by the app shell and appears on
 * any builder route, so proposals, contracts, invoices and forms all get
 * Shareable Builder and Offline Builder without four copies of the UI.
 */
export function CollaborationDock() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const target = useMemo(() => documentFromPath(pathname), [pathname]);

  const [open, setOpen] = useState(false);
  const [overview, setOverview] = useState<CollabOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [planBlocked, setPlanBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [tab, setTab] = useState<"share" | "chat" | "offline">("share");
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!target) return;
    try {
      const data = await collaborationApi.overview(target.type, target.id);
      setOverview(data);
      setError(null);
      setPlanBlocked(false);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        setPlanBlocked(true);
        setError(null);
        return;
      }
      if (err instanceof ApiError && err.status === 401) return;
      setError(messageOf(err));
    }
  }, [target]);

  useEffect(() => {
    setOverview(null);
    setLink(null);
    setPreviewTitle(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!target) return;
    void load();
    const timer = window.setInterval(() => void load(), 4000);
    return () => window.clearInterval(timer);
  }, [target, load]);

  // While a contributor is editing, show the live state of the document.
  useEffect(() => {
    if (!target || !open || overview?.state.state !== "contributor_editing") return;
    let cancelled = false;
    const tick = async () => {
      try {
        const data = await collaborationApi.preview(target.type, target.id);
        if (cancelled) return;
        setPreviewTitle(data.document?.title ?? null);
        setLastSaved(data.state.last_saved_at ?? null);
      } catch {
        /* the poll recovers on the next cycle */
      }
    };
    void tick();
    const timer = window.setInterval(() => void tick(), 3000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [open, target, overview?.state.state]);

  if (!target) return null;

  const state: EditingStateName = overview?.state.state ?? "normal_online_editing";
  const contributorLocked = state === "contributor_editing" || state === "contributor_invited";
  const offlineLocked =
    state === "offline_preparing" ||
    state === "offline_editing" ||
    state === "offline_completed" ||
    state === "syncing" ||
    state === "sync_failed";

  const invite = async () => {
    if (!email.trim()) {
      setError("Enter the contributor's email address.");
      return;
    }
    setBusy("invite");
    try {
      const result = await collaborationApi.invite(target.type, target.id, email.trim());
      setLink(result.invitation.url);
      await navigator.clipboard?.writeText(result.invitation.url).catch(() => undefined);
      setEmail("");
      await load();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const complete = async () => {
    if (!window.confirm("Complete this contribution? The contributor will lose editing access immediately and the chat will close.")) {
      return;
    }
    setBusy("complete");
    try {
      await collaborationApi.complete(target.type, target.id);
      setLink(null);
      await load();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const revoke = async () => {
    if (!window.confirm("Revoke this invitation? The link stops working immediately.")) return;
    setBusy("revoke");
    try {
      await collaborationApi.revoke(target.type, target.id);
      setLink(null);
      await load();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const enableOffline = async () => {
    setBusy("offline");
    try {
      const prepared = await collaborationApi.preview(target.type, target.id);
      const lock = await collaborationApi.startOffline(
        target.type,
        target.id,
        deviceId(),
        prepared.state.cloud_version ?? null,
      );
      await saveOfflineSession({
        documentType: target.type,
        documentId: target.id,
        title: prepared.document?.title ?? "Document",
        sessionId: lock.sessionId,
        lockToken: lock.lockToken,
        preparedVersion: prepared.state.cloud_version ?? null,
        content: (prepared.document?.content ?? {}) as unknown as Record<string, unknown>,
        draft: (prepared.document?.content ?? {}) as unknown as Record<string, unknown>,
        status: "editing",
        serverCompleted: false,
        completedAt: null,
        lastLocalSaveAt: new Date().toISOString(),
        deviceId: deviceId(),
      });
      navigate(`/offline-editor/${target.type}/${target.id}`);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const loadMessages = useCallback(
    async (after: string | null): Promise<ChatMessage[]> => {
      if (!target) return [];
      const data = await collaborationApi.messages(target.type, target.id, after);
      return data.data;
    },
    [target],
  );

  const sendMessage = useCallback(
    async (body: string) => {
      if (!target) return;
      await collaborationApi.sendMessage(target.type, target.id, body);
    },
    [target],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-[#c9a961]/40 bg-[#141414] px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:border-[#c9a961]"
        aria-expanded={open}
        aria-controls="collaboration-panel"
      >
        {offlineLocked ? <CloudOff size={16} /> : <Users size={16} />}
        {STATE_COPY[state] ?? "Collaborate"}
        {state === "contributor_editing" && <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />}
      </button>

      {open && (
        <section
          id="collaboration-panel"
          aria-label="Shareable Builder and Offline Builder"
          className="fixed bottom-24 right-5 z-40 max-h-[75vh] w-[min(420px,calc(100vw-2.5rem))] overflow-y-auto rounded-2xl border border-white/10 bg-[#111] p-4 text-white shadow-2xl"
        >
          <header className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Work together</h2>
              <p className="text-xs text-white/50">
                Shareable Builder and Offline Builder · {STATE_COPY[state] ?? state}
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close panel" className="rounded p-1 hover:bg-white/10">
              <X size={16} />
            </button>
          </header>

          {planBlocked && (
            <div className="rounded-xl border border-[#c9a961]/30 bg-[#c9a961]/10 p-3 text-sm">
              <p className="font-medium text-[#e8d9a8]">Included with Revercue Scale</p>
              <p className="mt-1 text-white/70">
                Shareable Builder and Offline Builder are part of Scale. Upgrade to invite a contributor or take a
                document offline.
              </p>
              <Button className="mt-3" size="sm" onClick={() => navigate("/settings/plan")}>
                View plans
              </Button>
            </div>
          )}

          {!planBlocked && (
            <>
              <div className="mb-3 flex gap-1 rounded-lg bg-white/[0.04] p-1 text-xs" role="tablist">
                {(["share", "chat", "offline"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={tab === item}
                    onClick={() => setTab(item)}
                    className={`flex-1 rounded-md px-2 py-1.5 capitalize transition ${
                      tab === item ? "bg-[#c9a961] text-black" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item === "share" ? "Contributor" : item === "chat" ? "Chat" : "Offline"}
                  </button>
                ))}
              </div>

              {error && <p className="mb-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>}

              {tab === "share" && (
                <div className="space-y-3">
                  {contributorLocked ? (
                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm">
                      <p className="font-medium text-emerald-200">
                        {state === "contributor_editing" ? "A contributor is editing now" : "Waiting for the contributor to open the link"}
                      </p>
                      <p className="mt-1 text-white/70">
                        {contributorLocked && overview?.invitations[0]
                          ? `${overview.invitations[0].contributor_email} · ${
                              overview.invitations[0].last_saved_at
                                ? `last saved ${new Date(overview.invitations[0].last_saved_at).toLocaleTimeString()}`
                                : "no save yet"
                            }`
                          : ""}
                      </p>
                      {previewTitle && <p className="mt-1 text-xs text-white/50">Watching: {previewTitle}</p>}
                      <p className="mt-2 text-xs text-white/50">
                        Your editing is locked until the contribution completes.{" "}
                        {lastSaved ? `Latest save ${new Date(lastSaved).toLocaleTimeString()}.` : ""}
                      </p>
                      <Button className="mt-3" size="sm" loading={busy === "complete"} onClick={() => void complete()}>
                        Complete contribution
                      </Button>
                    </div>
                  ) : offlineLocked ? (
                    <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm">
                      <p className="font-medium text-amber-200">Offline Mode holds this document</p>
                      <p className="mt-1 text-white/70">
                        Editing is locked online until the offline version is synced or released.
                      </p>
                      <Button className="mt-3" size="sm" onClick={() => navigate(`/offline-editor/${target.type}/${target.id}`)}>
                        Open offline session
                      </Button>
                    </div>
                  ) : (
                    <>
                      <label className="block text-xs uppercase tracking-wide text-white/50" htmlFor="contributor-email">
                        Contributor email
                      </label>
                      <input
                        id="contributor-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="name@studio.com"
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#c9a961]/60 focus:outline-none"
                      />
                      <p className="text-xs text-white/45">
                        The email labels the invitation and is kept in this document's contributor history. It is not a
                        password: the secure link is what grants access.
                      </p>
                      <Button size="sm" loading={busy === "invite"} onClick={() => void invite()}>
                        Create invitation link
                      </Button>

                      {link && (
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-xs">
                          <p className="mb-1 text-white/60">Share this link with your contributor:</p>
                          <code className="block break-all text-[11px] text-[#e8d9a8]">{link}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() => void navigator.clipboard?.writeText(link)}
                          >
                            <Copy size={12} className="mr-1" /> Copy link
                          </Button>
                        </div>
                      )}

                      {overview && overview.previous_contributors.length > 0 && (
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-wide text-white/50">Add previous contributor</p>
                          <div className="flex flex-wrap gap-1">
                            {overview.previous_contributors.map((person) => (
                              <button
                                key={person.contributor_email}
                                type="button"
                                onClick={() => setEmail(person.contributor_email)}
                                className="rounded-full border border-white/15 px-2 py-1 text-[11px] text-white/70 hover:border-[#c9a961] hover:text-white"
                              >
                                {person.contributor_email}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {overview && overview.invitations.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wide text-white/50">History</p>
                          {overview.invitations.slice(0, 5).map((invitation) => (
                            <div key={invitation.id} className="flex items-center justify-between text-xs text-white/60">
                              <span className="truncate">{invitation.contributor_email}</span>
                              <span className="ml-2 shrink-0 capitalize text-white/40">{invitation.status}</span>
                            </div>
                          ))}
                          {state !== "normal_online_editing" && (
                            <Button variant="ghost" size="sm" loading={busy === "revoke"} onClick={() => void revoke()}>
                              Revoke access
                            </Button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {tab === "chat" && (
                <CollaborationChat
                  load={loadMessages}
                  send={sendMessage}
                  disabled={state !== "contributor_editing"}
                  role="owner"
                />
              )}

              {tab === "offline" && (
                <div className="space-y-3 text-sm">
                  {offlineLocked ? (
                    <>
                      <p className="text-white/70">
                        An offline session holds the editing lock. Continue in the offline editor, complete it, then
                        sync when you are back online.
                      </p>
                      <Button size="sm" onClick={() => navigate(`/offline-editor/${target.type}/${target.id}`)}>
                        Open offline session
                      </Button>
                    </>
                  ) : contributorLocked ? (
                    <p className="text-white/70">
                      Finish the contributor session before enabling Offline Mode. Only one editor may hold a document.
                    </p>
                  ) : (
                    <>
                      <p className="text-white/70">
                        Enabling Offline Mode saves this document, downloads it to this browser and locks the online
                        copy until you sync.
                      </p>
                      <ul className="list-disc space-y-1 pl-5 text-xs text-white/50">
                        <li>Use the same device and the same browser.</li>
                        <li>AI help, publishing, client links and email are unavailable offline.</li>
                        <li>Keep the tab's local data: clearing site data discards unsynced edits.</li>
                      </ul>
                      <Button size="sm" loading={busy === "offline"} onClick={() => void enableOffline()}>
                        <CloudOff size={14} className="mr-1" /> Enable Offline Mode
                      </Button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => void load()}
                    className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70"
                  >
                    <RefreshCw size={12} /> Refresh status
                  </button>
                </div>
              )}

              {!overview && !planBlocked && (
                <div className="flex justify-center py-4">
                  <Spinner size={20} color="var(--gold)" />
                </div>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
}
