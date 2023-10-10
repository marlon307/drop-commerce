<script lang="ts">
  import DotLoading from "./DotLoading.svelte";

  export let variants: IVariantsProduct[];
  let disabled = false;

  async function addToCart(variantsObj?: IVariantsProduct) {
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
      // console.log(json);
      disabled = false;
      return json;
    }
  }

  let promisse: Promise<IVariantsProduct>;
  function handlerClick() {
    disabled = true;
    promisse = addToCart(variants[0]);
  }
  const object = new Map();
  variants.forEach((varinat, index) => {
    varinat.selectedOptions.forEach((option) => {
      if (!object.has(option.name)) {
        object.set(option.name, [option.value]);
      }
      object.set(option.name, [...object.get(option.name), option.value]);
    });
  });
</script>

{#each object as [variant, options]}
  <dl class="mb-8">
    <dt class="mb-4 text-sm uppercase tracking-wide">{variant}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each [...new Set(options)] as option, index}
        <label
          for={`${index}-${option}-${variant}`}
          class="[&:has(input:checked)]:border-orange-600 border border-neutral-700 rounded-3xl px-3 py-1 cursor-pointer"
        >
          <span>{option}</span>
          <input
            id={`${index}-${option}-${variant}`}
            type="radio"
            name={variant}
            class="hidden"
            required
          />
        </label>
      {/each}
    </dd>
  </dl>
{/each}

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
