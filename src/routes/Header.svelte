<script lang="ts">
  import { page } from "$app/stores";
  import logo from "$lib/images/svelte-logo.svg";
  import Search from "../components/Search/index.svelte";
  import { Cart, CategoriesSearch, User } from "../components/Menu";
</script>

<header class="flex items-center justify-between gap-4 bg-neutral-900 py-4">
  <CategoriesSearch collectionsList={$page.data.collections} />
  <div class="hidden gap-4 md:flex">
    <div class="w-max">
      <a href="/">
        <img src={logo} alt="SvelteKit" class="h-10" width="40" height="40" />
      </a>
    </div>
    <ul
      class="flex items-center justify-start gap-4 overflow-hidden truncate text-white"
    >
      <li>
        <a
          href="/products"
          class="text-neutral-100 underline-offset-4 hover:underline"
        >
          Tudo
        </a>
      </li>
      {#each $page.data.collections.slice(0, 2) as colletion (colletion.handle)}
        <li>
          <a
            href={`/products/${colletion.handle}`}
            class="text-neutral-100 underline-offset-4 hover:underline"
          >
            {colletion.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="md:hidden">
    <a href="/">
      <img src={logo} alt="SvelteKit" class="h-10" width="40" height="40" />
    </a>
  </div>
  <div class="mx-auto hidden w-full max-w-lg md:block">
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
