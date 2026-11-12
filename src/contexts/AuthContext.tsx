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
import { authApi } from "../api/auth";
import { setUnauthorizedHandler } from "../api/client";
import { tokenStore } from "../lib/storage";
import type { User } from "../types";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  setSession: (token: string, user?: User) => void;
  signIn: (token: string, user: User) => void;
  signOut: () => Promise<void>;
  refresh: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => tokenStore.get());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(tokenStore.get()));
  const tokenRef = useRef<string | null>(token);
  tokenRef.current = token;
  const navigate = useNavigate();

  const clear = useCallback(() => {
    tokenStore.clear();
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  const refresh = useCallback(async (): Promise<User | null> => {
    const current = tokenRef.current;
    if (!current) {
      setUser(null);
      setLoading(false);
      return null;
    }
    try {
      const response = await authApi.me(current);
      setUser(response.user);
      return response.user;
    } catch {
      clear();
      return null;
    } finally {
      setLoading(false);
    }
  }, [clear]);

  useEffect(() => {
    void refresh();
    // Runs once on mount, then again whenever the token changes.
  }, [refresh, token]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      const hadSession = Boolean(tokenRef.current);
      clear();
      if (hadSession) navigate("/session-expired", { replace: true });
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

  const signIn = useCallback((value: string, nextUser: User) => setSession(value, nextUser), [setSession]);

  const signOut = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* the local session is cleared regardless */
    }
    clear();
    navigate("/login", { replace: true });
  }, [clear, navigate]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      isEmailVerified: Boolean(user?.email_verified),
      setSession,
      signIn,
      signOut,
      refresh,
    }),
    [user, token, loading, setSession, signIn, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
