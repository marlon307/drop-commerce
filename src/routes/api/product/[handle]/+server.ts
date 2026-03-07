import { clientShopify } from "$lib/shopify";
import { getProductByHandler } from "$lib/shopify/query/product";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  const resp = await clientShopify.request(getProductByHandler, {
    variables: {
      handle: params.handle,
    },
  });

  if (!resp.data?.product) {
    return json({ error: "Produto não encontrado" }, { status: 404 });
  }

  const product = resp.data.product;
  const variants = product.variants?.edges?.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    price: e.node.price?.amount,
    currencyCode: e.node.price?.currencyCode,
    availableForSale: e.node.availableForSale,
    selectedOptions: e.node.selectedOptions,
  }));

  return json({
    id: product.id,
    handle: params.handle,
    title: product.title,
    description: product.description,
    url: `/produto/${params.handle}`,
    variants,
  });
};
