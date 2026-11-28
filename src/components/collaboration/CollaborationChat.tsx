import { useCallback, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../ui/Button";
import type { ChatMessage } from "../../api/collaboration";

/**
 * Temporary chat. Messages are held by the server only while the contribution
 * session is live and are deleted when it ends, so this panel does not keep a
 * local copy either: closing it drops everything it received.
 */
export function CollaborationChat({
  load,
  send,
  disabled,
  role,
}: {
  load: (after: string | null) => Promise<ChatMessage[]>;
  send: (body: string) => Promise<void>;
  disabled: boolean;
  role: "owner" | "contributor";
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const refresh = useCallback(async () => {
    if (disabled) return;
    try {
      const last = messages.length > 0 ? messages[messages.length - 1].created_at : null;
      const next = await load(last);
      if (next.length > 0) {
        setMessages((current) => {
          const seen = new Set(current.map((item) => item.id));
          return [...current, ...next.filter((item) => !seen.has(item.id))];
        });
      }
      setError(null);
    } catch {
      setError("The chat could not be reached. It is only available while the contribution is active.");
    }
  }, [disabled, load, messages]);

  useEffect(() => {
    if (disabled) {
      setMessages([]);
      return;
    }
    void refresh();
    const timer = window.setInterval(() => void refresh(), 3000);
    return () => window.clearInterval(timer);
    // `messages` is intentionally excluded: refresh reads it through the closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, refresh]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages.length]);

  const submit = async () => {
    const body = text.trim();
    if (!body || disabled) return;
    setBusy(true);
    try {
      await send(body);
      setText("");
      await refresh();
    } catch {
      setError("That message was not sent. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-white/50">
        Temporary chat. Messages are deleted when the contribution ends and are never added to the document history.
      </p>
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Temporary collaboration chat"
        className="max-h-56 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3"
      >
        {disabled && <p className="text-sm text-white/50">The chat is closed because this session has ended.</p>}
        {!disabled && messages.length === 0 && (
          <p className="text-sm text-white/50">No messages yet. Use this space for questions about the document only.</p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
              message.author === role
                ? "ml-auto bg-[#c9a961]/20 text-white"
                : "bg-white/[0.06] text-white/85"
            }`}
          >
            <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/40">
              {message.author === "owner" ? "Document owner" : "Contributor"}
            </span>
            {message.body}
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-amber-300">{error}</p>}
      <div className="flex items-end gap-2">
        <label className="sr-only" htmlFor="collab-chat-input">
          Message
        </label>
        <textarea
          id="collab-chat-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submit();
            }
          }}
          rows={2}
          maxLength={2000}
          disabled={disabled}
          placeholder={disabled ? "Session ended" : "Write a message"}
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#c9a961]/60 focus:outline-none disabled:opacity-50"
        />
        <Button onClick={() => void submit()} loading={busy} disabled={disabled || !text.trim()}>
          <Send size={14} />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}
