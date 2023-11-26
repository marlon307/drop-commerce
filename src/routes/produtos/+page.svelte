<script lang="ts">
  import Card from "$components/Product/Card.svelte";
  export let data;
</script>

<svelte:head>
  <meta name="description" content="Pagina de produtos" />
  <meta name="twitter:title" content="Pagina de produtos" />
  <meta name="twitter:description" content="Lista de produtos loja" />
  <meta name="og:description" content="Lista de produtos loja" />
  <meta
    name="twitter:image"
    content="https://commerce-drop.vercel.app/_app/immutable/assets/svelte-logo.87df40b8.svg"
  />
</svelte:head>

<div class="order-last min-h-screen w-full md:order-none">
  <ul
    class="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each data.products as product (product.handle)}
      <li class="aspect-square w-full">
        <Card productProps={product} />
      </li>
    {/each}
  </ul>
</div>
