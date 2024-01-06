<script lang="ts">
  import { page } from "$app/stores";
  import logo from "$lib/images/svelte-logo.svg";
  import Search from "./Search/index.svelte";
  import { Cart, CategoriesSearch, User } from "./Menu";
</script>

<header class="flex items-center justify-between gap-4 bg-neutral-900 p-4">
  <CategoriesSearch collectionsList={$page.data.collections} />
  <div class="hidden gap-6 md:flex">
    <div class="block w-max">
      <a href="/" class="flex items-center justify-center gap-3">
        <span
          class="flex size-10 items-center justify-center rounded-xl border border-neutral-700 bg-black"
        >
          <img src={logo} alt="SvelteKit" class="m-auto size-6" />
        </span>
        <span class="text-sm font-medium uppercase text-neutral-100">
          Name Store
        </span>
      </a>
    </div>
    <ul
      class="flex items-center justify-start gap-6 overflow-hidden truncate text-sm"
    >
      <li>
        <a
          href="/produtos"
          class="text-neutral-400 underline-offset-4 hover:text-neutral-300 hover:underline"
        >
          Tudo
        </a>
      </li>
      {#each $page.data.collections.slice(0, 2) as colletion (colletion.handle)}
        <li>
          <a
            href={`/produtos/${colletion.handle}`}
            class="text-neutral-400 underline-offset-4 hover:text-neutral-300 hover:underline"
          >
            {colletion.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="md:hidden">
    <a href="/" class="flex items-center justify-center gap-3">
      <span
        class="flex size-10 items-center justify-center rounded-xl border border-neutral-700 bg-black"
      >
        <img src={logo} alt="SvelteKit" class="m-auto size-6" />
      </span>
      <span class="text-sm font-medium uppercase text-neutral-100">
        Name Store
      </span>
    </a>
  </div>
  <div class="mx-auto hidden w-2/5 max-w-lg md:block xl:w-full">
    <Search idSearch="search" />
  </div>
  <nav>
    <ul class="flex gap-4">
      <li>
        <User />
      </li>
      <li>
        <Cart />
      </li>
    </ul>
  </nav>
</header>
