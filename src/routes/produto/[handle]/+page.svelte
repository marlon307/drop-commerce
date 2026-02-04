<script lang="ts">
  import { page } from "$app/state";
  import { beforeNavigate } from "$app/navigation";
  import Variation from "$components/Variation.svelte";
  import type {
    ProductOption,
    ProductVariant,
  } from "../../../@types/storefront.types";
  import Recomendations from "$components/Recomendations.svelte";
  import Play from "@lucide/svelte/icons/play";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";

  let { data } = $props();
  let bindsVariants = $state({});
  let imagePreviewIndex = $derived(data.product && 0);
  beforeNavigate(() => (imagePreviewIndex = 0));

  let medias = $derived(data.product?.media);
  let currentPrice = $derived(
    bindsVariants &&
      data.product?.variants?.edges.find((v) =>
        v.node.selectedOptions.every((op) =>
          Object.values(bindsVariants).includes(op.value),
        ),
      ),
  );
</script>

<svelte:head>
  <title>{`${data.product?.seo.title || data.product?.title} - Big Uti`}</title>
  <meta
    name="description"
    content={data.product?.seo.description || data.product?.description}
  />
  <meta
    property="og:title"
    content={`${data.product?.seo.title || data.product?.title} - Big Uti`}
  />
  <meta property="og:url" content={page.url.href} />
  <meta
    name="og:description"
    content={data.product?.seo.description || data.product?.description}
  />
  <meta
    property="og:image"
    content={medias?.edges[0]?.node.previewImage?.url}
  />
  <meta
    property="og:image:width"
    content={`${medias?.edges[0]?.node.previewImage?.width}`}
  />
  <meta
    property="og:image:height"
    content={`${medias?.edges[0]?.node.previewImage}`}
  />
  <link rel="canonical" href={page.url.href} />
  <meta name="twitter:description" content={data.product?.seo.description} />
  <meta name="twitter:creator" content={page.url.hostname} />
  <meta
    name="twitter:title"
    content={`${data.product?.seo.title || data.product?.title} - Big Uti`}
  />
  <meta name="twitter:description" content={data.product?.seo.description} />
  <meta
    name="twitter:image"
    content={medias?.edges[0]?.node.previewImage?.url}
  />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
</svelte:head>

