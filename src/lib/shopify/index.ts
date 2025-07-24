import { SHOPIFY_API_END_POINT, SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } from "$env/static/private";
import transformObject from '$lib/transformObject';
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { addCartShopify, createCartShopify, removeCartShopify, updateCartShopify } from './mutation/cart';
import { createCustomer, customerAccessTokenCreate, customerActive, customerRecover, customerReset, customerUpdate } from './mutation/customer';
import { getCartIdMutation } from './query/cart';
import { queryCustomer } from './query/customer';
import { getProductByHandler, productRecommendations } from './query/product';
import { predictiveSearchQuery } from "./query/search";

interface IFetchShopify {
  query: string;
  variables?: object;
  cache?: RequestCache;
}

export const clientShopify = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: '2025-07',
  publicAccessToken: SHOPIFY_ACCESS_TOKEN,
});

async function fetchShopify({ query, variables, cache = 'force-cache' }: IFetchShopify): Promise<any> {
  try {
    const data = await fetch(SHOPIFY_API_END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      cache,
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
    });
    return transformObject(await data.json());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error, new Date());
    return {};
  }
}

export async function getProductByHandle(handle: string): Promise<IPorduct> {
  const res = await fetchShopify({
    query: getProductByHandler,
    variables: { handle }
  });
  return res.data?.product;
}

export async function createCart(linesItems: ILinesCart[]) {
  const res = await fetchShopify({
    query: createCartShopify,
    variables: { linesItems },
    cache: 'no-store'
  });
  return res.data.cartCreate.cart;
}

export async function updateCartItem(cartId: string, linesItems: ILinesCart) {
  const res = await fetchShopify({
    query: updateCartShopify,
    variables: { cartId, linesItems },
    cache: 'no-store'
  });
  return res.data.cartLinesUpdate.cart;
}

export async function removeCartItem(cartId: string, lineIds: string[]) {
  const res = await fetchShopify({
    query: removeCartShopify,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });
  return res.data.cartLinesRemove.cart;
}

export async function addCartItem(cartId: string, linesItems: ILinesCart[]) {
  const res = await fetchShopify({
    query: addCartShopify,
    variables: { cartId, linesItems },
    cache: 'no-store'
  });
  return res.data.cartLinesAdd.cart;
}

export async function getCartId(idCart: string) {
  const res = await fetchShopify({
    query: getCartIdMutation,
    variables: { idCart },
    cache: 'no-store'
  });
  if (res.data) return res.data.cart;
  return {};
}

export async function registerCustomer(input: object): Promise<{
  customer: ICustomer;
  customerUserErrors: ICustomerUserErrors[];
}> {
  const res = await fetchShopify({
    query: createCustomer,
    variables: { input },
    cache: 'no-store'
  });
  return res.data?.customerCreate;
}

export async function accessTokenCustomerCreate(input: object): Promise<{
  customerAccessToken: ICustomerAccessToken;
  customerUserErrors: ICustomerUserErrors[];
}> {
  const res = await fetchShopify({
    query: customerAccessTokenCreate,
    variables: { input },
    cache: 'no-store'
  });
  return res.data?.customerAccessTokenCreate;
}

export async function getCustomerAccessToken(token: string = '') {
  const res = await fetchShopify({
    query: queryCustomer,
    variables: { token }
  });
  return res.data || null;
}

export async function predictiveSearchProducts(query: string): Promise<ISearchProducts[]> {
  const res = await fetchShopify({
    query: predictiveSearchQuery,
    variables: { query }
  });
  return res.data?.predictiveSearch.products || [];
}

export async function requestCustomerRecover(email: string): Promise<{
  data: {
    customerAccessToken: { accessToken: string; expiresAt: string; }
  };
  errors: ICustomerUserErrors[];
}> {
  const res = await fetchShopify({
    query: customerRecover,
    variables: { email }
  });

  return {
    data: res.data?.customerRecover,
    errors: res.errors || res.data.customerRecover?.customerUserErrors
  };
}

export async function requestCustomerReset(props: {
  id: string;
  input: {
    password: string;
    resetToken: string;
  }
}): Promise<{
  data: {
    customerAccessToken: { accessToken: string; expiresAt: string; }
  };
  errors: ICustomerUserErrors[];
}> {
  const res = await fetchShopify({
    query: customerReset,
    variables: props
  });
  return res;
}

export async function activeAccountCustomer(props: {
  id: string;
  input: {
    password: string;
    activationToken: string;
  }
}): Promise<{
  data: { customerAccessToken: ICustomerAccessToken };
  errors: ICustomerUserErrors[];
}> {
  const res = await fetchShopify({
    query: customerActive,
    variables: props
  });
  return {
    data: res.data?.customerActivate,
    errors: res.errors || res.data.customerActivate.customerUserErrors,
  };
}
