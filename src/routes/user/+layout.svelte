<section class="flex gap-6 flex-col md:flex-row w-full">
  <ul class="flex gap-2 md:flex-col w-full md:max-w-xs overflow-auto">
    <li class="rounded-lg bg-neutral-950/80 hover:bg-neutral-950">
      <a href="/user" class="px-6 py-2 text-neutral-100 block">Conta</a>
    </li>
    <li class="rounded-lg bg-neutral-950/80 hover:bg-neutral-950">
      <a href="/user/orders" class="px-6 py-2 text-neutral-100 block">
        Pedidos
      </a>
    </li>
    <li class="rounded-lg bg-neutral-950/80 hover:bg-neutral-950">
      <a href="/user" class="px-6 py-2 text-neutral-100 block">Endereços</a>
    </li>
  </ul>
  <div class="w-full bg-neutral-950 p-6 rounded-xl border border-neutral-800">
    <slot />
  </div>
</section>
