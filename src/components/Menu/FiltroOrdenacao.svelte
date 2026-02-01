<script lang="ts">
  import { page } from "$app/state";
  import { sorting } from "$lib/constants";
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
    class="mb-2 block w-full cursor-pointer rounded-lg border border-neutral-800 p-2 px-4 text-sm text-neutral-100 md:mb-2 md:border-transparent md:p-0 md:text-neutral-500"
  >
    <span class="md:hidden">
      Ordenar - {paths.find((o) => o.slug === page.url.searchParams.get("o"))
        ?.title || "Relevância"}
    </span>
    <span class="hidden md:block">Ordenar</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.7"
      stroke="currentColor"
      aria-hidden="true"
      class="float-right m-auto h-5 w-4 md:hidden"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </div>
  <ul
    class="group-hover-mobile:block absolute left-0 z-40 hidden w-full space-y-2 rounded-md bg-neutral-950 p-4 text-neutral-100 group-hover:block md:relative md:block md:space-y-1 md:bg-neutral-900 md:p-0"
  >
    {#each paths as item (item.url)}
      <li>
        <a
          href={item.url}
          class="block text-neutral-100 underline-offset-4 hover:underline data-[active=true]:underline"
          data-active={item.slug ===
            (page.url.searchParams.get("o") || "relevancia")}
        >
          {item.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
