<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import Modal from "$components/Modal/Index.svelte";
  import Input from "$components/Inputs/index.svelte";
  import DotLoading from "$components/DotLoading.svelte";

  export let data;
  export let form: ActionData;

  let showModal = false;
  let infoAddress: IAddress;
  let loading = false;
</script>

<ul class="grid grid-flow-row auto-rows-fr grid-cols-1 gap-4 lg:grid-cols-2">
  {#each data.addresses as adderess (adderess.id)}
    <li
      class="relative block w-full overflow-hidden rounded-xl border border-neutral-800"
    >
      <dl class="h-full w-full bg-neutral-950 px-4 py-2">
        <dt class="mb-2 w-11/12 truncate text-lg font-medium text-neutral-100">
          {`${adderess.firstName} ${adderess.lastName}`}
        </dt>
        <dd class="mb-1 line-clamp-2 text-neutral-400">
          {`${adderess.address1}, ${adderess.address2}`}
        </dd>
        <dd class="line-clamp-2 text-neutral-400">
          {`${adderess.zip}, ${adderess.city}, ${adderess.province}, ${adderess.country}`}
        </dd>
        <dd class="text-neutral-400">
          {adderess.company || ""}
        </dd>
      </dl>
      <button
        type="button"
        class="group absolute right-0 top-0 flex items-center justify-center border-neutral-700 p-3"
        on:click={() => {
          showModal = true;
          infoAddress = adderess;
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-none text-neutral-400 group-hover:text-blue-400"
          aria-label="Editar Endereço"
        >
          <path
            d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
          </path>
        </svg>
      </button>
    </li>
  {/each}
</ul>
{#if !data.addresses.length}
  <p class="text-center text-neutral-500">
    Pode criar endereço ao comprar item em nossa loja.
  </p>
{/if}

<Modal bind:showModal title="Editar endereço">
  <form
    action="?/saveAddress"
    method="POST"
    on:submit={() => (loading = true)}
    use:enhance={() =>
      async ({ result }) => {
        if (result.status === 200) {
          loading = false;
        }
      }}
  >
    <input name="id" value={infoAddress?.id} class="hidden" type="hidden" />
    <Input
      id="name"
      name="name"
      placeholder="Nome e sobrenome"
      type="name"
      aria-label="Nome"
      value={`${infoAddress?.firstName} ${infoAddress?.lastName}`}
    />
    <Input
      id="zip"
      name="zip"
      placeholder="00.000-000"
      type="zipcode"
      aria-label="CEP"
      value={infoAddress?.zip}
    />
    <Input
      id="address1"
      name="address1"
      placeholder="Endereço 1"
      type="address"
      aria-label="Endereço 1"
      value={infoAddress?.address1}
    />
    <div class="flex flex-col gap-0 md:flex-row md:gap-8">
      <Input
        id="address2"
        name="address2"
        placeholder="Endereço 2"
        type="address"
        aria-label="Endereço 2"
        value={infoAddress?.address2}
      />
      <Input
        id="city"
        name="city"
        placeholder="Cidade"
        type="city"
        aria-label="Cidade"
        value={infoAddress?.city}
      />
    </div>
    <div class="flex flex-col gap-0 md:flex-row md:gap-8">
      <Input
        id="province"
        name="province"
        placeholder="Estado"
        type="province"
        aria-label="UF"
        value={infoAddress?.province}
      />
      <Input
        id="country"
        name="country"
        placeholder="País"
        type="country"
        aria-label="País"
        value={infoAddress?.country}
      />
    </div>
    <span class="mb-4 block h-6">
      <p class="text-red-500">
        {#if form?.fields}
          {form?.message}
        {:else if form?.infoExists}
          {form?.message}
        {/if}
      </p>
    </span>
    <div class="flex items-center justify-between pb-4 md:pb-0">
      <button
        type="submit"
        class="w-24 rounded-full bg-red-600 text-blue-50 hover:opacity-95"
        disabled={loading}
        data-loading={loading}
        aria-label="Excluir endereço"
        formaction="?/deleteAddress"
      >
        <span class="block h-10 px-6 py-2">
          {#if loading}
            <DotLoading />
          {:else}
            Excluir
          {/if}
        </span>
      </button>
      <button
        type="submit"
        class="w-24 rounded-full bg-blue-600 text-blue-50 hover:opacity-95"
        disabled={loading}
        data-loading={loading}
        aria-label="Salvar"
      >
        <span class="block h-10 px-6 py-2">
          {#if loading}
            <DotLoading />
          {:else}
            Salvar
          {/if}
        </span>
      </button>
    </div>
  </form>
</Modal>
