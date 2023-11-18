<script lang="ts">
  import Variation from "$components/Variation.svelte";
  import { page } from "$app/stores";
  export let data;

  let imagePreviewIndex = 0;
  let bindsVariants = {};
</script>

<svelte:head>
  <title>{data.product.seo.title || data.product.title}</title>
  <meta name="description" content={data.product.seo.description} />
  <link rel="canonical" href={$page.url.href} />
  <meta property="og:image" content={data.product.images[0].src} />
  <meta property="og:image:width" content={`${data.product.images[0].width}`} />
  <meta
    property="og:image:height"
    content={`${data.product.images[0].height}`}
  />
  <meta property="og:url" content={$page.url.href} />
  <meta name="twitter:creator" content={$page.url.hostname} />
  <meta
    name="twitter:title"
    content={data.product.seo.title || data.product.title}
  />
  <meta name="twitter:description" content={data.product.seo.description} />
  <meta name="twitter:image" content={data.product.images[0].src} />
</svelte:head>

<section
  class="mb-4 flex flex-col items-start justify-between gap-4 rounded-md border border-neutral-800 bg-black p-8 md:flex-row"
>
  <div class="h-full w-full basis-full overflow-hidden lg:basis-4/6">
    <div
      class="relative aspect-square h-full max-h-[550px] w-full overflow-hidden"
    >
      {#each data.product.images as image, index (image.src)}
        <figure
          class="block h-full p-4 aria-[hidden=true]:hidden"
          aria-hidden={imagePreviewIndex !== index}
        >
          <img
            src={image.src}
            alt={data.product.title}
            class="mx-auto object-contain"
            width={image.width}
            height={image.height}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </figure>
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
                ? (imagePreviewIndex = data.product.images.length - 1)
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
              imagePreviewIndex === data.product.images.length - 1
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
    <div class="my-6 w-full overflow-y-auto">
      <ul class="mx-auto flex w-max items-center justify-start gap-2">
        {#each data.product.images as image, index (image.src)}
          <li
            class="rounded-lg border border-neutral-800 p-2 data-[active=true]:border-blue-600"
            data-active={imagePreviewIndex === index}
          >
            <button
              type="button"
              class="block h-16 w-16"
              on:click={() => (imagePreviewIndex = index)}
              aria-label={`${data.product.title} - Imagem ${index}`}
            >
              <figure class="h-full w-full">
                <img
                  class="h-full w-full object-cover"
                  src={image.src}
                  alt={`${data.product.title} - Imagem ${index}`}
                  width={image.width}
                  height={image.height}
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
        <span class="flex-none rounded-3xl bg-blue-600 px-4 py-2">
          {Number(
            data.product.variants.find((v) =>
              v.selectedOptions.every((op) =>
                Object.values(bindsVariants).includes(op.value),
              ),
            )?.price.amount || data.product.variants[0].price.amount,
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
    <Variation
      variants={data.product.variants}
      listOptions={data.product.options}
      bind:bindsVariants
    />
  </div>
</section>
<div class="rounded-md border border-neutral-800 bg-black p-8">
  <h3 class="mb-4 text-xl font-bold text-neutral-100">Descriçao do produto</h3>
  <div class="!text-neutral-100">
    {@html data.product.descriptionHtml}
  </div>
</div>
