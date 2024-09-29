<script lang="ts">
  import { goto } from "$app/navigation";
  import { addToCart } from "$lib/cart/addCart";
  import DotLoading from "./DotLoading.svelte";

  export let variants: IVariantsProduct[] = [];
  export let bindsVariants: { [k: string]: string } = {};

  let promisse: Promise<void>;
  let loading = false;

  function onclick() {
    const vriantInfo = variants.find((v) =>
      v.selectedOptions.every((option) =>
        Object.values(bindsVariants).includes(option.value),
      ),
    );
    if (vriantInfo) {
      loading = true;
      promisse = addToCart(vriantInfo.id).then(() => {
        loading = false;
      });
    } else {
      goto("#variants");
    }
  }
</script>

<button
  class="relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 text-neutral-50 hover:opacity-90 disabled:cursor-not-allowed"
  type="button"
  {onclick}
  disabled={loading}
>
  Adiconar ao carrinho
  <span class="absolute left-4">
    {#await promisse}
      <DotLoading />
    {:then}
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
      >
        <path
          d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    {/await}
  </span>
</button>
