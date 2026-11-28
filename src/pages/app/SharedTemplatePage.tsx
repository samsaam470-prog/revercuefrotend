import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { templatesApi } from "../../api/templates";
import { TEMPLATE_LIBRARY, type TemplateComplexity } from "../../lib/templates";
import { TemplatePagePreview } from "../../components/builder/TemplatePagePreview";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";

const COMPLEXITY_LABELS: Record<TemplateComplexity, string> = {
  simple: "Simple",
  standard: "Standard",
  detailed: "Detailed",
};

/**
 * The receiving end of a shared template link. It sits inside the authenticated
 * app layout, so an anonymous visitor is sent to sign in and brought back here:
 * a shared template is not a client document and never gets a public URL.
 *
 * Bundle templates render from the local library. Templates published from the
 * admin portal exist only on the server, so they render from their stored HTML.
 */
export function SharedTemplatePage() {
  const { token = "" } = useParams<{ token: string }>();

  const query = useQuery({
    queryKey: ["shared-template", token],
    queryFn: () => templatesApi.sharedTemplate(token),
    enabled: Boolean(token),
    retry: false,
  });

  const data = query.data;
  const template = data
    ? TEMPLATE_LIBRARY[data.template_type].find((item) => item.id === data.template_id)
    : undefined;

  const remote = useQuery({
    queryKey: ["shared-template-html", data?.template_id],
    queryFn: () => templatesApi.get(data!.template_id),
    enabled: Boolean(data && !template),
    retry: false,
  });

  if (query.isLoading) {
    return (
      <div className="page">
        <SkeletonLines count={6} />
      </div>
    );
  }

  if (query.isError || !data) {
    const apiError = query.error as ApiError | undefined;
    return (
      <div className="page page-narrow">
        <div className="page-head">
          <p className="eyebrow">Shared template</p>
          <h1>This link cannot be opened.</h1>
          <p>
            {apiError
              ? errorMessage(apiError.code, apiError.message)
              : "This share link is not valid or has expired."}
          </p>
        </div>
        <Link className="btn btn-secondary btn-sm" to="/settings/template-library">
          Open the template library
        </Link>
      </div>
    );
  }

  const documentLabel = data.template_type === "proposal" ? "proposal" : "contract";
  const startPath = data.template_type === "proposal" ? "/proposals/new" : "/contracts/new";

  if (!template) {
    if (remote.isLoading) {
      return (
        <div className="page">
          <SkeletonLines count={6} />
        </div>
      );
    }

    if (!remote.data?.html) {
      return (
        <div className="page page-narrow">
          <div className="page-head">
            <p className="eyebrow">Shared template</p>
            <h1>This template is not available.</h1>
            <p>The template in this link has been removed from the library.</p>
          </div>
          <Link className="btn btn-secondary btn-sm" to="/settings/template-library">
            Open the template library
          </Link>
        </div>
      );
    }

    return (
      <div className="page">
        <div className="page-head">
          <p className="eyebrow">Shared template · {data.template_type === "proposal" ? "Proposal" : "Contract"}</p>
          <h1>{remote.data.template.name}</h1>
          <p>{remote.data.template.description || `A ${documentLabel} template added by Revercue.`}</p>
        </div>

        <p className="caption" style={{ marginBottom: 20 }}>
          Shared from the Revercue template library. This is a reference layout — nothing from anyone's
          account, client or document is included.
        </p>

        <iframe
          title={`${remote.data.template.name} preview`}
          srcDoc={remote.data.html}
          sandbox=""
          style={{ width: "100%", height: "62vh", border: "1px solid var(--border)", borderRadius: 10 }}
        />

        <div className="inline" style={{ gap: 10, flexWrap: "wrap", marginTop: 20 }}>
          <Link className="btn btn-primary btn-sm" to={startPath}>
            Start a {documentLabel}
          </Link>
          <Link className="btn btn-ghost btn-sm" to="/settings/template-library">
            Browse all templates
          </Link>
        </div>

        <p className="caption">
          Opening the builder takes you to the template step, where this layout and any other can be chosen.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <p className="eyebrow">
          Shared template · {template.type === "proposal" ? "Proposal" : "Contract"}
        </p>
        <h1>{template.name}</h1>
        <p>{template.longDescription}</p>
      </div>

      <p className="caption" style={{ marginBottom: 20 }}>
        Shared from the Revercue template library. This is a reference layout — nothing from anyone's
        account, client or document is included.
      </p>

      <div className="tpl-preview-body">
        <div className="tpl-preview-page">
          <TemplatePagePreview template={template} detail />
        </div>
        <div className="tpl-preview-info">
          <dl className="tpl-preview-meta">
            <div>
              <dt>Document</dt>
              <dd>{template.type === "proposal" ? "Proposal" : "Contract"}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{template.category}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{template.industry}</dd>
            </div>
            <div>
              <dt>Best for</dt>
              <dd>{template.audience}</dd>
            </div>
            <div>
              <dt>Use case</dt>
              <dd>{template.useCase}</dd>
            </div>
            <div>
              <dt>Complexity</dt>
              <dd>{COMPLEXITY_LABELS[template.complexity]}</dd>
            </div>
          </dl>

          <div>
            <p className="tpl-preview-label">Sections ({template.sections.length})</p>
            <ol className="tpl-section-list">
              {template.sections.map((section) => (
                <li key={section.key}>{section.title}</li>
              ))}
            </ol>
          </div>

          <div className="inline" style={{ gap: 10, flexWrap: "wrap" }}>
            <Link className="btn btn-primary btn-sm" to={startPath}>
              Start a {documentLabel}
            </Link>
            <Link className="btn btn-ghost btn-sm" to="/settings/template-library">
              Browse all templates
            </Link>
          </div>

          <p className="caption">
            Opening the builder takes you to the template step, where this layout and any other can be
            chosen.
          </p>
        </div>
      </div>
    </div>
  );
}
