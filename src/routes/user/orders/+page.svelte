<script lang="ts">
  import Modal from "../../../components/Modal/Index.svelte";
  export let data;

  let showModal = false;
  let orderId: IOrder = data.orders![0];
</script>

<table class="mb-4 w-full text-sm">
  <thead class="table w-full table-fixed text-left">
    <tr class="font-semibold text-neutral-100">
      <th class="w-auto md:w-3/6 px-4 pb-4">Pedido</th>
      <th
        class="w-auto md:w-3/12 px-4 pb-4"
        aria-label="Data e Hora"
        title="Data e Hora"
      >
        Status
      </th>
      <th
        class="w-auto md:w-3/12 px-4 pb-4"
        aria-label="Serviço"
        title="Serviço"
      >
        Detalhes
      </th>
    </tr>
  </thead>
  <tbody class="block max-h-screen w-full overflow-auto rounded-xl">
    {#each data?.orders || [] as order}
      <tr
        class="table h-16 w-full table-fixed cursor-pointer border-b border-neutral-700 bg-neutral-900 text-neutral-300 last:border-none"
        on:click={() => {
          orderId = order;
          showModal = true;
        }}
      >
        <td class="w-auto md:w-3/6 px-4 py-2">
          <p>{order.name}</p>
        </td>
        <td class="w-auto md:w-3/12 px-4 py-2">
          <p>{order.financialStatus}</p>
        </td>
        <td class="w-auto md:w-3/12 px-4 py-2">
          <a href="/user/orders" class="flex gap-2 items-center justify-start">
            <p>Detalhes</p>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="flex-none"
            >
              <path
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<Modal bind:showModal title={`Pedido - ${orderId?.name}`}>
  {#if orderId?.financialStatus}
    <span class="text-neutral-100 text-lg">
      Status: {orderId.financialStatus}
    </span>
    <ul class="w-full mb-6 overflow-auto block max-h-[35vh]">
      {#each orderId.lineItems as product}
        <li
          class="flex gap-4 border-b border-neutral-700 py-6 relative justify-between"
        >
          <a
            href={`/product/${product.variant.product.handle}`}
            class="flex gap-4 justify-between"
          >
            <figure
              class="overflow-hidden w-20 h-20 rounded-lg border border-neutral-700 bg-neutral-900"
            >
              <img
                src={product.variant.image.transformedSrc}
                alt={product.variant.product.title}
                loading="lazy"
                class="object-fill h-full w-full"
                width="80"
                height="80"
              />
            </figure>
            <div class="flex-1 flex flex-col justify-between">
              <span class="text-neutral-100 text-xl text-left line-clamp-2">
                {product.variant.product.title}
              </span>
              <div
                class="flex gap-1 text-neutral-500 items-center justify-start"
              >
                <span class="font-light" title="Title - Default Title">
                  {product.variant.title}
                </span>
              </div>
            </div>
          </a>
          <div class="text-neutral-100 flex flex-col gap-5 items-start">
            <span>
              {Number(product.variant.price.amount).toLocaleString("BRL", {
                currency: product.variant.price.currencyCode,
                style: "currency",
              })}
            </span>
            <div
              class="ml-auto flex py-1 px-2 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700"
            >
              <p class="w-6 text-center">
                <span class="w-full text-sm">{product.quantity}</span>
              </p>
            </div>
          </div>
        </li>
      {/each}
    </ul>
    <div class="block mb-6 text-neutral-100">
      <dl class="flex gap-1">
        <dt class="text-neutral-400 font-light">Entregar para:</dt>
        <dd>
          {`${orderId.shippingAddress?.firstName} ${orderId?.shippingAddress?.lastName}`}
        </dd>
      </dl>
      <dl class="flex gap-1 flex-wrap">
        <dt class="text-neutral-400 font-light">Endereço:</dt>
        <dd>{orderId.shippingAddress?.address1},</dd>
        <dd>{orderId.shippingAddress?.address2},</dd>
        <dd>{orderId.shippingAddress?.zip},</dd>
        <dd>{orderId.shippingAddress?.city},</dd>
        <dd>{orderId.shippingAddress?.provinceCode},</dd>
        <dd>{orderId.shippingAddress?.country}</dd>
      </dl>
      <dl class="flex gap-1 flex-wrap">
        <dt class="text-neutral-400 font-light">Transportadora:</dt>
        <dd>{orderId.shippingAddress?.company}</dd>
      </dl>
    </div>
    <div class="w-full flex-1">
      <div
        class="py-2 border-b border-neutral-700 flex justify-between items-center mb-3"
      >
        <span class="text-neutral-400">Taxas</span>
        <span class="text-neutral-100 text-xl">
          {Number(orderId.totalTax.amount).toLocaleString("BRL", {
            currency: orderId.totalTax.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
      <div
        class="py-2 border-b border-neutral-700 flex justify-between items-center mb-3"
      >
        <span class="text-neutral-400">Entrega</span>
        <span class="text-neutral-400">
          {Number(orderId.totalShippingPrice.amount).toLocaleString("BRL", {
            currency: orderId.totalShippingPrice.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
      <div class="py-2 flex justify-between items-center mb-3">
        <span class="text-neutral-400">Total</span>
        <span class="text-neutral-100 text-xl">
          {Number(orderId.totalPrice.amount).toLocaleString("BRL", {
            currency: orderId.totalPrice.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
    </div>
  {/if}
</Modal>
