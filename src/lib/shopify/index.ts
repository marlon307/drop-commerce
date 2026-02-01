import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_STORE_DOMAIN,
} from "$env/static/private";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const clientShopify = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: "2026-01",
  publicAccessToken: SHOPIFY_ACCESS_TOKEN,
});
