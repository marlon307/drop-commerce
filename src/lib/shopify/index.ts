import { SHOPIFY_API_END_POINT, SHOPIFY_ACCESS_TOKEN } from '$env/static/private';
import transformObject from '$lib/transformObject';
import { getProductsCollectionQuery } from './query/product';

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


export async function getProductsCollection(collection: string): Promise<IPoduct[]> {
  const res = await fetchShopify(getProductsCollectionQuery, {
    collection,
  });
  const data = transformObject(res.data.collectionByHandle);

  return data?.products.map((product) => ({
    handle: product.handle,
    title: product.title,
    image: product.images[0],
    price: Number(product.variants[0].price)
  }));
}
