<script lang="ts">
  export let productProps: any;
  const price = productProps?.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
</script>

<a
  href={`/product/${productProps?.handle}`}
  class="relative block aspect-square h-full w-full bg-neutral-950 rounded-lg group hover:border-orange-500 border border-neutral-700 transition-colors"
>
  <figure class="h-full flex p-6 relative">
    <img
      src={productProps?.image.transformedSrc}
      alt={productProps?.title}
      class="object-fill m-auto w-full h-full group-hover:scale-105 transition-transform"
      width={productProps?.image.width}
      height={productProps?.image.height}
      loading="lazy"
    />
    <figcaption class="absolute px-4 bottom-8 left-0">
      <div
        class="flex items-center rounded-full border bg-neutral-950/70 p-1 font-semibol backdrop-blur-md dark:border-neutral-800 text-white gap-2 font-medium"
      >
        <span
          class="line-clamp-2 flex-grow pl-2 leading-none tracking-tight text-xs"
          aria-label={productProps?.title}
          title={productProps?.title}
        >
          {productProps?.title}
        </span>
        <span
          class="bg-orange-400 px-4 py-2 rounded-3xl flex-none"
          aria-label={`Preço - ${price}`}
          title={`Preço - ${price}`}
        >
          {price}
        </span>
      </div>
    </figcaption>
  </figure>
</a>
