<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Conta</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<section class="mt-4 flex w-full flex-col gap-6 md:mt-8 md:flex-row">
  <ul class="flex w-full gap-2 overflow-auto md:max-w-xs md:flex-col">
    <li
      class="rounded-lg border border-neutral-800 bg-neutral-950/80 hover:bg-neutral-950 data-[active=true]:border-orange-600"
      data-active={$page.url.pathname === "/user"}
    >
      <a href="/user" class="block px-6 py-2 text-neutral-100"> Conta </a>
    </li>
    <li
      class="rounded-lg border border-neutral-800 bg-neutral-950/80 hover:bg-neutral-950 data-[active=true]:border-orange-600"
      data-active={$page.url.pathname === "/user/orders"}
    >
      <a href="/user/orders" class="block px-6 py-2 text-neutral-100">
        Pedidos
      </a>
    </li>
    <li
      class="rounded-lg border border-neutral-800 bg-neutral-950/80 hover:bg-neutral-950 data-[active=true]:border-orange-600"
      data-active={$page.url.pathname === "/user/address"}
    >
      <a href="/user/address" class="block px-6 py-2 text-neutral-100">
        Endereços
      </a>
    </li>
  </ul>
  <div class="w-full rounded-xl">
    <slot />
  </div>
</section>
