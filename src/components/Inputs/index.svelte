<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  interface $$Props extends HTMLInputAttributes {
    description?: string;
    err?: string;
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
    class="h-10 w-full appearance-none rounded-lg border border-neutral-700 bg-transparent px-4 py-2 text-neutral-100 outline-none not-placeholder-shown:invalid:border-red-500 sm:text-sm"
  />
  {#if $$restProps.description}
    <p class="mt-1 block text-xs text-slate-500">{$$restProps.description}</p>
  {/if}
  {#if $$restProps.err}
    <p class="mt-1 block text-xs text-red-500">{$$restProps.err}</p>
  {/if}
</label>
