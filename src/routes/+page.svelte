<script lang="ts">
  import { page } from "$app/stores";
  import Card from "$components/Product/Card.svelte";
  import Carrousel from "$components/Carrousel/index.svelte";
  import BigCard from "$components/Product/BigCard.svelte";

  export let data;

  const bannerProducts = data.products.slice(0, 3);
  const productsCarrousel = data.products.slice(3);
</script>

<svelte:head>
  <title>Big Uti - A loja das grandes utilidades.</title>
  <meta name="description" content={data.description} />
  <meta
    property="og:title"
    content="Big Uti - A loja das grandes utilidades."
  />
  <meta name="og:description" content={data.description} />
  <meta property="og:image" content={data.image?.transformedSrc} />
  <meta property="og:image:width" content="200" />
  <meta property="og:image:height" content="150" />
  <meta name="twitter:image" content={data.image?.transformedSrc} />
  <meta
    name="twitter:title"
    content="Big Uti - A loja das grandes utilidades."
  />
  <meta name="twitter:description" content={data.description} />
  <meta name="twitter:creator" content={$page.url.hostname} />
  <link rel="canonical" href={$page.url.href} />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
</svelte:head>

<section
  class="mx-auto mb-8 grid max-w-screen-2xl gap-4 px-4 md:mb-16 md:grid-cols-6 md:grid-rows-2"
>
  {#if bannerProducts.length}
    <div class="row-span-2 h-full w-full md:col-span-4">
      <BigCard productProps={bannerProducts[0]} />
    </div>
    <div class="w-full md:col-span-2 md:row-span-1">
      <Card productProps={bannerProducts[1]} />
    </div>
    <div class="w-full md:col-span-2 md:row-span-1">
      <Card productProps={bannerProducts[2]} />
    </div>
  {/if}
</section>
<Carrousel arrayContent={productsCarrousel} />
