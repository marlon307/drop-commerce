<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte";
  import { onMount } from "svelte";

  const storageKey = "theme";
  let theme = $state<"light" | "dark">("dark");

  const applyTheme = (nextTheme: "light" | "dark") => {
    theme = nextTheme;
    const root = document.documentElement;
    root.dataset.theme = nextTheme;
    console.log(root);

    root.classList.toggle("dark", nextTheme === "dark");
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // no-op
    }
  };

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  onMount(() => {
    const rootTheme = document.documentElement.dataset.theme;
    if (rootTheme === "light" || rootTheme === "dark") {
      theme = rootTheme;
      try {
        localStorage.setItem(storageKey, rootTheme);
      } catch {
        // no-op
      }
      return;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark") {
        applyTheme(stored);
        return;
      }
    } catch {
      // no-op
    }

    applyTheme("dark");
  });
</script>

<button
  type="button"
  class="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-slate-900 transition-colors hover:text-slate-900 dark:text-neutral-100 dark:hover:text-neutral-50"
  aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
  aria-pressed={theme === "dark"}
  onclick={toggleTheme}
>
  {#if theme === "dark"}
    <Sun size="18" />
  {:else}
    <Moon size="18" />
  {/if}
</button>
