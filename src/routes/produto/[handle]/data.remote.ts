import { clientShopify } from "#lib/shopify/index.js";
import { productRecommendations } from "#lib/shopify/query/product.js";
import { query } from "$app/server";
import z from "zod";

export const getRecommendations = query(z.string(), async (productId) => {
  if (!productId) return [];

  const { data, errors } = await clientShopify.request(productRecommendations, {
    variables: {
      productId,
    },
  });

  // `errors` carrega o Response do fetch, que não é serializável para o cliente.
  if (errors) {
    console.error("[getRecommendations]", errors.message, errors.graphQLErrors);
  }

  return data?.productRecommendations || [];
});
