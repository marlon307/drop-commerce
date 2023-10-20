<script lang="ts">
  import Card from "../../../components/Product/Card.svelte";
  export let data;
</script>

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
