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

  async function updateCartItem(type: "increment" | "decrement") {
    loading = type;
    const newQuantity = type === "increment" ? quantity + 1 : quantity - 1;
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineId,
          variantId,
          quantity: newQuantity,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        cartStoreData.set({ ...data, cartOpen: true });
      }
    } finally {
      loading = null;
    }
  }
</script>

<div
  class="ml-auto flex h-9 flex-row items-center rounded-full border border-slate-300 dark:border-neutral-700"
>
  <button
    type="button"
    aria-label="Reduzir quantidade do item"
    toolname="decrementCartItem"
    tooldescription="Reduzir a quantidade deste item no carrinho (ou remover se for 1)"
    class="ease ml-auto flex max-w-9 min-w-9 flex-none cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-slate-300 hover:opacity-80 dark:hover:border-neutral-800"
    onclick={() => updateCartItem("decrement")}
    disabled={!!loading}
  >
    {#if loading == "decrement"}
      <DotLoading />
    {:else}
      <span class="h-4 w-4 text-slate-500 dark:text-neutral-500">
        <Minus size="14" />
      </span>
    {/if}
  </button>
  <p class="w-6 text-center">
    <span class="w-full text-sm">{quantity}</span>
  </p>
  <button
    type="button"
    aria-label="Aumentar quantidade do item"
    toolname="incrementCartItem"
    tooldescription="Aumentar a quantidade deste item no carrinho"
    class="ease flex max-w-9 min-w-9 flex-none cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-slate-300 hover:opacity-80 dark:hover:border-neutral-800"
    onclick={() => updateCartItem("increment")}
    disabled={!!loading}
  >
    {#if loading === "increment"}
      <DotLoading />
    {:else}
      <span class="h-4 w-4 text-slate-500 dark:text-neutral-500">
        <Plus size="14" />
      </span>
    {/if}
  </button>
</div>
