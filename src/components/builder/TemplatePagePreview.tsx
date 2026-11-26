import { previewDocument } from "../../lib/templates";
import type { DocumentTemplate, PreviewBlock } from "../../lib/templates";

interface TemplatePagePreviewProps {
  template: DocumentTemplate;
  /** The modal shows the whole structure; a card shows the opening. */
  detail?: boolean;
}

function PreviewLine({ block }: { block: PreviewBlock }) {
  switch (block.kind) {
    case "heading":
      return <p className="tpl-page-heading">{block.text}</p>;
    case "meta":
      return <p className="tpl-page-meta">{block.text}</p>;
    case "paragraph":
      return <p className="tpl-page-text">{block.text}</p>;
    case "list":
      return (
        <ul className="tpl-page-list">
          {(block.items ?? []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "timeline":
      return (
        <div className="tpl-page-steps">
          {(block.items ?? []).map((item, index) => (
            <span className="tpl-page-step" key={index}>
              <i aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      );
    case "pricing":
      return (
        <div className="tpl-page-prices">
          {(block.items ?? []).map((item, index) => (
            <span className="tpl-page-price" key={index}>
              <span>{item}</span>
              <b>—</b>
            </span>
          ))}
        </div>
      );
    case "signature":
      return (
        <div className="tpl-page-sign">
          <span />
          <span />
        </div>
      );
    case "hero":
      return <div className="tpl-page-hero">{block.text}</div>;
    default:
      return null;
  }
}

/**
 * A miniature of the document the template produces. It renders the template's
 * real section sequence and theme, with sample wording, so two templates never
 * look the same in the picker.
 */
export function TemplatePagePreview({ template, detail = false }: TemplatePagePreviewProps) {
  const blocks = previewDocument(template);
  const shown = detail ? blocks : blocks.slice(0, 6);

  return (
    <div
      className={`tpl-page${detail ? " tpl-page-detail" : ""}`}
      style={{
        background: template.theme.page_background,
        borderTopColor: template.theme.brand_primary,
      }}
      aria-hidden={detail ? undefined : true}
    >
      <div className="tpl-page-brand" style={{ color: template.theme.brand_primary }}>
        {template.name}
      </div>
      {shown.map((block, index) => (
        <PreviewLine block={block} key={index} />
      ))}
      {!detail && <div className="tpl-page-fade" aria-hidden="true" />}
    </div>
  );
}
