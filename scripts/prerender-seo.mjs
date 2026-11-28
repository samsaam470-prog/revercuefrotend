import { mkdir, readFile, writeFile } from "node:fs/promises";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");
const shell = await readFile(resolve(dist, "index.html"), "utf8");
const origin = "https://revercue.co.uk";
const solutions = JSON.parse(await readFile(resolve(process.cwd(), "src/content/solutions.json"), "utf8"));

const meta = {
  "proposal-software": { title: "Proposal Software for Freelancers | Revercue", description: "Create interactive freelance proposals with packages, FAQs and client questions. Share one link and move accepted work into contracts and invoices with Revercue." },
  "client-management": { title: "Freelance Client Management Software | Revercue", description: "Manage freelance clients, communication history, proposals, documents and follow-ups in one connected workspace with Revercue." },
  "invoice-contract-software": { title: "Invoice and Contract Software for Freelancers | Revercue", description: "Create client contracts, collect typed-name signatures and send invoices with payment instructions in the same freelance workflow." },
  "freelance-business-management": { title: "All-in-One Business Management for Freelancers | Revercue", description: "Connect proposals, contracts, requirement forms, invoices and client records in one freelance business workflow." },
  "proposal-and-invoice-tool": { title: "Proposal and Invoice Tool for Freelancers | Revercue", description: "Connect client proposals to contracts and invoices. Keep project details and payment status together with Revercue." },
};

const esc = (value) => String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function setMeta(html, attr, key, value) {
  const re = new RegExp("<meta[^>]*" + attr + "=[\"']" + key + "[\"'][^>]*>", "i");
  const tag = "<meta " + attr + "=\"" + key + "\" content=\"" + esc(value) + "\" />";
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", tag + "</head>");
}

const label = (slug) => slug.replaceAll("-", " ");
let count = 0;

for (const [slug, page] of Object.entries(solutions)) {
  const info = meta[slug];
  if (!info) continue;
  const url = origin + "/solutions/" + slug;

  let html = shell.replace(/<title>[^<]*<\/title>/i, "<title>" + esc(info.title) + "</title>");
  html = setMeta(html, "name", "description", info.description);
  html = setMeta(html, "property", "og:title", info.title);
  html = setMeta(html, "property", "og:description", info.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", info.title);
  html = setMeta(html, "name", "twitter:description", info.description);
  const canonical = "<link rel=\"canonical\" href=\"" + url + "\" />";
  html = /<link[^>]+rel=["']canonical["']/i.test(html)
    ? html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, canonical)
    : html.replace("</head>", canonical + "</head>");

  const graph = [
    { "@type": "WebPage", "@id": url + "#webpage", name: info.title, description: info.description, url, isPartOf: { "@type": "WebSite", name: "Revercue", url: origin + "/" }, about: page.eyebrow, dateModified: "2026-11-24" },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: origin + "/features" },
      { "@type": "ListItem", position: 3, name: page.title_short || label(slug), item: url },
    ] },
    { "@type": "FAQPage", mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
  ];
  const schema = { "@context": "https://schema.org", "@graph": graph };
  html = html.replace("</head>", "<script type=\"application/ld+json\">" + JSON.stringify(schema).replace(/</g, "\\u003c") + "</script></head>");

  const facts = page.key_facts.map((f) => "<li>" + esc(f) + "</li>").join("");
  const sections = page.sections.map((s) => "<section><h2>" + esc(s.heading) + "</h2>" + s.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("") + "</section>").join("");
  const features = page.features.map((f) => "<li>" + esc(f) + "</li>").join("");
  const steps = page.steps.map((s, i) => "<li><strong>" + (i + 1) + ". " + esc(s.title) + ":</strong> " + esc(s.copy) + "</li>").join("");
  const faqs = page.faqs.map((f) => "<details><summary>" + esc(f.question) + "</summary><p>" + esc(f.answer) + "</p></details>").join("");
  const related = page.related.map((r) => "<li><a href=\"" + r.to + "\">" + esc(r.label) + "</a></li>").join("");

  const body =
    "<main style=\"max-width:960px;margin:0 auto;padding:48px 24px;font-family:Inter,Arial,sans-serif;line-height:1.65\">" +
    "<nav aria-label=\"Breadcrumb\"><a href=\"/\">Revercue</a> / <a href=\"/features\">Solutions</a> / " + esc(label(slug)) + "</nav>" +
    "<header><p>" + esc(page.eyebrow) + "</p><h1>" + esc(page.title) + "</h1><p>" + esc(page.intro) + "</p>" +
    "<p><a href=\"/login\">Start free</a> | <a href=\"/pricing\">See pricing</a></p></header>" +
    "<section><h2>Quick answer</h2><p>" + esc(page.summary) + "</p><ul>" + facts + "</ul></section>" +
    sections +
    "<section><h2>What you can do</h2><ul>" + features + "</ul></section>" +
    "<section><h2>How it works</h2><ol>" + steps + "</ol></section>" +
    "<section><h2>Common questions</h2>" + faqs + "</section>" +
    "<section><h2>Explore related workflows</h2><ul>" + related + "</ul>" +
    "<p><a href=\"/features\">All features</a> | <a href=\"/pricing\">Plans and pricing</a> | <a href=\"/guides\">Product guides</a></p></section>" +
    "</main>";

  html = html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + body + "</div>");
  const dir = resolve(dist, "solutions", slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "index.html"), html, "utf8");
  console.log("Pre-rendered /solutions/" + slug);
  count++;
}
console.log("Pre-rendered " + count + " SEO landing pages.");

