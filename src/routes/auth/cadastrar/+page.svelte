<script lang="ts">
  import DotLoading from "$components/DotLoading.svelte";
  import Input from "$components/Inputs/index.svelte";

  let { form } = $props();
  let isLoading = $state(false);
</script>

<svelte:head>
  <title>Registrar-se</title>
</svelte:head>

<section
  class="m-auto my-12 max-w-md rounded-lg border border-neutral-800 bg-neutral-950 px-8 py-8"
>
  <h1 class="mb-8 text-center text-3xl font-medium text-neutral-100">
    Registrar
  </h1>
  <form
    method="POST"
    action="?/register"
    class="mb-4 flex flex-col"
    onsubmit={() => (isLoading = true)}
  >
    <Input
      id="name"
      aria-label="Nome e Sobrenome"
      placeholder="Nome e Sobrenome"
      type="text"
      name="name"
      required
    />
    <Input
      id="tel"
      aria-label="Telefone"
      placeholder="Telefone"
      type="tel"
      name="tel"
      pattern="\d*"
      required
      description="(DD)XXXXXXXXX"
    />
    <Input
      id="email"
      aria-label="E-mail"
      placeholder="email@email.com"
      type="email"
      name="email"
      required
    />
    <Input
      id="psw"
      aria-label="Senha"
      placeholder="Senha"
      type="password"
      name="password"
      required
    />
    <Input
      id="cpsw"
      aria-label="Confirme a Senha"
      type="password"
      name="confirmpsw"
      placeholder="Confirme sua senha"
      required
    />
    <span class="mb-4">
      {#each form?.message || [] as msg}
        <p class="text-red-400">{msg}</p>
      {/each}
      {#if form?.fields}<p class="text-red-400">{form?.message}</p>{/if}
    </span>
    <label for="accept" class="flex cursor-pointer items-baseline gap-2">
      <input
        type="checkbox"
        name="prom_accept"
        id="accept"
        class="flex-none checked:accent-blue-600"
      />
      <span class="text-neutral-100">
        Quero receber ofertas e novidades por e-mail, SMS, WhatsApp
      </span>
    </label>
    <button
      type="submit"
      class="float-right mt-6 ml-auto w-max cursor-pointer rounded-full bg-blue-600 text-blue-50 hover:opacity-95"
      disabled={isLoading}
      data-loading={isLoading}
      aria-label="Registre-se"
    >
      <span class="block h-10 px-6 py-2">
        {#if isLoading}
          <DotLoading />
        {:else}
          Registre-se
        {/if}
      </span>
    </button>
  </form>
  <a
    href="/auth/login"
    class="text-blue-500 underline-offset-4 hover:underline"
  >
    Login
  </a>
</section>
