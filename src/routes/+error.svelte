<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.error?.message} - {$page.status}</title>
</svelte:head>

<h1 class="mx-auto mt-[20%] w-fit text-7xl font-bold text-neutral-100">
  {$page.error?.message}
</h1>
<p
  class="mx-auto mt-6 flex w-fit items-center justify-between gap-2 bg-blue-600 px-4 text-3xl font-semibold text-neutral-100"
>
  <span class="text-base">status:</span>
  {$page.status}
</p>
<!-- {#if $page.status < 500}
  <span class="text-neutral-400">
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-20"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
      </path>
    </svg>
  </span>
{:else}
  <span> sdsd </span>
{/if} -->
