<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import type { Snippet } from "svelte";

  let {
    showModal = $bindable(false),
    titleDialog = "Menu",
    children,
  }: {
    showModal: boolean;
    titleDialog?: string;
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
  class="animate-menu-right fixed bottom-0 z-50 m-0 ml-auto min-h-screen w-full max-w-md border-l border-neutral-700 bg-neutral-950/95 backdrop-blur-xl backdrop:bg-black/30 backdrop:backdrop-blur-sm"
>
  <div onclick={(e) => e.stopPropagation()} class="block h-screen p-6">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-xl font-semibold text-neutral-100">{titleDialog}</h1>
      <button
        type="button"
        class="cursor-pointer rounded-lg border border-neutral-700 p-2 *:stroke-neutral-100"
        onclick={handleClose}
        data-close
        aria-label="Fechar"
      >
        <X size="22" />
      </button>
    </div>
    {@render children()}
  </div>
</dialog>
