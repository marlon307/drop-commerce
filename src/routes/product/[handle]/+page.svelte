<script lang="ts">
  import Variation from "../../../components/Variation.svelte";
  export let data;
  console.log(data);
</script>

<section
  class="flex flex-col md:flex-row gap-4 items-start justify-between bg-neutral-950 rounded-md border border-neutral-800 p-8 mb-4"
>
  <div class="h-full w-full basis-full lg:basis-4/6">
    <div
      class="relative aspect-square h-full max-h-[550px] w-full overflow-hidden"
    >
      {#each data.product.images as image}
        <figure class="h-full block p-4">
          <img
            src={image.src}
            alt={data.product.title}
            class="object-contain mx-auto"
            width={image.width}
            height={image.height}
            loading="lazy"
          />
        </figure>
      {/each}
      <div
        class="absolute z-30 bottom-[10%] mx-auto flex w-full items-center justify-center"
      >
        <div
          class="bg-neutral-900/80 backdrop-blur h-11 rounded-full border border-neutral-950 flex items-center justify-center"
        >
          <div
            class="px-6 text-neutral-500 hover:text-neutral-100 hover:scale-105 transition-transform"
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
          </div>
          <span class="mx-1 h-6 w-px bg-neutral-500" />
          <div
            class="px-6 text-neutral-500 hover:text-neutral-100 hover:scale-105 transition-transform"
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
          </div>
        </div>
      </div>
    </div>
    <ul class="flex mx-auto gap-2 items-center justify-center my-6">
      {#each data.product.images as image}
        <li class="border rounded-lg border-neutral-800 p-2">
          <figure class="h-full">
            <img
              class="object-cover w-16 h-16"
              src={image.src}
              alt={data.product.title}
              width={image.width}
              height={image.height}
            />
          </figure>
        </li>
      {/each}
    </ul>
  </div>
  <div class="text-neutral-100 h-full basis-full lg:basis-2/6">
    <div class="border-b pb-6 mb-6 border-neutral-700">
      <h1 class="text-neutral-100 mb-6 text-5xl font-medium">
        {data.product.title}
      </h1>
      <div class="flex items-center rounded-full font-semibol text-white">
        <span class="bg-orange-400 px-4 py-2 rounded-3xl flex-none"
          >{Number(data.product.variants[0].price.amount).toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}</span
        >
      </div>
    </div>
    <Variation
      variants={data.product.variants}
      listOptions={data.product.options}
    />
  </div>
</section>
<div class="bg-neutral-950 rounded-md border border-neutral-800 p-8">
  <h3 class="mb-4 text-xl text-neutral-100 font-bold">Descriçao do produto</h3>
  <div class="!text-neutral-100">
    {@html data.product.descriptionHtml}
  </div>
</div>
