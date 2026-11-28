import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Eye, Link2, Search, Share2, ShieldCheck } from "lucide-react";
import { templatesApi } from "../../api/templates";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_COMPLEXITIES,
  TEMPLATE_LIBRARY,
  searchTemplates,
  type LibraryTemplate,
  type TemplateComplexity,
  type TemplateType,
} from "../../lib/templates";
import { TemplatePagePreview } from "../builder/TemplatePagePreview";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Select } from "../ui/Select";
import { SkeletonLines } from "../ui/Skeleton";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { Template } from "../../types";

const COMPLEXITY_LABELS: Record<TemplateComplexity, string> = {
  simple: "Simple",
  standard: "Standard",
  detailed: "Detailed",
};

type TypeFilter = "all" | TemplateType;

type ShareState = { state: "idle" | "loading" | "ready" | "error"; url?: string; error?: string };

/**
 * A reference library, not a selection screen. Choosing a starting point stays
 * in the proposal and contract builders; here a user browses the whole built-in
 * set, previews a template and shares a link to it. Templates added later from
 * the admin portal are listed too, even though their structure lives on the
 * server rather than in this bundle.
 */
export function TemplateLibrary() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState<TemplateComplexity | "">("");
  const [preview, setPreview] = useState<LibraryTemplate | null>(null);
  const [htmlPreview, setHtmlPreview] = useState<Template | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [htmlError, setHtmlError] = useState("");
  const [htmlBusy, setHtmlBusy] = useState(false);
  const [share, setShare] = useState<ShareState>({ state: "idle" });

  const serverTemplates = useQuery({
    queryKey: ["templates", "library"],
    queryFn: () => templatesApi.list(),
  });

  const proposalTotal = TEMPLATE_LIBRARY.proposal.length;
  const contractTotal = TEMPLATE_LIBRARY.contract.length;
  const total = proposalTotal + contractTotal;

  const localIds = useMemo(
    () => new Set([...TEMPLATE_LIBRARY.proposal, ...TEMPLATE_LIBRARY.contract].map((template) => template.id)),
    [],
  );

  /** Admin-added templates: server rows that are not one of the 73 in this bundle. */
  const added = useMemo(() => {
    const rows = serverTemplates.data?.built_in ?? [];
    const seen = new Set<string>();
    return rows.filter((template) => {
      if (localIds.has(template.id) || seen.has(template.id)) return false;
      if (typeFilter !== "all" && template.type !== typeFilter) return false;
      const term = query.trim().toLowerCase();
      if (term) {
        const haystack = `${template.name} ${template.description ?? ""} ${(template.tags ?? []).join(" ")}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      seen.add(template.id);
      return true;
    });
  }, [serverTemplates.data, localIds, typeFilter, query]);

  const types = useMemo<TemplateType[]>(
    () => (typeFilter === "all" ? ["proposal", "contract"] : [typeFilter]),
    [typeFilter],
  );

  const categories = useMemo(
    () => [...new Set(types.flatMap((type) => TEMPLATE_CATEGORIES[type]))],
    [types],
  );

  const results = useMemo(
    () => types.flatMap((type) => searchTemplates(type, { query, category, complexity })),
    [types, query, category, complexity],
  );

  const filtered = Boolean(query.trim() || category || complexity || typeFilter !== "all");

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setComplexity("");
    setTypeFilter("all");
  };

  const changeType = (next: TypeFilter) => {
    setTypeFilter(next);
    setCategory("");
  };

  const openPreview = (template: LibraryTemplate) => {
    setShare({ state: "idle" });
    setPreview(template);
  };

  const shareById = async (type: TemplateType, id: string) => {
    setShare({ state: "loading" });
    try {
      const response = await templatesApi.shareLibraryTemplate({ template_type: type, template_id: id });
      const url = `${window.location.origin}${response.path}`;
      setShare({ state: "ready", url });
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // The link stays on screen, so a blocked clipboard is not a failure.
      }
    } catch (cause) {
      const apiError = cause as ApiError;
      setShare({ state: "error", error: errorMessage(apiError.code, apiError.message) });
    }
  };

  const shareTemplate = async (template: LibraryTemplate) => {
    setPreview(template);
    await shareById(template.type, template.id);
  };

  const openHtmlPreview = async (template: Template) => {
    setHtmlPreview(template);
    setHtml(null);
    setHtmlError("");
    setShare({ state: "idle" });
    setHtmlBusy(true);
    try {
      const response = await templatesApi.get(template.id);
      setHtml(response.html || null);
      if (!response.html) setHtmlError("This template has no preview file yet.");
    } catch (cause) {
      const apiError = cause as ApiError;
      setHtmlError(errorMessage(apiError.code, apiError.message));
    } finally {
      setHtmlBusy(false);
    }
  };

  const copyAgain = async () => {
    if (!share.url) return;
    try {
      await navigator.clipboard.writeText(share.url);
    } catch {
      // Nothing to do: the URL is visible and selectable.
    }
  };

  const shareBlock = (
    <>
      {share.state === "ready" && share.url ? (
        <>
          <p className="caption" style={{ wordBreak: "break-all" }}>
            <Link2 size={14} aria-hidden="true" /> {share.url}
          </p>
          <p className="caption">
            Copied. The recipient needs a Revercue account to open it — a shared template is a reference
            layout, not a client document, so there is no public link.
          </p>
          <Button size="sm" variant="secondary" onClick={() => void copyAgain()}>
            <Copy size={14} aria-hidden="true" /> Copy again
          </Button>
        </>
      ) : (
        <>
          <p className="caption">
            Creates a link any Revercue account can open. Recipients see the structure and sample wording
            only — never your documents or client details — and can start their own document from it.
          </p>
          {share.state === "error" && <p className="notice notice-red">{share.error}</p>}
        </>
      )}
    </>
  );

  return (
    <div className="stack-4">
      <div className="settings-card">
        <h2>Template library</h2>
        <p className="muted" style={{ fontSize: 14 }}>
          All {total} built-in templates: {proposalTotal} proposals and {contractTotal} contracts. This is a
          reference library, not the selection screen — to start a document from a template, choose it in the
          proposal or contract builder.
        </p>

        <div className="tpl-controls">
          <div className="tpl-search">
            <Search size={16} aria-hidden="true" />
            <Input
              id="library-search"
              label="Search templates"
              hideLabel
              value={query}
              onChange={setQuery}
              placeholder="Search by name, industry, audience or use case"
              type="search"
            />
          </div>
          <Select
            id="library-complexity"
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

        <div className="segmented" role="group" aria-label="Template type" style={{ marginTop: 12 }}>
          <button type="button" aria-pressed={typeFilter === "all"} onClick={() => changeType("all")}>
            All {total}
          </button>
          <button type="button" aria-pressed={typeFilter === "proposal"} onClick={() => changeType("proposal")}>
            Proposals {proposalTotal}
          </button>
          <button type="button" aria-pressed={typeFilter === "contract"} onClick={() => changeType("contract")}>
            Contracts {contractTotal}
          </button>
        </div>

        <div className="tpl-chips" role="group" aria-label="Template categories">
          <button type="button" aria-pressed={!category} onClick={() => setCategory("")}>
            All categories
          </button>
          {categories.map((value) => (
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
            {added.length > 0 ? ` · ${added.length} added by Revercue` : ""}
          </span>
          {filtered && (
            <Button size="sm" variant="ghost" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="tpl-empty">
            <p>No template matches those filters.</p>
            <Button size="sm" variant="secondary" onClick={clearFilters}>
              Show all {total} templates
            </Button>
          </div>
        ) : (
          <div className="tpl-grid">
            {results.map((template) => (
              <article className="tpl-card" key={`${template.type}-${template.id}`}>
                <button
                  type="button"
                  className="tpl-card-preview"
                  onClick={() => openPreview(template)}
                  aria-label={`Preview the ${template.name} template`}
                >
                  <TemplatePagePreview template={template} />
                </button>
                <div className="tpl-card-body">
                  <div className="tpl-card-badges">
                    <span className="badge badge-muted">
                      {template.type === "proposal" ? "Proposal" : "Contract"}
                    </span>
                    <span className="badge badge-default">{COMPLEXITY_LABELS[template.complexity]}</span>
                    {template.suggested && <span className="badge badge-gold">Suggested</span>}
                  </div>
                  <h2>{template.name}</h2>
                  <p className="tpl-card-description">{template.description}</p>
                  <p className="tpl-card-audience">
                    <span>For</span> {template.audience}
                  </p>
                  <div className="tpl-card-actions">
                    <Button size="sm" variant="ghost" onClick={() => openPreview(template)}>
                      <Eye size={14} aria-hidden="true" /> Preview
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => void shareTemplate(template)}>
                      <Share2 size={14} aria-hidden="true" /> Share
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="settings-card">
        <div className="between">
          <h2>Added by Revercue</h2>
          <span className="caption">
            {serverTemplates.isLoading ? "Loading…" : `${added.length} available`}
          </span>
        </div>
        <p className="muted" style={{ fontSize: 14 }}>
          Templates published from the Revercue admin portal appear here as soon as they are live, alongside
          the built-in library. They are also offered in the builder's template step.
        </p>

        {serverTemplates.isLoading && <SkeletonLines count={2} />}
        {!serverTemplates.isLoading && added.length === 0 && (
          <p className="caption">No extra templates right now. The {total} built-in templates above are always available.</p>
        )}
        {serverTemplates.isError && (
          <p className="caption">Newly added templates could not be loaded. The built-in library still works.</p>
        )}

        {added.length > 0 && (
          <ul className="tpl-upload-list">
            {added.map((template) => (
              <li key={template.id}>
                <div>
                  <strong>{template.name}</strong>
                  <span className="caption">
                    {template.type === "proposal" ? "Proposal" : "Contract"}
                    {template.tags?.length ? ` · ${template.tags.join(", ")}` : ""}
                    {template.description ? ` · ${template.description}` : ""}
                  </span>
                </div>
                <div className="inline" style={{ gap: 8 }}>
                  <Button size="sm" variant="ghost" onClick={() => void openHtmlPreview(template)}>
                    <Eye size={14} aria-hidden="true" /> Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      void openHtmlPreview(template);
                      void shareById(template.type as TemplateType, template.id);
                    }}
                  >
                    <Share2 size={14} aria-hidden="true" /> Share
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
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
              <Button onClick={() => void shareTemplate(preview)} loading={share.state === "loading"}>
                <Share2 size={14} aria-hidden="true" /> Share this template
              </Button>
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

              {preview.type === "contract" && (
                <p className="tpl-legal-note" role="note">
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span>
                    Contracts here are drafting aids, not legal advice. Choose the governing law for the
                    agreement and have a qualified lawyer review it before signing.
                  </span>
                </p>
              )}

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
              </dl>

              <div>
                <p className="tpl-preview-label">Sections ({preview.sections.length})</p>
                <ol className="tpl-section-list">
                  {preview.sections.map((section) => (
                    <li key={section.key}>{section.title}</li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="tpl-preview-label">Share this template</p>
                {shareBlock}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(htmlPreview)}
        onClose={() => setHtmlPreview(null)}
        title={htmlPreview ? htmlPreview.name : "Template preview"}
        size="lg"
        footer={
          htmlPreview ? (
            <>
              <Button variant="ghost" onClick={() => setHtmlPreview(null)}>
                Close
              </Button>
              <Button
                onClick={() => void shareById(htmlPreview.type as TemplateType, htmlPreview.id)}
                loading={share.state === "loading"}
              >
                <Share2 size={14} aria-hidden="true" /> Share this template
              </Button>
            </>
          ) : null
        }
      >
        {htmlPreview && (
          <div className="stack-4">
            <p className="caption">
              {htmlPreview.type === "proposal" ? "Proposal" : "Contract"} template added by Revercue. The
              preview renders the uploaded layout with its sample wording.
            </p>
            {htmlBusy && <SkeletonLines count={4} />}
            {!htmlBusy && html && (
              <iframe
                title={`${htmlPreview.name} preview`}
                srcDoc={html}
                sandbox=""
                style={{ width: "100%", height: "58vh", border: "1px solid var(--border)", borderRadius: 10 }}
              />
            )}
            {!htmlBusy && !html && <p className="notice notice-red">{htmlError || "No preview available."}</p>}
            <div>
              <p className="tpl-preview-label">Share this template</p>
              {shareBlock}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
