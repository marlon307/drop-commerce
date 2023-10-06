import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SHOPIFY_ACCESS_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
  if (params.id) {
    const data = await fetch(`https://virais-shop.myshopify.com/admin/api/2023-10/products.json?handle=${params.id}&limit=1`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      }
    })
    const resp = await data.json();
    if (resp?.products) return { product: resp?.products[0] };
  }

  throw error(404, 'Not found');
};
