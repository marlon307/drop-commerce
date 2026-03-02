<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import DotLoading from "$components/DotLoading.svelte";
  import X from "@lucide/svelte/icons/x";

  let { lineId }: { lineId: string } = $props();
  let disabled = $state(false);

  async function onclick() {
    disabled = true;
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId }),
      });
      const data = await res.json();
      if (res.ok) {
        cartStoreData.set({ ...data, cartOpen: true });
      }
    } finally {
      disabled = false;
    }
  }
</script>

<button
  type="button"
  aria-label="Remover item do carrinho"
  toolname="removeCartItem"
  tooldescription="Remover este item do carrinho de compras"
  class="absolute z-20 -mt-2 ml-17 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-slate-400 text-slate-900 dark:border-neutral-900 dark:bg-neutral-500 dark:text-neutral-900"
  {onclick}
  {disabled}
>
  {#if disabled}
    <DotLoading />
  {:else}
    <X size="12" />
  {/if}
</button>
