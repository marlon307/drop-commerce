<script lang="ts">
  import { enhance } from "$app/forms";
  import DotLoading from "../../components/DotLoading.svelte";

  import Input from "../../components/Inputs/index.svelte";
  export let data;

  let infoUser = {
    name: `${data.customer.firstName} ${data.customer.lastName}`,
    email: data.customer.email,
    phone: data.customer.phone,
    acceptsMarketing: data.customer.acceptsMarketing,
  };
  let loading = false;
</script>

<form
  action="?/user"
  method="POST"
  class="w-full"
  use:enhance={() => {
    loading = true;
    return async () => {
      loading = false;
    };
  }}
>
  <Input
    id="name"
    name="name"
    placeholder="Nome"
    aria-label="Nome"
    bind:value={infoUser.name}
    required
  />
  <fieldset class="flex flex-col md:flex-row md:gap-6 mb-4">
    <Input
      id="email"
      name="email"
      placeholder="email-@email.com"
      aria-label="E-mail"
      type="email"
      bind:value={infoUser.email}
      required
    />
    <Input
      id="tel"
      type="tel"
      name="tel"
      placeholder="Telefone"
      aria-label="Telefone"
      bind:value={infoUser.phone}
      required
    />
  </fieldset>
  <div class="flex items-start justify-between gap-4 mb-8 flex-col md:flex-row">
    <label for="accept" class="flex items-baseline gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="prom_accept"
        id="accept"
        class="rounded checked:accent-orange-600 flex-none"
        bind:checked={infoUser.acceptsMarketing}
      />
      <span class="text-neutral-100">
        Quero receber ofertas e novidades por e-mail, SMS, WhatsApp
      </span>
    </label>
    <button
      type="submit"
      class="bg-orange-600 rounded-full w-24 float-right text-orange-50 ml-auto md:m-0 hover:opacity-95"
      disabled={loading}
      data-loading={loading}
      aria-label="Salvar"
    >
      <span class="block py-2 px-6 h-10">
        {#if loading}
          <DotLoading />
        {:else}
          Salvar
        {/if}
      </span>
    </button>
  </div>
  <a
    href="/auth/reset"
    class="text-neutral-100 hover:underline underline-offset-4">Alterar senha</a
  >
</form>
