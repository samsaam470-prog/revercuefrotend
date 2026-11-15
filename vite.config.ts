import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_TARGET = "https://revercue-api.samsaam470.workers.dev";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    // The API does not send Access-Control-Allow-Origin, so the browser blocks
    // cross-origin calls. In dev the request is proxied through this server and
    // arrives same-origin. Production needs the API to allow the app origin.
    proxy: {
      "/api": { target: API_TARGET, changeOrigin: true, secure: true },
    },
  },
  build: { outDir: "dist", sourcemap: false },
});
