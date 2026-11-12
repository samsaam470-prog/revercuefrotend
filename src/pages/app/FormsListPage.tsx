import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { formsApi } from "../../api/forms";
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

const FILTERS = ["all", "drafts", "published", "closed", "archived"];

export function FormsListPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") || "all";
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);
  const [pending, setPending] = useState<{ kind: "archive" | "delete"; row: DocumentSummary } | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const query = useQuery({
    queryKey: ["forms", status],
    queryFn: () => formsApi.list({ status: status === "all" ? undefined : status, limit: 50 }),
  });

  const duplicate = useMutation({
    mutationFn: (id: string) => formsApi.duplicate(id),
    onSuccess: async () => {
      toast.success("Duplicated as a new draft.");
      await queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });

  const act = async () => {
    if (!pending) return;
    try {
      if (pending.kind === "archive") await formsApi.archive(pending.row.id);
      else await formsApi.remove(pending.row.id);
      toast.success(pending.kind === "archive" ? "Archived." : "Deleted.");
      await queryClient.invalidateQueries({ queryKey: ["forms"] });
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
    { key: "submissions", label: "Submissions", render: (row) => row.submissions_count ?? 0 },
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
            { label: "Open editor", onClick: () => navigate(`/forms/${row.id}/edit`) },
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
          <h1>Requirement forms</h1>
          <p>Adaptive forms with branching. A question builder, not a canvas.</p>
        </div>
        <Button onClick={() => navigate("/forms/new")}>
          <Plus size={15} /> Create form
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
          <label htmlFor="form-search" className="sr-only">
            Search forms
          </label>
          <div style={{ position: "relative" }}>
            <Search
              size={14}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }}
            />
            <input
              id="form-search"
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
        onRowClick={(row) => navigate(`/forms/${row.id}/edit`)}
        emptyTitle="No forms yet."
        emptyDescription="Create a form to collect the requirements before you start."
        emptyAction={{ label: "Create form", onClick: () => navigate("/forms/new") }}
      />

      <ConfirmDialog
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        onConfirm={act}
        title={pending?.kind === "delete" ? "Delete this form?" : "Archive this form?"}
        description={
          pending?.kind === "delete"
            ? "The form and its submissions are deleted permanently. A PDF is emailed before deletion."
            : "The public link stops accepting submissions. You can unarchive later."
        }
        confirmLabel={pending?.kind === "delete" ? "Delete" : "Archive"}
      />
    </>
  );
}
