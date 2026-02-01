import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    fs: {
      // Permite servir arquivos do diretório raiz do workspace
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
