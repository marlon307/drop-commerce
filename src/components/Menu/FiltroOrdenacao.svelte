<script lang="ts">
  import { page } from "$app/state";
  import { sorting } from "$lib/constants";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  let paths = $derived(
    sorting.map((url) => {
      const params = new SvelteURLSearchParams(
        page.url.searchParams.toString(),
      );
      params.set("o", url.slug);
      return {
        ...url,
        url: `${page.url.pathname}?${params.toString()}`,
      };
    }),
  );
</script>

<nav
  class="group relative top-4 w-full flex-none md:sticky md:order-4 md:max-w-31.25"
>
  <div
    class="mb-2 block w-full cursor-pointer rounded-lg border border-slate-200 p-2 px-4 text-sm text-slate-900 md:mb-2 md:border-transparent md:p-0 md:text-slate-500 dark:border-neutral-800 dark:text-neutral-100 dark:md:text-neutral-500"
  >
    <span class="md:hidden">
      Ordenar - {paths.find((o) => o.slug === page.url.searchParams.get("o"))
        ?.title || "Relevância"}
    </span>
    <span class="hidden md:block">Ordenar</span>
    <span class="float-right m-auto h-5 w-4 md:hidden">
      <ChevronDown size="18" />
    </span>
  </div>
  <ul
    class="group-hover-mobile:block absolute left-0 z-40 hidden w-full space-y-2 rounded-md bg-white p-4 text-slate-900 group-hover:block md:relative md:block md:space-y-1 md:bg-slate-50 md:p-0 dark:bg-neutral-950 dark:text-neutral-100 dark:md:bg-neutral-900"
  >
    {#each paths as item (item.url)}
      <li>
        <a
          href={item.url}
          class="block text-slate-900 underline-offset-4 hover:underline data-[active=true]:underline dark:text-neutral-100"
          data-active={item.slug ===
            (page.url.searchParams.get("o") || "relevancia")}
        >
          {item.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