// ---- Feature detail pages: /features/<slug> ----
import { readdir } from "node:fs/promises";
const featureDir = resolve(process.cwd(), "src/content/features");
const featureFiles = (await readdir(featureDir)).filter((f) => f.endsWith(".json"));
let featureCount = 0;
for (const file of featureFiles) {
  const feature = JSON.parse(await readFile(resolve(featureDir, file), "utf8"));
  const url = origin + "/features/" + feature.slug;
  let html = shell.replace(/<title>[^<]*<\/title>/i, "<title>" + esc(feature.metaTitle) + "</title>");
  html = setMeta(html, "name", "description", feature.metaDescription);
  html = setMeta(html, "property", "og:title", feature.metaTitle);
  html = setMeta(html, "property", "og:description", feature.metaDescription);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", feature.metaTitle);
  html = setMeta(html, "name", "twitter:description", feature.metaDescription);
  const canonicalTag = "<link rel=\"canonical\" href=\"" + url + "\" />";
  html = /<link[^>]+rel=["']canonical["']/i.test(html)
    ? html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, canonicalTag)
    : html.replace("</head>", canonicalTag + "</head>");

  const graph = [
    { "@type": "WebPage", "@id": url + "#webpage", name: feature.metaTitle, description: feature.metaDescription, url, isPartOf: { "@type": "WebSite", name: "Revercue", url: origin + "/" }, dateModified: "2026-11-24" },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" },
      { "@type": "ListItem", position: 2, name: "Features", item: origin + "/features" },
      { "@type": "ListItem", position: 3, name: feature.slug.replaceAll("-", " "), item: url },
    ] },
    { "@type": "FAQPage", mainEntity: feature.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
  ];
  html = html.replace("</head>", "<script type=\"application/ld+json\">" + JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") + "</script></head>");

  const facts = feature.key_facts.map((f) => "<li>" + esc(f) + "</li>").join("");
  const sections = feature.sections.map((s) => "<section><h2>" + esc(s.heading) + "</h2>" + s.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("") + "</section>").join("");
  const includes = feature.includes.map((i) => "<li>" + esc(i) + "</li>").join("");
  const faqs = feature.faqs.map((f) => "<details><summary>" + esc(f.question) + "</summary><p>" + esc(f.answer) + "</p></details>").join("");
  const related = feature.related.map((r) => "<li><a href=\"" + r.to + "\">" + esc(r.label) + "</a></li>").join("");

  const body =
    "<main style=\"max-width:960px;margin:0 auto;padding:48px 24px;font-family:Inter,Arial,sans-serif;line-height:1.65\">" +
    "<nav aria-label=\"Breadcrumb\"><a href=\"/\">Revercue</a> / <a href=\"/features\">Features</a> / " + esc(feature.slug.replaceAll("-", " ")) + "</nav>" +
    "<header><p>" + esc(feature.eyebrow) + "</p><h1>" + esc(feature.title) + "</h1><p>" + esc(feature.intro) + "</p>" +
    "<p><a href=\"/login\">Start free</a> | <a href=\"/pricing\">See pricing</a></p></header>" +
    "<section><h2>Quick answer</h2><p>" + esc(feature.summary) + "</p><ul>" + facts + "</ul></section>" +
    sections +
    "<section><h2>What is included</h2><ul>" + includes + "</ul></section>" +
    "<section><h2>Questions</h2>" + faqs + "</section>" +
    "<section><h2>Keep exploring</h2><ul>" + related + "</ul>" +
    "<p><a href=\"/features\">All features</a> | <a href=\"/pricing\">Plans and pricing</a> | <a href=\"/solutions/proposal-software\">Solutions</a></p></section>" +
    "</main>";

  html = html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + body + "</div>");
  const dir = resolve(dist, "features", feature.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "index.html"), html, "utf8");
  console.log("Pre-rendered /features/" + feature.slug);
  featureCount++;
}
console.log("Pre-rendered " + featureCount + " feature pages.");

