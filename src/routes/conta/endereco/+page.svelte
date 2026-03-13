<script lang="ts">
  import { enhance } from "$app/forms";
  import Modal from "$components/Modal/Index.svelte";
  import Input from "$components/Inputs/index.svelte";
  import DotLoading from "$components/DotLoading.svelte";
  import type { MailingAddress } from "../../../@types/storefront.types";
  import SquarePen from "@lucide/svelte/icons/square-pen";

  let { data, form } = $props();

  let showModal = $state(false);
  let infoAddress = $state<MailingAddress>();
  let loading = $state("");
</script>

{#snippet submitActionButton(
  action: string,
  label: string,
  tone: "danger" | "primary",
)}
  <button
    type="submit"
    class={`w-24 cursor-pointer rounded-full text-blue-50 hover:opacity-95 ${
      tone === "danger" ? "bg-red-600" : "bg-blue-600"
    }`}
    disabled={!!loading}
    aria-label={label}
    formaction={action}
  >
    <span class="block h-10 px-6 py-2">
      {#if loading === action}
        <DotLoading />
      {:else}
        {label}
      {/if}
    </span>
  </button>
{/snippet}

<ul class="grid grid-flow-row auto-rows-fr grid-cols-1 gap-4 lg:grid-cols-2">
  {#each data.address! as adderess (adderess.node?.id)}
    <li
      class="relative block w-full overflow-hidden rounded-xl border border-slate-300 dark:border-neutral-800"
    >
      <dl class="h-full w-full bg-white px-4 py-2 dark:bg-neutral-950">
        <dt
          class="mb-2 w-11/12 truncate text-lg font-medium text-slate-900 dark:text-neutral-100"
        >
          {`${adderess.node.firstName} ${adderess.node.lastName || ""}`}
        </dt>
        <dd class="mb-1 line-clamp-2 text-slate-600 dark:text-neutral-400">
          {adderess.node.address2
            ? `${adderess.node.address1},`
            : adderess.node.address1}
          {adderess.node.address2 ? `${adderess.node.address2}` : ""}
        </dd>
        <dd class="line-clamp-2 text-slate-600 dark:text-neutral-400">
          {`${adderess.node.zip || ""}, ${adderess.node.city || ""}, ${adderess.node.province || ""}, ${adderess.node.country || ""}`}
        </dd>
        <dd class="text-slate-600 dark:text-neutral-400">
          {adderess.node.company || ""}
        </dd>
      </dl>
      <button
        type="button"
        class="group absolute top-0 right-0 flex cursor-pointer items-center justify-center border-slate-300 p-3 dark:border-neutral-700"
        aria-label="Editar Endereço"
        onclick={() => {
          showModal = true;
          infoAddress = adderess.node as MailingAddress;
        }}
      >
        <span
          class="flex-none text-slate-600 group-hover:text-blue-400 dark:text-neutral-400"
        >
          <SquarePen size="16" />
        </span>
      </button>
    </li>
  {/each}
</ul>
{#if !data.address?.length}
  <p class="text-center text-slate-500 dark:text-neutral-500">
    Crie endereço ao comprar item em nossa loja.
  </p>
{/if}

<Modal bind:showModal title="Editar endereço">
  <form
    action="?/saveAddress"
    method="POST"
    toolname="saveAddress"
    tooldescription="Salvar ou editar endereço de entrega (nome, CEP, endereço, cidade, estado, país)"
    use:enhance={({ action }) => {
      loading = action.search;

      return async ({ result }) => {
        if (result.status === 200) {
          loading = "";
          if (action.search === "?/deleteAddress") {
            data.address = data.address?.filter(
              (a) => a.node.id !== infoAddress?.id,
            );
          }
        } else {
          loading = "";
        }
      };
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
      pattern="\d*"
      aria-label="CEP"
      value={infoAddress?.zip?.replace("-", "")}
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
      {@render submitActionButton("?/deleteAddress", "Excluir", "danger")}
      {@render submitActionButton("?/saveAddress", "Salvar", "primary")}
    </div>
  </form>
</Modal>
