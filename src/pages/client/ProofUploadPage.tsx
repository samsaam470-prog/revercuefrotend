import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "../../api/public";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { ClosedPage } from "./ClosedPage";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

export function ProofUploadPage() {
  const { publicId } = useParams<{ publicId: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem(`rc_public_${publicId}`) || undefined;
  const query = useQuery({
    queryKey: ["public", "invoice", publicId, token],
    queryFn: () => publicApi.getInvoice(publicId as string, token),
    enabled: Boolean(publicId),
    retry: false,
  });

  if (query.isLoading) {
    return (
      <div className="client-wrap">
        <SkeletonLines count={6} />
      </div>
    );
  }

  if (done) return <ClosedPage reason="submitted" brandName={query.data?.invoice.client_name} />;

  if (!query.data) {
    return <ClosedPage reason="expired" />;
  }

  const invoice = query.data.invoice;

  return (
    <div className="client-wrap">
      <div className="client-card stack-4">
        <p className="eyebrow">Payment proof</p>
        <h1 className="serif" style={{ fontSize: 28 }}>
          Upload your receipt.
        </h1>
        <p className="muted">
          {invoice.client_name ? `${invoice.client_name} — ` : ""}
          {invoice.invoice_number}. The freelancer reviews it and marks the invoice paid.
          The invoice is not a receipt until they do.
        </p>

        <div className="input-group">
          <label htmlFor="proof-file">Receipt or screenshot</label>
          <input
            id="proof-file"
            type="file"
            accept="image/*,application/pdf"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <span className="helper">An image or a PDF. Up to 10 MB.</span>
        </div>

        {error && <p className="error-text">{error}</p>}

        <Button
          size="lg"
          loading={uploading}
          disabled={!file}
          onClick={async () => {
            if (!file) return;
            setUploading(true);
            setError("");
            try {
              await publicApi.uploadProof(publicId as string, file);
              setDone(true);
            } catch (cause) {
              const apiError = cause as ApiError;
              setError(errorMessage(apiError.code, apiError.message));
            } finally {
              setUploading(false);
            }
          }}
        >
          Send proof
        </Button>
      </div>
    </div>
  );
}
