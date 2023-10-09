<script lang="ts">
  export let variants: any;
  async function addToCart() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...variants[0],
      }),
    });
    const json = await res.json();
    console.log(json);
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
<button class="p-4 w-full bg-orange-400 rounded-full" on:click={addToCart}>
  Adiconar ao carrinho
</button>
