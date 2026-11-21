import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { FAQItem } from "../../components/shared/FAQItem";
import { FAQS, FAQ_TOTAL, type Faq } from "../../lib/faqs";

type GroupId = Faq["group"] | "all";

/**
 * The labels for the ten existing FAQ groups. The groups are the source of
 * truth in `src/lib/faqs.ts`; this page only presents them.
 */
const GROUPS: { id: Faq["group"]; label: string }[] = [
  { id: "product", label: "The product" },
  { id: "plans", label: "Plans and pricing" },
  { id: "documents", label: "Documents" },
  { id: "tracking", label: "Tracking" },
  { id: "data", label: "Data and privacy" },
  { id: "crm", label: "Clients and CRM" },
  { id: "design", label: "Design" },
  { id: "support", label: "Support" },
  { id: "email", label: "Email" },
  { id: "signatures", label: "Signatures" },
];

function matches(faq: Faq, query: string): boolean {
  if (!query) return true;
  const haystack = `${faq.question}\n${faq.answer}`.toLowerCase();
  return haystack.includes(query);
}

export function FaqsPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GroupId>("all");

  const normalised = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      FAQS.filter(
        (faq) => (group === "all" || faq.group === group) && matches(faq, normalised),
      ),
    [group, normalised],
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: FAQS.length };
    for (const entry of GROUPS) {
      result[entry.id] = FAQS.filter((faq) => faq.group === entry.id).length;
    }
    return result;
  }, []);

  return (
    <div className="page page-wide">
      <div className="page-head">
        <p className="eyebrow">FAQs</p>
        <h1>Every question, in one place.</h1>
        <p>
          All {FAQ_TOTAL} answers about the product, the plans, the documents, tracking, data, the
          client record, email, design and signatures. Search the text, or browse a category. The
          same answers also appear beside the pages they belong to.
        </p>
      </div>

      <div className="faq-search">
        <label htmlFor="faq-search" className="sr-only">
          Search the questions and answers
        </label>
        <div className="faq-search-field">
          <Search size={16} aria-hidden="true" />
          <input
            id="faq-search"
            type="search"
            className="input"
            placeholder="Search the questions and answers"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="faq-filters" role="group" aria-label="Browse by category">
        <button
          type="button"
          className="faq-filter"
          aria-pressed={group === "all"}
          onClick={() => setGroup("all")}
        >
          All <span>{counts.all}</span>
        </button>
        {GROUPS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className="faq-filter"
            aria-pressed={group === entry.id}
            onClick={() => setGroup(entry.id)}
          >
            {entry.label} <span>{counts[entry.id]}</span>
          </button>
        ))}
      </div>

      <p className="faq-count" role="status" aria-live="polite">
        {visible.length === 0
          ? "No questions match this search."
          : `${visible.length} ${visible.length === 1 ? "question" : "questions"}${
              normalised ? ` matching “${query.trim()}”` : ""
            }${group === "all" ? "" : ` in ${GROUPS.find((entry) => entry.id === group)?.label}`}.`}
      </p>

      {visible.length === 0 ? (
        <div className="faq-empty">
          <p>
            Nothing matched. Try a shorter phrase, or clear the search to read all {FAQ_TOTAL}{" "}
            answers.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setQuery("");
              setGroup("all");
            }}
          >
            Clear the search
          </button>
        </div>
      ) : group === "all" ? (
        GROUPS.map((entry) => {
          const items = visible.filter((faq) => faq.group === entry.id);
          if (items.length === 0) return null;
          return (
            <section key={entry.id} className="faq-section" aria-labelledby={`faq-group-${entry.id}`}>
              <h2 id={`faq-group-${entry.id}`} className="faq-group-title">
                {entry.label}
              </h2>
              <div className="faq-list">
                {items.map((faq) => (
                  <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <div className="faq-list">
          {visible.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}

      <p className="faq-footnote">
        Still stuck? <Link to="/contact">Contact the team</Link>. The guides carry the longer
        explanations, and the <a href="/faqs-for-ai">FAQ for AI assistants</a> covers the questions
        an agent needs when describing the product.
      </p>
    </div>
  );
}
