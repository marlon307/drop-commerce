<script lang="ts">
  import Card from "../../components/Product/Card.svelte";
</script>

<section
  class="flex gap-6 w-full justify-between items-start px-4 mt-6 flex-col md:flex-row"
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
      class="text-neutral-100 space-y-1 hidden group-hover:block absolute md:relative md:block bg-neutral-950 md:bg-neutral-900 w-full left-0 p-4 md:p-0 z-50 rounded-md"
    >
      <li>Todas</li>
      <li>sd</li>
      <li>sd</li>
      <li>sd</li>
      <li>sd</li>
    </ul>
  </nav>
  <div class="order-last min-h-screen w-full md:order-none">
    <ul
      class="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li class="aspect-square w-full">
        <Card />
      </li>
      <li class="aspect-square w-full">
        <Card />
      </li>
      <li class="aspect-square w-full">
        <Card />
      </li>
      <li class="aspect-square w-full">
        <Card />
      </li>
      <li class="aspect-square w-full">
        <Card />
      </li>
    </ul>
  </div>
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
      class="text-neutral-100 space-y-1 hidden group-hover:block absolute md:relative md:block bg-neutral-950 md:bg-neutral-900 w-full left-0 p-4 md:p-0 z-50 rounded-md"
    >
      <li>Relevancia</li>
      <li>Lançamentos</li>
      <li>Menor Preço</li>
      <li>Maior Preço</li>
    </ul>
  </nav>
</section>
