<script lang="ts">
  import { cartStoreData } from "$lib/cart";
  import DotLoading from "./DotLoading.svelte";

  export let variants: IVariantsProduct[];
  export let listOptions: IOption[];
  export let bindsVariants: { [k: string]: string } = {};

  let disabled = false;
  let promisse: Promise<IVariantsProduct>;

  async function addToCart(props: {
    variantslist: IVariantsProduct[];
    variantsBinds: object;
  }) {
    const vriantInfo = props.variantslist.find((v) =>
      v.selectedOptions.every((op) =>
        Object.values(props.variantsBinds).includes(op.value),
      ),
    );

    if (vriantInfo) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: vriantInfo.id,
          quantity: 1,
        }),
      });
      const json = await res.json();
      cartStoreData.set(json);
      disabled = false;
      return json;
    }
    disabled = false;
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
    const values = Object.values(bindsVariants);
    disableInput = variants.reduce((acc, crr) => {
      if (!crr.availableForSale && values.some((vv) => crr.title.includes(vv)))
        return [...acc, crr];
      return acc;
    }, [] as IVariantsProduct[]);
  }

  $: checkDisable = (option: string) => {
    const values = Object.values(bindsVariants);
    return disableInput.find(
      (itemDisable) =>
        itemDisable.title.includes(option) && !values.includes(option),
    );
  };
</script>

{#each listOptions as { values, name, id } (id)}
  <dl class="mb-8">
    <dt class="mb-4 text-sm uppercase tracking-wide">{name}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each values as option (option)}
        <button
          type="button"
          class="rounded-2xl border border-neutral-700 p-1 px-2 aria-[disabled=true]:opacity-50 data-[active=true]:ring-2 data-[active=true]:ring-blue-600"
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
  class="relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 hover:opacity-90 disabled:cursor-not-allowed"
  type="button"
  on:click={handlerClick}
  {disabled}
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
        ><path
          d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    {/await}
  </span>
</button>
