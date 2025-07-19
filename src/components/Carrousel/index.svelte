<script lang="ts">
  import Card from "$components/Product/Card.svelte";

  let { arrayContent }: { arrayContent: IPoductCard[] } = $props();
</script>

<div class="mx-auto mb-4 w-full max-w-screen-2xl overflow-x-hidden px-4 pb-6">
  <h3 class="pb-4 text-2xl font-bold text-neutral-100">Destaques</h3>
  <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each arrayContent as content, index ((content.node.handle, index))}
      <li
        class="aspect-square w-full first:col-span-1 first:row-span-2 first:h-full"
      >
        <Card productProps={content.node} />
      </li>
    {/each}
  </ul>
</div>
