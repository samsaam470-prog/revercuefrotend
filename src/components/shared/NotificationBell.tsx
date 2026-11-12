import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, BellOff } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../../api/notifications";
import { useNotifications } from "../../hooks/useNotifications";
import { formatRelative } from "../../lib/formatters";
import { SkeletonLines } from "../ui/Skeleton";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { unread, setUnread, clear } = useNotifications();
  const wrapRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications", "bell"],
    queryFn: () => notificationsApi.list({ limit: 10 }),
    enabled: open,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!open) return;
    const onDocClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markAll = async () => {
    await notificationsApi.readAll();
    clear();
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const markOne = async (id: string) => {
    await notificationsApi.read(id);
    setUnread(Math.max(0, unread - 1));
    await queryClient.invalidateQueries({ queryKey: ["notifications", "bell"] });
  };

  return (
    <div className="bell-wrap" ref={wrapRef}>
      <button
        type="button"
        className="bell-btn"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
      >
        <Bell size={18} />
        {unread > 0 && <span className="bell-count">{unread > 99 ? "99+" : unread}</span>}
      </button>
      {open && (
        <div className="bell-panel" role="dialog" aria-label="Notifications">
          <div className="bell-head">
            <strong>Notifications</strong>
            <button type="button" className="btn btn-text btn-sm" onClick={markAll}>
              Mark all as read
            </button>
          </div>
          <div className="bell-list">
            {isLoading && (
              <div style={{ padding: 16 }}>
                <SkeletonLines count={3} />
              </div>
            )}
            {!isLoading && (data?.data.length ?? 0) === 0 && (
              <div className="empty" style={{ padding: 24 }}>
                <BellOff size={24} />
                <p className="caption">No notifications yet. You'll see client activity here.</p>
              </div>
            )}
            {data?.data.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`bell-row${item.read ? "" : " unread"}`}
                onClick={() => void markOne(item.id)}
              >
                <div>
                  <div style={{ color: "var(--text-primary)", marginBottom: 2 }}>{item.title}</div>
                  {item.body && <div>{item.body}</div>}
                  <div className="caption" style={{ marginTop: 4 }}>
                    {formatRelative(item.created_at)}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="bell-foot">
            <Link to="/notifications" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
