import { clientShopify } from "$lib/shopify";
import { predictiveSearchQuery } from "$lib/shopify/query/search.js";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const productss = await clientShopify.request(predictiveSearchQuery, {
    variables: {
      query: url.searchParams.get("q") || "",
    },
  });
  return json(productss.data?.predictiveSearch?.products, { status: 200 });
}
