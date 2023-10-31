import { SHOPIFY_API_END_POINT, SHOPIFY_ACCESS_TOKEN } from "$env/static/private";
import transformObject from '$lib/transformObject';
import { customerAddressDelete, customerAddressUpdate } from './mutation/address';
import { addCartShopify, createCartShopify, removeCartShopify, updateCartShopify } from './mutation/cart';
import { createCustomer, customerAccessTokenCreate, customerUpdate } from './mutation/customer';
import { getCartIdMutation } from './query/cart';
import { queryCustomer, queryCustomerAddress, queryCustomerOrders } from './query/customer';
import { getProductByHandler, getProductsCollectionQuery, getProductsQuery } from './query/product';
import { predictiveSearchQuery } from "./query/search";

async function fetchShopify(query: string, variables?: object): Promise<any> {
  try {
    const data = await fetch(SHOPIFY_API_END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    });
    return transformObject(await data.json());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error, new Date());
    return {};
  }
}

export async function getProductsCollection(collection: string, sort: string = 'RELEVANCE', reverse: boolean = false) {
  const res = await fetchShopify(getProductsCollectionQuery, { collection, sort, reverse });
  return res.data?.collectionByHandle.products;
}

export async function getProducts(query: string, sort: string = 'RELEVANCE', reverse: boolean = false) {
  const res = await fetchShopify(getProductsQuery, { query, sort, reverse });
  return res.data.products;
}

export async function getProductByHandle(handle: string) {
  const res = await fetchShopify(getProductByHandler, { handle });
  return res.data.productByHandle;
}

export async function createCart(linesItems: ILinesCart[]) {
  const res = await fetchShopify(createCartShopify, { linesItems });
  return res.data.cartCreate.cart;
}

export async function updateCartItem(cartId: string, linesItems: ILinesCart) {
  const res = await fetchShopify(updateCartShopify, { cartId, linesItems });
  return res.data.cartLinesUpdate.cart;
}

export async function removeCartItem(cartId: string, lineIds: string[]) {
  const res = await fetchShopify(removeCartShopify, { cartId, lineIds });
  return res.data.cartLinesRemove.cart;
}

export async function addCartItem(cartId: string, linesItems: ILinesCart[]) {
  const res = await fetchShopify(addCartShopify, { cartId, linesItems });
  return res.data.cartLinesAdd.cart;
}

export async function getCartId(idCart: string) {
  const res = await fetchShopify(getCartIdMutation, { idCart });
  return res.data?.cart || { cart: {} };
}

export async function registerCustomer(input: object) {
  const res = await fetchShopify(createCustomer, { input });
  return res.data?.customerCreate || { customer: {} };
}

export async function accessTokenCustomerCreate(input: object) {
  const res = await fetchShopify(customerAccessTokenCreate, { input });
  return res.data?.customerAccessTokenCreate || { customerAccessToken: {} };
}

export async function updateCustomer(token: string, customer: object) {
  const res = await fetchShopify(customerUpdate, { token, customer });
  return res.data?.customerUpdate || { updateCustomer: {} };
}

export async function getCustomerOrders(token: string) {
  const res = await fetchShopify(queryCustomerOrders, { token });
  return res.data?.customer;
}

export async function getCustomerAccessToken(token: string) {
  const res = await fetchShopify(queryCustomer, { token });
  return res.data;
}

export async function getCustomerAddress(token: string) {
  const res = await fetchShopify(queryCustomerAddress, { token });
  return res.data?.customer;
}

export async function updateCustomerAddress(token: string, idAddress: string, dataAddress: IAddress) {
  const res = await fetchShopify(customerAddressUpdate, { token, idAddress, dataAddress });
  return res.data?.customerAddressUpdate;
}

export async function deleteCustomerAddress(token: string, idAddress: string) {
  const res = await fetchShopify(customerAddressDelete, { token, idAddress });
  return res.data?.customerAddressDelete;
}

export async function predictiveSearchProducts(query: string) {
  const res = await fetchShopify(predictiveSearchQuery, { query });
  return res.data?.predictiveSearch.products;
}
