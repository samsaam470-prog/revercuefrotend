import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

/**
 * The public proposal generator that ships to Hugging Face Spaces.
 * It reuses the product's components and styles, but builds to its own folder
 * and is served as static files (no server runtime in the Space).
 */
export default defineConfig({
  root: "demo",
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      // The demo uses the Worker for AI; keep the local model out of the bundle.
      "@mlc-ai/web-llm": fileURLToPath(new URL("./demo/webllm-stub.ts", import.meta.url)),
    },
  },
  envDir: "..",
  server: {
    host: "0.0.0.0",
    port: 3100,
    allowedHosts: process.env.PREVIEW_ALLOWED_HOST ? [process.env.PREVIEW_ALLOWED_HOST] : undefined,
  },
  build: {
    outDir: "../demo-dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
