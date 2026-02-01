<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
  import Sidebar from "./Sidebar.svelte";

  let promisse = cartStoreData.getDataCart();
</script>

<button
  class="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-neutral-700 text-neutral-50 transition-colors"
  aria-label="Carrinho"
  onclick={() => ($cartStoreData.cartOpen = !$cartStoreData.cartOpen)}
>
  {#await promisse then}
    {#if $cartStoreData.totalQuantity}
      <span
        class="absolute top-0 right-0 -mt-2 -mr-2 h-4 w-4 rounded bg-blue-500 text-[11px] font-medium text-blue-50"
      >
        {$cartStoreData.totalQuantity}
      </span>
    {/if}
  {/await}
  <span class="h-4 transition-all ease-in-out hover:scale-110">
    <ShoppingCart size="18" />
  </span>
</button>
{#await promisse then}
  <Sidebar bind:showModal={$cartStoreData.cartOpen} items={$cartStoreData} />
{/await}
