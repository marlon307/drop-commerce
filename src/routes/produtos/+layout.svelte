<script lang="ts">
  import { page } from "$app/stores";
  import { sorting } from "$lib/constants";

  export let data;

  $: titlePage = data.collections.find((colletion) =>
    $page.url.pathname.endsWith(colletion.handle),
  )?.title;

  $: paths = sorting.map((url) => {
    const params = new URLSearchParams($page.url.searchParams.toString());
    params.set("o", url.slug);
    return {
      ...url,
      url: `${$page.url.pathname}?${params.toString()}`,
    };
  });
</script>

<svelte:head>
  <title>{titlePage ? `Produtos - ${titlePage}` : "Produtos"}</title>
  <link rel="canonical" href={$page.url.href} />
  <meta property="og:url" content={$page.url.href} />
  <meta name="twitter:creator" content={$page.url.hostname} />
  <meta
    name="twitter:title"
    content={titlePage ? `Produtos - ${titlePage}` : "Produtos"}
  />
  <meta
    property="og:image:alt"
    content={titlePage ? `Produtos - ${titlePage}` : "Produtos"}
  />
  <meta property="og:image:width" content="200" />
  <meta property="og:image:height" content="150" />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
</svelte:head>

<section
  class="mt-6 flex w-full flex-col items-start justify-between gap-6 md:flex-row"
>
  <nav class="group relative order-first w-full flex-none md:max-w-[125px]">
    <span
      class="mb-2 inline-block w-full cursor-pointer rounded-lg border border-neutral-700 p-2 px-4 text-sm text-neutral-100 md:mb-2 md:border-transparent md:p-0 md:text-neutral-500"
    >
      Categorias
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
    </span>
    <ul
      class="absolute left-0 z-40 hidden w-full space-y-2 rounded-md bg-neutral-950 p-4 text-neutral-100 group-hover:block md:relative md:block md:space-y-1 md:bg-neutral-900 md:p-0"
    >
      <li>
        <a
          href="/produtos"
          class="block text-neutral-100 underline-offset-4 hover:underline data-[active=true]:underline"
          data-active={!$page.params.categorie}
        >
          Tudo
        </a>
      </li>
      {#each data.collections as categorie (categorie.handle)}
        <li>
          <a
            href={`/produtos/${categorie.handle}`}
            class="block text-neutral-100 underline-offset-4 hover:underline data-[active=true]:underline"
            data-active={categorie.handle === $page.params.categorie}
          >
            {categorie.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <slot />
  <nav class="group relative w-full flex-none md:max-w-[125px]">
    <span
      class="mb-2 block w-full cursor-pointer rounded-lg border border-neutral-700 p-2 px-4 text-sm text-neutral-100 md:mb-2 md:border-transparent md:p-0 md:text-neutral-500"
    >
      Ordenar por
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
    </span>
    <ul
      class="absolute left-0 z-40 hidden w-full space-y-2 rounded-md bg-neutral-950 p-4 text-neutral-100 group-hover:block md:relative md:block md:space-y-1 md:bg-neutral-900 md:p-0"
    >
      {#each paths as item (item.url)}
        <li>
          <a
            href={item.url}
            class="block text-neutral-100 underline-offset-4 hover:underline data-[active=true]:underline"
            data-active={item.slug ===
              ($page.url.searchParams.get("o") || "relevancia")}
          >
            {item.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</section>
