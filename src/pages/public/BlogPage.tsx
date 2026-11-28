import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../../lib/blog";
import { DEV_ARTICLES, DEV_SERIES } from "../../lib/devArticles";
import { formatDate } from "../../lib/formatters";
import { ProductCover, blogVisual } from "../../components/visuals/ProductCover";

export function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="page">
      <div className="page-head">
        <p className="eyebrow">Blog</p>
        <h1>Notes on the thread.</h1>
        <p>Short essays about client work, links and the cost of five tabs. No growth hacks.</p>
      </div>

      <Link to={`/blog/${featured.slug}`} className="link-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", marginBottom: 40 }}>
        <div className="cover-frame cover-frame-hero">
          <ProductCover visual={blogVisual(featured.slug)} variant="hero" label={`${featured.title} — product screen`} />
        </div>
        <div>
          <span className="badge badge-gold">Featured</span>
          <h2 className="serif" style={{ fontSize: 28, margin: "12px 0" }}>
            {featured.title}
          </h2>
          <p className="muted">{featured.excerpt}</p>
          <p className="caption mt-4">
            {formatDate(featured.date)} · {featured.readMinutes} min read
          </p>
        </div>
      </Link>

      <div className="card-grid">
        {rest.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="link-card">
            <div className="cover-frame cover-frame-sm">
              <ProductCover visual={blogVisual(post.slug)} label={`${post.title} — product screen`} />
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
                      <p className="caption mt-4">
            {formatDate(post.date)} · {post.readMinutes} min read
          </p>
        </Link>
        ))}
      </div>

      <section style={{ marginTop: 64 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <h2 className="serif" style={{ fontSize: 26, margin: 0 }}>
            Also on DEV Community
          </h2>
          <a
            href="https://dev.to/revercue"
            target="_blank"
            rel="noopener noreferrer"
            className="caption"
          >
            All posts on dev.to/revercue →
          </a>
        </div>
        <p className="muted" style={{ marginTop: 8, marginBottom: 28 }}>
          Longer pieces from the build log, published on DEV. Together they make up the{" "}
          <strong>{DEV_SERIES}</strong> series: proposals, contracts and the money in between.
        </p>

        <div className="card-grid">
          {DEV_ARTICLES.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="cover-frame cover-frame-sm">
                <img
                  src={article.cover}
                  alt={`Cover: ${article.title}`}
                  loading="lazy"
                  width={1392}
                  height={752}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <p className="caption mt-4">
                {formatDate(article.date)} · {article.readMinutes} min read · Read on DEV →
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
