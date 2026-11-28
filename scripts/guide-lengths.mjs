// Prints the published character count of each Scale guide.
//
// The count is the plain text a reader sees on the guide page: title, excerpt,
// then every section heading, paragraph and bullet, joined by a blank line.
// Run with: node --experimental-strip-types scripts/guide-lengths.mjs
import { SCALE_GUIDES } from "../src/content/scaleGuides.ts";

const LIMIT = { min: 5000, max: 7000 };

for (const guide of SCALE_GUIDES) {
  const parts = [guide.title, guide.excerpt];
  for (const section of guide.sections) {
    parts.push(section.heading, ...section.paragraphs, ...(section.bullets ?? []));
  }
  const text = parts.join("\n\n");
  const size = text.length;
  const ok = size >= LIMIT.min && size <= LIMIT.max ? "OK" : "OUT OF RANGE";
  console.log(`${guide.slug}\t${size}\t${ok}`);
}
