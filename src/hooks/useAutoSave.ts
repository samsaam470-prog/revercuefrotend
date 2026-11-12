import { useCallback, useEffect, useRef, useState } from "react";
import { filesApi } from "../api/files";

export type SaveState = "saved" | "saving" | "unsaved" | "error";

interface Options {
  /** Explicit save handler (PATCH). */
  onSave: (payload: unknown) => Promise<void>;
  /** The beacon path, e.g. /api/proposals/:id/autosave. */
  beaconPath?: string;
  enabled?: boolean;
  intervalMs?: number;
}

/**
 * Auto-save: the 60-second interval + the session-end beacon + the explicit save.
 * The payload is whatever the builder passes; the hook only owns the timing.
 */
export function useAutoSave({ onSave, beaconPath, enabled = true, intervalMs = 60_000 }: Options) {
  const [state, setState] = useState<SaveState>("saved");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const payloadRef = useRef<unknown>(null);
  const dirtyRef = useRef(false);
  const savingRef = useRef(false);

  const markDirty = useCallback((payload: unknown) => {
    payloadRef.current = payload;
    dirtyRef.current = true;
    setState((current) => (current === "saving" ? current : "unsaved"));
  }, []);

  const save = useCallback(
    async (payload?: unknown) => {
      if (payload !== undefined) payloadRef.current = payload;
      const current = payloadRef.current;
      if (current == null) return;
      setState("saving");
      savingRef.current = true;
      try {
        await onSave(current);
        dirtyRef.current = false;
        setLastSavedAt(new Date());
        setState("saved");
      } catch {
        setState("error");
      } finally {
        savingRef.current = false;
      }
    },
    [onSave],
  );

  useEffect(() => {
    if (!enabled) return;
    const timer = window.setInterval(() => {
      if (dirtyRef.current && !savingRef.current) void save();
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [enabled, intervalMs, save]);

  useEffect(() => {
    if (!enabled || !beaconPath) return;

    const flush = () => {
      if (!dirtyRef.current || payloadRef.current == null) return;
      filesApi.beacon(beaconPath, { content: payloadRef.current });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [beaconPath, enabled]);

  return { state, markDirty, save, lastSavedAt, isDirty: dirtyRef };
}
