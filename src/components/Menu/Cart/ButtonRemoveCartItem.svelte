<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import DotLoading from "$components/DotLoading.svelte";
  import X from "@lucide/svelte/icons/x";

  let { lineId }: { lineId: string } = $props();
  let disabled = $state(false);

  async function onclick() {
    disabled = true;
    const data = await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ lineId }),
    });
    cartStoreData.set({
      ...(await data.json()),
      cartOpen: true,
    });
    disabled = false;
  }
</script>

<button
  type="button"
  aria-label="Remover Item"
  class="absolute z-20 -mt-2 ml-17 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-neutral-900 bg-neutral-500 text-neutral-900"
  {onclick}
  {disabled}
>
  {#if disabled}
    <DotLoading />
  {:else}
    <X size="12" />
  {/if}
</button>
