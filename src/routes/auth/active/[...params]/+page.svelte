<script lang="ts">
  import Input from "$components/Inputs/index.svelte";

  let { form } = $props();
</script>

<svelte:head>
  <title>Ative a conta</title>
</svelte:head>

<section
  class="m-auto my-12 max-w-md rounded-lg border border-neutral-800 bg-neutral-950 px-8 py-8"
>
  <h1 class="mb-8 text-center text-3xl font-medium text-neutral-100">
    Ative a conta
  </h1>
  <form action="?/active" class="mb-4 flex flex-col" method="POST">
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
    <span class="h-4">
      {#if form?.tokenNotExist}<p class="text-red-400">{form?.message}</p>{/if}
      {#if form?.fields}<p class="text-red-400">{form?.message}</p>{/if}
    </span>
    <button
      class="mt-6 ml-auto w-max cursor-pointer rounded-full bg-blue-600 px-6 py-2 text-blue-50 hover:opacity-95"
      type="submit"
    >
      Ativar conta
    </button>
  </form>
  <a
    href="/auth/login"
    class="text-blue-500 underline-offset-4 hover:underline"
  >
    Login
  </a>
</section>
