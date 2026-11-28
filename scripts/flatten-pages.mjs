import { readdir, rename, stat, rm } from "node:fs/promises";
import { resolve, join } from "node:path";

// Turn dist/<dir>/index.html into dist/<dir>.html so each page is served at its bare
// URL without a redirect. The root index.html is left as the app shell.
const dist = resolve(process.cwd(), "dist");
let moved = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const sub = join(dir, entry.name);
    await walk(sub);
    const index = join(sub, "index.html");
    const target = sub + ".html";
    try {
      await stat(index);
    } catch {
      continue;
    }
    await rename(index, target);
    moved++;
    try {
      const remaining = await readdir(sub);
      if (remaining.length === 0) await rm(sub, { recursive: true });
    } catch {}
  }
}
await walk(dist);
console.log("Flattened " + moved + " directory pages into single files.");
