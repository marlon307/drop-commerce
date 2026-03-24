<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
  import Sidebar from "./Sidebar.svelte";

  let promise = cartStoreData.getDataCart();
</script>

<button
  class="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 text-slate-900 transition-colors dark:border-neutral-700 dark:text-neutral-50"
  aria-label="Carrinho"
  onclick={() => ($cartStoreData.cartOpen = !$cartStoreData.cartOpen)}
>
  {#await promise}
    <span
      class="absolute top-0 right-0 -mt-1 -mr-1 size-2 animate-ping rounded-xs bg-blue-500"
    >
    </span>
  {:then}
    {#if $cartStoreData.totalQuantity}
      <span
        class="absolute top-0 right-0 -mt-2 -mr-2 size-4 rounded bg-blue-500 text-[11px] font-medium text-blue-50"
      >
        {$cartStoreData.totalQuantity}
      </span>
    {/if}
  {/await}

  <span class="h-4 transition-all ease-in-out hover:scale-110">
    <ShoppingCart size="18" />
  </span>
</button>
{#await promise then}
  <Sidebar bind:showModal={$cartStoreData.cartOpen} items={$cartStoreData} />
{/await}
