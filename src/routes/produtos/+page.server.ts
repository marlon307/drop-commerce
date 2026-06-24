import { clientShopify } from "$lib/shopify";
import { getProductsQuery } from "$lib/shopify/query/product";
import { error } from "@sveltejs/kit";
import type { ProductSortKeys } from "../../@types/storefront.types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const sortParam = url?.searchParams.get("o") || "relevancia";
  const sort = {
    relevancia: "RELEVANCE",
    lancamentos: "CREATED_AT",
    "menor-preco": "PRICE",
    "maior-preco": "PRICE",
    BestSelling: "BEST_SELLING",
  }[sortParam];

  const reverse =
    sortParam === "maior-preco"
      ? true
      : sortParam === "menor-preco"
        ? false
        : null;

  const resp = await clientShopify.request(getProductsQuery, {
    variables: {
      query: url.searchParams.get("q") || "",
      reverse,
      sort: sort as ProductSortKeys,
    },
  });

  if (resp.data) return { products: resp.data?.products?.edges || [] };
  throw error(404, "Not found");
};
