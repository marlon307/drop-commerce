<script lang="ts">
  function oninput(event: Event & { currentTarget: HTMLInputElement }) {
    const value = event.currentTarget?.value.replace(/\D/g, "");
    // /^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/
    // "($1) $2 $3-$4"
    $$restProps.value = value.replace($$restProps.pattern, $$restProps.format);
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
    {oninput}
  />
  {#if $$restProps.description}
    <p class="mt-1 block text-xs text-slate-500">{$$restProps.description}</p>
  {/if}
</label>
