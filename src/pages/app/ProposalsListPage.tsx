import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { proposalsApi } from "../../api/proposals";
import { Table, type Column } from "../../components/ui/Table";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { RowMenu } from "../../components/shared/RowMenu";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../hooks/useToast";
import { formatRelative } from "../../lib/formatters";
import { downloadBlob, documentFilename } from "../../lib/download";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { DocumentSummary } from "../../types";

const FILTERS = ["all", "drafts", "published", "archived"];

export function ProposalsListPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") || "all";
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);
  const [pendingAction, setPendingAction] = useState<{ kind: "archive" | "delete"; row: DocumentSummary } | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const query = useQuery({
    queryKey: ["proposals", status],
    queryFn: () => proposalsApi.list({ status: status === "all" ? undefined : status, limit: 50 }),
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["proposals"] });

  const duplicate = useMutation({
    mutationFn: (id: string) => proposalsApi.duplicate(id),
    onSuccess: async () => {
      toast.success("Duplicated as a new draft.");
      await refresh();
    },
    onError: (cause) => toast.error(errorMessage((cause as ApiError).code, (cause as ApiError).message)),
  });

  const act = async () => {
    if (!pendingAction) return;
    try {
      if (pendingAction.kind === "archive") {
        await proposalsApi.archive(pendingAction.row.id);
        toast.success("Archived. The public link is now closed.");
      } else {
        await proposalsApi.remove(pendingAction.row.id);
        toast.success("Deleted.");
      }
      await refresh();
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  const downloadPdf = async (row: DocumentSummary) => {
    try {
      const blob = await proposalsApi.pdf(row.id);
      downloadBlob(blob, documentFilename(row.title, row.id, "pdf"));
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  const rows = (query.data?.data ?? []).filter((row) =>
    debounced ? `${row.title} ${row.client_name ?? ""}`.toLowerCase().includes(debounced.toLowerCase()) : true,
  );

  const columns: Column<DocumentSummary>[] = [
    { key: "title", label: "Title", render: (row) => <strong>{row.title}</strong> },
    { key: "client", label: "Client", render: (row) => row.client_name || "—" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "activity",
      label: "Last activity",
      render: (row) => formatRelative(row.last_activity_at || row.created_at),
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (row) => (
        <RowMenu
          items={[
            { label: "Open builder", onClick: () => navigate(`/proposals/${row.id}/edit`) },
            { label: "Download PDF", onClick: () => void downloadPdf(row) },
            { label: "Duplicate", onClick: () => duplicate.mutate(row.id) },
            { label: "Archive", onClick: () => setPendingAction({ kind: "archive", row }) },
            { label: "Delete", danger: true, onClick: () => setPendingAction({ kind: "delete", row }) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <div className="page-top">
        <div>
          <h1>Proposals</h1>
          <p>Interactive links with packages, FAQs and embedded questions.</p>
        </div>
        <Button onClick={() => navigate("/proposals/new")}>
          <Plus size={15} /> Create proposal
        </Button>
      </div>

      <div className="filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`tab${status === filter ? " active" : ""}`}
            onClick={() => setParams(filter === "all" ? {} : { status: filter })}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <div className="input-group search">
          <label htmlFor="proposal-search" className="sr-only">
            Search proposals
          </label>
          <div style={{ position: "relative" }}>
            <Search
              size={14}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }}
            />
            <input
              id="proposal-search"
              className="input"
              style={{ paddingLeft: 34 }}
              placeholder="Search title or client"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={rows}
        loading={query.isLoading}
        error={query.isError ? errorMessage((query.error as ApiError)?.code) : undefined}
        onRetry={() => void query.refetch()}
        onRowClick={(row) => navigate(`/proposals/${row.id}/edit`)}
        emptyTitle="No proposals yet."
        emptyDescription="Create your first proposal. It takes two minutes."
        emptyAction={{ label: "Create proposal", onClick: () => navigate("/proposals/new") }}
      />

      <ConfirmDialog
        open={Boolean(pendingAction)}
        onClose={() => setPendingAction(null)}
        onConfirm={act}
        title={pendingAction?.kind === "delete" ? "Delete this proposal?" : "Archive this proposal?"}
        description={
          pendingAction?.kind === "delete"
            ? "The document is deleted permanently. A PDF is emailed before deletion. The client record survives."
            : "The public link stops working. The document stays in your records and leaves the active count. You can unarchive later."
        }
        confirmLabel={pendingAction?.kind === "delete" ? "Delete" : "Archive"}
      />

      <p className="caption mt-4">
        Need the public link? <Link to="/guides/client-pages" style={{ color: "var(--gold)" }}>How the client pages work</Link>
      </p>
    </>
  );
}
