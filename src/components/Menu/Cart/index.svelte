<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import Sidebar from "./Sidebar.svelte";

  let promisse = cartStoreData.getDataCart();
</script>

<button
  class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-700 text-neutral-50 transition-colors"
  aria-label="Carrinho"
  on:click={() => ($cartStoreData.cartOpen = !$cartStoreData.cartOpen)}
>
  {#await promisse then}
    {#if $cartStoreData.totalQuantity}
      <span
        class="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-500 text-[11px] font-medium text-blue-50"
      >
        {$cartStoreData.totalQuantity}
      </span>
    {/if}
  {/await}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    aria-hidden="true"
    class="h-4 transition-all ease-in-out hover:scale-110"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
</button>
{#await promisse then}
  <Sidebar bind:showModal={$cartStoreData.cartOpen} items={$cartStoreData} />
{/await}
