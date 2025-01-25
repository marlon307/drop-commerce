<script lang="ts">
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>{page.error?.message} - {page.status}</title>
</svelte:head>

<h1
  class="mt-[20%] mx-auto w-fit max-w-xl text-center text-7xl font-bold text-neutral-100"
>
  Ops! Voce precisa de um token!
</h1>
<p
  class="mt-6 mx-auto flex w-fit items-center justify-between gap-2 bg-blue-600 px-4 text-3xl font-semibold text-neutral-100"
>
  <span class="text-base">status:</span>
  {page.status}
</p>
