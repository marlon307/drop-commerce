<script lang="ts">
  import { enhance, applyAction } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { ActionData } from "./$types";
  import DotLoading from "../../../components/DotLoading.svelte";
  import Input from "../../../components/Inputs/index.svelte";

  export let form: ActionData;
  let loading = false;
</script>

<svelte:head>
  <title>Registrar-se</title>
</svelte:head>

<section
  class="m-auto max-w-md my-12 py-8 bg-neutral-950 rounded-lg px-8 border-neutral-800 border"
>
  <h1 class="text-neutral-100 text-3xl text-center mb-8 font-medium">
    Registrar
  </h1>
  <form
    method="POST"
    action="?/register"
    class="flex flex-col mb-4"
    use:enhance={() => {
      loading = true;
      return async ({ result }) => {
        if (result.type === "redirect") {
          goto(result.location);
        } else {
          await applyAction(result);
        }
        loading = false;
      };
    }}
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
      required
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
    <span class="h-4 mb-4">
      {#if form?.infoExists}<p class="text-red-400">{form?.message}</p>{/if}
      {#if form?.fields}<p class="text-red-400">{form?.message}</p>{/if}
    </span>
    <label for="accept" class="flex items-baseline gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="prom_accept"
        id="accept"
        class="checked:accent-orange-600 flex-none"
      />
      <span class="text-neutral-100">
        Quero receber ofertas e novidades por e-mail, SMS, WhatsApp
      </span>
    </label>
    <button
      type="submit"
      class="bg-orange-600 rounded-full w-max float-right text-orange-50 ml-auto mt-6 hover:opacity-95"
      disabled={loading}
      data-loading={loading}
      aria-label="Registre-se"
    >
      <span class="block py-2 px-6 h-10">
        {#if loading}
          <DotLoading />
        {:else}
          Registre-se
        {/if}
      </span>
    </button>
  </form>
  <a
    href="/auth/login"
    class="hover:underline underline-offset-4 text-orange-500"
  >
    Login
  </a>
</section>
