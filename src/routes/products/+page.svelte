<script lang="ts">
  import Card from "../../components/Product/Card.svelte";
  export let data;
  console.log(data);
</script>

<div class="order-last min-h-screen w-full md:order-none">
  <ul
    class="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each data.products as product}
      <li class="aspect-square w-full">
        <Card productProps={product} />
      </li>
    {/each}
  </ul>
</div>
