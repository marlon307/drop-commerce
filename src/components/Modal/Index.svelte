<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import type { Snippet } from "svelte";

  let {
    showModal = $bindable(false),
    title = "Menu",
    children,
  }: {
    showModal: boolean;
    title?: string;
    children: Snippet;
  } = $props();

  let dialog = $state<HTMLDialogElement | null>(null);
  $effect(() => {
    if (dialog && showModal) dialog.showModal();
  });

  function handleClose() {
    dialog?.close();
    showModal = false;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<dialog
  bind:this={dialog}
  onclose={handleClose}
  onclick={handleClose}
  class="fixed bottom-0 z-50 mx-auto mt-auto w-full max-w-xl appearance-none rounded-2xl rounded-b-none border border-neutral-800 bg-neutral-950 backdrop:bg-black/30 backdrop:backdrop-blur-sm sm:m-auto md:top-0 md:h-min md:rounded-b-2xl"
>
  <div onclick={(e) => e.stopPropagation()} class="block p-6">
    <div class="mb-6 flex w-full items-center justify-between">
      <h1 class="text-2xl font-medium text-neutral-100">{title}</h1>
      <button
        type="button"
        class="cursor-pointer rounded-lg border border-neutral-700 p-2 *:stroke-neutral-100"
        onclick={() => dialog?.close()}
        aria-label="Fechar"
      >
        <X size="22" />
      </button>
    </div>
    {@render children()}
  </div>
</dialog>
