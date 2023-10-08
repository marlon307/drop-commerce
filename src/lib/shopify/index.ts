import { SHOPIFY_API_END_POINT, SHOPIFY_ACCESS_TOKEN } from '$env/static/private';
import transformObject from '$lib/transformObject';
import { getCollectionsQuery } from './query/collection';
import { getProductByHandler, getProductsCollectionQuery, getProductsQuery, getProductsSrotQueyQuery } from './query/product';

async function fetchShopify(query: string, variables: object = {}) {
  const data = await fetch(`${SHOPIFY_API_END_POINT}/admin/api/2023-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    })
  });
  const json = await data.json();
  return json;
}

export async function getProductsCollection(collection: string) {
  const res = await fetchShopify(getProductsCollectionQuery, {
    collection,
  });
  const data = transformObject(res.data.collectionByHandle.products) as [];
  return data?.map((product: any) => ({
    handle: product.handle,
    title: product.title,
    image: product.images[0],
    price: Number(product.variants[0].price)
  }));
}

export async function getProducts() {
  const res = await fetchShopify(getProductsQuery);
  const data = transformObject(res.data.products) as [];
  return data?.map((product: any) => ({
    handle: product.handle,
    title: product.title,
    image: product.images[0],
    price: Number(product.variants[0].price)
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

export async function getCollections() {
  const res = await fetchShopify(getCollectionsQuery);
  const data = transformObject(res.data.collections) as any;
  return data.filter((collection: ICategorie) => !collection.title.startsWith('hidden') || !collection.handle.startsWith('hidden'));
}
