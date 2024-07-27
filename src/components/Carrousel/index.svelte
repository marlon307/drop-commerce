<script lang="ts">
  import Card from "$components/Product/Card.svelte";

  export let arrayContent: IPoductCard[];
</script>

<div class="mt-8 w-full overflow-auto pb-6 md:overflow-x-hidden">
  <h3
    class="max-w-screen-2xl mx-auto px-4 pb-4 text-2xl font-bold text-neutral-100"
  >
    Destaques
  </h3>
  <ul class="animate-carousel flex gap-4">
    {#each [...arrayContent, ...arrayContent, ...arrayContent] as content, index ((content.handle, index))}
      <li class="aspect-square w-full max-w-xs flex-none">
        <Card productProps={content} />
      </li>
    {/each}
  </ul>
</div>
