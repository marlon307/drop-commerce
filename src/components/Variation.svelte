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

  let disableInput: IVariantsProduct[] = [];

  function check(name: string, option: string) {
    bindsVariants[name] = option;
    const values = Object.entries(bindsVariants);
    disableInput = variants.reduce((acc, crr) => {
      if (
        !crr.availableForSale &&
        values.some(([_, vv]) => crr.title.includes(vv))
      ) {
        return [...acc, crr];
      }
      return acc;
    }, [] as IVariantsProduct[]);
  }

  $: checkDisable = (option: string) => {
    const values = Object.values(bindsVariants);
    return disableInput.find(
      (itemDisable) =>
        itemDisable.title.includes(option) && !values.includes(option)
    );
  };
</script>

{#each listOptions as { values, name }}
  <dl class="mb-8">
    <dt class="mb-4 text-sm uppercase tracking-wide">{name}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each values as option (option)}
        <button
          type="button"
          class="border border-neutral-700 aria-[disabled=true]:opacity-50 rounded-2xl px-2 p-1 data-[active=true]:ring-2 data-[active=true]:ring-orange-600"
          aria-label={option}
          aria-disabled={!!checkDisable(option)}
          disabled={!!checkDisable(option) || bindsVariants[name] === option}
          data-active={bindsVariants[name] === option && !checkDisable(option)}
          on:click={() => check(name, option)}
        >
          {option}
        </button>
      {/each}
    </dd>
  </dl>
{/each}

<button
  class="relative p-4 w-full bg-orange-400 rounded-full disabled:cursor-not-allowed"
  type="button"
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
