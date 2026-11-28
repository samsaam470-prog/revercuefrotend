import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CloudOff, RefreshCw, RotateCcw, Wifi, WifiOff } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { BlockEditor } from "../../components/collaboration/BlockEditor";
import { StructuredEditor } from "../../components/collaboration/StructuredEditor";
import { collaborationApi } from "../../api/collaboration";
import { ApiError } from "../../types/api";
import {
  clearOfflineSession,
  markOfflineCompleted,
  markOfflineReopened,
  markOfflineServerCompleted,
  patchOfflineDraft,
  readOfflineSession,
  type OfflineSession,
} from "../../lib/offline-store";
import type { DocContent } from "../../types";

/**
 * The offline editing surface. Everything on this page reads from and writes to
 * IndexedDB, so it keeps working with the network down. The server lock is what
 * prevents the online copy from being edited at the same time, and Sync is the
 * only thing that releases it.
 */

function messageOf(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error && err.message) return err.message;
  return "Something went wrong. Try again.";
}

export function OfflineEditorPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<OfflineSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [online, setOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  const saveTimer = useRef<number | null>(null);

  const documentType = type as "proposal" | "contract" | "invoice" | "form" | undefined;

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    if (!documentType || !id) return;
    void readOfflineSession(documentType, id).then((row) => {
      setSession(row);
      setLoading(false);
    });
  }, [documentType, id]);

  const draft = session?.draft ?? {};

  const write = useCallback(
    (next: Record<string, unknown>) => {
      if (!session || session.status !== "editing") return;
      setSession({ ...session, draft: next });
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        void patchOfflineDraft(session.documentType, session.documentId, next).then((updated) => {
          if (updated) setSession(updated);
        });
      }, 300);
    },
    [session],
  );

  const complete = async () => {
    if (!session) return;
    setBusy("complete");
    setError(null);
    try {
      await patchOfflineDraft(session.documentType, session.documentId, session.draft);
      if (online) {
        await collaborationApi.completeOffline(session.documentType, session.documentId, session.sessionId);
        await markOfflineServerCompleted(session.documentType, session.documentId);
      }
      const updated = await markOfflineCompleted(session.documentType, session.documentId);
      setSession(updated);
      setNotice(
        online
          ? "Offline editing is complete and the document is now read-only. Sync when you are ready."
          : "Marked complete on this device. Revercue will confirm the completion when you are back online, before any sync.",
      );
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const reopen = async () => {
    if (!session) return;
    setBusy("reopen");
    try {
      if (online && session.serverCompleted) {
        await collaborationApi.reopenOffline(session.documentType, session.documentId, session.sessionId);
      }
      const updated = await markOfflineReopened(session.documentType, session.documentId);
      setSession(updated);
      setNotice("Editing resumed. Complete the document again before syncing.");
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const sync = async () => {
    if (!session) return;
    setBusy("sync");
    setError(null);
    try {
      await patchOfflineDraft(session.documentType, session.documentId, session.draft);
      if (!session.serverCompleted) {
        await collaborationApi.completeOffline(session.documentType, session.documentId, session.sessionId);
        await markOfflineServerCompleted(session.documentType, session.documentId);
      }
      await collaborationApi.syncOffline(session.documentType, session.documentId, {
        session_id: session.sessionId,
        lock_token: session.lockToken,
        expected_version: session.preparedVersion,
        content: session.draft,
      });
      await clearOfflineSession(session.documentType, session.documentId);
      setNotice("Synced. Normal online editing is available again.");
      navigate(`/${session.documentType}s/${session.documentId}/edit`);
    } catch (err) {
      setError(`${messageOf(err)} Your offline copy is still here and the document stays locked.`);
    } finally {
      setBusy(null);
    }
  };

  const release = async () => {
    if (!session) return;
    if (
      !window.confirm(
        "Release the lock without syncing? Unsynced offline changes on this device will be discarded. Use this only if the device is lost or the browser data is gone.",
      )
    ) {
      return;
    }
    setBusy("release");
    try {
      await collaborationApi.releaseOffline(session.documentType, session.documentId);
      await clearOfflineSession(session.documentType, session.documentId);
      navigate(`/${session.documentType}s/${session.documentId}/edit`);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const lastSavedLabel = useMemo(() => {
    if (!session?.lastLocalSaveAt) return "not yet";
    return new Date(session.lastLocalSaveAt).toLocaleTimeString();
  }, [session?.lastLocalSaveAt]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b]">
        <Spinner size={20} color="var(--gold)" />
      </div>
    );
  }

  if (!session || !documentType) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-white">
        <h1 className="text-xl font-semibold">No offline copy on this device</h1>
        <p className="mt-2 text-sm text-white/60">
          Offline Mode has to be prepared from the document builder while you are online, on this device and in this
          browser. Open the document and choose Enable Offline Mode.
        </p>
        <Button className="mt-4" onClick={() => navigate("/dashboard")}>
          Back to the dashboard
        </Button>
      </div>
    );
  }

  const readOnly = session.status !== "editing";
  const canSync = session.status === "completed" && online;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/50">
              {online ? <Wifi size={13} /> : <WifiOff size={13} />}
              {online ? "Online" : "Offline"} · Offline Builder
            </p>
            <h1 className="mt-1 text-xl font-semibold">{session.title}</h1>
            <p className="text-xs text-white/50">
              Saved on this device {lastSavedLabel} · {session.status === "editing" ? "Editable" : readOnly ? "Read-only until synced" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {session.status === "editing" && (
              <Button loading={busy === "complete"} onClick={() => void complete()}>
                Complete offline editing
              </Button>
            )}
            {session.status === "completed" && (
              <>
                <Button variant="secondary" loading={busy === "reopen"} onClick={() => void reopen()}>
                  <RotateCcw size={14} className="mr-1" /> Reopen
                </Button>
                <Button loading={busy === "sync"} disabled={!canSync} onClick={() => void sync()}>
                  <RefreshCw size={14} className="mr-1" /> Sync now
                </Button>
              </>
            )}
          </div>
        </header>

        <div className="mb-5 rounded-xl border border-[#c9a961]/30 bg-[#c9a961]/10 px-4 py-3 text-sm text-[#e8d9a8]">
          <p className="flex items-center gap-2 font-medium">
            <CloudOff size={15} /> Offline Mode is active
          </p>
          <p className="mt-1 text-white/70">
            The online copy of this document is locked and cannot be edited anywhere else until you sync. AI help,
            publishing, client links, email and client tracking are unavailable here.
          </p>
          {!online && (
            <p className="mt-1 text-white/60">Sync appears as soon as this device is back online and editing is complete.</p>
          )}
        </div>

        {notice && <p className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">{notice}</p>}
        {error && <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          {(documentType === "proposal" || documentType === "contract") && (
            <BlockEditor
              content={draft as unknown as DocContent}
              documentType={documentType}
              disabled={readOnly}
              onChange={(next) => write(next as unknown as Record<string, unknown>)}
            />
          )}
          {(documentType === "invoice" || documentType === "form") && (
            <StructuredEditor
              type={documentType}
              content={draft}
              disabled={readOnly}
              onChange={write}
            />
          )}
        </div>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
          <p>
            Browser data for this site holds the unsynced copy. Clearing site data or losing this device discards it.
          </p>
          <button type="button" onClick={() => void release()} className="underline hover:text-red-300">
            Release the lock without syncing
          </button>
        </footer>
      </div>
    </div>
  );
}
