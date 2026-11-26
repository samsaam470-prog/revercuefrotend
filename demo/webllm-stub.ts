/**
 * The public demo never runs the in-browser helper: every AI action goes
 * through the existing Worker (NaraRouter). The product's block toolbar imports
 * the helper module, so the demo build aliases it to this stub to keep a 6 MB
 * local-model runtime out of the Space bundle. It is never called.
 */
export function isAvailable(): boolean {
  return false;
}
export function scheduleWarmup(): void {}
export function loadEngine(): Promise<null> {
  return Promise.resolve(null);
}
export async function rewrite(): Promise<string> {
  return "";
}
export async function organize(): Promise<Record<string, string>> {
  return {};
}
export async function visualize(): Promise<unknown[]> {
  return [];
}
export async function suggestMessage(): Promise<string> {
  return "";
}
export async function summarize(): Promise<string> {
  return "";
}
export function localRewrite(text: string): string {
  return text;
}
