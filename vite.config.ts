import adapter from "@sveltejs/adapter-vercel";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
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
    sveltekit({
      // Consult https://kit.svelte.dev/docs/integrations#preprocessors
      // for more information about preprocessors
      preprocess: vitePreprocess(),
      compilerOptions: { experimental: { async: true } },
      // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
      // If your environment is not supported or you settled on a specific environment, switch out the adapter.
      // See https://kit.svelte.dev/docs/adapters for more information about adapters.
      adapter: adapter({ runtime: "nodejs24.x" }),
      experimental: { remoteFunctions: true },
    }),
  ],
  server: {
    fs: {
      // Permite servir arquivos do diretório raiz do workspace
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
