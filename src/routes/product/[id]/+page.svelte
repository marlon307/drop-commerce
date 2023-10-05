<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<section
  class="flex flex-col md:flex-row gap-4 items-start justify-between bg-neutral-950 rounded-md border border-neutral-800 p-8"
>
  <div class="h-full w-full basis-full lg:basis-4/6">
    <div
      class="relative aspect-square h-full max-h-[550px] w-full overflow-hidden"
    >
      {#each data.images.data as image}
        <figure class="h-full block p-4">
          <source
            media={`(min-width: ${image.small.width})`}
            srcset={image.small.url}
            type="img/png"
            width={image.small.width}
            height={image.small.height}
          />
          <source
            media={`(min-width: ${image.thumb.width})`}
            srcset={image.thumb.url}
            type="img/png"
            width={image.thumb.width}
            height={image.thumb.height}
          />
          <source
            media={`(min-width: ${image.large.width})`}
            srcset={image.large.url}
            type="img/png"
            width={image.large.width}
            height={image.large.height}
          />
          <img
            src={image.medium.url}
            alt="sdfsdf"
            class="object-contain"
            width={image.medium.width}
            height={image.medium.height}
          />
        </figure>
      {/each}
    </div>
    <ul class="flex mx-auto gap-2 items-center justify-center my-6">
      {#each data.images.data as image}
        <li class="border rounded-lg border-neutral-800 p-2">
          <figure class="h-full">
            <img
              class="object-cover"
              src={image.small.url}
              alt={image.small.name}
              width={image.small.width}
              height={image.small.height}
            />
          </figure>
        </li>
      {/each}
    </ul>
  </div>
  <div class="text-neutral-100 h-full basis-full lg:basis-2/6">
    <div class="border-b pb-6 mb-6 border-neutral-700">
      <h1 class="text-neutral-100 mb-6 text-5xl font-medium">{data.name}</h1>
      <div class="flex items-center rounded-full font-semibol text-white">
        <span class="bg-orange-400 px-4 py-2 rounded-3xl flex-none"
          >{(150.55).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</span
        >
      </div>
    </div>
    <dl class="mb-8">
      <dt class="mb-4 text-sm uppercase tracking-wide">cor</dt>
      <dd class="flex flex-wrap gap-3">
        <button
          aria-disabled="false"
          title="Color Black"
          class="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 cursor-default ring-2 ring-blue-600"
        >
          Black
        </button>
      </dd>
    </dl>
    <dl class="mb-8">
      <dt class="mb-4 text-sm uppercase tracking-wide">Tamanho</dt>
      <dd class="flex flex-wrap gap-3">
        <button
          aria-disabled="false"
          title="Size XS"
          class="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600"
        >
          XS
        </button>
      </dd>
    </dl>
    <div class="mb-6">sdsds</div>
    <button class="p-4 w-full bg-orange-400 rounded-full">
      Adiconar ao carrinho
    </button>
  </div>
</section>