// ---- Announcements: list page and one static page per announcement ----
const announcementsList = JSON.parse(await readFile(resolve(process.cwd(), "src/content/announcements.json"), "utf8"));
const sortedAnnouncements = [...announcementsList].sort((a, b) => b.date.localeCompare(a.date) || (b.order ?? 0) - (a.order ?? 0));
const annStyle = "max-width:960px;margin:0 auto;padding:48px 24px;font-family:Inter,Arial,sans-serif;line-height:1.7;color:#1a1a1a";
const annDate = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const slashUrl = (u) => {
  const path = u.replace(/^https?:\/\/[^/]+/, "");
  if (path === "" || path === "/" || path.endsWith("/") || /\.[a-z0-9]+$/i.test(path)) return u;
  return u + "/";
};
function setHead(html, { title, description, url, type }) {
  url = slashUrl(url);
  let out = html.replace(/<title>[^<]*<\/title>/i, "<title>" + esc(title) + "</title>");
  out = setMeta(out, "name", "description", description);
  out = setMeta(out, "property", "og:title", title);
  out = setMeta(out, "property", "og:description", description);
  out = setMeta(out, "property", "og:url", url);
  out = setMeta(out, "property", "og:type", type);
  out = setMeta(out, "name", "twitter:title", title);
  out = setMeta(out, "name", "twitter:description", description);
  const canonical = "<link rel=\"canonical\" href=\"" + url + "\" />";
  out = /<link[^>]+rel=["']canonical["']/i.test(out)
    ? out.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, canonical)
    : out.replace("</head>", canonical + "</head>");
  return out;
}
function addSchema(html, graph) {
  return html.replace("</head>", "<script type=\"application/ld+json\">" + JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") + "</script></head>");
}
const organization = { "@type": "Organization", name: "Revercue", url: origin + "/" };

// list page
{
  const listUrl = origin + "/announcements";
  const listTitle = "Announcements — Revercue";
  const listDesc = "Dated notes on Revercue releases, plans, checkout and what is still in beta or planning.";
  let html = setHead(shell, { title: listTitle, description: listDesc, url: listUrl, type: "website" });
  html = addSchema(html, [
    { "@type": "CollectionPage", "@id": listUrl + "#page", name: listTitle, description: listDesc, url: listUrl, isPartOf: { "@type": "WebSite", name: "Revercue", url: origin + "/" } },
    { "@type": "ItemList", itemListElement: sortedAnnouncements.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: origin + "/announcements/" + a.slug, name: a.title })) },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" },
      { "@type": "ListItem", position: 2, name: "Announcements", item: listUrl },
    ] },
  ]);
  const items = sortedAnnouncements.map((a) =>
    "<article style=\"border-top:1px solid #e5e5e5;padding:20px 0\"><p style=\"margin:0;font-size:14px;color:#555\">" + esc(annDate(a.date)) + " · " + esc(a.status) + "</p>" +
    "<h2 style=\"margin:6px 0 8px;font-size:22px\"><a href=\"/announcements/" + esc(a.slug) + "\">" + esc(a.title) + "</a></h2>" +
    "<p style=\"margin:0\">" + esc(a.summary) + "</p></article>").join("");
  const body = "<main style=\"" + annStyle + "\"><nav aria-label=\"Breadcrumb\"><a href=\"/\">Revercue</a> / Announcements</nav>" +
    "<header><p style=\"text-transform:uppercase;letter-spacing:.08em;font-size:13px\">Announcements</p><h1 style=\"font-size:36px;line-height:1.2\">What changed at Revercue, and when.</h1>" +
    "<p>Dated notes on releases, plans, checkout and what is still in beta or planning. Newest first.</p></header>" + items + "</main>";
  html = html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + body + "</div>");
  await mkdir(resolve(dist, "announcements"), { recursive: true });
  await writeFile(resolve(dist, "announcements", "index.html"), html, "utf8");
  console.log("Pre-rendered /announcements (" + sortedAnnouncements.length + " entries)");
}

