import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SHOPIFY_ACCESS_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async (): Promise<IPropsProducts> => {
  const data = await fetch('https://virais-shop.myshopify.com/admin/api/2023-10/products.json', {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    }
  })
  const products = await data.json();
  if (products) return products;

  throw error(404, 'Not found');
};
