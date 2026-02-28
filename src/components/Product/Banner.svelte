<script lang="ts">
  import type { ProductRecommendationsQuery } from "../../@types/storefront.generated";

  let {
    infoProduct,
  }: {
    infoProduct: NonNullable<
      ProductRecommendationsQuery["productRecommendations"]
    >[number];
  } = $props();
</script>

<section class="mx-auto max-w-screen-2xl px-4">
  <div
    class="mx-auto mb-8 rounded-lg border border-slate-200 bg-white py-8 sm:py-16 dark:border-neutral-800 dark:bg-black"
  >
    <div
      class="grid grid-cols-1 items-center justify-center gap-8 px-8 sm:px-16 md:grid-cols-2"
    >
      <div class="max-w-md space-y-4">
        <h2
          class="text-3xl font-bold text-balance text-slate-900 md:text-4xl dark:text-neutral-100"
        >
          {infoProduct.title}
        </h2>
        <p
          class="line-clamp-3 text-pretty text-slate-600 dark:text-neutral-400"
          title={infoProduct.description}
        >
          {infoProduct.description}
        </p>
        <a
          href={`/produto/${infoProduct.handle}`}
          class="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-6 font-medium text-white transition-colors hover:bg-blue-600/90 focus:ring-1 focus:ring-blue-950 focus:outline-none"
        >
          Compre Agora
        </a>
      </div>
      <picture>
        <source
          srcset={infoProduct.featuredImage?.lg}
          media="(max-width: 500px)"
        />
        <source
          srcset={infoProduct.featuredImage?.xl}
          media="(max-width: 995px)"
        />
        <img
          class="mx-auto block aspect-square max-h-109.5 rounded-lg object-cover"
          src={infoProduct.featuredImage?.url}
          alt={infoProduct.title}
          loading="eager"
          width={infoProduct.featuredImage?.width}
          height={infoProduct.featuredImage?.height}
          decoding="sync"
          fetchpriority="high"
        />
      </picture>
    </div>
  </div>
</section>
