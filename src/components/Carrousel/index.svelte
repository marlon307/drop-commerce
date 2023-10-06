<script lang="ts">
  import Card from "../../components/Product/Card.svelte";
  export let arrayContent: IProducts[];
</script>

<div class="w-full overflow-x-hidden pb-6 mt-8">
  <ul class="flex animate-carousel gap-4">
    {#each arrayContent as content}
      <li class="w-full max-w-xs aspect-square flex-none">
        <Card productProps={content} />
      </li>
    {/each}
  </ul>
</div>
