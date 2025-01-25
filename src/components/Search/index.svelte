<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import DotLoading from "$components/DotLoading.svelte";

  let { idSearch }: { idSearch: string } = $props();

  let {
    value,
    listSearch,
    searching,
    timeout,
  }: {
    searching: boolean;
    value: string;
    timeout: number;
    listSearch: ISearchProducts[];
  } = $state({
    value: "",
    searching: false,
    timeout: 0,
    listSearch: [],
  });

  const searchParams = browser && page.url.searchParams;
  if (searchParams) value = searchParams.get("q")!;

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
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
  class="group relative mx-auto flex w-full items-center justify-center rounded-lg border border-neutral-800"
  {onsubmit}
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
      oninput={onInput}
    />
  </label>
  <button
    type="submit"
    class="h-9 w-9 cursor-pointer p-2 text-neutral-100"
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
    class="absolute top-8 -left-px z-50 hidden w-full data-[items=true]:group-hover:block"
    data-items={!!listSearch.length && !!value?.length}
  >
    <div
      class="mt-4 rounded-xl border border-neutral-800 bg-black/90 backdrop-blur-md"
    >
      {#if searching}
        <span
          class="absolute top-2 left-1/2 -translate-x-1/2 rounded-lg bg-blue-500 p-1"
        >
          <DotLoading />
        </span>
      {:else if !listSearch.length && !!value?.length}
        <span
          class="absolute top-1 mx-auto block w-full text-center text-neutral-600"
        >
          Nenhum produto encontrado com esse nome.
        </span>
      {/if}
      <ul
        class="scrollbar-both-edges box-content max-h-96 space-y-2 overflow-auto py-4"
      >
        {#each listSearch as product (product.handle)}
          <li
            class="w-full overflow-hidden rounded-lg text-neutral-100 hover:bg-neutral-900/90"
          >
            <a
              href={`/produto/${product.handle}`}
              class="grid w-full grid-cols-[5rem,auto] gap-4 px-3 py-2"
            >
              <figure
                class="size-20 overflow-hidden rounded-lg border border-neutral-700"
              >
                <img
                  src={product.featuredImage.url}
                  alt={product.title}
                  class="size-full object-cover"
                  width="78"
                  height="78"
                />
              </figure>
              <div class="flex flex-col justify-between">
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
  </div>
</form>