// one page per announcement
for (const a of sortedAnnouncements) {
  const url = origin + "/announcements/" + a.slug;
  const description = a.summary.length > 300 ? a.summary.slice(0, 297).replace(/\s+\S*$/, "") + "…" : a.summary;
  let html = setHead(shell, { title: a.title + " | Revercue", description, url, type: "article" });
  const related = (a.links || []).map((l) => "<li><a href=\"" + esc(l.to) + "\">" + esc(l.label) + "</a></li>").join("");
  html = addSchema(html, [
    { "@type": "NewsArticle", "@id": url + "#article", headline: a.title, description, datePublished: a.date, dateModified: a.date,
      mainEntityOfPage: { "@type": "WebPage", "@id": url }, author: organization, publisher: organization,
      articleSection: a.status, url, inLanguage: "en-GB" },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" },
      { "@type": "ListItem", position: 2, name: "Announcements", item: origin + "/announcements" },
      { "@type": "ListItem", position: 3, name: a.title, item: url },
    ] },
  ]);
  const sections = a.body.map((sec) => "<section><h2 style=\"font-size:24px;margin-top:28px\">" + esc(sec.heading) + "</h2>" +
    sec.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("") + "</section>").join("");
  const body = "<main style=\"" + annStyle + "\"><nav aria-label=\"Breadcrumb\"><a href=\"/\">Revercue</a> / <a href=\"/announcements\">Announcements</a> / " + esc(a.title) + "</nav>" +
    "<article><p style=\"font-size:14px;color:#555\"><time datetime=\"" + esc(a.date) + "\">" + esc(annDate(a.date)) + "</time> · " + esc(a.status) + "</p>" +
    "<h1 style=\"font-size:36px;line-height:1.2;margin:10px 0 16px\">" + esc(a.title) + "</h1><p>" + esc(a.summary) + "</p>" + sections +
    (related ? "<section><h2 style=\"font-size:20px\">Related on Revercue</h2><ul>" + related + "</ul></section>" : "") +
    "</article></main>";
  html = html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + body + "</div>");
  await mkdir(resolve(dist, "announcements", a.slug), { recursive: true });
  await writeFile(resolve(dist, "announcements", a.slug, "index.html"), html, "utf8");
}
console.log("Pre-rendered " + sortedAnnouncements.length + " announcement pages.");

const FEATURE_FILES = () => readdirSync(resolve(process.cwd(), "src/content/features")).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(resolve(process.cwd(), "src/content/features", f), "utf8")));
// ---- Crawlable content: features overview, pricing, FAQs, guides, compare ----
const content = JSON.parse(await readFile(resolve(process.cwd(), ".content-cache/content.json"), "utf8"));
const wrapPage = (inner) => "<main style=\"" + annStyle + "\">" + inner + "</main>";
const h2 = (t) => "<h2 style=\"font-size:24px;margin-top:28px\">" + esc(t) + "</h2>";
const ps = (arr) => (arr || []).map((p) => "<p>" + esc(p) + "</p>").join("");
const ul = (arr) => arr && arr.length ? "<ul>" + arr.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "";
const navTrail = (items) => "<nav aria-label=\"Breadcrumb\">" + items.map((i) => i.to ? "<a href=\"" + esc(i.to) + "\">" + esc(i.label) + "</a>" : esc(i.label)).join(" / ") + "</nav>";
const writePage = async (route, html) => {
  const dir = resolve(dist, ...route.split("/").filter(Boolean));
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "index.html"), html, "utf8");
};
const pageHtml = (route, { title, description, type = "website", schema, body }) => {
  const url = origin + route;
  let html = setHead(shell, { title, description, url, type });
  html = addSchema(html, schema);
  return html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + body + "</div>");
};
const trailHome = { label: "Revercue", to: "/" };

