<script lang="ts">
  import DotLoading from "./DotLoading.svelte";

  export let variants: IVariantsProduct[];
  export let listOptions: IOption[];
  let disabled = false;
  let disableInput: ISelectedOptions[] = [];
  let bindsVariants: { [k: string]: string } = {};
  let promisse: Promise<IVariantsProduct>;

  async function addToCart(props: {
    variantslist: IVariantsProduct[];
    variantsBinds: object;
  }) {
    const vriantInfo = props.variantslist.find(
      (v) => v.title === Object.values(props.variantsBinds).join(" / ")
    );

    if (vriantInfo) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: vriantInfo?.id,
          quantity: 1,
        }),
      });
      const json = await res.json();
      // console.log(json);
      disabled = false;
      return json;
    }
  }

  function handlerClick() {
    disabled = true;
    promisse = addToCart({
      variantslist: variants,
      variantsBinds: bindsVariants,
    });
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

  for (let key of object.keys()) {
    bindsVariants[key] = "";
  }
  function handleInputChange(event: Event) {
    const data = event.target as HTMLInputElement;
    disableInput = variants.reduce((acc, crr) => {
      if (!crr.availableForSale && crr.title.includes(data.value))
        return crr.selectedOptions.filter((e) => e.name !== data.name);
      return acc;
    }, [] as ISelectedOptions[]);
  }
</script>

{#each listOptions as { values, name }}
  <dl class="mb-8">
    <dt class="mb-4 text-sm uppercase tracking-wide">{name}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each values as option, index}
        <label
          for={`${index}-${option}-${name}`}
          class="[&:has(input:checked)]:ring-orange-600 [&:has(input:checked)]:ring-2 border border-neutral-700 rounded-3xl px-2 py-1 cursor-pointer bg-neutral-900 transition-transform text-sm [&:has(input:enabled)]:hover:scale-105 relative :cursor-not-allowed [&:has(input:disabled)]:opacity-50 overflow-hidden"
        >
          <span>{option}</span>
          <span
            class="absolute w-full border-neutral-400 border-t m-auto -rotate-12 left-0 top-1/2 hidden [&:has(input:disabled)]:block"
          >
            <input
              id={`${index}-${option}-${name}`}
              type="radio"
              {name}
              value={option}
              required
              class="hidden"
              disabled={!!disableInput.find(
                (itemDisable) => itemDisable.value === option
              )}
              bind:group={bindsVariants[name]}
              on:change={handleInputChange}
            />
          </span>
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
