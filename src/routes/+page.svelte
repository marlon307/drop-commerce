<script lang="ts">
  import { page } from "$app/state";
  import { buildSrcSet } from "$lib/image";
  import Card from "$components/Product/Card.svelte";
  import Carrousel from "$components/Carrousel/index.svelte";
  import BigCard from "$components/Product/BigCard.svelte";
  import Banner from "$components/Product/Banner.svelte";

  let { data } = $props();

  type PromoProduct = {
    title: string;
    featuredImage?: {
      lg?: string | null;
      xl?: string | null;
      width?: number | null;
      height?: number | null;
    } | null;
  };

  const bannerProducts = $derived(data.collection?.products.edges.slice(0, 4));
  const productsCarrousel = $derived(data.collection?.products.edges.slice(4));
</script>

{#snippet categoryPromo(product: PromoProduct)}
  <a href="/" class="group/category">
    <span
      class="relative mb-4 flex h-72 overflow-hidden rounded-md border border-slate-300 bg-white dark:border-neutral-800 dark:bg-black"
    >
      <img
        src={product.featuredImage?.lg}
        srcset={buildSrcSet([
          [product.featuredImage?.lg, 318],
          [product.featuredImage?.xl, 955],
        ])}
        sizes="(max-width: 1024px) 92vw, 45vw"
        class="mx-auto block aspect-square object-contain transition-transform group-hover/category:scale-105"
        alt={product.title}
        height={product.featuredImage?.height}
        width={product.featuredImage?.width}
        loading="lazy"
        decoding="async"
      />
    </span>
    <div class="px-3 text-slate-800 *:block dark:text-neutral-200">
      <h3 class="text-lg font-bold tracking-tight">
        {product.title}
      </h3>
      <span>Compre Agora</span>
    </div>
  </a>
{/snippet}

<svelte:head>
  <title>Big Uti - A loja das grandes utilidades.</title>
  <meta name="description" content={data.collection?.description} />
  <meta
    property="og:title"
    content="Big Uti - A loja das grandes utilidades."
  />
  <meta name="og:description" content={data.collection?.description} />
  <meta property="og:image" content={data.collection?.image?.url} />
  <meta property="og:image:width" content="200" />
  <meta property="og:image:height" content="150" />
  <meta name="twitter:image" content={data.collection?.image?.url} />
  <meta
    name="twitter:title"
    content="Big Uti - A loja das grandes utilidades."
  />
  <meta name="twitter:description" content={data.collection?.description} />
  <meta name="twitter:creator" content={page.url.hostname} />
  <link rel="canonical" href={page.url.href} />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
  <meta property="og:site_name" content="Big Uti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:url" content={page.url.href} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={page.url.hostname} />
  <meta name="twitter:creator" content={page.url.hostname} />
  <meta name="twitter:domain" content={page.url.hostname} />
  <meta name="twitter:url" content={page.url.href} />
  <meta name="twitter:title" content="Big Uti" />
</svelte:head>

{#if bannerProducts?.[0]?.node}
  <Banner infoProduct={bannerProducts[0].node} />
{/if}

<section
  class="mx-auto mb-4 grid max-w-screen-2xl gap-4 px-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]"
>
  {#if bannerProducts?.length}
    <div class="row-span-2 h-full w-full md:col-span-4">
      <BigCard productProps={bannerProducts[1].node} loading="eager" />
    </div>
    <div class="w-full md:col-span-2 md:row-span-1">
      <Card productProps={bannerProducts[2].node} loading="eager" />
    </div>
    <div class="w-full md:col-span-2 md:row-span-1">
      <Card productProps={bannerProducts[3].node} />
    </div>
  {/if}
</section>

<Carrousel arrayContent={productsCarrousel} />

<section class="mx-auto mb-16 block max-w-screen-2xl px-4">
  <div class="grid gap-4 lg:grid-cols-2">
    {#if bannerProducts?.[2]?.node}
      {@render categoryPromo(bannerProducts[2].node)}
    {/if}
    {#if bannerProducts?.[1]?.node}
      {@render categoryPromo(bannerProducts[1].node)}
    {/if}
  </div>
</section>
