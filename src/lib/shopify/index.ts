import { SHOPIFY_API_END_POINT, SHOPIFY_ACCESS_TOKEN } from "$env/static/private";
import transformObject from '$lib/transformObject';
import { customerAddressDelete, customerAddressUpdate } from './mutation/address';
import { addCartShopify, createCartShopify, removeCartShopify, updateCartShopify } from './mutation/cart';
import { createCustomer, customerAccessTokenCreate, customerUpdate } from './mutation/customer';
import { getCartIdMutation } from './query/cart';
import { queryCustomer, queryCustomerAddress, queryCustomerOrders } from './query/customer';
import { getProductByHandler, getProductsCollectionQuery, getProductsQuery } from './query/product';
import { predictiveSearchQuery } from "./query/search";

interface IFetchShopify {
  query: string;
  variables?: object;
  cache?: RequestCache;
}

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
    // console.log(error, new Date());
    return {};
  }
}

export async function getProductsCollection(collection: string, sort: string = 'RELEVANCE', reverse: boolean = false) {
  const res = await fetchShopify({
    query: getProductsCollectionQuery,
    variables: {
      collection,
      sort,
      reverse,
    }
  });
  if (res.data) return res.data.collectionByHandle.products;
  return [];
}

export async function getProducts(query: string, sort: string = 'RELEVANCE', reverse: boolean = false) {
  const res = await fetchShopify({
    query: getProductsQuery,
    variables: { query, sort, reverse }
  });
  if (res.data) return res.data.products
  return [];
}

export async function getProductByHandle(handle: string) {
  const res = await fetchShopify({
    query: getProductByHandler,
    variables: { handle }
  });
  return res.data?.productByHandle;
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
  return { cart: {} };
}

export async function registerCustomer(input: object) {
  const res = await fetchShopify({
    query: createCustomer,
    variables: { input },
    cache: 'no-store'
  });
  return res.data?.customerCreate || { customer: {} };
}

export async function accessTokenCustomerCreate(input: object) {
  const res = await fetchShopify({
    query: customerAccessTokenCreate,
    variables: { input },
    cache: 'no-store'
  });
  return res.data?.customerAccessTokenCreate || { customerAccessToken: {} };
}

export async function updateCustomer(token: string, customer: object) {
  const res = await fetchShopify({
    query: customerUpdate,
    variables: { token, customer }
  });
  return res.data?.customerUpdate || { updateCustomer: {} };
}

export async function getCustomerOrders(token: string) {
  const res = await fetchShopify({
    query: queryCustomerOrders,
    variables: { token }
  });
  return res.data?.customer;
}

export async function getCustomerAccessToken(token: string) {
  const res = await fetchShopify({
    query: queryCustomer,
    variables: { token }
  });
  return res.data || null;
}

export async function getCustomerAddress(token: string) {
  const res = await fetchShopify({
    query: queryCustomerAddress,
    variables: { token }
  });
  if (res.data) return res.data?.customer;
  return { addresses: [] }
}

export async function updateCustomerAddress(token: string, idAddress: string, dataAddress: IAddress) {
  const res = await fetchShopify({
    query: customerAddressUpdate,
    variables: { token, idAddress, dataAddress },
    cache: 'no-store'
  });
  return res.data?.customerAddressUpdate;
}

export async function deleteCustomerAddress(token: string, idAddress: string) {
  const res = await fetchShopify({
    query: customerAddressDelete,
    variables: { token, idAddress }
  });
  return res.data?.customerAddressDelete;
}

export async function predictiveSearchProducts(query: string): Promise<ISearchProducts[]> {
  const res = await fetchShopify({
    query: predictiveSearchQuery,
    variables: { query }
  });
  return res.data?.predictiveSearch.products || [];
}
