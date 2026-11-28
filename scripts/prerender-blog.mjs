import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

// Crawlers get the blog index and every article as HTML in the initial response.
// React still mounts on top of this markup, so the client experience is unchanged.

const root = process.cwd();
const dist = resolve(root, "dist");
const tmp = resolve(root, ".prerender-blog");
const origin = "https://revercue.co.uk";
const shell = await readFile(resolve(dist, "index.html"), "utf8");

const esc = (value) =>
  String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const formatDate = (iso) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(iso);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

function setMeta(html, attr, key, value) {
  const re = new RegExp("<meta[^>]*" + attr + "=[\"']" + key + "[\"'][^>]*>", "i");
  const tag = "<meta " + attr + "=\"" + key + "\" content=\"" + esc(value) + "\" />";
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", tag + "</head>");
}

function withMeta(html, { title, description, url, type }) {
  let out = html.replace(/<title>[^<]*<\/title>/i, "<title>" + esc(title) + "</title>");
  out = setMeta(out, "name", "description", description);
  out = setMeta(out, "property", "og:type", type);
  out = setMeta(out, "property", "og:title", title);
  out = setMeta(out, "property", "og:description", description);
  out = setMeta(out, "property", "og:url", url);
  out = setMeta(out, "name", "twitter:title", title);
  out = setMeta(out, "name", "twitter:description", description);
  const canonical = "<link rel=\"canonical\" href=\"" + url + "\" />";
  out = /<link[^>]+rel=["']canonical["']/i.test(out)
    ? out.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, canonical)
    : out.replace("</head>", canonical + "</head>");
  return out;
}

// One schema node per page, tagged with its URL. The client SEO layer reuses
// this node instead of appending a second copy after hydration.
function withSchema(html, schema, url) {
  return html.replace(
    "</head>",
    "<script type=\"application/ld+json\" id=\"revercue-route-schema\" data-route-url=\"" +
      esc(url) +
      "\">" +
      JSON.stringify(schema).replace(/</g, "\\u003c") +
      "</script></head>",
  );
}

function withBody(html, body) {
  return html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + body + "</div>");
}

function articleBody(post) {
  const sections = post.body
    .map((section) => {
      const heading = section.heading ? "<h2>" + esc(section.heading) + "</h2>" : "";
      const paragraphs = section.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("");
      return "<section>" + heading + paragraphs + "</section>";
    })
    .join("");
  const links = (post.links ?? [])
    .map((link) => "<li><a href=\"" + esc(link.to) + "\">" + esc(link.label) + "</a></li>")
    .join("");
  return (
    "<main style=\"max-width:760px;margin:0 auto;padding:48px 24px;font-family:Inter,Arial,sans-serif;line-height:1.7\">" +
    "<nav aria-label=\"Breadcrumb\"><a href=\"/\">Revercue</a> / <a href=\"/blog/\">Blog</a> / " +
    esc(post.title) +
    "</nav>" +
    "<article><header><h1>" +
    esc(post.title) +
    "</h1><p><time datetime=\"" +
    esc(post.date) +
    "\">" +
    esc(formatDate(post.date)) +
    "</time> · " +
    esc(post.readMinutes) +
    " min read</p><p>" +
    esc(post.excerpt) +
    "</p></header>" +
    sections +
    (links ? "<section><h2>Related on Revercue</h2><ul>" + links + "</ul></section>" : "") +
    "<p><a href=\"/blog/\">All posts</a></p></article></main>"
  );
}

function faqsFor(post) {
  const section = post.body.find((item) => /frequently asked questions/i.test(item.heading ?? ""));
  if (!section) return [];
  const faqs = [];
  for (const paragraph of section.paragraphs) {
    // FAQ entries are written as one paragraph: "Question? Answer."
    const split = paragraph.indexOf("? ");
    if (split === -1) continue;
    const question = paragraph.slice(0, split + 1).trim();
    const answer = paragraph.slice(split + 2).trim();
    if (question.length > 8 && answer.length > 0) faqs.push({ question, answer });
  }
  return faqs;
}

