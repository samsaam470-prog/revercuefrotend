import { build } from "esbuild";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const entry = `
import { GUIDES } from "./src/lib/guides.ts";
import { COMPETITORS } from "./src/lib/competitors.ts";
import { FAQS } from "./src/lib/faqs.ts";
import { CRITERIA, PLATFORM_CRITERIA, RATING_LABEL } from "./src/lib/criteria.ts";
import { PLANS, PLAN_LABEL } from "./src/lib/constants.ts";
export const content = { GUIDES, COMPETITORS, FAQS, CRITERIA, PLATFORM_CRITERIA, RATING_LABEL, PLANS, PLAN_LABEL };
`;
const tmp = resolve(process.cwd(), ".content-export.entry.ts");
await writeFile(tmp, entry, "utf8");
const out = resolve(process.cwd(), ".content-export.mjs");
await build({ entryPoints: [tmp], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "silent", jsx: "automatic", external: ["react", "react-dom", "lucide-react", "react-router-dom"] });
const mod = await import(pathToFileURL(out).href);
const cache = resolve(process.cwd(), ".content-cache");
await mkdir(cache, { recursive: true });
await writeFile(resolve(cache, "content.json"), JSON.stringify(mod.content), "utf8");
console.log("exported content:", Object.fromEntries(Object.entries(mod.content).map(([k, v]) => [k, Array.isArray(v) ? v.length : typeof v])));
