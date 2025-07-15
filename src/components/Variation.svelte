<script lang="ts">
  import { writable } from "svelte/store";
  import AddCartButton from "./AddCartButton.svelte";
  import type { Maybe, ProductOption, ProductOptionValue, ProductOptionValueSwatch, ProductVariant } from "../@types/storefront.types";

  let {
    listOptions,
    variants,
    bindsVariants = $bindable(),
  }: {
    listOptions: ProductOption[];
    variants: { node: ProductVariant }[];
    bindsVariants: { [k: string]: string };
  } = $props();

  const selectedOptions = writable<{ [k: string]: string }>({});

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.node?.id,
    availableForSale: variant.node?.availableForSale,
    ...variant.node?.selectedOptions?.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name]: option.value,
      }), {})
    }));

  let isAvailableForSale = $state((option: string, value: string) => {
    const currentOptions = {
      ...$selectedOptions,
      [option]: value,
    };
    return combinations.find((combination) =>
      Object.entries(currentOptions).every(
        ([key, value]) =>
          combination[key] === value && combination.availableForSale,
      ),
    );
  });

  function selectOption(option: string, value: string) {
    const available = isAvailableForSale(option, value);
    if (available) {
      bindsVariants[option] = value;
      selectedOptions.update((updatedOptions) => ({
        ...updatedOptions,
        [option]: value,
      }));
    }
  }
</script>

{#each listOptions as option (option.id)}
  <dl class="mb-8">
    <dt class="mb-4 text-sm tracking-wide uppercase">{option.name}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each option.optionValues as value}
        <button
          type="button"
          class="relative flex gap-1 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-neutral-700 p-1 px-2 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-500 before:transition-transform disabled:cursor-not-allowed aria-[disabled=true]:opacity-50 data-[active=true]:ring-2 data-[active=true]:ring-blue-600"
          aria-label={value.name}
          aria-disabled={!isAvailableForSale(option.name, value.name)}
          disabled={!isAvailableForSale(option.name, value.name)}
          data-active={$selectedOptions[option.name] === value.name}
          onclick={() => selectOption(option.name, value.name)}
        >
          {value.name}
          <span 
          aria-hidden={!value?.swatch?.color} 
          class="size-4 rounded-full border border-neutral-700 aria-[hidden=true]:hidden" style={`background-color:${value?.swatch?.color};`}
          ></span>
        </button>
      {/each}
    </dd>
  </dl>
{/each}

<AddCartButton bindsVariants={{ ...bindsVariants }} {variants} />
