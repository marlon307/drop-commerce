<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import { removeToast, toasts } from "./toast.svelte";
  import { fly, fade } from "svelte/transition";

  const variants = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };
</script>

<div class="fixed bottom-4 left-2/4 z-51 flex -translate-x-2/4 flex-col gap-2">
  {#each toasts as toast (toast.id)}
    <div
      in:fly={{ y: 20, duration: 200 }}
      out:fade={{ duration: 150 }}
      class={`flex min-w-55 items-center gap-2 rounded-lg px-4 py-3 text-sm text-white shadow-lg
				${variants[toast.type || "info"]}`}
    >
      <span class="flex-1">
        {toast.message}
      </span>
      <button
        class="p-1 text-white opacity-70 transition hover:opacity-100"
        aria-label="Fechar"
        onclick={() => removeToast(toast.id ?? 0)}
      >
        <X size="18" />
      </button>
    </div>
  {/each}
</div>
