<script lang="ts">
  import { page } from "$app/state";
  import { beforeNavigate } from "$app/navigation";
  import { buildSrcSet } from "$lib/image";
  import Variation from "$components/Variation.svelte";
  import FavoriteButton from "$components/FavoriteButton.svelte";
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
  let imagePreviewIndex = $state(0);
  beforeNavigate(() => (imagePreviewIndex = 0));

  let medias = $derived(data.product?.media);
  let mediaCount = $derived(medias?.edges.length || 0);
  let currentPrice = $derived(
    bindsVariants &&
      data.product?.variants?.edges.find((v) =>
        v.node.selectedOptions.every((op) =>
          Object.values(bindsVariants).includes(op.value),
        ),
      ),
  );

  function isAdjacentMedia(index: number) {
    if (mediaCount <= 1) return false;

    const previous =
      imagePreviewIndex === 0 ? mediaCount - 1 : imagePreviewIndex - 1;
    const next =
      imagePreviewIndex === mediaCount - 1 ? 0 : imagePreviewIndex + 1;

    return index === previous || index === next;
  }

  function shouldLoadMainMedia(index: number) {
    return index === imagePreviewIndex || isAdjacentMedia(index);
  }

  function showPreviousMedia() {
    if (!mediaCount) return;

    imagePreviewIndex =
      imagePreviewIndex === 0 ? mediaCount - 1 : imagePreviewIndex - 1;
  }

  function showNextMedia() {
    if (!mediaCount) return;

    imagePreviewIndex =
      imagePreviewIndex === mediaCount - 1 ? 0 : imagePreviewIndex + 1;
  }
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
    content={`${medias?.edges[0]?.node.previewImage?.height}`}
  />
  <meta property="og:site_name" content="Big Uti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:url" content={page.url.href} />
  <meta
    property="description"
    content={data.product?.seo.description || data.product?.description}
  />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={page.url.hostname} />
  <meta name="twitter:creator" content={page.url.hostname} />
  <meta name="twitter:domain" content={page.url.hostname} />
  <meta name="twitter:url" content={page.url.href} />
  <meta name="twitter:title" content={data.product?.seo.title} />
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
    class="flex flex-col items-start justify-between rounded-md border border-slate-300 bg-white p-8 md:flex-row md:gap-4 md:p-12 dark:border-neutral-800 dark:bg-black"
  >
    <div class="h-full w-full basis-full overflow-hidden lg:basis-4/6">
      <div
        class="relative aspect-square h-full max-h-137.5 w-full overflow-hidden"
      >
        {#each medias?.edges || [] as mediaContent, index (mediaContent.node.id)}
          {#if shouldLoadMainMedia(index)}
            {#if mediaContent.node.mediaContentType === "IMAGE"}
              <picture
                class="h-full w-full rounded-sm aria-hidden:hidden"
                aria-hidden={imagePreviewIndex !== index}
              >
                <img
                  src={mediaContent.node.previewImage?.lg ||
                    mediaContent.node.previewImage?.url}
                  srcset={buildSrcSet([
                    [mediaContent.node.previewImage?.xs, 341],
                    [mediaContent.node.previewImage?.sm, 450],
                    [mediaContent.node.previewImage?.lg, 681],
                    [mediaContent.node.previewImage?.xl, 930],
                  ])}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 62vw, 930px"
                  alt={data.product?.title}
                  class="mx-auto aspect-square h-full w-full object-contain"
                  width={mediaContent.node.previewImage?.width}
                  height={mediaContent.node.previewImage?.height}
                  loading={index === imagePreviewIndex ? "eager" : "lazy"}
                  decoding={index === imagePreviewIndex ? "sync" : "async"}
                  fetchpriority={index === imagePreviewIndex ? "high" : "low"}
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
                preload={index === imagePreviewIndex ? "metadata" : "none"}
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
                loading={index === imagePreviewIndex ? "eager" : "lazy"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            {/if}
          {/if}
        {/each}
        <div
          class="absolute bottom-0 left-1/2 z-30 mx-auto -translate-x-1/2 md:bottom-[10%]"
        >
          <div
            class="flex h-11 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-100/80 backdrop-blur dark:border-neutral-950 dark:bg-neutral-900/80"
          >
            <button
              class="cursor-pointer p-6 text-slate-500 transition-transform hover:scale-105 hover:text-slate-900 dark:text-neutral-500 dark:hover:text-neutral-100"
              type="button"
              aria-label="Imagem anterior"
              onclick={showPreviousMedia}
            >
              <ArrowLeft size="22" />
            </button>
            <span class="mx-1 h-6 w-px bg-slate-400 dark:bg-neutral-500"></span>
            <button
              class="cursor-pointer p-6 text-slate-500 transition-transform hover:scale-105 hover:text-slate-900 dark:text-neutral-500 dark:hover:text-neutral-100"
              type="button"
              aria-label="Próxima imagem"
              onclick={showNextMedia}
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
              class="rounded-lg border border-slate-300 data-[active=true]:border-blue-600 dark:border-neutral-800"
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
                    class="absolute bottom-0 z-20 m-1 flex items-center justify-center rounded-full bg-slate-900/10 p-0.5 backdrop-blur-sm *:stroke-slate-500/90 dark:bg-neutral-100/20 dark:*:stroke-neutral-400/90"
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
    <div
      class="h-full basis-full text-slate-900 lg:basis-2/6 dark:text-neutral-100"
    >
      <div class="mb-6 border-b border-slate-300 pb-6 dark:border-neutral-700">
        <h1
          class="mb-6 text-5xl font-medium text-slate-900 dark:text-neutral-100"
        >
          {data.product?.title}
        </h1>
        <div class="font-semibol flex items-center gap-6 rounded-full">
          {#if currentPrice?.node.compareAtPrice?.amount}
            <span
              class="flex-none rounded-3xl text-slate-600 line-through dark:text-neutral-400"
            >
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
              currency:
                currentPrice?.node.price.currencyCode ||
                data.product?.variants.edges[0].node.price.currencyCode ||
                "BRL",
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
              currency:
                currentPrice?.node.price.currencyCode ||
                data.product?.variants.edges[0].node.price.currencyCode ||
                "BRL",
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
      <FavoriteButton productId={data.product?.id || ""} />
    </div>
  </div>
</section>

<div class="mx-auto max-w-screen-2xl pb-8">
  <h2 class="mx-4 pb-4 text-2xl font-bold text-slate-900 dark:text-neutral-100">
    Descrição do produto
  </h2>
  <div
    class="mx-4 rounded-md border border-slate-300 bg-white p-8 dark:border-neutral-800 dark:bg-black"
  >
    <div class="format-desc text-slate-900! dark:text-neutral-100!">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html data.product?.descriptionHtml}
    </div>
  </div>
</div>

<Recomendations productId={data.product?.id || ""} />
