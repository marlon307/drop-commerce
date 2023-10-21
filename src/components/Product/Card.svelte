<script lang="ts">
  export let productProps: IPoductCard;
  export let bigCard: boolean = false;
  const price = productProps?.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
</script>

<a
  href={`/produto/${productProps?.handle}`}
  class="group relative block aspect-square h-full w-full rounded-lg border border-neutral-700 bg-neutral-950 transition-colors hover:border-orange-500"
>
  <figure class="relative flex h-full p-6">
    <img
      src={productProps?.image.transformedSrc}
      alt={productProps?.title}
      class="m-auto h-full w-full object-fill transition-transform group-hover:scale-105"
      width={productProps?.image.width}
      height={productProps?.image.height}
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
          class="flex-none rounded-3xl bg-orange-400 px-4 py-2"
          aria-label={`Preço - ${price}`}
          title={`Preço - ${price}`}
        >
          {price}
        </span>
      </div>
    </figcaption>
  </figure>
</a>
