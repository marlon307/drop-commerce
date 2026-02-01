import { clientShopify } from "$lib/shopify";
import { getProductByHandler } from "$lib/shopify/query/product";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const resp = await clientShopify.request(getProductByHandler, {
    variables: {
      handle: params.handle,
    },
  });

  if (resp.data)
    return {
      product: resp.data.product,
    };
  throw error(404, "Not found");
};
