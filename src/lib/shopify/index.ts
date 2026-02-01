import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_API_END_POINT,
  SHOPIFY_STORE_DOMAIN,
} from "$env/static/private";
import transformObject from "$lib/transformObject";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { customerReset } from "./mutation/customer";

interface IFetchShopify {
  query: string;
  variables?: object;
  cache?: RequestCache;
}

export const clientShopify = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: "2026-01",
  publicAccessToken: SHOPIFY_ACCESS_TOKEN,
});

async function fetchShopify({
  query,
  variables,
  cache = "force-cache",
}: IFetchShopify): Promise<any> {
  try {
    const data = await fetch(SHOPIFY_API_END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      cache,
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
    });
    return transformObject(await data.json());
  } catch (error) {
    console.log(error, new Date());
    return {};
  }
}

export async function requestCustomerReset(props: {
  id: string;
  input: {
    password: string;
    resetToken: string;
  };
}): Promise<{
  data: {
    customerAccessToken: { accessToken: string; expiresAt: string };
  };
  errors: ICustomerUserErrors[];
}> {
  const res = await fetchShopify({
    query: customerReset,
    variables: props,
  });
  return res;
}
