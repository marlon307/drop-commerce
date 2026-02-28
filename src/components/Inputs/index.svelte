<label
  class="mb-4 block w-full"
  for={$$restProps.id}
  aria-label={$$restProps["aria-label"]}
>
  {#if $$restProps["aria-label"]}
    <span
      class="mb-2 block text-sm font-medium text-slate-900 dark:text-neutral-100"
    >
      {$$restProps["aria-label"]}
    </span>
  {/if}
  <input
    {...$$restProps}
    class="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-slate-900 outline-none not-placeholder-shown:invalid:border-red-500 sm:text-sm dark:border-neutral-700 dark:text-neutral-100"
  />
  {#if $$restProps.description}
    <p class="mt-1 block text-xs text-slate-500">{$$restProps.description}</p>
  {/if}
  {#if $$restProps.err}
    <p class="mt-1 block text-xs text-red-500">{$$restProps.err}</p>
  {/if}
</label>
