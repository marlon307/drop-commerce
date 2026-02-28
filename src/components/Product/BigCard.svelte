<script lang="ts">
  import type { ProductRecommendationsQuery } from "../../@types/storefront.generated";

  let {
    productProps,
    loading = "lazy",
  }: {
    productProps: NonNullable<
      ProductRecommendationsQuery["productRecommendations"]
    >[number];
    loading: "lazy" | "eager";
  } = $props();

  const price = $derived(
    Number(productProps.priceRange.minVariantPrice.amount).toLocaleString(
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
  class="group relative block aspect-square h-full w-full overflow-hidden rounded-lg border border-slate-300 bg-white transition-colors dark:border-neutral-800 dark:bg-black"
>
  <picture class="relative flex h-full">
    <source
      srcset={productProps?.featuredImage?.lg}
      media="(max-width: 500px)"
    />
    <source
      srcset={productProps?.featuredImage?.xl}
      media="(max-width: 1200px)"
    />
    <img
      src={productProps?.featuredImage?.xl}
      alt={productProps?.title}
      class="m-auto aspect-square h-full w-full object-contain transition-transform group-hover:scale-105"
      {loading}
      width={productProps?.featuredImage?.width}
      height={productProps?.featuredImage?.height}
      decoding="async"
    />
    <div class="absolute bottom-8 left-0 px-4 md:bottom-[35%] md:left-12">
      {#if oldPrice}
        <span
          class="mr-4 mb-1 ml-auto block w-min rounded-full border border-slate-300 bg-white/70 px-2 py-1 text-xs text-blue-400 line-through backdrop-blur-md md:text-sm dark:border-neutral-800 dark:bg-neutral-950/70"
        >
          {oldPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency:
              productProps?.priceRange.minVariantPrice.currencyCode || "BRL",
          })}
        </span>
      {/if}
      <div
        class="font-semibol flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 p-1 font-medium text-slate-900 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/70 dark:text-white"
      >
        <span
          class="line-clamp-2 grow pl-2 text-xs leading-none tracking-tight"
          aria-label={productProps?.title}
          title={productProps?.title}
        >
          {productProps?.title}
        </span>
        <div
          class="relative flex items-center justify-center rounded-3xl bg-blue-600 px-3 py-1 text-white"
        >
          <span
            class="flex-none"
            aria-label={`Preço - ${price}`}
            title={`Preço - ${price}`}
          >
            {price}
          </span>
        </div>
      </div>
    </div>
  </picture>
</a>
