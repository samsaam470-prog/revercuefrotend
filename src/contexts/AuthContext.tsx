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
  isEmailVerified: boolean;
  setSession: (token: string, user?: User) => void;
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
  const [token, setToken] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const navigate = useNavigate();

  const getAccessToken = useCallback(async (): Promise<string | null> => {
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
    setToken(null);
    tokenRef.current = null;
    setUser(null);
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
    const current = await getAccessToken();
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
  const lastAuth = useRef<boolean | null>(null);
  useEffect(() => {
    if (sdkIsLoading) return;
    if (lastAuth.current === sdkIsAuthenticated) return;
    lastAuth.current = sdkIsAuthenticated;
    if (!sdkIsAuthenticated) {
      clear();
      return;
    }
    void refresh();
  }, [sdkIsLoading, sdkIsAuthenticated, refresh, clear]);

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
    clear();
    lastAuth.current = false;
    clearReturnTo();
    navigate("/", { replace: true });
  }, [sdkLogout, clear, navigate]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      loading: loading || sdkIsLoading,
      offline,
      isAuthenticated: Boolean(sdkIsAuthenticated && user),
      isEmailVerified: Boolean(user?.email_verified),
      setSession,
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
      setSession,
      signIn,
      signOut,
      refresh,
      getAccessToken,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
