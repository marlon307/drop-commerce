<script lang="ts">
  import Card from "../../components/Product/Card.svelte";
  export let arrayContent: IPoductCard[];
</script>

<div class="mt-8 w-full overflow-x-hidden pb-6">
  <ul class="flex animate-carousel gap-4">
    {#each arrayContent as content (content.handle)}
      <li class="aspect-square w-full max-w-xs flex-none">
        <Card productProps={content} />
      </li>
    {/each}
  </ul>
</div>
