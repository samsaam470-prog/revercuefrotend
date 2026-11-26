import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Eye, Link2, Plus, Search, ShieldCheck, Upload } from "lucide-react";
import { templatesApi } from "../../api/templates";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_LIBRARY,
  TEMPLATE_COMPLEXITIES,
  blocksForTemplate,
  industriesFor,
  searchTemplates,
  type LibraryTemplate,
  type TemplateComplexity,
  type TemplateType,
} from "../../lib/templates";
import { clearTemplateChoice, saveTemplateChoice } from "../../lib/template-choice";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Select } from "../ui/Select";
import { Skeleton } from "../ui/Skeleton";
import { TemplatePagePreview } from "./TemplatePagePreview";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useToast } from "../../hooks/useToast";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

export interface TemplatePickerProps {
  type: TemplateType;
  onPick: (choice: { templateId: string | null; blocks?: LibraryTemplate["blocks"] }) => void;
  onBack: () => void;
  /** Switching to the other library starts a new document of that type. */
  onSwitchLibrary?: () => void;
  /** When set, the chosen structure and theme are stored for this document. */
  documentId?: string;
}

const COMPLEXITY_LABELS: Record<TemplateComplexity, string> = {
  simple: "Simple",
  standard: "Standard",
  detailed: "Detailed",
};

