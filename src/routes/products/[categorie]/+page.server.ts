import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SHOPIFY_ACCESS_TOKEN, SHOPIFY_API_END_POINT } from '$env/static/private';

export const load: PageServerLoad = async ({ params }): Promise<IPropsProducts> => {
  const data = await fetch(`${SHOPIFY_API_END_POINT}/admin/api/2023-07/products.json?collections=${params.categorie}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    }
  })
  const products = await data.json();
  console.log(products);

  if (products) return products;

  throw error(404, 'Not found');
};
