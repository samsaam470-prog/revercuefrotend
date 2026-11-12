import { createContext, useMemo, useState, type ReactNode } from "react";

/**
 * The unread badge is piggybacked on page responses (dashboard summary, lists).
 * Pages call setUnread() with the count they received. No poll, no SSE.
 */
export interface NotificationState {
  unread: number;
  setUnread: (count: number) => void;
  decrement: () => void;
  clear: () => void;
}

export const NotificationContext = createContext<NotificationState | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [unread, setUnreadCount] = useState(0);

  const value = useMemo<NotificationState>(
    () => ({
      unread,
      setUnread: (count: number) => setUnreadCount(Math.max(0, count || 0)),
      decrement: () => setUnreadCount((current) => Math.max(0, current - 1)),
      clear: () => setUnreadCount(0),
    }),
    [unread],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
