import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Activity as ActivityIcon,
  ArrowRight,
  Clock,
  DollarSign,
  FileText,
  Info,
  Users,
  X,
} from "lucide-react";
import { dashboardApi } from "../../api/dashboard";
import { settingsApi } from "../../api/settings";
import { useAuth } from "../../hooks/useAuth";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useNotifications } from "../../hooks/useNotifications";
import { useToast } from "../../hooks/useToast";
import { Skeleton, SkeletonLines } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/EmptyState";
import { Button } from "../../components/ui/Button";
import { TutorialOverlay } from "../../components/shared/TutorialOverlay";
import { FORMSUBMIT_COPY } from "../../lib/constants";
import { formatCurrency, formatLongDate, formatRelative, greeting } from "../../lib/formatters";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

export function DashboardOverviewPage() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const { hasFeature } = usePlanGate();
  const { setUnread } = useNotifications();
  const toast = useToast();
  const [bannerHidden, setBannerHidden] = useState(false);

  const summaryQuery = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: () => dashboardApi.summary(),
    staleTime: 20_000,
  });

  const activityQuery = useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: () => dashboardApi.activity(10),
    staleTime: 20_000,
  });

  const suggestionsQuery = useQuery({
    queryKey: ["dashboard", "suggestions"],
    queryFn: () => dashboardApi.suggestions(),
    enabled: hasFeature("basic_suggestions"),
    staleTime: 20_000,
  });

  useEffect(() => {
    if (summaryQuery.data) setUnread(summaryQuery.data.unread_notifications || 0);
  }, [summaryQuery.data, setUnread]);

  const summary = summaryQuery.data;
  const suggestions = suggestionsQuery.data?.suggestions ?? [];
  const activity = activityQuery.data?.activity ?? [];
  const isFirstRun = summary && summary.active_documents === 0 && summary.clients === 0;

  const showBanner =
    !bannerHidden && user?.formsubmit_activated === false && user?.banner_dismissed !== true;

  const activate = async () => {
    try {
      await settingsApi.activateFormSubmit();
      setBannerHidden(true);
      await refresh();
      toast.success("Activation confirmed. Transactional email is on.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  const dismiss = () => {
    setBannerHidden(true);
    toast.info("Banner dismissed. You can activate any time in Settings → Notifications.");
  };

  const dismissSuggestion = async (id: string) => {
    try {
      await dashboardApi.dismissSuggestion(id);
      await suggestionsQuery.refetch();
      toast.info("Suggestion dismissed.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  return (
    <>
      <TutorialOverlay />

      {showBanner && (
        <div className="banner" role="status">
          <Info size={18} />
          <div className="body">
            {FORMSUBMIT_COPY} We sent it to {user?.email}.
          </div>
          <Button size="sm" onClick={activate}>
            I clicked the activation link
          </Button>
          <button type="button" className="btn-icon" aria-label="Dismiss banner" onClick={dismiss}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="page-top">
        <div className="greeting">
          <h1>
            {greeting()}, {user?.name?.split(" ")[0] || "there"}.
          </h1>
          <p>{formatLongDate()}</p>
        </div>
      </div>

      {summaryQuery.isLoading && (
        <div className="stat-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="stat-card" key={index}>
              <Skeleton height={28} width="60%" />
              <div style={{ marginTop: 10 }}>
                <Skeleton height={12} width="80%" />
              </div>
            </div>
          ))}
        </div>
      )}

      {summaryQuery.isError && (
        <div className="panel">
          <EmptyState
            title="Could not load your summary."
            description={errorMessage((summaryQuery.error as ApiError)?.code)}
            action={{ label: "Retry", onClick: () => void summaryQuery.refetch() }}
          />
        </div>
      )}

      {summary && (
        <>
          <div className="stat-grid">
            <Link to="/proposals?status=published" className="stat-card">
              <b>{summary.active_documents}</b>
              <span>Active documents</span>
            </Link>
            <Link to="/crm" className="stat-card">
              <b>{summary.clients}</b>
              <span>Clients</span>
            </Link>
            <Link to="/crm?filter=follow-ups-due" className="stat-card">
              <b className={summary.follow_ups_due > 0 ? "danger" : undefined}>{summary.follow_ups_due}</b>
              <span>Follow-ups due today</span>
            </Link>
            <Link to="/invoices?status=confirmed" className="stat-card">
              <b>{formatCurrency(summary.revenue_this_month)}</b>
              <span>Revenue this month</span>
              {!hasFeature("revenue_tracker") && (
                <span className="stat-note">Profit: available on Scale.</span>
              )}
            </Link>
          </div>

          <div className="pending-line">
            <span>
              Pending payments: {formatCurrency(summary.pending_total)} ({summary.pending_count}{" "}
              {summary.pending_count === 1 ? "invoice" : "invoices"}).
            </span>
            <Link to="/invoices?status=pending">Review</Link>
            {(summary.overdue_count ?? 0) > 0 && (
              <span style={{ color: "var(--red)" }}>
                Overdue: {formatCurrency(summary.overdue_total)} ({summary.overdue_count}{" "}
                {summary.overdue_count === 1 ? "invoice" : "invoices"}).
              </span>
            )}
          </div>

          {isFirstRun ? (
            <div className="panel">
              <EmptyState
                title="Welcome to Revercue. You don't have any documents yet."
                description="Create the first proposal, or read the guides to see the thread end to end."
                action={{ label: "Create your first proposal", onClick: () => navigate("/proposals/new") }}
                secondary={{ label: "Read the Guides", onClick: () => navigate("/guides") }}
              />
            </div>
          ) : (
            <>
              {hasFeature("basic_suggestions") && (
                <div className="panel mb-4">
                  <div className="panel-head">
                    <div>
                      <h2>Suggested actions</h2>
                      <p>A prompt, not an action. You click, you create.</p>
                    </div>
                  </div>
                  {suggestionsQuery.isLoading && <SkeletonLines count={3} />}
                  {!suggestionsQuery.isLoading && suggestions.length === 0 && (
                    <p className="muted" style={{ fontSize: 14 }}>
                      Nothing needs your attention right now.
                    </p>
                  )}
                  {suggestions.map((suggestion) => (
                    <div className="suggest-item" key={suggestion.id}>
                      <ActivityIcon size={16} color="var(--gold)" style={{ marginTop: 2 }} />
                      <div className="body">
                        <b>{suggestion.title}</b>
                        {suggestion.body}
                      </div>
                      <Button
                        variant="text"
                        size="sm"
                        onClick={() => {
                          if (suggestion.action_url) navigate(suggestion.action_url);
                        }}
                      >
                        Do it
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => void dismissSuggestion(suggestion.id)}>
                        Dismiss
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="create-row">
                <Button onClick={() => navigate("/proposals/new")}>
                  <FileText size={15} /> Create proposal
                </Button>
                <Button variant="secondary" onClick={() => navigate("/contracts/new")}>
                  Create contract
                </Button>
                <Button variant="secondary" onClick={() => navigate("/invoices/new")}>
                  Create invoice
                </Button>
                <Button variant="secondary" onClick={() => navigate("/forms/new")}>
                  Create form
                </Button>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Recent activity</h2>
                    <p>The last ten events, newest first.</p>
                  </div>
                  <Link to="/notifications" className="btn btn-ghost btn-sm">
                    View all <ArrowRight size={13} />
                  </Link>
                </div>
                {activityQuery.isLoading && <SkeletonLines count={4} />}
                {!activityQuery.isLoading && activity.length === 0 && (
                  <p className="muted" style={{ fontSize: 14 }}>
                    Nothing yet. Your activity will appear here.
                  </p>
                )}
                {activity.map((item) => (
                  <div className="activity-row" key={item.id}>
                    <div className="ico">
                      <Clock size={13} />
                    </div>
                    <div className="meta">
                      <div>{item.title}</div>
                      <small>{formatRelative(item.created_at)}</small>
                    </div>
                    {item.client_id && (
                      <Link to={`/crm/${item.client_id}`} className="caption" style={{ color: "var(--gold)" }}>
                        Open
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="grid-2 mt-4">
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Clients</h2>
                  <p>The record builds itself from the documents.</p>
                </div>
                <Users size={16} color="var(--gold)" />
              </div>
              <Link to="/crm" className="btn btn-secondary btn-sm">
                Open the CRM
              </Link>
            </div>
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>This month</h2>
                  <p>Revenue is a number, not a chart.</p>
                </div>
                <DollarSign size={16} color="var(--gold)" />
              </div>
              <p className="serif" style={{ fontSize: 28 }}>
                {formatCurrency(summary.revenue_this_month)}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
