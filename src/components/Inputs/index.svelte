<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  interface $$Props extends HTMLInputAttributes {
    description?: string;
  }
</script>

<label
  class="mb-4 block w-full"
  for={$$restProps.id}
  aria-label={$$restProps["aria-label"]}
>
  {#if $$restProps["aria-label"]}
    <span class="mb-2 block text-sm font-medium text-neutral-100">
      {$$restProps["aria-label"]}
    </span>
  {/if}
  <input
    {...$$restProps}
    class="h-10 w-full appearance-none rounded-lg border border-neutral-700 bg-transparent py-2 px-4 text-neutral-100 outline-none sm:text-sm [&:not(:placeholder-shown)]:invalid:border-red-500"
  />
  {#if $$restProps.description}
    <p class="mt-1 block text-xs text-slate-500">{$$restProps.description}</p>
  {/if}
</label>
