import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");
const shell = await readFile(resolve(dist, "index.html"), "utf8");
const origin = "https://revercue.co.uk";
const pages = [
  { slug:"proposal-software", title:"Proposal Software for Freelancers | Revercue", description:"Create interactive freelance proposals with packages, FAQs and client questions. Share one link and move accepted work into contracts and invoices.", h1:"Send proposals clients can actually respond to.", intro:"Build a branded proposal with packages and client questions. Clients can review options, choose a package, ask questions and respond from one shareable page.", bullets:["Editable proposal packages and templates","FAQs and client questions","Proposal activity connected to the client record","Continue into contracts, forms or invoices"], question:"Can clients choose between packages?", answer:"Yes. Add packages so clients can review and select the option that fits.", related:["client-management","proposal-and-invoice-tool"] },
  { slug:"client-management", title:"Freelance Client Management Software | Revercue", description:"Manage freelance clients, communication history, proposals, documents and follow-ups in one connected workspace.", h1:"Keep every client, conversation and next step together.", intro:"Connect client records with proposals, contracts, forms, invoices and communication history. Keep project context together and surface follow-ups due from your dashboard.", bullets:["Client records and project documents","Communication history and notes","Proposal, contract, form and invoice tracking","Follow-up visibility"], question:"Is Revercue a CRM for freelancers?", answer:"Yes. It includes client records, communication logs, notes and follow-up visibility alongside the client document workflow.", related:["freelance-business-management","proposal-software"] },
  { slug:"invoice-contract-software", title:"Invoice and Contract Software for Freelancers | Revercue", description:"Create client contracts, collect typed-name signatures and send invoices with payment instructions in one freelance workflow.", h1:"Move from agreed scope to signed terms and payment.", intro:"Keep contracts and invoices alongside proposals and client records. Confirm scope, capture a typed-name signature with consent, and send invoices with clear payment instructions.", bullets:["Contracts with scope and payment terms","Typed-name signature with consent and date","Invoices with line items, tax and totals","Payment links or account details"], question:"Does Revercue support electronic signatures?", answer:"It supports a typed full name with explicit consent and a recorded date; it is not a qualified electronic signature or identity-verification service.", related:["proposal-software","client-management"] },
  { slug:"freelance-business-management", title:"All-in-One Business Management for Freelancers | Revercue", description:"Connect proposals, contracts, requirement forms, invoices and client records in one freelance business workflow.", h1:"Run the client-workflow side of your freelance business in one place.", intro:"Revercue connects the client-facing workflow from first proposal through documents and payment. It focuses on client operations, not replacing every accounting or time-tracking system.", bullets:["Interactive proposals","Contracts and client signatures","Adaptive requirement forms","Invoices and payment status","Client records and follow-ups"], question:"Does Revercue replace accounting software?", answer:"No. Revercue provides invoice creation and payment tracking for client work, not full accounting or tax services.", related:["client-management","invoice-contract-software"] },
  { slug:"proposal-and-invoice-tool", title:"Proposal and Invoice Tool for Freelancers | Revercue", description:"Connect client proposals to contracts and invoices. Keep project details and payment status together.", h1:"Connect the proposal you send to the invoice that follows.", intro:"Stop rebuilding client and project details in separate tools. Create a proposal, move agreed work forward and prepare an invoice in one connected client workflow.", bullets:["Proposals with packages and client questions","Project context in the client record","Contracts when needed","Invoices with line items and payment instructions","Proposal-to-payment history"], question:"Can I create both proposals and invoices?", answer:"Yes. Revercue includes proposal and invoice builders in the same workspace.", related:["proposal-software","invoice-contract-software"] }
];

const esc = (value) => String(value).replace(/[&<>"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[c]));
function setMeta(html, attr, key, value) {
  const re = new RegExp("<meta[^>]*" + attr + "=[\\\"']" + key + "[\\\"'][^>]*>", "i");
  const tag = "<meta " + attr + "=\"" + key + "\" content=\"" + esc(value) + "\" />";
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", tag + "</head>");
}

for (const page of pages) {
  const url = origin + "/solutions/" + page.slug;
  let html = shell.replace(/<title>[^<]*<\/title>/i, "<title>" + esc(page.title) + "</title>");
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  const canonical = "<link rel=\"canonical\" href=\"" + url + "\" />";
  html = /<link[^>]+rel=["']canonical["']/i.test(html)
    ? html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, canonical)
    : html.replace("</head>", canonical + "</head>");
  const schema = { "@context":"https://schema.org", "@type":"WebPage", name:page.title, description:page.description, url, isPartOf:{ "@type":"WebSite", name:"Revercue", url:origin + "/" } };
  html = html.replace("</head>", "<script type=\"application/ld+json\">" + JSON.stringify(schema).replace(/</g, "\\u003c") + "</script></head>");
  const bullets = page.bullets.map((item) => "<li>" + esc(item) + "</li>").join("");
  const related = page.related.map((slug) => "<li><a href=\"/solutions/" + slug + "\">" + esc(slug.replaceAll("-", " ")) + "</a></li>").join("");
  const body = "<main style=\"max-width:960px;margin:0 auto;padding:48px 24px;font-family:Inter,Arial,sans-serif;line-height:1.65\"><nav aria-label=\"Breadcrumb\"><a href=\"/\">Revercue</a> / <a href=\"/features\">Features</a> / " + esc(page.slug.replaceAll("-", " ")) + "</nav><header><h1>" + esc(page.h1) + "</h1><p>" + esc(page.intro) + "</p><p><a href=\"/login\">Start free</a> | <a href=\"/pricing\">See pricing</a></p></header><section><h2>What you can do</h2><ul>" + bullets + "</ul></section><section><h2>Frequently asked question</h2><details open><summary>" + esc(page.question) + "</summary><p>" + esc(page.answer) + "</p></details></section><section><h2>Explore related workflows</h2><ul>" + related + "</ul><p><a href=\"/features\">All features</a> | <a href=\"/pricing\">Plans and pricing</a> | <a href=\"/guides\">Product guides</a></p></section></main>";
  html = html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + body + "</div>");
  const dir = resolve(dist, "solutions", page.slug);
  await mkdir(dir, { recursive:true });
  await writeFile(resolve(dir, "index.html"), html, "utf8");
  console.log("Pre-rendered /solutions/" + page.slug);
}
console.log("Pre-rendered " + pages.length + " SEO landing pages.");
