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
import type { User } from "../types";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  /** The API could not be reached. The session is kept, not cleared. */
  offline: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  /** True when the AuthAction identity is not yet linked to a Revercue account. */
  linkingRequired: boolean;
  setSession: (token: string, user?: User) => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<User | null>;
  getAccessToken: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const sdk = useAuthAction();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [offline, setOffline] = useState(false);
  const [linkingRequired, setLinkingRequired] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const navigate = useNavigate();

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    if (!sdk.isAuthenticated) return null;
    try {
      const t = await sdk.getAccessToken();
      tokenRef.current = t;
      setToken(t);
      tokenStore.set(t);
      return t;
    } catch {
      return tokenRef.current;
    }
  }, [sdk]);

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
    setLinkingRequired(false);
    setLoading(false);
  }, []);

  const refresh = useCallback(async (): Promise<User | null> => {
    if (!sdk.isAuthenticated) {
      clear();
      return null;
    }
    const current = await getAccessToken();
    if (!current) {
      setLoading(false);
      return null;
    }
    try {
      const response = await authApi.me(current);
      setUser(response.user);
      setLinkingRequired(false);
      setOffline(false);
      return response.user;
    } catch (cause) {
      const status = (cause as { status?: number }).status;
      if (status === 0) {
        setOffline(true);
        return null;
      }
      if (status === 401) {
        const code = (cause as { code?: string }).code;
        if (code === "account_link_required") {
          setLinkingRequired(true);
          return null;
        }
        clear();
        return null;
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [sdk.isAuthenticated, getAccessToken, clear]);

  useEffect(() => {
    if (sdk.isLoading) return;
    if (!sdk.isAuthenticated) {
      clear();
      return;
    }
    void refresh();
  }, [sdk.isLoading, sdk.isAuthenticated, refresh, clear]);

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
    await sdk.loginWithRedirect();
  }, [sdk]);

  const signOut = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* best effort */
    }
    try {
      await sdk.logout();
    } catch {
      /* best effort */
    }
    clear();
    navigate("/login", { replace: true });
  }, [sdk, clear, navigate]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      loading: loading || sdk.isLoading,
      offline,
      isAuthenticated: Boolean(sdk.isAuthenticated && user && !linkingRequired),
      isEmailVerified: Boolean(user?.email_verified),
      linkingRequired,
      setSession,
      signIn,
      signOut,
      refresh,
      getAccessToken,
    }),
    [user, token, loading, sdk.isLoading, offline, sdk.isAuthenticated, linkingRequired, setSession, signIn, signOut, refresh, getAccessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
