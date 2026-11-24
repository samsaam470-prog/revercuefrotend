import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthAction } from "@authaction/web-sdk/react";
import { authApi } from "../api/auth";
import { setUnauthorizedHandler, setTokenProvider } from "../api/client";
import { tokenStore } from "../lib/storage";
import { testSessionStore } from "../lib/test-session";
import { clearReturnTo } from "../lib/authaction";
import { logAuthFailure } from "../lib/auth-diagnostics";
import type { User } from "../types";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  /** The API could not be reached. The session is kept, not cleared. */
  offline: boolean;
  isAuthenticated: boolean;
  /** True when the session came from the review/test account, not AuthAction. */
  isTestSession: boolean;
  onboardingDestination: string | null;
  setSession: (token: string, user?: User) => void;
  /** Starts a review/test session backed by a Revercue-issued token. */
  startTestSession: (token: string, user: User) => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<User | null>;
  getAccessToken: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthState | null>(null);

/**
 * `useAuthAction()` returns a new object on every render, so its fields — not
 * the object — must be the effect dependencies. Depending on `sdk` itself
 * recreated `getAccessToken` and `refresh` on every render, which made the
 * bootstrap effect call `/api/auth/me` in a loop: each response set `user`,
 * which re-rendered, which re-ran the effect. On the callback this fought the
 * post-sign-in navigation and could bounce the user to /login or
 * /session-expired instead of the dashboard.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    isAuthenticated: sdkIsAuthenticated,
    isLoading: sdkIsLoading,
    getAccessToken: sdkGetAccessToken,
    loginWithRedirect,
    logout: sdkLogout,
  } = useAuthAction();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [offline, setOffline] = useState(false);
  const [onboardingDestination, setOnboardingDestination] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const [testToken, setTestToken] = useState<string | null>(() => testSessionStore.get());
  const testTokenRef = useRef<string | null>(testToken);
  const navigate = useNavigate();

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    // A review/test session owns the token even if an AuthAction session also
    // exists, so review actions cannot accidentally use the wrong identity.
    if (testTokenRef.current) return testTokenRef.current;
    if (!sdkIsAuthenticated) return null;
    try {
      const t = await sdkGetAccessToken();
      tokenRef.current = t;
      setToken((current) => (current === t ? current : t));
      tokenStore.set(t);
      return t;
    } catch {
      return tokenRef.current;
    }
  }, [sdkGetAccessToken, sdkIsAuthenticated]);

  // Register the async token source for the API client.
  useEffect(() => {
    setTokenProvider(getAccessToken);
    return () => setTokenProvider(null);
  }, [getAccessToken]);

  const clear = useCallback(() => {
    tokenStore.clear();
    testSessionStore.clear();
    testTokenRef.current = null;
    setTestToken(null);
    setToken(null);
    tokenRef.current = null;
    setUser(null);
    setOnboardingDestination(null);
    setLoading(false);
  }, []);

  const refresh = useCallback(async (): Promise<User | null> => {
    if (!sdkIsAuthenticated) {
      clear();
      return null;
    }
    /*
     * Stay in the loading state while the Revercue record is fetched. Without
     * this the guard sees `loading === false` and `user === null` for the whole
     * request and bounces a freshly authorised session to /login.
     */
    setLoading(true);
    const current = sdkIsAuthenticated ? await getAccessToken() : testTokenRef.current;
    if (!current) {
      /*
       * The SDK reports a session but cannot produce a token (it expired and no
       * refresh token exists, or token storage is unavailable). Calling `/me`
       * without a bearer token makes the API answer "Missing bearer token",
       * which reads like a Revercue account failure. Drop the unusable session
       * so the route can start a fresh sign-in instead.
       */
      clear();
      return null;
    }
    try {
      const response = await authApi.me(current);
      setUser(response.user);
      setOnboardingDestination(response.onboarding?.destination ?? null);
      setOffline(false);
      return response.user;
    } catch (cause) {
      /* A rejected token is a real failure; keep the reason, not a shrug. */
      const failure = logAuthFailure("context:refresh", cause);
      if (failure.status === 0) {
        setOffline(true);
        return null;
      }
      if (failure.status === 401) {
        clear();
        return null;
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [sdkIsAuthenticated, getAccessToken, clear]);

  /*
   * Load the Revercue record once per authentication transition, not on every
   * render. `lastAuth` also stops a failed `/me` from retrying forever.
   */
  const lastAuth = useRef<"sdk" | "test" | null>(null);
  useEffect(() => {
    if (sdkIsLoading) return;
    const mode: "sdk" | "test" | null = sdkIsAuthenticated ? "sdk" : testToken ? "test" : null;
    if (lastAuth.current === mode) return;
    lastAuth.current = mode;
    if (!mode) {
      clear();
      return;
    }
    void refresh();
  }, [sdkIsLoading, sdkIsAuthenticated, testToken, refresh, clear]);

  /**
   * Review/test sessions are issued by Revercue rather than AuthAction. They
   * still load the application record through `/api/auth/me`, so everything
   * downstream (plan, onboarding, guards) reads the same source of truth.
   */
  const startTestSession = useCallback((value: string, nextUser: User) => {
    testSessionStore.set(value);
    testTokenRef.current = value;
    setTestToken(value);
    tokenStore.set(value);
    setToken(value);
    tokenRef.current = value;
    setUser(nextUser);
    setLoading(false);
    lastAuth.current = "test";
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clear();
      navigate("/session-expired", { replace: true });
    });
    return () => setUnauthorizedHandler(null);
  }, [clear, navigate]);

  const setSession = useCallback((value: string, nextUser?: User) => {
    tokenStore.set(value);
    setToken(value);
    tokenRef.current = value;
    if (nextUser) setUser(nextUser);
    setLoading(false);
  }, []);

  const signIn = useCallback(async () => {
    await loginWithRedirect();
  }, [loginWithRedirect]);

  const signOut = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* best effort */
    }
    try {
      await sdkLogout();
    } catch {
      /* best effort */
    }
    testSessionStore.clear();
    testTokenRef.current = null;
    setTestToken(null);
    clear();
    lastAuth.current = null;
    clearReturnTo();
    navigate("/", { replace: true });
  }, [sdkLogout, clear, navigate]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      loading: loading || sdkIsLoading,
      offline,
      onboardingDestination,
      isAuthenticated: Boolean((sdkIsAuthenticated || Boolean(testToken)) && user),
      isTestSession: Boolean(testToken),
      setSession,
      startTestSession,
      signIn,
      signOut,
      refresh,
      getAccessToken,
    }),
    [
      user,
      token,
      loading,
      sdkIsLoading,
      offline,
      sdkIsAuthenticated,
      testToken,
      onboardingDestination,
      setSession,
      startTestSession,
      signIn,
      signOut,
      refresh,
      getAccessToken,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
