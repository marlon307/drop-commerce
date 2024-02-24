<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import DotLoading from "$components/DotLoading.svelte";

  export let idSearch: string;

  let value = "";
  let searching = false;
  let timeout = 0;
  let listSearch: ISearchProducts[] = [];

  const searchParams = browser && $page.url.searchParams;
  if (searchParams) value = searchParams.get("q")!;

  async function submit() {
    let query = new URLSearchParams();
    if (value) query.set("q", value);
    listSearch = [];
    await goto(`/produtos${query ? `?${query}` : ""}`, { keepFocus: true });
  }

  async function search() {
    const resp = await fetch(`/api/search?q=${value}`);
    const json = await resp.json();
    listSearch = json;
    searching = false;
  }

  function onInput() {
    searching = true;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(search, 500);
  }
</script>

<form
  method="POST"
  class="group relative mx-auto flex w-full max-w-lg items-center justify-center rounded-lg border border-neutral-800"
  on:submit|preventDefault={submit}
  autocomplete="off"
>
  <label for={idSearch} class="block w-full">
    <input
      id={idSearch}
      type="search"
      class="h-full w-full appearance-none rounded-lg bg-transparent py-2 pl-4 text-neutral-100 outline-none"
      name="search"
      placeholder="Procure por produtos"
      autocomplete="off"
      bind:value
      on:input={onInput}
    />
  </label>
  <button
    type="submit"
    class="h-9 w-9 p-2 text-neutral-100"
    disabled={searching}
    aria-label="Pesquisar"
  >
    {#if searching}
      <DotLoading />
    {:else}
      <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    {/if}
  </button>
  <div
    class="absolute -left-px top-8 z-50 hidden w-full data-[items=true]:group-hover:block"
    data-items={!!listSearch.length && !!value?.length}
  >
    <ul
      class="mt-4 max-h-96 space-y-2 overflow-auto rounded-xl border border-neutral-800 bg-black/90 p-4 backdrop-blur-md"
    >
      {#each listSearch as product (product.handle)}
        <li
          class="w-full overflow-hidden rounded-lg text-neutral-100 hover:bg-neutral-900/90"
        >
          <a
            href={`/produto/${product.handle}`}
            class="mx-1 inline-flex w-full gap-4 p-2"
          >
            <figure
              class="h-20 w-20 flex-none overflow-hidden rounded-lg border border-neutral-700"
            >
              <img
                src={product.featuredImage.transformedSrc}
                alt={product.title}
                class="h-20 w-20 object-contain"
                width="80"
                height="80"
              />
            </figure>
            <div class="flex flex-1 flex-col justify-between">
              <p class="line-clamp-2">
                {product.title}
              </p>
              <div
                class="flex items-center justify-start gap-2 text-neutral-400"
              >
                <span>
                  {Number(
                    product.priceRange.minVariantPrice.amount,
                  ).toLocaleString("pt-BR", {
                    currency: product.priceRange.minVariantPrice.currencyCode,
                    style: "currency",
                  })}
                </span>
                ~
                <span>
                  {Number(
                    product.priceRange.maxVariantPrice.amount,
                  ).toLocaleString("pt-BR", {
                    currency: product.priceRange.maxVariantPrice.currencyCode,
                    style: "currency",
                  })}
                </span>
              </div>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</form>
