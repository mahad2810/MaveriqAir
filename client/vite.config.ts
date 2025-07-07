import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isReplitEnv = process.env.REPL_ID !== undefined;

export default defineConfig(async () => {
  const plugins = [react()];

  if (isReplitEnv) {
    const runtimeErrorModal = (await import("@replit/vite-plugin-runtime-error-modal")).default;
    plugins.push(runtimeErrorModal());

    if (process.env.NODE_ENV !== "production") {
      const { cartographer } = await import("@replit/vite-plugin-cartographer");
      plugins.push(cartographer());
    }
  }

  return {
    plugins,
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "client/dist"),
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
