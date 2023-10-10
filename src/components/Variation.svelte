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
  variants.forEach((varinat) => {
    varinat.selectedOptions.forEach((option) => {
      if (!object.has(option.name)) {
        object.set(option.name, [option.value]);
      }
      object.set(option.name, [...object.get(option.name), option.value]);
    });
  });

  let bindsVariants: { [k: string]: string } = {};
  for (let key of object.keys()) {
    bindsVariants[key] = "";
  }
  let disableInput: ISelectedOptions[] = [];
  function handleInputChange(event: Event) {
    const data = event.target as HTMLInputElement;
    disableInput = variants.reduce((acc, crr) => {
      if (!crr.availableForSale && crr.title.includes(data.value))
        return crr.selectedOptions.filter((e) => e.name !== data.name);
      return acc;
    }, [] as ISelectedOptions[]);
  }
</script>

{#each object as [variant, options]}
  <dl class="mb-8">
    <dt class="mb-4 text-sm uppercase tracking-wide">{variant}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each [...new Set(options)] as option, index}
        <label
          for={`${index}-${option}-${variant}`}
          class="[&:has(input:checked)]:ring-orange-600 [&:has(input:checked)]:ring-2 border border-neutral-700 rounded-3xl px-2 py-1 cursor-pointer bg-neutral-900 transition-transform text-sm [&:has(input:enabled)]:hover:scale-105 [&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:opacity-50"
        >
          <span>{option}</span>
          <input
            id={`${index}-${option}-${variant}`}
            type="radio"
            name={variant}
            value={option}
            required
            class="hidden"
            disabled={!!disableInput.find(
              (itemDisable) => itemDisable.value === option
            )}
            bind:group={bindsVariants[variant]}
            on:change={handleInputChange}
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
