<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Conta</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<section
  class="mx-auto mt-4 flex w-full max-w-5xl flex-col gap-6 md:mt-8 md:flex-row"
>
  <ul
    class="flex w-full gap-8 overflow-auto md:max-w-[125px] md:flex-col md:gap-0"
  >
    <li
      class="border-b border-transparent underline-offset-4 hover:border-neutral-100/50 data-[active=true]:border-orange-50"
      data-active={$page.url.pathname === "/conta"}
    >
      <a href="/conta" class="block py-2 text-neutral-100"> Conta </a>
    </li>
    <li
      class="border-b border-transparent underline-offset-4 hover:border-neutral-100/50 data-[active=true]:border-orange-50"
      data-active={$page.url.pathname === "/conta/pedidos"}
    >
      <a href="/conta/pedidos" class="block py-2 text-neutral-100"> Pedidos </a>
    </li>
    <li
      class="border-b border-transparent underline-offset-4 hover:border-neutral-100/50 data-[active=true]:border-orange-50"
      data-active={$page.url.pathname === "/conta/endereco"}
    >
      <a href="/conta/endereco" class="block py-2 text-neutral-100">
        Endereços
      </a>
    </li>
  </ul>
  <div class="w-full rounded-xl">
    <slot />
  </div>
</section>
