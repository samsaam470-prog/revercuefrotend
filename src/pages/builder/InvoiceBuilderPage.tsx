import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { invoicesApi } from "../../api/invoices";
import { contractsApi } from "../../api/contracts";
import { crmApi } from "../../api/crm";
import { TopBar } from "../../components/builder/TopBar";
import { ShareModal } from "../../components/builder/ShareModal";
import { DraftProgress, type DraftProgressState } from "../../components/builder/DraftProgress";
import type { DraftStage, DraftStageStatus } from "../../lib/pipeline";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { AskHelperTextarea } from "../../components/builder/AskHelperTextarea";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Modal } from "../../components/ui/Modal";
import { Spinner } from "../../components/ui/Spinner";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { useAutoSave } from "../../hooks/useAutoSave";
import { useToast } from "../../hooks/useToast";
import { CURRENCIES } from "../../lib/constants";
import { formatCurrency } from "../../lib/formatters";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { DocumentSummary, Invoice, LineItem, PaymentArrangement } from "../../types";

export function InvoiceBuilderPage() {
  const { id } = useParams<{ id: string }>();
  return id ? <InvoiceEditor id={id} /> : <InvoiceRequirementForm />;
}

function InvoiceRequirementForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const [mode, setMode] = useState<"existing" | "new">("new");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [contractId, setContractId] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: 1, unit_price: 0 }]);
  const [currency, setCurrency] = useState("USD");
  const [tax, setTax] = useState("0");
  const [taxLabel, setTaxLabel] = useState("VAT");
  const [arrangement, setArrangement] = useState<"link" | "account">("link");
  const [link, setLink] = useState("");
  const [details, setDetails] = useState({
    bank_name: "",
    account_number: "",
    iban: "",
    swift: "",
    account_holder: "",
  });
  const [allowProof, setAllowProof] = useState(true);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<DraftStage | null>(null);
  const [stageStatuses, setStageStatuses] = useState<DraftProgressState>({});

  const clients = useQuery({ queryKey: ["crm", "clients", "picker"], queryFn: () => crmApi.list({ limit: 100 }) });
  const contracts = useQuery({
    queryKey: ["contracts", "picker"],
    queryFn: () => contractsApi.list({ status: "fully_signed", limit: 100 }),
  });
  const linkedContract = useQuery({
    queryKey: ["contracts", "detail", contractId],
    queryFn: () => contractsApi.get(contractId),
    enabled: Boolean(contractId),
  });

  useEffect(() => {
    const contract = linkedContract.data?.contract;
    if (!contract) return;
    if (contract.currency) setCurrency(contract.currency);
    const scope = contract.scope || contract.content?.scope || "";
    if (scope.trim()) {
      setItems((current) => current.length === 1 && !current[0].description.trim()
        ? [{ ...current[0], description: scope.trim() }]
        : current);
    }
  }, [linkedContract.data, contractId]);
  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
  const total = subtotal + (Number(tax) || 0);

  const valid =
    (mode === "existing" ? Boolean(clientId) : Boolean(clientName.trim())) &&
    (Boolean(clientEmail.trim()) || Boolean(clientPhone.trim())) &&
    items.some((item) => item.description.trim() && Number.isFinite(item.quantity) && item.quantity > 0 && Number.isFinite(item.unit_price) && item.unit_price >= 0) &&
    Number.isFinite(Number(tax)) && Number(tax) >= 0 &&
    dueDate &&
    (arrangement === "link" ? Boolean(link) : Boolean(details.bank_name || details.iban || details.account_number));

  const submit = async () => {
    const next: Record<string, string> = {};
    if (mode === "existing" && !clientId) next.client = "Choose a client.";
    if (mode === "new" && !clientName.trim()) next.clientName = "Enter the client's name.";
    if (!clientEmail.trim() && !clientPhone.trim()) next.clientEmail = "Enter the client's email or phone.";
    if (!items.some((item) => item.description.trim())) next.items = "Add at least one line item.";
    if (items.some((item) => item.description.trim() && (!Number.isFinite(item.quantity) || item.quantity <= 0 || !Number.isFinite(item.unit_price) || item.unit_price < 0))) next.items = "Each line needs a positive quantity and a non-negative unit price.";
    if (!Number.isFinite(Number(tax)) || Number(tax) < 0) next.tax = "Enter a valid non-negative tax amount.";
    if (!dueDate) next.due = "Pick a due date.";
    if (arrangement === "link" && !link) next.arrangement = "Add the payment link.";
    if (arrangement === "account" && !details.bank_name && !details.iban) next.arrangement = "Add the account details.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    setStageStatuses({});
    const paint = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const mark = async (name: DraftStage, status: DraftStageStatus, detail: string) => {
      setStage(name);
      setStageStatuses((current) => ({ ...current, [name]: { status, detail } }));
      await paint();
    };
    try {
      const selectedClient = mode === "existing" ? clients.data?.data.find((client) => client.id === clientId) : undefined;
      await mark("context", "running", "Resolving the selected client and the details entered for this invoice.");
      const resolvedClientName = selectedClient?.name || clientName.trim() || "your client";
      const linked = linkedContract.data?.contract;
      await mark("context", "done", linked
        ? `Using ${resolvedClientName} and linked contract “${linked.title}”; invoice amounts remain subject to your confirmation.`
        : `Using ${resolvedClientName} and the contact details you supplied.`);

      await mark("research", "skipped", "Invoices use confirmed client and contract details, not public web research.");
      await mark("structure", "running", "Preparing the line-item table and calculating the subtotal.");
      const lineItems = items.filter((item) => item.description.trim());
      const calculatedSubtotal = lineItems.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
      const calculatedTax = Number(tax) || 0;
      const calculatedTotal = calculatedSubtotal + calculatedTax;
      await mark("structure", "done", `${lineItems.length} line items prepared in ${currency}.`);

      await mark("writing", "running", "Assembling invoice details, due date, and your chosen payment instructions.");
      const payment_arrangement: PaymentArrangement =
        arrangement === "link"
          ? { type: "link", url: link }
          : { type: "account", details, allow_proof: allowProof };
      const draftPayload = {
        client_id: mode === "existing" ? clientId : undefined,
        client_name: mode === "new" ? clientName.trim() : undefined,
        client_email: clientEmail.trim() || undefined,
        client_phone: clientPhone.trim() || undefined,
        linked_contract_id: contractId || undefined,
        line_items: lineItems,
        currency,
        tax: calculatedTax,
        tax_label: taxLabel,
        total: calculatedTotal,
        payment_arrangement,
        due_date: dueDate,
        notes: notes || undefined,
      };
      await mark("writing", "done", "Invoice content and payment arrangement are ready for the editor.");
      await mark("visuals", "skipped", "Invoices use a structured financial table; no decorative assets are added.");
      await mark("checks", "running", "Verifying the calculated total before saving the draft.");
      if (!Number.isFinite(calculatedTotal) || Math.abs(calculatedTotal - (calculatedSubtotal + calculatedTax)) > 0.000001) {
        throw new Error("The invoice total could not be verified. Check the line items and tax amount.");
      }
      const response = await invoicesApi.draft(draftPayload);
      await mark("checks", "done", "The server saved the invoice draft. No payment was processed and nothing was sent to the client.");
      navigate(`/invoices/${response.id}/edit`);
    } catch (cause) {
      setStage(null);
      const apiError = cause as ApiError;
      toast.error(cause instanceof Error && !apiError.code ? cause.message : errorMessage(apiError.code, apiError.message));
    } finally {
      setLoading(false);
    }
  };

  if (stage) {
    const selectedClient = clients.data?.data.find((client) => client.id === clientId);
    return <div className="builder"><DraftProgress stage={stage} clientName={selectedClient?.name || clientName || "your client"} statuses={stageStatuses} documentLabel="invoice" /></div>;
  }

  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card" style={{ maxWidth: 820 }}>
        <p className="eyebrow">New invoice</p>
        <h1>Build the invoice.</h1>
        <p className="muted" style={{ marginBottom: 24 }}>
          An invoice is a table, not a canvas. No template selection: your logo and colours apply
          automatically.
        </p>

        <div className="stack-4">
          <div>
            <span className="field-label">Client</span>
            <div className="segmented" style={{ marginTop: 8 }}>
              <button type="button" aria-pressed={mode === "existing"} onClick={() => setMode("existing")}>
                Existing client
              </button>
              <button type="button" aria-pressed={mode === "new"} onClick={() => setMode("new")}>
                New client
              </button>
            </div>
          </div>
          {mode === "existing" ? (
            <Select
              id="invoice-client"
              label="Client"
              value={clientId}
              placeholder="Choose a client"
              options={(clients.data?.data ?? []).map((client) => ({
                value: client.id,
                label: `${client.name} — ${client.email}`,
              }))}
              onChange={(value) => {
                setClientId(value);
                const found = clients.data?.data.find((client) => client.id === value);
                if (found) { setClientEmail(found.email); setClientPhone(found.phone || ""); }
              }}
              error={errors.client}
              required
            />
          ) : (
            <Input
              id="invoice-client-name"
              label="Client name"
              value={clientName}
              onChange={setClientName}
              error={errors.clientName}
              required
            />
          )}
          <Input
            id="invoice-client-email"
            label="Client email"
            type="email"
            value={clientEmail}
            onChange={setClientEmail}
            error={errors.clientEmail}
            helper="Where the invoice is delivered."
          />
          <Input
            id="invoice-client-phone"
            label="Client phone (optional)"
            type="tel"
            value={clientPhone}
            onChange={setClientPhone}
            helper="WhatsApp number, with country code. Used to share the document."
          />
          <Select
            id="invoice-contract"
            label="Which contract is this invoice for?"
            value={contractId}
            placeholder="None — standalone invoice"
            options={(contracts.data?.data ?? []).map((contract: DocumentSummary) => ({
              value: contract.id,
              label: contract.title,
            }))}
            onChange={setContractId}
            helper="Optional. Its currency and scope can prefill; confirm every amount and due date yourself."
          />

          <fieldset className="fieldset">
            <legend>Line items</legend>
            {items.map((item, index) => (
              <div className="inline" key={index} style={{ alignItems: "flex-end", width: "100%" }}>
                <div style={{ flex: 2 }}>
                  <Input
                    id={`line-desc-${index}`}
                    label={`Description ${index + 1}`}
                    value={item.description}
                    onChange={(value) =>
                      setItems((current) => current.map((row, i) => (i === index ? { ...row, description: value } : row)))
                    }
                  />
                </div>
                <div style={{ width: 90 }}>
                  <Input
                    id={`line-qty-${index}`}
                    label="Qty"
                    type="number"
                    value={String(item.quantity)}
                    onChange={(value) =>
                      setItems((current) =>
                        current.map((row, i) => (i === index ? { ...row, quantity: Number(value) } : row)),
                      )
                    }
                  />
                </div>
                <div style={{ width: 120 }}>
                  <Input
                    id={`line-price-${index}`}
                    label="Unit price"
                    type="number"
                    value={String(item.unit_price)}
                    onChange={(value) =>
                      setItems((current) =>
                        current.map((row, i) => (i === index ? { ...row, unit_price: Number(value) } : row)),
                      )
                    }
                  />
                </div>
                <button
                  type="button"
                  className="btn-icon"
                  aria-label="Remove line"
                  onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setItems((current) => [...current, { description: "", quantity: 1, unit_price: 0 }])}
              >
                + Add line item
              </Button>
            </div>
            {errors.items && <span className="error-text">{errors.items}</span>}
          </fieldset>

          <div className="two-up">
            <Select
              id="invoice-currency"
              label="Currency"
              value={currency}
              options={CURRENCIES.map((value) => ({ value, label: value }))}
              onChange={setCurrency}
            />
            <Input
              id="invoice-tax"
              label="Tax amount"
              type="number"
              value={tax}
              onChange={setTax}
              error={errors.tax}
              helper="Set 0 for no tax."
            />
          </div>
          <Input id="invoice-tax-label" label="Tax label" value={taxLabel} onChange={setTaxLabel} />

          <div className="card card-md">
            <div className="doc-total">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal, currency)}</span>
            </div>
            <div className="doc-total">
              <span>
                {taxLabel || "Tax"}
              </span>
              <span>{formatCurrency(Number(tax) || 0, currency)}</span>
            </div>
            <div className="doc-total grand">
              <span>Total</span>
              <span>{formatCurrency(total, currency)}</span>
            </div>
          </div>

          <div>
            <span className="field-label">Payment arrangement</span>
            <div className="choice-grid" style={{ marginTop: 8 }}>
              <button
                type="button"
                className={`choice-card${arrangement === "link" ? " selected" : ""}`}
                onClick={() => setArrangement("link")}
                aria-pressed={arrangement === "link"}
              >
                <b>Option A — External payment link</b>
                <small>The client is redirected to your Stripe, PayPal or Wise link.</small>
              </button>
              <button
                type="button"
                className={`choice-card${arrangement === "account" ? " selected" : ""}`}
                onClick={() => setArrangement("account")}
                aria-pressed={arrangement === "account"}
              >
                <b>Option B — Your account details</b>
                <small>The client pays directly and can upload a proof.</small>
              </button>
            </div>
          </div>

          {arrangement === "link" ? (
            <Input
              id="invoice-link"
              label="Payment link"
              type="url"
              value={link}
              onChange={setLink}
              placeholder="https://"
              error={errors.arrangement}
              helper="Validated before the invoice can be created."
            />
          ) : (
            <div className="stack-3">
              <div className="two-up">
                <Input id="bank-name" label="Bank name" value={details.bank_name} onChange={(value) => setDetails({ ...details, bank_name: value })} />
                <Input id="bank-holder" label="Account holder" value={details.account_holder} onChange={(value) => setDetails({ ...details, account_holder: value })} />
              </div>
              <div className="two-up">
                <Input id="bank-number" label="Account number" value={details.account_number} onChange={(value) => setDetails({ ...details, account_number: value })} />
                <Input id="bank-iban" label="IBAN" value={details.iban} onChange={(value) => setDetails({ ...details, iban: value })} />
              </div>
              <Input id="bank-swift" label="SWIFT" value={details.swift} onChange={(value) => setDetails({ ...details, swift: value })} />
              <Checkbox
                id="allow-proof"
                label="Allow the client to upload a payment proof"
                checked={allowProof}
                onChange={setAllowProof}
              />
              {errors.arrangement && <span className="error-text">{errors.arrangement}</span>}
            </div>
          )}

          <div className="two-up">
            <div className="input-group">
              <label htmlFor="invoice-due">Due date</label>
              <input
                id="invoice-due"
                type="date"
                className="input"
                value={dueDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(event) => setDueDate(event.target.value)}
              />
              {errors.due && <span className="error-text">{errors.due}</span>}
            </div>
          </div>

          <Textarea
            id="invoice-notes"
            label="Notes to client"
            value={notes}
            onChange={setNotes}
            rows={3}
            helper="For example: payment due within 14 days."
          />
        </div>

        <div className="between mt-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={submit} loading={loading} disabled={!valid}>
            Continue to builder
          </Button>
        </div>
      </div>
    </div>
  );
}

