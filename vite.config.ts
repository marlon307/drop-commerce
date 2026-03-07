import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      includePublic: true,
      cache: true,
      cacheLocation: ".cache/vite-image-optimizer",
    }),
    tailwindcss(),
    sveltekit(),
  ],
  server: {
    fs: {
      // Permite servir arquivos do diretório raiz do workspace
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
