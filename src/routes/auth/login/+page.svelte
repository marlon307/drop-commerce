<script lang="ts">
  import type { ActionData } from "./$types";
  import Input from "../../../components/Inputs/index.svelte";
  import DotLoading from "../../../components/DotLoading.svelte";

  export let form: ActionData;
  let isLoading = false;
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section
  class="m-auto max-w-md my-12 py-8 bg-neutral-950 rounded-lg px-8 border-neutral-800 border"
>
  <h1 class="text-neutral-100 text-3xl text-center mb-8 font-medium">Login</h1>
  <form
    action="?/login"
    method="POST"
    class="flex flex-col mb-8"
    on:submit={() => (isLoading = true)}
  >
    <Input
      id="email"
      aria-label="E-mail"
      name="email"
      type="email"
      placeholder="email@email.com"
      required
    />
    <Input
      id="psw"
      aria-label="Senha"
      type="password"
      name="password"
      placeholder="Senha"
    />
    <span class="h-4">
      {#if form?.notUserExist}<p class="text-red-400">{form?.message}</p>{/if}
      {#if form?.fields}<p class="text-red-400">{form?.message}</p>{/if}
    </span>
    <button
      class="rounded-full bg-orange-600 mt-6 w-24 ml-auto text-neutral-100 text-center hover:opacity-95"
      type="submit"
      disabled={isLoading}
      data-loading={isLoading}
      aria-label="Entrar"
    >
      <span class="block py-2 px-6 h-10">
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
      href="/auth/register"
      class="text-orange-500 hover:underline underline-offset-4">Registrar</a
    >
    <a
      href="/auth/reset"
      class="text-orange-500 hover:underline underline-offset-4"
    >
      Esqueceu a senha
    </a>
  </div>
</section>
