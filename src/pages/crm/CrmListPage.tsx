import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Plus, Search } from "lucide-react";
import { crmApi } from "../../api/crm";
import { Table, type Column } from "../../components/ui/Table";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { RowMenu } from "../../components/shared/RowMenu";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { useDebounce } from "../../hooks/useDebounce";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useToast } from "../../hooks/useToast";
import { CHANNELS } from "../../lib/constants";
import { formatRelative } from "../../lib/formatters";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { Client } from "../../types";

const FILTERS = ["all", "active", "archived", "not interested"];

export function CrmListPage() {
  const [params, setParams] = useSearchParams();
  const filter = params.get("filter") || params.get("status") || "all";
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);
  const [sort, setSort] = useState("last_activity");
  const [addOpen, setAddOpen] = useState(params.get("add") === "1");
  const [pendingDelete, setPendingDelete] = useState<Client | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { hasFeature } = usePlanGate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState("Email");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["crm", "clients", filter, debounced, sort],
    queryFn: () =>
      crmApi.list({
        filter: filter === "all" ? undefined : filter,
        search: debounced || undefined,
        sort,
        limit: 50,
      }),
  });

  useEffect(() => {
    if (params.get("add") === "1") setAddOpen(true);
  }, [params]);

  const addClient = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await crmApi.create({ name, email, company, phone, channel });
      await queryClient.invalidateQueries({ queryKey: ["crm", "clients"] });
      toast.success("Client added.");
      setAddOpen(false);
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(
        apiError.code === "conflict"
          ? "A client with this email already exists."
          : errorMessage(apiError.code, apiError.message),
      );
    } finally {
      setSaving(false);
    }
  };

  const exportCsv = async () => {
    try {
      const blob = await crmApi.exportCsv();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "revercue-clients.csv";
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    }
  };

  const columns: Column<Client>[] = [
    { key: "name", label: "Name", render: (row) => <strong>{row.name}</strong> },
    { key: "email", label: "Email", render: (row) => <span className="mono">{row.email}</span> },
    { key: "channel", label: "Channel", render: (row) => (row.channel ? <Badge variant="muted">{row.channel}</Badge> : "—") },
    { key: "last", label: "Last message", render: (row) => formatRelative(row.last_message_at) },
    { key: "documents", label: "Documents", render: (row) => row.documents_count ?? 0 },
    {
      key: "latest",
      label: "Latest status",
      render: (row) => (row.latest_status ? <StatusBadge status={row.latest_status} /> : "—"),
    },
    ...(hasFeature("interest_level")
      ? [
          {
            key: "interest",
            label: "Interest",
            render: (row: Client) =>
              row.interest_level == null ? (
                "—"
              ) : (
                <Badge variant={row.interest_level >= 70 ? "green" : row.interest_level >= 40 ? "gold" : "muted"}>
                  {row.interest_level}%
                </Badge>
              ),
          } as Column<Client>,
        ]
      : []),
    {
      key: "actions",
      label: "",
      align: "right",
      render: (row) => (
        <RowMenu
          items={[
            { label: "Open record", onClick: () => navigate(`/crm/${row.id}`) },
            { label: "Archive", onClick: async () => {
              await crmApi.update(row.id, { status: "archived" });
              await queryClient.invalidateQueries({ queryKey: ["crm", "clients"] });
            } },
            ...(hasFeature("interest_level")
              ? [
                  {
                    label: "Mark not interested",
                    onClick: async () => {
                      await crmApi.update(row.id, { status: "not_interested" });
                      await queryClient.invalidateQueries({ queryKey: ["crm", "clients"] });
                    },
                  },
                ]
              : []),
            { label: "Delete", danger: true, onClick: () => setPendingDelete(row) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <div className="page-top">
        <div>
          <h1>Clients</h1>
          <p>Documents link to the client record as they are created. Messages and replies appear in the log only when you add them by hand.</p>
        </div>
        <div className="inline">
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={15} /> Add client
          </Button>
          <Button variant="secondary" onClick={exportCsv}>
            <Download size={15} /> Export CSV
          </Button>
        </div>
      </div>

      <div className="filters">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className={`tab${filter === item ? " active" : ""}`}
            onClick={() => setParams(item === "all" ? {} : { filter: item })}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
        <div className="input-group" style={{ maxWidth: 160 }}>
          <label htmlFor="crm-sort" className="sr-only">
            Sort
          </label>
          <select id="crm-sort" className="field-select" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="last_activity">Last activity</option>
            <option value="name">Name</option>
            <option value="created">Date added</option>
          </select>
        </div>
        <div className="input-group search">
          <label htmlFor="crm-search" className="sr-only">
            Search clients
          </label>
          <div style={{ position: "relative" }}>
            <Search
              size={14}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }}
            />
            <input
              id="crm-search"
              className="input"
              style={{ paddingLeft: 34 }}
              placeholder="Name, email or company"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={query.data?.data ?? []}
        loading={query.isLoading}
        error={query.isError ? errorMessage((query.error as ApiError)?.code) : undefined}
        onRetry={() => void query.refetch()}
        onRowClick={(row) => navigate(`/crm/${row.id}`)}
        emptyTitle="No clients yet."
        emptyDescription="Create a proposal, contract, invoice or form — the client is added automatically. Or add one manually."
        emptyAction={{ label: "Add client", onClick: () => setAddOpen(true) }}
      />

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add a client"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={addClient} loading={saving} disabled={!name || !email}>
              Add client
            </Button>
          </>
        }
      >
        <div className="stack-3">
          <Input id="crm-name" label="Name" value={name} onChange={setName} required />
          <Input id="crm-email" label="Email" type="email" value={email} onChange={setEmail} error={error} required />
          <Input id="crm-company" label="Company" value={company} onChange={setCompany} />
          <Input id="crm-phone" label="Phone" value={phone} onChange={setPhone} />
          <Select
            id="crm-channel"
            label="Channel"
            value={channel}
            options={CHANNELS.map((value) => ({ value, label: value }))}
            onChange={setChannel}
          />
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) await crmApi.remove(pendingDelete.id, true);
          await queryClient.invalidateQueries({ queryKey: ["crm", "clients"] });
        }}
        title="Delete this client?"
        description="The client record is deleted with its communication log and notes. The documents are kept unless you choose otherwise."
        confirmLabel="Delete client"
      />
    </>
  );
}
