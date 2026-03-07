import { clientShopify } from "$lib/shopify";
import { getProductsByIdsQuery } from "$lib/shopify/query/product";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const favoriteIds = locals.favorites ?? [];

  if (!favoriteIds.length) {
    return {
      products: [],
    };
  }

  const response = await clientShopify.request(getProductsByIdsQuery, {
    variables: {
      ids: favoriteIds,
    },
  });

  return {
    products: ((response.data?.nodes ?? []).filter(Boolean) as any[]).filter(
      (node) => typeof node?.handle === "string",
    ),
  };
};
