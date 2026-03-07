<script lang="ts">
  import Card from "$components/Product/Card.svelte";
  import type { ProductRecommendationsQuery } from "../../../@types/storefront.generated";

  let { data } = $props();

  const products = $derived(
    (data.products ?? []) as unknown as NonNullable<
      ProductRecommendationsQuery["productRecommendations"]
    >,
  );
</script>

<section class="rounded-lg bg-white p-6 dark:bg-neutral-950">
  <h1 class="mb-2 text-2xl font-semibold text-slate-900 dark:text-neutral-100">
    Favoritos
  </h1>
  <p class="mb-6 text-slate-600 dark:text-neutral-400">
    Produtos que você salvou para acompanhar.
  </p>

  {#if !products.length}
    <div
      class="rounded-lg border border-dashed border-slate-300 bg-slate-100 p-6 text-slate-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
    >
      Você ainda não adicionou produtos aos favoritos.
    </div>
  {:else}
    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each products as product (product.handle)}
        <li class="aspect-square">
          <Card productProps={product} />
        </li>
      {/each}
    </ul>
  {/if}
</section>