function InvoiceEditor({ id }: { id: string }) {
  const navigate = useNavigate();
  const toast = useToast();
  const query = useQuery({ queryKey: ["invoice", id], queryFn: () => invoicesApi.get(id) });
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<LineItem[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [tax, setTax] = useState(0);
  const [taxLabel, setTaxLabel] = useState("Tax");
  const [arrangement, setArrangement] = useState<PaymentArrangement>({ type: "link", url: "" });
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState(false);
  const [share, setShare] = useState<{ url: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [initialised, setInitialised] = useState(false);

  const invoice = query.data?.invoice;

  useEffect(() => {
    if (!invoice || initialised) return;
    setTitle(invoice.title || `Invoice for ${invoice.client_name || "the client"}`);
    setItems(Array.isArray(invoice.line_items) && invoice.line_items.length ? invoice.line_items : []);
    setCurrency(invoice.currency || "USD");
    setTax(invoice.tax || 0);
    setTaxLabel(invoice.tax_label || "Tax");
    setArrangement(invoice.payment_arrangement || { type: "link", url: "" });
    setDueDate(invoice.due_date?.slice(0, 10) || "");
    setNotes(invoice.notes || "");
    setInitialised(true);
  }, [invoice, initialised]);

  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
  const total = subtotal + (Number(tax) || 0);

  const payload = useMemo(
    () => ({ title, line_items: items, currency, tax, tax_label: taxLabel, total, payment_arrangement: arrangement, due_date: dueDate, notes }),
    [title, items, currency, tax, taxLabel, total, arrangement, dueDate, notes],
  );

  const autosave = useAutoSave({
    onSave: async (value) => {
      await invoicesApi.update(id, value as Partial<Invoice>);
    },
    beaconPath: `/api/invoices/${id}/autosave`,
    enabled: initialised,
  });

  useEffect(() => {
    if (initialised) autosave.markDirty(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, initialised]);

  const publish = async () => {
    if (items.length === 0) {
      toast.error("Add at least one line item.");
      return;
    }
    if (!dueDate) {
      toast.error("Set the due date.");
      return;
    }
    setCreating(true);
    try {
      await autosave.save(payload);
      const response = await invoicesApi.publish(id);
      setShare({ url: response.url });
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setCreating(false);
    }
  };

  if (query.isLoading) {
    return (
      <div className="auth-split">
        <SkeletonLines count={6} />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="page page-narrow">
        <h1 className="serif">Could not load this invoice.</h1>
        <Button className="mt-6" onClick={() => navigate("/invoices")}>
          Back to invoices
        </Button>
      </div>
    );
  }

  return (
    <div className="builder">
      <TopBar
        title={title}
        onTitleChange={setTitle}
        saveState={autosave.state}
        onBack={() => navigate("/invoices")}
        onPreview={() => setPreview(true)}
        onSave={() => void autosave.save(payload)}
        onCreate={publish}
        creating={creating}
        moreItems={[
          {
            label: "Archive",
            onClick: async () => {
              await invoicesApi.archive(id);
              navigate("/invoices");
            },
          },
          {
            label: "Delete",
            danger: true,
            onClick: async () => {
              await invoicesApi.remove(id);
              navigate("/invoices");
            },
          },
        ]}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: 32, width: "100%" }}>
        <div className="card card-lg stack-4">
          <div className="between">
            <div>
              <span className="mono">{invoice.invoice_number || "INV-—"}</span>
              <h1 className="serif" style={{ fontSize: 26, marginTop: 4 }}>
                {title}
              </h1>
              <p className="caption">
                Billed to {invoice.client_name || "the client"} · brand applied from Settings
              </p>
            </div>
            <div className="input-group" style={{ maxWidth: 180 }}>
              <label htmlFor="invoice-due-edit">Due date</label>
              <input
                id="invoice-due-edit"
                type="date"
                className="input"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
          </div>

          <fieldset className="fieldset">
            <legend>Line items</legend>
            {items.map((item, index) => (
              <div className="inline" key={index} style={{ alignItems: "flex-end", width: "100%" }}>
                <div style={{ flex: 2 }}>
                  <Input
                    id={`edit-desc-${index}`}
                    label={`Description ${index + 1}`}
                    value={item.description}
                    onChange={(value) =>
                      setItems((current) => current.map((row, i) => (i === index ? { ...row, description: value } : row)))
                    }
                  />
                </div>
                <div style={{ width: 90 }}>
                  <Input
                    id={`edit-qty-${index}`}
                    label="Qty"
                    type="number"
                    value={String(item.quantity)}
                    onChange={(value) =>
                      setItems((current) =>
                        current.map((row, i) => (i === index ? { ...row, quantity: Number(value) } : row)),
                      )
                    }
                  />
                </div>
                <div style={{ width: 120 }}>
                  <Input
                    id={`edit-price-${index}`}
                    label="Unit price"
                    type="number"
                    value={String(item.unit_price)}
                    onChange={(value) =>
                      setItems((current) =>
                        current.map((row, i) => (i === index ? { ...row, unit_price: Number(value) } : row)),
                      )
                    }
                  />
                </div>
                <button
                  type="button"
                  className="btn-icon"
                  aria-label="Remove line"
                  onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setItems((current) => [...current, { description: "", quantity: 1, unit_price: 0 }])}
              >
                + Add line item
              </Button>
            </div>
          </fieldset>

          <div className="two-up">
            <Input
              id="edit-tax"
              label="Tax amount"
              type="number"
              value={String(tax)}
              onChange={(value) => setTax(Number(value) || 0)}
            />
            <Input id="edit-tax-label" label="Tax label" value={taxLabel} onChange={setTaxLabel} />
          </div>

          <div>
            <div className="doc-total">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal, currency)}</span>
            </div>
            <div className="doc-total">
              <span>{taxLabel}</span>
              <span>{formatCurrency(Number(tax) || 0, currency)}</span>
            </div>
            <div className="doc-total grand">
              <span>Total</span>
              <span>{formatCurrency(total, currency)}</span>
            </div>
          </div>

          <div>
            <span className="field-label">Payment arrangement</span>
            <div className="segmented" style={{ marginTop: 8 }}>
              <button
                type="button"
                aria-pressed={arrangement.type === "link"}
                onClick={() => setArrangement({ type: "link", url: "" })}
              >
                Option A — link
              </button>
              <button
                type="button"
                aria-pressed={arrangement.type === "account"}
                onClick={() => setArrangement({ type: "account", details: {}, allow_proof: true })}
              >
                Option B — account
              </button>
            </div>
            <div className="mt-4">
              {arrangement.type === "link" ? (
                <Input
                  id="edit-link"
                  label="Payment link"
                  type="url"
                  value={arrangement.url}
                  onChange={(value) => setArrangement({ type: "link", url: value })}
                  placeholder="https://"
                />
              ) : (
                <div className="stack-3">
                  <Input
                    id="edit-bank"
                    label="Bank name"
                    value={arrangement.details.bank_name || ""}
                    onChange={(value) =>
                      setArrangement({ ...arrangement, details: { ...arrangement.details, bank_name: value } })
                    }
                  />
                  <Input
                    id="edit-iban"
                    label="IBAN"
                    value={arrangement.details.iban || ""}
                    onChange={(value) =>
                      setArrangement({ ...arrangement, details: { ...arrangement.details, iban: value } })
                    }
                  />
                  <Checkbox
                    id="edit-allow-proof"
                    label="Allow proof upload"
                    checked={arrangement.allow_proof}
                    onChange={(checked) => setArrangement({ ...arrangement, allow_proof: checked })}
                  />
                </div>
              )}
            </div>
          </div>

          <AskHelperTextarea id="edit-notes" label="Notes to client" value={notes} onChange={setNotes} rows={3} helper="Select a sentence to rewrite it." />
        </div>
      </div>

      <Modal open={preview} onClose={() => setPreview(false)} title="Client preview" size="lg">
        <div className="doc-page" style={{ padding: 24 }}>
          <span className="mono">{invoice.invoice_number}</span>
          <h1 style={{ fontSize: 24 }}>{title}</h1>
          <p className="muted" style={{ fontSize: 12 }}>
            Billed to {invoice.client_name} · due {dueDate}
          </p>
          <table className="doc-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td style={{ textAlign: "right" }}>{formatCurrency(item.quantity * item.unit_price, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="doc-total grand">
            <span>Total</span>
            <span>{formatCurrency(total, currency)}</span>
          </div>
          <p style={{ fontSize: 12 }}>
            {arrangement.type === "link"
              ? "Buy Now redirects to the payment link."
              : "The account details are shown with an optional proof upload."}
          </p>
          <div className="doc-foot">This is not a receipt until payment is confirmed.</div>
        </div>
      </Modal>

      <ShareModal
        open={Boolean(share)}
        onClose={() => setShare(null)}
        title="Your invoice is ready."
        url={share?.url || ""}
        defaultMessage={`Hi ${invoice.client_name || "there"}, here is the invoice for the project. You can pay via the link inside.`}
        clientEmail={invoice?.client_email}
        clientPhone={invoice?.client_phone}
        onDone={async () => {
          await invoicesApi.share(id, "manual");
          setShare(null);
          navigate("/invoices");
        }}
      />
    </div>
  );
}
