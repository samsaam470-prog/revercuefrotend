import { Link } from "react-router-dom";
import { GUIDES } from "../../lib/guides";
import { BLOG_POSTS } from "../../lib/blog";
import { COMPETITORS } from "../../lib/competitors";
import solutions from "../../content/solutions.json";
import announcements from "../../content/announcements.json";

type Node = { label: string; to?: string; children?: Node[] };

const featureModules = import.meta.glob<{ slug: string; title: string }>("../../content/features/*.json", {
  eager: true,
  import: "default",
});
const FEATURE_SLUGS: { slug: string; title: string }[] = Object.values(featureModules);

const TREE: Node[] = [
  { label: "Home", to: "/" },
  {
    label: "Product",
    children: [
      {
        label: "Features",
        to: "/features",
        children: FEATURE_SLUGS.map((f) => ({ label: f.title, to: `/features/${f.slug}` })),
      },
      {
        label: "Solutions",
        to: "/solutions",
        children: Object.keys(solutions as Record<string, unknown>).map((slug) => ({
          label: (solutions as Record<string, { title: string }>)[slug].title,
          to: `/solutions/${slug}`,
        })),
      },
      { label: "Pricing", to: "/pricing" },
      {
        label: "Compare",
        to: "/compare",
        children: [
          { label: "How the criteria work", to: "/compare/criteria" },
          ...COMPETITORS.map((c) => ({ label: c.name, to: `/compare/${c.slug}` })),
        ],
      },
    ],
  },
  {
    label: "Learn",
    children: [
      {
        label: "Guides",
        to: "/guides",
        children: GUIDES.map((g) => ({ label: g.title, to: `/guides/${g.slug}` })),
      },
      {
        label: "Blog",
        to: "/blog",
        children: BLOG_POSTS.map((p) => ({ label: p.title, to: `/blog/${p.slug}` })),
      },
      {
        label: "Announcements",
        to: "/announcements",
        children: [...(announcements as { slug: string; title: string; date: string }[])]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((a) => ({ label: a.title, to: `/announcements/${a.slug}` })),
      },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", to: "/about" },
      { label: "Beta", to: "/beta" },
      { label: "FAQs", to: "/faqs" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    label: "AI resources",
    children: [
      { label: "AI access", to: "/ai-access" },
      { label: "AI overview", to: "/ai-overview" },
      { label: "AI changelog", to: "/ai-changelog" },
      { label: "AI demo", to: "/ai-demo" },
      { label: "FAQs for AI", to: "/faqs-for-ai" },
      { label: "Rules for AI", to: "/rules-for-ai" },
      { label: "llms.txt", to: "/llms.txt" },
      { label: "AI capabilities (JSON)", to: "/ai-capabilities.json" },
    ],
  },
  {
    label: "Legal and account",
    children: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Security", to: "/security" },
      { label: "Log in", to: "/login" },
    ],
  },
];

function Tree({ nodes, depth = 0 }: { nodes: Node[]; depth?: number }) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: depth === 0 ? 0 : 22, margin: 0 }}>
      {nodes.map((node) => (
        <li key={`${node.label}-${node.to ?? ""}`} style={{ margin: "6px 0", lineHeight: 1.6 }}>
          {node.to ? <Link to={node.to}>{node.label}</Link> : <strong>{node.label}</strong>}
          {node.children && node.children.length > 0 && <Tree nodes={node.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

export function SitemapPage() {
  return (
    <div className="page page-wide feature-doc">
      <header className="page-head">
        <p className="eyebrow">Sitemap</p>
        <h1>Every page on Revercue.</h1>
        <p>A map of the whole site, grouped by section. Each name links to its page.</p>
      </header>
      <section className="section">
        <Tree nodes={TREE} />
      </section>
    </div>
  );
}
