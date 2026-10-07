import { clientShopify } from "#lib/shopify/index.js";
import { productRecommendations } from "#lib/shopify/query/product.js";
import { query } from "$app/server";
import z from "zod";

export const getRecommendations = query(z.string(), async (productId) => {
  const { data, errors } = await clientShopify.request(productRecommendations, {
    variables: {
      productId,
    },
  });
  return {
    recommendations: data?.productRecommendations || [],
    errors: errors || null,
  };
});