export function TemplatePicker({
  type,
  onPick,
  onBack,
  onSwitchLibrary,
  documentId,
}: TemplatePickerProps) {
  const { hasFeature } = usePlanGate();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");
  const [complexity, setComplexity] = useState<TemplateComplexity | "">("");
  const [preview, setPreview] = useState<LibraryTemplate | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [mode, setMode] = useState<"file" | "url">("file");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const serverTemplates = useQuery({ queryKey: ["templates", type], queryFn: () => templatesApi.list(type) });
  const canUpload = hasFeature("custom_templates");

  const results = useMemo(
    () => searchTemplates(type, { query, category, industry, complexity }),
    [type, query, category, industry, complexity],
  );
  const industries = useMemo(() => industriesFor(type), [type]);
  const total = TEMPLATE_LIBRARY[type].length;
  const filtered = Boolean(query.trim() || category || industry || complexity);

  const uploaded = [
    ...(serverTemplates.data?.built_in ?? []).filter((template) => !template.id.startsWith("builtin-")),
    ...(serverTemplates.data?.custom ?? []),
  ];

  const choose = (template: LibraryTemplate) => {
    const blocks = blocksForTemplate(template);
    if (documentId) saveTemplateChoice(documentId, template, blocks);
    onPick({ templateId: template.id, blocks });
  };

  const chooseBlank = () => {
    if (documentId) clearTemplateChoice(documentId);
    onPick({ templateId: null });
  };

  const compared = compare
    .map((id) => TEMPLATE_LIBRARY[type].find((template) => template.id === id))
    .filter((template): template is LibraryTemplate => Boolean(template));

  const toggleCompare = (id: string) => {
    setCompare((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current, id].slice(-2);
    });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setIndustry("");
    setComplexity("");
  };

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
      onPick({ templateId: response.id });
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setBusy(false);
    }
  };

  const libraryName = type === "proposal" ? "proposal" : "contract";
  const otherLibrary = type === "proposal" ? "contracts" : "proposals";

  return (
    <>
      <div className="builder">
        <div className="builder-bar">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
          <span className="caption">Step 2 of 3 — Choose a {libraryName} template</span>
          <span />
        </div>

        <div className="tpl-picker">
          <header className="tpl-picker-head">
            <p className="eyebrow">Template library</p>
            <h1 className="serif">Choose a starting point.</h1>
            <p className="muted">
              {total} {type} templates, each with its own structure and layout. The draft is written from
              the template you choose, and everything stays editable.
            </p>

            <div className="tpl-library-switch">
              <div className="segmented" role="group" aria-label="Template library">
                <button type="button" aria-pressed={type === "proposal"}>
                  Proposals
                </button>
                <button type="button" aria-pressed={type === "contract"} onClick={onSwitchLibrary}>
                  Contracts
                </button>
              </div>
              <span className="caption">You are creating a {libraryName}.</span>
            </div>
          </header>

          {type === "contract" && (
            <p className="tpl-legal-note" role="note">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>
                Contracts here are drafting aids, not legal advice. Choose the governing law for this
                agreement and have a qualified lawyer review it before signing. No wording is guaranteed
                to be enforceable in every jurisdiction.
              </span>
            </p>
          )}

          <div className="tpl-controls">
            <div className="tpl-search">
              <Search size={16} aria-hidden="true" />
              <Input
                id="template-search"
                label="Search templates"
                hideLabel
                value={query}
                onChange={setQuery}
                placeholder="Search by name, industry, audience or use case"
                type="search"
              />
            </div>
            <Select
              id="template-industry"
              label="Industry"
              value={industry}
              onChange={setIndustry}
              placeholder="All industries"
              options={industries.map((value) => ({ value, label: value }))}
            />
            <Select
              id="template-complexity"
              label="Complexity"
              value={complexity}
              onChange={(value) => setComplexity(value as TemplateComplexity | "")}
              placeholder="Any complexity"
              options={TEMPLATE_COMPLEXITIES.map((value) => ({
                value,
                label: COMPLEXITY_LABELS[value],
              }))}
            />
          </div>

          <div className="tpl-chips" role="group" aria-label="Template categories">
            <button type="button" aria-pressed={!category} onClick={() => setCategory("")}>
              All categories
            </button>
            {TEMPLATE_CATEGORIES[type].map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={category === value}
                onClick={() => setCategory(category === value ? "" : value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="tpl-results-bar">
            <span className="caption">
              {results.length} {results.length === 1 ? "template" : "templates"}
              {filtered ? " match your filters" : ""}
            </span>
            <div className="tpl-results-actions">
              {compared.length === 2 && (
                <Button size="sm" variant="secondary" onClick={() => setCompareOpen(true)}>
                  Compare 2
                </Button>
              )}
              {filtered && (
                <Button size="sm" variant="ghost" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
              <Button size="sm" variant="secondary" onClick={chooseBlank}>
                <Plus size={14} aria-hidden="true" /> Start from blank
              </Button>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="tpl-empty">
              <p>No {libraryName} template matches those filters.</p>
              <Button size="sm" variant="secondary" onClick={clearFilters}>
                Show all {total} templates
              </Button>
            </div>
          ) : (
            <div className="tpl-grid">
              {results.map((template) => (
                <article className="tpl-card" key={template.id}>
                  <button
                    type="button"
                    className="tpl-card-preview"
                    onClick={() => setPreview(template)}
                    aria-label={`Preview the ${template.name} template`}
                  >
                    <TemplatePagePreview template={template} />
                  </button>
                  <div className="tpl-card-body">
                    <div className="tpl-card-badges">
                      <span className="badge badge-muted">{template.category}</span>
                      {template.suggested && <span className="badge badge-gold">Suggested</span>}
                      <span className="badge badge-default">{COMPLEXITY_LABELS[template.complexity]}</span>
                    </div>
                    <h2>{template.name}</h2>
                    <p className="tpl-card-description">{template.description}</p>
                    <p className="tpl-card-audience">
                      <span>For</span> {template.audience}
                    </p>
                    <ul className="tpl-tags" aria-label="Template tags">
                      {template.tags.slice(0, 3).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="tpl-compare-toggle"
                      aria-pressed={compare.includes(template.id)}
                      onClick={() => toggleCompare(template.id)}
                    >
                      {compare.includes(template.id) ? "Selected to compare" : "Add to compare"}
                    </button>
                    <div className="tpl-card-actions">
                      <Button size="sm" variant="ghost" onClick={() => setPreview(template)}>
                        <Eye size={14} aria-hidden="true" /> Preview
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => choose(template)}>
                        Use template <ArrowRight size={14} aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <section className="tpl-uploads" aria-labelledby="tpl-uploads-title">
            <div className="between">
              <h2 id="tpl-uploads-title">Your uploaded templates</h2>
              {canUpload && (
                <div className="tpl-upload-actions">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setMode("file");
                      setUploadOpen(true);
                    }}
                  >
                    <Upload size={14} aria-hidden="true" /> Upload HTML
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setMode("url");
                      setUploadOpen(true);
                    }}
                  >
                    <Link2 size={14} aria-hidden="true" /> Use a URL
                  </Button>
                </div>
              )}
            </div>
            {serverTemplates.isLoading && <Skeleton height={48} />}
            {!serverTemplates.isLoading && uploaded.length === 0 && (
              <p className="caption">
                Nothing uploaded yet. The {total} built-in {libraryName} templates above are always
                available.
              </p>
            )}
            {uploaded.length > 0 && (
              <ul className="tpl-upload-list">
                {uploaded.map((template) => (
                  <li key={template.id}>
                    <div>
                      <strong>{template.name}</strong>
                      <span className="caption">{template.description || "Your uploaded template."}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onPick({ templateId: template.id })}
                    >
                      Use template
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {serverTemplates.isError && (
              <p className="caption">Your uploaded templates could not be loaded. The built-in library still works.</p>
            )}
          </section>

          <p className="caption tpl-switch-hint">
            Looking for {otherLibrary}?{" "}
            <button type="button" className="tpl-link" onClick={onSwitchLibrary}>
              Start a {otherLibrary.slice(0, -1)} instead
            </button>
          </p>
        </div>
      </div>

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview ? preview.name : "Template preview"}
        size="lg"
        footer={
          preview ? (
            <>
              <Button variant="ghost" onClick={() => setPreview(null)}>
                Close
              </Button>
              <Button onClick={() => choose(preview)}>Use this template</Button>
            </>
          ) : null
        }
      >
        {preview && (
          <div className="tpl-preview-body">
            <div className="tpl-preview-page">
              <TemplatePagePreview template={preview} detail />
            </div>
            <div className="tpl-preview-info">
              <p className="tpl-preview-description">{preview.longDescription}</p>
              <dl className="tpl-preview-meta">
                <div>
                  <dt>Document</dt>
                  <dd>{preview.type === "proposal" ? "Proposal" : "Contract"}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{preview.category}</dd>
                </div>
                <div>
                  <dt>Industry</dt>
                  <dd>{preview.industry}</dd>
                </div>
                <div>
                  <dt>Best for</dt>
                  <dd>{preview.audience}</dd>
                </div>
                <div>
                  <dt>Use case</dt>
                  <dd>{preview.useCase}</dd>
                </div>
                <div>
                  <dt>Complexity</dt>
                  <dd>{COMPLEXITY_LABELS[preview.complexity]}</dd>
                </div>
                <div>
                  <dt>Design</dt>
                  <dd style={{ textTransform: "capitalize" }}>{preview.design.replace(/-/g, " ")}</dd>
                </div>
                <div>
                  <dt>Business types</dt>
                  <dd>{preview.businessTypes.join(", ")}</dd>
                </div>
              </dl>
              <div>
                <p className="tpl-preview-label">Sections ({preview.sections.length})</p>
                <ol className="tpl-section-list">
                  {preview.sections.map((section) => (
                    <li key={section.key}>{section.title}</li>
                  ))}
                </ol>
              </div>
              <ul className="tpl-tags" aria-label="Template tags">
                {preview.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {preview.type === "contract" && (
                <p className="tpl-legal-note" role="note">
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span>
                    A drafting aid, not legal advice. Complete the governing law and have the agreement
                    reviewed by a qualified lawyer before signing.
                  </span>
                </p>
              )}
              <p className="caption">
                The preview uses sample wording to show the layout. Your draft is written from your
                brief, research and any details you enter.
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        title="Compare templates"
        size="lg"
        footer={
          <Button variant="ghost" onClick={() => setCompareOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="tpl-compare-grid">
          {compared.map((template) => (
            <div className="tpl-compare-col" key={template.id}>
              <h3>{template.name}</h3>
              <p className="caption">{template.category} · {COMPLEXITY_LABELS[template.complexity]}</p>
              <dl className="tpl-preview-meta">
                <div>
                  <dt>Best for</dt>
                  <dd>{template.audience}</dd>
                </div>
                <div>
                  <dt>Use case</dt>
                  <dd>{template.useCase}</dd>
                </div>
                <div>
                  <dt>Design</dt>
                  <dd style={{ textTransform: "capitalize" }}>{template.design.replace(/-/g, " ")}</dd>
                </div>
                <div>
                  <dt>Sections</dt>
                  <dd>{template.sections.length}</dd>
                </div>
              </dl>
              <p className="tpl-preview-label">Structure</p>
              <ol className="tpl-section-list">
                {template.sections.map((section) => (
                  <li key={section.key}>{section.title}</li>
                ))}
              </ol>
              <Button size="sm" variant="secondary" onClick={() => choose(template)}>
                Use {template.name}
              </Button>
            </div>
          ))}
        </div>
      </Modal>

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
