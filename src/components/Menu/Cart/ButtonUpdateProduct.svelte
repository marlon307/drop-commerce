<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import DotLoading from "$components/DotLoading.svelte";
  import Minus from "@lucide/svelte/icons/minus";
  import Plus from "@lucide/svelte/icons/plus";

  let {
    quantity,
    lineId,
    variantId,
  }: { quantity: number; lineId: string; variantId: string } = $props();
  let loading = $state<string | null>(null);

  async function updatCarItem(type: string) {
    loading = type;

    const data = await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify({
        lineId,
        quantity: type === "increment" ? quantity + 1 : quantity - 1,
        variantId,
      }),
    });
    cartStoreData.set({
      ...(await data.json()),
      cartOpen: true,
    });
    loading = null;
  }
</script>

<div
  class="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700"
>
  <button
    aria-label="Reduzir quantidade do item"
    class="ease ml-auto flex max-w-9 min-w-9 flex-none cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
    onclick={() => updatCarItem("decrement")}
    disabled={!!loading}
  >
    {#if loading == "decrement"}
      <DotLoading />
    {:else}
      <span class="h-4 w-4 dark:text-neutral-500">
        <Minus size="14" />
      </span>
    {/if}
  </button>
  <p class="w-6 text-center">
    <span class="w-full text-sm">{quantity}</span>
  </p>
  <button
    aria-label="Adicionar quantidade do item"
    class="ease flex max-w-9 min-w-9 flex-none cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
    onclick={() => updatCarItem("increment")}
    disabled={!!loading}
  >
    {#if loading === "increment"}
      <DotLoading />
    {:else}
      <span class="h-4 w-4 dark:text-neutral-500">
        <Plus size="14" />
      </span>
    {/if}
  </button>
</div>
