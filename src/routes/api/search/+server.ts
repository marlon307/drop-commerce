import { predictiveSearchProducts } from "$lib/shopify";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  const search = url.searchParams.get('q')!;
  const products = await predictiveSearchProducts(search);
  return json(products, { status: 200 });
}
