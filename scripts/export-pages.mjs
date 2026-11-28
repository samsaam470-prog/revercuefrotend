import { build } from "esbuild";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// Bundle the seven pages that were client-only, then render each to HTML with
// the same components the app uses. The HTML is written to the build cache.
const entry = `
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { AboutPage } from "./src/pages/public/AboutPage.tsx";
import { ContactPage } from "./src/pages/public/ContactPage.tsx";
import { BetaPage } from "./src/pages/public/BetaPage.tsx";
import { PrivacyPage, TermsPage, SecurityPage } from "./src/pages/public/LegalPages.tsx";
import { SolutionsIndexPage } from "./src/pages/public/SolutionsIndexPage.tsx";
import { SitemapPage } from "./src/pages/public/SitemapPage.tsx";
import { AuthActionProvider } from "@authaction/web-sdk/react";
const pages = { about: AboutPage, contact: ContactPage, beta: BetaPage, privacy: PrivacyPage, terms: TermsPage, security: SecurityPage, solutions: SolutionsIndexPage, sitemap: SitemapPage };
export const rendered = {};
for (const [name, Component] of Object.entries(pages)) {
  rendered[name] = renderToStaticMarkup(React.createElement(AuthActionProvider, { domain: "static.invalid", clientId: "static", redirectUri: "https://revercue.co.uk/callback", audience: "static" }, React.createElement(MemoryRouter, { initialEntries: ["/"] }, React.createElement(Component))));
}
`;
const tmp = resolve(process.cwd(), ".pages-export.entry.tsx");
await writeFile(tmp, entry, "utf8");
const out = resolve(process.cwd(), ".pages-export.cjs");
await build({ entryPoints: [tmp], bundle: true, format: "cjs", platform: "node", outfile: out, logLevel: "silent", jsx: "automatic", loader: { ".json": "json" }, define: { "process.env.NODE_ENV": "\"production\"", "import.meta.env": "{}", ...Object.fromEntries(["DEV","VITE_API_BASE_URL","VITE_AUTHACTION_AUDIENCE","VITE_AUTHACTION_CALLBACK_PATH","VITE_AUTHACTION_CLIENT_ID","VITE_AUTHACTION_DOMAIN","VITE_GOOGLE_CLIENT_ID"].map((k) => ["import.meta.env." + k, "\"\""])) }, external: [] });
const mod = require(out);
const dir = resolve(process.cwd(), ".content-cache/pages");
await mkdir(dir, { recursive: true });
for (const [name, html] of Object.entries(mod.rendered)) {
  await writeFile(resolve(dir, name + ".html"), html, "utf8");
  console.log("rendered", name, html.length, "chars");
}
