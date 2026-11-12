import { useState } from "react";
import { Link } from "react-router-dom";
import { GUIDES, GUIDE_CATEGORIES } from "../../lib/guides";
import { CodeVisual } from "../../components/visuals";

export function GuidesPage() {
  const [category, setCategory] = useState<string>("All");
  const visible =
    category === "All" ? GUIDES : GUIDES.filter((guide) => guide.category === category);

  return (
    <div className="page">
      <div className="page-head">
        <p className="eyebrow">Guides</p>
        <h1>How to run the thread, from proposal to payment.</h1>
        <p>
          Seventeen guides. Each one is a real workflow, not a feature list. No "AI", no versions —
          the specific screens, the specific order.
        </p>
      </div>

      <div className="tabs">
        {GUIDE_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            className={`tab${category === item ? " active" : ""}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {visible.map((guide) => (
          <Link to={`/guides/${guide.slug}`} className="link-card" key={guide.slug}>
            <div style={{ marginBottom: 16 }}>
              <CodeVisual name={guide.visual} />
            </div>
            <span className="badge badge-muted">{guide.category}</span>
            <h3 style={{ marginTop: 10 }}>{guide.title}</h3>
            <p>{guide.excerpt}</p>
            <p className="caption mt-4">{guide.readMinutes} min read</p>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="empty">
          <h3>No guides in this category yet.</h3>
          <p>Try another category.</p>
        </div>
      )}
    </div>
  );
}
