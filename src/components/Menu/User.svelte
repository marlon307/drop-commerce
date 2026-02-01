<script lang="ts">
  import { page } from "$app/state";
  import Dialog from "$components/Modal/Dialog.svelte";
  import Box from "@lucide/svelte/icons/box";
  import User from "@lucide/svelte/icons/user";
  import LogIn from "@lucide/svelte/icons/log-in";
  import MapPin from "@lucide/svelte/icons/map-pin";
  let showModal = false;
  let customer = page.data.customer;
</script>

<button
  class="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-neutral-700 text-neutral-50 transition-colors"
  onclick={() => (showModal = true)}
  aria-label="Menu do usuário"
>
  <span class="h-4 transition-all ease-in-out hover:scale-110">
    <User size="18" />
  </span>
</button>

<Dialog bind:showModal>
  <ul class="mx-auto space-y-3 pt-6">
    {#if customer?.email}
      <li class="rounded-lg hover:bg-neutral-400/20">
        <a
          href="/conta"
          class="flex items-center gap-2 px-3 py-2 text-neutral-100"
        >
          <User size="18" />
          Conta
        </a>
      </li>
      <li class="rounded-lg hover:bg-neutral-400/20">
        <a
          href="/conta/pedidos"
          class="flex items-center gap-2 px-3 py-2 text-neutral-100"
        >
          <Box size="18" />
          Pedidos
        </a>
      </li>
      <li class="rounded-lg hover:bg-neutral-400/20">
        <a
          href="/conta/endereco"
          class="flex items-center gap-2 px-3 py-2 text-neutral-100"
        >
          <MapPin size="18" />
          Endereços
        </a>
      </li>
    {:else}
      <li class="rounded-lg text-xl hover:bg-neutral-400/20">
        <a
          href="/auth/login"
          class="flex items-center justify-center gap-2 px-3 py-2 text-neutral-100"
        >
          <LogIn size="18" />
          Entrar
        </a>
      </li>
      <li class="block pt-6">
        <a
          href="/auth/cadastrar"
          class="block w-full text-center text-base text-neutral-100 underline-offset-4 hover:underline"
        >
          Registrar
        </a>
      </li>
    {/if}
  </ul>
</Dialog>
