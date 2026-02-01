import { clientShopify } from "$lib/shopify";
import { predictiveSearchQuery } from "$lib/shopify/query/search.js";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  const productss = await clientShopify.request(predictiveSearchQuery, {
    variables: {
      query: url.searchParams.get("q") || "",
    },
  });
  return json(productss.data?.predictiveSearch?.products, { status: 200 });
}
