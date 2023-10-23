import { SHOPIFY_API_END_POINT, SHOPIFY_ACCESS_TOKEN } from "$env/static/private";
import transformObject from '$lib/transformObject';
import { customerAddressDelete, customerAddressUpdate } from './mutation/address';
import { addCartShopify, createCartShopify, removeCartShopify, updateCartShopify } from './mutation/cart';
import { createCustomer, customerAccessTokenCreate, customerUpdate } from './mutation/customer';
import { getCartIdMutation } from './query/cart';
import { getCollectionsQuery } from './query/collection';
import { queryCustomer, queryCustomerAddress, queryCustomerOrders } from './query/customer';
import { getProductByHandler, getProductsCollectionQuery, getProductsQuery, getProductsSrotQueyQuery } from './query/product';
import { predictiveSearchQuery } from "./query/search";

async function fetchShopify(query: string, variables: object = {}) {
  try {
    const data = await fetch(SHOPIFY_API_END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables, })
    });
    const json = await data.json();
    return json;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export async function getProductsCollection(collection: string) {
  const res = await fetchShopify(getProductsCollectionQuery, { collection });
  const data = transformObject(res.data.collectionByHandle.products) as [];
  return data?.map((product: any) => ({
    handle: product.handle,
    title: product.title,
    image: product.images[0],
    price: Number(product.variants[0].price.amount)
  }));
}

export async function getProducts(query: string | null) {
  const res = await fetchShopify(getProductsQuery, { query });
  const data = transformObject(res.data.products) as [];
  return data?.map((product: any) => ({
    handle: product.handle,
    title: product.title,
    image: product.images[0],
    price: Number(product.variants[0].price.amount)
  }));
}

export async function getProductsSortKey() {
  const res = await fetchShopify(getProductsSrotQueyQuery);
  const data = transformObject(res.data.products) as [];
  return data?.map((product: any) => ({
    handle: product.handle,
    title: product.title,
    image: product.images[0],
    price: Number(product.variants[0].price)
  }));
}

export async function getProductByHandle(handle: string) {
  const res = await fetchShopify(getProductByHandler, { handle });
  const data = transformObject(res.data.productByHandle) as any;
  return data || [];
}
// Função descontinuada
export async function getCollections() {
  const res = await fetchShopify(getCollectionsQuery);
  const data = transformObject(res.data.collections) as any;
  return data.filter((collection: ICategorie) => !collection.title.startsWith('hidden') || !collection.handle.startsWith('hidden'));
}

export async function createCart(linesItems: ILinesCart[]) {
  const res = await fetchShopify(createCartShopify, { linesItems });
  const cartItems = transformObject(res.data.cartCreate.cart) as any;
  return cartItems;
}

export async function updateCartItem(cartId: string, linesItems: ILinesCart) {
  const res = await fetchShopify(updateCartShopify, { cartId, linesItems });
  const cartItems = transformObject(res.data.cartLinesUpdate.cart) as any;
  return cartItems;
}

export async function removeCartItem(cartId: string, lineIds: string[]) {
  const res = await fetchShopify(removeCartShopify, { cartId, lineIds });
  const cartItems = transformObject(res.data.cartLinesRemove.cart) as any;
  return cartItems;
}

export async function addCartItem(cartId: string, linesItems: ILinesCart[]) {
  const res = await fetchShopify(addCartShopify, { cartId, linesItems });
  const cartItems = transformObject(res.data.cartLinesAdd.cart) as any;
  return cartItems;
}

export async function getCartId(idCart: string) {
  const res = await fetchShopify(getCartIdMutation, { idCart });
  const cartItems = transformObject(res.data?.cart) as any;
  return cartItems || { cart: {} };
}

export async function registerCustomer(input: object) {
  const res = await fetchShopify(createCustomer, { input });
  const customer = transformObject(res.data?.customerCreate) as any;
  return customer || { customer: {} };
}

export async function accessTokenCustomerCreate(input: object) {
  const res = await fetchShopify(customerAccessTokenCreate, { input });
  const customerAccessToken = transformObject(res.data?.customerAccessTokenCreate) as any;
  return customerAccessToken || { customerAccessToken: {} };
}

export async function updateCustomer(token: string, customer: object) {
  const res = await fetchShopify(customerUpdate, { token, customer });
  const updateCustomer = transformObject(res.data?.customerUpdate) as any;
  return updateCustomer || { updateCustomer: {} };
}

export async function getCustomerOrders(token: string) {
  const res = await fetchShopify(queryCustomerOrders, { token });
  const orders = transformObject(res.data?.customer) as any;
  return orders;
}

export async function getCustomerAccessToken(token: string) {
  const res = await fetchShopify(queryCustomer, { token });
  const customerAccessToken = transformObject(res.data) as any;
  return customerAccessToken;
}

export async function getCustomerAddress(token: string) {
  const res = await fetchShopify(queryCustomerAddress, { token });
  const address = transformObject(res.data?.customer) as any;
  return address;
}

export async function updateCustomerAddress(token: string, idAddress: string, dataAddress: IAddress) {
  const res = await fetchShopify(customerAddressUpdate, { token, idAddress, dataAddress });
  const address = transformObject(res.data?.customerAddressUpdate) as any;
  return address;
}

export async function deleteCustomerAddress(token: string, idAddress: string) {
  const res = await fetchShopify(customerAddressDelete, { token, idAddress });
  const address = transformObject(res.data?.customerAddressDelete) as any;
  return address;
}

export async function predictiveSearchProducts(query: string) {
  const res = await fetchShopify(predictiveSearchQuery, { query });
  const search = transformObject(res.data?.predictiveSearch.products) as any;
  return search;
}
