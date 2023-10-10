<script lang="ts">
  import DotLoading from "./DotLoading.svelte";

  export let variants: any;
  let disabled = false;

  async function addToCart(variantsObj?: object) {
    if (variantsObj) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...variantsObj,
        }),
      });
      const json = await res.json();
      console.log(json);
      disabled = false;
    }
  }

  let promisse = addToCart();
  function handlerClick() {
    disabled = true;
    promisse = addToCart(variants[0]);
  }
</script>

<dl class="mb-8">
  <dt class="mb-4 text-sm uppercase tracking-wide">cor</dt>
  <dd class="flex flex-wrap gap-3">
    <button
      aria-disabled="false"
      title="Color Black"
      class="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 cursor-default ring-2 ring-blue-600"
    >
      Black
    </button>
  </dd>
</dl>
<dl class="mb-8">
  <dt class="mb-4 text-sm uppercase tracking-wide">Tamanho</dt>
  <dd class="flex flex-wrap gap-3">
    <button
      aria-disabled="false"
      title="Size XS"
      class="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600"
    >
      XS
    </button>
  </dd>
</dl>
<button
  class="relative p-4 w-full bg-orange-400 rounded-full disabled:cursor-not-allowed"
  on:click={handlerClick}
  {disabled}
>
  Adiconar ao carrinho
  {#await promisse}
    <div class="absolute top-1/2 -translate-y-1/2">
      <DotLoading />
    </div>
  {/await}
</button>
