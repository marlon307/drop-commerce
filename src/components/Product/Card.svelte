<script lang="ts">
  import type { ProductRecommendationsQuery } from "../../@types/storefront.generated";

  let {
    productProps,
    loading = "lazy",
    decoding = "async",
    fetchpriority = "auto",
  }: {
    productProps: NonNullable<
      ProductRecommendationsQuery["productRecommendations"]
    >[number];
    loading?: "lazy" | "eager";
    decoding?: "async" | "sync" | "auto";
    fetchpriority?: "low" | "high" | "auto";
  } = $props();

  const price = $derived(
    Number(productProps?.priceRange.minVariantPrice.amount).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency:
          productProps?.priceRange.minVariantPrice.currencyCode || "BRL",
      },
    ),
  );
  const oldPrice = $derived(
    Number(productProps?.compareAtPriceRange.maxVariantPrice.amount),
  );
</script>

<a
  href={`/produto/${productProps?.handle}`}
  class="group/scale relative grid aspect-square h-full w-full grid-rows-[auto_minmax(10%_84px)] overflow-hidden rounded-lg border border-slate-300 bg-white transition-colors dark:border-neutral-800 dark:bg-black"
>
  <picture
    class="relative flex h-full overflow-hidden border-b border-slate-300 dark:border-neutral-900"
  >
    <img
      src={productProps?.featuredImage?.lg}
      alt={productProps?.title}
      class="m-auto aspect-square h-full w-full object-contain transition-transform group-hover/scale:scale-105"
      {loading}
      height={318}
      width={318}
      {decoding}
      {fetchpriority}
    />
  </picture>
  <div
    class="font-semibol gap-2 rounded-b-lg bg-white/95 p-3 font-medium backdrop-blur-md dark:bg-neutral-950/95"
  >
    <span
      class="line-clamp-1 text-lg font-semibold text-slate-800 dark:text-neutral-200"
      aria-label={productProps?.title}
      title={productProps?.title}
    >
      {productProps?.title}
    </span>
    <div
      class="relative flex rounded-3xl py-1 text-slate-600 dark:text-neutral-400"
    >
      {#if oldPrice}
        <span
          class="block w-min rounded-full bg-white/70 px-2 py-1 text-xs line-through backdrop-blur-md md:text-sm dark:bg-neutral-950/70"
        >
          {oldPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency:
              productProps?.priceRange.minVariantPrice.currencyCode || "BRL",
          })}
        </span>
      {/if}
      <span
        class="flex-none"
        aria-label={`Preço - ${price}`}
        title={`Preço - ${price}`}
      >
        {price}
      </span>
    </div>
  </div>
</a>
