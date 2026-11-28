import { Link } from "react-router-dom";
import { GUIDES } from "../../lib/guides";
import { BLOG_POSTS } from "../../lib/blog";
import { COMPETITORS } from "../../lib/competitors";
import solutions from "../../content/solutions.json";
import announcements from "../../content/announcements.json";
import feature_builder from "../../content/features/builder.json";
import feature_contracts from "../../content/features/contracts.json";
import feature_crm from "../../content/features/crm.json";
import feature_invoices from "../../content/features/invoices.json";
import feature_proposals from "../../content/features/proposals.json";
import feature_requirement_forms from "../../content/features/requirement-forms.json";
import feature_suggestions from "../../content/features/suggestions.json";

type Node = { label: string; to?: string; children?: Node[] };

const FEATURE_SLUGS: { slug: string; title: string }[] = [feature_builder, feature_contracts, feature_crm, feature_invoices, feature_proposals, feature_requirement_forms, feature_suggestions];

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
        to: "/blog/",
        // Directory-index URLs: the trailing slash is the URL the host serves and
        // the canonical form, so the sitemap page links to it directly.
        children: BLOG_POSTS.map((p) => ({ label: p.title, to: `/blog/${p.slug}/` })),
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
        <p>A map of the whole site, grouped by section. Each name links to its page. The machine-readable list is <a href="/sitemap.xml">sitemap.xml</a>.</p>
      </header>
      <section className="section">
        <Tree nodes={TREE} />
      </section>
    </div>
  );
}
