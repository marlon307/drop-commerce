<script lang="ts">
  import { page } from "$app/state";
  import MapPin from "@lucide/svelte/icons/map-pin";
  import Box from "@lucide/svelte/icons/box";
  import User from "@lucide/svelte/icons/user";
  import Heart from "@lucide/svelte/icons/heart";
  let { children } = $props();
</script>

<svelte:head>
  <title>Conta - Big Uti</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<section
  class="mx-auto mt-4 flex w-full max-w-5xl flex-col gap-6 px-4 md:mt-8 md:flex-row"
>
  <ul class="flex w-full gap-4 overflow-auto md:max-w-48 md:flex-col md:gap-2">
    <li
      class="rounded-lg text-slate-600 hover:text-slate-800 data-[active=true]:bg-slate-200/60 data-[active=true]:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200 dark:data-[active=true]:bg-neutral-400/20 dark:data-[active=true]:text-neutral-100"
      data-active={page.url.pathname === "/conta"}
    >
      <a href="/conta" class="flex items-center gap-3 px-3 py-2">
        <User size="16" />
        Conta
      </a>
    </li>
    <li
      class="rounded-lg text-slate-600 hover:text-slate-800 data-[active=true]:bg-slate-200/60 data-[active=true]:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200 dark:data-[active=true]:bg-neutral-400/20 dark:data-[active=true]:text-neutral-100"
      data-active={page.url.pathname === "/conta/pedidos"}
    >
      <a href="/conta/pedidos" class="flex items-center gap-3 px-3 py-2">
        <Box size="16" />
        Pedidos
      </a>
    </li>
    <li
      class="rounded-lg text-slate-600 hover:text-slate-800 data-[active=true]:bg-slate-200/60 data-[active=true]:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200 dark:data-[active=true]:bg-neutral-400/20 dark:data-[active=true]:text-neutral-100"
      data-active={page.url.pathname === "/conta/favoritos"}
    >
      <a href="/conta/favoritos" class="flex items-center gap-3 px-3 py-2">
        <Heart size="16" />
        Favoritos
      </a>
    </li>
    <li
      class="rounded-lg text-slate-600 hover:text-slate-800 data-[active=true]:bg-slate-200/60 data-[active=true]:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200 dark:data-[active=true]:bg-neutral-400/20 dark:data-[active=true]:text-neutral-100"
      data-active={page.url.pathname === "/conta/endereco"}
    >
      <a href="/conta/endereco" class="flex items-center gap-3 px-3 py-2">
        <MapPin size="16" />
        Endereços
      </a>
    </li>
  </ul>
  <div class="w-full rounded-xl">
    {@render children()}
  </div>
</section>