// features overview
{
  const feats = FEATURE_FILES().map((f) => f);
  const title = "All Revercue features";
  const description = "Proposals, contracts, requirement forms, invoices, the CRM, the document builder and suggestions, in one client workflow.";
  const body = wrapPage(navTrail([trailHome, { label: "Features" }]) +
    "<header><h1 style=\"font-size:36px\">Seven features, one client thread.</h1><p>" + esc(description) + "</p></header>" +
    feats.map((f) => "<section><h2 style=\"font-size:24px\"><a href=\"/features/" + esc(f.slug) + "\">" + esc(f.title) + "</a></h2><p>" + esc(f.intro) + "</p>" + "<p><a href=\"/features/" + esc(f.slug) + "\">Read the full guide</a></p></section>").join(""));
  await writePage("/features", pageHtml("/features", { title: title + " | Revercue", description, schema: [
    { "@type": "CollectionPage", "@id": origin + "/features#page", name: title, description, url: origin + "/features" },
    { "@type": "ItemList", itemListElement: feats.map((f, i) => ({ "@type": "ListItem", position: i + 1, url: origin + "/features/" + f.slug, name: f.title })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" }, { "@type": "ListItem", position: 2, name: "Features", item: origin + "/features" }] },
  ], body }));
  console.log("Pre-rendered /features overview");
}

// pricing
{
  const plans = content.PLANS;
  const title = "Pricing: Free, Starter, Growth and Scale | Revercue";
  const description = "Revercue plans: Free to start, Starter at $12, Growth at $29 and Scale at $49 a month. Teams is in beta.";
  const body = wrapPage(navTrail([trailHome, { label: "Pricing" }]) +
    "<header><h1 style=\"font-size:36px\">Plans and pricing</h1><p>" + esc(description) + "</p></header>" +
    plans.map((p) => "<section><h2 style=\"font-size:24px\">" + esc(p.name) + " · " + esc(p.statusLabel) + "</h2>" +
      "<p>" + esc(p.role) + "</p>" +
      "<p>" + (p.price == null ? "Price: not yet set (beta)" : "Price: $" + p.price + " a month") + "</p>" +
      ul(p.features) + "</section>").join(""));
  await writePage("/pricing", pageHtml("/pricing", { title, description, schema: [
    { "@type": "WebPage", "@id": origin + "/pricing#page", name: title, description, url: origin + "/pricing" },
    { "@type": "ItemList", itemListElement: plans.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, description: p.role })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" }, { "@type": "ListItem", position: 2, name: "Pricing", item: origin + "/pricing" }] },
  ], body }));
  console.log("Pre-rendered /pricing");
}

// FAQs (all entries, grouped)
{
  const title = "FAQs | Revercue";
  const description = "Answers to common questions about Revercue: documents, plans, tracking, data and the CRM.";
  const groups = [...new Set(content.FAQS.map((f) => f.group))];
  const body = wrapPage(navTrail([trailHome, { label: "FAQs" }]) +
    "<header><h1 style=\"font-size:36px\">Frequently asked questions</h1><p>" + esc(description) + "</p></header>" +
    groups.map((g) => "<section><h2 style=\"font-size:24px;text-transform:capitalize\">" + esc(g) + "</h2>" +
      content.FAQS.filter((f) => f.group === g).map((f) => "<details><summary>" + esc(f.question) + "</summary><p>" + esc(f.answer) + "</p></details>").join("") + "</section>").join(""));
  await writePage("/faqs", pageHtml("/faqs", { title, description, schema: [
    { "@type": "FAQPage", mainEntity: content.FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" }, { "@type": "ListItem", position: 2, name: "FAQs", item: origin + "/faqs" }] },
  ], body }));
  console.log("Pre-rendered /faqs (" + content.FAQS.length + " answers)");
}

// guides index and each guide
{
  const guides = content.GUIDES;
  const idxTitle = "Revercue guides";
  const idxDesc = "Practical guides to proposals, contracts, invoices, the CRM, pricing and every Revercue feature.";
  await writePage("/guides", pageHtml("/guides", { title: idxTitle + " | Revercue", description: idxDesc, schema: [
    { "@type": "CollectionPage", "@id": origin + "/guides#page", name: idxTitle, description: idxDesc, url: origin + "/guides" },
    { "@type": "ItemList", itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: origin + "/guides/" + g.slug, name: g.title })) },
  ], body: wrapPage(navTrail([trailHome, { label: "Guides" }]) + "<header><h1 style=\"font-size:36px\">Guides</h1><p>" + esc(idxDesc) + "</p></header>" +
    guides.map((g) => "<section><h2 style=\"font-size:22px\"><a href=\"/guides/" + esc(g.slug) + "\">" + esc(g.title) + "</a></h2><p>" + esc(g.excerpt) + "</p></section>").join("")) }));
  for (const g of guides) {
    const route = "/guides/" + g.slug;
    const url = origin + route;
    const desc = g.excerpt.length > 300 ? g.excerpt.slice(0, 297).replace(/\s+\S*$/, "") + "…" : g.excerpt;
    const body = wrapPage(navTrail([trailHome, { label: "Guides", to: "/guides" }, { label: g.title }]) +
      "<article><p style=\"font-size:14px;color:#555\">" + esc(g.category) + " · " + g.readMinutes + " min read · Updated " + esc(g.updated) + "</p>" +
      "<h1 style=\"font-size:36px;line-height:1.2\">" + esc(g.title) + "</h1><p>" + esc(g.excerpt) + "</p>" +
      g.sections.map((s) => h2(s.heading) + ps(s.paragraphs) + ul(s.bullets)).join("") + "</article>");
    await writePage(route, pageHtml(route, { title: g.title + " | Revercue", description: desc, type: "article", schema: [
      { "@type": "Article", "@id": url + "#article", headline: g.title, description: desc, dateModified: g.updated, mainEntityOfPage: url, author: organization, publisher: organization, articleSection: g.category },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" }, { "@type": "ListItem", position: 2, name: "Guides", item: origin + "/guides" }, { "@type": "ListItem", position: 3, name: g.title, item: url }] },
    ], body }));
  }
  console.log("Pre-rendered /guides and " + guides.length + " guides");
}

