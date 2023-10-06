<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  interface Props extends HTMLInputAttributes {
    description?: string;
  }
  let inputProps: Props;
  $: ({ ...inputProps } = $$props);
</script>

<label
  class="mb-4 block w-full"
  for={inputProps.id}
  aria-label={inputProps["aria-label"]}
>
  {#if inputProps["aria-label"]}
    <span class="mb-2 block text-sm font-medium text-neutral-100"
      >{inputProps["aria-label"]}</span
    >
  {/if}
  <input
    class="h-10 w-full appearance-none rounded-lg border border-neutral-700 bg-transparent px-4 py-2 text-neutral-100 outline-none sm:text-sm [&:not(:placeholder-shown)]:invalid:border-red-500"
    {...inputProps}
  />
  {#if inputProps.description}
    <p class="mt-1 block text-xs text-slate-500">{inputProps.description}</p>
  {/if}
</label>
