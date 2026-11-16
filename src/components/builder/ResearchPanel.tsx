import { useState } from "react";
import { ChevronDown, ExternalLink, Globe } from "lucide-react";
import type { Research } from "../../lib/pipeline";

export interface ResearchPanelProps {
  research: Research;
  source?: "helper" | "backend" | "pattern";
  running?: boolean;
}

/**
 * The research the backend extracted for this brief, kept in the builder so the
 * author can see what the first draft was organized from and reuse a fact.
 */
export function ResearchPanel({ research, source, running }: ResearchPanelProps) {
  const [open, setOpen] = useState(false);
  const count = research.notes.length;

  if (!count && !research.images.length && !running) return null;

  return (
    <div className="research-panel">
      <button
        type="button"
        className="research-head"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <Globe size={13} color="var(--gold)" />
        <span>
          {count ? `${count} research ${count === 1 ? "note" : "notes"}` : "Research"}
          {running ? " — organizing the first draft…" : source ? ` · ${source}` : ""}
        </span>
        <ChevronDown
          size={13}
          style={{ marginLeft: "auto", transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>

      {open && (
        <div className="research-body">
          {research.notes.map((note, index) => (
            <article className="research-note" key={`${note.title}-${index}`}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
              {note.source && (
                <a href={note.source} target="_blank" rel="noreferrer noopener" className="caption">
                  <ExternalLink size={11} /> {note.source.replace(/^https?:\/\//, "").slice(0, 60)}
                </a>
              )}
            </article>
          ))}

          {research.images.length > 0 && (
            <div className="research-images">
              {research.images.map((image) => (
                <a key={image} href={image} target="_blank" rel="noreferrer noopener">
                  <img src={image} alt="" loading="lazy" />
                </a>
              ))}
            </div>
          )}

          {!count && <p className="caption">No notes came back for this brief. The template placeholders stay for you to write.</p>}
        </div>
      )}
    </div>
  );
}
