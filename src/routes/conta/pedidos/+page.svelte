<script lang="ts">
  import Modal from "$components/Modal/Index.svelte";
  import MoveUpRight from "@lucide/svelte/icons/move-up-right";
  import type { Order } from "../../../@types/storefront.types.js";
  let { data } = $props();

  let { orderId, showModal } = $state<{ showModal: boolean; orderId?: Order }>({
    showModal: false,
    orderId: undefined,
  });
</script>

<table class="mb-4 w-full text-sm">
  <thead class="table w-full table-fixed text-left">
    <tr class="font-semibold text-slate-900 dark:text-neutral-100">
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
    {#each data.orders || [] as order (order.node.name)}
      <tr
        class="group table h-16 w-full table-fixed cursor-pointer border-b border-slate-300 bg-white text-slate-700 last:border-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300"
        onclick={() => {
          orderId = order.node as Order;
          showModal = true;
        }}
      >
        <td class="w-auto px-4 py-2 md:w-3/6">
          <p>{order.node.name}</p>
        </td>
        <td class="w-auto px-4 py-2 md:w-3/12">
          <p>{order.node.financialStatus}</p>
        </td>
        <td class="w-auto px-4 py-2 md:w-3/12">
          <a
            href="/conta/pedidos"
            class="flex items-center justify-start gap-2"
          >
            <p>Detalhes</p>
            <span class="flex-none group-hover:text-blue-500">
              <MoveUpRight size="16" />
            </span>
          </a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<Modal bind:showModal title={`Pedido - ${orderId?.name}`}>
  {#if orderId?.financialStatus}
    <span class="text-lg text-slate-900 dark:text-neutral-100">
      Status: {orderId.financialStatus}
    </span>
    <ul class="mb-6 block max-h-[35vh] w-full overflow-auto">
      {#each orderId.lineItems.edges as product (product.node.variant?.id)}
        <li
          class="relative flex justify-between gap-4 border-b border-slate-300 py-6 dark:border-neutral-700"
        >
          <a
            href={`/produto/${product.node.variant?.product.handle}`}
            class="grid grid-cols-[5rem_auto] gap-4"
          >
            <figure
              class="size-20 overflow-hidden rounded-lg border border-slate-300 bg-slate-50 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <img
                src={product.node.variant?.image?.url}
                alt={product.node.variant?.product.title}
                loading="lazy"
                class="aspect-square size-full object-fill"
                width="78"
                height="78"
                decoding="async"
              />
            </figure>
            <div class="flex flex-1 flex-col justify-between">
              <span
                class="line-clamp-2 text-left text-base text-slate-900 dark:text-neutral-100"
              >
                {product.node.variant?.product.title}
              </span>
              <div
                class="flex items-center justify-start gap-1 text-slate-500 dark:text-neutral-500"
              >
                <span
                  class="text-sm font-light"
                  title={product.node.variant?.title}
                >
                  {product.node.variant?.title}
                </span>
              </div>
            </div>
          </a>
          <div
            class="flex flex-col items-start gap-5 text-slate-900 dark:text-neutral-100"
          >
            <span class="text-lg">
              {(
                product.node.quantity *
                Number(product.node.variant?.price.amount)
              ).toLocaleString("BRL", {
                currency: product.node.variant?.price.currencyCode,
                style: "currency",
              })}
            </span>
            <div
              class="ml-auto flex flex-row items-center rounded-full border border-slate-300 px-2 py-1 dark:border-neutral-700"
            >
              <p class="w-6 text-center text-sm">
                {product.node?.quantity}
              </p>
            </div>
          </div>
        </li>
      {/each}
    </ul>
    <div class="mb-6 block text-slate-900 dark:text-neutral-100">
      <dl class="flex gap-1">
        <dt class="font-light text-slate-600 dark:text-neutral-400">
          Entregar para:
        </dt>
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
        <dt class="font-light text-slate-600 dark:text-neutral-400">
          Endereço:
        </dt>
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
          <dt class="font-light text-slate-600 dark:text-neutral-400">
            Empresa:
          </dt>
          <dd>{orderId.shippingAddress?.company}</dd>
        </dl>
      {/if}
      <dl class="mt-6 flex flex-col gap-1">
        <dt class="text-lg text-slate-900 dark:text-neutral-100">Rastreio</dt>
        {#if !orderId.successfulFulfillments?.length}
          <dd class="text-slate-600 dark:text-neutral-400">
            Em breve o código de rastreamento estará disponível.
          </dd>
        {/if}
        {#each orderId.successfulFulfillments! as tracking (tracking.trackingCompany)}
          {#if !tracking.trackingCompany}
            <dd>
              <span class="text-slate-600 dark:text-neutral-400"
                >Aguardando postagem.</span
              >
            </dd>
          {:else}
            <dd>
              <span class="text-slate-600 dark:text-neutral-400"
                >Transportadora:</span
              >
              {tracking.trackingCompany}
            </dd>
          {/if}
          {#each tracking.trackingInfo as trackingCode (trackingCode.number)}
            <dd class="flex items-start gap-1">
              <span class="text-slate-600 dark:text-neutral-400">Código:</span>
              <a
                href={trackingCode.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center text-blue-600 hover:underline"
              >
                {trackingCode.number}
                <MoveUpRight size="16" />
              </a>
            </dd>
          {/each}
        {/each}
      </dl>
    </div>
    <div class="w-full flex-1">
      <div
        class="mb-3 flex items-center justify-between border-b border-slate-300 py-2 dark:border-neutral-700"
      >
        <span class="text-slate-600 dark:text-neutral-400">Taxas</span>
        <span class="text-xl text-slate-900 dark:text-neutral-100">
          {Number(orderId.totalTax?.amount).toLocaleString("BRL", {
            currency: orderId.totalTax?.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
      <div
        class="mb-3 flex items-center justify-between border-b border-slate-300 py-2 dark:border-neutral-700"
      >
        <span class="text-slate-600 dark:text-neutral-400">Entrega</span>
        <span class="text-slate-600 dark:text-neutral-400">
          {Number(orderId.totalShippingPrice.amount).toLocaleString("BRL", {
            currency: orderId.totalShippingPrice.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
      <div class="mb-3 flex items-center justify-between py-2">
        <span class="text-slate-600 dark:text-neutral-400">Total</span>
        <span class="text-xl text-slate-900 dark:text-neutral-100">
          {Number(orderId.totalPrice.amount).toLocaleString("BRL", {
            currency: orderId.totalPrice.currencyCode,
            style: "currency",
          })}
        </span>
      </div>
    </div>
  {/if}
</Modal>
