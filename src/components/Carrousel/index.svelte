<script lang="ts">
  import Card from "$components/Product/Card.svelte";

  export let arrayContent: IPoductCard[];
</script>

<div class="md: mt-8 w-full overflow-x-hidden pb-6">
  <h3
    class="mx-auto max-w-screen-2xl px-4 pb-4 text-2xl font-bold text-neutral-100"
  >
    Destaques
  </h3>
  <ul class="flex animate-carousel gap-4 hover:[animation-play-state:paused]">
    {#each [...arrayContent, ...arrayContent, ...arrayContent] as content, index ((content.handle, index))}
      <li class="aspect-square w-full max-w-xs flex-none">
        <Card productProps={content} />
      </li>
    {/each}
  </ul>
</div>
