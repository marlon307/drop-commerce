<script lang="ts">
  import ButtonUpdateProduct from "./ButtonUpdateProduct.svelte";
  import ButtonRemoveCartItem from "./ButtonRemoveCartItem.svelte";
  import Dialog from "$components/Modal/Dialog.svelte";

  let {
    showModal = $bindable(false),
    items,
  }: { showModal: boolean; items: ICart } = $props();
</script>

<Dialog bind:showModal titleDialog="Carrinho">
  <section class="flex h-[calc(100%-3em)] w-full flex-col border-neutral-700">
    {#if items.lines?.length}
      <ul class="flex flex-1 flex-col overflow-auto">
        {#each items.lines as product (product.id)}
          <li
            class="relative flex justify-between gap-4 border-b border-neutral-700 py-6"
          >
            <ButtonRemoveCartItem lineId={product.id} />
            <a
              href={`/produto/${product.merchandise.product.handle}`}
              class="flex justify-between gap-4"
              onclick={() => (showModal = !showModal)}
            >
              <figure
                class="h-20 w-20 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
              >
                <img
                  src={product.merchandise.image.transformedSrc}
                  alt={product.merchandise.product.title}
                  loading="lazy"
                  class="h-full w-full object-fill"
                  width="78"
                  height="78"
                />
              </figure>
              <div class="flex flex-1 flex-col justify-between">
                <span class="line-clamp-2 text-left text-base text-neutral-100">
                  {product.merchandise.product.title}
                </span>
                <p
                  class="text-sm font-light text-neutral-400"
                  title={product.merchandise.title}
                >
                  {product.merchandise.title}
                </p>
              </div>
            </a>
            <div class="flex flex-col items-start gap-5 text-neutral-100">
              <span class="text-lg">
                {(
                  product.quantity * Number(product.merchandise.price.amount)
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
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
      <div class="mb-3 block w-full">
        <div class="w-full flex-1 py-4">
          <div
            class="mb-3 flex items-center justify-between border-b border-neutral-700 py-2"
          >
            <span class="text-neutral-400">Taxas</span>
            <span class="text-xl text-neutral-100">
              {Number(items.cost.totalTaxAmount?.amount || 0).toLocaleString(
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
          class="block rounded-full bg-blue-600 py-3 text-center font-medium text-blue-100 opacity-90 hover:opacity-100"
          onclick={() => (showModal = !showModal)}
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
