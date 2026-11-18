const TOKEN_KEY = "revercue_token";
const DRAFT_PREFIX = "revercue_draft:";

export const tokenStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage unavailable */
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable */
    }
  },
};

export const draftStore = {
  save(key: string, value: unknown): void {
    try {
      localStorage.setItem(DRAFT_PREFIX + key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  },
  load<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(DRAFT_PREFIX + key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  clear(key: string): void {
    try {
      localStorage.removeItem(DRAFT_PREFIX + key);
    } catch {
      /* storage unavailable */
    }
  },
};
