import { clientShopify } from "$lib/shopify";
import { predictiveSearchQuery } from "$lib/shopify/query/search.js";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  const search = url.searchParams.get('q')!;
  const productss = await clientShopify.request(predictiveSearchQuery, {
    variables: {
      query: search
    }
  });
  return json(productss.data?.predictiveSearch?.products, { status: 200 });
}