<section class="mx-auto max-w-screen-2xl px-4 pb-8">
  <div
    class="flex flex-col items-start justify-between rounded-md border border-neutral-800 bg-black p-8 md:flex-row md:gap-4 md:p-12"
  >
    <div class="h-full w-full basis-full overflow-hidden lg:basis-4/6">
      <div
        class="relative aspect-square h-full max-h-137.5 w-full overflow-hidden"
      >
        {#each medias?.edges || [] as mediaContent, index (mediaContent.node.id)}
          {#if mediaContent.node.mediaContentType === "IMAGE"}
            <picture
              class="h-full w-full rounded-sm aria-hidden:hidden"
              aria-hidden={imagePreviewIndex !== index}
            >
              <source
                srcset={mediaContent.node.previewImage?.xs}
                media="(max-width: 375px)"
              />
              <source
                srcset={mediaContent.node.previewImage?.sm}
                media="(max-width: 500px)"
              />
              <source
                srcset={mediaContent.node.previewImage?.lg}
                media="(max-width: 681px)"
              />
              <source
                srcset={mediaContent.node.previewImage?.xl}
                media="(max-width: 995px)"
              />
              <img
                src={mediaContent.node.previewImage?.xl}
                alt={data.product?.title}
                class="mx-auto aspect-square h-full w-full object-contain"
                width={mediaContent.node.previewImage?.width}
                height={mediaContent.node.previewImage?.height}
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                fetchpriority={index === 0 ? "high" : "auto"}
              />
            </picture>
          {:else if mediaContent.node.mediaContentType === "VIDEO" && "sources" in mediaContent.node}
            <video
              controls
              class="h-full w-full rounded-sm aria-hidden:hidden"
              controlsList="nodownload"
              aria-hidden={imagePreviewIndex !== index}
              muted
              disablepictureinpicture
              preload="metadata"
              poster={mediaContent.node.previewImage?.url}
            >
              {#each mediaContent.node.sources as source (source.url)}
                <source src={source.url} type={source.mimeType} />
              {/each}
              <track kind="captions" />
            </video>
          {:else}
            <iframe
              width="560"
              height="315"
              src={"embedUrl" in mediaContent.node
                ? mediaContent.node?.embedUrl
                : "originUrl" in mediaContent.node
                  ? mediaContent.node?.originUrl
                  : null}
              class="h-full w-full rounded-sm aria-hidden:hidden"
              aria-hidden={imagePreviewIndex !== index}
              title={data.product?.title}
              frameborder="0"
              loading={index === 0 ? "eager" : "lazy"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          {/if}
        {/each}
        <div
          class="absolute bottom-0 left-1/2 z-30 mx-auto -translate-x-1/2 md:bottom-[10%]"
        >
          <div
            class="flex h-11 items-center justify-center overflow-hidden rounded-full border border-neutral-950 bg-neutral-900/80 backdrop-blur"
          >
            <button
              class="cursor-pointer p-6 text-neutral-500 transition-transform hover:scale-105 hover:text-neutral-100"
              type="button"
              aria-label="Imagem anterior"
              onclick={() =>
                imagePreviewIndex === 0
                  ? (imagePreviewIndex =
                      (data.product?.media?.edges?.length || 0) - 1)
                  : (imagePreviewIndex! -= 1)}
            >
              <ArrowLeft size="22" />
            </button>
            <span class="mx-1 h-6 w-px bg-neutral-500"></span>
            <button
              class="cursor-pointer p-6 text-neutral-500 transition-transform hover:scale-105 hover:text-neutral-100"
              type="button"
              aria-label="Próxima imagem"
              onclick={() =>
                imagePreviewIndex ===
                (data.product?.media.edges.length || 0) - 1
                  ? (imagePreviewIndex = 0)
                  : (imagePreviewIndex! += 1)}
            >
              <ArrowRight size="22" />
            </button>
          </div>
        </div>
      </div>
      <div class="my-12 w-full overflow-x-auto md:mb-0">
        <ul class="mx-auto flex w-max items-center justify-start gap-3">
          {#each medias?.edges || [] as mediaContent, index (mediaContent.node.id)}
            <li
              class="rounded-lg border border-neutral-800 data-[active=true]:border-blue-600"
              data-active={imagePreviewIndex === index}
            >
              <button
                type="button"
                class="relative block h-20 w-20 cursor-pointer"
                onclick={() => (imagePreviewIndex = index)}
                aria-label={`${data.product?.title} - Imagem ${index}`}
              >
                <figure class="h-full w-full p-1">
                  <img
                    class="aspect-square h-full w-full rounded-md object-cover"
                    src={mediaContent.node.previewImage?.transformedSrc}
                    alt={`${data.product?.title} - Imagem ${index}`}
                    width={72}
                    height={72}
                    decoding="async"
                    loading="lazy"
                  />
                </figure>
                {#if ["VIDEO", "EXTERNAL_VIDEO", "MODEL_3D"].includes(mediaContent?.node.mediaContentType)}
                  <span
                    class="absolute bottom-0 z-20 m-1 flex items-center justify-center rounded-full bg-neutral-100/20 p-0.5 backdrop-blur-sm *:stroke-neutral-400/90"
                    title="Video"
                  >
                    <Play size="14" />
                  </span>
                {/if}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="h-full basis-full text-neutral-100 lg:basis-2/6">
      <div class="mb-6 border-b border-neutral-700 pb-6">
        <h1 class="mb-6 text-5xl font-medium text-neutral-100">
          {data.product?.title}
        </h1>
        <div class="font-semibol flex items-center gap-6 rounded-full">
          {#if currentPrice?.node.compareAtPrice?.amount}
            <span class="flex-none rounded-3xl text-neutral-400 line-through">
              {Number(currentPrice?.node.compareAtPrice?.amount).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency:
                    currentPrice?.node.compareAtPrice?.currencyCode || "BRL",
                },
              )}
            </span>
          {/if}
          <span
            class="flex-none rounded-3xl bg-blue-600 px-4 py-2 font-medium text-blue-50"
          >
            {Number(
              currentPrice?.node.price.amount ||
                data.product?.variants.edges[0].node.price.amount,
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: currentPrice?.node.price.amount.currencyCode || "BRL",
            })}
          </span>
        </div>
        <div class="mt-3 text-lg font-light">
          Em até 3x de <span class="font-medium">
            {(
              Number(
                currentPrice?.node.price.amount ||
                  data.product?.variants.edges[0].node.price.amount,
              ) / 3
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: currentPrice?.node.price.amount.currencyCode || "BRL",
            })}
          </span>
        </div>
      </div>
      {#key data.product}
        <Variation
          listOptions={data?.product?.options as ProductOption[]}
          variants={data?.product?.variants?.edges as {
            node: ProductVariant;
          }[]}
          bind:bindsVariants
        />
      {/key}
    </div>
  </div>
</section>

<div class="mx-auto max-w-screen-2xl pb-8">
  <h2 class="mx-4 pb-4 text-2xl font-bold text-neutral-100">
    Descrição do produto
  </h2>
  <div class="mx-4 rounded-md border border-neutral-800 bg-black p-8">
    <div class="format-desc text-neutral-100!">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html data.product?.descriptionHtml}
    </div>
  </div>
</div>

<Recomendations productId={data.product?.id || ""} />
