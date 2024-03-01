<script lang="ts">
  export let showModal: boolean; // boolean
  export let title: string;

  let dialog: HTMLDialogElement; // HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class="fixed bottom-0 top-auto z-50 h-full w-full max-w-xl appearance-none rounded-2xl rounded-b-none border border-neutral-800 bg-neutral-950 backdrop:bg-black/30 backdrop:backdrop-blur-sm md:top-0 md:h-min md:rounded-b-2xl"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="block h-full p-6">
    <div class="mb-6 flex w-full items-center justify-between">
      <h1 class="text-2xl font-medium text-neutral-100">{title}</h1>
      <button
        type="button"
        class="rounded-lg border border-neutral-700 p-2"
        on:click={() => dialog.close()}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white transition-all ease-in-out hover:scale-110"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <slot />
  </div>
</dialog>
