<script lang="ts">
  import { page } from "$app/state";
  import FiltroOrdenacao from "$components/Menu/FiltroOrdenacao.svelte";
  import Search from "$components/Search/index.svelte";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";

  const { data, children } = $props();

  let realtitlePage = $derived(
    data.collections.find((colletion) =>
      page.url.pathname.endsWith(colletion.handle),
    )?.title,
  );
  let titlePage = $derived(
    realtitlePage ? `Produtos - ${realtitlePage}` : "Produtos",
  );
</script>

<svelte:head>
  <title>{`${titlePage} - Big Uti`}</title>
  <link rel="canonical" href={page.url.href} />
  <meta property="og:url" content={page.url.href} />
  <meta name="twitter:creator" content={page.url.hostname} />
  <meta name="twitter:title" content={`${titlePage} - Big Uti`} />
  <meta property="og:image:alt" content={`${titlePage} - Big Uti`} />
  <meta property="og:image:width" content="200" />
  <meta property="og:image:height" content="150" />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
</svelte:head>

<section
  class="mx-auto mt-6 flex w-full max-w-screen-2xl flex-col items-start justify-between gap-3 px-4 md:flex-row md:gap-8"
>
  <div class="order-first mb-2 w-full md:order-0 md:hidden">
    <Search idSearch="produtos" />
  </div>
  <nav
    class="group relative top-4 w-full flex-none md:sticky md:order-2 md:max-w-31.25"
  >
    <div
      class="mb-2 inline-block w-full cursor-pointer rounded-lg border border-neutral-800 p-2 px-4 text-sm text-neutral-100 md:mb-2 md:border-transparent md:p-0 md:text-neutral-500"
    >
      <span class="md:hidden">
        {realtitlePage ? `Categoria - ${realtitlePage}` : "Categoria - Tudo"}
      </span>
      <span class="hidden md:block">Categorias</span>
      <span class="float-right m-auto h-5 w-4 md:hidden">
        <ChevronDown size="18" />
      </span>
    </div>
    <ul
      class="absolute left-0 z-40 hidden w-full space-y-2 rounded-md bg-neutral-950 p-4 text-neutral-100 group-hover:block md:relative md:block md:space-y-1 md:bg-neutral-900 md:p-0"
    >
      <li>
        <a
          href="/produtos"
          class="block text-neutral-100 underline-offset-4 hover:underline data-[active=true]:underline"
          data-active={!page.params.categorie}
        >
          Tudo
        </a>
      </li>
      {#each data.collections as categorie (categorie.handle)}
        <li>
          <a
            href={`/produtos/${categorie.handle}`}
            class="block text-neutral-100 underline-offset-4 hover:underline data-[active=true]:underline"
            data-active={categorie.handle === page.params.categorie}
          >
            {categorie.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="order-3 block w-full">
    {@render children()}
  </div>
  <FiltroOrdenacao />
</section>
