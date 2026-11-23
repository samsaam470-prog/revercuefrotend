import { RichText } from "../../components/builder/RichText";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import { publicApi } from "../../api/public";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { PasswordWall } from "./PasswordWall";
import { ClosedPage } from "./ClosedPage";
import { useToast } from "../../hooks/useToast";
import { errorMessage } from "../../lib/errors";
import { formatCurrency, formatDate } from "../../lib/formatters";
import { ApiError } from "../../types/api";

export function PublicInvoicePage() {
  const { publicId } = useParams<{ publicId: string }>();
  const toast = useToast();
  const [token, setToken] = useState(sessionStorage.getItem(`rc_public_${publicId}`) || undefined);
  const [wallError, setWallError] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const query = useQuery({
    queryKey: ["public", "invoice", publicId, token],
    queryFn: () => publicApi.getInvoice(publicId as string, token),
    enabled: Boolean(publicId),
    retry: false,
  });

  const invoice = query.data?.invoice;
  const locked =
    (query.error as ApiError | null)?.status === 401 &&
    Boolean(((query.error as ApiError | null)?.details as { password_wall?: boolean })?.password_wall);

  const unlock = async (password: string) => {
    setWallError("");
    try {
      const response = await publicApi.unlockInvoice(publicId as string, password);
      sessionStorage.setItem(`rc_public_${publicId}`, response.session_token);
      setToken(response.session_token);
    } catch (cause) {
      setWallError(errorMessage((cause as ApiError).code));
    }
  };

  if (query.isLoading) {
    return (
      <div className="client-wrap">
        <SkeletonLines count={6} />
      </div>
    );
  }

  if (locked) return <PasswordWall title="An invoice" brandName="Revercue" onSubmit={unlock} error={wallError} />;
  if (!invoice) return <ClosedPage reason="expired" />;
  if (["verified", "confirmed"].includes(invoice.status)) return <ClosedPage reason="paid" />;

  const arrangement = invoice.payment_arrangement;
  const subtotal = invoice.line_items?.reduce((sum, item) => sum + item.quantity * item.unit_price, 0) ?? 0;
  const total = invoice.total ?? subtotal + (invoice.tax || 0);
  const currency = invoice.currency || "USD";

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copied.`);
  };

  return (
    <div className="doc-shell">
      <div className="doc-page" style={{ maxWidth: 720, borderTop: "3px solid #1a1a1a" }}>
        <div className="doc-brand">
          <span className="mark" style={{ background: "#1a1a1a" }}>
            {(invoice.client_name || "C").charAt(0)}
          </span>
          Invoice
          <span className="mono" style={{ marginLeft: "auto" }}>
            {invoice.invoice_number}
          </span>
        </div>

        <div className="between">
          <div>
            <h1 style={{ fontSize: 26 }}>{invoice.title}</h1>
            <p className="muted" style={{ fontSize: 13 }}>
              Billed to {invoice.client_name}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <Badge variant={invoice.status === "overdue" ? "red" : "muted"}>
              {invoice.status.replace(/_/g, " ")}
            </Badge>
            <p className="caption" style={{ marginTop: 6 }}>
              Due {formatDate(invoice.due_date)}
            </p>
          </div>
        </div>

        <table className="doc-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th style={{ textAlign: "right" }}>Unit</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.line_items ?? []).map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td style={{ textAlign: "right" }}>{formatCurrency(item.unit_price, currency)}</td>
                <td style={{ textAlign: "right" }}>{formatCurrency(item.quantity * item.unit_price, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="doc-total">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>
        {Boolean(invoice.tax) && (
          <div className="doc-total">
            <span>{invoice.tax_label || "Tax"}</span>
            <span>{formatCurrency(invoice.tax || 0, currency)}</span>
          </div>
        )}
        <div className="doc-total grand">
          <span>Total</span>
          <span>{formatCurrency(total, currency)}</span>
        </div>

        {invoice.notes && (
          <p style={{ fontSize: 13, marginTop: 16 }}>
            <RichText value={invoice.notes} />
          </p>
        )}

        {error && <p className="error-text">{error}</p>}

        <div className="mt-6">
          {arrangement?.type === "link" && (
            <div className="stack-3">
              <p style={{ fontSize: 13 }}>Pay the freelancer through their payment link.</p>
              <Button
                size="lg"
                loading={busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    const response = await publicApi.buyNow(publicId as string);
                    if (response.redirect) window.location.href = response.redirect;
                    else window.location.href = arrangement.url;
                  } catch (cause) {
                    setError(errorMessage((cause as ApiError).code));
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Buy Now
              </Button>
              <p className="caption">
                Buy Now takes you to the freelancer's payment page. Revercue does not process the payment.
              </p>
            </div>
          )}

          {arrangement?.type === "account" && (
            <div className="stack-3">
              <p style={{ fontSize: 13 }}>
                Transfer the total to the account below. The invoice is not paid until the freelancer confirms it.
              </p>
              <div className="card card-md stack-2">
                {arrangement.details.bank_name && (
                  <div className="between">
                    <span className="caption">Bank</span>
                    <span>{arrangement.details.bank_name}</span>
                  </div>
                )}
                {arrangement.details.account_holder && (
                  <div className="between">
                    <span className="caption">Account holder</span>
                    <span>{arrangement.details.account_holder}</span>
                  </div>
                )}
                {arrangement.details.account_number && (
                  <div className="between">
                    <span className="caption">Account number</span>
                    <button type="button" className="btn btn-text mono" onClick={() => void copy(arrangement.details.account_number as string, "Account number")}>
                      {arrangement.details.account_number} <Copy size={12} />
                    </button>
                  </div>
                )}
                {arrangement.details.iban && (
                  <div className="between">
                    <span className="caption">IBAN</span>
                    <button type="button" className="btn btn-text mono" onClick={() => void copy(arrangement.details.iban as string, "IBAN")}>
                      {arrangement.details.iban} <Copy size={12} />
                    </button>
                  </div>
                )}
                {arrangement.details.swift && (
                  <div className="between">
                    <span className="caption">SWIFT</span>
                    <span className="mono">{arrangement.details.swift}</span>
                  </div>
                )}
              </div>
              {arrangement.allow_proof && (
                <div className="stack-2">
                  <Button size="lg" onClick={() => { setShowAccount(true); }}>
                    I've paid — upload proof
                  </Button>
                  {showAccount && (
                    <Link to={`/i/${publicId}/proof`} className="btn btn-secondary btn-lg">
                      Choose the receipt file
                    </Link>
                  )}
                  <p className="caption">An image or a PDF. The freelancer reviews it before marking the invoice paid.</p>
                </div>
              )}
            </div>
          )}

          {!arrangement && (
            <div className="notice">The freelancer has not added payment instructions yet. Contact them for the next step.</div>
          )}
        </div>

        <p className="doc-foot">This is not a receipt until the freelancer confirms the payment.</p>
        {(invoice as any).show_credit !== false && (
          <div className="doc-foot">
            Powered by{" "}
            <Link to="/" style={{ textDecoration: "underline" }}>
              Revercue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
