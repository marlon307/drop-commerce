<script lang="ts">
  import ButtonUpdateProduct from "./ButtonUpdateProduct.svelte";
  import ButtonRemoveCartItem from "./ButtonRemoveCartItem.svelte";
  import Dialog from "../../Modal/Dialog.svelte";
  export let showModal = false;
  export let items: ICart;
</script>

<Dialog bind:showModal titleDialog="Carrinho">
  <section
    class="flex h-full w-full flex-col border-neutral-700 bg-neutral-950"
  >
    {#if items.lines?.length}
      <ul class="flex flex-1 flex-col overflow-auto">
        {#each items.lines as product}
          <li class="relative flex gap-4 border-b border-neutral-700 py-6">
            <ButtonRemoveCartItem lineId={product.id} />
            <a
              href={`/product/${product.merchandise.product.handle}`}
              class="flex justify-between gap-4"
              on:click={() => (showModal = !showModal)}
            >
              <figure
                class="h-20 w-20 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
              >
                <img
                  src={product.merchandise.image.transformedSrc}
                  alt={product.merchandise.product.title}
                  loading="lazy"
                  class="h-full w-full object-fill"
                  width="80"
                  height="80"
                />
              </figure>
              <div class="flex flex-1 flex-col justify-between">
                <span class="line-clamp-2 text-left text-xl text-neutral-100">
                  {product.merchandise.product.title}
                </span>
                <div
                  class="flex items-center justify-start gap-1 text-neutral-500"
                >
                  {#each product.merchandise.selectedOptions as variation}
                    <span
                      class=" font-light"
                      title={`${variation.name} - ${variation.value}`}
                      >{variation.value}</span
                    >
                    <span class="text-sm last:hidden">/</span>
                  {/each}
                </div>
              </div>
            </a>
            <div class="flex flex-col items-start gap-5 text-neutral-100">
              <span>
                {Number(product.merchandise.price.amount).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )}
              </span>
              <ButtonUpdateProduct
                quantity={product.quantity}
                lineId={product.id}
                variantId={product.merchandise.id}
              />
            </div>
          </li>
        {/each}
      </ul>
      <div class="mb-14 block w-full">
        <div class="w-full flex-1 py-4">
          <div
            class="mb-3 flex items-center justify-between border-b border-neutral-700 py-2"
          >
            <span class="text-neutral-400">Taxas</span>
            <span class="text-xl text-neutral-100">
              {Number(items.cost.totalTaxAmount.amount).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: items.cost.totalTaxAmount?.currencyCode || "BRL",
                },
              )}
            </span>
          </div>
          <div
            class="mb-3 flex items-center justify-between border-b border-neutral-700 py-2"
          >
            <span class="text-neutral-400">Entrega</span>
            <span class="text-neutral-400">Calculado no checkout</span>
          </div>
          <div
            class="mb-3 flex items-center justify-between border-b border-neutral-700 py-2"
          >
            <span class="text-neutral-400">Total</span>
            <span class="text-xl text-neutral-100"
              >{Number(items.cost.totalAmount.amount).toLocaleString("pt-BR", {
                style: "currency",
                currency: items.cost.totalAmount.currencyCode,
              })}
            </span>
          </div>
        </div>
        <a
          href={items.checkoutUrl}
          class="block rounded-full bg-orange-500 py-3 text-center font-medium text-orange-100 opacity-90 hover:opacity-100"
          on:click={() => (showModal = !showModal)}
        >
          Finalizar Compra
        </a>
      </div>
    {:else}
      <h2 class="mx-auto text-xl font-medium text-neutral-100">
        Carrinho vazio
      </h2>
    {/if}
  </section>
</Dialog>
