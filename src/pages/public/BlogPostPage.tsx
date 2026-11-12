import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS, postBySlug } from "../../lib/blog";
import { formatDate } from "../../lib/formatters";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postBySlug(slug) : undefined;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) {
    return (
      <div className="page page-narrow">
        <p className="eyebrow">404</p>
        <h1 className="serif" style={{ fontSize: 32, margin: "12px 0" }}>
          This post doesn't exist.
        </h1>
        <Link to="/blog" className="btn btn-primary mt-6">
          All posts
        </Link>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          height: 2,
          width: `${progress}%`,
          background: "var(--gold)",
          zIndex: 41,
          transition: "width 80ms linear",
        }}
        aria-hidden="true"
      />
      <div className="page page-narrow">
        <article className="article" style={{ margin: "0 auto" }}>
          <p className="eyebrow">Blog</p>
          <h1 style={{ marginTop: 8 }}>{post.title}</h1>
          <p className="caption">
            {formatDate(post.date)} · {post.readMinutes} min read
          </p>
          {post.body.map((section) => (
            <section key={section.paragraphs[0].slice(0, 20)}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </section>
          ))}

          <div className="card card-md mt-8">
            <h3 style={{ marginBottom: 8 }}>One link. One thread.</h3>
            <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>
              Start on the Free plan and see whether the thread fits how you already work.
            </p>
            <Link to="/signup" className="btn btn-primary">
              Start Free
            </Link>
          </div>

          <section className="section" style={{ marginTop: 48 }}>
            <h2 style={{ marginBottom: 16 }}>Related</h2>
            <div className="stack-3">
              {related.map((item) => (
                <Link key={item.slug} to={`/blog/${item.slug}`} className="link-card">
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
