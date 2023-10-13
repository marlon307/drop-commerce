<script lang="ts">
  import DotLoading from "./DotLoading.svelte";

  export let variants: IVariantsProduct[];
  export let listOptions: IOption[];
  let disabled = false;
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
        headers: { "Content-Type": "application/json" },
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

  const combinations: { [k: string]: string | boolean }[] = variants.map(
    (variant) => ({
      id: variant.id,
      availableForSale: variant.availableForSale,
      ...variant.selectedOptions.reduce(
        (accumulator, option) => ({
          ...accumulator,
          [option.name]: option.value,
        }),
        {}
      ),
    })
  );

  function checkIsAvalible() {
    const filtered = Array.from(Object.entries(bindsVariants)).filter(
      ([key, value]) =>
        listOptions.find(
          (option) => option.name === key && option.values.includes(value)
        )
    );
    const isAvailableForSale = combinations.find((combination) =>
      filtered.every(
        ([key, value]) =>
          combination[key] === value && combination.availableForSale
      )
    );
    return isAvailableForSale;
  }
</script>

{#each listOptions as { values, name }}
  <dl class="mb-8">
    <dt class="mb-4 text-sm uppercase tracking-wide">{name}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each values as option}
        <button
          type="button"
          class="disabled:opacity-50 border border-neutral-700 aria-[disabled=true]:opacity-50 rounded-2xl px-2 p-1 data-[active=true]:ring-2 data-[active=true]:ring-orange-600"
          aria-disabled={bindsVariants[name] === option && !checkIsAvalible()}
          disabled={bindsVariants[name] === option && !checkIsAvalible()}
          data-active={bindsVariants[name] === option && !!checkIsAvalible()}
          on:click={() => (bindsVariants[name] = option)}
        >
          {option}
        </button>
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
