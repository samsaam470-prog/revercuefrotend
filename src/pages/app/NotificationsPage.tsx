import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BellOff, X } from "lucide-react";
import { notificationsApi } from "../../api/notifications";
import { Button } from "../../components/ui/Button";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { useNotifications } from "../../hooks/useNotifications";
import { useToast } from "../../hooks/useToast";
import { formatRelative } from "../../lib/formatters";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "client", label: "Client activity" },
  { value: "system", label: "System" },
] as const;

export function NotificationsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { setUnread, clear } = useNotifications();
  const toast = useToast();

  const query = useQuery({
    queryKey: ["notifications", filter, page],
    queryFn: () => notificationsApi.list({ filter, page, limit: 25 }),
  });

  const markAll = async () => {
    try {
      await notificationsApi.readAll();
      clear();
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications marked as read.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  const markOne = async (id: string) => {
    await notificationsApi.read(id);
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const remove = async (id: string) => {
    try {
      await notificationsApi.remove(id);
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setUnread(0);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  return (
    <>
      <div className="page-top">
        <div>
          <h1>Notifications</h1>
          <p>Client activity and system events. The badge is read from page responses.</p>
        </div>
        <Button variant="ghost" onClick={markAll}>
          Mark all as read
        </Button>
      </div>

      <div className="filters">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`tab${filter === item.value ? " active" : ""}`}
            onClick={() => {
              setFilter(item.value);
              setPage(1);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="panel">
        {query.isLoading && <SkeletonLines count={5} />}

        {query.isError && (
          <div className="empty">
            <h3>Could not load notifications.</h3>
            <p>{errorMessage((query.error as ApiError)?.code)}</p>
            <Button onClick={() => void query.refetch()}>Retry</Button>
          </div>
        )}

        {!query.isLoading && (query.data?.data.length ?? 0) === 0 && (
          <div className="empty">
            <BellOff size={36} />
            <h3>No notifications yet.</h3>
            <p>You'll see client activity here.</p>
          </div>
        )}

        {query.data?.data.map((item) => (
          <div
            className="activity-row"
            key={item.id}
            style={{
              borderLeft: item.read ? undefined : "2px solid var(--gold)",
              paddingLeft: 12,
            }}
          >
            <div className="meta">
              <div style={{ color: item.read ? "var(--text-secondary)" : "var(--text-primary)" }}>
                {item.title}
              </div>
              {item.body && <div className="caption">{item.body}</div>}
              <small>{formatRelative(item.created_at)}</small>
            </div>
            {!item.read && (
              <button type="button" className="btn btn-text btn-sm" onClick={() => void markOne(item.id)}>
                Mark read
              </button>
            )}
            <button
              type="button"
              className="btn-icon"
              aria-label="Dismiss notification"
              onClick={() => void remove(item.id)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {(query.data?.pagination.total_pages ?? 0) > 1 && (
        <div className="between mt-4">
          <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>
            Previous
          </Button>
          <span className="caption">
            Page {page} of {query.data?.pagination.total_pages}
          </span>
          <Button
            variant="ghost"
            disabled={page >= (query.data?.pagination.total_pages ?? 1)}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
