<script lang="ts">
    import type { ProductRecommendationsQuery } from "../../@types/storefront.generated";

  let {
    productProps,
    loading = "lazy",
    decoding = "async",
    fetchpriority = "auto",
  }: {
    productProps: NonNullable<ProductRecommendationsQuery["productRecommendations"]>[number];
    loading?: "lazy" | "eager";
    decoding?: "async" | "sync" | "auto";
    fetchpriority?: "low" | "high" | "auto";
  } = $props();

  const price = $derived(Number(
    productProps?.priceRange.minVariantPrice.amount,
  ).toLocaleString("pt-BR", {
    style: "currency",
    currency: productProps?.priceRange.minVariantPrice.currencyCode || "BRL",
  }));
  const oldPrice = $derived(Number(
    productProps?.compareAtPriceRange.maxVariantPrice.amount,
  ));
</script>

<a
  href={`/produto/${productProps?.handle}`}
  class="group/scale relative grid aspect-square h-full w-full grid-rows-[auto_minmax(10%_84px)] overflow-hidden rounded-lg border border-neutral-800 bg-black transition-colors"
>
  <picture
    class="relative flex h-full overflow-hidden border-b border-neutral-900"
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
    class="font-semibol gap-2 rounded-b-lg bg-neutral-950/95 p-3 font-medium backdrop-blur-md"
  >
    <span
      class="line-clamp-1 text-lg font-semibold text-neutral-200"
      aria-label={productProps?.title}
      title={productProps?.title}
    >
      {productProps?.title}
    </span>
    <div class="relative flex rounded-3xl py-1 text-neutral-400">
      {#if oldPrice}
        <span
          class="block w-min rounded-full bg-neutral-950/70 px-2 py-1 text-xs line-through backdrop-blur-md md:text-sm"
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
