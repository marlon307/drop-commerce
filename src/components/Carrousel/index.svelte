<script lang="ts">
  import Card from "$components/Product/Card.svelte";

  export let arrayContent: IPoductCard[];
</script>

<div class="mt-8 w-full overflow-auto pb-6 md:overflow-x-hidden">
  <ul class="flex animate-carousel gap-4">
    {#each [...arrayContent, ...arrayContent, ...arrayContent] as content, index ((content.handle, index))}
      <li class="aspect-square w-full max-w-xs flex-none">
        <Card productProps={content} />
      </li>
    {/each}
  </ul>
</div>