try {
  // Bundle the post data with Vite's own esbuild, so Node can import it without
  // changing the source imports to .js specifiers.
  await build({
    entryPoints: [resolve(root, "src/lib/blog.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: resolve(tmp, "blog.mjs"),
    logLevel: "silent",
  });

  const { BLOG_POSTS } = await import(pathToFileURL(resolve(tmp, "blog.mjs")).href + "?t=" + Date.now());
  if (!Array.isArray(BLOG_POSTS) || BLOG_POSTS.length === 0) {
    throw new Error("BLOG_POSTS was empty; refusing to write empty blog pages.");
  }

  // Canonical form matches what the host serves: directory indexes answer at the
  // trailing slash and redirect the bare path, so the bare path cannot be canonical.
  const indexUrl = origin + "/blog";
  const indexTitle = "Freelance business blog — Revercue";
  const indexDescription =
    "Practical essays on proposals, contracts, scope and getting paid, for freelancers who would rather do the work than chase it.";

  const list = BLOG_POSTS.map(
    (post) =>
      "<article><h2><a href=\"/blog/" +
      esc(post.slug) +
      "/\">" +
      esc(post.title) +
      "</a></h2><p>" +
      esc(post.excerpt) +
      "</p><p><time datetime=\"" +
      esc(post.date) +
      "\">" +
      esc(formatDate(post.date)) +
      "</time> · " +
      esc(post.readMinutes) +
      " min read</p></article>",
  ).join("");

  const indexBody =
    "<main style=\"max-width:960px;margin:0 auto;padding:48px 24px;font-family:Inter,Arial,sans-serif;line-height:1.65\">" +
    "<nav aria-label=\"Breadcrumb\"><a href=\"/\">Revercue</a> / Blog</nav>" +
    "<header><p>Blog</p><h1>Notes on the thread.</h1>" +
    "<p>" +
    esc(indexDescription) +
    "</p></header>" +
    list +
    "<p><a href=\"/pricing\">Plans and pricing</a> | <a href=\"/features\">Features</a></p></main>";

  const indexSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": indexUrl + "#blog",
        name: indexTitle,
        description: indexDescription,
        url: indexUrl,
        isPartOf: { "@type": "WebSite", name: "Revercue", url: origin + "/" },
      },
      {
        "@type": "ItemList",
        itemListElement: BLOG_POSTS.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: origin + "/blog/" + post.slug,
          name: post.title,
        })),
      },
    ],
  };

  let indexHtml = withMeta(shell, {
    title: indexTitle,
    description: indexDescription,
    url: indexUrl,
    type: "website",
  });
  indexHtml = withSchema(indexHtml, indexSchema, indexUrl);
  indexHtml = withBody(indexHtml, indexBody);
  await mkdir(resolve(dist, "blog"), { recursive: true });
  await writeFile(resolve(dist, "blog.html"), indexHtml, "utf8");
  console.log("Pre-rendered /blog");

  for (const post of BLOG_POSTS) {
    const url = origin + "/blog/" + post.slug;
    const faqs = faqsFor(post);
    const graph = [
      {
        "@type": "BlogPosting",
        "@id": url + "#article",
        headline: post.title,
        description: post.excerpt,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Organization", name: "Revercue", url: origin + "/" },
        publisher: { "@type": "Organization", name: "Revercue", url: origin + "/" },
        isPartOf: { "@id": indexUrl + "#blog" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Revercue", item: origin + "/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: indexUrl },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ];
    if (faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      });
    }

    let html = withMeta(shell, {
      title: post.title + " | Revercue",
      description: post.excerpt,
      url,
      type: "article",
    });
    html = setMeta(html, "property", "article:published_time", post.date);
    html = withSchema(html, { "@context": "https://schema.org", "@graph": graph }, url);
    html = withBody(html, articleBody(post));
    const dir = resolve(dist, "blog", post.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.html"), html, "utf8");
  }
  console.log("Pre-rendered " + BLOG_POSTS.length + " blog articles.");
} finally {
  await rm(tmp, { recursive: true, force: true });
}
