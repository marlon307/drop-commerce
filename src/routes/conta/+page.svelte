<script lang="ts">
  import { enhance } from "$app/forms";
  import DotLoading from "$components/DotLoading.svelte";

  import Input from "$components/Inputs/index.svelte";

  export let data;
  let errMsg: { [k: string]: any } = {};

  let infoUser = {
    name: `${data.customer.firstName} ${data.customer.lastName}`,
    email: data.customer.email,
    phone: data.customer.phone.replace("+55", ""),
    acceptsMarketing: data.customer.acceptsMarketing,
  };
  let loading = false;
</script>

<form
  action="?/user"
  method="POST"
  class="mx-auto w-full rounded-lg bg-neutral-950 p-6"
  use:enhance={() => {
    loading = true;
    return async ({ result }) => {
      errMsg = result;
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
  <fieldset class="mb-4 flex flex-col md:flex-row md:gap-6">
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
      pattern="\d*"
      description="(DD)XXXXXXXXX"
      maxlength={11}
    />
  </fieldset>
  <div class="block">
    {#each errMsg?.data?.message || [] as msg}
      <p class="mb-2 text-red-400">{msg}</p>
    {/each}
  </div>
  <div class="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row">
    <label for="accept" class="flex cursor-pointer items-baseline gap-2">
      <input
        type="checkbox"
        name="prom_accept"
        id="accept"
        class="flex-none rounded checked:accent-blue-600"
        bind:checked={infoUser.acceptsMarketing}
      />
      <span class="text-neutral-100">
        Quero receber ofertas e novidades por e-mail, SMS, WhatsApp
      </span>
    </label>
    <button
      type="submit"
      class="float-right ml-auto w-24 rounded-full bg-blue-600 text-blue-50 hover:opacity-95 md:m-0"
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
  <a
    href="/auth/recover"
    class="text-neutral-100 underline-offset-4 hover:underline"
  >
    Alterar senha
  </a>
</form>