// compare index, each competitor, criteria
{
  const comps = content.COMPETITORS;
  const idxDesc = "Factual comparisons of freelancer client tools: what each is built around, and the prices checked on vendor pages.";
  await writePage("/compare", pageHtml("/compare", { title: "Compare freelancer client tools | Revercue", description: idxDesc, schema: [
    { "@type": "CollectionPage", name: "Compare freelancer client tools", description: idxDesc, url: origin + "/compare" },
    { "@type": "ItemList", itemListElement: comps.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: origin + "/compare/" + c.slug, name: c.name })) },
  ], body: wrapPage(navTrail([trailHome, { label: "Compare" }]) + "<header><h1 style=\"font-size:36px\">Compare freelancer client tools</h1><p>" + esc(idxDesc) + "</p>" +
    "<p><a href=\"/compare/criteria\">How the comparison criteria work</a></p></header>" +
    comps.map((c) => "<section><h2 style=\"font-size:22px\"><a href=\"/compare/" + esc(c.slug) + "\">" + esc(c.name) + "</a></h2><p>" + esc(c.summary) + "</p></section>").join("")) }));
  for (const c of comps) {
    const route = "/compare/" + c.slug;
    const desc = c.summary.length > 300 ? c.summary.slice(0, 297).replace(/\s+\S*$/, "") + "…" : c.summary;
    const body = wrapPage(navTrail([trailHome, { label: "Compare", to: "/compare" }, { label: c.name }]) +
      "<article><h1 style=\"font-size:36px;line-height:1.2\">" + esc(c.name) + "</h1><p>" + esc(c.summary) + "</p><p>" + esc(c.intro) + "</p>" +
      c.sections.map((s) => h2(s.heading) + ps(s.paragraphs)).join("") +
      h2("Where it differs") + ul(c.differences) + h2("Who it fits") + "<p>" + esc(c.fits) + "</p></article>");
    await writePage(route, pageHtml(route, { title: c.name + " compared | Revercue", description: desc, schema: [
      { "@type": "WebPage", "@id": origin + route + "#page", name: c.name + " compared", description: desc, url: origin + route },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" }, { "@type": "ListItem", position: 2, name: "Compare", item: origin + "/compare" }, { "@type": "ListItem", position: 3, name: c.name, item: origin + route }] },
    ], body }));
  }
  const crit = content.CRITERIA; const rows = content.PLATFORM_CRITERIA;
  const critDesc = "The criteria behind the comparison: what each tool is rated on, and the note for each rating.";
  const critBody = wrapPage(navTrail([trailHome, { label: "Compare", to: "/compare" }, { label: "Criteria" }]) +
    "<header><h1 style=\"font-size:36px\">How the comparison works</h1><p>" + esc(critDesc) + "</p></header>" +
    h2("Criteria") + crit.map((k) => "<h3>" + esc(k.label) + "</h3><p>" + esc(k.question) + "</p>").join("") +
    rows.map((r) => "<section><h2 style=\"font-size:22px\">" + esc(r.name) + "</h2><p>" + esc(r.summary) + "</p>" +
      crit.map((k) => { const v = r.ratings[k.id]; return v ? "<p><strong>" + esc(k.label) + ":</strong> " + esc(content.RATING_LABEL[v.rating] || v.rating) + ". " + esc(v.note) + "</p>" : ""; }).join("") + "</section>").join(""));
  await writePage("/compare/criteria", pageHtml("/compare/criteria", { title: "Comparison criteria | Revercue", description: critDesc, schema: [
    { "@type": "WebPage", "@id": origin + "/compare/criteria#page", name: "Comparison criteria", description: critDesc, url: origin + "/compare/criteria" },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" }, { "@type": "ListItem", position: 2, name: "Compare", item: origin + "/compare" }, { "@type": "ListItem", position: 3, name: "Criteria", item: origin + "/compare/criteria" }] },
  ], body: critBody }));
  console.log("Pre-rendered /compare, " + comps.length + " comparisons and criteria");
}

