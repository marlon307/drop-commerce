<script lang="ts">
  import Card from "$components/Product/Card.svelte";
  let { data } = $props();
</script>

<svelte:head>
  <meta name="description" content={data.description} />
  <meta name="og:description" content={data.description} />
  <meta property="og:image" content={data.image?.transformedSrc} />
  <meta name="twitter:description" content={data.description} />
  <meta name="twitter:image" content={data.image?.transformedSrc} />
</svelte:head>

<div class="order-last min-h-screen w-full md:order-none">
  <ul
    class="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each data.products || [] as product, index (product.handle)}
      <li class="aspect-square w-full">
        <Card
          productProps={product}
          loading={index < 3 ? "eager" : "lazy"}
          decoding={index < 3 ? "sync" : "async"}
          fetchpriority={index < 3 ? "high" : "auto"}
        />
      </li>
    {/each}
  </ul>
</div>
