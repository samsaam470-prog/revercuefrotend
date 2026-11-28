/**
 * Offline Builder storage.
 *
 * A prepared document, its session identity and its lock token live in
 * IndexedDB so they survive a refresh, a browser restart and a device being
 * offline. Nothing here is authoritative: the server holds the lock, and only
 * a successful sync releases it.
 */

export interface OfflineSession {
  documentType: "proposal" | "contract" | "invoice" | "form";
  documentId: string;
  title: string;
  sessionId: string;
  lockToken: string;
  preparedVersion: string | null;
  /** Editable content as prepared from the cloud. */
  content: Record<string, unknown>;
  /** Local edits, flushed on every change. */
  draft: Record<string, unknown>;
  status: "editing" | "completed" | "synced";
  /** Whether the server has acknowledged Complete (needed before Sync). */
  serverCompleted: boolean;
  completedAt: string | null;
  lastLocalSaveAt: string;
  deviceId: string;
}

const DB_NAME = "revercue-offline";
const DB_VERSION = 1;
const STORE = "sessions";
const DEVICE_KEY = "revercue.offline.device";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "key" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const keyOf = (type: string, id: string) => `${type}:${id}`;

async function withStore<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const request = fn(tx.objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

export function deviceId(): string {
  let value = localStorage.getItem(DEVICE_KEY);
  if (!value) {
    value = `dev_${crypto.randomUUID()}`;
    localStorage.setItem(DEVICE_KEY, value);
  }
  return value;
}

export async function saveOfflineSession(session: OfflineSession): Promise<void> {
  await withStore("readwrite", (store) => store.put({ ...session, key: keyOf(session.documentType, session.documentId) }));
}

export async function readOfflineSession(
  type: string,
  id: string,
): Promise<OfflineSession | null> {
  const row = await withStore<({ key: string } & OfflineSession) | undefined>("readonly", (store) =>
    store.get(keyOf(type, id)),
  );
  return row ?? null;
}

export async function listOfflineSessions(): Promise<OfflineSession[]> {
  const rows = await withStore<({ key: string } & OfflineSession)[]>("readonly", (store) => store.getAll());
  return rows ?? [];
}

export async function patchOfflineDraft(
  type: string,
  id: string,
  draft: Record<string, unknown>,
): Promise<OfflineSession | null> {
  const current = await readOfflineSession(type, id);
  if (!current) return null;
  const next: OfflineSession = {
    ...current,
    draft,
    lastLocalSaveAt: new Date().toISOString(),
  };
  await saveOfflineSession(next);
  return next;
}

export async function markOfflineCompleted(type: string, id: string): Promise<OfflineSession | null> {
  const current = await readOfflineSession(type, id);
  if (!current) return null;
  const next: OfflineSession = { ...current, status: "completed", completedAt: new Date().toISOString() };
  await saveOfflineSession(next);
  return next;
}

export async function markOfflineServerCompleted(type: string, id: string): Promise<OfflineSession | null> {
  const current = await readOfflineSession(type, id);
  if (!current) return null;
  const next: OfflineSession = { ...current, serverCompleted: true };
  await saveOfflineSession(next);
  return next;
}

export async function markOfflineReopened(type: string, id: string): Promise<OfflineSession | null> {
  const current = await readOfflineSession(type, id);
  if (!current) return null;
  const next: OfflineSession = { ...current, status: "editing", completedAt: null, serverCompleted: false };
  await saveOfflineSession(next);
  return next;
}

export async function clearOfflineSession(type: string, id: string): Promise<void> {
  await withStore("readwrite", (store) => store.delete(keyOf(type, id)));
}

/**
 * Registers the service worker that keeps the app shell and the editor's
 * static assets available offline. Safe to call more than once.
 */
export function registerOfflineWorker(): void {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return;
  navigator.serviceWorker.register("/offline-sw.js").catch(() => {
    /* Offline editing still works with IndexedDB alone; the shell may not. */
  });
}
