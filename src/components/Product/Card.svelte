<script lang="ts">
  export let productProps: IPoductCard;
  export let bigCard: boolean = false;

  const price = Number(
    productProps?.priceRange.minVariantPrice.amount || 0,
  ).toLocaleString("pt-BR", {
    style: "currency",
    currency: productProps?.priceRange.minVariantPrice.currencyCode || "BRL",
  });
</script>

<a
  href={`/produto/${productProps?.handle}`}
  class="group relative block aspect-square h-full w-full rounded-lg border border-neutral-800 bg-black transition-colors hover:border-blue-700"
>
  <figure class="relative flex h-full p-6">
    <img
      src={productProps?.featuredImage.transformedSrc}
      alt={productProps?.title}
      class="m-auto h-full w-full object-fill transition-transform group-hover:scale-105"
      width={productProps?.featuredImage.width}
      height={productProps?.featuredImage.height}
      loading="lazy"
    />
    <figcaption
      class={bigCard
        ? "absolute bottom-8 left-0 px-4 md:bottom-[35%] md:left-12"
        : "absolute bottom-8 left-0 px-4"}
    >
      <div
        class="font-semibol flex items-center gap-2 rounded-full border bg-neutral-950/70 p-1 font-medium text-white backdrop-blur-md dark:border-neutral-800"
      >
        <span
          class="line-clamp-2 flex-grow pl-2 text-xs leading-none tracking-tight"
          aria-label={productProps?.title}
          title={productProps?.title}
        >
          {productProps?.title}
        </span>
        <span
          class="flex-none rounded-3xl bg-blue-600 px-4 py-2"
          aria-label={`Preço - ${price}`}
          title={`Preço - ${price}`}
        >
          {price}
        </span>
      </div>
    </figcaption>
  </figure>
</a>
