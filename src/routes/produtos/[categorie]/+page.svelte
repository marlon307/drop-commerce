<script lang="ts">
  import Card from "$components/Product/Card.svelte";
  let { data } = $props();
</script>

<svelte:head>
  <meta name="description" content={data.collection?.description} />
  <meta name="og:description" content={data.collection?.description} />
  <meta property="og:image" content={data.collection?.image?.url} />
  <meta name="twitter:description" content={data.collection?.description} />
  <meta name="twitter:image" content={data.collection?.image?.url} />
</svelte:head>

<div class="order-last min-h-screen w-full md:order-none">
  <ul
    class="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each data.collection?.products.edges || [] as product, index (product.node.handle)}
      <li class="aspect-square w-full">
        <Card
          productProps={product.node}
          loading={index < 3 ? "eager" : "lazy"}
          decoding={index < 3 ? "sync" : "async"}
          fetchpriority={index < 3 ? "high" : "auto"}
        />
      </li>
    {/each}
  </ul>
</div>
