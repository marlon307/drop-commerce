import { clientShopify } from "$lib/shopify";
import { getProductsCollectionQuery } from "$lib/shopify/query/product";
import type { ProductCollectionSortKeys } from "../../../@types/storefront.types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
  const sortParam = url?.searchParams.get("o") || "relevancia";
  const sort = {
    relevancia: "RELEVANCE",
    lancamentos: "CREATED",
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

  const resp = await clientShopify.request(getProductsCollectionQuery, {
    variables: {
      collection: params.categorie,
      reverse,
      sortKey: sort as ProductCollectionSortKeys,
    },
  });

  if (resp.data) return resp.data || [];
  return [];
};
