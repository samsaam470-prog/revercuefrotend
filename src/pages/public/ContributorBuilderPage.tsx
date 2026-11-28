import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Eye, Lock, MessageSquare } from "lucide-react";
import { BlockEditor } from "../../components/collaboration/BlockEditor";
import { StructuredEditor } from "../../components/collaboration/StructuredEditor";
import { CollaborationChat } from "../../components/collaboration/CollaborationChat";
import { PreviewPane } from "../../components/builder/PreviewPane";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { contributorApi, type ContributorSession, type ChatMessage } from "../../api/collaboration";
import { ApiError } from "../../types/api";
import type { DocContent } from "../../types";


function messageOf(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error && err.message) return err.message;
  return "Something went wrong. Try again.";
}

type SaveState = "idle" | "saving" | "saved" | "unsaved" | "blocked";

/**
 * The contributor's editing page. Reached from the invitation link, no account
 * and no session: the token in the URL is the whole credential, and every save
 * is re-checked by the server against the live contribution session.
 */
export function ContributorBuilderPage() {
  const { token = "" } = useParams<{ token: string }>();
  const [data, setData] = useState<ContributorSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [tab, setTab] = useState<"document" | "chat">("document");
  const [preview, setPreview] = useState(false);
  const [finished, setFinished] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const pendingWrite = useRef<Record<string, unknown> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const opened = await contributorApi.open(token);
        if (cancelled) return;
        setData(opened);
        setDraft(opened.document.content);
        setSavedAt(opened.session.last_saved_at);
      } catch (err) {
        if (!cancelled) setError(messageOf(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // If the owner completes or revokes the contribution, the editor locks here.
  useEffect(() => {
    if (!data) return;
    const check = window.setInterval(async () => {
      try {
        const state = await contributorApi.state(token);
        if (state.status !== "active" || state.state !== "contributor_editing") {
          setFinished(true);
          setSaveState("blocked");
        }
        if (state.last_saved_at) setSavedAt(state.last_saved_at);
      } catch {
        /* transient: the next poll retries */
      }
    }, 4000);
    return () => window.clearInterval(check);
  }, [data, token]);

  const flush = useCallback(
    async (content: Record<string, unknown>) => {
      setSaveState("saving");
      pendingWrite.current = content;
      try {
        const result = await contributorApi.save(token, content);
        pendingWrite.current = null;
        setSavedAt(result.saved_at);
        setSaveState("saved");
      } catch (err) {
        setSaveState("unsaved");
        setError(messageOf(err));
      }
    },
    [token],
  );

  const change = (next: Record<string, unknown>) => {
    setDraft(next);
    setSaveState("unsaved");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void flush(next), 1200);
  };

  const complete = async () => {
    if (saveState === "unsaved" || saveState === "saving" || pendingWrite.current) {
      const proceed = window.confirm(
        "Some of your latest changes have not been saved yet. Complete anyway? Only the last saved version is kept.",
      );
      if (!proceed) return;
    }
    setBusy("complete");
    try {
      if (pendingWrite.current) await flush(pendingWrite.current);
      await contributorApi.complete(token);
      setFinished(true);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const loadMessages = useCallback(
    async (after: string | null): Promise<ChatMessage[]> => {
      const result = await contributorApi.messages(token, after);
      return result.data;
    },
    [token],
  );

  const sendMessage = useCallback(
    async (body: string) => {
      await contributorApi.sendMessage(token, body);
    },
    [token],
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b]">
        <Spinner size={20} color="var(--gold)" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-white">
        <h1 className="text-xl font-semibold">This invitation link cannot be used</h1>
        <p className="mt-2 text-sm text-white/60">{error}</p>
        <p className="mt-3 text-sm text-white/50">
          Ask the document owner for a new link. Links expire, and an owner can revoke one at any time.
        </p>
      </div>
    );
  }

  if (!data) return null;

  const locked = finished || saveState === "blocked";
  const type = data.document.type;
  const isBlocks = type === "proposal" || type === "contract";
  const docContent = draft as unknown as DocContent;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-wide text-[#c9a961]">Shareable Builder</p>
          <h1 className="mt-1 text-2xl font-semibold">{data.document.title}</h1>
          <p className="mt-1 text-sm text-white/60">
            You are editing as {data.session.contributor_email}. No account is needed: this link is your access, and the
            document owner can see your changes and your save times.
          </p>
        </header>

        {locked && (
          <div className="mb-5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
            <p className="flex items-center gap-2 font-medium text-white">
              <Lock size={15} /> This contribution has ended
            </p>
            <p className="mt-1">
              Editing and the temporary chat are closed. The owner has your latest saved version and can now edit,
              publish and send the document. You can close this tab.
            </p>
          </div>
        )}

        {error && data && <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1 rounded-lg bg-white/[0.04] p-1 text-xs">
            <button
              type="button"
              onClick={() => setTab("document")}
              className={`rounded-md px-3 py-1.5 ${tab === "document" ? "bg-[#c9a961] text-black" : "text-white/70"}`}
            >
              Document
            </button>
            <button
              type="button"
              onClick={() => setTab("chat")}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 ${
                tab === "chat" ? "bg-[#c9a961] text-black" : "text-white/70"
              }`}
            >
              <MessageSquare size={12} /> Chat
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span aria-live="polite">
              {saveState === "saving" && "Saving…"}
              {saveState === "saved" && savedAt && `Saved ${new Date(savedAt).toLocaleTimeString()}`}
              {saveState === "unsaved" && <span className="text-amber-300">Unsaved changes</span>}
              {saveState === "idle" && savedAt && `Last saved ${new Date(savedAt).toLocaleTimeString()}`}
            </span>
            {isBlocks && (
              <button type="button" onClick={() => setPreview(true)} className="flex items-center gap-1 hover:text-white">
                <Eye size={13} /> Preview
              </button>
            )}
          </div>
        </div>

        {tab === "document" ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            {isBlocks ? (
              <BlockEditor
                content={docContent}
                documentType={type as "proposal" | "contract"}
                disabled={locked}
                onChange={(next) => change(next as unknown as Record<string, unknown>)}
              />
            ) : (
              <StructuredEditor
                type={type as "invoice" | "form"}
                content={draft}
                disabled={locked}
                onChange={change}
              />
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <CollaborationChat load={loadMessages} send={sendMessage} disabled={locked} role="contributor" />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            You can edit content, sections, pricing, timelines and FAQs. Publishing, client links, email and client
            tracking stay with the owner.
          </p>
          <Button disabled={locked} loading={busy === "complete"} onClick={() => void complete()}>
            Complete contribution
          </Button>
        </div>
      </div>

      {isBlocks && (
        <PreviewPane
          open={preview}
          onClose={() => setPreview(false)}
          title={data.document.title}
          clientName="Your client"
          reference="Preview"
          blocks={docContent.blocks ?? []}
          doc={docContent}
        />
      )}
    </div>
  );
}
