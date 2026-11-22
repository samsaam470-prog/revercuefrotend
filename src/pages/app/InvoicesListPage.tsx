import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { invoicesApi } from "../../api/invoices";
import { Table, type Column } from "../../components/ui/Table";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { RowMenu } from "../../components/shared/RowMenu";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../hooks/useToast";
import { formatCurrency, formatDate, formatRelative } from "../../lib/formatters";
import { downloadBlob, documentFilename } from "../../lib/download";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { DocumentSummary } from "../../types";

const FILTERS = ["all", "drafts", "published", "paid", "pending", "overdue", "archived"];

export function InvoicesListPage() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") || "all";
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);
  const [pending, setPending] = useState<{ kind: "archive" | "delete" | "confirm"; row: DocumentSummary } | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const query = useQuery({
    queryKey: ["invoices", status],
    queryFn: () => invoicesApi.list({ status: status === "all" ? undefined : status, limit: 50 }),
  });

  const act = async () => {
    if (!pending) return;
    try {
      if (pending.kind === "archive") {
        await invoicesApi.archive(pending.row.id);
        toast.success("Archived.");
      } else if (pending.kind === "confirm") {
        await invoicesApi.confirmPayment(pending.row.id);
        toast.success("Payment confirmed. The revenue tracker counted it.");
      } else {
        await invoicesApi.remove(pending.row.id);
        toast.success("Deleted.");
      }
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  const duplicate = useMutation({
    mutationFn: (id: string) => invoicesApi.duplicate(id),
    onSuccess: async () => {
      toast.success("Duplicated as a new draft.");
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const downloadPdf = async (row: DocumentSummary) => {
    try {
      const blob = await invoicesApi.pdf(row.id);
      downloadBlob(blob, documentFilename(row.invoice_number || row.title, row.id, "pdf"));
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  const rows = (query.data?.data ?? []).filter((row) =>
    debounced
      ? `${row.title} ${row.client_name ?? ""} ${row.invoice_number ?? ""}`
          .toLowerCase()
          .includes(debounced.toLowerCase())
      : true,
  );

  const columns: Column<DocumentSummary>[] = [
    {
      key: "number",
      label: "Invoice #",
      render: (row) => <span className="mono">{row.invoice_number || row.title}</span>,
    },
    { key: "client", label: "Client", render: (row) => row.client_name || "—" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "total",
      label: "Total",
      render: (row) => <strong>{formatCurrency(row.total, row.currency || "USD")}</strong>,
    },
    { key: "due", label: "Due date", render: (row) => formatDate(row.due_date) },
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
            { label: "Open builder", onClick: () => navigate(`/invoices/${row.id}/edit`) },
            { label: "Download PDF", onClick: () => void downloadPdf(row) },
            {
              label: "Confirm payment",
              hidden: row.status !== "proof_submitted" && row.status !== "published",
              onClick: () => setPending({ kind: "confirm", row }),
            },
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
          <h1>Invoices</h1>
          <p>Line items, two payment paths, and an honest confirmation step.</p>
        </div>
        <Button onClick={() => navigate("/invoices/new")}>
          <Plus size={15} /> Create invoice
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
          <label htmlFor="invoice-search" className="sr-only">
            Search invoices
          </label>
          <div style={{ position: "relative" }}>
            <Search
              size={14}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }}
            />
            <input
              id="invoice-search"
              className="input"
              style={{ paddingLeft: 34 }}
              placeholder="Search number or client"
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
        onRowClick={(row) => navigate(`/invoices/${row.id}/edit`)}
        emptyTitle="No invoices yet."
        emptyDescription="Create an invoice from a contract, or from scratch."
        emptyAction={{ label: "Create invoice", onClick: () => navigate("/invoices/new") }}
      />

      <ConfirmDialog
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        onConfirm={act}
        destructive={pending?.kind !== "confirm"}
        title={
          pending?.kind === "confirm"
            ? "Confirm this payment?"
            : pending?.kind === "delete"
              ? "Delete this invoice?"
              : "Archive this invoice?"
        }
        description={
          pending?.kind === "confirm"
            ? `Confirm the payment of ${formatCurrency(pending?.row.total, pending?.row.currency || "USD")} for ${
                pending?.row.invoice_number || pending?.row.title
              }? It is recorded once and the client sees the confirmed state.`
            : pending?.kind === "delete"
              ? "The invoice is deleted permanently. A PDF is emailed before deletion."
              : "The public link stops working. You can unarchive later."
        }
        confirmLabel={pending?.kind === "confirm" ? "Confirm payment" : pending?.kind === "delete" ? "Delete" : "Archive"}
      />
    </>
  );
}
