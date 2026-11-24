import { mkdir, readFile, writeFile } from "node:fs/promises";
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
