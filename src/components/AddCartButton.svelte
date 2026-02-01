<script lang="ts">
  import { goto } from "$app/navigation";
  import { addToCart } from "$lib/cart/addCart";
  import Plus from "@lucide/svelte/icons/plus";
  import type { ProductVariant } from "../@types/storefront.types";
  import DotLoading from "./DotLoading.svelte";

  let {
    variants,
    bindsVariants,
  }: {
    variants: { node: ProductVariant }[];
    bindsVariants: { [k: string]: string };
  } = $props();

  let promisse = $state<Promise<void>>();
  let loading = $state(false);

  async function onclick() {
    const vriantInfo = variants.find((v) =>
      v.node.selectedOptions.every((option) =>
        Object.values(bindsVariants).includes(option.value),
      ),
    );
    if (vriantInfo) {
      loading = true;
      promisse = addToCart(vriantInfo.node.id).then(() => {
        loading = false;
      });
    } else {
      await goto("#variants");
    }
  }
</script>

<button
  class="relative flex w-full cursor-pointer items-center justify-center rounded-full bg-blue-600 p-4 text-neutral-50 hover:opacity-90 disabled:cursor-not-allowed"
  type="button"
  {onclick}
  disabled={loading}
>
  Adiconar ao carrinho
  <span class="absolute left-4">
    {#await promisse}
      <DotLoading />
    {:then}
      <Plus size="20" />
    {/await}
  </span>
</button>
