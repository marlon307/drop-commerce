<script lang="ts">
  import Search from "$components/Search/index.svelte";
  import Modal from "$components/Modal/Index.svelte";
  import type { Collection } from "../../@types/storefront.types";
  import { SearchIcon } from "@lucide/svelte";
  let { collectionsList }: { collectionsList: Collection[] } = $props();
  let showModal = $state(false);
</script>

<div class="md:hidden">
  <button
    class="relative flex size-11 cursor-pointer items-center justify-center rounded-md border border-neutral-700 text-neutral-50 transition-colors"
    onclick={() => (showModal = true)}
    aria-label="Menu de pesquisa"
  >
    <SearchIcon size="18" />
  </button>
</div>
<Modal bind:showModal title="Menu">
  <Search idSearch="search-menu" />
  <ul class="mx-auto mt-6 w-full max-w-lg space-y-2 text-neutral-50">
    <li>
      <a
        href="/produtos"
        class="text-neutral-100 underline-offset-4 hover:underline"
      >
        Todos
      </a>
    </li>
    {#each collectionsList as collection (collection.handle)}
      <li>
        <a
          href={`/produtos/${collection.handle}`}
          class="text-neutral-100 underline-offset-4 hover:underline"
        >
          {collection.title}
        </a>
      </li>
    {/each}
  </ul>
</Modal>