// ---- Pages that were client-only: About, Contact, Beta, Privacy, Terms, Security, Solutions index ----
{
  const staticPages = [
    { name: "about", route: "/about/", title: "About Revercue", description: "Who builds Revercue, why it exists, and how the product fits freelance client work." },
    { name: "contact", route: "/contact/", title: "Contact Revercue", description: "Send a product question, a security report, an accessibility problem or a documentation error." },
    { name: "beta", route: "/beta/", title: "Join the Revercue beta", description: "What the Revercue beta includes, what is still in beta, and how to join." },
    { name: "privacy", route: "/privacy/", title: "Privacy policy | Revercue", description: "How Revercue collects, uses and protects personal information." },
    { name: "terms", route: "/terms/", title: "Terms of service | Revercue", description: "The terms that apply when you use Revercue." },
    { name: "security", route: "/security/", title: "Security | Revercue", description: "The security practices behind Revercue, and what the product does and does not certify." },
    { name: "solutions", route: "/solutions/", title: "Freelancer workflow solutions | Revercue", description: "Revercue tools for proposals, client management, contracts and invoices, by the job you need done." },
    { name: "sitemap", route: "/sitemap/", title: "Sitemap | Revercue", description: "A map of every page on Revercue, grouped by section, with the machine-readable sitemap.xml." },
  ];
  for (const page of staticPages) {
    const markup = await readFile(resolve(process.cwd(), ".content-cache/pages", page.name + ".html"), "utf8");
    const url = origin + page.route;
    let html = setHead(shell, { title: page.title, description: page.description, url, type: "website" });
    html = addSchema(html, [
      { "@type": "WebPage", "@id": url + "#page", name: page.title, description: page.description, url, isPartOf: { "@type": "WebSite", name: "Revercue", url: origin + "/" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" },
        { "@type": "ListItem", position: 2, name: page.title, item: url },
      ] },
    ]);
    html = html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + markup + "</div>");
    await mkdir(resolve(dist, page.route.replace(/^\/|\/$/g, "")), { recursive: true });
    await writeFile(resolve(dist, page.route.replace(/^\/|\/$/g, ""), "index.html"), html, "utf8");
    console.log("Pre-rendered " + page.route);
  }
}
