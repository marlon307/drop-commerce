<script lang="ts">
  let {
    productProps,
    loading = "lazy",
  }: {
    productProps: IPoductCard;
    loading: "lazy" | "eager";
  } = $props();

  const price = Number(
    productProps?.priceRange.minVariantPrice.amount,
  ).toLocaleString("pt-BR", {
    style: "currency",
    currency: productProps?.priceRange.minVariantPrice.currencyCode || "BRL",
  });
  const oldPrice = Number(
    productProps?.compareAtPriceRange.maxVariantPrice.amount,
  );
</script>

<a
  href={`/produto/${productProps?.handle}`}
  class="group relative block aspect-square h-full w-full overflow-hidden rounded-lg border border-neutral-800 bg-black transition-colors hover:border-blue-700"
>
  <picture class="relative flex h-full">
    <source
      srcset={productProps?.featuredImage.lg}
      media="(max-width: 500px)"
    />
    <source
      srcset={productProps?.featuredImage.xl}
      media="(max-width: 1200px)"
    />
    <img
      src={productProps?.featuredImage.xl}
      alt={productProps?.title}
      class="m-auto h-full w-full object-contain transition-transform group-hover:scale-105"
      {loading}
    />
    <!-- width={productProps?.featuredImage.width}
      height={productProps?.featuredImage.height} -->
    <div class={"absolute bottom-8 left-0 px-4 md:bottom-[35%] md:left-12"}>
      {#if oldPrice}
        <span
          class="mr-4 mb-1 ml-auto block w-min rounded-full border border-neutral-800 bg-neutral-950/70 px-2 py-1 text-xs text-blue-400 line-through backdrop-blur-md md:text-sm"
        >
          {oldPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency:
              productProps?.priceRange.minVariantPrice.currencyCode || "BRL",
          })}
        </span>
      {/if}
      <div
        class="font-semibol flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/70 p-1 font-medium text-white backdrop-blur-md"
      >
        <span
          class="line-clamp-2 grow-1 pl-2 text-xs leading-none tracking-tight"
          aria-label={productProps?.title}
          title={productProps?.title}
        >
          {productProps?.title}
        </span>
        <div
          class="relative flex items-center justify-center rounded-3xl bg-blue-600 px-3 py-1"
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
