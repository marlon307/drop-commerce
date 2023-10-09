<script lang="ts">
  import { fly, fade } from "svelte/transition";
  export let show = false;
  export let items: ICart;
</script>

{#if show}
  <div
    class="inset-0 fixed bg-black/30 backdrop-blur-sm z-50"
    transition:fade={{ duration: 100 }}
    aria-hidden="true"
  />
  <section
    class="fixed w-full bg-neutral-950 border-l border-neutral-700 h-full top-0 right-0 max-w-md p-6 z-50 flex flex-col"
    transition:fly={{ x: 448, opacity: 1 }}
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-neutral-100 text-xl font-semibold">Carrinho</h1>
      <button
        class="p-2 rounded-lg border border-neutral-700"
        on:click={() => (show = !show)}
        data-close
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="text-white w-6 h-6 transition-all ease-in-out hover:scale-110"
          ><path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    {#if items.lines}
      <ul class="flex-1 block overflow-auto">
        <li class="flex gap-4 border-b border-neutral-700 py-6">
          {#each items.lines as product}
            <a
              href={`/product/${product.merchandise.product.handle}`}
              class="flex gap-4 justify-between"
              on:click={() => (show = !show)}
            >
              <figure
                class="w-20 h-20 rounded-lg border border-neutral-700 hover:bg-neutral-800 bg-neutral-900 overflow-hidden"
              >
                <img
                  src={product.merchandise.image.transformedSrc}
                  alt={product.merchandise.product.title}
                  loading="lazy"
                  class="object-fill h-full w-full"
                  width="80"
                  height="80"
                />
              </figure>
              <div class="flex-1 flex flex-col justify-between">
                <span class="text-neutral-100 text-xl text-left line-clamp-2">
                  {product.merchandise.product.title}
                </span>
                <div class="flex">
                  {#each product.merchandise.selectedOptions as variation}
                    <span
                      class="text-neutral-400 font-light"
                      title={`${variation.name} - ${variation.value}`}
                      >{variation.value}</span
                    >
                  {/each}
                </div>
              </div>
            </a>
            <div class="text-neutral-100 flex flex-col gap-5 items-start">
              <span>
                {Number(product.merchandise.price.amount).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </span>
              <div
                class="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700"
              >
                <button
                  aria-label="Reduzir quantidade do item"
                  class="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ml-auto"
                  ><svg
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
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
                <p class="w-6 text-center">
                  <span class="w-full text-sm">{product.quantity}</span>
                </p>
                <button
                  aria-label="Adicionar quantidade do item"
                  class="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="h-4 w-4 dark:text-neutral-500"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          {/each}
        </li>
      </ul>
      <div class="w-full py-4">
        <div
          class="py-2 border-b border-neutral-700 flex justify-between items-center mb-3"
        >
          <span class="text-neutral-400">Taxas</span>
          <span class="text-neutral-100 text-xl">
            {Number(items.cost.totalTaxAmount.amount).toLocaleString("pt-BR", {
              style: "currency",
              currency: items.cost.totalTaxAmount.currencyCode,
            })}
          </span>
        </div>
        <div
          class="py-2 border-b border-neutral-700 flex justify-between items-center mb-3"
        >
          <span class="text-neutral-400">Entrega</span>
          <span class="text-neutral-400">Calculado no checkout</span>
        </div>
        <div
          class="py-2 border-b border-neutral-700 flex justify-between items-center mb-3"
        >
          <span class="text-neutral-400">Total</span>
          <span class="text-neutral-100 text-xl"
            >{Number(items.cost.totalAmount.amount).toLocaleString("pt-BR", {
              style: "currency",
              currency: items.cost.totalAmount.currencyCode,
            })}
          </span>
        </div>
      </div>
      <a
        href={items.checkoutUrl}
        class="py-3 bg-orange-500 rounded-full text-center text-orange-100 font-medium opacity-90 hover:opacity-100"
        on:click={() => (show = !show)}
      >
        Finalizar Compra
      </a>
    {:else}
      <h2 class="mx-auto text-neutral-100 text-xl font-medium">
        Carrinho vazio
      </h2>
    {/if}
  </section>
{/if}
