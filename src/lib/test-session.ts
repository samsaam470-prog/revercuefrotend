/**
 * Marker for a signed-in review/test session.
 *
 * The product normally authenticates through AuthAction's SDK. The test account
 * uses a Revercue-issued token instead, so the app needs to remember that this
 * browser holds one. Only a presence marker is stored here; the token itself
 * stays in the existing token store.
 */

const TEST_SESSION_KEY = "revercue_test_session";

export const testSessionStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TEST_SESSION_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    try {
      localStorage.setItem(TEST_SESSION_KEY, token);
    } catch {
      /* storage unavailable */
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(TEST_SESSION_KEY);
    } catch {
      /* storage unavailable */
    }
  },
};
