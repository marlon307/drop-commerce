<script lang="ts">
  import { page } from "$app/state";
  import Card from "$components/Product/Card.svelte";
  import Carrousel from "$components/Carrousel/index.svelte";
  import BigCard from "$components/Product/BigCard.svelte";
  import Banner from "$components/Product/Banner.svelte";

  let { data } = $props();

  const bannerProducts = data.collection?.products.edges.slice(0, 4);
  const productsCarrousel = data.collection?.products.edges.slice(4);
</script>

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
</svelte:head>

<Banner infoProduct={bannerProducts![0].node} />

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
    <a href="/" class="group/category">
      <span
        class="relative mb-4 flex h-72 overflow-hidden rounded-md border border-neutral-800 bg-black group-hover/category:border-blue-800"
      >
        <img
          src={bannerProducts![2].node?.featuredImage?.url}
          class="mx-auto block aspect-square object-contain transition-transform group-hover/category:scale-105"
          alt={bannerProducts![2]?.node.title}
          height={bannerProducts![2]?.node.featuredImage?.height}
          width={bannerProducts![2].node?.featuredImage?.width}
          loading="lazy"
          decoding="async"
        />
      </span>
      <div class="px-3 text-neutral-200 *:block">
        <h3 class="text-lg font-bold tracking-tight">
          {bannerProducts![2].node?.title}
        </h3>
        <span>Compre Agora</span>
      </div>
    </a>
    <a href="/" class="group/category">
      <span
        class="relative mb-4 flex h-72 overflow-hidden rounded-md border border-neutral-800 bg-black group-hover/category:border-blue-800"
      >
        <img
          src={bannerProducts![1].node?.featuredImage?.url}
          class="mx-auto block aspect-square object-contain transition-transform group-hover/category:scale-105"
          alt={bannerProducts![1].node?.title}
          height={bannerProducts![1].node?.featuredImage?.height}
          width={bannerProducts![1].node?.featuredImage?.width}
          loading="lazy"
          decoding="async"
        />
      </span>
      <div class="px-3 text-neutral-200 *:block">
        <h3 class="text-lg font-bold tracking-tight">
          {bannerProducts![1]?.node.title}
        </h3>
        <span>Compre Agora</span>
      </div>
    </a>
  </div>
</section>
