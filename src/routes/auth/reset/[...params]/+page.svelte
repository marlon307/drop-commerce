<script lang="ts">
  import Input from "$components/Inputs/index.svelte";
  let { form } = $props();
</script>

<svelte:head>
  <title>Mudar senha</title>
</svelte:head>

<section
  class="m-auto my-12 max-w-md rounded-lg border border-slate-300 bg-white px-8 py-8 dark:border-neutral-800 dark:bg-neutral-950"
>
  <h1
    class="mb-8 text-center text-3xl font-medium text-slate-900 dark:text-neutral-100"
  >
    Mudar Senha
  </h1>
  <form
    action="?/reset"
    class="mb-4 flex flex-col"
    method="POST"
    toolname="resetPassword"
    tooldescription="Definir nova senha após recuperação da conta"
  >
    <Input
      id="password"
      aria-label="Senha"
      type="password"
      name="password"
      required
      placeholder="Digine uma nova senha"
    />
    <Input
      id="confirmpsw"
      aria-label="Confirme a Senha"
      type="password"
      name="confirmpsw"
      required
      placeholder="Confirme sua nova senha"
    />
    <span class="block">
      {#if form?.tokenNotExist}
        {#each form?.message as msg (msg)}
          <p class="text-red-400">{msg}</p>
        {/each}
      {/if}
      {#if form?.fields}<p class="text-red-400">{form?.message}</p>{/if}
    </span>
    <button
      class="mt-6 ml-auto w-max cursor-pointer rounded-full bg-blue-600 px-6 py-2 text-blue-50 hover:opacity-95"
      type="submit"
    >
      Alterar senha
    </button>
  </form>
  <a
    href="/auth/login"
    class="text-blue-500 underline-offset-4 hover:underline"
  >
    Login
  </a>
</section>
