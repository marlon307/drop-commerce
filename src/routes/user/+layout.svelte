<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Conta</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<section class="flex gap-6 flex-col md:flex-row w-full">
  <ul class="flex gap-2 md:flex-col w-full md:max-w-xs overflow-auto">
    <li
      class="bg-neutral-950/80 hover:bg-neutral-950 data-[active=true]:border-orange-600 border rounded-lg border-neutral-800"
      data-active={$page.url.pathname === "/user"}
    >
      <a href="/user" class="px-6 py-2 text-neutral-100 block"> Conta </a>
    </li>
    <li
      class="bg-neutral-950/80 hover:bg-neutral-950 data-[active=true]:border-orange-600 border rounded-lg border-neutral-800"
      data-active={$page.url.pathname === "/user/orders"}
    >
      <a href="/user/orders" class="px-6 py-2 text-neutral-100 block">
        Pedidos
      </a>
    </li>
    <li
      class="bg-neutral-950/80 hover:bg-neutral-950 data-[active=true]:border-orange-600 border rounded-lg border-neutral-800"
      data-active={$page.url.pathname === "/user/address"}
    >
      <a href="/user" class="px-6 py-2 text-neutral-100 block">Endereços </a>
    </li>
  </ul>
  <div class="w-full bg-neutral-950 p-6 rounded-xl border border-neutral-800">
    <slot />
  </div>
</section>
