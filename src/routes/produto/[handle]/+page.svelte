<script lang="ts">
  import Variation from "$components/Variation.svelte";
  import { page } from "$app/stores";
  import Card from "$components/Product/Card.svelte";

  export let data;

  let bindsVariants = {};
  /*Utilizar a variável dessa forma solucionar um bug quando muda de página, com poucas imagens a imagem da página seguinte não fica oculta*/
  $: imagePreviewIndex = data.product && 0;
  $: currentPrice =
    bindsVariants &&
    data.product.variants.find((v) =>
      v.selectedOptions.every((op) =>
        Object.values(bindsVariants).includes(op.value),
      ),
    );
  $: medias = data.product.media;
  console.log(data.product);
</script>

<svelte:head>
  <title>{data.product.seo.title || data.product.title}</title>
  <meta name="description" content={data.product.seo.description} />
  <meta
    property="og:title"
    content={data.product.seo.title || data.product.title}
  />
  <meta property="og:url" content={$page.url.href} />
  <meta name="og:description" content={data.product.seo.description} />
  <meta property="og:image" content={medias[0].previewImage.src} />
  <meta property="og:image:width" content={`${medias[0].previewImage.width}`} />
  <meta
    property="og:image:height"
    content={`${medias[0].previewImage.height}`}
  />
  <link rel="canonical" href={$page.url.href} />
  <meta name="twitter:description" content={data.product.seo.description} />
  <meta name="twitter:creator" content={$page.url.hostname} />
  <meta
    name="twitter:title"
    content={data.product.seo.title || data.product.title}
  />
  <meta name="twitter:description" content={data.product.seo.description} />
  <meta name="twitter:image" content={medias[0].previewImage.url} />
  <meta name="robots" content="index follow" />
  <meta name="googlebot" content="index, follow" />
</svelte:head>

<section
  class="mb-8 flex flex-col items-start justify-between rounded-md border border-neutral-800 bg-black p-8 md:flex-row md:gap-4 md:p-12"
>
  <div class="h-full w-full basis-full overflow-hidden lg:basis-4/6">
    <div
      class="relative aspect-square h-full max-h-[550px] w-full overflow-hidden"
    >
      {#each medias as mediaContent, index (mediaContent.id)}
        {#if mediaContent.mediaContentType === "IMAGE"}
          <figure
            class="h-full w-full aria-[hidden=true]:hidden"
            aria-hidden={imagePreviewIndex !== index}
          >
            <img
              src={mediaContent.previewImage.url}
              alt={data.product.title}
              class="mx-auto h-full w-full object-contain"
              width={mediaContent.previewImage.width}
              height={mediaContent.previewImage.height}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </figure>
        {:else if mediaContent.mediaContentType === "VIDEO"}
          <video
            controls
            class="h-full w-full rounded-lg aria-[hidden=true]:hidden"
            controlsList="nodownload"
            aria-hidden={imagePreviewIndex !== index}
            loop
            autoplay
            muted
            poster={mediaContent.previewImage.url}
          >
            {#each mediaContent.sources as source (source.url)}
              <source src={source.url} type={source.mimeType} />
            {/each}
            <track kind="captions" />
          </video>
        {:else}
          <iframe
            width="560"
            height="315"
            src={mediaContent.originUrl}
            class="h-full w-full aria-[hidden=true]:hidden"
            aria-hidden={imagePreviewIndex !== index}
            title={data.product.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        {/if}
      {/each}
      <div
        class="absolute bottom-[10%] z-30 mx-auto flex w-full items-center justify-center"
      >
        <div
          class="flex h-11 items-center justify-center overflow-hidden rounded-full border border-neutral-950 bg-neutral-900/80 backdrop-blur"
        >
          <button
            class="p-6 text-neutral-500 transition-transform hover:scale-105 hover:text-neutral-100"
            type="button"
            aria-label="Imagem anterior"
            on:click={() =>
              imagePreviewIndex === 0
                ? (imagePreviewIndex = data.product.media.length - 1)
                : (imagePreviewIndex -= 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <span class="mx-1 h-6 w-px bg-neutral-500" />
          <button
            class="p-6 text-neutral-500 transition-transform hover:scale-105 hover:text-neutral-100"
            type="button"
            aria-label="Próxima imagem"
            on:click={() =>
              imagePreviewIndex === data.product.media.length - 1
                ? (imagePreviewIndex = 0)
                : (imagePreviewIndex += 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="my-12 w-full overflow-x-auto md:mb-0">
      <ul class="mx-auto flex w-max items-center justify-start gap-3">
        {#each medias as mediaContent, index (mediaContent.id)}
          <li
            class="rounded-lg border border-neutral-800 data-[active=true]:border-blue-600"
            data-active={imagePreviewIndex === index}
          >
            <button
              type="button"
              class="block h-20 w-20"
              on:click={() => (imagePreviewIndex = index)}
              aria-label={`${data.product.title} - Imagem ${index}`}
            >
              <figure class="h-full w-full p-2">
                <img
                  class="h-full w-full object-cover"
                  src={mediaContent.previewImage.url}
                  alt={`${data.product.title} - Imagem ${index}`}
                  width={mediaContent.previewImage.width}
                  height={mediaContent.previewImage.height}
                />
              </figure>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="h-full basis-full text-neutral-100 lg:basis-2/6">
    <div class="mb-6 border-b border-neutral-700 pb-6">
      <h1 class="mb-6 text-5xl font-medium text-neutral-100">
        {data.product.title}
      </h1>
      <div class="font-semibol flex items-center rounded-full text-white">
        {#if currentPrice?.compareAtPrice?.amount}
          <span
            class="flex-none rounded-3xl px-4 py-2 text-neutral-400 line-through"
          >
            {Number(currentPrice?.compareAtPrice?.amount).toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: currentPrice?.compareAtPrice?.currencyCode || "BRL",
              },
            )}
          </span>
        {/if}
        <span class="flex-none rounded-3xl bg-blue-600 px-4 py-2">
          {Number(
            currentPrice?.price.amount || data.product.variants[0].price.amount,
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: currentPrice?.price.currencyCode || "BRL",
          })}
        </span>
      </div>
    </div>
    {#key data.product}
      <Variation
        variants={data.product.variants}
        listOptions={data.product.options}
        bind:bindsVariants
      />
    {/key}
  </div>
</section>
<div class="mb-8">
  <h2 class="mb-4 text-2xl font-bold text-neutral-100">Descriçao do produto</h2>
  <div class="rounded-md border border-neutral-800 bg-black p-8">
    <div class="!text-neutral-100">
      {@html data.product.descriptionHtml}
    </div>
  </div>
</div>
<div class="mt-8">
  <h2 class="mb-4 text-2xl font-bold text-neutral-100">Produtos relacionado</h2>
  <ul class="flex gap-4 overflow-x-auto pb-4">
    {#await data.streamed.recommendations}
      <li
        class="aspect-square max-h-[20rem] w-full flex-none animate-pulse rounded-md border border-neutral-800 bg-black"
      />
    {:then recommendatios}
      {#each recommendatios as recommendation}
        <li class="aspect-square w-full max-w-xs flex-none">
          <Card productProps={recommendation} />
        </li>
      {/each}
    {/await}
  </ul>
</div>
