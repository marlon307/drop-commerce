<script lang="ts">
  import { enhance } from "$app/forms";
  import DotLoading from "$components/DotLoading.svelte";
  import Input from "$components/Inputs/index.svelte";

  let { data } = $props();

  let propsState = $state({
    timeRequest: 0,
    countDown: 0,
    status: 0,
    isLoading: false,
    dataInfo: {},
  });

  propsState.timeRequest === 0 && clearInterval(propsState.countDown);
</script>

<svelte:head>
  <title>Solicitar alteração de senha</title>
</svelte:head>

<section
  class="m-auto my-12 max-w-md rounded-lg border border-neutral-800 bg-neutral-950 px-8 py-8"
>
  <h1 class="mb-8 text-center text-3xl font-medium text-neutral-100">
    Mudar Senha
  </h1>
  <form
    action="?/recover"
    class="mb-4 flex flex-col"
    method="POST"
    use:enhance={() => {
      propsState.isLoading = true;
      propsState.timeRequest = 60;
      propsState.dataInfo = {};
      propsState.countDown = setInterval(
        () => (propsState.timeRequest -= 1),
        1000,
      );
      return async ({ result }) => {
        propsState.isLoading = false;
        if (result.status === 400) {
          propsState.timeRequest = 0;
          propsState.dataInfo = result;
        } else propsState.status = 200;
      };
    }}
  >
    <Input
      id="email"
      aria-label="E-mail"
      type="email"
      name="email"
      required
      placeholder="email@email.com"
    />
    <div class="block text-xs text-neutral-50">
      {#each (propsState.dataInfo as any)?.data.message || [] as msg}
        <p class="text-red-400">{msg}</p>
      {/each}
      {#if propsState.status === 200}
        <p class="text-green-700">E-mail enviado com sucesso.</p>
      {/if}
    </div>
    <button
      class="ml-auto mt-2 w-max rounded-full bg-blue-600 px-6 py-2 text-blue-50 hover:opacity-95"
      type="submit"
      disabled={propsState.isLoading || !!propsState.timeRequest}
      data-loading={propsState.isLoading}
      aria-label="Entrar"
    >
      <span class="flex h-6 min-w-[150px] items-center justify-center py-2">
        {#if propsState.isLoading}
          <DotLoading />
        {:else if !propsState.timeRequest}
          Soliciatar alteração da senha
        {:else}
          Envie um novo email em {propsState.timeRequest}s
        {/if}
      </span>
    </button>
  </form>
  {#if !data.customer?.email}
    <a
      href="/auth/login"
      class="text-blue-500 underline-offset-4 hover:underline"
    >
      Login
    </a>
  {/if}
</section>
