<script lang="ts">
  import { writable } from "svelte/store";
  import AddCartButton from "./AddCartButton.svelte";
  export let listOptions: IOption[] = [];
  export let variants: IVariantsProduct[] = [];
  export let bindsVariants: { [k: string]: string } = {};

  const selectedOptions = writable<{ [k: string]: string }>({});

  const combinations: ICombination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name]: option.value,
      }),
      {},
    ),
  }));

  $: isAvailableForSale = (option: string, value: string) => {
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
  };

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
    <dt class="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
    <dd class="flex flex-wrap gap-3">
      {#each option.values as value}
        <button
          type="button"
          class="relative flex items-center justify-center overflow-hidden rounded-2xl border border-neutral-700 p-1 px-2 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-500 before:transition-transform disabled:cursor-not-allowed aria-[disabled=true]:opacity-50 data-[active=true]:ring-2 data-[active=true]:ring-blue-600"
          aria-label={value}
          aria-disabled={!isAvailableForSale(option.name, value)}
          disabled={!isAvailableForSale(option.name, value)}
          data-active={$selectedOptions[option.name] === value}
          onclick={() => selectOption(option.name, value)}
        >
          {value}
        </button>
      {/each}
    </dd>
  </dl>
{/each}

<AddCartButton bindsVariants={{ ...bindsVariants }} {variants} />
