<script lang="ts">
  import { getRecommendations } from "../routes/produto/[handle]/data.remote";
  import Card from "./Product/Card.svelte";
  const { productId } = $props<{ productId: string }>();
</script>

<div class="mx-auto max-w-screen-2xl pb-8">
  <h2 class="px-4 pb-4 text-2xl font-bold text-neutral-100">
    Produtos relacionado
  </h2>
  <ul class="mx-4 flex gap-4 overflow-x-auto">
    {#await getRecommendations(productId)}
      <li
        class="aspect-square max-h-80 w-full flex-none animate-pulse rounded-md border border-neutral-800 bg-black"
      ></li>
    {:then data}
      {#each data.recommendations || [] as recommendation (recommendation.handle)}
        <li class="aspect-square w-full max-w-xs flex-none">
          <Card productProps={recommendation} />
        </li>
      {/each}
    {/await}
  </ul>
</div>
