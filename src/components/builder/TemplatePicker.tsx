import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link2, Plus, Upload } from "lucide-react";
import { templatesApi } from "../../api/templates";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Skeleton } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useToast } from "../../hooks/useToast";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

export interface TemplatePickerProps {
  type: "proposal" | "contract";
  onPick: (templateId: string | null) => void;
  onBack: () => void;
}

export function TemplatePicker({ type, onPick, onBack }: TemplatePickerProps) {
  const { hasFeature } = usePlanGate();
  const toast = useToast();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [mode, setMode] = useState<"file" | "url">("file");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const query = useQuery({ queryKey: ["templates", type], queryFn: () => templatesApi.list(type) });
  const canUpload = hasFeature("custom_templates");

  const templates = [...(query.data?.built_in ?? []), ...(query.data?.custom ?? [])].sort(
    (a, b) => Number(Boolean(b.suggested)) - Number(Boolean(a.suggested)),
  );

  const upload = async () => {
    if (!name.trim() || (mode === "file" ? !file : !url)) return;
    setBusy(true);
    try {
      const response = await templatesApi.upload({
        file: mode === "file" ? file ?? undefined : undefined,
        url: mode === "url" ? url : undefined,
        name,
        type,
      });
      toast.success("Template added.");
      setUploadOpen(false);
      onPick(response.id);
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="builder">
        <div className="builder-bar">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
          <span className="caption">Step 2 of 3 — Choose a template</span>
          <span />
        </div>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: 32, width: "100%" }}>
          <p className="eyebrow">Template</p>
          <h1 className="serif" style={{ fontSize: 32, margin: "8px 0" }}>
            Choose a starting point.
          </h1>
          <p className="muted" style={{ marginBottom: 24 }}>
            Pick a template, or start from blank. You can change everything later.
          </p>

          {query.isLoading && (
            <div className="card-grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="card card-md" key={index}>
                  <Skeleton height={120} />
                  <div className="mt-4">
                    <Skeleton height={14} width="60%" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.isError && (
            <div className="card card-md">
              <EmptyState
                title="Could not load templates."
                description={errorMessage((query.error as ApiError)?.code)}
                action={{ label: "Retry", onClick: () => void query.refetch() }}
              />
            </div>
          )}

          {!query.isLoading && !query.isError && (
            <div className="card-grid">
              <button
                type="button"
                className="link-card"
                style={{ borderStyle: "dashed", textAlign: "left" }}
                onClick={() => onPick(null)}
              >
                <Plus size={20} color="var(--gold)" />
                <h3 style={{ marginTop: 10 }}>Start from blank</h3>
                <p>An empty canvas. The details you entered appear in the suggestions panel.</p>
              </button>

              {canUpload && (
                <>
                  <button
                    type="button"
                    className="link-card"
                    style={{ textAlign: "left" }}
                    onClick={() => {
                      setMode("file");
                      setUploadOpen(true);
                    }}
                  >
                    <Upload size={20} color="var(--gold)" />
                    <h3 style={{ marginTop: 10 }}>Upload your own template</h3>
                    <p>An HTML file. Private to your account.</p>
                  </button>
                  <button
                    type="button"
                    className="link-card"
                    style={{ textAlign: "left" }}
                    onClick={() => {
                      setMode("url");
                      setUploadOpen(true);
                    }}
                  >
                    <Link2 size={20} color="var(--gold)" />
                    <h3 style={{ marginTop: 10 }}>Use a template from a URL</h3>
                    <p>Revercue fetches and caches it for your account.</p>
                  </button>
                </>
              )}

              {templates.map((template) => (
                <div className="link-card" key={template.id}>
                  <div
                    style={{
                      height: 120,
                      borderRadius: 6,
                      background: "linear-gradient(135deg, #1c1c1c, #262626)",
                      border: "1px solid var(--border)",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {template.name}
                  </div>
                  <div className="between" style={{ marginTop: 12 }}>
                    <h3>{template.name}</h3>
                    {template.suggested && <span className="badge badge-gold">Suggested</span>}
                  </div>
                  <p>{template.description || "A built-in starting layout."}</p>
                  <div className="mt-4">
                    <Button size="sm" variant="secondary" onClick={() => onPick(template.id)}>
                      Use this template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!query.isLoading && templates.length === 0 && (
            <p className="caption mt-4">No templates yet. Start from blank — the block library has everything.</p>
          )}
        </div>
      </div>

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload your own template"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setUploadOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={upload} loading={busy} disabled={!name.trim()}>
              {mode === "file" ? "Upload" : "Fetch and use"}
            </Button>
          </>
        }
      >
        <div className="stack-3">
          <div className="segmented">
            <button type="button" aria-pressed={mode === "file"} onClick={() => setMode("file")}>
              Upload HTML
            </button>
            <button type="button" aria-pressed={mode === "url"} onClick={() => setMode("url")}>
              Use a URL
            </button>
          </div>
          {mode === "file" ? (
            <div className="input-group">
              <label htmlFor="template-file">HTML file</label>
              <input
                id="template-file"
                type="file"
                accept=".html,text/html"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
              <span className="helper">One .html file. It is sanitized before rendering.</span>
            </div>
          ) : (
            <Input
              id="template-url"
              label="Template URL"
              type="url"
              value={url}
              onChange={setUrl}
              placeholder="https://"
              helper="Revercue fetches it, sanitizes it and caches it."
            />
          )}
          <Input id="template-name" label="Name" value={name} onChange={setName} required />
        </div>
      </Modal>
    </>
  );
}
