import { clientShopify } from "$lib/shopify";
import { getProductsQuery } from "$lib/shopify/query/product";
import { error } from "@sveltejs/kit";
import type { ProductSortKeys } from "../../@types/storefront.types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const sort =
    {
      relevancia: "RELEVANCE",
      lancamentos: "CREATED_AT",
      "menor-preco": "PRICE",
      "maio-preco": "PRICE",
      BestSelling: "BEST_SELLING",
    }[url?.searchParams.get("o")!] || "RELEVANCE";

  const resp = await clientShopify.request(getProductsQuery, {
    variables: {
      query: url.searchParams.get("q") || "",
      reverse:
        sort === "menor-preco" ? false : sort === "menor-preco" ? true : null,
      sort: sort as ProductSortKeys,
    },
  });

  if (resp.data) return { products: resp.data?.products?.edges || [] };
  throw error(404, "Not found");
};
