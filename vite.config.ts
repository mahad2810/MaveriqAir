import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Only import Replit plugins if we're in a Replit environment
const isReplitEnv = process.env.REPL_ID !== undefined;
let runtimeErrorOverlay = () => ({});

export default defineConfig({
  plugins: [
    react(),
    ...(isReplitEnv ? [
      (await import("@replit/vite-plugin-runtime-error-modal").then(m => m.default))(),
      ...(process.env.NODE_ENV !== "production"
        ? [
            await import("@replit/vite-plugin-cartographer").then((m) =>
              m.cartographer(),
            ),
          ]
        : []),
    ] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
