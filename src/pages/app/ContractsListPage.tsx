import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { contractsApi } from "../../api/contracts";
import { Table, type Column } from "../../components/ui/Table";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { RowMenu } from "../../components/shared/RowMenu";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../hooks/useToast";
import { formatRelative } from "../../lib/formatters";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { DocumentSummary } from "../../types";

const FILTERS = ["all", "drafts", "published", "approved", "declined", "archived"];

export function ContractsListPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") || "all";
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);
  const [pending, setPending] = useState<{ kind: "archive" | "delete"; row: DocumentSummary } | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const query = useQuery({
    queryKey: ["contracts", status],
    queryFn: () => contractsApi.list({ status: status === "all" ? undefined : status, limit: 50 }),
  });

  const duplicate = useMutation({
    mutationFn: (id: string) => contractsApi.duplicate(id),
    onSuccess: async () => {
      toast.success("Duplicated as a new draft.");
      await queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
  });

  const act = async () => {
    if (!pending) return;
    try {
      if (pending.kind === "archive") await contractsApi.archive(pending.row.id);
      else await contractsApi.remove(pending.row.id);
      toast.success(pending.kind === "archive" ? "Archived." : "Deleted.");
      await queryClient.invalidateQueries({ queryKey: ["contracts"] });
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
    { key: "after", label: "After approval", render: (row) => row.after_approval || "pdf_only" },
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
            { label: "Open builder", onClick: () => navigate(`/contracts/${row.id}/edit`) },
            { label: "Duplicate", onClick: () => duplicate.mutate(row.id) },
            { label: "Archive", onClick: () => setPending({ kind: "archive", row }) },
            { label: "Delete", danger: true, onClick: () => setPending({ kind: "delete", row }) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <div className="page-top">
        <div>
          <h1>Contracts</h1>
          <p>Approve, decline, or I Have Questions. Then the thread continues.</p>
        </div>
        <Button onClick={() => navigate("/contracts/new")}>
          <Plus size={15} /> Create contract
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
          <label htmlFor="contract-search" className="sr-only">
            Search contracts
          </label>
          <div style={{ position: "relative" }}>
            <Search
              size={14}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }}
            />
            <input
              id="contract-search"
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
        onRowClick={(row) => navigate(`/contracts/${row.id}/edit`)}
        emptyTitle="No contracts yet."
        emptyDescription="A contract usually follows an accepted proposal."
        emptyAction={{ label: "Create contract", onClick: () => navigate("/contracts/new") }}
      />

      <ConfirmDialog
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        onConfirm={act}
        title={pending?.kind === "delete" ? "Delete this contract?" : "Archive this contract?"}
        description={
          pending?.kind === "delete"
            ? "The document is deleted permanently. A PDF is emailed before deletion. The client record survives."
            : "The public link stops working. You can unarchive later."
        }
        confirmLabel={pending?.kind === "delete" ? "Delete" : "Archive"}
      />
    </>
  );
}
