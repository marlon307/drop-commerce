<script lang="ts">
  import Card from "$components/Product/Card.svelte";
  let { data } = $props();
</script>

<svelte:head>
  <meta name="description" content="Pagina de produtos" />
  <meta name="twitter:title" content="Pagina de produtos" />
  <meta name="twitter:description" content="Lista de produtos loja" />
  <meta name="og:description" content="Lista de produtos loja" />
  <meta
    property="og:image"
    content="https://commerce-drop.vercel.app/_app/immutable/assets/svelte-logo.87df40b8.svg"
  />
  <meta
    name="twitter:image"
    content="https://commerce-drop.vercel.app/_app/immutable/assets/svelte-logo.87df40b8.svg"
  />
</svelte:head>

<ul class="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each data.products as product, index (product.node.handle)}
    <li class="aspect-square w-full">
      <Card
        productProps={product.node}
        loading={index < 3 ? "eager" : "lazy"}
        decoding={index < 3 ? "sync" : "async"}
        fetchpriority={index < 3 ? "high" : "auto"}
      />
    </li>
  {/each}
  {#if !data.products.length}
    <li class="col-span-3 text-center text-xl font-medium text-neutral-400">
      Ops! Nenhum produto encontrado.
    </li>
  {/if}
</ul>
