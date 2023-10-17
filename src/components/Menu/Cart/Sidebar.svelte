<script lang="ts">
  import ButtonUpdateProduct from "./ButtonUpdateProduct.svelte";
  import ButtonRemoveCartItem from "./ButtonRemoveCartItem.svelte";
  import Dialog from "../../Modal/Dialog.svelte";
  export let showModal = false;
  export let items: ICart;
</script>

<Dialog bind:showModal titleDialog="Carrinho">
  <section
    class="w-full bg-neutral-950 border-neutral-700 h-full flex flex-col"
  >
    {#if items.lines?.length}
      <ul class="flex overflow-auto flex-col flex-1">
        {#each items.lines as product}
          <li class="flex gap-4 border-b border-neutral-700 py-6 relative">
            <ButtonRemoveCartItem lineId={product.id} />
            <a
              href={`/product/${product.merchandise.product.handle}`}
              class="flex gap-4 justify-between"
              on:click={() => (showModal = !showModal)}
            >
              <figure
                class="overflow-hidden w-20 h-20 rounded-lg border border-neutral-700 hover:bg-neutral-800 bg-neutral-900"
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
                <div
                  class="flex gap-1 text-neutral-500 items-center justify-start"
                >
                  {#each product.merchandise.selectedOptions as variation}
                    <span
                      class=" font-light"
                      title={`${variation.name} - ${variation.value}`}
                      >{variation.value}</span
                    >
                    <span class="last:hidden text-sm">/</span>
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
              <ButtonUpdateProduct
                quantity={product.quantity}
                lineId={product.id}
                variantId={product.merchandise.id}
              />
            </div>
          </li>
        {/each}
      </ul>
      <div class="block w-full mb-14">
        <div class="w-full py-4 flex-1">
          <div
            class="py-2 border-b border-neutral-700 flex justify-between items-center mb-3"
          >
            <span class="text-neutral-400">Taxas</span>
            <span class="text-neutral-100 text-xl">
              {Number(items.cost.totalTaxAmount.amount).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: items.cost.totalTaxAmount?.currencyCode || "BRL",
                }
              )}
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
          class="py-3 bg-orange-500 rounded-full text-center text-orange-100 font-medium opacity-90 hover:opacity-100 block"
          on:click={() => (showModal = !showModal)}
        >
          Finalizar Compra
        </a>
      </div>
    {:else}
      <h2 class="mx-auto text-neutral-100 text-xl font-medium">
        Carrinho vazio
      </h2>
    {/if}
  </section>
</Dialog>
