<script lang="ts">
  export let data;
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
    {#each data.orders as order}
      <tr
        class="table h-16 w-full table-fixed cursor-pointer border-b border-neutral-700 bg-neutral-900 text-neutral-300 last:border-none"
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
