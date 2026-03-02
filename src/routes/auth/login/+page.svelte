<script lang="ts">
  import Input from "$components/Inputs/index.svelte";
  import DotLoading from "$components/DotLoading.svelte";

  let { form } = $props();
  let isLoading = $state(false);
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section
  class="m-auto my-12 max-w-md rounded-lg border border-slate-300 bg-white px-8 py-8 dark:border-neutral-800 dark:bg-neutral-950"
>
  <h1
    class="mb-8 text-center text-3xl font-medium text-slate-900 dark:text-neutral-100"
  >
    Login
  </h1>
  <form
    action="?/login"
    method="POST"
    class="mb-8 flex flex-col"
    toolname="login"
    tooldescription="Fazer login na conta com e-mail e senha"
    onsubmit={() => (isLoading = true)}
  >
    <Input
      id="email"
      aria-label="E-mail"
      name="email"
      type="email"
      placeholder="email@email.com"
      toolparamdescription="E-mail da conta"
      required
    />
    <Input
      id="psw"
      aria-label="Senha"
      type="password"
      name="password"
      placeholder="Senha"
      toolparamdescription="Senha da conta"
      required
    />
    <span class="h-4">
      {#each form?.message || [] as msg (msg)}
        <p class="text-red-400">{msg}</p>
      {/each}
      {#if form?.fields}<p class="text-red-400">{form?.message}</p>{/if}
    </span>
    <button
      class="mt-6 ml-auto w-24 cursor-pointer rounded-full bg-blue-600 text-center text-white hover:opacity-95"
      type="submit"
      disabled={isLoading}
      data-loading={isLoading}
      aria-label="Entrar"
    >
      <span class="block h-10 px-6 py-2">
        {#if isLoading}
          <DotLoading />
        {:else}
          Entrar
        {/if}
      </span>
    </button>
  </form>
  <div class="flex justify-between">
    <a
      href="/auth/cadastrar"
      toolname="goToRegister"
      tooldescription="Ir para a página de cadastro de nova conta"
      class="text-blue-500 underline-offset-4 hover:underline">Registrar</a
    >
    <a
      href="/auth/recover"
      toolname="goToRecoverPassword"
      tooldescription="Ir para a página de recuperação de senha"
      class="text-blue-500 underline-offset-4 hover:underline"
    >
      Esqueceu a senha
    </a>
  </div>
</section>
