<script lang="ts">
  import { page } from "$app/state";
  import Heart from "@lucide/svelte/icons/heart";
  import { onMount } from "svelte";
  import DotLoading from "./DotLoading.svelte";
  import { showToast } from "./Toast/toast.svelte";

  let { productId }: { productId: string } = $props();

  let favorites = $state<string[]>([]);
  let loading = $state(false);
  const isLogged = $derived(Boolean(page.data.customer?.id));
  const isFavorite = $derived(favorites.includes(productId));

  $effect(() => {
    favorites = Array.isArray(page.data.favorites) ? [...page.data.favorites] : [];
  });

  onMount(() => {
    const onFavoritesUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ favorites?: string[] }>).detail;
      if (Array.isArray(detail?.favorites)) {
        favorites = detail.favorites;
      }
    };

    window.addEventListener("favorites:updated", onFavoritesUpdated);
    return () => {
      window.removeEventListener("favorites:updated", onFavoritesUpdated);
    };
  });

  async function toggleFavorite() {
    if (!isLogged) {
      showToast({
        message: "Faça login para favoritar produtos.",
        type: "info",
      });
      return;
    }

    if (loading || !productId) return;

    loading = true;
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const payload = (await response.json()) as {
        favorites?: string[];
        isFavorite?: boolean;
        message?: string;
      };

      if (!response.ok) {
        showToast({
          message: payload.message || "Não foi possível atualizar os favoritos.",
          type: "error",
        });
        return;
      }

      favorites = Array.isArray(payload.favorites) ? payload.favorites : favorites;

      window.dispatchEvent(
        new CustomEvent("favorites:updated", {
          detail: { favorites },
        }),
      );

      showToast({
        message: payload.isFavorite
          ? "Produto adicionado aos favoritos."
          : "Produto removido dos favoritos.",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      showToast({
        message: "Erro inesperado ao atualizar os favoritos.",
        type: "error",
      });
    } finally {
      loading = false;
    }
  }
</script>

<button
  type="button"
  class="mt-4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-slate-300 bg-slate-100 px-4 py-3 text-slate-800 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
  onclick={toggleFavorite}
  aria-pressed={isFavorite}
  data-active={isFavorite}
  disabled={loading || !productId}
  toolname="toggleFavorite"
  tooldescription="Adicionar ou remover produto dos favoritos do usuário"
>
  <span class="inline-flex h-5 w-5 items-center justify-center">
    {#if loading}
      <DotLoading />
    {:else}
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
    {/if}
  </span>
  <span>
    {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
  </span>
</button>
