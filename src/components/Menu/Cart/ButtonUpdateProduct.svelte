<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import DotLoading from "$components/DotLoading.svelte";

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
    class="ease ml-auto flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
    onclick={() => updatCarItem("decrement")}
    disabled={!!loading}
  >
    {#if loading == "decrement"}
      <DotLoading />
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
        class="h-4 w-4 dark:text-neutral-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
      </svg>
    {/if}
  </button>
  <p class="w-6 text-center">
    <span class="w-full text-sm">{quantity}</span>
  </p>
  <button
    aria-label="Adicionar quantidade do item"
    class="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
    onclick={() => updatCarItem("increment")}
    disabled={!!loading}
  >
    {#if loading === "increment"}
      <DotLoading />
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
        class="h-4 w-4 dark:text-neutral-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    {/if}
  </button>
</div>
