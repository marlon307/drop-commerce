<script lang="ts">
  import Modal from "$components/Modal/Index.svelte";
  let { data } = $props();

  let { orderId, showModal } = $state<{ showModal: boolean; orderId?: IOrder }>(
    {
      showModal: false,
      orderId: undefined,
    },
  );
</script>

<table class="mb-4 w-full text-sm">
  <thead class="table w-full table-fixed text-left">
    <tr class="font-semibold text-neutral-100">
      <th class="w-auto px-4 pb-4 md:w-3/6">Pedido</th>
      <th
        class="w-auto px-4 pb-4 md:w-3/12"
        aria-label="Data e Hora"
        title="Data e Hora"
      >
        Status
      </th>
      <th
        class="w-auto px-4 pb-4 md:w-3/12"
        aria-label="Serviço"
        title="Serviço"
      >
        Detalhes
      </th>
    </tr>
  </thead>
  <tbody class="block max-h-screen w-full overflow-auto rounded-xl">
    {#each data?.orders || [] as order (order.orderNumber)}
      <tr
        class="group table h-16 w-full table-fixed cursor-pointer border-b border-neutral-700 bg-neutral-950 text-neutral-300 last:border-none"
        onclick={() => {
          orderId = order;
          showModal = true;
        }}
      >
        <td class="w-auto py-2 px-4 md:w-3/6">
          <p>{order.name}</p>
        </td>
        <td class="w-auto py-2 px-4 md:w-3/12">
          <p>{order.financialStatus}</p>
        </td>
        <td class="w-auto py-2 px-4 md:w-3/12">
          <a
            href="/conta/pedidos"
            class="flex items-center justify-start gap-2"
          >
            <p>Detalhes</p>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="flex-none group-hover:text-blue-500"
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
    <span class="text-lg text-neutral-100">
      Status: {orderId.financialStatus}
    </span>
    <ul class="mb-6 block max-h-[35vh] w-full overflow-auto">
      {#each orderId.lineItems as product (product.variant.id)}
        <li
          class="relative flex justify-between gap-4 border-b border-neutral-700 py-6"
        >
          <a
            href={`/produto/${product.variant.product.handle}`}
            class="grid grid-cols-[5rem,auto] gap-4"
          >
            <figure
              class="size-20 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900"
            >
              <img
                src={product.variant.image.transformedSrc}
                alt={product.variant.product.title}
                loading="lazy"
                class="size-full object-fill"
                width="78"
                height="78"
              />
            </figure>
            <div class="flex flex-1 flex-col justify-between">
              <span class="line-clamp-2 text-left text-base text-neutral-100">
                {product.variant.product.title}
              </span>
              <div
                class="flex items-center justify-start gap-1 text-neutral-500"
              >
                <span class="text-sm font-light" title={product.variant.title}>
                  {product.variant.title}
                </span>
              </div>
            </div>
          </a>
          <div class="flex flex-col items-start gap-5 text-neutral-100">
            <span class="text-lg">
              {(
                product.quantity * Number(product.variant.price.amount)
              ).toLocaleString("BRL", {
                currency: product.variant.price.currencyCode,
                style: "currency",
              })}
            </span>
            <div
              class="ml-auto flex flex-row items-center rounded-full border border-neutral-200 py-1 px-2 dark:border-neutral-700"
            >
              <p class="w-6 text-center text-sm">
                {product.quantity}
              </p>
            </div>
          </div>
        </li>
      {/each}
    </ul>
    <div class="mb-6 block text-neutral-100">
      <dl class="flex gap-1">
        <dt class="font-light text-neutral-400">Entregar para:</dt>
        <dd>
          {#if orderId.shippingAddress?.firstName}
            {orderId.shippingAddress?.firstName}
          {/if}

          {#if orderId.shippingAddress?.lastName}
            {orderId?.shippingAddress?.lastName}
          {/if}
        </dd>
      </dl>
      <dl class="flex flex-wrap gap-1">
        <dt class="font-light text-neutral-400">Endereço:</dt>
        {#if orderId.shippingAddress?.address1}
          <dd>{orderId.shippingAddress?.address1},</dd>
        {/if}
        {#if orderId.shippingAddress?.address2}
          <dd>{orderId.shippingAddress?.address2},</dd>
        {/if}
        {#if orderId.shippingAddress?.zip}
          <dd>{orderId.shippingAddress?.zip},</dd>
        {/if}
        {#if orderId.shippingAddress?.city}
          <dd>{orderId.shippingAddress?.city},</dd>
        {/if}
        {#if orderId.shippingAddress?.province}
          <dd>{orderId.shippingAddress?.province},</dd>
        {/if}
        {#if orderId.shippingAddress?.country}
          <dd>{orderId.shippingAddress?.country}.</dd>
        {/if}
      </dl>
      {#if orderId.shippingAddress?.company}
        <dl class="flex flex-wrap gap-1">
          <dt class="font-light text-neutral-400">Empresa:</dt>
          <dd>{orderId.shippingAddress?.company}</dd>
        </dl>
      {/if}
      <dl class="mt-6 flex flex-col gap-1">
        <dt class="text-lg text-neutral-100">Rastreio</dt>
        {#if !orderId.successfulFulfillments.length}
          <dd class="text-neutral-400">
            Em breve o código de rastreamento estará disponível.
          </dd>
        {/if}
        {#each orderId.successfulFulfillments as tracking}
          {#if !tracking.trackingCompany}
            <dd>
              <span class="text-neutral-400">Aguardando postagem.</span>
            </dd>
          {:else}
            <dd>
              <span class="text-neutral-400">Transportadora:</span>
              {tracking.trackingCompany}
            </dd>
          {/if}
          {#each tracking.trackingInfo as trackingCode}
            <dd class="flex items-start gap-1">
              <span class="text-neutral-400">Código:</span>
              <a
                href={trackingCode.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center text-blue-600 hover:underline"
              >
                {trackingCode.number}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                  </path>
                </svg>
              </a>
            </dd>
          {/each}
        {/each}
      </dl>
    </div>
    <div class="w-full flex-1">
      <div
        class="mb-3 flex items-center justify-between border-b border-neutral-700 py-2"
      >
        <span class="text-neutral-400">Taxas</span>
        <span class="text-xl text-neutral-100">
          {Number(orderId.totalTax.amount).toLocaleString("BRL", {
            currency: orderId.totalTax.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
      <div
        class="mb-3 flex items-center justify-between border-b border-neutral-700 py-2"
      >
        <span class="text-neutral-400">Entrega</span>
        <span class="text-neutral-400">
          {Number(orderId.totalShippingPrice.amount).toLocaleString("BRL", {
            currency: orderId.totalShippingPrice.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
      <div class="mb-3 flex items-center justify-between py-2">
        <span class="text-neutral-400">Total</span>
        <span class="text-xl text-neutral-100">
          {Number(orderId.totalPrice.amount).toLocaleString("BRL", {
            currency: orderId.totalPrice.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
    </div>
  {/if}
</Modal>
