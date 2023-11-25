<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionResult } from "@sveltejs/kit";

  import DotLoading from "$components/DotLoading.svelte";
  import Input from "$components/Inputs/index.svelte";
  import { any } from "zod";

  export let data;

  let isLoading = false;
  let timeRequest: number;
  let countDown: number;
  let status: number;
  let dataInfo: any;

  $: if (timeRequest === 0) clearInterval(countDown);
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
      isLoading = true;
      timeRequest = 60;
      dataInfo = undefined;
      countDown = setInterval(() => (timeRequest -= 1), 1000);
      return async ({ result }) => {
        isLoading = false;
        if (result.status === 400) {
          timeRequest = 0;
          dataInfo = result;
        } else status = 200;
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
    <button
      class="ml-auto mt-6 w-max rounded-full bg-blue-600 px-6 py-2 text-blue-50 hover:opacity-95"
      type="submit"
      disabled={isLoading || !!timeRequest}
      data-loading={isLoading}
      aria-label="Entrar"
    >
      <span class="flex h-6 min-w-[150px] items-center justify-center py-2">
        {#if isLoading}
          <DotLoading />
        {:else if !timeRequest}
          Soliciatar alteração da senha
        {:else}
          Envie um novo email em {timeRequest}s
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
  {#if dataInfo?.data.message}
    <p class="text-red-400">{dataInfo?.data.message}</p>
  {/if}
  {#if status === 200}
    <p class="text-green-700">E-mail enviado com sucesso.</p>
  {/if}
</section>
