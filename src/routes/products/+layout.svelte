<script lang="ts">
  export let data;
</script>

<section
  class="flex gap-6 w-full justify-between items-start mt-6 flex-col md:flex-row"
>
  <nav
    class="order-first w-full flex-none md:max-w-[125px] group cursor-pointer relative"
  >
    <span
      class="text-neutral-100 md:text-neutral-500 text-sm mb-2 px-4 p-2 border w-full inline-block rounded-lg border-neutral-700 md:border-transparent md:mb-2 md:p-0"
    >
      Categorias
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.7"
        stroke="currentColor"
        aria-hidden="true"
        class="w-4 h-5 float-right m-auto md:hidden"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </span>
    <ul
      class="text-neutral-100 md:space-y-1 hidden group-hover:block absolute md:relative md:block bg-neutral-950 md:bg-neutral-900 w-full left-0 p-4 md:p-0 z-40 rounded-md space-y-3"
    >
      <li>
        <a
          href="/products"
          class="text-neutral-100 hover:underline underline-offset-4 block"
        >
          Tudo
        </a>
      </li>
      {#each data.collections as categorie}
        <li>
          <a
            href={`/products/${categorie.handle}`}
            class="text-neutral-100 hover:underline underline-offset-4 block"
            >{categorie.title}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
  <slot />
  <nav class="w-full flex-none md:max-w-[125px] group cursor-pointer relative">
    <span
      class="text-neutral-100 md:text-neutral-500 text-sm mb-2 px-4 p-2 border w-full block rounded-lg border-neutral-700 md:border-transparent md:mb-2 md:p-0"
    >
      Ordenar por
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.7"
        stroke="currentColor"
        aria-hidden="true"
        class="w-4 h-5 float-right m-auto md:hidden"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </span>
    <ul
      class="text-neutral-100 md:space-y-1 hidden group-hover:block absolute md:relative md:block bg-neutral-950 md:bg-neutral-900 w-full left-0 p-4 md:p-0 z-40 rounded-md space-y-3"
    >
      <li>
        <a
          href="/products?s=Relevancia"
          class="text-neutral-100 hover:underline underline-offset-4 block"
        >
          Relevancia
        </a>
      </li>
      <li>
        <a
          href="/products?s=Lançamentos"
          class="text-neutral-100 hover:underline underline-offset-4 block"
        >
          Lançamentos
        </a>
      </li>
      <li>
        <a
          href="/products?s=Menor Preço"
          class="text-neutral-100 hover:underline underline-offset-4 block"
        >
          Menor Preço
        </a>
      </li>
      <li>
        <a
          href="/products?s=Maior Preço"
          class="text-neutral-100 hover:underline underline-offset-4 block"
        >
          Maior Preço
        </a>
      </li>
    </ul>
  </nav>
</section>
