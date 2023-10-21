<script lang="ts">
  import Search from "../Search/index.svelte";
  import Modal from "../Modal/Index.svelte";
  export let collectionsList: ICategorie[] = [];
  let showModal = false;
</script>

<div class="md:hidden">
  <button
    class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-700 text-black transition-colors dark:text-white"
    on:click={() => (showModal = true)}
    aria-label="Menu de pesquisa"
  >
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-4"
    >
      <path
        d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</div>
<Modal bind:showModal title="Menu">
  <Search idSearch="search-menu" />
  <ul class="mx-auto mt-6 w-full max-w-lg space-y-2 text-white">
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
